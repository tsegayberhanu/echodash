import type { Song } from "./song.types.js"

export type Artist = {
  artist: string
  totalSongs: number
  totalAlbums: number
  totalGenres: number
}

export type ArtistDetail=Artist & {
  songs:Song[]
}

export type ArtistListParams = {
  _page: number
  _limit: number
  _search?: string
  _sort?: 'artist' | 'totalSongs' | 'totalAlbums' | 'totalGenres'
  _order?: 'asc' | 'desc'
  minSongs?: number
  maxSongs?: number
  minAlbums?: number
  maxAlbums?: number
  minGenres?: number
  maxGenres?: number
}

export type ArtistsResponse = {
  artists: Artist[]
  total: number
}