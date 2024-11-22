const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid Email address" })
    .min(3, { message: "email must be at least of 3 characters." })
    .max(255, { message: "email must not exceed more than 255 characters." }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least of 6 characters." })
    .max(255, {
      message: "Password must not exceed more than 255 characters.",
    }),
});

const signupSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least of 3 characters." })
    .max(255, { message: "Name must not exceed more than 255 characters." }),

  phone: z
    .string({ required_error: "phone number is required" })
    .trim()
    .min(10, { message: "phone no. must be at least of 10 characters." })
    .max(16, { message: "phone no. must not exceed more than 16 characters." }),
});

module.exports = { signupSchema, loginSchema };
