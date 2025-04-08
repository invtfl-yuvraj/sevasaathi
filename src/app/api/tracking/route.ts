import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";
import { getIO } from "@/lib/socket";
import { calculateDistance, calculateETA } from "@/lib/geolocation";

// Captain updates their location while en route to user
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized: Please log in" },
        { status: 401 }
      );
    }

    // Verify this user is a captain with optimized query
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        role: true,
        captain: {
          select: {
            id: true
          }
        }
      }
    });

    if (!user || user.role !== "CAPTAIN" || !user.captain) {
      return NextResponse.json(
        { error: "Unauthorized: Only captains can update tracking location" },
        { status: 403 }
      );
    }

    const captain = user.captain;

    // Parse the request body
    const data = await request.json();
    const { latitude, longitude, tripId } = data;
    
    // Validate required fields
    if (!latitude || !longitude || !tripId) {
      return NextResponse.json(
        { error: "Missing required fields: latitude, longitude, tripId" },
        { status: 400 }
      );
    }

    // Get the trip details
    const trip = await prisma.trip.findFirst({
      where: { 
        id: tripId,
        captainId: user.id
      },
      select: {
        id: true,
        userId: true,
        status: true,
        pickupAddress: true
      }
    });

    if (!trip) {
      return NextResponse.json(
        { error: "Trip not found or not assigned to this captain" },
        { status: 404 }
      );
    }
    
    // Get user location (from pickup coordinates in a real app)
    // This is simplified - you would need actual user coordinates
    const userLocation = {
      latitude: 34.0522, // Example coordinates
      longitude: -118.2437
    };
    
    // Calculate distance to user
    const distanceToUser = calculateDistance(
      latitude,
      longitude,
      userLocation.latitude,
      userLocation.longitude
    );

    // Update captain's location in Location model
    await prisma.location.upsert({
      where: { captainId: captain.id },
      update: {
        latitude,
        longitude,
        updatedAt: new Date(),
      },
      create: {
        captainId: captain.id,
        latitude,
        longitude,
        city: "Unknown" // Default city
      },
    });
    
    // Check if captain is very close to user (50 meters threshold)
    const hasArrived = distanceToUser < 0.05;
    
    // Update trip with latest tracking info
    const updatedTrip = await prisma.trip.update({
      where: { id: tripId },
      data: {
        captainLatitude: latitude,
        captainLongitude: longitude,
        distanceToUser: distanceToUser,
        lastLocationUpdate: new Date(),
        status: hasArrived ? "ARRIVED" : trip.status,
      },
    });

    // Create tracking history entry
    await prisma.locationTracking.create({
      data: {
        tripId,
        userId: trip.userId,
        latitude,
        longitude,
        distanceToUser,
      },
    });

    // Send real-time update via Socket.IO if available
    const io = getIO();
    if (io) {
      io.to(`user_${trip.userId}`).emit('captain_location_update', {
        tripId,
        captainId: user.id,
        latitude,
        longitude,
        distanceToUser,
        status: updatedTrip.status,
        timestamp: new Date(),
        estimatedArrivalMinutes: calculateETA(distanceToUser)
      });
    }

    return NextResponse.json({
      success: true,
      distanceToUser: distanceToUser,
      isArrived: hasArrived,
      status: updatedTrip.status
    });
    
  } catch (error) {
    console.error("Error updating tracking location:", error);
    return NextResponse.json(
      { error: "Failed to update tracking location" },
      { status: 500 }
    );
  }
}

// User fetches captain's location
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized: Please log in" },
        { status: 401 }
      );
    }

    // Get tripId from query params
    const url = new URL(request.url);
    const tripId = url.searchParams.get("tripId");
    
    if (!tripId) {
      return NextResponse.json(
        { error: "Missing required parameter: tripId" },
        { status: 400 }
      );
    }

    // Get user id with optimized query
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Get trip and verify this user owns it
    const trip = await prisma.trip.findUnique({
      where: { 
        id: tripId,
        userId: user.id,
      },
      select: {
        id: true,
        captainId: true,
        captainLatitude: true,
        captainLongitude: true,
        distanceToUser: true,
        lastLocationUpdate: true,
        status: true
      }
    });

    if (!trip) {
      return NextResponse.json(
        { error: "Trip not found or unauthorized" },
        { status: 404 }
      );
    }

    // Get captain info
    let captainName = "Unknown Captain";
    
    if (trip.captainId) {
      const captain = await prisma.user.findUnique({
        where: { id: trip.captainId },
        select: { username: true }
      });
      
      if (captain) {
        captainName = captain.username;
      }
    }

    // Calculate ETA based on distance and average speed
    const etaMinutes = trip.distanceToUser ? calculateETA(trip.distanceToUser) : null;
    
    return NextResponse.json({
      success: true,
      captainLocation: {
        latitude: trip.captainLatitude,
        longitude: trip.captainLongitude,
        updatedAt: trip.lastLocationUpdate,
      },
      distanceInKm: trip.distanceToUser,
      estimatedArrivalMinutes: etaMinutes,
      captainName: captainName,
      status: trip.status,
    });
    
  } catch (error) {
    console.error("Error fetching tracking info:", error);
    return NextResponse.json(
      { error: "Failed to get tracking information" },
      { status: 500 }
    );
  }
}