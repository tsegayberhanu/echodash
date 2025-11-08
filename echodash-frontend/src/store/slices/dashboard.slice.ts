import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type {
  DashboardStats,
  TopGenre,
  TopAlbum,
  TopArtist,
  RecentSong,
} from "../../types/dashboard.types"
import type { RootState } from "../root/store.root"

type DashboardState = {
  stats: DashboardStats
  topGenres: TopGenre[]
  topAlbums: TopAlbum[]
  topArtists: TopArtist[]
  recentSongs: RecentSong[]
  loading: boolean
  error: string | null
}

const initialState: DashboardState = {
  stats: {
    totalSongs: 0,
    totalArtists: 0,
    totalAlbums: 0,
    totalGenres: 0,
  },
  topGenres: [],
  topAlbums: [],
  topArtists: [],
  recentSongs: [],
  loading: false,
  error: null,
}

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    fetchDashboardDataRequest: state => {
      state.loading = true
      state.error = null
    },
    fetchDashboardDataSuccess: (
      state,
      action: PayloadAction<{
        stats: DashboardStats
        topGenres: TopGenre[]
        topAlbums: TopAlbum[]
        topArtists: TopArtist[]
        recentSongs: RecentSong[]
      }>,
    ) => {
      state.loading = false
      state.stats = action.payload.stats
      state.topGenres = action.payload.topGenres
      state.topAlbums = action.payload.topAlbums
      state.topArtists = action.payload.topArtists
      state.recentSongs = action.payload.recentSongs
    },

    fetchTopGenresRequest: state => {
      state.loading = true
      state.error = null
    },
    fetchTopGenresSuccess: (state, action: PayloadAction<TopGenre[]>) => {
      state.loading = false
      state.topGenres = action.payload
    },

    fetchTopAlbumsRequest: state => {
      state.loading = true
      state.error = null
    },
    fetchTopAlbumsSuccess: (state, action: PayloadAction<TopAlbum[]>) => {
      state.loading = false
      state.topAlbums = action.payload
    },

    fetchTopArtistsRequest: state => {
      state.loading = true
      state.error = null
    },
    fetchTopArtistsSuccess: (state, action: PayloadAction<TopArtist[]>) => {
      state.loading = false
      state.topArtists = action.payload
    },

    fetchRecentSongsRequest: state => {
      state.loading = true
      state.error = null
    },
    fetchRecentSongsSuccess: (state, action: PayloadAction<RecentSong[]>) => {
      state.loading = false
      state.recentSongs = action.payload
    },

    setError: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    clearError: state => {
      state.error = null
    },
  },
})

export const {
  fetchDashboardDataRequest,
  fetchDashboardDataSuccess,
  fetchTopGenresRequest,
  fetchTopGenresSuccess,
  fetchTopAlbumsRequest,
  fetchTopAlbumsSuccess,
  fetchTopArtistsRequest,
  fetchTopArtistsSuccess,
  fetchRecentSongsRequest,
  fetchRecentSongsSuccess,
  setError,
  clearError,
} = dashboardSlice.actions

export const dashboardStatsSelector = (state: RootState): DashboardStats =>
  state.dashboard.stats
export const topGenresSelector = (state: RootState): TopGenre[] =>
  state.dashboard.topGenres
export const topAlbumsSelector = (state: RootState): TopAlbum[] =>
  state.dashboard.topAlbums
export const topArtistsSelector = (state: RootState): TopArtist[] =>
  state.dashboard.topArtists
export const recentSongsSelector = (state: RootState): RecentSong[] =>
  state.dashboard.recentSongs
export const dashboardLoadingSelector = (state: RootState): boolean =>
  state.dashboard.loading
export const dashboardErrorSelector = (state: RootState): string | null =>
  state.dashboard.error

export default dashboardSlice.reducer
