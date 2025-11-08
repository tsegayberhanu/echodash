import { all, call, put, takeEvery } from "redux-saga/effects"
import { dashboardApi } from "../../api/dashboard.api"
import type {
  DashboardStatsResponse,
  TopGenresResponse,
  TopAlbumsResponse,
  TopArtistsResponse,
  RecentSongsResponse,
} from "../../types/dashboard.types"
import {
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
} from "../slices/dashboard.slice"
import { getErrorMessage } from "../../utils/getErrorMessage"

function* fetchDashboardDataSaga() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const [
      statsResponse,
      topGenresResponse,
      topAlbumsResponse,
      topArtistsResponse,
      recentSongsResponse,
    ]: [
      DashboardStatsResponse,
      TopGenresResponse,
      TopAlbumsResponse,
      TopArtistsResponse,
      RecentSongsResponse,
    ] = yield all([
      call(dashboardApi.getStats),
      call(dashboardApi.getTopGenres, 5),
      call(dashboardApi.getTopAlbums, 5),
      call(dashboardApi.getTopArtists, 5),
      call(dashboardApi.getRecentSongs, 10),
    ])

    yield put(
      fetchDashboardDataSuccess({
        stats: statsResponse.data,
        topGenres: topGenresResponse.data,
        topAlbums: topAlbumsResponse.data,
        topArtists: topArtistsResponse.data,
        recentSongs: recentSongsResponse.data,
      }),
    )
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(
      error,
      "Failed to fetch dashboard data",
    )
    yield put(setError(errorMessage))
  }
}

function* fetchTopGenresSaga() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response: TopGenresResponse = yield call(dashboardApi.getTopGenres, 5)
    yield put(fetchTopGenresSuccess(response.data))
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error, "Failed to fetch top genres")
    yield put(setError(errorMessage))
  }
}

function* fetchTopAlbumsSaga() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response: TopAlbumsResponse = yield call(dashboardApi.getTopAlbums, 5)
    yield put(fetchTopAlbumsSuccess(response.data))
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error, "Failed to fetch top albums")
    yield put(setError(errorMessage))
  }
}

function* fetchTopArtistsSaga() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response: TopArtistsResponse = yield call(
      dashboardApi.getTopArtists,
      5,
    )
    yield put(fetchTopArtistsSuccess(response.data))
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error, "Failed to fetch top artists")
    yield put(setError(errorMessage))
  }
}

function* fetchRecentSongsSaga() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response: RecentSongsResponse = yield call(
      dashboardApi.getRecentSongs,
      10,
    )
    yield put(fetchRecentSongsSuccess(response.data))
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error, "Failed to fetch recent songs")
    yield put(setError(errorMessage))
  }
}
export function* dashboardSaga() {
  yield takeEvery(fetchDashboardDataRequest.type, fetchDashboardDataSaga)
  yield takeEvery(fetchTopGenresRequest.type, fetchTopGenresSaga)
  yield takeEvery(fetchTopAlbumsRequest.type, fetchTopAlbumsSaga)
  yield takeEvery(fetchTopArtistsRequest.type, fetchTopArtistsSaga)
  yield takeEvery(fetchRecentSongsRequest.type, fetchRecentSongsSaga)
}
