import { z } from "zod";

export const createSongSchema = z.object({
  title: z.string()
    .min(1, "Title is required")   
    .transform((val: string) => val.trim()),
  artist: z.string()
    .min(1, "Artist is required")
    .transform((val: string) => val.trim()),
  album: z.string()
    .optional()
    .transform((val: string | undefined) => val?.trim()),
  genre: z.string()
    .optional()
    .transform((val: string | undefined) => val?.trim()),
});

export const updateSongSchema = createSongSchema.partial();


export type CreateSongInput = z.infer<typeof createSongSchema>;
export type UpdateSongInput = z.infer<typeof updateSongSchema>;

