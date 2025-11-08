import type { AxiosResponse } from "axios"
import axiosClient from "./axiosClient"
import type { ApiResponse, PaginatedApiResponse } from "../types/api.types"
import type {
  AlbumDetailData,
  AlbumListParams,
  Albums,
} from "../types/album.types"

const BASE_URL = "/albums"

export const albumApi = {
  getAlbums: (
    params?: AlbumListParams,
  ): Promise<AxiosResponse<PaginatedApiResponse<Albums>>> =>
    axiosClient.get(BASE_URL, { params }),
  getAlbum: (
    albumName: string,
  ): Promise<AxiosResponse<ApiResponse<AlbumDetailData>>> =>
    axiosClient.get(`${BASE_URL}/${encodeURIComponent(albumName)}`),
}
