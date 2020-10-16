import * as types from '../../constants/ActionTypes'
import ApiConstants from '../../api/ApiConstants'
import { put, takeLatest, call } from 'redux-saga/effects'
import API from '../../api'
import * as UserActions from './Users.Action'

function* getSubuser(action) {
    const { userId, onSuccess, onError } = action
    try {
        const response = yield call(API.get, ApiConstants.GET_SUBUSER(userId))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* addSubuser(action) {
    const { data, userId, onSuccess, onError } = action
    try {
        const response = yield call(API.post, ApiConstants.ADD_SUBUSER(userId), data)
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* getGroup(action) {
    const { userId, onSuccess, onError } = action
    try {
        const response = yield call(API.get, ApiConstants.GET_GROUP(userId))        
        yield put(UserActions.setGroupResponse(response))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* updateSubuserDetails(action) {
    const { userId, onSuccess, onError } = action
    try {
        const response = yield call(API.put, ApiConstants.UPDATE_SUBUSER_DETAILS(userId))        
        yield put(UserActions.setUpdateSubuserDetail(response))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

export function* watchUsers() {
    yield takeLatest(types.GET_SUBUSER_REQUEST, getSubuser),
    yield takeLatest(types.ADD_SUBUSER_REQUEST, addSubuser),
    yield takeLatest(types.GET_GROUP_REQUEST, getGroup),
    yield takeLatest(types.UPDATE_SUBUSER_DETAIL_REQUEST, updateSubuserDetails)
}