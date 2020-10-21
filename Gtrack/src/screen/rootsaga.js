import { all } from 'redux-saga/effects'
import { watchLogin } from './Login/Login.Saga'
import { watchProfile } from './Settings/Profile/Profile.Saga'
import { watchUsers } from './Users/Users.Saga'

function* rootSaga() {
    yield all([
        watchLogin(),
        watchProfile(),
        watchUsers()
    ])
}

export default rootSaga