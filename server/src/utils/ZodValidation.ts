import { z } from "zod";

export const userSchema = z.object({
    username: z.string().min(3).max(12),
    email: z.string().email(),
    password: z.string().min(6).max(16),
    firstName: z.string().min(3).max(12),
    lastName: z.string().min(3).max(12),
});

export type User = z.infer<typeof userSchema>;
