import * as types from '../../constants/ActionTypes'
import ApiConstants from '../../api/ApiConstants'
import { put, takeLatest, call } from 'redux-saga/effects'
import API from '../../api'
import * as DeviceActions from './Device.Action'

function* resetLoadAssetsType(action) {
    const { userId, onSuccess, onError } = action
    try {
        const url = ApiConstants.ASSET_TYPE(userId)
        const response = yield call(API.get, url)
        const result = response.result ? response.result: []
        yield put(DeviceActions.setAssetTypeResponse(result))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

export function* watchDeviceSetup() {
    yield takeLatest(types.GET_ASSETS_TYPE_REQUEST, resetLoadAssetsType)
}
