import { EMAIL_PHONE_REGEX, EMAIL_VALIDATION_REGEX, NAME_VALIDATION_REGEX, PASSWORD_REGEX, NUMBER_REGEX, CIRCLE_REGEX } from '../constants/AppConstants'
import { removeItem } from '../utils/storage';
import { USER_DATA } from '../constants/AppConstants';
import { clearToken } from "../api";
import RNLocation from 'react-native-location';


export const validateEmailorPhoneNumber = (input) => {
    const emailRE = EMAIL_VALIDATION_REGEX
    const phoneRE = EMAIL_PHONE_REGEX
    return emailRE.test(input) || phoneRE.test(input)
}

export const validatePassword = (input) => {
    const passwordRE = PASSWORD_REGEX
    return passwordRE.test(input)
}

export const validateName = (input) => {
    const nameRE = NAME_VALIDATION_REGEX
    return nameRE.test(input)
}

export const clearUserData = async () => {
    await removeItem(USER_DATA)
    clearToken();
};

export const isCircle = (input) => {
    const cirlceRE = CIRCLE_REGEX
    return cirlceRE.test(input)
}

export const checkLocationPermission = async () => {
    const permission = await RNLocation.checkPermission({
        ios: 'whenInUse', // or 'always'
        android: {
            detail: 'coarse' // or 'fine'
        }
    });
    return permission
}

export function getFormattedPhoneNumber(value) {
    const phone = value.replace(NUMBER_REGEX, '')
    if (phone.length < 4) {
      return phone
    } else if (phone.length < 7) {
      const formatPhone = `${phone.slice(0, 3)}-${phone.slice(3)}`
      return formatPhone
    } else {
      const formatPhone = `${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6, 10)}`
      return formatPhone
    }
  }

export const requestLocationPermission = async () => {
    const permission = await RNLocation.requestPermission({
        ios: 'whenInUse', // or 'always'
        android: {
            detail: 'coarse', // or 'fine'
            rationale: {
                title: "We need to access your location",
                message: "We use your location to start trip",
                buttonPositive: "OK",
                buttonNegative: "Cancel"
            }
        }
    });
    return permission
}