import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options"; 
import prisma from "@/lib/prisma"; 

// Helper function to calculate distance between two coordinates in kilometers
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

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Parse query parameters (optional)
    const url = new URL(request.url);
    const maxDistance = parseFloat(url.searchParams.get("distance") || "10"); // Default 10km
    const limit = parseInt(url.searchParams.get("limit") || "5"); // Default 5 results

    // Get coordinates from query parameters (since User model doesn't have location fields)
    const userLatitude = parseFloat(url.searchParams.get("lat") || "0");
    const userLongitude = parseFloat(url.searchParams.get("lng") || "0");

    if (!userLatitude || !userLongitude) {
      return NextResponse.json(
        { error: "Location coordinates are required as query parameters (lat, lng)" },
        { status: 400 }
      );
    }

    // Find available captains
    const captainsWithLocations = await prisma.captain.findMany({
      where: {
        availability: true,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            imageURL: true,
          }
        },
        locationData: true,
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
        };
      })
      .filter(captain => captain.distance <= maxDistance)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, limit);

    return NextResponse.json({
      success: true,
      results: nearbyResults,
      total: nearbyResults.length,
    });
    
  } catch (error) {
    console.error("Error finding nearby captains:", error);
    return NextResponse.json(
      { error: "Failed to find nearby captains" },
      { status: 500 }
    );
  }
}