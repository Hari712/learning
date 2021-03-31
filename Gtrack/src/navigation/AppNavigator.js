import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Splash, NoInternet } from '../screen';
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './NavigationService';
import { TabStackNavigator } from './TabStack';
import { getLoginState, isUserLoggedIn } from '../screen/Selector'
//import TrackingDetails from '../component/TrackingDetails';
import { getItem } from '../utils/storage';
import { USER_DATA, TRACCAR_SESSION_DATA } from '../constants/AppConstants'
import { useDispatch, useSelector } from 'react-redux';
import * as LoginActions from '../screen/Login/Login.Action'
import AuthStackNavigator from './AuthNavigator';
import { setToken, getToken } from '../api';
import * as SettingsActions from '../screen/Settings/Settings.Action'
import DeviceInfo from 'react-native-device-info'
import * as DeviceActions from '../screen/DeviceSetup/Device.Action'
import { showOfflineStatusBar, hideOfflineStatusBar } from '../component/OfflineBar'


const ConnectivityStack = createStackNavigator();

export const ConnectivityStackNavigator = () => (
  <ConnectivityStack.Navigator headerMode='none' mode='modal'>
    <ConnectivityStack.Screen name="Connection" component={NoInternet} />
  </ConnectivityStack.Navigator>
)

const Stack = createStackNavigator();


function AppNavigator() {

  const dispatch = useDispatch();
  const [isReady, setIsReady] = React.useState(false);
  const { login, isConnected, isLoggedIn } = useSelector(state => ({
    login: getLoginState(state),
    isConnected: state.network.isConnected,
    isLoggedIn: isUserLoggedIn(state)
  }))

  useEffect(() => {

    async function getLoggedInData() {
      const response = await getItem(USER_DATA)
      console.log("Response", response)
      if (response) {
        const traccarSessionData = await getItem(TRACCAR_SESSION_DATA)
        setToken(response.accessToken)
        dispatch(LoginActions.setLoginResponse(response))
        console.log("Access Token: ", getToken())

        let deviceType = DeviceInfo.getSystemName();
        let version = DeviceInfo.getVersion();
        dispatch(SettingsActions.requestGetFeedBack(response.userDTO.id, version, deviceType, onFeedbackSuccess, onFeedbackError))
        dispatch(DeviceActions.requestGetAllAssetsType(response.userDTO.id, onAssetTypeLoadedSuccess, onAssetTypeLoadedErrror))
        dispatch(DeviceActions.requestGetAllUserAssets(response.userDTO.id, onUserAssetListLoadedSuccess, onUserAssetListLoadedError))
        dispatch(DeviceActions.requestGetAllUserGroups(response.userDTO.id, onGetAllUserGroupsSuccess, onGetAllUserGroupError))
        dispatch(LoginActions.setTraccarSessionData(response))
      }
      setIsReady(true)
    }

    const timer = setTimeout(() => {
      getLoggedInData()
    }, 3000);

    return () => clearTimeout(timer);
  }, [])

  useEffect(() => {
    if (isConnected) {
      hideOfflineStatusBar()
    } else {
      showOfflineStatusBar()
    }
  }, [isConnected])


  function onGetAllUserGroupsSuccess(data) {
    console.log('Group List Loaded Success')
  }

  function onGetAllUserGroupError(error) {
    console.log('Group List Loaded Error')
  }

  function onUserAssetListLoadedSuccess(data) {
    console.log('Asset List Loaded Success')
  }

  function onUserAssetListLoadedError(error) {
    console.log('Asset List Loaded Error')
  }

  function onAssetTypeLoadedSuccess(data) {
    console.log('Asset Type Loaded Success')
  }

  function onAssetTypeLoadedErrror(error) {
    console.log('Asset Type Loaded error', error)
  }

  function onFeedbackSuccess(data) {
    console.log("Success Feedback", data)
  }

  function onFeedbackError(error) {
    console.log("Error Feedback", error)
  }


  if (!isReady) {
    return (<Splash />)
  } else {
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator headerMode="none" screenOptions={{
          animationEnabled: false, headerShown: false,
          gestureEnabled: true,
          cardOverlayEnabled: true,
          ...TransitionPresets.ScaleFromCenterAndroid
        }}>
          {
            isLoggedIn ?
              <Stack.Screen name='LiveTracking' component={TabStackNavigator} />
              :
              <Stack.Screen name="Auth" component={AuthStackNavigator} />
          }
          <Stack.Screen name="Connection" component={ConnectivityStackNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

}
export default AppNavigator;