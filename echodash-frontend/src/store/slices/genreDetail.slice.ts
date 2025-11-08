import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type {
  GenreDetailData,
  GenreDetailParams,
} from "../../types/genre.types"
import type { PaginationMeta } from "../../types/api.types"

type GenreDetailState = {
  genreDetail: GenreDetailData | null
  genereSongsPagination: PaginationMeta | null
  loading: boolean
  error: string | null
  filters: GenreDetailParams
}

const initialState: GenreDetailState = {
  genreDetail: null,
  genereSongsPagination: null,
  loading: false,
  error: null,
  filters: {
    _page: 1,
    _limit: 10,
    _sort: "title",
    _order: "asc",
    _search: "",
  },
}

const genreDetailSlice = createSlice({
  name: "genreDetail",
  initialState,
  reducers: {
    fetchGenreDetailRequest: (
      state,
      _action: PayloadAction<{ genreName: string; params: GenreDetailParams }>,
    ) => {
      state.loading = true
      state.error = null
    },
    fetchGenreDetailSuccess: (
      state,
      action: PayloadAction<{
        genreDetail: GenreDetailData
        genereSongsPagination: PaginationMeta
      }>,
    ) => {
      state.loading = false
      state.genreDetail = action.payload.genreDetail
      state.genereSongsPagination = action.payload.genereSongsPagination
    },
    fetchGenreDetailFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },

    updateGenreDetailFilters: (
      state,
      action: PayloadAction<Partial<GenreDetailParams>>,
    ) => {
      state.filters = { ...state.filters, ...action.payload }
    },

    clearGenreDetail: state => {
      state.genreDetail = null
    },

    clearGenreDetailNotifications: state => {
      state.error = null
    },
  },
})

export const {
  fetchGenreDetailRequest,
  fetchGenreDetailSuccess,
  fetchGenreDetailFailure,
  updateGenreDetailFilters,
  clearGenreDetail,
  clearGenreDetailNotifications,
} = genreDetailSlice.actions

export const genreDetailSelector = (state: { genreDetail: GenreDetailState }) =>
  state.genreDetail.genreDetail
export const genreDetailLoadingSelector = (state: {
  genreDetail: GenreDetailState
}) => state.genreDetail.loading
export const genreSongsPaginationSelector = (state: {
  genreDetail: GenreDetailState
}) => state.genreDetail.genereSongsPagination
export const genreDetailErrorSelector = (state: {
  genreDetail: GenreDetailState
}) => state.genreDetail.error
export const genreDetailFiltersSelector = (state: {
  genreDetail: GenreDetailState
}) => state.genreDetail.filters

export default genreDetailSlice.reducer
