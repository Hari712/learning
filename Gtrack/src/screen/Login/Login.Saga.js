import * as types from '../../constants/ActionTypes'
import ApiConstants from '../../api/ApiConstants'
import { put, takeLatest, call } from 'redux-saga/effects'
import { setToken, clearToken } from '../../api'
import { storeItem, getItem } from '../../utils/storage'
import API from '../../api'
import * as LoginActions from './Login.Action'

function* login(action) {
    const { data, onSuccess, onError } = action
    try {
        const response = yield call(API.post, ApiConstants.LOGIN, data)
        setToken(response.result.accessToken)
        const result = response.result ? response.result : {}
        yield put(LoginActions.setLoginResponse(result))
        onSuccess(result)
    } catch (error) {
        onError(error)
    }
}

function* loginIntoTraccarSession(action) {
    const { email, password, onSuccess, onError } = action
    try {
        const requestBody = { email: email, password: password }
        const response = yield call(API.post, ApiConstants.TRACCAR_SESSION, requestBody)
        const result = response ? response : {}
        yield put(LoginActions.setTraccarSessionData(result))
        onSuccess(result)
    } catch (error) {
        onError(error)
    }
}

function* signUp(action) {
    const { data, onSuccess, onError } = action
    try {
        const response = yield call(API.post, ApiConstants.SIGNUP, data)
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* resetPassword(action) {
    const { emailOrPhone, onSuccess, onError } = action
    try {
        const response = yield call(API.post, ApiConstants.RESET_PASSWORD, emailOrPhone)
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* requestGetOTP(action) {
    const { emailOrPhone, onSuccess, onError } = action
    try {
        const params = {
            query: emailOrPhone
        }
        const response = yield call(API.get, ApiConstants.FORGOT_PASSWORD, params)
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* requestVerifyOTP(action) {
    const { data, onSuccess, onError } = action
    try {
        const response = yield call(API.post, ApiConstants.VERIFY_OTP, data)
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* resetPasscode(action) {
    const { data, onSuccess, onError } = action
    try {
        const response = yield call(API.post, ApiConstants.RESETPASSWORD, data)
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* requestFetchUserTax(action) {
    const { userId, onSuccess, onError } = action
    try {
        const url = ApiConstants.FETCH_TAX_BY_PROVINCE(userId)
        const response = yield call(API.get, url)
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}



export function* watchLogin() {
    yield takeLatest(types.LOGIN_REQUEST, login),
    yield takeLatest(types.SIGNUP_REQUEST, signUp),
    yield takeLatest(types.RESET_PASSWORD, resetPassword),
    yield takeLatest(types.GET_OTP_REQUEST, requestGetOTP),
    yield takeLatest(types.VERIFY_OTP_REQUEST, requestVerifyOTP),
    yield takeLatest(types.RESET_PASSCODE_REQUEST, resetPasscode),
    yield takeLatest(types.FETCH_TAX_REQUEST, requestFetchUserTax),
    yield takeLatest(types.TRACCAR_SESSION_REQUEST, loginIntoTraccarSession)
}