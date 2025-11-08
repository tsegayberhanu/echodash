import { call, put, takeEvery } from "redux-saga/effects"
import type { GenreListResponse } from "../../types/genre.types"
import {
  fetchGenresRequest,
  fetchGenresSuccess,
  fetchGenresFailure,
} from "../slices/genres.slice"
import type { ApiSaga } from "./songs.saga"
import type { PaginationMeta } from "../../types/api.types"
import { genreApi } from "../../api/genre.api"
import { getErrorMessage } from "../../utils/getErrorMessage"
function* fetchGenresSaga(
  action: ReturnType<typeof fetchGenresRequest>,
): ApiSaga<GenreListResponse> {
  try {
    const response = yield call(genreApi.getGenres, action.payload)

    const pagination: PaginationMeta = {
      currentPage: response.data.meta.pagination.currentPage || 1,
      itemsPerPage:
        response.data.meta.pagination.itemsPerPage || action.payload._limit,
      totalItems:
        response.data.meta.pagination.totalItems || response.data.data.length,
      totalPages: response.data.meta.pagination.totalPages || 1,
      hasNextPage: response.data.meta.pagination.hasNextPage || false,
      hasPrevPage: response.data.meta.pagination.hasPrevPage || false,
    }

    yield put(
      fetchGenresSuccess({
        genres: response.data.data,
        pagination,
      }),
    )
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error, "Failed to fetch genres")
    yield put(fetchGenresFailure(errorMessage))
  }
}
export function* watchGenresSaga() {
  yield takeEvery(fetchGenresRequest.type, fetchGenresSaga)
}
export default function* genresSaga() {
  yield watchGenresSaga()
}
