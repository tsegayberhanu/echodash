import type { PaginatedApiResponse } from "./api.types"
import type { Song } from "./song.types"

export type Albums = {
  album: string
  songCount: number
  genreCount: number
  artist: string
}

export type AlbumDetailData = Albums & {
  songs: Song[]
}

export type AlbumListParams = {
  _page: number
  _limit: number
  _search?: string
  _sort?: "album" | "songCount" | "genreCount"
  _order?: "asc" | "desc"
  minSongs?: number
  maxSongs?: number
  artist?: string
}

export type AlbumsListResponse = PaginatedApiResponse<Albums>
