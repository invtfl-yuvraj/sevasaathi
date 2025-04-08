// app/api/trips/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";

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
    
    const searchParams = request.nextUrl.searchParams;
    const role = searchParams.get("role");
    const status = searchParams.get("status");
    
    // Build the query based on role and status filters
    const whereClause: any = {};
    
    if (role === "captain") {
      whereClause.captainId = user.id;
    } else if (role === "user") {
      whereClause.userId = user.id;
    } else {
      // Default: show trips for both roles
      whereClause.OR = [
        { userId: user.id },
        { captainId: user.id }
      ];
    }
    
    // Add status filter if provided
    if (status) {
      whereClause.status = status;
    }
    
    // Fetch trips
    const trips = await prisma.trip.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            imageURL: true,
          }
        },
        captain: {
          select: {
            id: true,
            username: true,
            imageURL: true,
            rating: true,
          }
        },
        booking: true,
        order: true,
      }
    });
    
    return NextResponse.json({
      success: true,
      trips
    });
    
  } catch (error) {
    console.error("Error fetching trips:", error);
    return NextResponse.json(
      { error: "Failed to fetch trips" },
      { status: 500 }
    );
  }
}

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
    
    // Parse request body
    const body = await request.json();
    const {
      captainId,
      pickupAddress,
      dropoffAddress,
      pickupLatitude,
      pickupLongitude,
      orderId,
      bookingId
    } = body;
    
    // Validate required fields
    if (!pickupAddress) {
      return NextResponse.json(
        { error: "Pickup address is required" },
        { status: 400 }
      );
    }
    
    // Create the trip
    const trip = await prisma.trip.create({
      data: {
        userId: user.id,
        captainId: captainId || null,
        pickupAddress,
        dropoffAddress: dropoffAddress || null,
        pickupLatitude: pickupLatitude || null,
        pickupLongitude: pickupLongitude || null,
        status: "PENDING",
        orderId: orderId || null,
        bookingId: bookingId || null,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            imageURL: true,
          }
        },
        captain: captainId ? {
          select: {
            id: true,
            username: true,
            imageURL: true,
            rating: true,
          }
        } : false,
      }
    });
    
    return NextResponse.json({
      success: true,
      trip
    }, { status: 201 });
    
  } catch (error) {
    console.error("Error creating trip:", error);
    return NextResponse.json(
      { error: "Failed to create trip" },
      { status: 500 }
    );
  }
}