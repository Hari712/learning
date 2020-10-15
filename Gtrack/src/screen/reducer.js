import { combineReducers } from 'redux';
import { loginReducer } from './Login/Login.Reducer'
import { reducer as network, offlineActionTypes } from 'react-native-offline'
import { LOGOUT_REQUEST } from '../constants/ActionTypes'
import { clearUserData } from '../utils/helper'

const rootReducer = combineReducers({
    login: loginReducer,
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