import * as types from '../../constants/ActionTypes'

export const requestLogin = (data, onSuccess, onError) => ({
    type: types.LOGIN_REQUEST,
    data,
    onSuccess,
    onError
})

export const setLoginResponse = (data) => ({
    type: types.LOGIN_RESPONSE,
    data
})

export const requestSignUp = (data, onSuccess, onError) => ({
    type: types.SIGNUP_REQUEST,
    data,
    onSuccess, 
    onError
})

export const setSignupResponse = (data) => ({
    type: types.SIGNUP_RESPONSE,
    data
})

export const requestNewToken = (userId) => ({
    type: types.REFRESH_TOKEN_REQUEST,
    userId
})

export const requestResetPassword = (emailOrPhone, onSuccess, onError) => ({
    type: types.RESET_PASSWORD,
    emailOrPhone,
    onSuccess,
    onError
})