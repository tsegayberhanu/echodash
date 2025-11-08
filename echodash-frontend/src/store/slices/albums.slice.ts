import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AlbumListParams, Albums } from "../../types/album.types"
import type { PaginationMeta } from "../../types/api.types"

type AlbumsState = {
  albums: Albums[]
  loading: boolean
  error: string | null
  successMessage: string | null
  pagination: PaginationMeta | null
  filters: AlbumListParams
}

const initialState: AlbumsState = {
  albums: [],
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

const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {
    fetchAlbumsRequest: (state, _action: PayloadAction<AlbumListParams>) => {
      state.loading = true
      state.error = null
    },
    fetchAlbumsSuccess: (
      state,
      action: PayloadAction<{
        data: Albums[]
        pagination: PaginationMeta
      }>,
    ) => {
      state.loading = false
      state.albums = action.payload.data
      state.pagination = action.payload.pagination

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (state.pagination) {
        state.filters._page = state.pagination.currentPage
        state.filters._limit = state.pagination.itemsPerPage
      }
    },
    fetchAlbumsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },

    updateAlbumFilters: (
      state,
      action: PayloadAction<Partial<AlbumListParams>>,
    ) => {
      state.filters = { ...state.filters, ...action.payload }
    },

    updateAlbumItemsPerPage: (state, action: PayloadAction<number>) => {
      state.filters._limit = action.payload
      state.filters._page = 1
    },

    clearAlbumFilters: state => {
      state.filters = {
        _page: 1,
        _limit: 10,
        _search: "",
        _sort: "songCount",
        _order: "desc",
      }
    },

    // Clear notifications
    clearAlbumNotifications: state => {
      state.error = null
      state.successMessage = null
    },
  },
})

export const {
  fetchAlbumsRequest,
  fetchAlbumsSuccess,
  fetchAlbumsFailure,
  updateAlbumFilters,
  updateAlbumItemsPerPage,
  clearAlbumFilters,
  clearAlbumNotifications,
} = albumsSlice.actions

export const albumsSelector = (state: { albums: AlbumsState }) =>
  state.albums.albums
export const albumsLoadingSelector = (state: { albums: AlbumsState }) =>
  state.albums.loading
export const albumsErrorSelector = (state: { albums: AlbumsState }) =>
  state.albums.error
export const albumsSuccessMessageSelector = (state: { albums: AlbumsState }) =>
  state.albums.successMessage
export const albumsPaginationSelector = (state: { albums: AlbumsState }) =>
  state.albums.pagination
export const albumsFiltersSelector = (state: { albums: AlbumsState }) =>
  state.albums.filters

export default albumsSlice.reducer
