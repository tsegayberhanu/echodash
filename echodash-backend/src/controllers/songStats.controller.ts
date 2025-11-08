import type { NextFunction, Request, Response } from "express";
import { SongStatsService } from "../services/songStats.service.js";
import { APIResponder } from "../utils/apiResponder.utils.js";
import { ValidationError } from "../errors/app.error.js";
export class SongStatsController {
  static async homeStats(_req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await SongStatsService.homeStats();
      APIResponder.ok(res, stats);
    } catch (err: any) {
      next(err);
    }
  }
  static async getAllArtistStats(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const stats = await SongStatsService.getAllArtistStats();
      APIResponder.ok(res, stats);
    } catch (err: any) {
      next(err);
    }
  }
  static async getArtistStats(
    req: Request<{ artist: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const artist = req.params.artist;
      if (!artist) {
        throw new ValidationError("artist name not provided");
      }
      const stats = await SongStatsService.getArtistStats(artist);
      APIResponder.ok(res, stats);
    } catch (err: any) {
      next(err);
    }
  }
  static async getAllAlbumStats(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const stats = await SongStatsService.getAllAlbumStats();
      APIResponder.ok(res, stats);
    } catch (err: any) {
      next(err);
    }
  }
  static async getAlbumStats(
    req: Request<{ album: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const stats = await SongStatsService.getAlbumStats(req.params.album);
      APIResponder.ok(res, stats);
    } catch (err: any) {
      next(err);
    }
  }
  static async getAllGenreStats(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const stats = await SongStatsService.getAllGenreStats();
      APIResponder.ok(res, stats);
    } catch (err: any) {
      next(err);
    }
  }
  static async getGenreStats(
    req: Request<{ genre: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const genre = req.params.genre;
      if (!genre) {
        throw new ValidationError("genre name not provided");
      }
      const stats = await SongStatsService.getGenreStats(genre);
      APIResponder.ok(res, stats);
    } catch (err: any) {
      next(err);
    }
  }
}
