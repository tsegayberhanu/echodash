import { SongModel } from "../models/song.model.js";
import type { Albums } from "../types/album.types.js";
import type { AlbumFilterParams } from "../validations/albumFilter.validation.js";

export class AlbumRepository {
  static async findAll(
    params: AlbumFilterParams
  ): Promise<{ albums: Albums[]; total: number }> {
    const { 
      _page, 
      _limit, 
      _search, 
      _sort, 
      _order, 
      minSongs, 
      maxSongs, 
      artist 
    } = params

    const pipeline: any[] = [
      {
        $match: {
          album: { $nin: [null, '', 'Unknown Album'] }
        }
      },
      {
        $group: {
          _id: '$album',
          songCount: { $sum: 1 },
          genreCount: { 
            $addToSet: {
              $cond: {
                if: { $and: [{ $ne: ['$genre', null] }, { $ne: ['$genre', ''] }, { $ne: ['$genre', 'Unknown Genre'] }] },
                then: '$genre',
                else: '$$REMOVE'
              }
            }
          },
          songs: { $push: '$$ROOT' }
        }
      },
      {
        $addFields: {
          artist: {
            $let: {
              vars: {
                artistCounts: {
                  $reduce: {
                    input: '$songs',
                    initialValue: {},
                    in: {
                      $mergeObjects: [
                        '$$value',
                        {
                          $arrayToObject: [
                            [
                              {
                                k: '$$this.artist',
                                v: {
                                  $add: [
                                    { $ifNull: [ { $getField: { field: '$$this.artist', input: '$$value' } }, 0 ] },
                                    1
                                  ]
                                }
                              }
                            ]
                          ]
                        }
                      ]
                    }
                  }
                }
              },
              in: {
                $arrayElemAt: [
                  {
                    $map: {
                      input: { $objectToArray: '$$artistCounts' },
                      as: 'artistCount',
                      in: {
                        $cond: [
                          { $eq: ['$$artistCount.v', { $max: { $map: { input: { $objectToArray: '$$artistCounts' }, as: 'ac', in: '$$ac.v' } } }] },
                          '$$artistCount.k',
                          null
                        ]
                      }
                    }
                  },
                  0
                ]
              }
            }
          }
        }
      },
      {
        $match: {
          artist: { $ne: null }
        }
      },
      {
        $project: {
          album: '$_id',
          songCount: 1,
          genreCount: { $size: '$genreCount' },
          artist: 1,
          _id: 0
        }
      }
    ]

    if (_search) {
      pipeline.push({
        $match: {
          $or: [
            { album: { $regex: _search, $options: 'i' } },
            { artist: { $regex: _search, $options: 'i' } }
          ]
        }
      })
    }

    if (artist) {
      pipeline.push({
        $match: {
          artist: { $regex: artist, $options: 'i' }
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

    const albumAggregation = await SongModel.aggregate(pipeline)

    const result = albumAggregation[0]
    const albums = result.data || []
    const total = result.metadata[0]?.total || 0

    return { albums, total }
  }
  private static getSortOptions(sort: string = 'songCount', order: string = 'desc') {
    const sortOrder = order === 'asc' ? 1 : -1
    
    const sortFields: Record<string, Record<string, number>> = {
      album: { album: sortOrder },
      songCount: { songCount: sortOrder },
      genreCount: { genreCount: sortOrder },
      artist: { artist: sortOrder }
    }

    return sortFields[sort] || { songCount: -1 }
  }
  static async findAlbumArtists(): Promise<string[]> {
    const artists = await SongModel.distinct('artist', {
      album: { $nin: [null, '', 'Unknown Album'] },
      artist: { $nin: [null, '', 'Unknown Artist'] }
    }).exec();

    return artists.filter(artist => artist).sort();
  }
  static async findAlbumDetail(albumName: string): Promise<any> {
    const decodedAlbumName = decodeURIComponent(albumName);

    const songs = await SongModel.find({
     album: { 
      $eq: decodedAlbumName,
      $nin: [null, '', 'Unknown Album'] 
    }
    })
    .select('title artist genre')
    .sort({ title: 1 })
    .lean()
    .exec();

    if (!songs || songs.length === 0) {
      return null;
    }

    const songCount = songs.length;
    
    const genres = [...new Set(songs.map(song => song.genre).filter(genre => 
      genre && genre !== "" && genre !== "Unknown Genre"
    ))];
    const genreCount = genres.length;
    
    const artistCountMap = songs.reduce((acc, song) => {
      if (song.artist && song.artist !== "" && song.artist !== "Unknown Artist") {
        acc[song.artist] = (acc[song.artist] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);
    
    const artist = Object.keys(artistCountMap).reduce((maxArtist, currentArtist) => 
      artistCountMap[currentArtist] > (artistCountMap[maxArtist] || 0) ? currentArtist : maxArtist, 
      Object.keys(artistCountMap)[0] || 'Unknown Artist'
    );

    return {
      album: decodedAlbumName,
      songCount,
      genreCount,
      artist,
      songs,
    };
  }
  static async getTopAlbums(limit: number = 5): Promise<{ album: string; songs: number; genres: number; artists: number }[]> {
    const albums = await SongModel.aggregate([
      {
        $match: {
          album: { $exists: true, $ne: null, $nin: ["", null] } 
        }
      },
      {
        $group: {
          _id: "$album",
          songs: { $sum: 1 },
          genresSet: { $addToSet: "$genre" },
          artistsSet: { $addToSet: "$artist" }
        }
      },
      {
        $project: {
          album: "$_id",
          songs: 1,
          genres: { $size: "$genresSet" },
          artists: { $size: "$artistsSet" },
          _id: 0
        }
      },
      {
        $sort: { songs: -1, genres: -1, artists: -1 }
      },
      { $limit: limit }
    ]);

    return albums as { album: string; songs: number; genres: number; artists: number }[];
  }
}