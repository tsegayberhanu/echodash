import { all } from "redux-saga/effects"
import { songsSaga } from "../sagas/songs.saga"
import { dashboardSaga } from "../sagas/dashboard.saga"
import { watchStatsSaga } from "../sagas/stats.saga"
import artistsSaga from "../sagas/artists.saga"
import albumsSaga from "../sagas/albums.saga"
import genresSaga from "../sagas/genres.saga"
import albumDetailSaga from "../sagas/albumDetail.saga"
import artistDetailSaga from "../sagas/artistDetail.saga"
import genreDetailSaga from "../sagas/genreDetail.saga"
export default function* rootSaga() {
  yield all([
    artistsSaga(),
    artistDetailSaga(),
    albumsSaga(),
    albumDetailSaga(),
    songsSaga(),
    genresSaga(),
    genreDetailSaga(),
    dashboardSaga(),
    watchStatsSaga(),
  ])
}
