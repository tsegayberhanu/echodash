import { AlbumRepository } from "../repositories/album.repository.js";
import type { AlbumsResponse } from "../types/album.types.js";
import type { AlbumFilterParams } from "../validations/albumFilter.validation.js";

export class AlbumService {
  static async getAlbums(params: AlbumFilterParams): Promise<AlbumsResponse> {
    const result = await AlbumRepository.findAll(params);
    return result;
  }
  static async getAlbumArtists(): Promise<string[]> {
    return await AlbumRepository.findAlbumArtists();
  }
  static async getAlbumDetail(albumName: string): Promise<any> {
    return await AlbumRepository.findAlbumDetail(albumName);
  }
  static async getTopAlbums(limit: number = 5) {
    const albums = await AlbumRepository.getTopAlbums(limit);
    return albums;
  }
}
