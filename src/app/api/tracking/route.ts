import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import prisma from "@/lib/prisma";

// Haversine formula to calculate distance between two points on Earth
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

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

    // Verify this user is a captain
    const user = await prisma.user.findUnique({
      where: { 
        email: session.user.email,
      },
      include: {
        captain: true
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
        captainId: user.id // Make sure this captain is assigned to this trip
      }
    });

    if (!trip) {
      return NextResponse.json(
        { error: "Trip not found or not assigned to this captain" },
        { status: 404 }
      );
    }
    
    // Get user location (this would need to come from another source in your schema,
    // as the User model doesn't have location fields)
    // For this example, we'll use the pickup address coordinates or default to 0,0
    let userLatitude = 0;
    let userLongitude = 0;
    
    // If we need to get user's actual location, we would need to implement that logic
    // based on how user locations are stored in your system
    
    // Calculate distance to user
    const distanceToUser = calculateDistance(
      latitude,
      longitude,
      userLatitude,
      userLongitude
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
      },
    });
    
    // Update trip with latest tracking info
    await prisma.trip.update({
      where: { id: tripId },
      data: {
        captainLatitude: latitude,
        captainLongitude: longitude,
        distanceToUser: distanceToUser,
        lastLocationUpdate: new Date(),
        // If captain is very close to user, mark as "arrived"
        status: distanceToUser < 0.05 ? "ARRIVED" : trip.status, // 50 meters threshold
      },
    });

    // Create tracking history entry
    await prisma.locationTracking.create({
      data: {
        tripId,
        userId: trip.userId, // The user who booked the trip
        latitude,
        longitude,
        distanceToUser,
      },
    });

    return NextResponse.json({
      success: true,
      distanceToUser: distanceToUser,
      isArrived: distanceToUser < 0.05,
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

    // Get user id
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
        userId: user.id, // Ensure user owns this trip
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

    // Calculate estimated arrival time (simple calculation, can be improved)
    // Assuming average speed of 30 km/h in city
    const avgSpeedKmH = 30;
    const etaMinutes = trip.distanceToUser ? (trip.distanceToUser / avgSpeedKmH) * 60 : null;
    
    return NextResponse.json({
      success: true,
      captainLocation: {
        latitude: trip.captainLatitude,
        longitude: trip.captainLongitude,
        updatedAt: trip.lastLocationUpdate,
      },
      distanceInKm: trip.distanceToUser,
      estimatedArrivalMinutes: etaMinutes ? Math.round(etaMinutes) : null,
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