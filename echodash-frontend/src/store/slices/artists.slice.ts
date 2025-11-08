import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { ArtistListParams, Artists } from "../../types/artist.types"
import type { PaginationMeta } from "../../types/api.types"

type ArtistsState = {
  artists: Artists[]
  loading: boolean
  error: string | null
  successMessage: string | null
  pagination: PaginationMeta | null
  filters: ArtistListParams
}

const initialState: ArtistsState = {
  artists: [],
  loading: false,
  error: null,
  successMessage: null,
  pagination: null,
  filters: {
    _page: 1,
    _limit: 10,
    _search: "",
    _sort: "songCount",
    _order: "desc",
  },
}

const artistsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {
    fetchArtistsRequest: (state, _action: PayloadAction<ArtistListParams>) => {
      state.loading = true
      state.error = null
    },
    fetchArtistsSuccess: (
      state,
      action: PayloadAction<{
        data: Artists[]
        pagination: PaginationMeta
      }>,
    ) => {
      state.loading = false
      state.artists = action.payload.data
      state.pagination = action.payload.pagination

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (state.pagination) {
        state.filters._page = state.pagination.currentPage
        state.filters._limit = state.pagination.itemsPerPage
      }
    },
    fetchArtistsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },

    updateArtistFilters: (
      state,
      action: PayloadAction<Partial<ArtistListParams>>,
    ) => {
      state.filters = { ...state.filters, ...action.payload }
    },

    updateArtistItemsPerPage: (state, action: PayloadAction<number>) => {
      state.filters._limit = action.payload
      state.filters._page = 1
    },

    clearArtistFilters: state => {
      state.filters = {
        _page: 1,
        _limit: 10,
        _search: "",
        _sort: "songCount",
        _order: "desc",
      }
    },

    clearArtistNotifications: state => {
      state.error = null
      state.successMessage = null
    },
  },
})

export const {
  fetchArtistsRequest,
  fetchArtistsSuccess,
  fetchArtistsFailure,
  updateArtistFilters,
  updateArtistItemsPerPage,
  clearArtistFilters,
  clearArtistNotifications,
} = artistsSlice.actions

export const artistsSelector = (state: { artists: ArtistsState }) =>
  state.artists.artists
export const artistsLoadingSelector = (state: { artists: ArtistsState }) =>
  state.artists.loading
export const artistsErrorSelector = (state: { artists: ArtistsState }) =>
  state.artists.error
export const artistsSuccessMessageSelector = (state: {
  artists: ArtistsState
}) => state.artists.successMessage
export const artistsPaginationSelector = (state: { artists: ArtistsState }) =>
  state.artists.pagination
export const artistsFiltersSelector = (state: { artists: ArtistsState }) =>
  state.artists.filters

export default artistsSlice.reducer
