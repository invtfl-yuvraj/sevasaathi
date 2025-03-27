import { z } from "zod";
import{ Role } from "@prisma/client"

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^(?:[A-Z]{2,3})?\s?\+?[1-9]\d{0,2}[-.\s]?\d{4,14}$/;
const zipcodeRegex = /^[0-9]{4,10}$/;

export const userValidation = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." })
    .max(25, { message: "Name must be at most 25 characters long." })
    .trim(),

  email: z
    .string()
    .email("Invalid email format.")
    .min(5, "Email must be at least 5 characters long.")
    .max(100, "Email must be at most 100 characters long.")
    .trim()
    .regex(emailRegex, "Invalid email format. Example: user@example.com"),

  age: z
    .number()
    .int({ message: "Age must be an integer." })
    .refine((value) => value === undefined || value >= 0, {
      message: "Age must be a positive number.",
    })
    .optional(),

  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters long." })
    .max(15, { message: "Phone number must be at most 15 characters long." })
    .optional()
    .refine(
      (value) => {
        if (value === undefined || value === null) return true;
        if (value.length === 0) return false;
        return phoneRegex.test(value);
      },
      {
        message: "Phone number must be a valid format",
      }
    ),

  imageURL: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;
        return value.startsWith("http") || value.startsWith("/uploads/");
      },
      {
        message: "Image must be a valid URL or a valid uploaded file path.",
      }
    ),

  rating: z
    .number()
    .min(0, { message: "Rating must be at least 0." })
    .max(5, { message: "Rating must be at most 5." })
    .default(0),

  address: z
    .string()
    .max(255, { message: "Address must be at most 255 characters long." })
    .optional(),

  zipcode: z
    .string()
    .regex(zipcodeRegex, { message: "Invalid zipcode format." })
    .optional(),

  state: z
    .string()
    .max(50, { message: "State must be at most 50 characters long." })
    .optional(),

  country: z
    .string()
    .max(50, { message: "Country must be at most 50 characters long." })
    .optional(),

  role: z.nativeEnum(Role),
});
