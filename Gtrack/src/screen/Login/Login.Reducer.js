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
            tokenType: data.result.tokenType,
            accessToken: data.result.accessToken,
            refreshToken: data.result.refreshToken,
            id:data.result.userDTO.id,
            firstName: data.result.userDTO.firstName,
            lastName: data.result.userDTO.lastName,
            phonePrefix: data.result.userDTO.phonePrefix,
            phone: data.result.userDTO.phone,
            email: data.result.userDTO.email,
            group: data.result.userDTO.groups,
            role: data.result.userDTO.roles
        }
    },
    [types.EDIT_PROFILE_RESPONSE](state, action) {
        const { result } = action.data
        return {
            ...state,
            firstName: result.firstName,
            lastName: result.lastName,
            // phonePrefix: result.phonePrefix,
            phone: result.phone,
            group: result.groups,
            role: result.roles
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