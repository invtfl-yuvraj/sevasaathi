// File path: /app/api/top-partners/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    // Get top 6 captains by rating
    const topCaptains = await prisma.captain.findMany({
      take: 6,
      orderBy: {
        rating: "desc",
      },
      include: {
        user: {
          select: {
            username: true,
            email: true,
          },
        },
        service: {
          select: {
            name: true,
          },
        },
      },
    });

    const formattedCaptains = topCaptains.map((captain) => ({
      id: captain.id,
      name: captain.user.username,
      email: captain.user.email,
      service: captain.service?.name || "No service assigned",
      rating: captain.rating,
      experience: captain.experience,
      
    }));

    return NextResponse.json(
      {
        success: true,
        data: formattedCaptains
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching top partners:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch top partners",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}