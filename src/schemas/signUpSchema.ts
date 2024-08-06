import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username must be atlist 2 characters")
  .max(30, "Username must be atmost 30 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special character");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "invalid emial address" }),
  password: z
    .string()
    .min(6, { message: "password must be at least 6 characters" }),
});
