import createReducer from '../../store/CreateReducer'
import * as types from '../../constants/ActionTypes';
import { isEmpty } from 'lodash';

const initialState = {
    subUser: [],
    group: [],
    mobileUser: []
}

export const usersReducer = createReducer(state = initialState, {
    [types.GET_SUBUSER_RESPONSE](state, action) {
        const { result } = action.data
        return {
            ...state,
            subUser: result
        }
    },
    [types.GET_SUBUSER_BY_FILTER_RESPONSE](state, action) {
        const { result } = action.data
        return {
            ...state,
            subUser: result.data
        }
    },
    [types.GET_GROUP_RESPONSE](state, action) {
        const { result } = action.data
        return {
            ...state,
            group: result
        }
    },
    [types.ADD_SUBUSER_RESPONSE](state, action) {
        const { result } = action.data
        const userlist = !isEmpty(state.subUser) ? [...result, ...state.subUser] : [...result]
        return {
            ...state,
            subUser: userlist
        }
    },
    [types.UPDATE_SUBUSER_RESPONSE](state, action) {
        const { result } = action.data
        const arrSubUsers = state.subUser
        const arrSubUsersRemovedUser = arrSubUsers.filter((item) => item.id !== result.id)
        return {
            ...state,
            subUser: [result, ...arrSubUsersRemovedUser]
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
            subUser: arrSelectedUser
        }
    },
    [types.GET_MOBILE_USER_BY_FILTER_RESPONSE](state, action) {
        const { result } = action.data
        return {
            ...state,
            mobileUser: result.data
        }
    },
    [types.MOBILE_ACTIVATE_DEACTIVATE_DEVICE_RESPONSE](state, action) {
        const { subUserId } = action
        const arrMobileUsers = state.mobileUser ? state.mobileUser : []
        const arrSelectedUser = arrMobileUsers.map((item) => {
            if (item.id == subUserId) {
                item.isActive = !item.isActive
            }
            return item
        })

        return {
            ...state,
            mobileUser: arrSelectedUser
        }
    },
})