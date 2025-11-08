import { SongModel } from "../models/song.model.js";
export class SongStatsRepository {
  static async totalSongs() {
    return SongModel.countDocuments();
  }
  static async totalArtists() {
    return SongModel.distinct("artist").then((a) => a.length);
  }
  static async totalAlbums() {
    return SongModel.distinct("album").then((a) => a.filter(Boolean).length);
  }
  static async totalGenres() {
    return SongModel.distinct("genre").then((a) => a.filter(Boolean).length);
  }
  static async artistStats(filter: Record<string, any> = {}) {
    const matchStage = Object.keys(filter).length
      ? { $match: filter }
      : { $match: {} };
    return SongModel.aggregate([
      matchStage,
      {
        $group: {
          _id: "$artist",
          totalSongs: { $sum: 1 },
          albums: { $addToSet: "$album" },
          genres: { $addToSet: "$genre" },
        },
      },
      {
        $project: {
          artist: "$_id",
          totalSongs: 1,
          totalAlbums: { $size: "$albums" },
          genres: 1,
          _id: 0,
        },
      },
    ]);
  }
  static async getAllArtistStats() {
    return SongModel.aggregate([
      {
        $group: {
          _id: "$artist",
          totalSongs: { $sum: 1 },
          albums: {
            $addToSet: {
              $cond: [{ $ne: ["$album", null] }, "$album", "$$REMOVE"],
            },
          },
          genres: {
            $addToSet: {
              $cond: [{ $ne: ["$genre", null] }, "$genre", "$$REMOVE"],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          artist: "$_id",
          totalAlbums: { $size: "$albums" },
          totalSongs: 1,
          totalGenres: { $size: "$genres" },
        },
      },
      { $sort: { totalSongs: -1, totalAlbums: -1, totalGenres: -1 } },
    ]);
  }
  static async getArtistStats(artist: string) {
    const stats = await SongModel.aggregate([
      { $match: { artist } },
      {
        $group: {
          _id: "$artist",
          totalSongs: { $sum: 1 },
          albums: {
            $addToSet: {
              $cond: [{ $ne: ["$album", null] }, "$album", "$$REMOVE"],
            },
          },
          genres: {
            $addToSet: {
              $cond: [{ $ne: ["$genre", null] }, "$genre", "$$REMOVE"],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          artist: "$_id",
          totalSongs: 1,
          totalAlbums: { $size: "$albums" },
          totalGenres: { $size: "$genres" },
        },
      },
    ]);

    return stats[0] || null;
  }
  static async albumStats(filter: Record<string, any> = {}) {
    const matchStage = Object.keys(filter).length
      ? { $match: { album: { $ne: null }, ...filter } }
      : { $match: { album: { $ne: null } } };

    return SongModel.aggregate([
      matchStage,

      {
        $group: {
          _id: "$album",
          artist: { $first: "$artist" }, 
          totalSongs: { $sum: 1 },
          genres: {
            $addToSet: {
              $cond: [{ $ne: ["$genre", null] }, "$genre", "$$REMOVE"],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          album: "$_id",
          artist: 1,
          totalSongs: 1,
          totalGenres: { $size: "$genres" },
        },
      },
      { $sort: { totalSongs: -1, totalGenres: -1 } },
    ]);
  }
  static async getAllAlbumStats() {
    const stats = await this.albumStats();

    const totalAlbums = stats.length;

    const sortedAlbums = stats
      .sort((a, b) => b.totalSongs - a.totalSongs)
      .map((s) => ({
        album: s.album,
        artist: s.artist,
        totalSongs: s.totalSongs,
        totalGenres: s.totalGenres,
      }));

    return {
      totalAlbums,
      albums: sortedAlbums,
    };
  }
  static async getAlbumStats(albumName: string) {
    const stats = await this.albumStats({ album: albumName });
    if (!stats.length) return null;

    const s = stats[0];
    return {
      album: s.album,
      artist: s.artist,
      totalSongs: s.totalSongs,
      totalGenres: s.totalGenres,
    };
  }
  static async genreStats(filter: Record<string, any> = {}) {
    const matchStage = Object.keys(filter).length
      ? { $match: { genre: { $ne: null }, ...filter } }
      : { $match: { genre: { $ne: null } } };

    return SongModel.aggregate([
      matchStage,

      {
        $group: {
          _id: "$genre",
          totalSongs: { $sum: 1 },
          artists: { $addToSet: "$artist" }, 
        },
      },
      {
        $project: {
          genre: "$_id",
          totalSongs: 1,
          totalArtists: { $size: "$artists" },
          _id: 0,
        },
      },
    ]);
  }
  static async getAllGenreStats() {
    const stats = await this.genreStats();

    const totalGenres = stats.length;

    const sortedGenres = stats
      .sort((a, b) => b.totalSongs - a.totalSongs)
      .map((s) => ({
        genre: s.genre,
        totalSongs: s.totalSongs,
        totalArtists: s.totalArtists,
      }));

    return {
      totalGenres,
      genres: sortedGenres,
    };
  }
  static async getGenreStats(genre: string) {
    const stats = await this.genreStats({ genre });
    if (!stats.length) return null;

    const s = stats[0];
    return {
      genre: s.genre,
      totalSongs: s.totalSongs,
      totalArtists: s.totalArtists,
    };
  }
}
