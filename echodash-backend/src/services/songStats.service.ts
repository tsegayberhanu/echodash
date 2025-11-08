import { SongStatsRepository } from "../repositories/songStats.repository.js";

export class SongStatsService {
  static async homeStats() {
    const [totalSongs, totalArtists, totalAlbums, totalGenres] =
      await Promise.all([
        SongStatsRepository.totalSongs(),
        SongStatsRepository.totalArtists(),
        SongStatsRepository.totalAlbums(),
        SongStatsRepository.totalGenres(),
      ]);

    return { totalSongs, totalArtists, totalAlbums, totalGenres };
  }
  static async getAllArtistStats() {
    const stats = await SongStatsRepository.getAllArtistStats();
    const totalArtists = stats.length;
    return { totalArtists, artists: stats };
  }
  static async getArtistStats(artist: string) {
    const result = await SongStatsRepository.getArtistStats(artist);
    return (
      result || {
        artist,
        totalSongs: 0,
        totalAlbums: 0,
        totalGenres: 0,
      }
    );
  }
  static async getAllAlbumStats() {
    return SongStatsRepository.getAllAlbumStats();
  }
  static async getAlbumStats(album: string) {
    return SongStatsRepository.getAlbumStats(album);
  }
  static async getAllGenreStats() {
    return SongStatsRepository.getAllGenreStats();
  }
  static async getGenreStats(genre: string) {
    return SongStatsRepository.getGenreStats(genre);
  }
}
