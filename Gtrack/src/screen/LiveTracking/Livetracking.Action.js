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

export const requestAddAlarmsNotification = (userId, data ,onSuccess, onError) => ({
    type: types.ADD_ALARMS_NOTIFICATION_REQUEST,
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

