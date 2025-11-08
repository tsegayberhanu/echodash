import { call, put, takeEvery } from "redux-saga/effects"
import {
  fetchGenreDetailRequest,
  fetchGenreDetailSuccess,
  fetchGenreDetailFailure,
} from "../slices/genreDetail.slice"
import type { ApiSaga } from "./songs.saga"
import type { GenreSongsResponse } from "../../types/genre.types"
import { genreApi } from "../../api/genre.api"
import { getErrorMessage } from "../../utils/getErrorMessage"
function* fetchGenreDetailSaga(
  action: ReturnType<typeof fetchGenreDetailRequest>,
): ApiSaga<GenreSongsResponse> {
  try {
    const { genreName, params } = action.payload
    const response = yield call(genreApi.getGenre, genreName, params)

    yield put(
      fetchGenreDetailSuccess({
        genreDetail: response.data.data,
        genereSongsPagination: response.data.meta.pagination,
      }),
    )
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error, "Failed to fetch genre details")
    yield put(fetchGenreDetailFailure(errorMessage))
  }
}
export function* watchGenreDetailSaga() {
  yield takeEvery(fetchGenreDetailRequest.type, fetchGenreDetailSaga)
}
export default function* genreDetailSaga() {
  yield watchGenreDetailSaga()
}
