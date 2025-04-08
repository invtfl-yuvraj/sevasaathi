import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt"; // Import bcrypt for password hashing
import { BookingStatus, OrderStatus, Role } from "@prisma/client"; // Import enums from Prisma client

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
  // ... (other users)
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

// NEW CODE: Demo captain users
const demoCaptainUsers = [
  { 
    id: "user-cap-001", 
    username: "alexsmith",
    email: "alex.smith@example.com", 
    password: "password123",
    phone: "+11234567899",
    age: 35,
    address: "123 Captain St",
    zipcode: "10010",
    state: "NY",
    country: "USA",
    isVerified: true,
    role: Role.CAPTAIN
  },
  { 
    id: "user-cap-002", 
    username: "sarahwilson",
    email: "sarah.wilson@example.com", 
    password: "password123",
    phone: "+11234567898",
    age: 30,
    address: "456 Captain Ave",
    zipcode: "10011",
    state: "NY",
    country: "USA",
    isVerified: true,
    role: Role.CAPTAIN
  },
  { 
    id: "user-cap-003", 
    username: "michaelbrown",
    email: "michael.brown@example.com", 
    password: "password123",
    phone: "+11234567897",
    age: 28,
    address: "789 Captain Blvd",
    zipcode: "10012",
    state: "NY",
    country: "USA",
    isVerified: true,
    role: Role.CAPTAIN
  },
];

// Add more captain users for each service type
const serviceIds = ["svc-001", "svc-002", "svc-003", "svc-004", "svc-005", "svc-006"];
for (let i = 1; i <= 12; i++) {
  const serviceIndex = (i - 1) % serviceIds.length;
  demoCaptainUsers.push({
    id: `user-cap-${i + 3}`, 
    username: `captain${i}`,
    email: `captain${i}@example.com`,
    password: "password123",
    phone: `+19876${i.toString().padStart(5, '0')}`,
    age: 25 + (i % 15),
    address: `${i} Captain Road`,
    zipcode: `${20000 + i}`,
    state: "NY",
    country: "USA",
    isVerified: true,
    role: Role.CAPTAIN
  });
}

// NEW CODE: Captain profile data
const demoCaptains = [
  {
    id: "captain-001",
    userId: "user-cap-001",
    serviceId: "svc-001", // Electrician
    availability: true,
    experience: 8,
    hourlyRate: 75.0,
    location: "Manhattan, NY",
    rating: 4.8
  },
  {
    id: "captain-002",
    userId: "user-cap-002",
    serviceId: "svc-002", // Plumber
    availability: true,
    experience: 6,
    hourlyRate: 85.0,
    location: "Brooklyn, NY",
    rating: 4.7
  },
  {
    id: "captain-003",
    userId: "user-cap-003",
    serviceId: "svc-003", // AC Repair
    availability: true,
    experience: 10,
    hourlyRate: 95.0,
    location: "Queens, NY",
    rating: 4.9
  },
];

// Generate captain profiles for each captain user
for (let i = 1; i <= 12; i++) {
  const serviceIndex = (i - 1) % serviceIds.length;
  const serviceId = serviceIds[serviceIndex];
  const serviceName = demoServices.find(s => s.id === serviceId)?.name || "Service";
  
  demoCaptains.push({
    id: `captain-${i + 3}`,
    userId: `user-cap-${i + 3}`,
    serviceId: serviceId,
    availability: Math.random() > 0.3, // 70% available
    experience: 2 + Math.floor(Math.random() * 10), // 2-12 years
    hourlyRate: 50 + Math.floor(Math.random() * 50), // $50-$100
    location: ["Manhattan, NY", "Brooklyn, NY", "Queens, NY", "Bronx, NY", "Staten Island, NY"][i % 5],
    rating: 3.5 + (Math.random() * 1.5) // Rating 3.5-5.0
  });
}

