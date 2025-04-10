import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/ApiResponse";

export async function GET(): Promise<NextResponse<ApiResponse>> {
  try {
    // Fetch all pending bookings sorted by newest first
    const bookings = await prisma.booking.findMany({
      where: { status: "PENDING" },
      orderBy: { createdAt: "desc" },
      include: {
        //user: true,
        //payment: true,
        //captain: true,
        //order: true,
        //trip: true,
      },
    });

    return NextResponse.json(
      { success: true, message: "Bookings fetched successfully", bookings },
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
