import createReducer from '../../../store/CreateReducer'
import * as types from '../../../constants/ActionTypes';

const initialState = {
    devicesGroup:[]
}

export const tripHistoryReducer = createReducer(state = initialState, {
    [types.GET_GROUP_DEVICES_RESPONSE](state, action) {
        const { traccarDeviceGroupDTOS } = action.data
        return {
            ...state,
            devicesGroup:traccarDeviceGroupDTOS
        }
    },
})