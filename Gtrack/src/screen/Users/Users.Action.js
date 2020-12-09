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

export const requestUpdateSubuserDetail = ( body, userId, onSuccess, onError) => ({
    type: types.UPDATE_SUBUSER_DETAIL_REQUEST,
    body,
    userId,
    onSuccess,
    onError
})

export const requestSubuserByFilter = ( body, userId, onSuccess, onError) => ({
    type: types.GET_SUBUSER_BY_FILTER_REQUEST,
    body,
    userId,
    onSuccess,
    onError
})

export const setSubuserByFilter = (data) => ({
    type: types.GET_SUBUSER_BY_FILTER_RESPONSE,
    data
})

export const requestActivateDeactivateDevice = (userId, subUserId, onSuccess, onError) => ({
    type: types.ACTIVATE_DEACTIVATE_DEVICE_REQUEST,
    userId,
    subUserId,
    onSuccess,
    onError
})

export const setUserStatusRequest = (subUserId) => ({
    type: types.ACTIVATE_DEACTIVATE_DEVICE_RESPONSE,
    subUserId
})


