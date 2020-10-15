import * as types from '../../../constants/ActionTypes'
import ApiConstants from '../../../api/ApiConstants'
import { put, takeLatest, call } from 'redux-saga/effects'
//import { setToken, clearToken } from '../../api'
// import { storeItem, getItem } from '../../utils/storage'
import API, { getToken, setToken } from '../../../api'
// import { USER_DATA } from '../../constants/AppConstants'

function* editProfile(action) {
    const { data, userId, onSuccess, onError } = action   
    try {   
        const response = yield call(API.put, ApiConstants.EDIT_PROFILE(userId), data)
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

export function* watchProfile() {
    yield takeLatest(types.EDIT_PROFILE_REQUEST, editProfile)
}