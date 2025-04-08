import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const keyword = body.keyword?.trim();

    if (!keyword) {
      return NextResponse.json({
        success: true,
        count: 0,
        keyword: "",
        data: [],
        suggestions: [],
      });
    }

    // Search services matching the keyword in name or description
    const services = await prisma.service.findMany({
      where: {
        OR: [
          {
            name: {
              contains: keyword,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: keyword,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    // Extract unique name suggestions (up to 5)
    const suggestions = Array.from(
      new Set(services.map((service) => service.name))
    ).slice(0, 5);

    return NextResponse.json({
      success: true,
      count: services.length,
      keyword,
      data: services,
      suggestions,
    });
  } catch (error) {
    console.error("Search Services Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
