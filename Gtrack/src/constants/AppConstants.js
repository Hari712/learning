import { translate } from "../../App";

export const MAP_BOX_TOKEN = 'pk.eyJ1Ijoia2h1c2hidTEyMyIsImEiOiJja2U4ZHBvdmsxbTZtMnpsNjY5M3FidDhnIn0.oHzVctH2vRk-DSj6o0IhsQ'
export const USER_DATA = 'USER_DATA';
export const EMAIL_PHONE_REGEX = /^(\d{10}|\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3}))$/
export const EMAIL_VALIDATION_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const FEEDBACK_VALIDATION_ERROR = 'Please add feedback'
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

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
    LOGIN_SUCCESS:"Login_Success",
    EMPTY_DEVICE_ID: "Empty_Device_Id",
    EMPTY_DEVICE_NAME: "Empty_Device_Name",
    EMPTY_ASSET: 'Please enter asset name',
    EMPTY_ASSET_TYPE: 'Please select asset type',
    EMPTY_GROUP_NAME: 'Please enter group name',
    EMPTY_OLD_PASSCODE: "Empty_Old_Passcode",
    EMPTY_NEW_PASSCODE: "Empty_New_Passcode",
    
}