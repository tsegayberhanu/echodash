import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Song, ListParams } from "../../types/song.types"
import type { PaginationMeta } from "../../types/api.types"

type SongsState = {
  songs: Song[]
  loading: boolean
  error: string | null
  successMessage: string | null
  pagination: PaginationMeta | null
  filters: ListParams
}

const initialState: SongsState = {
  songs: [],
  loading: false,
  error: null,
  successMessage: null,
  pagination: null,
  filters: {
    _page: 1,
    _limit: 100,
    _search: "",
    _sort: "artist",
    _order: "asc",
    artist: "",
    genre: "",
  },
}

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongsRequest: (state, _action: PayloadAction<ListParams>) => {
      state.loading = true
      state.error = null
    },
    fetchSongsSuccess: (
      state,
      action: PayloadAction<{
        data: Song[]
        pagination: PaginationMeta
      }>,
    ) => {
      state.loading = false
      state.songs = action.payload.data
      state.pagination = action.payload.pagination

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (state.pagination) {
        state.filters._page = state.pagination.currentPage
        state.filters._limit = state.pagination.itemsPerPage
      }
    },
    fetchSongsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },

    updateFilters: (state, action: PayloadAction<Partial<ListParams>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },

    updateItemsPerPage: (state, action: PayloadAction<number>) => {
      state.filters._limit = action.payload
      state.filters._page = 1
    },

    clearFilters: state => {
      state.filters = {
        _page: 1,
        _limit: 10,
        _search: "",
        _sort: "title",
        _order: "asc",
        artist: "",
        genre: "",
      }
    },

    createSongRequest: (state, _action: PayloadAction<Partial<Song>>) => {
      state.loading = true
      state.error = null
      state.successMessage = null
    },
    createSongSuccess: (state, action: PayloadAction<Song>) => {
      state.loading = false
      state.songs.push(action.payload)
      state.successMessage = "Song created successfully!"
    },
    createSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },

    updateSongRequest: (
      state,
      _action: PayloadAction<{ id: string; data: Partial<Song> }>,
    ) => {
      state.loading = true
      state.error = null
      state.successMessage = null
    },
    updateSongSuccess: (state, action: PayloadAction<Song>) => {
      state.loading = false
      const index = state.songs.findIndex(song => song.id === action.payload.id)
      if (index !== -1) {
        state.songs[index] = action.payload
      }
      state.successMessage = "Song updated successfully!"
    },
    updateSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },

    deleteSongRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true
      state.error = null
      state.successMessage = null
    },
    deleteSongSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.songs = state.songs.filter(song => song.id !== action.payload)
      state.successMessage = "Song deleted successfully!"
    },
    deleteSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },

    clearNotifications: state => {
      state.error = null
      state.successMessage = null
    },
  },
})

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  updateFilters,
  updateItemsPerPage,
  clearFilters,
  createSongRequest,
  createSongSuccess,
  createSongFailure,
  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
  clearNotifications,
} = songsSlice.actions

export const songsSelector = (state: { songs: SongsState }) => state.songs.songs
export const songsLoadingSelector = (state: { songs: SongsState }) =>
  state.songs.loading
export const songsErrorSelector = (state: { songs: SongsState }) =>
  state.songs.error
export const songsSuccessMessageSelector = (state: { songs: SongsState }) =>
  state.songs.successMessage
export const songsPaginationSelector = (state: { songs: SongsState }) =>
  state.songs.pagination
export const songsFiltersSelector = (state: { songs: SongsState }) =>
  state.songs.filters

export default songsSlice.reducer
