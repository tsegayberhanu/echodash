import type { NextFunction, Request, Response } from "express";
import { artistFilterSchema } from "../validations/artistFilter.validation.js";
import { ValidationError } from "../errors/app.error.js";
import { ArtistService } from "../services/artist.service.js";
import { APIResponder } from "../utils/apiResponder.utils.js";
import { parseWithSchema } from "../utils/parseSchema.js";

export class ArtistController {
  static async getArtists(req: Request, res: Response, next: NextFunction) {
    try {
      const queryParams = parseWithSchema(artistFilterSchema, req.query);
      const { artists, total } = await ArtistService.getArtists(queryParams);
      APIResponder.paginated(res, {
        data: artists,
        total,
        page: queryParams._page,
        limit: queryParams._limit,
      });
    } catch (err: any) {
      next(err);
    }
  }
  static async getArtist(req: Request, res: Response, next: NextFunction) {
    try {
      const { artistName } = req.params;
      if (!artistName) {
        throw new ValidationError("Artist name is required");
      }
      const artistDetail = await ArtistService.getArtist(artistName);
      APIResponder.ok(res, artistDetail);
    } catch (err: any) {
      next(err);
    }
  }
  static async getTopArtists(req: Request, res: Response, next: NextFunction) {
    const limit = Number(req.query.limit ?? 5);
    try {
      const topArtists = await ArtistService.getTopArtists(limit);
      APIResponder.ok(res, topArtists);
    } catch (err: any) {
      next(err);
    }
  }
}
