import { z } from 'zod';

const createProductValidationSchema = z.object({
  image: z.string().min(1, { message: 'Product image is required' }),

  title: z.string().min(1, { message: 'Product title is required' }),
  brand: z.string().min(1, { message: 'Product brand name is required' }),
  description: z
    .string()
    .min(1, { message: 'Product description is required' }),

  availableQuantity: z
    .number()
    .int()
    .nonnegative({
      message: 'Product quantity must be a non-negative integer',
    }),

  price: z
    .number()
    .nonnegative({ message: 'Product price must be a non-negative integer' }),

  ratings: z
    .number()
    .nonnegative({ message: 'Product ratings must be a non-negative integer' }),
});

const updateProductValidationSchema = z.object({
  image: z.string().min(1, { message: 'Product image is required' }).optional(),

  title: z.string().min(1, { message: 'Product title is required' }).optional(),

  brand: z
    .string()
    .min(1, { message: 'Product brand name is required' })
    .optional(),

  description: z
    .string()
    .min(1, { message: 'Product description is required' })
    .optional(),

  availableQuantity: z
    .number()
    .int()
    .nonnegative({ message: 'Product quantity must be a non-negative integer' })
    .optional(),

  price: z
    .number()
    .int()
    .nonnegative({ message: 'Product price must be a non-negative integer' })
    .optional(),
});

export const productsValidation = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
