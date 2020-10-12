import { all } from 'redux-saga/effects'
import { watchLogin } from './Login/Login.Saga'
import { watchProfile } from './Settings/Profile/Profile.Saga'

function* rootSaga() {
    yield all([
        watchLogin(),
        watchProfile()
    ])
}

export default rootSaga