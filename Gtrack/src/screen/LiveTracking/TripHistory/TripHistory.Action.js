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
export const getLocationHistoryRequest = (body, userId, deviceId, from, to, onSuccess, onError) => ({
    type: types.GET_LOCAITON_HISTORY_REQUEST,
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
export const getCombinedTripHistoryRequest = (userId, deviceId, from, to, onSuccess, onError) => ({
    type: types.GET_COMBINED_TRIP_HISTORY_REQUEST,
    userId,
    deviceId,
    from,
    to,
    onSuccess,
    onError
})
export const setCombinedTripHistoryResponse = (data) => ({
    type: types.GET_COMBINED_TRIP_HISTORY_RESPONSE,
    data
})
export const clearCombinedHistoryData = () => ({
    type: types.CLEAR_COMBINED_TRIP_HISTORY_REQUEST,
})
export const clearCombinedHistoryDataResponse = () => ({
    type: types.CLEAR_COMBINED_TRIP_HISTORY_RESPONSE,
})

