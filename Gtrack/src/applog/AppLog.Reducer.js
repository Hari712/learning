import createReducer from '../store/CreateReducer'
import * as types from '../constants/ActionTypes';
import mapKeys from 'lodash/mapKeys'

const initialState = {
    appLogs: {}
}

// { id, module, message, payload } // format
export const appLogReducer = createReducer(state = initialState, {
    [types.ADD_APP_LOGS](state, action){
        const log = [action.data]
        const mapLog = mapKeys(log, 'id')
        const logs = { ...state.appLogs, ...mapLog }
        return {
            ...state,
            appLogs: logs
        }
    }
})
