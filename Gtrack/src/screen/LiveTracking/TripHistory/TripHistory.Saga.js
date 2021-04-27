import * as types from '../../../constants/ActionTypes'
import ApiConstants from '../../../api/ApiConstants'
import { put, takeLatest, call } from 'redux-saga/effects'
import API from '../../../api'
import * as TripHistoryActions from './TripHistory.Action'

function* getTripHistory(action) {
    const { body, userId, deviceId, from, to, onSuccess, onError } = action
    try {
        const url = ApiConstants.GET_TRIP_HISTORY(userId, deviceId, from, to)
        const response = yield call(API.post, url, body)
        const result = response.result ? response.result : []
        yield put(TripHistoryActions.setTripHistoryResponse(result))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

export function* watchTripHistory() {
    yield takeLatest(types.GET_TRIP_HISTORY_REQUEST, getTripHistory)
}