import * as types from '../../constants/ActionTypes'

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

export const requestLinkGeofenceToDevices = (userId, geofenceId, body, onSuccess, onError) => ({
    type: types.LINK_GEOFENCE_TO_DEVICES,
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



