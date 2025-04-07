import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt"; // Import bcrypt for password hashing
import { BookingStatus, OrderStatus } from "@prisma/client"; // Import enums from Prisma client

// Demo categories to create first
const demoCategories = [
  {
    id: "cat-001",
    name: "Home Services",
    description: "Services related to home maintenance and repairs",
  },
  {
    id: "cat-002",
    name: "Outdoor Services",
    description: "Services for outdoor maintenance and landscaping",
  },
  {
    id: "cat-003",
    name: "Appliance Services",
    description: "Services for appliance repair and maintenance",
  },
];

// Demo services data modified to use direct serviceCategoryId reference
const demoServices = [
  {
    id: "svc-001",
    name: "Electrician",
    description: "Handles all types of electrical repairs",
    serviceCategoryId: "cat-001", // Direct reference to category
    amount: 80.00,
  },
  {
    id: "svc-002",
    name: "Plumber",
    description: "Fixes leaks and installs piping",
    serviceCategoryId: "cat-001", // Direct reference to category
    amount: 90.00,
  },
  {
    id: "svc-003",
    name: "AC Repair",
    description: "Air conditioning service and maintenance",
    serviceCategoryId: "cat-001", // Direct reference to category
    amount: 120.00,
  },
  {
    id: "svc-004",
    name: "Cleaning",
    description: "Home cleaning and sanitation",
    serviceCategoryId: "cat-001", // Direct reference to category
    amount: 60.00,
  },
  {
    id: "svc-005",
    name: "Gardening",
    description: "Lawn and garden maintenance",
    serviceCategoryId: "cat-002", // Direct reference to category
    amount: 70.00,
  },
  {
    id: "svc-006",
    name: "Water filter repair",
    description: "Water filter maintenance and repair",
    serviceCategoryId: "cat-003", // Direct reference to category
    amount: 50.00,
  },
];

// Demo users data
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

