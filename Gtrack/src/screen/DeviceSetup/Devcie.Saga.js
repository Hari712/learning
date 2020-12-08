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
        const result = response.result ? response.result : []
        yield put(DeviceActions.setAssetTypeResponse(result))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* requestAddGroup(action) {
    const { userId, data, onSuccess, onError } = action
    try {
        const url = ApiConstants.ADD_GROUP(userId)
        const response = yield call(API.post, url, data)
        const result = response.result ? response.result : {}
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
        const result = response.result ? response.result : {}
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
        const result = response.result ? response.result : {}
        const deviceInfo = result.deviceDTO ? result.deviceDTO : {}
        const arr = []
        arr.push(result)
        yield put(DeviceActions.setAddDeviceResponse(arr))
        onSuccess(result)
    } catch (error) {
        onError(error)
    }
}

function* requestLinkDeviceWithAsset(action) {
    const { userId, data, onSuccess, onError } = action
    try {
        const url = ApiConstants.ADD_ASSET(userId)
        const response = yield call(API.put, url, data)
        const result = response.result ? response.result : {}
        const assetInfo = result.assetDTO ? result.assetDTO : {}
        const arr = []
        arr.push(assetInfo)
        yield put(DeviceActions.setAddAssetResponse(arr))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* requestGetAllUserAssets(action) {
    const { userId, onSuccess, onError } = action
    try {
        const url = ApiConstants.GET_ASSET_BY_USER_ID(userId)
        const response = yield call(API.get, url)
        const result = response.result ? response.result : []
        yield put(DeviceActions.setAllUserAssetsResponse(result))
        onSuccess(result)
    } catch (error) {
        onError(error)
    }
}

function* requestGetAllUserGroups(action) {
    const { userId, onSuccess, onError } = action
    try {
        const url = ApiConstants.GET_GROUP(userId)
        const response = yield call(API.get, url)
        const result = response.result ? response.result : []
        yield put(DeviceActions.setGroupResponse(result))
        onSuccess(result)
    } catch (error) {
        onError(error)
    }
}

function* requestLinkDeviceWithGroup(action) {
    const { userId, data, onSuccess, onError } = action
    try {
        const url = ApiConstants.ADD_GROUP(userId)
        const response = yield call(API.put, url, data)
        const result = response.result ? response.result : {}
        const groupInfo = result.groupDTO ? result.groupDTO : {}
        const arr = []
        arr.push(groupInfo)
        yield put(DeviceActions.setAddGroupResponse(arr))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* requestGetAllUserDevices(action) {
    const { userId, data, onSuccess, onError } = action
    const { pageNumber } = data
    try {
        const url = ApiConstants.GET_ALL_USER_DEVICES(userId)
        const response = yield call(API.post, url, data)
        const result = response.result ? response.result : {}
        const arrDeviceList = result.data ? result.data : []
        yield put(DeviceActions.setGetAllUserDeviceResponse(arrDeviceList, pageNumber))
        onSuccess(result)
    } catch (error) {
        onError(error)
    }
}

function* requestGetAllNonGroupedDevice(action) {
    const { userId, data, onSuccess, onError } = action
    try {
        const url = ApiConstants.GET_NON_GROUPED_DEVICE(userId)
        const response = yield call(API.post, url, data)
        const result = response.result ? response.result : []
        onSuccess(result)
    } catch (error) {
        onError(error)
    }
}

function* requestGetConsolidatedDevice(action) {
    const { userId, onSuccess, onError } = action
    try {
        const url = ApiConstants.GET_CONSOLIDATED_DEVICE(userId)
        let queryParams = { query: { value: false } }
        const response = yield call(API.get, url, queryParams)
        const result = response.result ? response.result : []
        onSuccess(result)
    } catch (error) {
        onError(error)
    }
}

function* requestUpdateDevice(action) {
    const { userId, data, onSuccess, onError } = action
    try {
        const url = ApiConstants.ADD_DEVICE(userId)
        const response = yield call(API.put, url, data)
        const result = response.result ? response.result : {}
        const arr = []
        arr.push(result)
        yield put(DeviceActions.setAddDeviceResponse(arr))
        onSuccess(result)
    } catch (error) {
        onError(error)
    }
}

function* requestGetAllDeviceById(action) {
    const { userId, deviceId, onSuccess, onError } = action
    try {
        const url = ApiConstants.GET_DEVICE_BY_ID(userId, deviceId)
        const response = yield call(API.get, url)
        const result = response.result ? response.result : {}
        onSuccess(result)
    } catch (error) {
        onError(error)
    }
}

function* requestExportAllDevices(action) {
    const { userId, onSuccess, onError } = action
    try {
        let requestBody = {
            type: 'csv',
            sendMail: 'true'
        }
        const url = ApiConstants.EXPORT_ALL_DEVICES(userId)
        const response = yield call(API.post, url, requestBody)
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

function* requestExportDeviceByDeviceId(action) {
    const { userId, deviceId, onSuccess, onError } = action
    try {
        let requestBody = {
            device_id: deviceId,
            type: null,
            sendMail: 'true'
        }
        const url = ApiConstants.EXPORT_ALL_DEVICES(userId)
        const response = yield call(API.post, url, requestBody)
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
        yield takeLatest(types.LINK_DEVICE_TO_ASSET_REQUEST, requestLinkDeviceWithAsset),
        yield takeLatest(types.GET_ALL_USER_ASSETS_REQUEST, requestGetAllUserAssets),
        yield takeLatest(types.GET_ALL_GROUP_REQUEST, requestGetAllUserGroups),
        yield takeLatest(types.LINK_DEVICE_WITH_GROUP_REQUEST, requestLinkDeviceWithGroup),
        yield takeLatest(types.GET_ALL_USER_DEVICE_REQUEST, requestGetAllUserDevices),
        yield takeLatest(types.GET_ALL_NON_GROUPED_DEVICE_REQUEST, requestGetAllNonGroupedDevice),
        yield takeLatest(types.GET_CONSOLIDATED_DEVICE_REQUEST, requestGetConsolidatedDevice),
        yield takeLatest(types.UPDATE_DEVICE_REQUEST, requestUpdateDevice),
        yield takeLatest(types.GET_DEVICE_BY_ID_REQUEST, requestGetAllDeviceById),
        yield takeLatest(types.EXPORT_ALL_DEVICES_REQUEST, requestExportAllDevices)
        yield takeLatest(types.EXPORT_DEVICE_BY_DEVICE_ID, requestExportDeviceByDeviceId)
}
