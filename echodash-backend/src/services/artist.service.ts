import { ArtistRepository } from "../repositories/artist.repository.js";
import type { ArtistsResponse, ArtistDetail } from "../types/artist.types.js";
import type { ArtistFilterParams } from "../validations/artistFilter.validation.js";

export class ArtistService {
  static async getArtists(
    params: ArtistFilterParams
  ): Promise<ArtistsResponse> {
    const result = await ArtistRepository.findAll(params);
    return result;
  }
  static async getArtist(artistName: string): Promise<ArtistDetail> {
    return await ArtistRepository.findArtistDetail(artistName);
  }
  static async getTopArtists(limit: number = 5) {
    const artists = await ArtistRepository.getTopArtists(limit);
    return artists;
  }
}
