// app/api/match/captain/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";
import { calculateDistance, calculateETA } from "@/lib/geolocation";
import { getIO } from "@/lib/socket";

// GET: Find nearby captains without creating trips
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized: Please log in" },
        { status: 401 }
      );
    }

    // Get user with minimal data
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

    // Parse query parameters
    const url = new URL(request.url);
    const maxDistance = parseFloat(url.searchParams.get("distance") || "10");
    const limit = parseInt(url.searchParams.get("limit") || "5");
    const userLatitude = parseFloat(url.searchParams.get("lat") || "0");
    const userLongitude = parseFloat(url.searchParams.get("lng") || "0");
    const serviceId = url.searchParams.get("serviceId") || undefined;

    // Validate location parameters
    if (!userLatitude || !userLongitude || isNaN(userLatitude) || isNaN(userLongitude)) {
      return NextResponse.json(
        { error: "Valid location coordinates are required (lat, lng)" },
        { status: 400 }
      );
    }

    // Find available captains using more efficient query
    const captainsWithLocations = await prisma.captain.findMany({
      where: {
        availability: true,
        serviceId: serviceId || undefined
      },
      select: {
        id: true,
        userId: true,
        rating: true,
        hourlyRate: true,
        location: true,
        experience: true,
        service: {
          select: {
            id: true,
            name: true,
            amount: true
          }
        },
        user: {
          select: {
            id: true,
            username: true,
            imageURL: true,
          }
        },
        locationData: {
          select: {
            latitude: true,
            longitude: true,
            city: true
          }
        }
      }
    });

    // Process results efficiently - filter then map
    const nearbyResults = captainsWithLocations
      .filter(captain => captain.locationData?.latitude && captain.locationData?.longitude)
      .map(captain => {
        const distance = calculateDistance(
          userLatitude,
          userLongitude,
          captain.locationData!.latitude,
          captain.locationData!.longitude
        );
        
        return {
          id: captain.id,
          userId: captain.userId,
          username: captain.user.username,
          imageURL: captain.user.imageURL,
          rating: captain.rating,
          hourlyRate: captain.hourlyRate,
          location: captain.location,
          experience: captain.experience,
          service: captain.service,
          distance: distance,
          latitude: captain.locationData!.latitude,
          longitude: captain.locationData!.longitude,
          city: captain.locationData!.city || "Unknown",
          estimatedArrivalMinutes: calculateETA(distance)
        };
      })
      .filter(captain => captain.distance <= maxDistance)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, limit);

    return NextResponse.json({
      success: true,
      captains: nearbyResults,
      count: nearbyResults.length,
    });
    
  } catch (error) {
    console.error("Error finding nearby captains:", error);
    return NextResponse.json(
      { error: "Failed to find nearby captains" },
      { status: 500 }
    );
  }
}

// POST: Create trip and notify captains
export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized: Please log in" },
        { status: 401 }
      );
    }
    
    // Get minimal user data needed
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
    
    // Parse request body
    const body = await request.json();
    const { 
      latitude, 
      longitude, 
      serviceId, 
      pickupAddress,
      dropoffAddress,
      maxDistance = 10,
      orderId,
      bookingId
    } = body;
    
    // Validate required fields
    if (!latitude || !longitude || typeof latitude !== 'number' || typeof longitude !== 'number') {
      return NextResponse.json(
        { error: "Invalid location: Valid coordinates are required" },
        { status: 400 }
      );
    }
    
    if (!pickupAddress) {
      return NextResponse.json(
        { error: "Pickup address is required" },
        { status: 400 }
      );
    }
    
    // Create a trip record first - transaction to ensure consistency
    const trip = await prisma.trip.create({
      data: {
        userId: user.id,
        pickupAddress,
        dropoffAddress: dropoffAddress || null,
        pickupLatitude: latitude,
        pickupLongitude: longitude,
        status: "PENDING",
        orderId: orderId || null,
        bookingId: bookingId || null,
      }
    });
    
    // Find available captains with optimized query
    const captainsWithLocations = await prisma.captain.findMany({
      where: {
        availability: true,
        serviceId: serviceId || undefined
      },
      select: {
        id: true,
        userId: true,
        rating: true,
        hourlyRate: true,
        service: {
          select: {
            id: true,
            name: true,
            amount: true
          }
        },
        user: {
          select: {
            id: true,
            username: true,
            imageURL: true,
          }
        },
        locationData: {
          select: {
            latitude: true,
            longitude: true,
            city: true
          }
        }
      }
    });
    
    // Calculate distances and filter captains efficiently
    const nearbyCaptains = captainsWithLocations
      .filter(captain => captain.locationData?.latitude && captain.locationData?.longitude)
      .map(captain => {
        const distance = calculateDistance(
          latitude,
          longitude,
          captain.locationData!.latitude,
          captain.locationData!.longitude
        );
        
        return {
          id: captain.id,
          userId: captain.userId,
          username: captain.user.username,
          imageURL: captain.user.imageURL,
          rating: captain.rating,
          service: captain.service,
          distance,
          latitude: captain.locationData!.latitude,
          longitude: captain.locationData!.longitude,
          estimatedArrivalMinutes: calculateETA(distance)
        };
      })
      .filter(captain => captain.distance <= maxDistance)
      .sort((a, b) => a.distance - b.distance);
    
    // Notify captains via socket
    const io = getIO();
    if (io) {
      for (const captain of nearbyCaptains) {
        io.to(`user_${captain.userId}`).emit('new_trip_request', {
          tripId: trip.id,
          userId: user.id,
          pickupAddress,
          dropoffAddress: dropoffAddress || null,
          pickupLatitude: latitude,
          pickupLongitude: longitude,
          distance: captain.distance,
          estimatedArrivalMinutes: captain.estimatedArrivalMinutes,
          createdAt: new Date()
        });
      }
    }
    
    return NextResponse.json({
      success: true,
      trip,
      captainsFound: nearbyCaptains.length,
      nearbyCaptains
    });
    
  } catch (error) {
    console.error("Error matching captains:", error);
    return NextResponse.json(
      { error: "Failed to match with captains" },
      { status: 500 }
    );
  }
}