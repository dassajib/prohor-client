import { z } from "zod"

export const registerSchema = z.object({
    username: z.string().min(3, "Usename must have at least 3 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    "message": "Passwords do not match",
})

export type RegisterInput = z.infer<typeof registerSchema>

export const loginSchemas = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export type LoginInput = z.infer<typeof loginSchemas>
