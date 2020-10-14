import { combineReducers } from 'redux';
import { loginReducer } from './Login/Login.Reducer'
import { reducer as network, offlineActionTypes } from 'react-native-offline'
import { LOGOUT_REQUEST } from '../constants/ActionTypes'
import { removeItem } from '../utils/storage';
import { USER_DATA } from '../constants/AppConstants';

const rootReducer = combineReducers({
    login: loginReducer,
    network
})

function clearUserData(){
    removeItem(USER_DATA)
}

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