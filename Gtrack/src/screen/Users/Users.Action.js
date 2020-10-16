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

export const requestAddSubuser = (data, userId, onSuccess, onError) => ({
    type: types.ADD_SUBUSER_REQUEST,
    data,
    userId,
    onSuccess,
    onError
})


export const setAddSubuserResponse = (data) => ({
    type: types.ADD_SUBUSER_RESPONSE,
    data
})

export const requestGetGroup = (userId, onSuccess, onError) => ({
    type: types.GET_GROUP_REQUEST,
    userId,
    onSuccess,
    onError
})

export const setGroupResponse = (data) => ({
    type: types.GET_GROUP_RESPONSE,
    data
})

export const requestUpdateSubuserDetail = (userId, onSuccess, onError) => ({
    type: types.UPDATE_SUBUSER_DETAIL_REQUEST,
    userId,
    onSuccess,
    onError
})

export const setUpdateSubuserDetail = (data) => ({
    type: types.UPDATE_SUBUSER_DETAIL_RESPONSE,
    data
})

