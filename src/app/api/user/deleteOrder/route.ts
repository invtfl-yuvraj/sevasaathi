import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/ApiResponse";

export async function DELETE(req: Request): Promise<NextResponse<ApiResponse>> {
  try {
    const { orderId } = await req.json();
    console.log("Received data:", orderId);

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: "Order ID is required" },
        { status: 400 }
      );
    }

    //await prisma.orderService.deleteMany({ where: { orderId } });
    await prisma.order.delete({ where: { id: orderId } });

    return NextResponse.json(
      { success: true, message: "Order deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
