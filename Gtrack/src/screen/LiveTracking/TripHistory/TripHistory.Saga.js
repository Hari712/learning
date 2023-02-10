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
function* getLocationHistory(action) {
    const { body, userId, deviceId, from, to, onSuccess, onError } = action
    try {
        const url = ApiConstants.GET_LOCATION_HISTORY(userId, deviceId, from, to)
        const response = yield call(API.post, url, body)
        const result = response.result ? response.result : []
        yield put(TripHistoryActions.setTripHistoryResponse(result))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}
function* getCombinedTripHistory(action) {
    const { userId, deviceId, from, to, onSuccess, onError } = action
    try {
        const url = ApiConstants.GET_TRIP_HISTORY(userId, deviceId, from, to)
        const response = yield call(API.get, url)
        const result = response.result ? response.result : []

    console.log('resultresultresultresultresultresultgetCombinedTripHistory',result)
        yield put(TripHistoryActions.setCombinedTripHistoryResponse(result))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}
function* clearCombinedTripHistory() {
    // try {
        yield put(TripHistoryActions.setCombinedTripHistoryResponse())
    // } catch (error) {
       
    // }
}

export function* watchTripHistory() {
    yield takeLatest(types.GET_TRIP_HISTORY_REQUEST, getTripHistory),
    yield takeLatest(types.GET_LOCAITON_HISTORY_REQUEST, getLocationHistory),
    yield takeLatest(types.GET_COMBINED_TRIP_HISTORY_REQUEST, getCombinedTripHistory),
    yield takeLatest(types.CLEAR_COMBINED_TRIP_HISTORY_REQUEST, clearCombinedTripHistory)
}