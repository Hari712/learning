const BASE_URL = 'https://gtrackdev.vegitone.com/gtrackapi/'

const SUFFIX_URL = 'public/'

const AUTH = 'auth/'

const USER = 'users/'

const ApiConstants = {
    BASE_URL: BASE_URL,
    LOGIN: SUFFIX_URL + AUTH + 'login',
    SIGNUP: SUFFIX_URL + 'signup',
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
    ASSET_TYPE:(userId) => `${USER}${userId}/assets/assetType`
}

export default ApiConstants