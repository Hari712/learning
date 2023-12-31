import * as types from '../../constants/ActionTypes'
import ApiConstants from '../../api/ApiConstants'
import { put, takeLatest, call } from 'redux-saga/effects'
import API from '../../api'
import * as DashboardActions from './Dashboad.Action'
import { GET_NOTIFIED_DEVICES_REQUEST } from './../../constants/ActionTypes';

function* requestDeviceDetails(action) {
    const { userId, onSuccess, onError } = action
    try {
        const url = ApiConstants.GET_DEVICE_DETAILS_BY_ID(userId)
        const response = yield call(API.get, url)
        const result = response.result ? response.result : []
        yield put(DashboardActions.setDeviceDetailsResponse(result))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* requestActiveInactiveCount(action) {
    const { userId, role, onSuccess, onError } = action
    try {
        const url = ApiConstants.GET_USER_ACTIVE_INACTIVE_COUNT_BY_ID(userId, role)
        const response = yield call(API.get, url)
        const result = response.result ? response.result : []
        yield put(DashboardActions.setActiveInactiveCountResponse(result))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* requestUserDeviceEventsOrNotifiactionCount(action) {
    const { userId, deviceId, onSuccess, onError } = action
    try {
        const url = ApiConstants.GET_USER_DEVICE_OR_NOTIFICATION_COUNT(userId, deviceId)
        const response = yield call(API.get, url)
        const result = response.result ? response.result : []
        yield put(DashboardActions.setUserDeviceEventsOrNotifiactionCountResponse(result))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* requestGetNotifiedDevices(action) {
    const { userId, onSuccess, onError } = action
    try {
        const url = ApiConstants.GET_NOTIFIED_DEVICES(userId)
        const response = yield call(API.get, url)
        const result = response.result ? response.result : []
        yield put(DashboardActions.setNotifiedDevicesResponse(result))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

export function* watchDashboard() {
    yield takeLatest(types.GET_DEVICE_DETAILS_BY_USER_ID_REQUEST, requestDeviceDetails),
    yield takeLatest(types.GET_USER_ACTIVE_INACTIVE_COUNT_BY_ID_REQUEST, requestActiveInactiveCount),
    yield takeLatest(types.GET_USER_DEVICE_EVENTS_OR_NOTIFICATION_COUNT_REQUEST, requestUserDeviceEventsOrNotifiactionCount),
    yield takeLatest(types.GET_NOTIFIED_DEVICES_REQUEST, requestGetNotifiedDevices)
}
