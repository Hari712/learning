import createReducer from '../../store/CreateReducer'
import * as types from '../../constants/ActionTypes'
import mapKeys from 'lodash/mapKeys'

const initialState = {
    deviceCount:null,
    deviceList:[],

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
})