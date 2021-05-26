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

function* requestGetSettingsNotification(action) {
    const { userId, onSuccess, onError} = action
    try {
        const response = yield call(API.get, ApiConstants.GET_SETTINGS_NOTIFICATION(userId))
        const result = response.result ? response.result : []
        yield put(SettingsAction.setSettingsNotification(result))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* requestUpdateSettingsNotification(action) {
    const { body, userId, onSuccess, onError} = action
    try {
        const url = ApiConstants.UPDATE_NOTIFICATION_SETTINGS(userId)
        const response = yield call(API.put, url, body)
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* requestAdvanceSettings(action) {
    const { userId, body, onSuccess, onError} = action
    try {
        const url = ApiConstants.ADVANCE_SETTINGS(userId)
        const response = yield call(API.put, url, body)
        const result = response.result ? response.result : []
        yield put(SettingsAction.setAdvanceSettings(result))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* requestGetAdvanceSettings(action) {
    const { userId, onSuccess, onError} = action
    try {
        const url = ApiConstants.ADVANCE_SETTINGS(userId)
        const response = yield call(API.get, url)
        const result = response.result ? response.result : []
        yield put(SettingsAction.setAdvanceSettings(result))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}


export function* watchSettings() {
    yield takeLatest(types.ADD_FEEDBACK_REQUEST, submitFeedback),
    yield takeLatest(types.GET_FEEDBACK_REQUEST, requestGetFeedBack),
    yield takeLatest(types.CHANGE_PASSCODE_REQUEST,requestChangePasscode),
    yield takeLatest(types.GET_SETTINGS_NOTIFICATION_REQUEST,requestGetSettingsNotification),
    yield takeLatest(types.UPDATE_NOTIFICATION_SETTINGS_REQUEST,requestUpdateSettingsNotification),
    yield takeLatest(types.ADVANCE_SETTINGS_REQUEST,requestAdvanceSettings),
    yield takeLatest(types.GET_ADVANCE_SETTINGS_REQUEST,requestGetAdvanceSettings)
}