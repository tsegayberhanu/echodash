import type { AxiosResponse } from "axios"
import type {
  GenreDetailParams,
  GenreListParams,
  GenreListResponse,
  GenreSongsResponse,
} from "../types/genre.types"
import axiosClient from "./axiosClient"
const BASE_URL = "/genres"
export const genreApi = {
  getGenres: (
    params: GenreListParams,
  ): Promise<AxiosResponse<GenreListResponse>> =>
    axiosClient.get(BASE_URL, { params }),

  getGenre: (
    genreName: string,
    params: GenreDetailParams,
  ): Promise<AxiosResponse<GenreSongsResponse>> =>
    axiosClient.get(`${BASE_URL}/${encodeURIComponent(genreName)}`, { params }),
}
