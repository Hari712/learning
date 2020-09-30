import { all } from 'redux-saga/effects'
import { watchLogin } from './Login/Login.Saga'

function* rootSaga() {
    yield all([
        watchLogin()
    ])
}

export default rootSaga