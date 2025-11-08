import { SongModel, type ISongDocument} from "../models/song.model.js";
import type { Song } from "../types/song.types.js";
import type { CreateSongInput } from "../validations/song.validation.js";
import type { SongFilterParams } from "../validations/songFilter.validation.js";

export class SongRepository {
  
  static async create(data: CreateSongInput): Promise<ISongDocument> {
    const song = new SongModel(data);
    return song.save();
  }
  static async findById(id: string): Promise<ISongDocument | null> {
    return SongModel.findById(id).exec();
  }
  static async findAll(
    params: SongFilterParams
  ): Promise<{ songs: ISongDocument[]; total: number }> {
    const { _page: page, _limit: limit, _search: search, artist, genre, _sort: sort, _order: order } = params;

    
    const query: any = {};
    
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { artist: { $regex: search, $options: 'i' } },
        { album: { $regex: search, $options: 'i' } },
        { genre: { $regex: search, $options: 'i' } }
      ];
    }
    
    
    if (artist) {
      query.artist = { $regex: artist, $options: 'i' };
    }
    
    if (genre) {
      query.genre = { $regex: genre, $options: 'i' };
    }

    const skip = (page - 1) * limit;

    const sortOptions: any = {};
    if(sort)
    sortOptions[sort] = order === 'asc' ? 1 : -1;

    const [songs, total] = await Promise.all([
      SongModel.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .exec(),
      SongModel.countDocuments(query).exec(),
    ]);

    return { songs, total };
  }
  static async updateById(
    id: string,
    data: Partial<CreateSongInput>
  ): Promise<ISongDocument | null> {
    return SongModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }
  static async deleteById(id: string): Promise<ISongDocument | null> {
    return SongModel.findByIdAndDelete(id).exec();
  }
  static async getRecentSongs(limit: number = 10): Promise<Song[] | null> {
    const songs = await SongModel.find({
      title: { $exists: true, $ne: "" },
      artist: { $exists: true, $ne: "" }
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return songs.map(s => ({
      id: s._id.toString(),    
      title: s.title ?? "",
      artist: s.artist ?? "",
      album: s.album ?? "",
      genre: s.genre ?? "",
      createdAt: s.createdAt
    })) as Song[];
  }
}
