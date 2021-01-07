import { all } from 'redux-saga/effects'
import { watchLogin } from './Login/Login.Saga'
import { watchProfile } from './Settings/Profile/Profile.Saga'
import { watchSettings } from './Settings/Settings.Saga'
import { watchUsers } from './Users/Users.Saga'
import { watchDeviceSetup } from './DeviceSetup/Devcie.Saga'
import { watchDashboard } from './Dashboard/Dashboad.Saga'
import { watchLivetracking } from './LiveTracking/Livetracking.Saga';

function* rootSaga() {
    yield all([
        watchLogin(),
        watchProfile(),
        watchUsers(),
        watchSettings(),
        watchDeviceSetup(),
        watchDashboard(),
        watchLivetracking()
    ])
}

export default rootSaga