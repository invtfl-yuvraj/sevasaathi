import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    // Get the top 5 services by booking count
    const topServices = await prisma.booking.groupBy({
      by: ["serviceId"],
      where: {
        serviceId: { not: null },
        
      },
      _count: { serviceId: true },
      orderBy: {
        _count: {
          serviceId: "desc",
        },
      },
      take: 6,
    });

    if (!topServices.length) {
      return NextResponse.json(
        {
          success: false,
          message: "No bookings found.",
        },
        { status: 404 }
      );
    }

    // Extract service IDs
    const serviceIds = topServices.map((s) => s.serviceId as string);

    // Fetch all services in one query
    const services = await prisma.service.findMany({
      where: {
        id: { in: serviceIds },
      },
    });

    // Map the results with proper typing and error handling
    const result = topServices.map((s) => {
      const service = services.find((serv) => serv.id === s.serviceId);
      
      if (!service) {
        return {
          id: s.serviceId,
          name: "Unknown Service",
          description: "Service details not found",
          bookingsCount: s._count.serviceId,
        };
      }
      
      return {
        id: service.id,
        name: service.name,
        description: service.description,
        bookingsCount: s._count.serviceId,
      };
    });

    // Sort to preserve the original order from the groupBy
    result.sort((a, b) => b.bookingsCount - a.bookingsCount);

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching top services:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      { status: 500 }
    );
  }
}