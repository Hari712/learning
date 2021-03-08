import * as types from '../../constants/ActionTypes'

export const requestDeviceDetails = (userId ,onSuccess, onError) => ({
    type: types.GET_DEVICE_DETAILS_BY_USER_ID_REQUEST,
    userId,
    onSuccess,
    onError
})

export const setDeviceDetailsResponse = (data) => ({
    type: types.GET_DEVICE_DETAILS_BY_USER_ID_RESPONSE,
    data
})

export const requestActiveInactiveCount = (userId, role, onSuccess, onError) => ({
    type: types.GET_USER_ACTIVE_INACTIVE_COUNT_BY_ID_REQUEST,
    userId,
    role,
    onSuccess,
    onError
})

export const setActiveInactiveCountResponse = (data) => ({
type: types.GET_USER_ACTIVE_INACTIVE_COUNT_BY_ID_RESPONSE,
    data
})

export const requestUserDeviceEventsOrNotifiactionCount = (userId, deviceId, onSuccess, onError) => ({
    type: types.GET_USER_DEVICE_EVENTS_OR_NOTIFICATION_COUNT_REQUEST,
    userId,
    deviceId,
    onSuccess,
    onError
})

export const setUserDeviceEventsOrNotifiactionCountResponse = (data) => ({
type: types.GET_USER_DEVICE_EVENTS_OR_NOTIFICATION_COUNT_RESPONSE,
    data
})

