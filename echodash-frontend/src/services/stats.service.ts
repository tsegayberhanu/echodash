import type {
  GenreStatsResponseDTO,
  ArtistStatsResponseDTO,
  FilterOptionsDTO,
} from "../types/stats.types"
import { statsApi } from "../api/stats.api"

async function getGenreStats(): Promise<GenreStatsResponseDTO> {
  const response = await statsApi.getGenreStats()
  return response.data.data
}
async function getArtistStats(): Promise<ArtistStatsResponseDTO> {
  const response = await statsApi.getArtistStats()
  return response.data.data
}
async function getFilterOptions(): Promise<FilterOptionsDTO> {
  try {
    const [genreStats, artistStats] = await Promise.all([
      getGenreStats(),
      getArtistStats(),
    ])

    const genres = genreStats.genres
      .map(stat => stat.genre)
      .filter((genre): genre is string => Boolean(genre && genre.trim() !== ""))
      .sort()

    const artists = artistStats.artists
      .map(stat => stat.artist)
      .filter((artist): artist is string =>
        Boolean(artist && artist.trim() !== ""),
      )
      .sort()

    return {
      artists,
      genres,
    }
  } catch (error) {
    console.error("Error fetching filter options:", error)
    return {
      artists: [],
      genres: [],
    }
  }
}

export { getFilterOptions, getGenreStats, getArtistStats }
