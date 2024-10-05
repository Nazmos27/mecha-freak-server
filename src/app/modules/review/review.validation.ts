import { z } from 'zod';

export const createReviewValidationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),

  email: z.string().email({ message: 'Invalid email address' }),

  location: z.string().min(1, { message: 'Location is required' }),
  review: z.string().min(1, { message: 'Review is required' }),
  image: z.string().min(1, { message: 'image is required' }),

  rating: z.number().min(0, { message: 'Total price must be at least 0' }),
});

// Zod schema for updating TReview
export const updateReviewValidationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).optional(),

  email: z.string().email({ message: 'Invalid email address' }).optional(),

  location: z.string().min(1, { message: 'Location is required' }).optional(),
  review: z.string().min(1, { message: 'Review is required' }).optional(),
  image: z.string().min(1, { message: 'image is required' }).optional(),

  rating: z
    .number()
    .min(0, { message: 'Total price must be at least 0' })
    .optional(),
});
export const reviewValidations = {
  createReviewValidationSchema,
  updateReviewValidationSchema,
};
