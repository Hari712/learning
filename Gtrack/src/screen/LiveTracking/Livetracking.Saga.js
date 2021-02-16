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

function* requestAddAlarmsNotification(action) {
    const { isUpdate, userId, data, onSuccess, onError } = action
    try {
        const url = ApiConstants.ADD_ALARMS_NOTIFICATION(userId)
        console.log("URL",url, isUpdate)
        const response = isUpdate ? yield call(API.put, url, data) : yield call(API.post, url, data)
        console.log("Resposne", response)
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* requestGetDevicesByUserId(action) {
    const { userId, onSuccess, onError } = action
    try {
        const url = ApiConstants.GET_DEVICES_BY_USER_ID(userId)
        const response = yield call(API.get, url)
        const result = response.result ? response.result : []
        yield put(LivetrackingActions.setDevicesByUserId(result))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* requestGetAlertTypes(action) {
    const { userId, onSuccess, onError } = action
    try {
        const url = ApiConstants.GET_ALERT_TYPES(userId)
        const response = yield call(API.get, url)
        const result = response.result ? response.result : []
        yield put(LivetrackingActions.setAlertTypes(result))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* requestDeleteNotification(action) {
    const { userId, notificationId, onSuccess, onError } = action
    try {
        const url = ApiConstants.DELETE_NOTIFICATION(userId, notificationId)
        const response = yield call(API.delete, url)
        const result = response.result ? response.result : []
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* requestGetGeofence(action) {
    const { userId, onSuccess, onError } = action
    try {
        const url = ApiConstants.GET_GEOFENCE(userId)
        const response = yield call(API.get, url)
        const result = response.result ? response.result : []
        yield put(LivetrackingActions.setGeofenceResponse(result))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* requestDeleteGeofence(action) {
    const { userId, geofenceId, onSuccess, onError } = action
    try {
        const url = ApiConstants.DELETE_GEOFENCE(userId, geofenceId)
        const response = yield call(API.delete, url)
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* requestAddGeofence(action) {
    const { userId, body, onSuccess, onError } = action
    try {
        const url = ApiConstants.ADD_GEOFENCE(userId)
        const response = yield call(API.post, url, body)
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

export function* watchLivetracking() {
    yield takeLatest(types.GET_ALARMS_LIST_REQUEST, requestGetAlarmsList),
    yield takeLatest(types.ADD_ALARMS_NOTIFICATION_REQUEST, requestAddAlarmsNotification),
    yield takeLatest(types.GET_DEVICES_BY_USER_ID_REQUEST, requestGetDevicesByUserId),
    yield takeLatest(types.GET_ALERT_TYPES_REQUEST, requestGetAlertTypes),
    yield takeLatest(types.DELETE_NOTIFICATION_REQUEST, requestDeleteNotification)
    yield takeLatest(types.GET_GEOFENCE_REQUEST, requestGetGeofence),
    yield takeLatest(types.DELETE_GEOFENCE_REQUEST, requestDeleteGeofence),
    yield takeLatest(types.CREATE_NEW_GEOFENCE_REQUEST, requestAddGeofence)
}