import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(10, { message: "contain must be at least 10 characters" })
    .max(300, { message: "contain must be at most 300 characters" }),
});
