import * as types from '../../constants/ActionTypes'
import ApiConstants from '../../api/ApiConstants'
import { put, takeLatest, call } from 'redux-saga/effects'
import API from '../../api'

function* getSubuser(action) {
    const { userId, onSuccess, onError } = action
    try {
        const response = yield call(API.get, ApiConstants.GET_SUBUSER(userId))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

export function* watchUsers() {
    yield takeLatest(types.GET_SUBUSER_REQUEST, getSubuser)
}