import * as types from '../../constants/ActionTypes'

export const requestSignUp = (data, onSuccess, onError) => ({
    type: types.SIGNUP_REQUEST,
    data,
    onSuccess, 
    onError
})
export const setSignupResponse = (data) => ({ 
    type: types.SIGNUP_RESPONSE,
    data
})

