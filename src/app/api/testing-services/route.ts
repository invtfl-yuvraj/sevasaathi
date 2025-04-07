import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt"; // Import bcrypt for password hashing
import { BookingStatus } from "@prisma/client"; // Import the enum from Prisma client

// Demo data for bookings
const demoBookings = [
  // Electrician bookings
  {
    userId: "user-001",
    serviceId: "svc-001", // Electrician
    status: BookingStatus.COMPLETED, // Use enum value instead of string
    amount: 120.00,
    scheduledAt: new Date(2025, 3, 1, 10, 0), // April 1, 2025, 10:00 AM
    completedAt: new Date(2025, 3, 1, 11, 30), // April 1, 2025, 11:30 AM
  },
  {
    userId: "user-002",
    serviceId: "svc-001", // Electrician
    status: BookingStatus.COMPLETED, // Use enum value instead of string
    amount: 95.50,
    scheduledAt: new Date(2025, 3, 2, 14, 0), // April 2, 2025, 2:00 PM
    completedAt: new Date(2025, 3, 2, 15, 15), // April 2, 2025, 3:15 PM
  },
  // Add 10 more electrician bookings with different users and dates
  ...Array(10).fill(null).map((_, i) => ({
    userId: `user-${i + 10}`,
    serviceId: "svc-001", // Electrician
    status: BookingStatus.COMPLETED, // Use enum value instead of string
    amount: 100 + Math.random() * 50,
    scheduledAt: new Date(2025, 3, i + 3, 9 + i % 8, 0),
    completedAt: new Date(2025, 3, i + 3, 10 + i % 8, 30),
  })),

  // Plumber bookings
  {
    userId: "user-003",
    serviceId: "svc-002", // Plumber
    status: BookingStatus.COMPLETED, // Use enum value instead of string
    amount: 150.00,
    scheduledAt: new Date(2025, 3, 3, 9, 0), // April 3, 2025, 9:00 AM
    completedAt: new Date(2025, 3, 3, 10, 45), // April 3, 2025, 10:45 AM
  },
  // Add 8 more plumber bookings
  ...Array(8).fill(null).map((_, i) => ({
    userId: `user-${i + 20}`,
    serviceId: "svc-002", // Plumber
    status: BookingStatus.COMPLETED, // Use enum value instead of string
    amount: 130 + Math.random() * 60,
    scheduledAt: new Date(2025, 3, i + 4, 10 + i % 7, 0),
    completedAt: new Date(2025, 3, i + 4, 11 + i % 7, 45),
  })),

  // AC Repair bookings
  {
    userId: "user-004",
    serviceId: "svc-003", // AC Repair
    status: BookingStatus.COMPLETED, // Use enum value instead of string
    amount: 200.00,
    scheduledAt: new Date(2025, 3, 4, 13, 0), // April 4, 2025, 1:00 PM
    completedAt: new Date(2025, 3, 4, 14, 30), // April 4, 2025, 2:30 PM
  },
  // Add 6 more AC Repair bookings
  ...Array(6).fill(null).map((_, i) => ({
    userId: `user-${i + 30}`,
    serviceId: "svc-003", // AC Repair
    status: BookingStatus.COMPLETED, // Use enum value instead of string
    amount: 180 + Math.random() * 70,
    scheduledAt: new Date(2025, 3, i + 5, 11 + i % 6, 0),
    completedAt: new Date(2025, 3, i + 5, 13 + i % 6, 0),
  })),

  // Cleaning bookings
  {
    userId: "user-005",
    serviceId: "svc-004", // Cleaning
    status: BookingStatus.COMPLETED, // Use enum value instead of string
    amount: 80.00,
    scheduledAt: new Date(2025, 3, 5, 10, 0), // April 5, 2025, 10:00 AM
    completedAt: new Date(2025, 3, 5, 13, 0), // April 5, 2025, 1:00 PM
  },
  // Add 5 more Cleaning bookings
  ...Array(5).fill(null).map((_, i) => ({
    userId: `user-${i + 40}`,
    serviceId: "svc-004", // Cleaning
    status: BookingStatus.COMPLETED, // Use enum value instead of string
    amount: 75 + Math.random() * 30,
    scheduledAt: new Date(2025, 3, i + 6, 9 + i % 5, 0),
    completedAt: new Date(2025, 3, i + 6, 12 + i % 5, 0),
  })),

  // Gardening bookings
  {
    userId: "user-006",
    serviceId: "svc-005", // Gardening
    status: BookingStatus.COMPLETED, // Use enum value instead of string
    amount: 110.00,
    scheduledAt: new Date(2025, 3, 6, 15, 0), // April 6, 2025, 3:00 PM
    completedAt: new Date(2025, 3, 6, 17, 0), // April 6, 2025, 5:00 PM
  },
  // Add 4 more Gardening bookings
  ...Array(4).fill(null).map((_, i) => ({
    userId: `user-${i + 50}`,
    serviceId: "svc-005", // Gardening
    status: BookingStatus.COMPLETED, // Use enum value instead of string
    amount: 100 + Math.random() * 40,
    scheduledAt: new Date(2025, 3, i + 7, 14 + i % 4, 0),
    completedAt: new Date(2025, 3, i + 7, 16 + i % 4, 0),
  })),

  // Water filter repair bookings
  {
    userId: "user-007",
    serviceId: "svc-006", // Water filter repair
    status: BookingStatus.COMPLETED, // Use enum value instead of string
    amount: 90.00,
    scheduledAt: new Date(2025, 3, 7, 11, 0), // April 7, 2025, 11:00 AM
    completedAt: new Date(2025, 3, 7, 12, 30), // April 7, 2025, 12:30 PM
  },
  {
    userId: "user-008",
    serviceId: "svc-006", // Water filter repair
    status: BookingStatus.COMPLETED, // Use enum value instead of string
    amount: 85.00,
    scheduledAt: new Date(2025, 3, 8, 16, 0), // April 8, 2025, 4:00 PM
    completedAt: new Date(2025, 3, 8, 17, 15), // April 8, 2025, 5:15 PM
  },
];

