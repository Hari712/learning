import { createSelector } from 'reselect'
import isEmpty from 'lodash/isEmpty'
import { AppConstants } from '../constants/AppConstants'

/**
 * Get User Login Information
 */
export const getLoginInfo = (state) => state.login
export const getLoginState = createSelector(
    [getLoginInfo],
    (info) => info
)

export const isUserLoggedIn = createSelector(
    [getLoginInfo],
    (info) => info && !isEmpty(info.accessToken)
)

export const isRoleRegular = createSelector(
    [getLoginInfo],
    (info) => info && ( info.role[0].name == AppConstants.ROLE_REGULAR )
)

export const isRoleOwner = createSelector(
    [getLoginInfo],
    (info) => info && ( info.role[0].name == AppConstants.ROLE_OWNER ) && (info.isCorporateUser)
)

export const isRoleAdmin = createSelector(
    [getLoginInfo],
    (info) => info && ( info.role[0].name == AppConstants.ROLE_OWNER) && (info.isCorporateUser)
)

/**
 * Get Traccar Session Information
 */
const getTraccarSession = (state) => state.login.traccarSession
export const getTraccarSessionInfo = createSelector(
    [getTraccarSession],
    (info) => info
)


/**
 * Get SubUser Information
 */

const getSubuserInfo = (state) => getSubuserInfoList(state)
function getSubuserInfoList(state) {
    const userInfo = state.users && state.users.subUser ? state.users.subUser  : {}
    const arrUserInfo = Object.values(userInfo)
    arrUserInfo.sort((item1, item2) => item2.id - item1.id)
    return arrUserInfo
}
export const getSubuserState = createSelector(
    [getSubuserInfo],
    (info) => info
)

/**
 * Get Group List
 */

const getGroupInfo = (state) => getGroupList(state)
function getGroupList(state) {
    const groupInfo = state.device && state.device.groups ? state.device.groups : {}
    const arrGroups = Object.values(groupInfo)
    arrGroups.sort((item1, item2) => item2.id - item1.id)
    return arrGroups
}
export const getGroupListInfo = createSelector(
    [getGroupInfo],
    (info) => info
)

/**
 * Get Asset List
 */

const getAssetInfo = (state) => getAssetList(state)
function getAssetList(state) {
    const assetInfo = state.device && state.device.assets ? state.device.assets : {}
    const arrAssets = Object.values(assetInfo)
    arrAssets.sort((item1, item2) => item2.id - item1.id)
    return arrAssets
}
export const getAssetListInfo = createSelector(
    [getAssetInfo],
    (info) => info
)

/**
 * Get Device List
 */

const getDeviceInfo = (state) => getDeviceList(state)
function getDeviceList(state) {
    const deviceInfo = state.device && state.device.devices ? state.device.devices : {}
    const arrDevices = Object.values(deviceInfo)
    arrDevices.sort((item1, item2) => item2.deviceDTO.id - item1.deviceDTO.id)
    return arrDevices
}
export const getDeviceListInfo = createSelector(
    [getDeviceInfo],
    (info) => info
)

/**
 * Get Device Info
 */

const getDeviceDetailInfo = (state, deviceId) => getDevice(state, deviceId)
function getDevice(state, deviceId) {
    const deviceInfo = state.device && state.device.devices ? state.device.devices : {}
    const device = deviceInfo[deviceId].deviceDTO
    return device
}
export const makeGetDeviceDetail = () => createSelector(
    [getDeviceDetailInfo],
    (info) => info
)

/**
 * Get Asset Type List
 */

const getAssetTypeInfo = (state) => getAssetTypeList(state)
function getAssetTypeList(state) {
    const assetInfo = state.device && state.device.assetType ? state.device.assetType : {}
    const arrAssets = Object.values(assetInfo)
    //arrAssets.sort((item1, item2) => item2.id - item1.id)
    return arrAssets
}
export const getAssetTypeListInfo = createSelector(
    [getAssetTypeInfo],
    (info) => info
)

/**
 * Get Device Details List for Dashboard
 */

const getDeviceDetailsInfo = (state) => state.dashBoard

export const getDeviceDetailsListInfo = createSelector(
    [getDeviceDetailsInfo],
    (info) => info
)

/**
 * Get User active/inactive count for Dashboard
 */

const getActiveInactiveCount = (state) => state.dashBoard.data.chartData

