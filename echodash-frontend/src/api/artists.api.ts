import type { AxiosResponse } from "axios"
import type {
  ArtistDetailData,
  ArtistListParams,
  Artists,
} from "../types/artist.types"
import axiosClient from "./axiosClient"
import type { ApiResponse, PaginatedApiResponse } from "../types/api.types"

const BASE_URL = "/artists"

export const artistApi = {
  getArtists: (
    params?: ArtistListParams,
  ): Promise<AxiosResponse<PaginatedApiResponse<Artists>>> =>
    axiosClient.get(BASE_URL, { params }),
  getArtist: (
    artistName: string,
  ): Promise<AxiosResponse<ApiResponse<ArtistDetailData>>> =>
    axiosClient.get(`${BASE_URL}/${encodeURIComponent(artistName)}`),
}
