import type {
  BaseApiResponse,
  PaginatedApiResponse,
  PaginationMeta,
} from "./api.types"
import type { Song } from "./song.types"

export type Genre = {
  genre: string
  songCount: number
  artistCount: number
}

export type GenreDetailData = Genre & {
  songs: Song[]
}

export type GenreListParams = {
  _page: number
  _limit: number
  _sort: "genre" | "songCount" | "artistCount"
  _order: "asc" | "desc"
  _search?: string
  minSongs?: number
  maxSongs?: number
  minArtists?: number
  maxArtists?: number
}

export type GenreDetailParams = {
  _page: number
  _limit: number
  _sort: "title" | "artist" | "album"
  _order: "asc" | "desc"
  _search?: string
}

export type PaginatedGenreSongsApiResponse<T> = BaseApiResponse & {
  status: "success"
  data: T
  meta: {
    pagination: PaginationMeta
  }
}

export type GenreListResponse = PaginatedApiResponse<Genre>
export type GenreSongsResponse = PaginatedGenreSongsApiResponse<GenreDetailData>
