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

export const requestGetSettingsNotification = (userId, onSuccess, onError) => ({
    type: types.GET_SETTINGS_NOTIFICATION_REQUEST,    
    userId,
    onSuccess,
    onError
})

export const setSettingsNotification = (data) => ({
    type: types.GET_SETTINGS_NOTIFICATION_RESPONSE,
    data
})

export const requestUpdateSettingsNotification = (body, userId, onSuccess, onError) => ({
    type: types.UPDATE_NOTIFICATION_SETTINGS_REQUEST, 
    body,   
    userId,
    onSuccess,
    onError
})

export const setLocalSettingsNotification = (item, notificator) => ({
    type: types.LOCAL_SETTINGS_NOTIFICATION_UPDATE,
    item,
    notificator
})