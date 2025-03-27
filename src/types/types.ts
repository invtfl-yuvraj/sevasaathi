// import { User, Worker, Admin, Service, Booking, Payment, Rating, Location, Message, Role, BookingStatus, PaymentStatus } from "@prisma/client";

// //Re-export Prisma types for easy access
// export type { User, Worker, Admin, Service, Booking, Payment, Rating, Location, Message };
// export { Role, BookingStatus, PaymentStatus }; // Export enums

// // Custom Types (DTOs)

// // Type for creating a new user (excluding ID & timestamps)
// export type CreateUserDTO = Omit<User, "id" | "createdAt" | "updatedAt">;

// // Type for updating a user (partial fields)
// export type UpdateUserDTO = Partial<CreateUserDTO>;

// // Type for user response including bookings
// export type UserWithBookings = User & {
//   bookings: Booking[];
// };

// // Type for worker response with service details
// export type WorkerWithService = Worker & {
//   service: Service | null;
// };

// // Type for booking response including user and worker
// export type BookingDetails = Booking & {
//   user: User;
//   worker: Worker | null;
// };

// // Type for creating a new booking
// export type CreateBookingDTO = {
//   userId: string;
//   workerId?: string;
//   serviceId?: string;
//   amount: number;
//   scheduledAt: Date;
// };

// // Type for payment details with booking relation
// export type PaymentDetails = Payment & {
//   booking: Booking;
// };
