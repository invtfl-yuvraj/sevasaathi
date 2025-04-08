import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/ApiResponse";

export async function GET(req: Request): Promise<NextResponse<ApiResponse>> {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        orderServices: {
          include: {
            service: true, // Fetch details of each service
          },
        },
      },
    });

    if (!orders.length) {
      return NextResponse.json(
        { success: false, message: "No orders found for this user" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Orders fetched successfully", orders },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
