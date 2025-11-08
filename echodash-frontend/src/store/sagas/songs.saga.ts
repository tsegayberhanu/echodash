import {
  call,
  put,
  takeEvery,
  type CallEffect,
  type PutEffect,
} from "redux-saga/effects"
import type { AxiosResponse } from "axios"
import { songsApi } from "../../api/song.api"
import type { SongsListResponse, SongResponse } from "../../types/song.types"
import {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSongRequest,
  createSongSuccess,
  createSongFailure,
  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
} from "../slices/songs.slice"
import { getErrorMessage } from "../../utils/getErrorMessage"
export type ApiSaga<T> = Generator<
  CallEffect<AxiosResponse<T>> | PutEffect,
  void,
  AxiosResponse<T>
>
export function* fetchSongsSaga(
  action: ReturnType<typeof fetchSongsRequest>,
): ApiSaga<SongsListResponse> {
  try {
    const response = yield call(songsApi.getAll, action.payload)
    yield put(
      fetchSongsSuccess({
        data: response.data.data,
        pagination: response.data.meta.pagination,
      }),
    )
  } catch (error) {
    const errorMessage = getErrorMessage(error, "Failed to fetch songs")
    yield put(fetchSongsFailure(errorMessage))
  }
}
export function* createSongSaga(
  action: ReturnType<typeof createSongRequest>,
): ApiSaga<SongResponse> {
  try {
    const response = yield call(songsApi.create, action.payload)
    yield put(createSongSuccess(response.data.data))
  } catch (error) {
    const errorMessage = getErrorMessage(error, "Failed to create song")
    yield put(createSongFailure(errorMessage))
  }
}
export function* updateSongSaga(
  action: ReturnType<typeof updateSongRequest>,
): ApiSaga<SongResponse> {
  try {
    const response = yield call(
      songsApi.update,
      action.payload.id,
      action.payload.data,
    )
    yield put(updateSongSuccess(response.data.data))
  } catch (error) {
    const errorMessage = getErrorMessage(error, "Failed to update song")
    yield put(updateSongFailure(errorMessage))
  }
}
export function* deleteSongSaga(action: ReturnType<typeof deleteSongRequest>) {
  try {
    yield call(songsApi.remove, action.payload)
    yield put(deleteSongSuccess(action.payload))
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error, "Failed to delete song")
    yield put(deleteSongFailure(errorMessage))
  }
}
export function* songsSaga() {
  yield takeEvery(fetchSongsRequest.type, fetchSongsSaga)
  yield takeEvery(createSongRequest.type, createSongSaga)
  yield takeEvery(updateSongRequest.type, updateSongSaga)
  yield takeEvery(deleteSongRequest.type, deleteSongSaga)
}