// NEW CODE: Captain location data
const demoCaptainLocations = demoCaptains.map(captain => ({
  id: `location-${captain.id}`,
  captainId: captain.id,
  latitude: 40.7128 + (Math.random() * 0.1 - 0.05), // Around NYC latitude
  longitude: -74.0060 + (Math.random() * 0.1 - 0.05), // Around NYC longitude
  city: captain.location.split(', ')[0]
}));

// Base demo bookings data
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
  // Plumber booking
  {
    userId: "user-002",
    serviceId: "svc-002", // Plumber
    status: BookingStatus.COMPLETED,
    amount: 90.00,
    scheduledAt: new Date(2025, 3, 2, 14, 0), // April 2, 2025, 2:00 PM
    completedAt: new Date(2025, 3, 2, 16, 0), // April 2, 2025, 4:00 PM
  },
  // AC Repair booking
  {
    userId: "user-10",
    serviceId: "svc-003", // AC Repair
    status: BookingStatus.COMPLETED,
    amount: 150.00,
    scheduledAt: new Date(2025, 3, 3, 9, 0), // April 3, 2025, 9:00 AM
    completedAt: new Date(2025, 3, 3, 12, 0), // April 3, 2025, 12:00 PM
  },
  // Cleaning booking
  {
    userId: "user-11",
    serviceId: "svc-004", // Cleaning
    status: BookingStatus.COMPLETED,
    amount: 70.00,
    scheduledAt: new Date(2025, 3, 4, 13, 0), // April 4, 2025, 1:00 PM
    completedAt: new Date(2025, 3, 4, 15, 30), // April 4, 2025, 3:30 PM
  },
  // Gardening booking
  {
    userId: "user-12",
    serviceId: "svc-005", // Gardening
    status: BookingStatus.COMPLETED,
    amount: 60.00,
    scheduledAt: new Date(2025, 3, 5, 10, 0), // April 5, 2025, 10:00 AM
    completedAt: new Date(2025, 3, 5, 13, 0), // April 5, 2025, 1:00 PM
  },
  // Water filter repair booking
  {
    userId: "user-13",
    serviceId: "svc-006", // Water filter repair
    status: BookingStatus.COMPLETED,
    amount: 45.00,
    scheduledAt: new Date(2025, 3, 6, 16, 0), // April 6, 2025, 4:00 PM
    completedAt: new Date(2025, 3, 6, 17, 0), // April 6, 2025, 5:00 PM
  }
];

// Additional bookings for popular services
for (let i = 0; i < 5; i++) {
  baseBookings.push({
    userId: `user-${20 + i}`,
    serviceId: "svc-001", // Electrician - make it popular
    status: BookingStatus.COMPLETED,
    amount: 110.00 + (Math.random() * 20),
    scheduledAt: new Date(2025, 3, 7 + i, 9 + i, 0), 
    completedAt: new Date(2025, 3, 7 + i, 11 + i, 30),
  });
}

for (let i = 0; i < 3; i++) {
  baseBookings.push({
    userId: `user-${25 + i}`,
    serviceId: "svc-003", // AC Repair - second most popular
    status: BookingStatus.COMPLETED,
    amount: 140.00 + (Math.random() * 20),
    scheduledAt: new Date(2025, 3, 12 + i, 10 + i, 0), 
    completedAt: new Date(2025, 3, 12 + i, 13 + i, 0),
  });
}

// Create order IDs for bookings
const demoOrders = baseBookings.map((booking, index) => ({
  id: `order-${index + 1}`,
  userId: booking.userId,
  address: demoUsers.find(user => user.id === booking.userId)?.address || "Default Address",
  date: booking.scheduledAt,
  time: `${booking.scheduledAt.getHours()}:${booking.scheduledAt.getMinutes().toString().padStart(2, '0')}`,
  status: OrderStatus.COMPLETED
}));

// Add orderIds to bookings but don't modify the objects directly
// Instead, create a new array with orderId included
const demoBookings = baseBookings.map((booking, index) => {
  return {
    ...booking,
    orderId: `order-${index + 1}` // Match the order ID format without timestamp
  };
});

