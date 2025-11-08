import { call, put, takeLatest } from "redux-saga/effects"
import {
  fetchAlbumsRequest,
  fetchAlbumsSuccess,
  fetchAlbumsFailure,
} from "../slices/albums.slice"
import type { AlbumsListResponse } from "../../types/album.types"
import type { PaginationMeta } from "../../types/api.types"
import { albumApi } from "../../api/album.api"
import type { ApiSaga } from "./songs.saga"
import { getErrorMessage } from "../../utils/getErrorMessage"
function* fetchAlbumsSaga(
  action: ReturnType<typeof fetchAlbumsRequest>,
): ApiSaga<AlbumsListResponse> {
  try {
    const response = yield call(albumApi.getAlbums, action.payload)

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
      fetchAlbumsSuccess({
        data: response.data.data,
        pagination,
      }),
    )
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(
      error,
      "An unexpected error occurred while fetching albums",
    )
    yield put(fetchAlbumsFailure(errorMessage))
  }
}
export function* watchFetchAlbums() {
  yield takeLatest(fetchAlbumsRequest.type, fetchAlbumsSaga)
}
export default function* albumsSaga() {
  yield watchFetchAlbums()
}
