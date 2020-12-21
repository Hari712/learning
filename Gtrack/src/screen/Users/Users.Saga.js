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
        yield put(UserActions.setAddSubuserResponse(response))
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
    const {body, userId, onSuccess, onError } = action
    try {
        const response = yield call(API.put, ApiConstants.UPDATE_SUBUSER_DETAILS(userId), body)            
        yield put(UserActions.setUpdateSubuserResponse(response))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* getSubuserByFilter(action) {
    const {body, userId, onSuccess, onError } = action
    try {
        const response = yield call(API.post, ApiConstants.GET_SUBUSER_BY_FILTER(userId), body)            
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* requestActivateDeactivateDevice(action) {
    const { userId, subUserId, onSuccess, onError } = action
    try {
        const url = ApiConstants.ACTIVATE_DEACTIVE(userId, subUserId)
        const response = yield call(API.delete, url)
        yield put(UserActions.setUserStatusRequest(subUserId))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

export function* watchUsers() {
    yield takeLatest(types.GET_SUBUSER_REQUEST, getSubuser),
    yield takeLatest(types.ADD_SUBUSER_REQUEST, addSubuser),
    yield takeLatest(types.GET_GROUP_REQUEST, getGroup),
    yield takeLatest(types.UPDATE_SUBUSER_DETAIL_REQUEST, updateSubuserDetails),
    yield takeLatest(types.GET_SUBUSER_BY_FILTER_REQUEST, getSubuserByFilter),
    yield takeLatest(types.ACTIVATE_DEACTIVATE_DEVICE_REQUEST, requestActivateDeactivateDevice)
}