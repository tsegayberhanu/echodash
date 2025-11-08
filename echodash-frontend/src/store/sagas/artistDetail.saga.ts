import { call, put, takeEvery } from "redux-saga/effects"
import type { ArtistDetailData } from "../../types/artist.types"
import {
  fetchArtistDetailRequest,
  fetchArtistDetailSuccess,
  fetchArtistDetailFailure,
} from "../slices/artistDetail.slice"
import { artistApi } from "../../api/artists.api"
import type { ApiSaga } from "./songs.saga"
import type { ApiResponse } from "../../types/api.types"
import { getErrorMessage } from "../../utils/getErrorMessage"
function* fetchArtistDetailSaga(
  action: ReturnType<typeof fetchArtistDetailRequest>,
): ApiSaga<ApiResponse<ArtistDetailData>> {
  try {
    const artistName = action.payload
    const response = yield call(artistApi.getArtist, artistName)
    yield put(fetchArtistDetailSuccess(response.data.data))
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(
      error,
      "Failed to fetch artist details",
    )

    yield put(fetchArtistDetailFailure(errorMessage))
  }
}
export function* watchArtistDetailSaga() {
  yield takeEvery(fetchArtistDetailRequest.type, fetchArtistDetailSaga)
}
export default function* artistDetailSaga() {
  yield watchArtistDetailSaga()
}
