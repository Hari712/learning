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
    email: null
}

export const loginReducer = createReducer(state = initialState, {
    [types.LOGIN_RESPONSE](state, action) {
        const { data } = action
        const { user } = data
        return {
            ...state,
            tokenType: data.tokenType,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            phonePrefix: user.phonePrefix,
            phone: user.phone,
            email: user.email
        }
    }
})