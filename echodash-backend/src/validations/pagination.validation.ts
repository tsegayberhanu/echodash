
import { z } from 'zod';

export const paginationSchema = z.object({
  _page: z
    .string()
    .optional()
    .transform((val) => Number(val || "1"))
    .refine((val) => val > 0, { message: "Page must be greater than 0" }),
  _limit: z
    .string()
    .optional()
    .transform((val) => Number(val || "30"))
    .refine((val) => val > 0 && val <= 100, { message: "Limit must be 1-100" }),
  _search: z.string().optional(),
  _sort: z.string().optional(),
  _order: z.enum(['asc', 'desc']).optional().default('desc'),
});

export type PaginationParams = z.infer<typeof paginationSchema>;