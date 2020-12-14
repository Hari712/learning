import * as types from '../../constants/ActionTypes'
import ApiConstants from '../../api/ApiConstants'
import { put, takeLatest, call } from 'redux-saga/effects'
import API from '../../api'
import * as DashboardActions from './Dashboad.Action'

function* requestDeviceDetails(action) {
    const { userId, onSuccess, onError } = action
    try {
        const url = ApiConstants.GET_DEVICE_DETAILS_BY_ID(userId)
        const response = yield call(API.get, url)
        const result = response.result ? response.result : []
        yield put(DashboardActions.setDeviceDetailsResponse(result))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

export function* watchDashboard() {
    yield takeLatest(types.GET_DEVICE_DETAILS_BY_USER_ID_REQUEST, requestDeviceDetails)
}
