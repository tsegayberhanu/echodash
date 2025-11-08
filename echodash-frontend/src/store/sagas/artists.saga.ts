import { call, put, takeLatest } from "redux-saga/effects"
import {
  fetchArtistsRequest,
  fetchArtistsSuccess,
  fetchArtistsFailure,
} from "../slices/artists.slice"
import type { ArtistsListResponse } from "../../types/artist.types"
import type { PaginationMeta } from "../../types/api.types"
import { artistApi } from "../../api/artists.api"
import type { ApiSaga } from "./songs.saga"
import { getErrorMessage } from "../../utils/getErrorMessage"

function* fetchArtistsSaga(
  action: ReturnType<typeof fetchArtistsRequest>,
): ApiSaga<ArtistsListResponse> {
  try {
    const response = yield call(artistApi.getArtists, action.payload)
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
      fetchArtistsSuccess({
        data: response.data.data,
        pagination,
      }),
    )
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(
      error,
      "An unexpected error occurred while fetching artists",
    )
    yield put(fetchArtistsFailure(errorMessage))
  }
}
export function* watchFetchArtists() {
  yield takeLatest(fetchArtistsRequest.type, fetchArtistsSaga)
}
export default function* artistsSaga() {
  yield watchFetchArtists()
}
