import { z } from "zod";

export const userSchema = z.object({
  username: z
    .string({ message: "username should be string" })
    .min(3, "username should atleast have 3 characters")
    .max(20, "username can have 20 max character")
    .regex(/^[a-z0-9_.]{1,20}$/, {
      message: "Username can only contain lowercase letters, numbers, underscores, and periods. e.g: user123"
    }),
  email: z
    .string({ message: "email is required!!" })
    .min(3, { message: "email must be at least 3 characters long." })
    .max(150, { message: "email can be at most 150 characters long." })
    .regex(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, {
      message: "Invalid email format. e.g: john.doe@example.com"
    }),
  password: z
    .string({ message: "password is required!!" })
    .min(6, { message: "password must be at least 6 characters long." })
    .max(50, { message: "password can be at most 50 characters long." })
});
