import { z } from 'zod';
import { paginationSchema } from './pagination.validation.js';
export const songFilterSchema = paginationSchema.extend({
  artist: z.string().optional(),
  genre: z.string().optional(),
}).refine(data => data._sort ? ['title', 'artist', 'album', 'genre'].includes(data._sort) : true, {
  message: "Sort field must be one of: title, artist, album, genre"
});

export type SongFilterParams = z.infer<typeof songFilterSchema>;