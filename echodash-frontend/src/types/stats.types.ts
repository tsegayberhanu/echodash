export type GenreStat = {
  genre: string
  totalSongs: number
  totalArtists: number
}

export type ArtistStat = {
  artist: string
  totalSongs: number
  totalAlbums: number
  totalGenres: number
}

export type GenreStatsResponseDTO = {
  totalGenres: number
  genres: GenreStat[]
}

export type ArtistStatsResponseDTO = {
  totalArtists: number
  artists: ArtistStat[]
}

export type FilterOptionsDTO = {
  artists: string[]
  genres: string[]
}

export type FilterOptions = {
  artists: string[]
  genres: string[]
}

export type StatsState = {
  filterOptions: FilterOptions
  loading: boolean
  error: string | null
}
