import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/ApiResponse";

export async function POST(req: Request): Promise<NextResponse<ApiResponse>> {
  try {
    const { userId, orderId, amount, scheduledAt} = await req.json();

    if (!userId || !amount || !scheduledAt || !orderId) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // a payment is created when a booking is made

    // once the payment is integerated the booking will be updated with the "paymentId" also
    // now update the booking model with the all the data
    const booking = await prisma.booking.create({
      data: {
        userId,
        orderId,
        amount,
        scheduledAt: new Date(scheduledAt)
      },
    });

    return NextResponse.json(
        {
          success: true,
          message: "Booking done successfully",
          booking
        },
        { status: 201 }
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
