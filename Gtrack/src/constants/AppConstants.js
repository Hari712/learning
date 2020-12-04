export const MAP_BOX_TOKEN = 'pk.eyJ1Ijoia2h1c2hidTEyMyIsImEiOiJja2U4ZHBvdmsxbTZtMnpsNjY5M3FidDhnIn0.oHzVctH2vRk-DSj6o0IhsQ'
export const USER_DATA = 'USER_DATA';
export const EMAIL_PHONE_REGEX = /^(\d{10}|\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3}))$/
export const EMAIL_VALIDATION_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const FEEDBACK_VALIDATION_ERROR = 'Please add feedback'
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export const AppConstants = {
    EMPTY_EMAIL_OR_PHONE: 'Please enter email or phone',
    INVALID_EMAIL_OR_PHONE: 'Please enter valid email or phone number',
    EMPTY_PASSWORD: 'Please enter password',
    EMPTY_CONFIRM_PASSWORD: 'Please enter confirm password',
    PASSWORD_DOES_NOT_MATCH: 'Password and confirm password does not match',
    INVALID_PASSWORD: 'Password should be minimum 8 characters long and must contain one lower character, one upper character, one digit, one special character from @,#,$,%,^,& and No spaces',
    EMPTY_EMAIL: 'Please enter email',
    INVALID_EMAIL: 'Please enter valid email',
    EMPTY_FIRST_NAME: 'Please enter first name',
    EMPTY_LAST_NAME: 'Please enter last name',
    EMPTY_PHONE_NUMBER: 'Please enter phone number',
    EMPTY_COUNTRY_CODE: 'Please select country code',
    INVALID_PHONE_NUMBER: 'Please enter valid phone number',
    EMAIL_SENT:'User created successfully. Please check your mail for account activation',
    LOGIN_SUCCESS:'Login successfully',
    EMPTY_DEVICE_ID: 'Please enter device id',
    EMPTY_DEVICE_NAME: 'Please enter device name',
    EMPTY_ASSET: 'Please enter asset name',
    EMPTY_ASSET_TYPE: 'Please select asset type',
    EMPTY_GROUP_NAME: 'Please enter group name',
    EMPTY_DEVICE_SELECTION: 'Please select device',
    EMPTY_GROUP_SELECTION: 'Please select group'
}