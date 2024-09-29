import { z } from "zod";

// Zod schema for TOrderInfo
export const orderInfoSchema = z.object({
  product: z.string(),
  price: z.number().nonnegative(),
  quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
});

// Zod schema for creating TOrder
export const createOrderValidationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  phone: z
    .string()
    .max(20, { message: "Phone number cannot be more than 20 digits" }),
  email: z.string().email({ message: "Invalid email address" }),
  deliveryAddress: z
    .string()
    .min(1, { message: "Delivery address is required" }),
  totalPrice: z.number().min(0, { message: "Total price must be at least 0" }),
  orderStatus: z.enum(["unpaid", "paid", "confirmed", "delivered"]),
  orderInfo: z.array(orderInfoSchema),
});

// Zod schema for updating TOrder
export const updateOrderValidationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).optional(),
  phone: z
    .string()
    .max(20, { message: "Phone number cannot be more than 20 digits" })
    .optional(),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  deliveryAddress: z
    .string()
    .min(1, { message: "Delivery address is required" })
    .optional(),
  totalPrice: z
    .number()
    .min(0, { message: "Total price must be at least 0" })
    .optional(),
  orderStatus: z.enum(["pending", "paid", "confirmed", "delivered"]).optional(),
  orderInfo: z.array(orderInfoSchema).optional(),
  isDeleted: z.boolean().optional(),
});

export const orderValidations = {
  createOrderValidationSchema,
  updateOrderValidationSchema,
};