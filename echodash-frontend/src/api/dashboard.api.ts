import type {
  DashboardStatsResponse,
  TopGenresResponse,
  TopAlbumsResponse,
  TopArtistsResponse,
  RecentSongsResponse,
} from "../types/dashboard.types"
import axiosClient from "./axiosClient"

const BASE_URL = "/stats"

export const dashboardApi = {
  getStats: async (): Promise<DashboardStatsResponse> => {
    const response = await axiosClient.get<DashboardStatsResponse>(BASE_URL)
    return response.data
  },

  getTopGenres: async (limit = 5): Promise<TopGenresResponse> => {
    const response = await axiosClient.get<TopGenresResponse>(
      `${BASE_URL}/genres/top-genres`,
      { params: { limit } },
    )
    return response.data
  },

  getTopAlbums: async (limit = 5): Promise<TopAlbumsResponse> => {
    const response = await axiosClient.get<TopAlbumsResponse>(
      `${BASE_URL}/albums/top-albums`,
      { params: { limit } },
    )
    return response.data
  },

  getTopArtists: async (limit = 5): Promise<TopArtistsResponse> => {
    const response = await axiosClient.get<TopArtistsResponse>(
      `${BASE_URL}/artists/top-artists`,
      { params: { limit } },
    )
    return response.data
  },

  getRecentSongs: async (limit = 10): Promise<RecentSongsResponse> => {
    const response = await axiosClient.get<RecentSongsResponse>(
      `${BASE_URL}/songs/recent-songs`,
      { params: { limit } },
    )
    return response.data
  },
}
