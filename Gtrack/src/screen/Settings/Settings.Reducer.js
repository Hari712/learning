import createReducer from '../../store/CreateReducer'
import * as types from '../../constants/ActionTypes';

const initialState = {
    notificationList:[]
}

export const settingsReducer = createReducer(state = initialState, {
    [types.GET_SETTINGS_NOTIFICATION_RESPONSE](state, action) {
        return {
            ...state,
            notificationList:action.data
        }
    }
})  