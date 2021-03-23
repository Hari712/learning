import * as types from '../../../constants/ActionTypes'
import ApiConstants from '../../../api/ApiConstants'
import { put, takeLatest, call } from 'redux-saga/effects'
import * as ProfileActions from './Profile.Action'
import API from '../../../api'


function* editProfile(action) {
    const { data, userId, onSuccess, onError } = action   
    try {   
        const response = yield call(API.put, ApiConstants.EDIT_PROFILE(userId), data)
        onSuccess(response)
        const result = response.result ? response.result : []
        yield put(ProfileActions.setEditProfileResponse(result))
    } catch (error) {
        onError(error)
    }
}

export function* watchProfile() {
    yield takeLatest(types.EDIT_PROFILE_REQUEST, editProfile)
}