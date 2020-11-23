import { EMAIL_PHONE_REGEX, EMAIL_VALIDATION_REGEX, PASSWORD_REGEX } from '../constants/AppConstants'
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

export const clearUserData = async () => {
    await removeItem(USER_DATA)
    clearToken();
};

export const checkLocationPermission = async () => {
    const permission = await RNLocation.checkPermission({
        ios: 'whenInUse', // or 'always'
        android: {
            detail: 'coarse' // or 'fine'
        }
    });
    return permission
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