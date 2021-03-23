import createReducer from '../../store/CreateReducer'
import * as types from '../../constants/ActionTypes';

const initialState = {
    tokenType: null,
    accessToken: null,
    refreshToken: null,
    id: null,
    firstName: null,
    lastName: null,
    phonePrefix: null,
    phone: null,
    email: null,
    group:[],
    role:[],
    feedback:[]
}

export const loginReducer = createReducer(state = initialState, {
    [types.LOGIN_RESPONSE](state, action) {
        const { data } = action
        return {
            ...state,
            tokenType: data.tokenType,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            id:data.userDTO.id,
            firstName: data.userDTO.firstName,
            lastName: data.userDTO.lastName,
            phonePrefix: data.userDTO.phonePrefix,
            phone: data.userDTO.phone,
            email: data.userDTO.email,
            group: data.userDTO.groups,
            role: data.userDTO.roles
        }
    },
    [types.EDIT_PROFILE_RESPONSE](state, action) {
        const { data } = action
        return {
            ...state,
            firstName: data.firstName,
            lastName: data.lastName,
            phonePrefix: data.phonePrefix,
            phone: data.phone,
            group: data.groups,
            role: data.roles
        }
    },
    [types.GET_FEEDBACK_RESPONSE](state, action) {
        const { result } = action.data
        return {
            ...state,
            feedback: result
        }
    }
})