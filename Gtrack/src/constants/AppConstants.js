import { translate } from "../../App";

export const MAP_BOX_TOKEN = 'pk.eyJ1Ijoia2h1c2hidTEyMyIsImEiOiJja2U4ZHBvdmsxbTZtMnpsNjY5M3FidDhnIn0.oHzVctH2vRk-DSj6o0IhsQ'
export const USER_DATA = 'USER_DATA';
export const TRACCAR_SESSION_DATA = 'TRACCAR_SESSION_DATA'
export const EMAIL_PHONE_REGEX = /^(\d{10}|\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3}))$/
export const EMAIL_VALIDATION_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const FEEDBACK_VALIDATION_ERROR = 'Please add feedback'
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
export const NAME_VALIDATION_REGEX = /^[a-zA-Z]+$/
export const UNAUTHORIZED_ERROR_MESSAGE = 'Unauthorized : Invalid Token OR Token Expired'
export const JWT_EXPIRED = "JWT expired"
export const PHONE_REGEX = new RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
export const NUMBER_REGEX = new RegExp(/\D/, 'g')
export const CIRCLE_REGEX = /^CIRCLE\((\-?\d*\.?\d* \-?\d*\.?\d*)\,(\d*\.?\d*)\)$/
export const FCM_TOKEN = 'fcmToken'
export const TOKEN_EXPIRED = 'Token Expired'
export const DEVICE_ID_VALIDATION_REGX = /^[a-zA-Z0-9]*$/

export const TOKEN_ERRORS = ['JWT claims string is empty', 'JWT claims string is empty', 'Invalid grant', 'TOKEN_INVALID', 'Token Invalid']

export const SCREEN_CONSTANTS = {
    SPLASH: 'Splash',
    SIGNUP: 'SignUp',
    LOGIN: 'Login',
    RESET_PASSCODE: 'ResetPasscode',
    PASSCODE: 'Passcode',
    LIVE_TRACKING: 'LiveTracking',
    USERS: 'Users',
    DASHBOARD: 'DashBoard',
    DEVICE_ASSET: 'DeviceAsset',
    SETTINGS: 'Settings',
    PROFILE: 'Profile',
    PERMISSION: 'Permission',
    ABOUT: 'About',
    RATE_US: 'RateUs',
    FEEDBACK:'Feedback',
    DETAILS: 'Details',
    EDIT_DEVICE_ASSET: 'EditDeviceAsset',
    CREATE_DEVICE_ASSET: 'CreateDeviceAsset',
    MANAGE: 'Manage',
    ADD_USER: 'AddUser',
    EDIT_PROFILE: 'EditProfile',
    NOTIFICATION: 'Notification',
    SENSOR_INFO: 'SensorInfo',
    DEVICE_INFO: 'DeviceInfo',
    GEOFENCE: 'GeoFence',
    GEOFENCE_CREATE_NEW: 'GeoFenceCreateNew',
    GEOFENCE_TYPE: 'GeoFenceType',
    GEOFENCE_DETAILS: 'GeoFenceDetails',
    ADVANCE_SETTINGS: 'AdvanceSettings',
    ALARMS: 'Alarms',
    CREATE_NEW: 'CreateNew',
    ALARMS_TYPE: 'AlarmType',
    ALARMS_DETAIL: 'AlarmDetail',
    TRIP_HISTORY: 'TripHistory',
    TRIP_HISTORY_DETAILS: 'TripHistoryDetails',
    DISPATCH_ROUTE: 'DispatchRoute',
    SETTINGS_NOTIFICATION: 'SettingNotification',
    CHANGE_PASSCODE: 'ChangePasscode',
    ACTIVATE_DEVICE: 'ActivateDevice',
    ASSIGN_ASSET: 'AssignAsset',
    ASSIGN_GROUP: 'AssignGroup',
    BARCODE_SCANNER: 'BarcodeScanner',
    COMPLETE_SETUP: 'CompleteSetup',
    GET_STARTED: 'GetStarted',
    GEOFENCE_CREATOR: 'GeoFenceCreator',
    SETTINGS_CHANGE_PASSCODE: 'SettingsChangePassCode',
    TRACKING_DETAILS: 'TrackingDetails',
    GEOFENCE_CIRCLE: 'GeoFenceCircle',
    GEOFENCE_POLYGON: 'GeoFencePolyGon',
    LIVETRACKINGDETAILS: 'LiveTrackingDetails'
}

export const AppConstants = {
    EMPTY_EMAIL_OR_PHONE: "Empty_Email_Or_Phone",
    INVALID_EMAIL_OR_PHONE: "Invalid_Email_Or_Phone",
    EMPTY_PASSWORD: "Empty_Password",
    EMPTY_CONFIRM_PASSWORD:  "Empty_Confirm_Password",
    PASSWORD_DOES_NOT_MATCH: "Password_Does_Not_Match",
    INVALID_PASSWORD: "Invalid_Password",
    EMPTY_EMAIL: "Empty_Email",
    INVALID_EMAIL: "Invalid_Email",
    EMPTY_FIRST_NAME: "Empty_First_Name",
    EMPTY_LAST_NAME: "Empty_Last_Name",
    EMPTY_PHONE_NUMBER: "Empty_Phone_Number",
    EMPTY_COUNTRY_CODE: "Empty_Country_Code",
    INVALID_PHONE_NUMBER: "Invalid_Phone_Number",
    EMAIL_SENT:"Email_Sent",
    EMAIL_SENT_DESC:"Email_Sent_Desc",
    LOGIN_SUCCESS:"Login_Success",
    EMPTY_DEVICE_ID: "Empty_Device_Id",
    EMPTY_DEVICE_NAME: "Empty_Device_Name",
    EMPTY_ASSET: 'Please enter asset name',
    EMPTY_ASSET_TYPE: 'Please select asset type',
    EMPTY_GROUP_NAME: 'Please enter group name',
    EMPTY_DEVICE_SELECTION: 'Please select device',
    EMPTY_GROUP_SELECTION: 'Please select group',
    EMPTY_OLD_PASSCODE: "Empty_Old_Passcode",
    EMPTY_NEW_PASSCODE: "Empty_New_Passcode",
    ROLE_REGULAR: 'ROLE_REGULAR',
    ROLE_OWNER: 'ROLE_OWNER',
    EMPTY_ALARM_NAME: 'Empty_Alarm_Name',
    KILOMETER: 'KILOMETER',
    INVALID_DEVICE_ID: 'Invalid_Device_Id'
}