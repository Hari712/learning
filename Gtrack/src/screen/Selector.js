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
    (info) => info && (info.role[0].name == AppConstants.ROLE_REGULAR)
)

export const isRoleOwner = createSelector(
    [getLoginInfo],
    (info) => info && (info.role[0].name == AppConstants.ROLE_OWNER) && (info.isCorporateUser)
)

export const isRoleAdmin = createSelector(
    [getLoginInfo],
    (info) => info && (info.role[0].name == AppConstants.ROLE_OWNER) && (!info.isCorporateUser)
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
    const userInfo = state.users && state.users.subUser ? state.users.subUser : {}
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
    const device = deviceInfo[deviceId] ? deviceInfo[deviceId].deviceDTO : {}
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

export const hasPanicAlarm = createSelector(
    [getAlarmsList],
    (info) => info && info.map((item) => item.attributes && item.attributes.alarms == "sos").includes(true)
)

export const getPanicAlarm = createSelector(
    [getAlarmsList],
    (info) => info && info.filter((item) => item.attributes && item.attributes.alarms == "sos")
)

/**
 * Get Alert Types List for Livetracking
 */

const getAlertTypeList = (state) => getAlertTypeInfo(state)
function getAlertTypeInfo(state) {
    const alertTypeList = state.livetracking && state.livetracking.alertTypes ? state.livetracking.alertTypes : {}
    const arrAlertTypes = alertTypeList.map((item) => { return item.type })
    return arrAlertTypes
}
export const getAlertTypetListInfo = createSelector(
    [getAlertTypeList],
    (info) => info
)

/**
 * Get Geofence List for Livetracking
 */

const getGeofenceList = (state) => getGeofenceInfo(state)

function getGeofenceInfo(state) {
    const geofenceArr = state.livetracking && state.livetracking.geofenceList ? state.livetracking.geofenceList : {}
    const geofenceType = Object.values(geofenceArr)
    geofenceType.sort((item1, item2) => item2.geofence.id - item1.geofence.id)
    return geofenceType
}
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
const getCombinedTripHistoryList = (state) => state.tripHistory && state.tripHistory.tripHistoryDetails ? state.tripHistory.tripHistoryDetails : {}

export const getCombinedTripHistoryListInfo = createSelector(
    [getCombinedTripHistoryList],
    (info) => info
)

/*    
 * Get Combined Trip History coordinates
 */

const getCombinedTripCoordinatesList = (state) => getCombinedTripHistoryCoord(state)

function getCombinedTripHistoryCoord(state) {
    const tripsInfo = state.tripHistory && state.tripHistory.tripHistoryDetails ? state.tripHistory.tripHistoryDetails : {}
      console.log("statestatestatestatestatestatestate",tripsInfo)
    let tripCoordsData
    if(tripsInfo != {}){
    let tripdata = [].slice.call(tripsInfo).sort((a, b) => {
        console.log('a.indexa.index', a.tripStartLongitude)
        if (a.tripStartPositionId < b.tripStartPositionId)
            return -1;
        if (a.tripStartPositionId > b.tripStartPositionId)
            return 1;
        return 0;
    })
    var mapCombined = tripdata && tripdata.map((i) => i.tripTravelledPositions)
    var mapCombined1 = tripdata && tripdata.map((i) => [i.tripEndLatitude, i.tripEndLongitude])

    const mergeResult = [].concat.apply([], mapCombined);
    console.log('tripsInfotripsInfotripsInfotripsInfotripsInfo',mergeResult)
    tripCoordsData = {
      deviceId:tripsInfo.deviceId,
      deviceName: tripsInfo.deviceName,
      tripStartAddress:tripsInfo.tripStartAddress,
      tripEndAddress:tripsInfo.tripEndAddress,
      tripMaxSpeed:tripsInfo.tripMaxSpeed,
      tripTravelledPositions: tripsInfo.tripTravelledPositions,
      tripStartPosition: tripsInfo.tripStartPosition,
      tripEndPosition: tripsInfo.tripEndPosition,
  }

  }
    else {tripCoordsData ={}}
    return tripCoordsData
}
// tripCoordsData = {
//     deviceID:DemoData[0].deviceId,
//     deviceName: DemoData[0].deviceName,
//      startAddress:DemoData[0].tripStartAddress,
//      endAdress:DemoData[0].tripStartAddress,
//      tripMaxSpeed:DemoData[0].tripMaxSpeed,
//     coords: DemoData[0].tripTravelledPositions,
//     points0: DemoData[0].tripStartPosition,
//     points: DemoData[0].tripEndPosition,

// }
export const getCombinedTripCoordinatesListInfo = createSelector(
    [getCombinedTripCoordinatesList],
    (info) => info
)

/*    
 * Get Group Devices for Livetracking
 */

const getLivetrackingGroupDevicesList = (state) => getAllLivetrackingGroupDevices(state)

function getAllLivetrackingGroupDevices(state) {
    const groupInfo = state.livetracking && state.livetracking.groupDevices ? state.livetracking.groupDevices : {}
    let deviceArr = []
    groupInfo.map((item) => {
        deviceArr = [...deviceArr, ...item.devices]
    })
    deviceArr.sort(function (a, b) { return a.id - b.id })
    return deviceArr
}

export const getLivetrackingGroupDevicesListInfo = createSelector(
    [getLivetrackingGroupDevicesList],
    (info) => info
)
/*    
 * Get Devices for Livetracking
 */

const getLivetrackingDevicesList = (state) => getAllLivetrackingDevices(state)

function getAllLivetrackingDevices(state) {
    const groupInfo = state.livetracking && state.livetracking.groupDeviceList ? state.livetracking.groupDeviceList : {}
    return groupInfo
}

export const getLivetrackingDevicesListInfo = createSelector(
    [getLivetrackingDevicesList],
    (info) => info
)

/**
 * Get Advance Settings
 */

const getAdvanceSettings = (state) => state.settings && state.settings.settingsData ? state.settings.settingsData : {}

export const getAdvanceSettingsInfo = createSelector(
    [getAdvanceSettings],
    (info) => info
)

export const dist = createSelector(
    [getAdvanceSettings],
    (info) => info && (info.distance == AppConstants.KILOMETER ? "km" : "mi")
)

/**
 * Get Notified devices for Dashboard
 */

const getNotifiedDevices = (state) => state.dashBoard.notifiedDevices

export const getNotifiedDevicesInfo = createSelector(
    [getNotifiedDevices],
    (info) => info
)

/**
 * Get Notification Events for Livetracking Notification
 */

const getLiveNotifications = (state) => state.livetracking && state.livetracking.notificationEvents ? state.livetracking.notificationEvents : {}

export const getLiveNotificationsInfo = createSelector(
    [getLiveNotifications],
    (info) => info
)
const getLiveNotificationCounts = (state) => state.livetracking && state.livetracking.isNewEvent ? state.livetracking.isNewEvent : false

export const getLiveNotificationCountsInfo = createSelector(
    [getLiveNotificationCounts],
    (info) => info
)
const getReadNotifications = (state) => state.livetracking && state.livetracking.readEvents ? state.livetracking.readEvents : []

export const getReadEventsInfo = createSelector(
    [getReadNotifications],
    (info) => info
)

const getLiveNotificationsTotalPages = (state) => state.livetracking && state.livetracking.notificationTotalPages ? state.livetracking.notificationTotalPages : {}

export const getLiveNotificationsTotalPagesInfo = createSelector(
    [getLiveNotificationsTotalPages],
    (info) => info
)

const getLiveNotificationsTotalCounts = (state) => state.livetracking && state.livetracking.notificationTotalCounts ? state.livetracking.notificationTotalCounts : {}

export const getLiveNotificationsTotalCountsInfo = createSelector(
    [getLiveNotificationsTotalCounts],
    (info) => info
)
/**
 * Get App Logs
 */

const getAppLogsInfo = state => getAppLogsData(state)

function getAppLogsData(state) {
    const logs = state.appLogs && state.appLogs.appLogs ? state.appLogs.appLogs : {}
    const arrLogs = Object.values(logs)
    arrLogs.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
    return arrLogs
}

export const getAppLogs = createSelector(
    getAppLogsInfo,
    logs => logs
)

/**
 * Get Mobile User Information
 */

const getMobileUserInfo = (state) => getMobileuserInfoList(state)
function getMobileuserInfoList(state) {
    const userInfo = state.users && state.users.mobileUser ? state.users.mobileUser : {}
    const arrUserInfo = Object.values(userInfo)
    arrUserInfo.sort((item1, item2) => item2.id - item1.id)
    return arrUserInfo
}
export const getMobileuserState = createSelector(
    [getMobileUserInfo],
    (info) => info
)
