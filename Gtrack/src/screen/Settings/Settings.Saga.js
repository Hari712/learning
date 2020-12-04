import * as types from '../../constants/ActionTypes'
import ApiConstants from '../../api/ApiConstants'
import API from '../../api'
import { put, takeLatest, call } from 'redux-saga/effects'
import * as SettingsAction from './Settings.Action'

function* submitFeedback(action) {
    const { data, userId, onSuccess, onError } = action  
    try {   
        const response = yield call(API.put, ApiConstants.ADD_FEEDBACK(userId), data)
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* requestGetFeedBack(action) {
    const { userId, appVersion, deviceOS, onSuccess, onError} = action
    try {
        const response = yield call(API.get, ApiConstants.GET_FEEDBACK_REQUEST(userId, appVersion, deviceOS))
        yield put(SettingsAction.responseGetFeedback(response))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* requestChangePasscode(action) {
    const { data, userId, onSuccess, onError} = action
    try {
        const response = yield call(API.put, ApiConstants.CHANGE_PASSCODE(userId), data)
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}


export function* watchSettings() {
    yield takeLatest(types.ADD_FEEDBACK_REQUEST, submitFeedback),
    yield takeLatest(types.GET_FEEDBACK_REQUEST, requestGetFeedBack),
    yield takeLatest(types.CHANGE_PASSCODE_REQUEST,requestChangePasscode)
}