import { call, put, takeEvery } from "redux-saga/effects"
import {
  fetchAlbumDetailRequest,
  fetchAlbumDetailSuccess,
  fetchAlbumDetailFailure,
} from "../slices/albumDetail.slice"

import { albumApi } from "../../api/album.api"
import type { ApiSaga } from "./songs.saga"
import type { AlbumDetailData } from "../../types/album.types"
import type { ApiResponse } from "../../types/api.types"
import { getErrorMessage } from "../../utils/getErrorMessage"

function* fetchAlbumDetailSaga(
  action: ReturnType<typeof fetchAlbumDetailRequest>,
): ApiSaga<ApiResponse<AlbumDetailData>> {
  try {
    const response = yield call(albumApi.getAlbum, action.payload)
    yield put(fetchAlbumDetailSuccess(response.data.data))
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error, "Failed to fetch album details")
    yield put(fetchAlbumDetailFailure(errorMessage))
  }
}

export function* watchAlbumDetailSaga() {
  yield takeEvery(fetchAlbumDetailRequest.type, fetchAlbumDetailSaga)
}

export default function* albumDetailSaga() {
  yield watchAlbumDetailSaga()
}
