import type { NextFunction, Request, Response } from "express";
import { GenreDetailFilterSchema, genreFilterSchema } from "../validations/genreFilter.validation.js";
import { ValidationError } from "../errors/app.error.js";
import { GenreService } from "../services/genre.service.js";
import { APIResponder } from "../utils/apiResponder.utils.js";
import { parseWithSchema } from "../utils/parseSchema.js";

export class GenreController {
  static async getGenres(req: Request, res: Response, next:NextFunction) {
    try {
      const queryParams = parseWithSchema(genreFilterSchema, req.query);
      const { genres, total } = await GenreService.getGenres(queryParams);
      APIResponder.paginated(res, {
        data: genres,
        total,
        page: queryParams._page,
        limit: queryParams._limit,
      });
    } catch (err: any) {
      next(err)
    }
  }
  static async getGenreArtists(_req: Request, res: Response, next:NextFunction) {
    try {
      const artists = await GenreService.getGenreArtists();
      APIResponder.ok(res, artists);
    } catch (err: any) {
      next(err)
    }
  }
  static async getGenreDetail(req: Request, res: Response, next:NextFunction) {
    try {
      const { genreName } = req.params;
      const genreQueryParams = parseWithSchema(GenreDetailFilterSchema, req.query);
      if (!genreName) {
        throw new ValidationError("Genre name is required");
      }

      const {totalSongs, ...genreDetail} = await GenreService.getGenreDetail(genreName, genreQueryParams);

      APIResponder.paginated(res, {
        data:genreDetail,
        total:totalSongs,
        page: genreQueryParams._page,
        limit: genreQueryParams._limit,
      }
    );
    } catch (err: any) {
      next(err)
    }
  }
  static async getTopGenres(req: Request, res: Response, next:NextFunction) {
    const limit = Number(req.query.limit ?? 5);

    try {
      const topGenres = await GenreService.getTopGenres(limit);
      APIResponder.ok(res, topGenres);
    } catch (err:any) {
      next(err)
    }
  }
}