import createReducer from '../../store/CreateReducer'
import * as types from '../../constants/ActionTypes';

const initialState = {
    subUser:[],
}

export const usersReducer = createReducer(state = initialState, {
    [types.GET_SUBUSER_RESPONSE](state, action) {
        const { result } = action.data
        return {
            ...state,
            subUser:result
        }
    },
})