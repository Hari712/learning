import createReducer from '../../store/CreateReducer'
import * as types from '../../constants/ActionTypes'
import mapKeys from 'lodash/mapKeys'
import isEmpty from 'lodash/isEmpty'
import { convertArrayToPositionObject } from '../../utils/helper'

const initialState = {
    alarmsList: [],
    devicesList: [],
    alertTypes: [],
    geofenceList: [],
    liveTrackingLastKnownPositions: [],
    liveTrakingPositions: {},
    traccarDevices:[],
    traccarPositions:[],
    groupDevices: [],
    groupDeviceList: {},
    assetInfo: [],
    notificationEvents: [],
    readEvents: [],
    notificationTotalPages: 0,
    notificationTotalCounts: 0,                                                                                                                                                                                                                          
    isNewEvent: false
}


export const livetrackingReducer = createReducer(state = initialState, {
    [types.GET_ALARMS_LIST_RESPONSE](state, action) {
        return {
            ...state,
            alarmsList: action.data
        }
    },

    [types.GET_DEVICES_BY_USER_ID_RESPONSE](state, action) {
        const devicesListInfo = mapKeys(action.data, 'id')
        return {
            ...state,
            devicesList: devicesListInfo
        }
    },
    [types.GET_ALERT_TYPES_RESPONSE](state, action) {
        return {
            ...state,
            alertTypes: action.data
        }
    },
    [types.GET_GEOFENCE_RESPONSE](state, action) {
        return {
            ...state,
            geofenceList: action.data
        }
    },
    [types.GET_ADD_GEOFENCE_RESPONSE](state, action) {
        return {
            ...state,
            geofenceList: [action.data, ...state.geofenceList]
        }
    },
    [types.UPDATED_GEOFENCE_RESPONSE](state, action) {
        const updateArr = state.geofenceList? state.geofenceList : []
        const updatedLiist = updateArr.filter((item) => item.geofence.id != action.data.geofence.id)
        return {
            ...state,
            geofenceList: [action.data, ...updatedLiist]
        }
    },
    [types.ENABLE_DISABLE_GEOFENCE_RESPONSE](state, action) {
        const { geofenceId } = action
        const arrGeofence = state.geofenceList ? state.geofenceList : []
        const arrSelectedGeofence = arrGeofence.map((item) => {
            if(item.geofence.id == geofenceId){
                item.isActive = !item.isActive
            }
            return item
        })
        return {
            ...state,
            geofenceList: arrSelectedGeofence
        }
    },
    [types.SET_LIVE_TRACKING_DEVICE_LIST](state, action) {
        let arrList = state.liveTrackingLastKnownPositions ? state.liveTrackingLastKnownPositions : []
        // const { liveTrakingPositions } = state
        // const { data } = action
        // if(liveTrakingPositions !== {}) {
        //     console.log('liveTrakingPositions', data, liveTrakingPositions[data[0].deviceId], Object.keys(liveTrakingPositions), String(data[0].deviceId), Object.keys(liveTrakingPositions).includes(String(data[0].deviceId)))
        //     // positionPolyLine =  Object.keys(liveTrakingPositions).include(data.deviceId) ? { ...liveTrakingPositions[data.deviceId] } : convertArrayToPositionObject(data ,'deviceId');
        //     if(Object.keys(liveTrakingPositions).includes(String(data[0].deviceId))) {
        //         const val = [ ...Object.values(liveTrakingPositions[data[0].deviceId]), { 'latitude': data[0].latitude, 'longitude': data[0].longitude }]
        //         liveTrakingPositions[data[0].deviceId] = val
        //         console.log('reducer', val)
        //         positionPolyLine = liveTrakingPositions[data[0].deviceId]
        //     }
        //     else {
        //     positionPolyLine = convertArrayToPositionObject(data ,'deviceId');
        //     }
        // }
        // else {
        //     positionPolyLine = convertArrayToPositionObject(data ,'deviceId');
        // }
        const devicePositionObject = mapKeys(arrList,'deviceId');
        const newDevicePositionObject = mapKeys(action.data,'deviceId');
        const updatedDevicePositionObject = { ...devicePositionObject, ...newDevicePositionObject };
        // const updatedDevicePosition = { ...liveTrakingPositions, ...positionPolyLine}
        // console.log('arrlist reducer', arrList, action.data, positionPolyLine, devicePositionObject, updatedDevicePositionObject, newDevicePositionObject)
        return   {
            ...state,
            liveTrackingLastKnownPositions: Object.values(updatedDevicePositionObject),
            // liveTrakingPositions: updatedDevicePosition
        }
    },
    [types.SET_DEVICE_STATUS_INFO](state, action) {
        const { data } = action
        const { groupDeviceList } = state
        const deviceListCopy = [ ... groupDeviceList ]
        const updatedDevice = !isEmpty(data) && data[0]
        const existingList = deviceListCopy.filter(i => i.id !== updatedDevice.id);
        const newData = [ ...existingList, updatedDevice ].sort(function(a, b){return a.id - b.id})
        return {
            ...state,
            groupDeviceList: newData
        }
    },
    [types.SET_LIVE_TRACKING_DEVICES](state, action) {
        console.log("devices",action.data)
        return {
            ...state,
            traccarDevices: action.data
        }
    },
    [types.GET_GROUP_DEVICES_RESPONSE](state, action) {
        const { traccarDeviceGroupDTOS } = action.data
        let deviceArr = []
        traccarDeviceGroupDTOS.map((item) => {
            deviceArr = [...deviceArr, ...item.devices]
        })
        deviceArr.sort(function(a, b){return a.id - b.id})
        return {
            ...state,
            groupDevices: traccarDeviceGroupDTOS,
            groupDeviceList: deviceArr
        }
    },
    [types.GET_ALL_LAST_KNOWN_POSITION_RESPONSE](state, action) {
        return {
            ...state,
            assetInfo: action.data
        }
    },
    [types.SEARCH_GROUP_RESPONSE](state, action) {
        const { traccarDeviceGroupDTOS } = action.data
        let deviceArr = []
        traccarDeviceGroupDTOS.map((item) => {
            deviceArr = [...deviceArr, ...item.devices]
        })
        deviceArr.sort(function(a, b){return a.id - b.id})
        return {
            ...state,
            groupDevices: traccarDeviceGroupDTOS,
            groupDeviceList: deviceArr
        }
    },
    [types.SEARCH_GEOFENCE_RESPONSE](state, action) {
        return {
            ...state,
            geofenceList: action.data
        }
    },
    [types.SEARCH_ALARMS_RESPONSE](state, action) {
        return {
            ...state,
            alarmsList: action.data
        }
    },
    [types.GET_NOTIFICATION_LIST_REQUEST](state, action) {
        const { isMerge } = action
        return {
            ...state,
            notificationEvents: isMerge ? state.notificationEvents : []
        }
    },
    [types.SET_NOTIFICATION_LIST_RESPONSE](state, action) {
        const { data, totalPages, totalCount } = action.data
        const isMerge = action.isMerge
        const notificationData = isMerge ? [...state.notificationEvents, ...data ] : data
        return {
            ...state,
            notificationEvents:  notificationData,
            notificationTotalPages: totalPages,
            notificationTotalCounts: totalCount,
        }
    },
    [types.NOTIFICATION_EVENTS_RESPONSE](state, action) {
        return {
            ...state,
            isNewEvent: true
        }
    },
    [types.NOTIFICATION_EVENT_REMOVE](state, action) {
        const { notificationEvents, readEvents } = state
        let array = notificationEvents.filter((item) => item.id != action.id)
        let read = readEvents.filter(item => item != action.id)
        let isReaded = array.filter(i => !readEvents.includes(i.id))
        return {
            ...state,
            notificationEvents: array,
            isNewEvent: isReaded.length > 0 ? true : false,
            readEvents: read
        }
    },
    [types.NOTIFICATION_EVENT_READ](state) {
        return {
            ...state,
            isNewEvent: false
        }
    }
})