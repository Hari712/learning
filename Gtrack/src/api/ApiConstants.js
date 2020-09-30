const BASE_URL = 'https://gtrackdev.vegitone.com/gtrackapi/'

const SUFFIX_URL = 'public/'

const AUTH = 'auth/'

const ApiConstants = {
    BASE_URL: BASE_URL,
    LOGIN: SUFFIX_URL + AUTH + 'login',
    SIGNUP: SUFFIX_URL + 'signup',
    REFRESH_TOKEN:(userId) => `${SUFFIX_URL}${AUTH}${userId}/token`,
    RESET_PASSWORD: SUFFIX_URL + AUTH + 'resetPassword'
}

export default ApiConstants