import { EMAIL_PHONE_REGEX, EMAIL_VALIDATION_REGEX, NAME_VALIDATION_REGEX, PASSWORD_REGEX, NUMBER_REGEX, CIRCLE_REGEX, FCM_TOKEN } from '../constants/AppConstants'
import { Dimensions, Platform, StatusBar } from 'react-native'
import { removeItem } from '../utils/storage';
import { USER_DATA } from '../constants/AppConstants';
import { clearToken } from "../api";
import RNLocation from 'react-native-location';
import { ColorConstant } from './../constants/ColorConstants';
import { getMomentText } from '../component/TimeZoneDialog';
import { timeZoneEnum } from '../constants/TimeZoneObj';
import round  from 'lodash/round';


export const validateEmailorPhoneNumber = (input) => {
    const emailRE = EMAIL_VALIDATION_REGEX
    const phoneRE = EMAIL_PHONE_REGEX
    return emailRE.test(input) || phoneRE.test(input)
}
export const validatePhoneNumber = (input) => {
  const phoneRE = EMAIL_PHONE_REGEX
  return  phoneRE.test(input)
}
export const validateEmail = (input) => {
  const emailRE = EMAIL_VALIDATION_REGEX
  return emailRE.test(input) 
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
    // await removeItem(FCM_TOKEN)
    clearToken();
};

export const isCircle = (input) => {
    const cirlceRE = CIRCLE_REGEX
    return cirlceRE.test(input)
}

export const matchStrings = (str1, str2) => {
  return (String(str1).toLowerCase().replace(/\s+/g, '') === String(str2).toLowerCase().replace(/\s+/g, ''))
}

export const switchCaseString = (str1) => {
  // Removes internal and both sides whitespaces and changes it to lowercase for switch
  return String(str1).toLowerCase().replace(/\s+/g, '') 
}

export const toRegularCase = (input) => {
  return String(input).charAt(0).toUpperCase() + String(input).slice(1).toLowerCase()
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
        return round(value/1000,2).toFixed(2) + " " + unit
      else  
        return round(value/1609.344,2).toFixed(2) + " " + unit
    } 
    else 
      return "-"
  }

  export function convertSpeed(value, unit) { 
    if(value){
      if(unit=='km')
      // 1knot = 1.852 kmph
        return round(value * 1.852, 2).toFixed(2) + " " + 'kph'
      else  
      // 1knot = 1.15077945 mph
        return round(value * 1.15077945, 2).toFixed(2) + " " + 'mph'
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

  export function convertAltitudeRound(value) {
      return round(value * 100) / 100
  }

  export function convertTemp(value, settingsData) {
    const unit = settingsData.temprature === "CELSIUS" ? "°C" : "°F"
    const temprature =parseFloat(value/10).toFixed(2)
    if(value){
      if(unit=='°C')
      // 1C = 33.8 F || ° => `\u02DA`
      //   return round(value,2) + " " + unit
        return temprature + " " + unit
      else  
        return round(value*33.8,2) + " " + unit
    } 
    else 
      return "Not Available"
  }

  export function convertTime(value, settingsData) {
    var moment = require('moment-timezone');
    var unit =  getMomentText(settingsData.timeZone)
    // console.log("Timezone", unit, value, timeZoneEnum.map((item)=>moment(value).tz(item.key).format('HH:mm')))
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

  // ENUM for Notification type
  
  export const NOTIFICATION_TYPE = [
    {
      label: "deviceUnknown",
      value: "Device Offline",
      desc: 'Device is offline'
    },
    {
      label: "deviceOffline",
      value: "Device Offline",
      desc: 'Device is offline'
    },    
    {
      label: "deviceOnline",
      value: "Device Online",
      desc: 'Device is online'
    },
    {
      label: "deviceInactive",
      value: "Device Inactive",
      desc: 'Device is inactive'
    },
    {
      label: "ignitionOff",
      value: "Ignition Off",
      desc: 'Your vehicle is turned Off.'
    },
    {
      label: "deviceMoving",
      value: "Device Moving",
      desc: 'Device is Moving'
    },
    {
      label: "deviceOverspeed",
      value: "Device Overspeed",
      desc: 'Speed violation'
    },
    {
      label: "ignitionOn",
      value: "Ignition On",
      desc: 'Your vehicle is turned On.'
    },
    {
      label: "deviceStopped",
      value: "Device Stopped",
      desc: 'Device is stopped'
    },
    {
      label: "alarm",
      value: "Alarm",
      desc: "You have an Alarm"
    },
    {
      label: "sos",
      value: "Panic",
      desc: 'You have an emergency alert'
    },
    {
      label: "lowBattery",
      value: "Battery Level",
      desc: 'Low Battery'
    },
    {
      label: "lowspeed",
      value: "Low Speed",
      desc: "Low speed"
    },
    {
      label: "geofenceEnter",
      value: "Geofence Enter",
      desc: 'Your device has entered the geofence'
    },
    {
      label: "geofenceExit",
      value: "Geofence Exit",
      desc: 'Your device is out of bounds'
    },
    {
      label: "temperature",
      value: "Temperature",
      desc: 'Temperature out of range'
    }
  ]

  export function showNotificationName(item) {
    var val  
    NOTIFICATION_TYPE.filter((nitem)=>{
      if(nitem.label === item)
        val = nitem.value
    })
    return val
  }

  export function showNotificationLabel(item) {
    var val  
    NOTIFICATION_TYPE.filter((nitem)=>{
      if(nitem.value === item)
        val = nitem.label
    })
    return val
  }

  export function showNotificationDesc(item) {
    var val  
    NOTIFICATION_TYPE.filter((nitem)=>{
      if(nitem.label === item)
        val = nitem.desc
    })
    return val
  }