// Base demo bookings data
const baseBookings = [
  // Electrician bookings
  {
    userId: "user-001",
    serviceId: "svc-001", // Electrician
    status: BookingStatus.COMPLETED,
    amount: 120.00,
    scheduledAt: new Date(2025, 3, 1, 10, 0), // April 1, 2025, 10:00 AM
    completedAt: new Date(2025, 3, 1, 11, 30), // April 1, 2025, 11:30 AM
  },
  {
    userId: "user-002",
    serviceId: "svc-001", // Electrician
    status: BookingStatus.COMPLETED,
    amount: 95.50,
    scheduledAt: new Date(2025, 3, 2, 14, 0), // April 2, 2025, 2:00 PM
    completedAt: new Date(2025, 3, 2, 15, 15), // April 2, 2025, 3:15 PM
  },
  // Add 10 more electrician bookings with different users and dates
  ...Array(10).fill(null).map((_, i) => ({
    userId: `user-${i + 10}`,
    serviceId: "svc-001", // Electrician
    status: BookingStatus.COMPLETED,
    amount: 100 + Math.random() * 50,
    scheduledAt: new Date(2025, 3, i + 3, 9 + i % 8, 0),
    completedAt: new Date(2025, 3, i + 3, 10 + i % 8, 30),
  })),

  // Plumber bookings
  {
    userId: "user-003",
    serviceId: "svc-002", // Plumber
    status: BookingStatus.COMPLETED,
    amount: 150.00,
    scheduledAt: new Date(2025, 3, 3, 9, 0), // April 3, 2025, 9:00 AM
    completedAt: new Date(2025, 3, 3, 10, 45), // April 3, 2025, 10:45 AM
  },
  // Add 8 more plumber bookings
  ...Array(8).fill(null).map((_, i) => ({
    userId: `user-${i + 20}`,
    serviceId: "svc-002", // Plumber
    status: BookingStatus.COMPLETED,
    amount: 130 + Math.random() * 60,
    scheduledAt: new Date(2025, 3, i + 4, 10 + i % 7, 0),
    completedAt: new Date(2025, 3, i + 4, 11 + i % 7, 45),
  })),

  // AC Repair bookings
  {
    userId: "user-004",
    serviceId: "svc-003", // AC Repair
    status: BookingStatus.COMPLETED,
    amount: 200.00,
    scheduledAt: new Date(2025, 3, 4, 13, 0), // April 4, 2025, 1:00 PM
    completedAt: new Date(2025, 3, 4, 14, 30), // April 4, 2025, 2:30 PM
  },
  // Add 6 more AC Repair bookings
  ...Array(6).fill(null).map((_, i) => ({
    userId: `user-${i + 30}`,
    serviceId: "svc-003", // AC Repair
    status: BookingStatus.COMPLETED,
    amount: 180 + Math.random() * 70,
    scheduledAt: new Date(2025, 3, i + 5, 11 + i % 6, 0),
    completedAt: new Date(2025, 3, i + 5, 13 + i % 6, 0),
  })),

  // Cleaning bookings
  {
    userId: "user-005",
    serviceId: "svc-004", // Cleaning
    status: BookingStatus.COMPLETED,
    amount: 80.00,
    scheduledAt: new Date(2025, 3, 5, 10, 0), // April 5, 2025, 10:00 AM
    completedAt: new Date(2025, 3, 5, 13, 0), // April 5, 2025, 1:00 PM
  },
  // Add 5 more Cleaning bookings
  ...Array(5).fill(null).map((_, i) => ({
    userId: `user-${i + 40}`,
    serviceId: "svc-004", // Cleaning
    status: BookingStatus.COMPLETED,
    amount: 75 + Math.random() * 30,
    scheduledAt: new Date(2025, 3, i + 6, 9 + i % 5, 0),
    completedAt: new Date(2025, 3, i + 6, 12 + i % 5, 0),
  })),

  // Gardening bookings
  {
    userId: "user-006",
    serviceId: "svc-005", // Gardening
    status: BookingStatus.COMPLETED,
    amount: 110.00,
    scheduledAt: new Date(2025, 3, 6, 15, 0), // April 6, 2025, 3:00 PM
    completedAt: new Date(2025, 3, 6, 17, 0), // April 6, 2025, 5:00 PM
  },
  // Add 4 more Gardening bookings
  ...Array(4).fill(null).map((_, i) => ({
    userId: `user-${i + 50}`,
    serviceId: "svc-005", // Gardening
    status: BookingStatus.COMPLETED,
    amount: 100 + Math.random() * 40,
    scheduledAt: new Date(2025, 3, i + 7, 14 + i % 4, 0),
    completedAt: new Date(2025, 3, i + 7, 16 + i % 4, 0),
  })),

  // Water filter repair bookings
  {
    userId: "user-007",
    serviceId: "svc-006", // Water filter repair
    status: BookingStatus.COMPLETED,
    amount: 90.00,
    scheduledAt: new Date(2025, 3, 7, 11, 0), // April 7, 2025, 11:00 AM
    completedAt: new Date(2025, 3, 7, 12, 30), // April 7, 2025, 12:30 PM
  },
  {
    userId: "user-008",
    serviceId: "svc-006", // Water filter repair
    status: BookingStatus.COMPLETED,
    amount: 85.00,
    scheduledAt: new Date(2025, 3, 8, 16, 0), // April 8, 2025, 4:00 PM
    completedAt: new Date(2025, 3, 8, 17, 15), // April 8, 2025, 5:15 PM
  },
];

// Create order IDs for bookings
const demoOrders = baseBookings.map((booking, index) => ({
  id: `order-${index + 1}`,
  userId: booking.userId,
  address: demoUsers.find(user => user.id === booking.userId)?.address || "Default Address",
  date: booking.scheduledAt,
  time: `${booking.scheduledAt.getHours()}:${booking.scheduledAt.getMinutes().toString().padStart(2, '0')}`,
  status: OrderStatus.COMPLETED
}));

// Add orderIds to bookings
const demoBookings = baseBookings.map((booking, index) => ({
  ...booking,
  orderId: `order-${index + 1}`
}));

// Create demo order services
const demoOrderServices = demoOrders.map((order, index) => {
  const booking = demoBookings[index];
  return {
    id: `orderservice-${index + 1}`,
    serviceId: booking.serviceId || "svc-001",
    orderId: order.id,
    units: 1,
    cost: booking.amount
  };
});

