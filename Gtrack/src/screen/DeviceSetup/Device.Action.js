import * as types from '../../constants/ActionTypes'

export const requestGetAllAssetsType = (userId, onSuccess, onError) => ({
    type: types.GET_ASSETS_TYPE_REQUEST,
    userId,
    onSuccess,
    onError
})

export const setAssetTypeResponse = (data) => ({
    type: types.GET_ASSETS_TYPE_RESPONSE,
    data
})

export const requestAddGroup = (userId, data, onSuccess, onError) => ({
    type: types.ADD_GROUP_REQUEST,
    userId,
    data,
    onSuccess,
    onError
})

export const setAddGroupResponse = (data) => ({
    type: types.ADD_GROUP_RESPONSE,
    data
})

export const requestAddAsset = (userId, data, onSuccess, onError) => ({
    type: types.ADD_ASSET_REQUEST,
    userId,
    data,
    onSuccess,
    onError
})

export const setAddAssetResponse = (data) => ({
    type: types.ADD_ASSET_RESPONSE,
    data
})

export const requestAddDevice = (userId, data, onSuccess, onError) => ({
    type: types.ADD_DEVICE_REQUEST,
    userId,
    data,
    onSuccess,
    onError
})

export const setAddDeviceResponse = (data) => ({
    type: types.ADD_DEVICE_RESPONSE,
    data
})

export const requestLinkDeviceWithAsset = (userId, data, onSuccess, onError) => ({
    type: types.LINK_DEVICE_TO_ASSET_REQUEST,
    userId,
    data,
    onSuccess,
    onError
})

export const setLinkDeviceWithAssetResponse = (data) => ({
    type: types.LINK_DEVICE_TO_ASSET_RESPONSE,
    data
})

export const requestGetAllUserAssets = (userId, onSuccess, onError) => ({
    type: types.GET_ALL_USER_ASSETS_REQUEST,
    userId,
    onSuccess,
    onError
})

export const setAllUserAssetsResponse = (data) => ({
    type: types.GET_ALL_USER_ASSETS_RESPONSE,
    data
})

export const requestGetAllUserGroups = (userId, onSuccess, onError) => ({
    type: types.GET_ALL_GROUP_REQUEST,
    userId,
    onSuccess,
    onError
})

export const setGroupResponse = (data) => ({
    type: types.GET_ALL_GROUP_RESPONSE,
    data
})

export const requestLinkDeviceWithGroup = (userId, data, onSuccess, onError) => ({
    type: types.LINK_DEVICE_WITH_GROUP_REQUEST,
    userId,
    data,
    onSuccess,
    onError
})

export const requestGetAllUserDevice = (userId, data, onSuccess, onError) => ({
    type: types.GET_ALL_USER_DEVICE_REQUEST,
    userId,
    data,
    onSuccess,
    onError
})

export const setGetAllUserDeviceResponse = (data, pageNumber) => ({
    type: types.GET_ALL_USER_DEVICE_RESPONSE,
    data,
    pageNumber
})

export const requestGetAllNonGroupedDevice = (userId, data, onSuccess, onError) => ({
    type: types.GET_ALL_NON_GROUPED_DEVICE_REQUEST,
    userId,
    data,
    onSuccess,
    onError
})

export const requestGetConsolidatedDevice = (userId, onSuccess, onError) => ({
    type: types.GET_CONSOLIDATED_DEVICE_REQUEST,
    userId,
    onSuccess,
    onError
})

export const requestUpdateDevice = (userId, data, onSuccess, onError) => ({
    type: types.UPDATE_DEVICE_REQUEST,
    userId,
    data,
    onSuccess,
    onError
})

export const setUpdateDeviceResponse = (deviceId, data) => ({
    type: types.UPDATE_DEVICE_RESPONSE,
    deviceId,
    data
})

export const requestGetDeviceDetailByIdAndUserId = (userId, deviceId, onSuccess, onError) => ({
    type: types.GET_DEVICE_BY_ID_REQUEST,
    userId,
    deviceId,
    onSuccess,
    onError
})

export const requestExportAllDevices = (userId, onSuccess, onError) => ({
    type: types.EXPORT_ALL_DEVICES_REQUEST,
    userId,
    onSuccess,
    onError
})

export const requestExportDeviceByDeviceID = (userId, data, onSuccess, onError) => ({
    type: types.EXPORT_DEVICE_BY_DEVICE_ID,
    userId,
    data,
    onSuccess,
    onError
})

export const requestDeleteGroup = (userId, groupId, onSuccess, onError) => ({
    type: types.DELETE_GROUP_REQUEST,
    userId,
    groupId,
    onSuccess,
    onError
})
export const requestUpdateAssetInfo = (userId, data, onSuccess, onError) => ({
    type: types.UPDATE_ASSET_REQUEST,
    userId,
    data,
    onSuccess,
    onError
})

export const requestRemoveDevice = (userId, data, key, groupId, onSuccess, onError) => ({
    type: types.REMOVE_GROUP_DEVICE_REQUEST,
    userId,
    data,
    key,
    groupId,
    onSuccess,
    onError
})

export const requestDeleteAssetByAssetId = (userId, assetId, onSuccess, onError) => ({
    type: types.DELETE_ASSET_BY_ASSET_ID_REQUEST,
    userId,
    assetId,
    onSuccess,
    onError
})

export const requestUpdateGroupDevice = (userId, data, onSuccess, onError) => ({
    type: types.UPDATE_GROUP_DEVICE_REQUEST,
    userId,
    data,
    onSuccess,
    onError
})

export const setUpdateGroupDeviceResponse = (data) => ({
    type: types.UPDATE_GROUP_DEVICE_RESPONSE,
    data
})

export const setDeleteAssetResponse = (assetId) => ({
    type: types.DELETE_ASSET_BY_ASSET_ID_RESPONSE,
    assetId
})

export const setDeleteGroupResponse = (groupId) => ({
    type: types.DELETE_GROUP_RESPONSE,
    groupId
})

export const setDeleteDeviceFromGroupResponse = (deviceId, groupId) => ({
    type: types.DELETE_DEVICE_FROM_RESPONSE,
    deviceId,
    groupId
})

export const searchAssetRequset = (userId, name, onSuccess, onError) => ({
    type: types.SEARCH_ASSET_REQUEST,
    userId,
    name,
    onSuccess,
    onError
})

export const setsearchAssetResponse = (data) => ({
    type: types.SEARCH_ASSET_RESPONSE,
    data
})

export const setAllUserDeviceResponse = (data) => ({
    type: types.SET_ALL_DEVICE_USER_RESPONSE,
    data
})

export const getDeviceReportBYID = (userId, deviceId, onSuccess, onError) => ({
    type: types.GET_DEVICE_REPORT_BY_ID,
    userId,
    deviceId,
    onSuccess,
    onError
})

export const requestAddMobileAsTracker = (userId, data, onSuccess, onError) => ({
    type: types.ADD_MOBILE_AS_TRACKER_REQUEST,
    userId,
    data,
    onSuccess,
    onError
})
