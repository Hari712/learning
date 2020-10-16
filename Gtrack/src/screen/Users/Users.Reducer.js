import createReducer from '../../store/CreateReducer'
import * as types from '../../constants/ActionTypes';

const initialState = {
    subUser:[],
    group:[]
}

export const usersReducer = createReducer(state = initialState, {
    [types.GET_SUBUSER_RESPONSE](state, action) {
        const { result } = action.data
        return {
            ...state,
            subUser:result
        }
    },
    [types.GET_GROUP_RESPONSE](state, action) {
        const { result } = action.data
        return {
            ...state,
            group:result
        }
    },
    [types.UPDATE_SUBUSER_DETAIL_RESPONSE](state, action) {
        const { result } = action.data
        return {
            ...state,
            group:result.groups,
            role:result.roles
        }
    },

})