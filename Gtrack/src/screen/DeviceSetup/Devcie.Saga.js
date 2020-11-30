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

function* requestAddGroup(action) {
    const {userId, data, onSuccess, onError } = action
    try {
        const url = ApiConstants.ADD_GROUP(userId)
        const response = yield call(API.post, url, data)
        const result = response.result ? response.result: {}
        const groupInfo = result.groupDTO ? result.groupDTO : {}
        const arr = []
        arr.push(groupInfo)
        yield put(DeviceActions.setAddGroupResponse(arr))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* requestAddAsset(action) {
    const { userId, data, onSuccess, onError } = action
    try {
        const url = ApiConstants.ADD_ASSET(userId)
        const response = yield call(API.post, url, data)
        const result = response.result ? response.result: {}
        const assetInfo = result.assetDTO ? result.assetDTO : {}
        const arr = []
        arr.push(assetInfo)
        yield put(DeviceActions.setAddAssetResponse(arr))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* requestAddDevice(action) {
    const { userId, data, onSuccess, onError } = action
    try {
        const url = ApiConstants.ADD_DEVICE(userId)
        const response = yield call(API.post, url, data)
        const result = response.result ? response.result: {}
        const deviceInfo = result.deviceDTO ? result.deviceDTO : {}
        const arr = []
        arr.push(deviceInfo)
        yield put(DeviceActions.setAddDeviceResponse(arr))
        onSuccess(result)
    } catch (error){
        onError(error)
    }
}

function* requestLinkDeviceWithAsset(action) {
    const { userId, data, onSuccess, onError } = action
    try {
        const url = ApiConstants.ADD_ASSET(userId)
        const response = yield call(API.put, url, data)
        const result = response.result ? response.result: {}
        const assetInfo = result.assetDTO ? result.assetDTO : {}
        const arr = []
        arr.push(assetInfo)
        yield put(DeviceActions.setAddAssetResponse(arr))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}


export function* watchDeviceSetup() {
    yield takeLatest(types.GET_ASSETS_TYPE_REQUEST, resetLoadAssetsType),
    yield takeLatest(types.ADD_GROUP_REQUEST, requestAddGroup),
    yield takeLatest(types.ADD_ASSET_REQUEST, requestAddAsset),
    yield takeLatest(types.ADD_DEVICE_REQUEST, requestAddDevice),
    yield takeLatest(types.LINK_DEVICE_TO_ASSET_REQUEST, requestLinkDeviceWithAsset)
}
