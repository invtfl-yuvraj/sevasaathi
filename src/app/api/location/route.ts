import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
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
      include: {
        captain: true,
      }
    });
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    
    // Parse the request body
    const data = await request.json();
    const { latitude, longitude, city } = data;
    
    // Validate coordinates
    if (!latitude || !longitude) {
      return NextResponse.json(
        { error: "Invalid location data: Coordinates are required" },
        { status: 400 }
      );
    }
    
    // If user is a captain, update the Location model
    if (user.role === "CAPTAIN" && user.captain) {
      await prisma.location.upsert({
        where: { captainId: user.captain.id },
        update: {
          latitude,
          longitude,
          city: city || "Unknown",
          updatedAt: new Date(),
        },
        create: {
          captainId: user.captain.id,
          latitude,
          longitude,
          city: city || "Unknown",
        },
      });
      
      // Also update any active trips
      if (user.captain) {
        await prisma.trip.updateMany({
          where: {
            captainId: user.id,
            status: {
              in: ["ACCEPTED", "IN_PROGRESS"]
            }
          },
          data: {
            captainLatitude: latitude,
            captainLongitude: longitude,
            lastLocationUpdate: new Date()
          }
        });
        
        // Create location tracking record for active trips
        const activeTrips = await prisma.trip.findMany({
          where: {
            captainId: user.id,
            status: {
              in: ["ACCEPTED", "IN_PROGRESS"]
            }
          },
          select: {
            id: true,
            userId: true
          }
        });
        
        for (const trip of activeTrips) {
          // Calculate distance to user (simplified example - in a real app you'd use proper geospatial calculation)
          // For this example, let's just use a placeholder value
          const distanceToUser = 0; // Would calculate actual distance here
          
          await prisma.locationTracking.create({
            data: {
              tripId: trip.id,
              userId: trip.userId,
              latitude,
              longitude, 
              distanceToUser,
            }
          });
        }
      }
    }
    
    return NextResponse.json({
      success: true,
      message: "Location updated successfully",
      location: {
        latitude,
        longitude,
        city: city || "Unknown",
        updatedAt: new Date(),
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

export async function GET() {
  // Get authenticated user
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized: Please log in" },
      { status: 401 }
    );
  }
  
  try {
    // Fetch user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        captain: true
      }
    });
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // console.log("USER Role:",  user.role);
    // console.log("USER ID:", user.id);
    // console.log("USER Captain ID:", user.captain?.id);
    // console.log("USER Captain:", user.captain);
    
    // If user is a captain, fetch their location
    if (user.role === "CAPTAIN" && user.captain) {
      const location = await prisma.location.findUnique({
        where: { captainId: user.captain.id }
      });
      
      if (!location) {
        return NextResponse.json(
          { error: "No location data found for this captain" },
          { status: 404 }
        );
      }

      console.log("Location", location);
      console.log("Latitude:", location.latitude, "Longitude:", location.longitude);
      
      return NextResponse.json({
        success: true,
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
          city: location.city,
          updatedAt: location.updatedAt
        }
      }, { status: 200 });
    } else {
      // For regular users, could check their active trips
      const activeTrip = await prisma.trip.findFirst({
        where: {
          userId: user.id,
          status: {
            in: ["ACCEPTED", "IN_PROGRESS"]
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      });

    //   console.log("Active Trip:", activeTrip);

      
      if (!activeTrip || !activeTrip.captainLatitude || !activeTrip.captainLongitude) {
        return NextResponse.json(
          { error: "No active trip or location data found" },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        success: true,
        location: {
          latitude: activeTrip.captainLatitude,
          longitude: activeTrip.captainLongitude,
          updatedAt: activeTrip.lastLocationUpdate
        }
      });
    }
    
  } catch (error) {
    console.error("Error fetching location:", error);
    return NextResponse.json(
      { error: "Failed to retrieve location data" },
      { status: 500 }
    );
  }
}