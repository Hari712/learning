import * as types from '../../constants/ActionTypes'
import ApiConstants from '../../api/ApiConstants'
import { put, takeLatest, call } from 'redux-saga/effects'
import API from '../../api'
import * as LivetrackingActions from './Livetracking.Action'

function* requestGetAlarmsList(action) {
    const { userId, onSuccess, onError } = action
    try {
        const url = ApiConstants.GET_ALARMS_LIST(userId)
        const response = yield call(API.get, url)
        const result = response.result ? response.result : []
        yield put(LivetrackingActions.setAlarmsListResponse(result))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

export function* watchLivetracking() {
    yield takeLatest(types.GET_ALARMS_LIST_REQUEST, requestGetAlarmsList)
}