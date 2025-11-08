import type { NextFunction, Request, Response } from "express";
import { albumFilterSchema } from "../validations/albumFilter.validation.js";
import { ValidationError } from "../errors/app.error.js";
import { AlbumService } from "../services/album.service.js";
import { APIResponder } from "../utils/apiResponder.utils.js";
import { parseWithSchema } from "../utils/parseSchema.js";

export class AlbumController {
  static async getAlbums(req: Request, res: Response, next: NextFunction) {
    try {
      const queryParams = parseWithSchema(albumFilterSchema, req.query);
      const { albums, total } = await AlbumService.getAlbums(queryParams);
      APIResponder.paginated(res, {
        data: albums,
        total,
        page: queryParams._page,
        limit: queryParams._limit,
      });
    } catch (err: any) {
      next(err);
    }
  }
  static async getAlbumArtists(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const artists = await AlbumService.getAlbumArtists();

      APIResponder.ok(res, artists);
    } catch (err: any) {
      next(err);
    }
  }
  static async getAlbumDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const { albumName } = req.params;
      if (!albumName) {
        throw new ValidationError("Album name is required");
      }
      const albumDetail = await AlbumService.getAlbumDetail(albumName);
      APIResponder.ok(res, albumDetail);
    } catch (err: any) {
      next(err);
    }
  }
  static async getTopAlbums(req: Request, res: Response, next: NextFunction) {
    const limit = Number(req.query.limit ?? 5);
    try {
      const topAlbums = await AlbumService.getTopAlbums(limit);
      APIResponder.ok(res, topAlbums);
    } catch (err) {
      next(err);
    }
  }
}
