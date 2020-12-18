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
    [types.GET_SUBUSER_BY_FILTER_RESPONSE](state, action) {
        const { result } = action.data
        return {
            ...state,
            subUser:result.data
        }
    },
    [types.GET_GROUP_RESPONSE](state, action) {
        const { result } = action.data
        return {
            ...state,
            group:result
        }
    },
    [types.ADD_SUBUSER_RESPONSE](state, action) {
        const { result } = action.data
        return {
            ...state,
            subUser:[...state.subUser, ...result]
        }
    },    
    [types.UPDATE_SUBUSER_RESPONSE](state, action) {
        const { result } = action.data
        const arrSubUsers = state.subUser 
        const arrSubUsersRemovedUser = arrSubUsers.filter((item) => item.id !== result.id)
        return {
            ...state,
            subUser:[...arrSubUsersRemovedUser, result]
        }
    },
    [types.ACTIVATE_DEACTIVATE_DEVICE_RESPONSE](state, action) {
        const { subUserId } = action
        const arrSubUsers = state.subUser ? state.subUser : []
        const arrSelectedUser = arrSubUsers.map((item) => {
            if (item.id == subUserId) {
                item.isActive = !item.isActive
            }
            return item
        })
        
        return {
            ...state,
            subUser:arrSelectedUser
        }
    }
})