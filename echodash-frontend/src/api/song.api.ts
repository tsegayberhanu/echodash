import type { AxiosResponse } from "axios"
import type { ApiResponse, PaginatedApiResponse } from "../types/api.types"
import axiosClient from "./axiosClient"
import type { ListParams, Song } from "../types/song.types"

const BASE_URL = "/songs"

export const songsApi = {
  getAll: (
    params?: ListParams,
  ): Promise<AxiosResponse<PaginatedApiResponse<Song>>> =>
    axiosClient.get(BASE_URL, { params }),
  getById: (id: string): Promise<AxiosResponse<ApiResponse<Song>>> =>
    axiosClient.get(`${BASE_URL}/${id}`),
  create: (song: Partial<Song>): Promise<AxiosResponse<ApiResponse<Song>>> =>
    axiosClient.post(BASE_URL, song),
  update: (
    id: string,
    song: Partial<Song>,
  ): Promise<AxiosResponse<ApiResponse<Song>>> =>
    axiosClient.patch(`${BASE_URL}/${id}`, song),
  remove: (id: string): Promise<AxiosResponse<ApiResponse<null>>> =>
    axiosClient.delete(`${BASE_URL}/${id}`),
}
