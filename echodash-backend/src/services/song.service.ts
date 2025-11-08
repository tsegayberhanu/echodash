import { SongRepository } from "../repositories/song.repository.js";
import type { ISongDocument } from "../models/song.model.js";
import type { CreateSongInput } from "../validations/song.validation.js";
import {  ConflictError, NotFoundError } from "../errors/app.error.js";
import type { SongFilterParams } from "../validations/songFilter.validation.js";

export class SongService {
  static async createSong(data: CreateSongInput): Promise<ISongDocument> {
    try {
      return await SongRepository.create(data);
    } catch (err: any) {
      if (err.code === 11000) {
        throw new ConflictError("Song already exists with this title, artist, and album");
      }
      throw err;
    }
  }
  static async getSongById(id: string): Promise<ISongDocument> {
    const song = await SongRepository.findById(id);
    if (!song) throw new NotFoundError("Song not found");
    return song;
  }
  static async updateSong(id: string, data: Partial<CreateSongInput>): Promise<ISongDocument> {
    try {
      const updated = await SongRepository.updateById(id, data);
      if (!updated) throw new NotFoundError("Song not found");
      return updated;
    } catch (err: any) {
      if (err.code === 11000) {
        throw new ConflictError("Another song already exists with this title, artist, and album");
      }
      throw err;
    }
  }
  static async deleteSong(id: string): Promise<void> {
    const deleted = await SongRepository.deleteById(id);
    if (!deleted) throw new NotFoundError("Song not found");
  }
  static async getSongs(params: SongFilterParams) {
    return SongRepository.findAll(params);
  }
  static async getRecentSongs(limit: number = 10) {
    return SongRepository.getRecentSongs(limit);
  }

}
