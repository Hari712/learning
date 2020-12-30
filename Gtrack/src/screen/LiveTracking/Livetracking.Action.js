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