export const getActiveInactiveCountListInfo = createSelector(
    [getActiveInactiveCount],
    (info) => info
)

/**
 * Get Notification count for Dashboard
 */

const getNotificationCount = (state) => state.dashBoard.notificationCount

export const getNotificationCountListInfo = createSelector(
    [getNotificationCount],
    (info) => info
)

/**
 * Get Alarms List for Livetracking
 */

const getAlarmsList = (state) => getAlarmTypeList(state)
function getAlarmTypeList(state) {
    const alarmList = state.livetracking && state.livetracking.alarmsList ? state.livetracking.alarmsList : {}
    const arrAlarm = Object.values(alarmList)
    return arrAlarm
}
export const getAlarmsListInfo = createSelector(
    [getAlarmsList],
    (info) => info
)

/**
 * Get Alert Types List for Livetracking
 */

const getAlertTypeList = (state) => getAlertTypeInfo(state)
function getAlertTypeInfo(state) {
    const alertTypeList = state.livetracking && state.livetracking.alertTypes ? state.livetracking.alertTypes : {}
    const arrAlertTypes = alertTypeList.map((item)=>{return item.type})
    return arrAlertTypes
}
export const getAlertTypetListInfo = createSelector(
    [getAlertTypeList],
    (info) => info
)

/**
 * Get Geofence List for Livetracking
 */

const getGeofenceList = (state) => state.livetracking && state.livetracking.geofenceList ? state.livetracking.geofenceList : {}

export const getGeofenceListInfo = createSelector(
    [getGeofenceList],
    (info) => info
)

/**
 * Get Geofence Device List for Livetracking
 */

const getGeofenceDeviceList = (state) => state.livetracking && state.livetracking.devicesList ? state.livetracking.devicesList : {}

export const getGeofenceDeviceListInfo = createSelector(
    [getGeofenceDeviceList],
    (info) => info
)

/**
 * Get Live Tracking Device List
 */

const getLiveTrackingDeviceListInfo = (state) => state.livetracking && state.livetracking.liveTrackingLastKnownPositions ? state.livetracking.liveTrackingLastKnownPositions : []

export const getLiveTrackingDeviceList = createSelector(
    [getLiveTrackingDeviceListInfo],
    (info) => info
)

/*    
 * Get Group Devices for TripHistory and Asset Infromation
 */

const getGroupDevicesList = (state) => state.livetracking && state.livetracking.groupDevices ? state.livetracking.groupDevices : {}

export const getGroupDevicesListInfo = createSelector(
    [getGroupDevicesList],
    (info) => info
)

/**
 * Get Notification List for Settigs
 */

const getSettigsNotificationList = (state) => state.settings && state.settings.notificationList ? state.settings.notificationList : {}

export const getSettigsNotificationListInfo = createSelector(
    [getSettigsNotificationList],
    (info) => info
)

/**
 * Get All User Device
 */

const getAllUserDeviceListInfo = (state) => getAllUserDevices(state)

function getAllUserDevices(state) {
    const devicesInfo = state && state.device && state.device.userDevices ? state.device.userDevices : {}
    const arrDeviceList = Object.values(devicesInfo)
    return arrDeviceList
}

export const getAllUserDevicesList = createSelector(
    [getAllUserDeviceListInfo],
    (info) => info
)

/*
 * Get Asset Info for Asset Infromation
 */

const getAssetInfoList = (state) => state.livetracking && state.livetracking.assetInfo ? state.livetracking.assetInfo : {}

export const getAssetItemInfo = createSelector(
    [getAssetInfoList],
    (info) => info
)

/**
 * Get TripHistory Details
 */

const getTripHistoryList = (state) => state.tripHistory && state.tripHistory.routeDetails ? state.tripHistory.routeDetails : {}

export const getTripHistoryListInfo = createSelector(
    [getTripHistoryList],
    (info) => info
)

/*    
 * Get Group Devices for Livetracking
 */

const getLivetrackingGroupDevicesList = (state) => getAllLivetrackingDevices(state)

function getAllLivetrackingDevices(state) {
    const groupInfo = state.livetracking && state.livetracking.groupDevices ? state.livetracking.groupDevices : {}
    let deviceArr = []
    groupInfo.map((item) => {
        deviceArr = [...deviceArr, ...item.devices]
    })
    return deviceArr
}

export const getLivetrackingGroupDevicesListInfo = createSelector(
    [getLivetrackingGroupDevicesList],
    (info) => info
)
