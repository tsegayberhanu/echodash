import { z } from 'zod';
import { paginationSchema } from './pagination.validation.js';

export const optionalNumber = z
  .string()
  .optional()
  .transform((val) => val ? Number(val) : undefined)
  .refine((val) => val === undefined || val >= 0, { 
    message: "Must be a positive number" 
  });

export const artistFilterSchema = paginationSchema.extend({
  minSongs: optionalNumber,
  maxSongs: optionalNumber,
  minAlbums: optionalNumber,
  maxAlbums: optionalNumber,
  minGenres: optionalNumber,
  maxGenres: optionalNumber,
}).refine(data => {
  if (data.minSongs && data.maxSongs && data.minSongs > data.maxSongs) {
    return false;
  }
  if (data.minAlbums && data.maxAlbums && data.minAlbums > data.maxAlbums) {
    return false;
  }
  if (data.minGenres && data.maxGenres && data.minGenres > data.maxGenres) {
    return false;
  }
  return true;
}, {
  message: "Min value cannot be greater than max value"
}).refine(data => data._sort ? ['artist', 'songCount', 'albumCount', 'genreCount'].includes(data._sort) : true, {
  message: "Sort field must be one of: artist, songCount, albumCount, genreCount"
});

export type ArtistFilterParams = z.infer<typeof artistFilterSchema>;