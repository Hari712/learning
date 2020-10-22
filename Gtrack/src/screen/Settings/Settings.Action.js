import * as types from  '../../constants/ActionTypes'

export const requestAddFeedback = (data, userId, onSuccess, onError) => ({
    type: types.ADD_FEEDBACK_REQUEST,
    data,
    userId,
    onSuccess,
    onError
})

function* requestGetFeedBack(action) {
    const { userId, onSuccess, onError } = action
    try {
        const url = ApiConstants.GET_FEEDBACK(companyName, driverId, version)
        const response = yield call(API.get, url)
        const data = response.result
        yield put(LoginActions.setFeedBackResponse(data))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}