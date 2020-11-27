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

export const requestGetOTP = (emailOrPhone, onSuccess, onError) => ({
    type: types.GET_OTP_REQUEST,
    emailOrPhone,
    onSuccess,
    onError
})

export const requestVerifyOTP = (data, onSuccess, onError) => ({
    type: types.VERIFY_OTP_REQUEST,
    data,
    onSuccess,
    onError
})

export const requestResetPasscode = (data, onSuccess, onError) => ({
    type: types.RESET_PASSCODE_REQUEST,
    data,
    onSuccess,
    onError
})

export const requestLogout = () => ({
    type: types.LOGOUT_REQUEST
})