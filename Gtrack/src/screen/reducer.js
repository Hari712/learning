import { combineReducers } from 'redux';
import { loginReducer } from './Login/Login.Reducer'
import { usersReducer } from './Users/Users.Reducer'
import { deviceReducer } from './DeviceSetup/Device.Reducer'
import { reducer as network, offlineActionTypes } from 'react-native-offline'
import { LOGOUT_REQUEST } from '../constants/ActionTypes'
import { clearUserData } from '../utils/helper'
import { dashboardReducer } from './Dashboard/Dashboad.Reducer';
import { livetrackingReducer } from './LiveTracking/Livetracking.Reducer'
import {settingsReducer } from './Settings/Settings.Reducer'

const rootReducer = combineReducers({
    login: loginReducer,
    users: usersReducer,
    device: deviceReducer,
    dashBoard: dashboardReducer,
    livetracking: livetrackingReducer,
    settings: settingsReducer,
    network
})

const mainRootReducer = (state, action) => {
    if (action.type === LOGOUT_REQUEST) {
        // for all keys defined in your persistConfig(s)

        clearUserData()
        //LoginActions.setKeyCloakTokenInfo(initialState)
        state = undefined;
    }
    if (action.type === offlineActionTypes.CHANGE_QUEUE_SEMAPHORE) {
      //  RNRestart.Restart()
    }
    return rootReducer(state, action);
};



export default mainRootReducer