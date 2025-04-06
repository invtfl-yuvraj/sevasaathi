import { z } from "zod";
import { userValidation } from "./userValidation";

// Password Regex (Allows lowercase, special characters, min 6 chars)
const passwordRegex = /^(?=.*[a-z])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{6,}$/;

export const signUpValidation = userValidation
  .extend({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long.")
      .max(50, "Password must be at most 50 characters long.")
      .regex(
        passwordRegex,
        "Password must contain at least one lowercase letter and can include special characters."
      ),

    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters long.")
      .max(50, "Confirm password must be at most 50 characters long."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  })
  .transform(({ confirmPassword, ...rest }) => rest); 
