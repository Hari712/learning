const BASE_URL = 'https://gtrackapi-qa.vegitone.com/gtrackapi/' //'https://gtrackapi-dev.vegitone.com/gtrackapi/'

const SUFFIX_URL = 'public/'

const TRACCAR_URL = 'https://traccar-dev.vegitone.com/'

const AUTH = 'auth/'

const USER = 'users/'

const GROUP = 'groups/'

const ApiConstants = {
    BASE_URL: BASE_URL,
    LOGIN: SUFFIX_URL + AUTH + 'login',
    SIGNUP: SUFFIX_URL + 'signup',
    TRACCAR_URL: TRACCAR_URL,
    REFRESH_TOKEN:(userId) => `${SUFFIX_URL}${AUTH}${userId}/token`,
    FORGOT_PASSWORD: `${SUFFIX_URL}forgotPassword/getOTP`,
    VERIFY_OTP: `${SUFFIX_URL}forgotPassword/verifyOTP`,
    RESETPASSWORD: `${SUFFIX_URL}forgotPassword/resetPassword`,
    RESET_PASSWORD: SUFFIX_URL + AUTH + 'resetPassword',
    EDIT_PROFILE:(userId) => `${USER}${userId}/updateProfileDetails`,
    GET_SUBUSER:(userId) => `${USER}${userId}/subUsers`,
    ADD_SUBUSER:(userId) => `${USER}${userId}/addUsers`,
    GET_GROUP:(userId) => `${USER}${userId}/groups`,
    UPDATE_SUBUSER_DETAILS:(userId) =>`${USER}${userId}/updateSubUser`,
    ADD_FEEDBACK:(userId) =>`${USER}${userId}/feedback`,
    GET_FEEDBACK_REQUEST:(userId, appVersion, deviceOS) => `${USER}${userId}/feedback/appVersion/${appVersion}/deviceType/${deviceOS}`,
    GET_SUBUSER_BY_FILTER:(userId) => `${USER}${userId}/list`,
    ASSET_TYPE:(userId) => `${USER}${userId}/assets/assetType`,
    ADD_GROUP:(userId) => `${USER}${userId}/groups`,
    ADD_ASSET:(userId) => `${USER}${userId}/assets`,
    GET_ASSET_BY_USER_ID:(userId) => `${USER}${userId}/assets/all`,
    GET_GROUPS:(userId) => `${USER}${userId}/groups`,
    ADD_DEVICE:(userId) => `${USER}${userId}/devices`,
    GET_ALL_USER_DEVICES:(userId) => `${USER}${userId}/devices/list`,
    GET_NON_GROUPED_DEVICE:(userId) => `${USER}${userId}/devices/groupOrAsset`,
    GET_CONSOLIDATED_DEVICE:(userId) => `${USER}${userId}/devices/consolidated`,
    GET_DEVICE_BY_ID:(userId, deviceId) => `${USER}${userId}/devices/${deviceId}`,
    EXPORT_ALL_DEVICES:(userId) => `${USER}${userId}/devices/export`,
    ACTIVATE_DEACTIVE:(userId, subUserId) => `${USER}${userId}/deleteUser/${subUserId}`,
    DELETE_GROUP:(userId, groupId) => `${USER}${userId}/${GROUP}${groupId}`,
    REMOVE_DEVICE:(userId) => `${USER}${userId}/${GROUP}removeDevice`,
    UPDATE_GROUP:(userId) => `${USER}${userId}/${GROUP}`,
    UPDATE_ASSET:(userId) => `${USER}${userId}/assets/update`,
    DELETE_ASSET_BY_ASSETID:(userId, assetId) => `${USER}${userId}/assets/${assetId}`,
    CHANGE_PASSCODE:(userId) => `${USER}${userId}/changePassword`,
    GET_DEVICE_DETAILS_BY_ID:(userId) => `${USER}${userId}/dashboard/device`,
    GET_USER_ACTIVE_INACTIVE_COUNT_BY_ID:(userId, role) => `${USER}${userId}/dashboard/user/count?role=${role}`,
    GET_USER_DEVICE_OR_NOTIFICATION_COUNT:(userId, deviceId) => `${USER}${userId}/dashboard/alarms?deviceId=${deviceId}`,
    GET_ALARMS_LIST:(userId) => `${USER}${userId}/trace/alerts?typeOrName=`,
    ADD_ALARMS_NOTIFICATION:(userId) => `${USER}${userId}/trace/alerts`,
    GET_DEVICES_BY_USER_ID:(userId) => `${USER}${userId}/devices/consolidated?value=false`,
    GET_ALERT_TYPES:(userId) => `${USER}${userId}/trace/alerts/types`,
    DELETE_NOTIFICATION:(userId, deviceId) => `${USER}${userId}/trace/notifications/${deviceId}`,
    SEARCH_ASSET: (userId, name) => `${USER}${userId}/assets/search?name=${name}`,
    FETCH_TAX_BY_PROVINCE: (userId) => `${USER}${userId}/tax`,
    GET_GEOFENCE:(userId) => `${USER}${userId}/trace/geofences?typeOrName=`,
    DELETE_GEOFENCE:(userId, geofenceId) => `${USER}${userId}/trace/geofences/${geofenceId}`,
    ADD_GEOFENCE:(userId) => `${USER}${userId}/trace/geofences`,
    LINK_GEOFENCE_DEVICES:(userId, geofenceId) => `${USER}${userId}/trace/geofences/${geofenceId}/devices?link=true`,
    UPDATE_GEOFENCE:(userId) => `${USER}${userId}/trace/geofences`,
    ENABLE_DISABLE_GEOFENCE:(userId, geofenceId, enable) => `${USER}${userId}/trace/geofences/${geofenceId}/devices/enabledisable?enable=${enable}`,
    TRACCAR_SESSION: `api/session`
}

export default ApiConstants