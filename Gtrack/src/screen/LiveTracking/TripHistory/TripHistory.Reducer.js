import createReducer from '../../../store/CreateReducer'
import * as types from '../../../constants/ActionTypes';

const initialState = {
    routeDetails:[]

}

export const tripHistoryReducer = createReducer(state = initialState, {
    [types.GET_TRIP_HISTORY_RESPONSE](state, action) {
        const { data } = action.data
        return {
            ...state,
            routeDetails:data
        }
    },
})