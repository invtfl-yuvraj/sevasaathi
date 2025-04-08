// app/api/trips/[id]/location/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";
import { getIO } from "@/lib/socket";
import { calculateDistance, calculateETA } from "@/lib/geolocation";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get authenticated user
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized: Please log in" },
        { status: 401 }
      );
    }
    
    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        role: true
      }
    });
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    
    const tripId = params.id;
    
    // Get trip with authorization check
    const trip = await prisma.trip.findUnique({
      where: { id: tripId }
    });
    
    if (!trip) {
      return NextResponse.json(
        { error: "Trip not found" },
        { status: 404 }
      );
    }
    
    // Check if user has permission to view this trip
    const isAuthorized = trip.userId === user.id || trip.captainId === user.id || user.role === "ADMIN";
    
    if (!isAuthorized) {
      return NextResponse.json(
        { error: "You don't have permission to view this trip" },
        { status: 403 }
      );
    }
    
    // Get location history
    const locationHistory = await prisma.locationTracking.findMany({
      where: { tripId },
      orderBy: { createdAt: "desc" },
      take: 20 // Limit to most recent points
    });
    
    // Get current location
    const currentLocation = {
      latitude: trip.captainLatitude,
      longitude: trip.captainLongitude,
      distanceToUser: trip.distanceToUser,
      lastUpdated: trip.lastLocationUpdate,
      estimatedArrivalMinutes: trip.distanceToUser ? calculateETA(trip.distanceToUser) : null
    };
    
    return NextResponse.json({
      success: true,
      currentLocation,
      locationHistory
    });
    
  } catch (error) {
    console.error("Error fetching location data:", error);
    return NextResponse.json(
      { error: "Failed to fetch location data" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get authenticated user
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized: Please log in" },
        { status: 401 }
      );
    }
    
    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        role: true
      }
    });
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    
    const tripId = params.id;
    
    // Get trip
    const trip = await prisma.trip.findUnique({
      where: { id: tripId }
    });
    
    if (!trip) {
      return NextResponse.json(
        { error: "Trip not found" },
        { status: 404 }
      );
    }
    
    // Check if user is the captain for this trip
    if (trip.captainId !== user.id && user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Only the captain can update location for this trip" },
        { status: 403 }
      );
    }
    
    // Parse request body
    const body = await request.json();
    const { latitude, longitude } = body;
    
    // Validate coordinates
    if (!latitude || !longitude || typeof latitude !== 'number' || typeof longitude !== 'number') {
      return NextResponse.json(
        { error: "Invalid location data: Valid coordinates are required" },
        { status: 400 }
      );
    }
    
    // Calculate distance to pickup location if available
    let distanceToUser = null;
    if (trip.pickupLatitude && trip.pickupLongitude) {
      distanceToUser = calculateDistance(
        latitude,
        longitude,
        trip.pickupLatitude,
        trip.pickupLongitude
      );
    }
    
    // Auto-update status to ARRIVED if captain is very close (50 meters)
    let updatedStatus = trip.status;
    if (trip.status === "IN_PROGRESS" && distanceToUser !== null && distanceToUser < 0.05) {
      updatedStatus = "ARRIVED";
    }
    
    // Create location tracking history
    const locationTracking = await prisma.locationTracking.create({
      data: {
        tripId,
        userId: user.id,
        latitude,
        longitude,
        distanceToUser: distanceToUser || 0
      }
    });
    
    // Update trip with latest location
    const updatedTrip = await prisma.trip.update({
      where: { id: tripId },
      data: {
        captainLatitude: latitude,
        captainLongitude: longitude,
        distanceToUser: distanceToUser || undefined,
        lastLocationUpdate: new Date(),
        status: updatedStatus
      }
    });
    
    // Emit real-time update via Socket.IO
    const io = getIO();
    if (io) {
      io.to(`user_${trip.userId}`).emit('captain_location_update', {
        tripId,
        captainId: user.id,
        latitude,
        longitude,
        distanceToUser,
        status: updatedStatus,
        timestamp: new Date(),
        estimatedArrivalMinutes: distanceToUser ? calculateETA(distanceToUser) : null
      });
      
      // If status was updated to ARRIVED, also emit status update
      if (updatedStatus !== trip.status) {
        io.to(`user_${trip.userId}`).emit('trip_status_update', {
          tripId,
          status: updatedStatus,
          timestamp: new Date()
        });
      }
    }
    
    return NextResponse.json({
      success: true,
      location: {
        latitude,
        longitude,
        distanceToUser,
        timestamp: new Date()
      },
      trip: {
        id: updatedTrip.id,
        status: updatedTrip.status
      }
    });
    
  } catch (error) {
    console.error("Error updating location:", error);
    return NextResponse.json(
      { error: "Failed to update location" },
      { status: 500 }
    );
  }
}