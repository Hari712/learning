import * as types from '../../../constants/ActionTypes'
import ApiConstants from '../../../api/ApiConstants'
import { put, takeLatest, call } from 'redux-saga/effects'
// import { setToken, clearToken } from '../../api'
// import { storeItem, getItem } from '../../utils/storage'
import API from '../../../api'
// import { USER_DATA } from '../../constants/AppConstants'

function* editProfile(action) {
    const { data, userId, onSuccess, onError } = action
    console.log("khushi1", action)
    try {   
        const response = yield call(API.put, ApiConstants.EDIT_PROFILE(userId), data)
        console.log("khushi",response)
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

export function* watchProfile() {
    yield takeLatest(types.EDIT_PROFILE_REQUEST, editProfile)
}