// Demo services data
const demoServices = [
  {
    id: "svc-001",
    name: "Electrician",
    description: "Handles all types of electrical repairs",
  },
  {
    id: "svc-002",
    name: "Plumber",
    description: "Fixes leaks and installs piping",
  },
  {
    id: "svc-003",
    name: "AC Repair",
    description: "Air conditioning service and maintenance",
  },
  {
    id: "svc-004",
    name: "Cleaning",
    description: "Home cleaning and sanitation",
  },
  {
    id: "svc-005",
    name: "Gardening",
    description: "Lawn and garden maintenance",
  },
  {
    id: "svc-006",
    name: "Water filter repair",
    description: "Water filter maintenance and repair",
  },
];

// Demo users data updated to match the User schema
const demoUsers = [
  { 
    id: "user-001", 
    username: "johndoe",
    email: "john@example.com", 
    password: "password123",
    phone: "+11234567890",
    age: 32,
    address: "123 Main St",
    zipcode: "10001",
    state: "NY",
    country: "USA",
    isVerified: true
  },
  { 
    id: "user-002", 
    username: "janesmith",
    email: "jane@example.com", 
    password: "password123",
    phone: "+11234567891",
    age: 28,
    address: "456 Elm St",
    zipcode: "10002",
    state: "NY",
    country: "USA",
    isVerified: true
  },
  { 
    id: "user-003", 
    username: "robertjohnson",
    email: "robert@example.com", 
    password: "password123",
    phone: "+11234567892",
    age: 35,
    address: "789 Oak St",
    zipcode: "10003",
    state: "NY",
    country: "USA",
    isVerified: true
  },
  { 
    id: "user-004", 
    username: "emilydavis",
    email: "emily@example.com", 
    password: "password123",
    phone: "+11234567893",
    age: 30,
    address: "101 Pine St",
    zipcode: "10004",
    state: "NY",
    country: "USA",
    isVerified: true
  },
  { 
    id: "user-005", 
    username: "michaelwilson",
    email: "michael@example.com", 
    password: "password123",
    phone: "+11234567894",
    age: 40,
    address: "202 Maple St",
    zipcode: "10005",
    state: "NY",
    country: "USA",
    isVerified: true
  },
  { 
    id: "user-006", 
    username: "sarahbrown",
    email: "sarah@example.com", 
    password: "password123",
    phone: "+11234567895",
    age: 27,
    address: "303 Cedar St",
    zipcode: "10006",
    state: "NY",
    country: "USA",
    isVerified: true
  },
  { 
    id: "user-007", 
    username: "davidmiller",
    email: "david@example.com", 
    password: "password123",
    phone: "+11234567896",
    age: 33,
    address: "404 Birch St",
    zipcode: "10007",
    state: "NY",
    country: "USA",
    isVerified: true
  },
  { 
    id: "user-008", 
    username: "jennifertaylor",
    email: "jennifer@example.com", 
    password: "password123",
    phone: "+11234567897",
    age: 29,
    address: "505 Walnut St",
    zipcode: "10008",
    state: "NY",
    country: "USA",
    isVerified: true
  },
];

