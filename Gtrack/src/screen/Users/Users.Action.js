import * as types from '../../constants/ActionTypes'

export const requestGetSubuser = (userId, onSuccess, onError) => ({
    type: types.GET_SUBUSER_REQUEST,
    userId,
    onSuccess,
    onError
})

export const setSubuserResponse = (data) => ({
    type: types.GET_SUBUSER_RESPONSE,
    data
})