// app/api/match/captain/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";
import { calculateDistance, calculateETA } from "@/lib/geolocation";

export async function GET(request: NextRequest) {
  try {
    // Get authenticated user
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized: Please log in" },
        { status: 401 }
      );
    }

    // Get user with optimized query
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
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

    if (!userLatitude || !userLongitude) {
      return NextResponse.json(
        { error: "Location coordinates are required as query parameters (lat, lng)" },
        { status: 400 }
      );
    }

    // Find available captains with optimized query
    const captainsWithLocations = await prisma.captain.findMany({
      where: {
        availability: true,
      },
      select: {
        id: true,
        userId: true,
        rating: true,
        hourlyRate: true,
        location: true,
        experience: true,
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
        },
      }
    });

    // Filter captains with location data
    const captainsWithValidLocations = captainsWithLocations.filter(
      captain => captain.locationData?.latitude && captain.locationData?.longitude
    );

    // Calculate distance and filter captains
    const nearbyResults = captainsWithValidLocations
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