import { z } from "zod";

export const signInValidation = z.object({
  email: z
    .string()
    .email("Invalid email format.")
    .min(5, "Email must be at least 5 characters long.")
    .max(100, "Email must be at most 100 characters long."),
    
  password: z
    .string()
});