import createReducer from '../../store/CreateReducer'
import * as types from '../../constants/ActionTypes'
import mapKeys from 'lodash/mapKeys'

const initialState = {
    alarmsList: [],
    devicesList: [],
    alertTypes: [],
    geofenceList: []
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
})