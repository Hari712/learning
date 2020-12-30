import createReducer from '../../store/CreateReducer'
import * as types from '../../constants/ActionTypes'
import mapKeys from 'lodash/mapKeys'

const initialState = {
    alarmsList: []
}


export const livetrackingReducer = createReducer(state = initialState, {
    [types.GET_ALARMS_LIST_RESPONSE](state, action) {
        return {
            ...state,
            alarmsList: action.data
        }
    },
})