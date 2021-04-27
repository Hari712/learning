import * as types from '../../../constants/ActionTypes'

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