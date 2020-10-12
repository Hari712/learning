import * as types from '../../../constants/ActionTypes'

export const requestEditProfile = (data, userId, onSuccess, onError) => ({
    type: types.EDIT_PROFILE_REQUEST,
    data,
    userId,
    onSuccess,
    onError
})

// export const setEditProfileResponse = (data) => ({
//     type: types.EDIT_PROFILE_RESPONSE,
//     data
// })