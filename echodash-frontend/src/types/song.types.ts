import type { ApiResponse, PaginatedApiResponse } from "./api.types"

export type Song = {
  id: string
  title: string
  artist: string
  album: string
  genre: string
  createdAt?: string
  updatedAt?: string
}

export type ListParams = {
  _page?: number
  _limit?: number
  _search?: string
  _sort?: string
  _order?: "asc" | "desc"
  artist?: string
  genre?: string
}

export type SongResponse = ApiResponse<Song>
export type SongsListResponse = PaginatedApiResponse<Song>
export type CreateSongResponse = ApiResponse<Song>
export type UpdateSongResponse = ApiResponse<Song>
export type DeleteSongResponse = ApiResponse<null>
