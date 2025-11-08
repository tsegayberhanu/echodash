import { GenreRepository } from "../repositories/genre.repository.js";
import type { GenresResponse } from "../types/genre.types.js";
import type {
  GenreDetailFilterParams,
  GenreFilterParams,
} from "../validations/genreFilter.validation.js";

export class GenreService {
  static async getGenres(params: GenreFilterParams): Promise<GenresResponse> {
    const result = await GenreRepository.findAll(params);
    return result;
  }
  static async getGenreArtists(): Promise<string[]> {
    return await GenreRepository.findGenreArtists();
  }
  static async getGenreDetail(
    genreName: string,
    genreFilterParams: GenreDetailFilterParams
  ): Promise<any> {
    return await GenreRepository.getGenreDetail(genreName, genreFilterParams);
  }
  static async getTopGenres(limit: number = 5) {
    const genres = await GenreRepository.getTopGenres(limit);
    return genres;
  }
}
