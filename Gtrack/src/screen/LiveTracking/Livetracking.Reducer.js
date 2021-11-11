import createReducer from '../../store/CreateReducer'
import * as types from '../../constants/ActionTypes'
import mapKeys from 'lodash/mapKeys'
import isEmpty from 'lodash/isEmpty'

const initialState = {
    alarmsList: [],
    devicesList: [],
    alertTypes: [],
    geofenceList: [],
    liveTrackingLastKnownPositions: [],
    traccarDevices:[],
    traccarPositions:[],
    groupDevices: [],
    assetInfo: [],
    notificationEvents: [],
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
        const devicePositionObject = mapKeys(arrList,'deviceId');
        const newDevicePositionObject = mapKeys(action.data,'deviceId');
        const updatedDevicePositionObject = { ...devicePositionObject, ...newDevicePositionObject };
        return   {
            ...state,
            liveTrackingLastKnownPositions: Object.values(updatedDevicePositionObject)
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
        return {
            ...state,
            groupDevices: traccarDeviceGroupDTOS
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
        return {
            ...state,
            groupDevices: traccarDeviceGroupDTOS
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
    [types.NOTIFICATION_EVENTS_RESPONSE](state, action) {
        let array = {...state.notificationEvents, ...action.data}
        return {
            ...state,
            notificationEvents: Object.values(array),
            isNewEvent: true
        }
    },
    [types.NOTIFICATION_EVENT_REMOVE](state, action) {
        let array = state.notificationEvents.filter((item) => item.id != action.id)
        return {
            ...state,
            notificationEvents: array,
            isNewEvent: array.length > 0 ? true : false
        }
    }
})