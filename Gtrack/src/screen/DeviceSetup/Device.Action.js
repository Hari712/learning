import * as types from '../../constants/ActionTypes'

export const requestGetAllAssetsType = (userId ,onSuccess, onError) => ({
    type: types.GET_ASSETS_TYPE_REQUEST,
    userId,
    onSuccess,
    onError
})

export const setAssetTypeResponse = (data) => ({
    type: types.GET_ASSETS_TYPE_RESPONSE,
    data
})

