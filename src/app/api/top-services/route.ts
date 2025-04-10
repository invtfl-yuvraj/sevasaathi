import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    // Get query parameters
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get("limit") || "6");
    const categoryId = url.searchParams.get("categoryId") || undefined;
    
    // Get the top services by order count
    const topServices = await prisma.orderService.groupBy({
      by: ["serviceId"],
      _count: { serviceId: true },
      _sum: { units: true },
      orderBy: {
        _count: {
          serviceId: "desc",
        },
      },
      take: limit,
    });

    if (!topServices.length) {
      return NextResponse.json(
        {
          success: false,
          message: "No ordered services found.",
        },
        { status: 404 }
      );
    }

    // Extract service IDs
    const serviceIds = topServices.map((s) => s.serviceId);

    // Fetch all services in one query
    const services = await prisma.service.findMany({
      where: {
        id: { in: serviceIds },
        ...(categoryId && { serviceCategoryId: categoryId }),
      },
      include: {
        serviceCategory: {
          select: {
            name: true,
            id: true,
          },
        },
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
          category: null,
          ordersCount: s._count.serviceId,
          totalUnits: s._sum.units || 0,
        };
      }
      
      return {
        id: service.id,
        name: service.name,
        description: service.description,
        imageURL: service.imageURL,
        amount: service.amount,
        category: service.serviceCategory ? {
          id: service.serviceCategory.id,
          name: service.serviceCategory.name,
        } : null,
        ordersCount: s._count.serviceId,
        totalUnits: s._sum.units || 0,
      };
    });

    // Sort to preserve the original order from the groupBy
    result.sort((a, b) => b.ordersCount - a.ordersCount);

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