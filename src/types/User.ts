import {
  Role,
  Captain,
  Admin,
  Booking,
  Rating,
  Payment,
  Message,
} from "@prisma/client";

export interface User {
    id: string;            
    username: string;     
    email: string;
    age: number | null;  
    password: string;
    imageURL: string | null; 
    phone: string | null;   
    address: string | null; 
    zipcode: string | null; 
    state: string | null; 
    country: string | null; 
    rating: number;  
    role: Role;  
    createdAt: Date; 
    updatedAt: Date; 
    verifyCode: string | null; 
    verifyCodeExpiry: Date | null; 
    isVerified: boolean;

  // Relations
  captains?: Captain[];
  admin?: Admin;
  bookings?: Booking[];
  ratings?: Rating[];
  payments?: Payment[];
  sentMessages?: Message[];
  receivedMessages?: Message[];
}
