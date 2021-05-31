import { EMAIL_PHONE_REGEX, EMAIL_VALIDATION_REGEX, NAME_VALIDATION_REGEX, PASSWORD_REGEX, NUMBER_REGEX, CIRCLE_REGEX } from '../constants/AppConstants'
import { Dimensions, Platform, StatusBar } from 'react-native'
import { removeItem } from '../utils/storage';
import { USER_DATA } from '../constants/AppConstants';
import { clearToken } from "../api";
import RNLocation from 'react-native-location';
import { ColorConstant } from './../constants/ColorConstants';


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

export function isIphoneX() {
    const dimen = Dimensions.get('window');
    return (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      ((dimen.height === 780 || dimen.width === 780)
        || (dimen.height === 812 || dimen.width === 812)
        || (dimen.height === 844 || dimen.width === 844)
        || (dimen.height === 896 || dimen.width === 896)
        || (dimen.height === 926 || dimen.width === 926))
    );
  }
  
  export function ifIphoneX(iphoneXStyle, regularStyle) {
    if (isIphoneX()) {
      return iphoneXStyle;
    }
    return regularStyle;
  }

  export function getStatusBarHeight(safe) {
    return Platform.select({
      ios: ifIphoneX(safe ? 44 : 30, 20),
      android: StatusBar.currentHeight,
      default: 0
    });
  }
  
  export function getBottomSpace() {
    return isIphoneX() ? 34 : 0;
  }

  export function SubscriptionStatus(key) {
    switch (key) {
      case "CANCEL":          return "Cancelled"  
      case "ACTIVE":          return "Active" 
      case "PAYMENT_FAILED":  return "Payment failed" 
      case "EXPIRED":         return "Expired" 
      case "IN_ACTIVE":       return "In-Active" 
      default:                return "No Subscription"
    }
  } 

  export function SubscriptionStatusColor(key) {
    switch (key) {
      case "CANCEL":          return {bg: ColorConstant.LIGHTRED, color: ColorConstant.RED}  
      case "ACTIVE":          return {bg: ColorConstant.LIGHTGREEN, color: ColorConstant.DARKGREEN}
      case "PAYMENT_FAILED":  return {bg: ColorConstant.LIGHTGREY, color: ColorConstant.BLACK} 
      case "EXPIRED":         return {bg: ColorConstant.LIGHTGREY, color: ColorConstant.BLACK}
      case "IN_ACTIVE":       return {bg: ColorConstant.LIGHTRED, color: ColorConstant.DARKRED}
      default:                return {bg: "#ffffdf", color: '#916c07'}
    }
  } 
  
  export function convertDist(value, unit) {
    if(value){
      if(unit=='km')
        return round(value/1000,2) + " " + unit
      else  
        return round(value/1609.344,2) + " " + unit
    } 
    else 
      return "-"
  }

  export function convertSpeed(value, unit) { 
    if(value){
      if(unit=='km')
      // 1knot = 1.852 kmph
        return round(value * 1.852, 2) + " " + 'kmph'
      else  
      // 1knot = 1.15077945 mph
        return round(value * 1.15077945, 2) + " " + 'mph'
    } 
    else 
      return "-"
  }

  export function convertSpeedVal(value, unit) { 
    if(unit=='km')
    // 1knot = 1.852 kmph
      return round(value * 1.852, 2)
    else  
    // 1knot = 1.15077945 mph
      return round(value * 1.15077945, 2) 
  }

  export function convertSpeedtoKnot(value, unit) { 
    if(unit=='km')
    // 1knot = 1.852 kmph
      return round(value / 1.852, 2)
    else  
    // 1knot = 1.15077945 mph
      return round(value / 1.15077945, 2)
  }

  export function convertTemp(value, settingsData) {
    const unit = settingsData.temprature === "CELSIUS" ? "°C" : "°F"
    if(value){
      if(unit=='°C')
      // 1C = 33.8 F || ° => `\u02DA`
        return round(value,2) + " " + unit
      else  
        return round(value*33.8,2) + " " + unit
    } 
    else 
      return "-"
  }

  export function convertTime(value, settingsData) {
    var moment = require('moment-timezone');
    var unit = settingsData.timeZone === "IST"  ? "Asia/Kolkata" : settingsData.timeZone === "EST"  ? "America/Toronto" : null
    return unit ? moment(value).tz(unit) : moment(value)
  }

  export function getTimeUUID(time) {  //Here time must be in microseconds
    const start = Date.UTC(2012, 12, 21, 12, 0, 0, 0) * 1000
    const prefix = String(Math.floor(Math.random() * 10))
    const postfix = Math.floor(Math.random() * 36).toString(36)
    const abs = Math.abs
    return prefix + abs(time - start).toString(36) + postfix
  }

  export function decimalTohhmm(time) {  //Here time must be in decimal ex. 10 or 7 or 1.29 etc
    var minutes = time
    var min = Math.floor(Math.abs(minutes))
    var sec = Math.floor((Math.abs(minutes) * 60) % 60);
    return (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
  }
