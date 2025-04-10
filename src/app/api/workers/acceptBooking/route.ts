import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/ApiResponse";

export async function PATCH(req: Request): Promise<NextResponse<ApiResponse>> {
  try {
    const { captainId, bookingId } = await req.json();

    // Validate input
    if (!captainId || !bookingId) {
      return NextResponse.json(
        { success: false, message: "captainId and bookingId are required" },
        { status: 400 }
      );
    }

    // Check if the booking exists
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId }, // Searching by primary key (Object ID)
    });

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    // Update the booking with the captainId
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { 
        captainId,
        status: "CONFIRMED" 
       },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Captain assigned successfully",
        booking: updatedBooking,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
