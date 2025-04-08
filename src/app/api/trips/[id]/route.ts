// app/api/trips/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";
import { getIO } from "@/lib/socket";

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
    
    // Fetch trip with authorization check
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
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
        locationHistory: {
          orderBy: { createdAt: "desc" },
          take: 10, // Limit to recent history
        }
      }
    });
    
    // Check if trip exists
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
    
    return NextResponse.json({
      success: true,
      trip
    });
    
  } catch (error) {
    console.error("Error fetching trip:", error);
    return NextResponse.json(
      { error: "Failed to fetch trip details" },
      { status: 500 }
    );
  }
}

export async function PUT(
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
    
    // Check permissions
    const isUser = trip.userId === user.id;
    const isCaptain = trip.captainId === user.id;
    const isAdmin = user.role === "ADMIN";
    
    if (!isUser && !isCaptain && !isAdmin) {
      return NextResponse.json(
        { error: "You don't have permission to update this trip" },
        { status: 403 }
      );
    }
    
    // Parse request body
    const body = await request.json();
    const { status, captainLatitude, captainLongitude, dropoffAddress } = body;
    
    // Create update data object
    const updateData: any = {};
    
    // Handle status updates with validation
    if (status) {
      // Define allowed status transitions
      const validStatusTransitions: Record<string, string[]> = {
        "PENDING": ["ACCEPTED", "CANCELLED"],
        "ACCEPTED": ["IN_PROGRESS", "CANCELLED"],
        "IN_PROGRESS": ["ARRIVED", "CANCELLED"],
        "ARRIVED": ["COMPLETED", "CANCELLED"],
        "COMPLETED": [],
        "CANCELLED": []
      };
      
      // Check if status transition is valid
      if (!validStatusTransitions[trip.status].includes(status)) {
        return NextResponse.json(
          { error: `Invalid status transition from ${trip.status} to ${status}` },
          { status: 400 }
        );
      }
      
      // Check user permissions for this status change
      if (status === "CANCELLED") {
        // Anyone involved can cancel
        if (!isUser && !isCaptain && !isAdmin) {
          return NextResponse.json(
            { error: "You don't have permission to cancel this trip" },
            { status: 403 }
          );
        }
      } else if (status === "ACCEPTED") {
        // Only captain can accept
        if (!isCaptain && !isAdmin) {
          return NextResponse.json(
            { error: "Only the captain can accept this trip" },
            { status: 403 }
          );
        }
        // Set the startedAt time when accepting
        updateData.startedAt = new Date();
      } else if (["IN_PROGRESS", "ARRIVED", "COMPLETED"].includes(status)) {
        // Only captain can change these statuses
        if (!isCaptain && !isAdmin) {
          return NextResponse.json(
            { error: "Only the captain can update this trip status" },
            { status: 403 }
          );
        }
        
        // Set the completedAt time if status is COMPLETED
        if (status === "COMPLETED") {
          updateData.completedAt = new Date();
        }
      }
      
      updateData.status = status;
    }
    
    // Handle location updates (only captain can update location)
    if ((captainLatitude !== undefined && captainLongitude !== undefined) && (isCaptain || isAdmin)) {
      updateData.captainLatitude = captainLatitude;
      updateData.captainLongitude = captainLongitude;
      updateData.lastLocationUpdate = new Date();
    }
    
    // Handle address updates
    if (dropoffAddress && (isUser || isAdmin)) {
      updateData.dropoffAddress = dropoffAddress;
    }
    
    // Update trip
    const updatedTrip = await prisma.trip.update({
      where: { id: tripId },
      data: updateData,
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
    
    // Emit socket event for status updates
    if (status && updatedTrip) {
      const io = getIO();
      if (io) {
        // Emit to user
        io.to(`user_${trip.userId}`).emit('trip_status_update', {
          tripId,
          status,
          timestamp: new Date()
        });
        
        // Emit to captain if there is one
        if (trip.captainId) {
          io.to(`user_${trip.captainId}`).emit('trip_status_update', {
            tripId,
            status,
            timestamp: new Date()
          });
        }
      }
    }
    
    return NextResponse.json({
      success: true,
      trip: updatedTrip
    });
    
  } catch (error) {
    console.error("Error updating trip:", error);
    return NextResponse.json(
      { error: "Failed to update trip" },
      { status: 500 }
    );
  }
}

export async function DELETE(
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
    
    // Check permissions (only trip creator or admin can delete)
    const isAdmin = user.role === "ADMIN";
    const isCreator = trip.userId === user.id;
    
    if (!isCreator && !isAdmin) {
      return NextResponse.json(
        { error: "You don't have permission to delete this trip" },
        { status: 403 }
      );
    }
    
    // Check if trip can be deleted (e.g., not an in-progress trip)
    if (["ACCEPTED", "IN_PROGRESS", "ARRIVED"].includes(trip.status)) {
      return NextResponse.json(
        { error: "Active trips cannot be deleted. Please cancel first." },
        { status: 400 }
      );
    }
    
    // Delete trip
    await prisma.trip.delete({
      where: { id: tripId }
    });
    
    return NextResponse.json({
      success: true,
      message: "Trip deleted successfully"
    });
    
  } catch (error) {
    console.error("Error deleting trip:", error);
    return NextResponse.json(
      { error: "Failed to delete trip" },
      { status: 500 }
    );
  }
}