// Add more users for the generated bookings
for (let i = 10; i < 60; i++) {
  demoUsers.push({
    id: `user-${i}`,
    username: `user${i}`,
    email: `user${i}@example.com`,
    password: "password123",
    phone: `+12345${i.toString().padStart(5, '0')}`,
    age: 25 + (i % 25),
    address: `${i} Sample St`,
    zipcode: `${10000 + i}`,
    state: "NY",
    country: "USA",
    isVerified: true
  });
}

export async function POST(req: NextRequest) {
  try {
    // Create demo users first (as they're referenced by bookings)
    // Hash passwords before storing
    const hashedPasswordPromises = demoUsers.map(async (user) => {
      const hashedPassword = await hash(user.password, 10);
      return {
        ...user,
        password: hashedPassword
      };
    });
    
    const usersWithHashedPasswords = await Promise.all(hashedPasswordPromises);
    
    // Create users with upsert to prevent duplicates
    await prisma.$transaction(
      usersWithHashedPasswords.map((user) =>
        prisma.user.upsert({
          where: { id: user.id },
          update: user,
          create: user,
        })
      )
    );

    // Create services
    await prisma.$transaction(
      demoServices.map((service) =>
        prisma.service.upsert({
          where: { id: service.id },
          update: service,
          create: service,
        })
      )
    );

    // Create bookings
    const createdBookings = await prisma.$transaction(
      demoBookings.map((booking) =>
        prisma.booking.create({
          data: booking,
        })
      )
    );

    return NextResponse.json(
      {
        success: true,
        message: "Demo data created successfully",
        data: {
          bookingsCreated: createdBookings.length,
          servicesCreated: demoServices.length,
          usersCreated: demoUsers.length,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating demo data:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create demo data",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

// Add a GET endpoint to check the seeding status
export async function GET(req: NextRequest) {
  try {
    const bookingsCount = await prisma.booking.count();
    const servicesCount = await prisma.service.count();
    const usersCount = await prisma.user.count();

    // Get counts by service
    const bookingsByService = await prisma.booking.groupBy({
      by: ["serviceId"],
      _count: true,
    });

    const servicesData = await prisma.service.findMany();
    
    const serviceStats = bookingsByService.map((item) => {
      const service = servicesData.find((s) => s.id === item.serviceId);
      return {
        serviceId: item.serviceId,
        serviceName: service?.name || "Unknown",
        bookingsCount: item._count,
      };
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          totalBookings: bookingsCount,
          totalServices: servicesCount,
          totalUsers: usersCount,
          bookingsByService: serviceStats,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking seed status:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to check seed status",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

// Add a DELETE endpoint to clear the seeded data if needed
export async function DELETE(req: NextRequest) {
  try {
    // Delete all bookings first to avoid foreign key constraints
    await prisma.booking.deleteMany({});
    await prisma.service.deleteMany({
      where: {
        id: { startsWith: "svc-" },
      },
    });
    await prisma.user.deleteMany({
      where: {
        id: { startsWith: "user-" },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Demo data cleared successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error clearing demo data:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to clear demo data",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}