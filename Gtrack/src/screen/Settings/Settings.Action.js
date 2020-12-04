import * as types from  '../../constants/ActionTypes'

export const requestAddFeedback = (data, userId, onSuccess, onError) => ({
    type: types.ADD_FEEDBACK_REQUEST,
    data,
    userId,
    onSuccess,
    onError
})

export const requestGetFeedBack = (userId, appVersion, deviceOS, onSuccess, onError) => ({
    type: types.GET_FEEDBACK_REQUEST,
    userId,
    appVersion,
    deviceOS,
    onSuccess,
    onError
})

export const responseGetFeedback = (data, onSuccess, onError) => ({
    type: types.GET_FEEDBACK_RESPONSE,
    data,
    onSuccess,
    onError
})

export const requestChangePasscode = (data, userId, onSuccess, onError) => ({
    type: types.CHANGE_PASSCODE_REQUEST,    
    data,
    userId,
    onSuccess,
    onError
})