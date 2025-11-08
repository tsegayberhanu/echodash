import type { NextFunction, Request, Response } from "express";
import { SongService } from "../services/song.service.js";
import {
  createSongSchema,
  updateSongSchema,
  type CreateSongInput,
} from "../validations/song.validation.js";
import { APIResponder } from "../utils/apiResponder.utils.js";
import { ValidationError } from "../errors/app.error.js";
import { songFilterSchema } from "../validations/songFilter.validation.js";
import { parseWithSchema } from "../utils/parseSchema.js";

export class SongController {
  static async createSong(req: Request, res: Response, next: NextFunction) {
    try {
      const requestData = parseWithSchema(createSongSchema, req.body);
      const created = await SongService.createSong(requestData);
      APIResponder.created(res, created);
    } catch (err: any) {
      next(err);
    }
  }
  static async getSong(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new ValidationError("Genre name is required");
      }
      const song = await SongService.getSongById(id);
      APIResponder.ok(res, song);
    } catch (err: any) {
      next(err);
    }
  }
  static async updateSong(
    req: Request<{ id: string }, {}, Partial<CreateSongInput>>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new ValidationError("song id not provided");
      }
      const updateData = parseWithSchema(updateSongSchema, req.body);

      const updated = await SongService.updateSong(id, updateData);
      APIResponder.ok(res, updated);
    } catch (err: any) {
      next(err);
    }
  }
  static async deleteSong(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new ValidationError("song id not provided");
      }
      await SongService.deleteSong(id);
      APIResponder.deleted(res);
    } catch (err: any) {
      next(err);
    }
  }
  static async getSongs(req: Request, res: Response, next: NextFunction) {
    try {
      const queryParams = parseWithSchema(songFilterSchema, req.query);
      const { songs, total } = await SongService.getSongs(queryParams);
      APIResponder.paginated(res, {
        data: songs,
        total,
        page: queryParams._page,
        limit: queryParams._limit,
      });
    } catch (err: any) {
      next(err);
    }
  }
  static async getRecentSongs(req: Request, res: Response, next: NextFunction) {
    const limit = Number(req.query.limit ?? 10);
    try {
      const topGenres = await SongService.getRecentSongs(limit);
      APIResponder.ok(res, topGenres);
    } catch (err) {
      next(err);
    }
  }
}