export async function POST(req: NextRequest) {
  try {
    // First create categories
    await prisma.$transaction(
      demoCategories.map((category) =>
        prisma.serviceCategory.upsert({
          where: { id: category.id },
          update: category,
          create: category,
        })
      )
    );

    // Create demo users (as they're referenced by bookings)
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

    // Create orders first (as they're referenced by bookings)
    await prisma.$transaction(
      demoOrders.map((order) =>
        prisma.order.upsert({
          where: { id: order.id },
          update: order,
          create: order,
        })
      )
    );

    // Create bookings with order references
    const createdBookings = await prisma.$transaction(
      demoBookings.map((booking) =>
        prisma.booking.create({
          data: booking,
        })
      )
    );

    // Create order services
    await prisma.$transaction(
      demoOrderServices.map((orderService) =>
        prisma.orderService.create({
          data: orderService,
        })
      )
    );

    return NextResponse.json(
      {
        success: true,
        message: "Demo data created successfully",
        data: {
          categoriesCreated: demoCategories.length,
          bookingsCreated: createdBookings.length,
          servicesCreated: demoServices.length,
          usersCreated: demoUsers.length,
          ordersCreated: demoOrders.length,
          orderServicesCreated: demoOrderServices.length,
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

// GET endpoint to check the seeding status and test top-services API compatibility
export async function GET(req: NextRequest) {
  try {
    const bookingsCount = await prisma.booking.count();
    const servicesCount = await prisma.service.count();
    const usersCount = await prisma.user.count();
    const categoriesCount = await prisma.serviceCategory.count();
    const ordersCount = await prisma.order.count();
    const orderServicesCount = await prisma.orderService.count();

    // Get counts by service - similar to top-services API logic
    const bookingsByService = await prisma.booking.groupBy({
      by: ["serviceId"],
      where: {
        serviceId: { not: null },
      },
      _count: {
        serviceId: true,  // This creates _count.serviceId in the result
      },
      orderBy: {
        _count: {
          serviceId: "desc",
        },
      },
    });

    const servicesData = await prisma.service.findMany();
    
    // Fix: Access _count correctly from the groupBy result
    const serviceStats = bookingsByService.map((item) => {
      // Find the service info
      const service = servicesData.find((s) => s.id === item.serviceId);
      
      // Return the formatted object
      return {
        id: item.serviceId,
        name: service?.name || "Unknown Service",
        description: service?.description || "Service details not found",
        bookingsCount: item._count.serviceId,  // This is the correct way to access the count
      };
    });

    // Sort by bookings count in descending order
    serviceStats.sort((a, b) => b.bookingsCount - a.bookingsCount);

    return NextResponse.json(
      {
        success: true,
        data: {
          totalBookings: bookingsCount,
          totalServices: servicesCount,
          totalUsers: usersCount,
          totalCategories: categoriesCount,
          totalOrders: ordersCount,
          totalOrderServices: orderServicesCount,
          topServices: serviceStats.slice(0, 6), // Limit to 6 like the top-services API
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

// DELETE endpoint to clear the seeded data if needed
export async function DELETE(req: NextRequest) {
  try {
    // Delete in the correct order to avoid foreign key constraints
    // First delete related records
    await prisma.orderService.deleteMany({});
    await prisma.booking.deleteMany({});
    await prisma.order.deleteMany({});
    
    await prisma.service.deleteMany({
      where: {
        id: { in: demoServices.map(s => s.id) },
      },
    });
    
    await prisma.serviceCategory.deleteMany({
      where: {
        id: { in: demoCategories.map(c => c.id) },
      },
    });
    
    await prisma.user.deleteMany({
      where: {
        id: { in: demoUsers.map(u => u.id) },
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

// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// export async function GET(req: NextRequest) {
//   try {
//     // Try a single, simple query
//     const categoryCount = await prisma.serviceCategory.count();
    
//     return NextResponse.json(
//       {
//         success: true,
//         message: `Prisma is working! Found ${categoryCount} categories.`
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error accessing Prisma:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to access database",
//         error: (error as Error).message,
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(req: NextRequest) {
//   try {
//     console.log("Starting demo data creation...");
    
//     // First create a single category to test
//     console.log("Testing with a single category creation...");
//     const testCategory = await prisma.serviceCategory.create({
//       data: {
//         name: "Test Category",
//         description: "Test category description"
//       }
//     });
    
//     console.log("Successfully created test category:", testCategory);
    
//     // If that works, proceed with the rest of your seeding logic...
    
//     return NextResponse.json(
//       {
//         success: true,
//         message: "Test category created successfully",
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error creating demo data:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to create demo data",
//         error: (error as Error).message,
//         stack: (error as Error).stack,
//       },
//       { status: 500 }
//     );
//   }
// }