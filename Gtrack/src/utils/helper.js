import { EMAIL_VALIDATION_REGEX } from '../constants/AppConstants'
import { removeItem } from '../utils/storage';
import { USER_DATA } from '../constants/AppConstants';
import { clearToken } from "../api";

export const validateEmailorPhoneNumber = (input) => {
    const re = EMAIL_VALIDATION_REGEX
    return re.test(input)
}

export const clearUserData = async () => {
    await removeItem(USER_DATA)
    clearToken();
  };