import createReducer from '../../../store/CreateReducer'
import * as types from '../../../constants/ActionTypes';

const initialState = {
    routeDetails:[],
    tripHistoryDetails:[]

}

export const tripHistoryReducer = createReducer(state = initialState, {
    [types.GET_TRIP_HISTORY_RESPONSE](state, action) {
        const { data } = action.data
        return {
            ...state,
            routeDetails:data
        }
    },
    [types.GET_COMBINED_TRIP_HISTORY_RESPONSE](state, action) {
        // const { data } = action.data
      
        // console.log('datadatadatadatadatadatadatadataGET_COMBINED_TRIP_HISTORY_RESPONSE',data,state,action.data)
        return {
            ...state,
            tripHistoryDetails:action.data
        }
    },
    [types.CLEAR_COMBINED_TRIP_HISTORY_RESPONSE](state) {
        // const { data } = action.data
      
        // console.log('datadatadatadatadatadatadatadataGET_COMBINED_TRIP_HISTORY_RESPONSE',data,state,action.data)
        return {
            ...state,
            tripHistoryDetails:[]
        }
    },
})