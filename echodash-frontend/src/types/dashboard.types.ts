import type { ApiResponse } from "./api.types"
import type { Song } from "./song.types"

export type DashboardStats = {
  totalSongs: number
  totalArtists: number
  totalAlbums: number
  totalGenres: number
}

export type TopGenre = {
  genre: string
  songs: number
  artists: number
}

export type TopAlbum = {
  album: string
  songs: number
  genres: number
  artists: number
  mainArtist: string
}

export type TopArtist = {
  artist: string
  songs: number
  genres: number
  albums: number
}

export type RecentSong = Song & {
  createdAt: string
}

export type DashboardStatsResponse = ApiResponse<DashboardStats>
export type TopGenresResponse = ApiResponse<TopGenre[]>
export type TopAlbumsResponse = ApiResponse<TopAlbum[]>
export type TopArtistsResponse = ApiResponse<TopArtist[]>
export type RecentSongsResponse = ApiResponse<RecentSong[]>
