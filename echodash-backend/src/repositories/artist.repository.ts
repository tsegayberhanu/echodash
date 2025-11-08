import { SongModel } from "../models/song.model.js";
import type { Artist, ArtistDetail } from "../types/artist.types.js";
import type { ArtistFilterParams } from "../validations/artistFilter.validation.js";

export class ArtistRepository {
  static async findAll(
    params: ArtistFilterParams
  ): Promise<{ artists: Artist[]; total: number }> {
    const { 
      _page, 
      _limit, 
      _search, 
      _sort, 
      _order, 
      minSongs, 
      maxSongs, 
      minAlbums, 
      maxAlbums, 
      minGenres, 
      maxGenres 
    } = params

    const pipeline: any[] = [
      {
        $match: {
          artist: { $nin: [null, ''] }
        }
      },
      {
        $group: {
          _id: '$artist',
          songCount: { $sum: 1 },
          albumCount: { 
            $addToSet: {
              $cond: {
                if: { $and: [{ $ne: ['$album', null] }, { $ne: ['$album', ''] }] },
                then: '$album',
                else: '$$REMOVE'
              }
            }
          },
          genreCount: { 
            $addToSet: {
              $cond: {
                if: { $and: [{ $ne: ['$genre', null] }, { $ne: ['$genre', ''] }] },
                then: '$genre',
                else: '$$REMOVE'
              }
            }
          }
        }
      },
      {
        $project: {
          artist: '$_id',
          songCount: 1,
          albumCount: { $size: '$albumCount' }, 
          genreCount: { $size: '$genreCount' },
          _id: 0
        }
      }
    ]

    if (_search) {
      pipeline.push({
        $match: {
          artist: { $regex: _search, $options: 'i' }
        }
      })
    }

    const songMatch: any = {}
    if (minSongs !== undefined) songMatch.$gte = minSongs
    if (maxSongs !== undefined) songMatch.$lte = maxSongs
    if (Object.keys(songMatch).length > 0) {
      pipeline.push({
        $match: { songCount: songMatch }
      })
    }

    const albumMatch: any = {}
    if (minAlbums !== undefined) albumMatch.$gte = minAlbums
    if (maxAlbums !== undefined) albumMatch.$lte = maxAlbums
    if (Object.keys(albumMatch).length > 0) {
      pipeline.push({
        $match: { albumCount: albumMatch }
      })
    }

    const genreMatch: any = {}
    if (minGenres !== undefined) genreMatch.$gte = minGenres
    if (maxGenres !== undefined) genreMatch.$lte = maxGenres
    if (Object.keys(genreMatch).length > 0) {
      pipeline.push({
        $match: { genreCount: genreMatch }
      })
    }

    pipeline.push({
      $facet: {
        metadata: [{ $count: 'total' }],
        data: [
          { $sort: this.getSortOptions(_sort, _order) },
          { $skip: (_page - 1) * _limit },
          { $limit: _limit }
        ]
      }
    })

    const artistAggregation = await SongModel.aggregate(pipeline)

    const result = artistAggregation[0]
    const artists = result.data || []
    const total = result.metadata[0]?.total || 0

    return { artists, total }
  }
  static async findArtistDetail(artistName: string): Promise<ArtistDetail> {
    const decodedArtistName = decodeURIComponent(artistName);

    const statsPipeline = [
      {
        $match: {
          artist: { 
            $eq: decodedArtistName,
            $nin: [null, ''] 
          }
        }
      },
      {
        $group: {
          _id: '$artist',
          songCount: { $sum: 1 },
          albumCount: { 
            $addToSet: {
              $cond: {
                if: { $and: [{ $ne: ['$album', null] }, { $ne: ['$album', ''] }] },
                then: '$album',
                else: '$$REMOVE'
              }
            }
          },
          genreCount: { 
            $addToSet: {
              $cond: {
                if: { $and: [{ $ne: ['$genre', null] }, { $ne: ['$genre', ''] }] },
                then: '$genre',
                else: '$$REMOVE'
              }
            }
          }
        }
      },
      {
        $project: {
          artist: '$_id',
          songCount: 1,
          albumCount: { $size: '$albumCount' },
          genreCount: { $size: '$genreCount' },
          _id: 0
        }
      }
    ];

    const statsResult = await SongModel.aggregate(statsPipeline);
    
    if (!statsResult || statsResult.length === 0) {
      throw new Error('Artist not found');
    }

    const artistStats = statsResult[0];

    const songs = await SongModel.find({
      artist: { 
        $eq: decodedArtistName,
        $nin: [null, ''] 
      }
    })
    .select('title artist album genre')
    .sort({ title: 1 })
    .lean()
    .exec();

    return {
      ...artistStats,
      songs: songs.map(song => ({
        title: song.title || "Unknown Title",
        artist: song.artist || "Unknown Artist",
        album: song.album || "Unknown Album",
        genre: song.genre || "Unknown Genre",
        id: song._id?.toString() || `${song.title}-${song.album}`
      }))
    };
  }
  private static getSortOptions(sort: string = 'songCount', order: string = 'desc') {
    const sortOrder = order === 'asc' ? 1 : -1
    
    const sortFields: Record<string, Record<string, number>> = {
      artist: { artist: sortOrder },
      songCount: { songCount: sortOrder },
      albumCount: { albumCount: sortOrder },
      genreCount: { genreCount: sortOrder }
    }

    return sortFields[sort] || { songCount: -1 }
  }
static async getTopArtists(
    limit: number = 5
  ): Promise<{ artist: string; songs: number; albums: number; genres: number }[]> {
    const artists = await SongModel.aggregate([
      {
        $match: {
          artist: { $exists: true, $ne: null, $nin: ["", null] }
        }
      },
      {
        $group: {
          _id: "$artist",
          songs: { $sum: 1 },
          albumsSet: { $addToSet: "$album" },
          genresSet: { $addToSet: "$genre" }
        }
      },
      {
        $project: {
          artist: "$_id",
          songs: 1,
          albums: { $size: "$albumsSet" },
          genres: { $size: "$genresSet" },
          _id: 0
        }
      },
      {
        $sort: { songs: -1, albums: -1, genres: -1 }
      },
      { $limit: limit }
    ]);

    return artists as { artist: string; songs: number; albums: number; genres: number }[];
  }

}
