import { z } from 'zod';
import { paginationSchema } from './pagination.validation.js';
import { optionalNumber } from './artistFilter.validation.js';

export const albumFilterSchema = paginationSchema.extend({
  minSongs: optionalNumber,
  maxSongs: optionalNumber,
  artist: z.string().optional(),
}).refine(data => {
  if (data.minSongs && data.maxSongs && data.minSongs > data.maxSongs) {
    return false;
  }
  return true;
}, {
  message: "Min songs cannot be greater than max songs"
}).refine(data => data._sort ? ['album', 'songCount', 'genreCount', 'artist'].includes(data._sort) : true, {
  message: "Sort field must be one of: album, songCount, genreCount, artist"
});

export type AlbumFilterParams = z.infer<typeof albumFilterSchema>;