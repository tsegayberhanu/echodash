import type { AxiosResponse } from "axios"
import type {
  GenreStatsResponseDTO,
  ArtistStatsResponseDTO,
} from "../types/stats.types"
import axiosClient from "./axiosClient"
import type { ApiResponse } from "../types/api.types"
const BASE_URL = "/stats"
export const statsApi = {
  getGenreStats: (): Promise<
    AxiosResponse<ApiResponse<GenreStatsResponseDTO>>
  > => axiosClient.get(`${BASE_URL}/genres`),
  getArtistStats: (): Promise<
    AxiosResponse<ApiResponse<ArtistStatsResponseDTO>>
  > => axiosClient.get(`${BASE_URL}/artists`),
}
