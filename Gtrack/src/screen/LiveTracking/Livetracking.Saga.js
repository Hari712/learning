import * as types from '../../constants/ActionTypes'
import ApiConstants from '../../api/ApiConstants'
import { put, takeLatest, call } from 'redux-saga/effects'
import API from '../../api'
import * as LivetrackingActions from './Livetracking.Action'
import { SEARCH_GEOFENCE_REQUEST } from './../../constants/ActionTypes';

function* requestGetAlarmsList(action) {
    const { userId, onSuccess, onError } = action
    try {
        const url = ApiConstants.GET_ALARMS_LIST(userId, '')
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
        const url = isUpdate ? ApiConstants.UPDATE_ALARMS_NOTIFICATION(userId) : ApiConstants.ADD_ALARMS_NOTIFICATION(userId)
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

function* requestLinkGeofenceToDevices(action) {
    const { userId, geofenceId, body, onSuccess, onError } = action
    try {
        const url = ApiConstants.LINK_GEOFENCE_DEVICES(userId, geofenceId)
        const response = yield call(API.put, url, body)
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* requestLinkGeofenceToUpdatedDevices(action) {
    const { userId, geofenceId, body, onSuccess, onError } = action
    try {
        const url = ApiConstants.LINK_GEOFENCE_DEVICES_UPDATE(userId, geofenceId)
        const response = yield call(API.put, url, body)
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* requestUpdateGeofence(action) {
    const { userId, body, onSuccess, onError } = action
    try {
        const url = ApiConstants.UPDATE_GEOFENCE(userId)
        const response = yield call(API.put, url, body)
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* requestEnableDisableGeofence(action) {
    const { userId, geofenceId, enable, onSuccess, onError } = action
    try {
        const url = ApiConstants.ENABLE_DISABLE_GEOFENCE(userId, geofenceId, enable)
        const response = yield call(API.put, url)
        yield put(LivetrackingActions.setenableDisableGeofenceResponse(geofenceId))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* requestGetGroupDevices(action) {
    const { userId,isMobileTracker, onSuccess, onError } = action
    try {
        console.log('isMobileTrackerisMobileTrackerisMobileTracker',isMobileTracker,action)
        if(isMobileTracker != null){
            const url = ApiConstants.GET_GROUP_DEVICES(userId, isMobileTracker)
            const response = yield call(API.get, url)
            const result = response.result ? response.result : []
            yield put(LivetrackingActions.setGroupDevicesResponse(result))
            onSuccess(response)
        }
        else{
            const url = ApiConstants.GET_GROUP_DEVICES_DASHBOARD(userId)
            const response = yield call(API.get, url)
            const result = response.result ? response.result : []
            yield put(LivetrackingActions.setGroupDevicesResponse(result))
            onSuccess(response)
        }
       
    } catch (error) {
        onError(error)
    }
}

function* requestAllLastKnownPostion(action) {
    const { userId, positionId, onSuccess, onError } = action
    try {
        const url = ApiConstants.GET_ALL_LAST_KNOWN_POSITION(userId, positionId)
        const response = yield call(API.get, url)
        const result = response.result ? response.result : []
        yield put(LivetrackingActions.setAllLastKnownPostionResponse(result))
        onSuccess(response)
    } catch (error) {
        yield put(LivetrackingActions.setAllLastKnownPostionResponse([]))
        onError(error)
    }
}

function* requestAssetInfo(action) {
    const { userId, traccarId, onSuccess, onError } = action
    try {
        const url = ApiConstants.GET_ASSET_INFO_BY_TRACCAR_ID(userId, traccarId)
        const response = yield call(API.get, url)
        const result = response.result ? response.result : []
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* requestSearchGroup(action) {
    const { userId, groupName, onSuccess, onError } = action
    try {
        const url = ApiConstants.SEARCH_GROUP(userId, groupName)
        const response = yield call(API.get, url)
        const result = response.result ? response.result : []
        yield put(LivetrackingActions.setSearchGroupResponse(result))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* requestSearchGeofence(action) {
    const { userId, keyword, onSuccess, onError } = action
    try {
        const url = ApiConstants.SEARCH_GEOFENCE(userId, keyword)
        const response = yield call(API.get, url)
        const result = response.result ? response.result : []
        yield put(LivetrackingActions.setSearchGeofenceResponse(result))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}
function* requestSearchAlarms(action) {
    const { userId, keyword, onSuccess, onError } = action
    try {
        const url = ApiConstants.GET_ALARMS_LIST(userId, keyword)
        const response = yield call(API.get, url)
        const result = response.result ? response.result : []
        yield put(LivetrackingActions.setSearchAlarmResponse(result))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* requestSendPanicData(action) {
    const {deviceId, onSuccess, onError } = action
    try {
        // https://traccar-dev.vegitone.com?id=GA12&alarm=sos
        const url = ApiConstants.TRACCAR_URL + '?id=' + deviceId + '&alarm=sos'
        const response = yield call(API.post, url)
        console.log("Panic Send", response, url)
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}
function* requestNotificationListData(action) {
    const { userId, requestBody, onSuccess, onError } = action
    try {
        const url = ApiConstants.GET_NOTIFICATION_LIST(userId)
        const response = yield call(API.post, url, requestBody)
        const result = response.result ? response.result : []
        console.log('requestNotificationListData response', response.result, result)
        yield put(LivetrackingActions.setNotificationListResponse(result))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}
function* requestUpdateNotificationRead(action) {
    const { userId, requestBody, onSuccess, onError } = action
    try {
        const url = ApiConstants.UPDATE_NOTIFICATION_READ(userId)
        const response = yield call(API.put, url, requestBody)
        console.log('requestBody response', response)
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
    yield takeLatest(types.CREATE_NEW_GEOFENCE_REQUEST, requestAddGeofence),
    yield takeLatest(types.LINK_GEOFENCE_TO_DEVICES, requestLinkGeofenceToDevices),
    yield takeLatest(types.UPDATE_GEOFENCE_REQUEST, requestUpdateGeofence),
    yield takeLatest(types.ENABLE_DISABLE_GEOFENCE_REQUEST, requestEnableDisableGeofence),
    yield takeLatest(types.LINK_GEOFENCE_TO_UPDATED_DEVICES, requestLinkGeofenceToUpdatedDevices),
    yield takeLatest(types.GET_GROUP_DEVICES_REQUEST, requestGetGroupDevices),
    yield takeLatest(types.GET_ALL_LAST_KNOWN_POSITION_REQUEST, requestAllLastKnownPostion),
    yield takeLatest(types.GET_ASSET_INFO_REQUEST, requestAssetInfo),
    yield takeLatest(types.SEARCH_GROUP_REQUEST, requestSearchGroup),
    yield takeLatest(types.SEARCH_GEOFENCE_REQUEST, requestSearchGeofence),
    yield takeLatest(types.SEARCH_ALARMS_REQUEST, requestSearchAlarms),
    yield takeLatest(types.SEND_PANIC_ALARM_DATA_REQUEST, requestSendPanicData),
    yield takeLatest(types.GET_NOTIFICATION_LIST_REQUEST, requestNotificationListData),
    yield takeLatest(types.UPDATE_NOTIFICATION_READ_EVENT, requestUpdateNotificationRead)
}