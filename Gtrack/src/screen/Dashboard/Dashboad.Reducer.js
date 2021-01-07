import createReducer from '../../store/CreateReducer'
import * as types from '../../constants/ActionTypes'
import mapKeys from 'lodash/mapKeys'

const initialState = {
    deviceCount:null,
    deviceList:[],
    data:[],
    notificationCount:[]


}


export const dashboardReducer = createReducer(state = initialState, {
    [types.GET_DEVICE_DETAILS_BY_USER_ID_RESPONSE](state, action) {
        const { genericDTOS, deviceCount } = action.data
        const arryDevices = mapKeys(genericDTOS,"deviceDTO.id")
        return {
            ...state,
            deviceCount: deviceCount,
            deviceList: arryDevices
        }
    },

    [types.GET_USER_ACTIVE_INACTIVE_COUNT_BY_ID_RESPONSE](state, action) {
        return {
            ...state,
            data: action.data
        }
    },

    [types.GET_USER_DEVICE_EVENTS_OR_NOTIFICATION_COUNT_RESPONSE](state, action) {
        return {
            ...state,
            notificationCount: action.data
        }
    },
})