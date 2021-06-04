import * as types from '../../constants/ActionTypes'
import { SEARCH_GEOFENCE_REQUEST } from './../../constants/ActionTypes';

export const requestGetAlarmsList = (userId ,onSuccess, onError) => ({
    type: types.GET_ALARMS_LIST_REQUEST,
    userId,
    onSuccess,
    onError
})

export const setAlarmsListResponse = (data) => ({
    type: types.GET_ALARMS_LIST_RESPONSE,
    data
})

export const requestAddAlarmsNotification = (isUpdate, userId, data ,onSuccess, onError) => ({
    type: types.ADD_ALARMS_NOTIFICATION_REQUEST,
    isUpdate,
    userId,
    data,
    onSuccess,
    onError
})

export const requestGetDevicesByUserId = (userId ,onSuccess, onError) => ({
    type: types.GET_DEVICES_BY_USER_ID_REQUEST,
    userId,
    onSuccess,
    onError
})

export const setDevicesByUserId = (data) => ({
    type: types.GET_DEVICES_BY_USER_ID_RESPONSE,
    data
})

export const requestGetAlertTypes = (userId ,onSuccess, onError) => ({
    type: types.GET_ALERT_TYPES_REQUEST,
    userId,
    onSuccess,
    onError
})

export const setAlertTypes = (data) => ({
    type: types.GET_ALERT_TYPES_RESPONSE,
    data
})

export const requestDeleteNotification = (userId, notificationId, onSuccess, onError) => ({
    type: types.DELETE_NOTIFICATION_REQUEST,
    userId,
    notificationId,
    onSuccess,
    onError
})

export const requestGetGeofence = (userId, onSuccess, onError) => ({
    type: types.GET_GEOFENCE_REQUEST,
    userId,
    onSuccess,
    onError
})

export const setGeofenceResponse = (data) => ({
    type: types.GET_GEOFENCE_RESPONSE,
    data
})

export const requestDeleteGeofence = (userId, geofenceId, onSuccess, onError) => ({
    type: types.DELETE_GEOFENCE_REQUEST,
    userId,
    geofenceId,
    onSuccess,
    onError
})

export const requestAddGeofence = (userId, body, onSuccess, onError) => ({
    type: types.CREATE_NEW_GEOFENCE_REQUEST,
    userId,
    body,
    onSuccess,
    onError
})

export const setAddGeofenceResponse = (data) => ({
    type: types.GET_ADD_GEOFENCE_RESPONSE,
    data
})

export const requestLinkGeofenceToDevices = (userId, geofenceId, body, onSuccess, onError) => ({
    type: types.LINK_GEOFENCE_TO_DEVICES,
    userId,
    geofenceId,
    body,
    onSuccess,
    onError
})

export const requestLinkGeofenceToUpdatedDevices = (userId, geofenceId, body, onSuccess, onError) => ({
    type: types.LINK_GEOFENCE_TO_UPDATED_DEVICES,
    userId,
    geofenceId,
    body,
    onSuccess,
    onError
})

export const requestUpdateGeofence = (userId, body, onSuccess, onError) => ({
    type: types.UPDATE_GEOFENCE_REQUEST,
    userId,
    body,
    onSuccess,
    onError
})

export const setUpdatedGeofenceResponse = (data) => ({
    type: types.UPDATED_GEOFENCE_RESPONSE,
    data
})

export const enableDisableGeofence = (userId, geofenceId, enable, onSuccess, onError) => ({
    type: types.ENABLE_DISABLE_GEOFENCE_REQUEST,
    userId,
    geofenceId,
    enable,
    onSuccess,
    onError
})

export const setenableDisableGeofenceResponse = (geofenceId) => ({
    type: types.ENABLE_DISABLE_GEOFENCE_RESPONSE,
    geofenceId
})

export const setLiveTrackingPositionData = (data) => ({
    type: types.SET_LIVE_TRACKING_DEVICE_LIST,
    data
})

export const requestGetGroupDevices = (userId, onSuccess, onError) => ({
    type: types.GET_GROUP_DEVICES_REQUEST,
    userId,
    onSuccess,
    onError
})

export const setGroupDevicesResponse = (data) => ({
    type: types.GET_GROUP_DEVICES_RESPONSE,
    data
})

export const requestAllLastKnownPostion = (userId, positionId, onSuccess, onError) => ({
    type: types.GET_ALL_LAST_KNOWN_POSITION_REQUEST,
    userId,
    positionId,
    onSuccess,
    onError
})

export const setAllLastKnownPostionResponse = (data) => ({
    type: types.GET_ALL_LAST_KNOWN_POSITION_RESPONSE,
    data
})

export const requestAssetInfo = (userId, traccarId, onSuccess, onError) => ({
    type: types.GET_ASSET_INFO_REQUEST,
    userId,
    traccarId,
    onSuccess,
    onError
})

export const requestSearchGroup = (userId, groupName, onSuccess, onError) => ({
    type: types.SEARCH_GROUP_REQUEST,
    userId,
    groupName,
    onSuccess,
    onError
})

export const setSearchGroupResponse = (data) => ({
    type: types.SEARCH_GROUP_RESPONSE,
    data
})

export const requestSearchGeofence = (userId, keyword, onSuccess, onError) => ({
    type: types.SEARCH_GEOFENCE_REQUEST,
    userId,
    keyword,
    onSuccess,
    onError
})

export const setSearchGeofenceResponse = (data) => ({
    type: types.SEARCH_GEOFENCE_RESPONSE,
    data
})

export const setNotificationEventsResponse = (data) => ({
    type: types.NOTIFICATION_EVENTS_RESPONSE,
    data
})

export const removeNotificationEventResponse = (id) => ({
    type: types.NOTIFICATION_EVENT_REMOVE,
    id
})

export const requestSendPanicData = (deviceId, onSuccess, onError) => ({
    type: types.SEND_PANIC_ALARM_DATA_REQUEST,
    deviceId,
    onSuccess,
    onError
})

