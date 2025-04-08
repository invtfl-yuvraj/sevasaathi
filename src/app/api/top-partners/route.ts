import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    // Get limit from query params
    const searchParams = req.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10');

    // Get captains with their associated user data, sorted by captain rating
    const topCaptains = await prisma.captain.findMany({
      where: {
        user: {
          isVerified: true
        }
      },
      select: {
        id: true,
        userId: true,
        serviceId: true,
        rating: true, // Using Captain's rating as primary rating
        experience: true,
        hourlyRate: true,
        location: true,
        availability: true,
        service: {
          select: {
            name: true,
            description: true
          }
        },
        user: {
          select: {
            username: true,
            imageURL: true,
            state: true,
            country: true
          }
        },
        _count: {
          select: {
            bookings: true // Count bookings for frequency
          }
        }
      },
      orderBy: {
        rating: 'desc' // Sort by captain rating in descending order
      },
      take: limit * 2 // Fetch more initially as we'll apply additional sorting
    });

    // Calculate a weighted score considering rating and booking frequency
    const scoredCaptains = topCaptains.map(captain => {
      // Create a weighted score with higher emphasis on rating
      const ratingWeight = 0.8;
      const bookingWeight = 0.2;
      
      // Normalize booking count
      const normalizedBookings = Math.min(captain._count.bookings / 10, 5);
      
      // Calculate composite score
      const score = (captain.rating * ratingWeight) + (normalizedBookings * bookingWeight);
      
      return {
        ...captain,
        score,
        bookingsCount: captain._count.bookings
      };
    });

    // Sort by the composite score in descending order
    const sortedCaptains = scoredCaptains.sort((a, b) => b.score - a.score);

    // Take only the requested number of captains and format for response
    const result = sortedCaptains.slice(0, limit).map(captain => ({
      id: captain.id,
      userId: captain.userId,
      username: captain.user.username,
      imageURL: captain.user.imageURL || "/default-avatar.png",
      state: captain.user.state,
      country: captain.user.country,
      rating: captain.rating,
      experience: captain.experience,
      hourlyRate: captain.hourlyRate,
      bookingsCount: captain.bookingsCount,
      location: captain.location,
      availability: captain.availability,
      service: captain.service ? {
        id: captain.serviceId,
        name: captain.service.name,
        description: captain.service.description
      } : null
    }));

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching top captains:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      { status: 500 }
    );
  }
}