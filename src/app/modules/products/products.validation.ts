import { z } from 'zod';

export const createProductSchema = z.object({
  title: z.string().nonempty('Product title is required.'),
  brand: z.string().nonempty('Product brand is required.'),
  price: z
    .number()
    .positive('Product price must be greater than 0.')
    .refine((value) => value > 0, {
      message: 'Product price must be a positive number.',
    }),
  size: z.string().nonempty('Product size is required.'),
  inventory: z
    .number()
    .nonnegative('Inventory must be a non-negative number.')
    .int('Inventory must be an integer.'),
  category: z.object({
    id: z.string().nonempty('Category ID is required.'),
    title: z.string().nonempty('Category title is required.'),
    subCategory: z.object({
      id: z.string().nonempty('SubCategory ID is required.'),
      title: z.string().nonempty('SubCategory title is required.'),
    }),
  }),
  have_offer: z.boolean(),
  offer: z
    .object({
      buy1get1: z.boolean(),
      free_delivery: z.boolean(),
      percentage: z
        .number()
        .min(0, 'Offer percentage must be at least 0.')
        .max(100, 'Offer percentage must be at most 100.'),
    })
    .optional(),
  tax: z
    .number()
    .min(0, 'Tax must be at least 0.')
    .max(100, 'Tax must be at most 100.')
    .optional(),
  status: z.enum(['published', 'unpublished'], {
    errorMap: () => ({
      message: 'Status must be either "published" or "unpublished".',
    }),
  }),
});

// Validation for updating a product
export const ProductSchemeValidation = createProductSchema.partial();
