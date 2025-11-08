import type { PaginatedApiResponse } from "./api.types"
import type { Song } from "./song.types"

export type Artists = {
  artist: string
  songCount: number
  albumCount: number
  genreCount: number
}

export type ArtistDetailData = Artists & {
  songs: Song[]
}

export type ArtistListParams = {
  _page: number
  _limit: number
  _search?: string
  _sort?: "artist" | "songCount" | "albumCount" | "genreCount"
  _order?: "asc" | "desc"
  minSongs?: number
  maxSongs?: number
  minAlbums?: number
  maxAlbums?: number
  minGenres?: number
  maxGenres?: number
}

export type ArtistsListResponse = PaginatedApiResponse<Artists>
