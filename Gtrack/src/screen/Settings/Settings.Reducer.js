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
    },
    [types.LOCAL_SETTINGS_NOTIFICATION_UPDATE](state, action) {
        const {item, notificator} = action
        const arrNoti = state.notificationList ? state.notificationList : []
        const newArrayList = arrNoti.map((item1) => {
            if(item1.notification.id == item.notification.id){
                item1.notification.notificators = notificator
            }
            return item1
        } )
        return {
            ...state,
            notificationList: newArrayList
        }
    }
})  