// Create an array of captain assignments that we'll use later
const captainAssignments = demoBookings.map(booking => {
  // Find captains with matching service
  const matchingCaptains = demoCaptains.filter(captain => captain.serviceId === booking.serviceId);
  if (matchingCaptains.length > 0) {
    // Choose a random matching captain
    const randomCaptain = matchingCaptains[Math.floor(Math.random() * matchingCaptains.length)];
    return {
      bookingId: booking.orderId,
      captainId: randomCaptain.id
    };
  }
  return null;
}).filter(Boolean); // Remove null values

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

    // NEW CODE: Create captain users
    const hashedCaptainPasswordPromises = demoCaptainUsers.map(async (user) => {
      const hashedPassword = await hash(user.password, 10);
      return {
        ...user,
        password: hashedPassword
      };
    });
    
    const captainsWithHashedPasswords = await Promise.all(hashedCaptainPasswordPromises);
    
    // Create captain users with upsert
    await prisma.$transaction(
      captainsWithHashedPasswords.map((user) =>
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

    // NEW CODE: Create captain profiles
    await prisma.$transaction(
      demoCaptains.map((captain) =>
        prisma.captain.upsert({
          where: { id: captain.id },
          update: captain,
          create: captain,
        })
      )
    );

    // NEW CODE: Create captain locations
    await prisma.$transaction(
      demoCaptainLocations.map((location) =>
        prisma.location.upsert({
          where: { captainId: location.captainId },
          update: location,
          create: location,
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

    // Create bookings without captainId first
    const createdBookings = await prisma.$transaction(
      demoBookings.map((booking) =>
        prisma.booking.upsert({
          where: { orderId: booking.orderId },
          update: booking,
          create: booking,
        })
      )
    );

    // FIXED CODE: Now assign captains to bookings in a separate step
    // This avoids the TypeScript error by using Prisma's update method
    if (captainAssignments.length > 0) {
      await prisma.$transaction(
        captainAssignments
          .filter((assignment): assignment is NonNullable<typeof assignment> => assignment !== null)
          .map(assignment => 
            prisma.booking.update({
              where: { orderId: assignment.bookingId },
              data: { captainId: assignment.captainId }
            })
          )
      );
    }

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
          usersCreated: demoUsers.length + demoCaptainUsers.length,
          captainsCreated: demoCaptains.length,
          locationCreated: demoCaptainLocations.length,
          captainAssignments: captainAssignments.length,
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
    // NEW CODE: Count captains and locations
    const captainsCount = await prisma.captain.count();
    const locationsCount = await prisma.location.count();

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

    // NEW CODE: Get top captains by rating
    const topCaptains = await prisma.captain.findMany({
      take: 5,
      orderBy: {
        rating: "desc"
      },
      include: {
        user: {
          select: {
            username: true,
            email: true
          }
        },
        service: {
          select: {
            name: true
          }
        }
      }
    });

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
          totalCaptains: captainsCount,
          totalLocations: locationsCount,
          topServices: serviceStats.slice(0, 6), // Limit to 6 like the top-services API
          topCaptains: topCaptains.map(captain => ({
            id: captain.id,
            name: captain.user.username,
            email: captain.user.email,
            service: captain.service?.name || "No service assigned",
            rating: captain.rating,
            experience: captain.experience
          }))
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
    
    // NEW CODE: Delete captain locations
    await prisma.location.deleteMany({
      where: {
        captainId: { in: demoCaptains.map(c => c.id) },
      },
    });
    
    // NEW CODE: Delete captains
    await prisma.captain.deleteMany({
      where: {
        id: { in: demoCaptains.map(c => c.id) },
      },
    });
    
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
    
    // Delete all demo users including captain users
    const allUserIds = [
      ...demoUsers.map(u => u.id),
      ...demoCaptainUsers.map(u => u.id)
    ];
    
    await prisma.user.deleteMany({
      where: {
        id: { in: allUserIds },
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