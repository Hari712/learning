import { EMAIL_PHONE_REGEX, EMAIL_VALIDATION_REGEX } from '../constants/AppConstants'
import { removeItem } from '../utils/storage';
import { USER_DATA } from '../constants/AppConstants';
import { clearToken } from "../api";

export const validateEmailorPhoneNumber = (input) => {
    const emailRE = EMAIL_VALIDATION_REGEX
    const phoneRE = EMAIL_PHONE_REGEX
    return emailRE.test(input) || phoneRE.test(input)
}

export const clearUserData = async () => {
    await removeItem(USER_DATA)
    clearToken();
  };