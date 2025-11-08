import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AlbumDetailData } from "../../types/album.types"

type AlbumDetailState = {
  albumDetail: AlbumDetailData | null
  loading: boolean
  error: string | null
}

const initialState: AlbumDetailState = {
  albumDetail: null,
  loading: false,
  error: null,
}

const albumDetailSlice = createSlice({
  name: "albumDetail",
  initialState,
  reducers: {
    fetchAlbumDetailRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true
      state.error = null
    },
    fetchAlbumDetailSuccess: (
      state,
      action: PayloadAction<AlbumDetailData>,
    ) => {
      state.loading = false
      state.albumDetail = action.payload
    },
    fetchAlbumDetailFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },

    clearAlbumDetail: state => {
      state.albumDetail = null
    },

    clearAlbumDetailNotifications: state => {
      state.error = null
    },
  },
})

export const {
  fetchAlbumDetailRequest,
  fetchAlbumDetailSuccess,
  fetchAlbumDetailFailure,
  clearAlbumDetail,
  clearAlbumDetailNotifications,
} = albumDetailSlice.actions

export const albumDetailSelector = (state: { albumDetail: AlbumDetailState }) =>
  state.albumDetail.albumDetail
export const albumDetailLoadingSelector = (state: {
  albumDetail: AlbumDetailState
}) => state.albumDetail.loading
export const albumDetailErrorSelector = (state: {
  albumDetail: AlbumDetailState
}) => state.albumDetail.error

export default albumDetailSlice.reducer
