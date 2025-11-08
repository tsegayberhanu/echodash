import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Genre, GenreListParams } from "../../types/genre.types"
import type { PaginationMeta } from "../../types/api.types"

type GenresState = {
  genres: Genre[]
  loading: boolean
  error: string | null
  filters: GenreListParams
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
    hasNextPage: boolean
    hasPrevPage: boolean
  } | null
}

const initialState: GenresState = {
  genres: [],
  loading: false,
  error: null,
  filters: {
    _page: 1,
    _limit: 10,
    _sort: "songCount",
    _order: "desc",
  },
  pagination: null,
}

const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {
    fetchGenresRequest: (state, _action: PayloadAction<GenreListParams>) => {
      state.loading = true
      state.error = null
    },
    fetchGenresSuccess: (
      state,
      action: PayloadAction<{ genres: Genre[]; pagination: PaginationMeta }>,
    ) => {
      state.loading = false
      state.genres = action.payload.genres
      state.pagination = action.payload.pagination
    },
    fetchGenresFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    updateGenreFilters: (
      state,
      action: PayloadAction<Partial<GenreListParams>>,
    ) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearGenreFilters: state => {
      state.filters = initialState.filters
    },
    clearGenreNotifications: state => {
      state.error = null
    },
  },
})

export const {
  fetchGenresRequest,
  fetchGenresSuccess,
  fetchGenresFailure,
  updateGenreFilters,
  clearGenreFilters,
  clearGenreNotifications,
} = genresSlice.actions

export const genresSelector = (state: { genres: GenresState }) =>
  state.genres.genres
export const genresLoadingSelector = (state: { genres: GenresState }) =>
  state.genres.loading
export const genresErrorSelector = (state: { genres: GenresState }) =>
  state.genres.error
export const genresPaginationSelector = (state: { genres: GenresState }) =>
  state.genres.pagination
export const genresFiltersSelector = (state: { genres: GenresState }) =>
  state.genres.filters

export default genresSlice.reducer
