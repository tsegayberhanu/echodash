import { z } from 'zod';
import { paginationSchema } from './pagination.validation.js';
import { optionalNumber } from './artistFilter.validation.js';

export const genreFilterSchema = paginationSchema.extend({
  minSongs: optionalNumber,
  maxSongs: optionalNumber,
  minArtists: optionalNumber,
  maxArtists: optionalNumber,
}).refine(data => {
  if (data.minSongs && data.maxSongs && data.minSongs > data.maxSongs) {
    return false;
  }
  return true;
}, {
  message: "Min songs cannot be greater than max songs"
}).refine(data => {
  if (data.minArtists && data.maxArtists && data.minArtists > data.maxArtists) {
    return false;
  }
  return true;
}, {
  message: "Min artists cannot be greater than max artists"
}).refine(data => data._sort ? ['genre', 'songCount', 'artistCount'].includes(data._sort) : true, {
  message: "Sort field must be one of: genre, songCount, artistCount"
});
export const GenreDetailFilterSchema = paginationSchema.extend({
  _sort: z.enum(["title", "artist", "album"])
})



export type GenreFilterParams = z.infer<typeof genreFilterSchema>;
export type GenreDetailFilterParams = z.infer<typeof GenreDetailFilterSchema>;