import { SongModel } from "../models/song.model.js";
import type { Genre } from "../types/genre.types.js";
import type {
  GenreDetailFilterParams,
  GenreFilterParams,
} from "../validations/genreFilter.validation.js";

export class GenreRepository {
  static async findAll(
    params: GenreFilterParams
  ): Promise<{ genres: Genre[]; total: number }> {
    const {
      _page,
      _limit,
      _search,
      _sort,
      _order,
      minSongs,
      maxSongs,
      minArtists,
      maxArtists,
    } = params;

    const pipeline: any[] = [
      
      {
        $match: {
          genre: { $nin: [null, "", "Unknown Genre"] },
        },
      },
      {
        $group: {
          _id: "$genre",
          songCount: { $sum: 1 },
          artists: {
            $addToSet: {
              $cond: {
                if: {
                  $and: [
                    { $ne: ["$artist", null] },
                    { $ne: ["$artist", ""] },
                    { $ne: ["$artist", "Unknown Artist"] },
                  ],
                },
                then: "$artist",
                else: "$$REMOVE",
              },
            },
          },
        },
      },
      {
        $addFields: {
          artistCount: { $size: "$artists" },
        },
      },
      {
        $project: {
          genre: "$_id",
          songCount: 1,
          artistCount: 1,
          artists: 1,
          _id: 0,
        },
      },
    ];

    if (_search) {
      pipeline.push({
        $match: {
          genre: { $regex: _search, $options: "i" },
        },
      });
    }

    const songMatch: any = {};
    if (minSongs !== undefined) songMatch.$gte = minSongs;
    if (maxSongs !== undefined) songMatch.$lte = maxSongs;
    if (Object.keys(songMatch).length > 0) {
      pipeline.push({
        $match: { songCount: songMatch },
      });
    }

    const artistMatch: any = {};
    if (minArtists !== undefined) artistMatch.$gte = minArtists;
    if (maxArtists !== undefined) artistMatch.$lte = maxArtists;
    if (Object.keys(artistMatch).length > 0) {
      pipeline.push({
        $match: { artistCount: artistMatch },
      });
    }

    pipeline.push({
      $facet: {
        metadata: [{ $count: "total" }],
        data: [
          { $sort: this.getSortOptions(_sort, _order) },
          { $skip: (_page - 1) * _limit },
          { $limit: _limit },
        ],
      },
    });

    

    const genreAggregation = await SongModel.aggregate(pipeline);

    const result = genreAggregation[0];
    const genres = result.data || [];
    const total = result.metadata[0]?.total || 0;

    return { genres, total };
  }
  private static getSortOptions(
    sort: string = "songCount",
    order: string = "desc"
  ) {
    const sortOrder = order === "asc" ? 1 : -1;

    const sortFields: Record<string, Record<string, number>> = {
      genre: { genre: sortOrder },
      songCount: { songCount: sortOrder },
      artistCount: { artistCount: sortOrder },
    };

    return sortFields[sort] || { songCount: -1 };
  }
  static async findGenreArtists(): Promise<string[]> {
    const artists = await SongModel.distinct("artist", {
      genre: { $nin: [null, "", "Unknown Genre"] },
      artist: { $nin: [null, "", "Unknown Artist"] },
    }).exec();

    return artists.filter((artist) => artist).sort();
  }
  static async getGenreDetail(
    genre: string,
    params: GenreDetailFilterParams = {
      _page: 1,
      _limit: 10,
      _sort: "title",
      _order: "asc",
    }
  ) {
    const { _page, _limit, _sort, _order, _search } = params;

    const skip = (_page - 1) * _limit;

    const query: Record<string, any> = { genre };

    if (_search && _search.trim()) {
      const regex = new RegExp(_search.trim(), "i");
      query.$or = [{ title: regex }, { artist: regex }, { album: regex }];
    }

    const totalSongs = await SongModel.countDocuments(query);

    const totalArtists = await SongModel.distinct("artist", query).then(
      (artists) => artists.length
    );

    const sort: Record<string, 1 | -1> = {
      [_sort]: _order === "asc" ? 1 : -1,
    };

    const songs = await SongModel.find(query)
      .sort(sort)
      .skip(skip)
      .limit(_limit)
      .lean();

    return {
      genre,
      songCount: totalSongs,
      artistCount: totalArtists,
      songs,
      totalSongs: totalSongs,
    };
  }
  static async getTopGenres(limit: number = 5): Promise<{ genre: string; songs: number; artists: number }[]> {
    const genres = await SongModel.aggregate([
      {
        $match: {
          genre: { $exists: true, $ne: null, $nin: ["", null] }
        }
      },
      {
        $group: {
          _id: "$genre",
          songs: { $sum: 1 },
          artistsSet: { $addToSet: "$artist" }
        }
      },
      {
        $project: {
          genre: "$_id",
          songs: 1,
          artists: { $size: "$artistsSet" },
          _id: 0
        }
      },
      {
        $sort: { songs: -1, artists: -1 }
      },
      { $limit: limit }
    ]);

    return genres as { genre: string; songs: number; artists: number }[];
  }
}
