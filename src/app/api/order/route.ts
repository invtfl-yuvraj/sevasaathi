import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/ApiResponse";

export async function POST(req: Request): Promise<NextResponse<ApiResponse>> {
  try {
    const body = await req.json();
    const { address, date, time, services, userId } = body;
    console.log("Received data:", body);

    if (!address || !date || !time || !Array.isArray(services) || !userId) {
      return NextResponse.json(
        { success: false, message: "Invalid input data" },
        { status: 400 }
      );
    }

    console.log(new Date(date));
    
    // Step 1: Create a new Order
    const newOrder = await prisma.order.create({
      data: {
        address: address || "",
        date: new Date(date),
        time: time || "",
        status: "PENDING",
        userId: userId,
      },
    });

    //console.log("New order created:", newOrder);

    // Step 2: Link Services to the Order
    const orderServices = await Promise.all(
      services.map(async (service) => {
        const { name, units, cost } = service;
        console.log("Processing service:", service);
        
        if (!name || typeof units !== "number" || typeof cost !== "number") {
          throw new Error("Invalid service data");
        }

        // Find the service by name
        const existingService = await prisma.service.findUnique({
          where: { name },
        });

        if (!existingService) {
          throw new Error(`Service '${name}' not found`);
        }

        // Create OrderService entry
        return prisma.orderService.create({
          data: {
            serviceId: existingService.id,
            orderId: newOrder.id,
            units,
            cost,
          },
        });
      })
    );

    return NextResponse.json(
      { success: true, message: "Order created successfully", order: newOrder, orderServices },
      { status: 201 }
    );
  } catch (error) {
    //console.error(error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}

// create a basic api to check if the route is working properly

// import { NextResponse } from "next/server";
// import { ApiResponse } from "@/types/ApiResponse";

// export async function GET(req: Request): Promise<NextResponse<ApiResponse>> {
//   return NextResponse.json(
//     { success: true, message: "API is working properly" },
//     { status: 200 }
//   );
// }