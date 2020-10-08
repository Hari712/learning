import * as types from '../../constants/ActionTypes'
import ApiConstants from '../../api/ApiConstants'
import { put, takeLatest, call } from 'redux-saga/effects'
import { setToken, clearToken } from '../../api'
import { storeItem, getItem } from '../../utils/storage'
import API from '../../api'
import { USER_DATA } from '../../constants/AppConstants'

function* login(action) {
    const { data, onSuccess, onError } = action
    try {
        const response = yield call(API.post, ApiConstants.LOGIN, data)
        setToken(response.result.accessToken)
        onSuccess(response)
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
    const { data, onSuccess, onError } = action
    try {
        const response = yield call(API.post, ApiConstants.RESET_PASSWORD, data)
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

export function* watchLogin() {
    yield takeLatest(types.LOGIN_REQUEST, login),
    yield takeLatest(types.SIGNUP_REQUEST, signUp),
    yield takeLatest(types.RESET_PASSWORD, resetPassword)
}