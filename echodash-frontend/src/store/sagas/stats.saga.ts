import { call, put, takeEvery } from "redux-saga/effects"
import type { CallEffect, PutEffect } from "redux-saga/effects"
import {
  fetchFilterOptionsRequest,
  fetchFilterOptionsSuccess,
  fetchFilterOptionsFailure,
} from "../slices/stats.slice"
import { getFilterOptions } from "../../services/stats.service"
import type { FilterOptions } from "../../types/stats.types"
import { getErrorMessage } from "../../utils/getErrorMessage"

type FetchFilterOptionsEffects = CallEffect<FilterOptions> | PutEffect

function* fetchFilterOptionsSaga(): Generator<
  FetchFilterOptionsEffects,
  void,
  FilterOptions
> {
  try {
    const filterOptions: FilterOptions = yield call(getFilterOptions)
    yield put(fetchFilterOptionsSuccess(filterOptions))
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(
      error,
      "Failed to fetch filter options",
    )
    yield put(fetchFilterOptionsFailure(errorMessage))
  }
}
export function* watchStatsSaga() {
  yield takeEvery(fetchFilterOptionsRequest.type, fetchFilterOptionsSaga)
}
