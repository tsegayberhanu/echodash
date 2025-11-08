import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { FilterOptions, StatsState } from "../../types/stats.types"

const initialState: StatsState = {
  filterOptions: {
    artists: [],
    genres: [],
  },
  loading: false,
  error: null,
}

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    fetchFilterOptionsRequest: state => {
      state.loading = true
      state.error = null
    },
    fetchFilterOptionsSuccess: (
      state,
      action: PayloadAction<FilterOptions>,
    ) => {
      state.loading = false
      state.filterOptions = action.payload
    },
    fetchFilterOptionsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    clearStatsError: state => {
      state.error = null
    },
  },
})

export const {
  fetchFilterOptionsRequest,
  fetchFilterOptionsSuccess,
  fetchFilterOptionsFailure,
  clearStatsError,
} = statsSlice.actions
export const statsFilterOptionsSelector = (state: { stats: StatsState }) =>
  state.stats.filterOptions
export const statsLoadingSelector = (state: { stats: StatsState }) =>
  state.stats.loading
export const statsErrorSelector = (state: { stats: StatsState }) =>
  state.stats.error

export default statsSlice.reducer
