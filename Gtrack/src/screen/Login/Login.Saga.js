import * as types from '../../constants/ActionTypes'
import ApiConstants from '../../api/ApiConstants'
import { put, takeLatest, call } from 'redux-saga/effects'
import { setToken, clearToken } from '../../api'
import { storeItem, getItem } from '../../utils/storage'
import API from '../../api'
import * as LoginActions from './Login.Action'
import * as LiveTrackingActions from '../LiveTracking/Livetracking.Action'
import { AppConstants } from '../../constants/AppConstants'

function* login(action) {
    const { data, onSuccess, onError } = action
    try {
        const response = yield call(API.post, ApiConstants.LOGIN, data)
        setToken(response.result.accessToken)
        const result = response.result ? response.result : {}
        onSuccess(result)
        const isTracker =result && result.userDTO && result.userDTO.roles[0] && result.userDTO.roles[0].name
        if(isTracker != AppConstants.ROLE_TRACKER){
            yield put(LoginActions.setLoginResponse(result))
        }
        
    } catch (error) {
        onError(error)
    }
}

function* loginIntoTraccarSession(action) {
    const { userId, onSuccess, onError } = action
    try {
    
        const url = ApiConstants.TRACCAR_SESSION(userId)
        const response = yield call(API.get, url)
       
        console.log('res test', response)
        const result = response ? response.result : {}
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

function* requestGetLastKnownDevicePositions(action) {
    const { userId, onSuccess, onError } = action
    try {
        const url = ApiConstants.GET_LAST_KNOWN_POSITIONS(userId)
        const response = yield call(API.get, url)
        const arrResult = response.result ? response.result : []
        yield put(LiveTrackingActions.setLiveTrackingPositionData(arrResult))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* requestAddDeviceToken(action) {
    const { userId, token, onSuccess, onError } = action
    try {
        const url = ApiConstants.ADD_DEVICE_TOKEN(userId)
        const requestBody = {
            userId: userId,
            token: token
        }
        const response = yield call(API.post, url, requestBody)
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* requestRemoveDeviceToken(action) {
    const { userId, token, onSuccess, onError } = action
    try {
        const url = ApiConstants.REMOVE_DEVICE_TOKEN_API(userId)
        const requestBody = {
            userId: userId,
            token: token
        }
        const response = yield call(API.post, url, requestBody)
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
    yield takeLatest(types.TRACCAR_SESSION_REQUEST, loginIntoTraccarSession),
    yield takeLatest(types.GET_LAST_KNOWN_DEVICE_POSITIONS_REQUEST, requestGetLastKnownDevicePositions),
    yield takeLatest(types.ADD_DEVICE_TOKEN_REQUEST, requestAddDeviceToken),
    yield takeLatest(types.REMOVE_DEVICE_TOKEN_REQUEST, requestRemoveDeviceToken)
}