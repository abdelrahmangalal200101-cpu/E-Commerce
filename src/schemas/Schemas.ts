import * as z from "zod";

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be less than 20 characters")
      .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters"),

    email: z.string().trim().email("Invalid email address").toLowerCase(),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Password must contain uppercase, lowercase, number and special character",
      ),

    rePassword: z.string(),

    phone: z
      .string()
      .trim()
      .regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z.string().trim().email("Invalid email address").toLowerCase(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Password must contain uppercase, lowercase, number and special character",
    ),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const checkOutSchema = z.object({
  details: z.string().min(5, "Details must be at least 5 characters"),

  phone: z
    .string()
    .regex(/^01[0-2,5]{1}[0-9]{8}$/, "Invalid Egyptian phone number"),

  city: z.string().min(2, "City is required"),

  postalCode: z.string().regex(/^\d{5}$/, "Postal code must be 5 digits").optional(),
});

export type checkOutSchemaType = z.infer<typeof checkOutSchema>;
