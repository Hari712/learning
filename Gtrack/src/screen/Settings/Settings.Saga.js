import * as types from '../../constants/ActionTypes'
import ApiConstants from '../../api/ApiConstants'
import API from '../../api'
import { put, takeLatest, call } from 'redux-saga/effects'

function* submitFeedback(action) {
    const { data, userId, onSuccess, onError } = action  
    try {   
        const response = yield call(API.put, ApiConstants.ADD_FEEDBACK(userId), data)
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

export function* watchSettings() {
    yield takeLatest(types.ADD_FEEDBACK_REQUEST, submitFeedback)
}