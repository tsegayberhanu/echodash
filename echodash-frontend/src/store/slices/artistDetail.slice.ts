import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { ArtistDetailData } from "../../types/artist.types"

type ArtistDetailState = {
  artistDetail: ArtistDetailData | null
  loading: boolean
  error: string | null
}

const initialState: ArtistDetailState = {
  artistDetail: null,
  loading: false,
  error: null,
}

const artistDetailSlice = createSlice({
  name: "artistDetail",
  initialState,
  reducers: {
    fetchArtistDetailRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true
      state.error = null
    },
    fetchArtistDetailSuccess: (
      state,
      action: PayloadAction<ArtistDetailData>,
    ) => {
      state.loading = false
      state.artistDetail = action.payload
    },
    fetchArtistDetailFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },

    clearArtistDetail: state => {
      state.artistDetail = null
    },

    clearArtistDetailNotifications: state => {
      state.error = null
    },
  },
})

export const {
  fetchArtistDetailRequest,
  fetchArtistDetailSuccess,
  fetchArtistDetailFailure,
  clearArtistDetail,
  clearArtistDetailNotifications,
} = artistDetailSlice.actions

export const artistDetailSelector = (state: {
  artistDetail: ArtistDetailState
}) => state.artistDetail.artistDetail
export const artistDetailLoadingSelector = (state: {
  artistDetail: ArtistDetailState
}) => state.artistDetail.loading
export const artistDetailErrorSelector = (state: {
  artistDetail: ArtistDetailState
}) => state.artistDetail.error

export default artistDetailSlice.reducer
