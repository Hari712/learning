import * as types from '../../../constants/ActionTypes'

export const getGroupDevicesRequset = (userId, onSuccess, onError) => ({
    type: types.GET_GROUP_DEVICES_REQUEST,
    userId,
    onSuccess,
    onError
})

export const setGroupDevicesResponse = (data) => ({
    type: types.GET_GROUP_DEVICES_RESPONSE,
    data
})

export const getTripHistoryRequest = (body, userId, deviceId, from, to, onSuccess, onError) => ({
    type: types.GET_TRIP_HISTORY_REQUEST,
    body,
    userId,
    deviceId,
    from,
    to,
    onSuccess,
    onError
})

export const setTripHistoryResponse = (data) => ({
    type: types.GET_TRIP_HISTORY_RESPONSE,
    data
})