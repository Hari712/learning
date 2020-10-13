import { createStackNavigator } from '@react-navigation/stack';
import { Splash } from '../screen';
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './NavigationService';
import { TabStackNavigator } from './TabStack';
import { getLoginState, isUserLoggedIn } from '../screen/Selector'
//import TrackingDetails from '../component/TrackingDetails';
import { getItem } from '../utils/storage';
import { USER_DATA } from '../constants/AppConstants'
import { useDispatch, useSelector } from 'react-redux';
import * as LoginActions from '../screen/Login/Login.Action'
import AuthStackNavigator from './AuthNavigator';
import { setToken, getToken } from '../api';

const Stack = createStackNavigator();


function AppNavigator() {

  const dispatch = useDispatch();
  const [isReady, setIsReady] = React.useState(false);  
  const { isLoggedIn } = useSelector(state => ({
    login: getLoginState(state),
    network: state.network.isConnected,
    isLoggedIn: isUserLoggedIn(state)
}))

  useEffect(() => {

    async function getLoggedInData(){
      const response = await getItem(USER_DATA)
      console.log("Response",response)
      if (response) {
        await setToken(response.result.accessToken)
        dispatch(LoginActions.setLoginResponse(response))
        console.log("Access Token: ", getToken())
      }  
      setIsReady(true)    
    }

    const timer = setTimeout(() => {
      getLoggedInData()
  }, 3000);

  return () => clearTimeout(timer);
}, [])


  if(!isReady) {
    return (<Splash />)
  } else{
    return (
      <NavigationContainer ref={navigationRef}>
          <Stack.Navigator headerMode="none" screenOptions={{ animationEnabled: false }}>
              {
                  isLoggedIn ?
                    <Stack.Screen name='LiveTracking' component={TabStackNavigator} /> 
                    :
                    <Stack.Screen name="Auth" component={AuthStackNavigator} />
              }
          </Stack.Navigator>
      </NavigationContainer>
  )
  }
  // return (
  //   <NavigationContainer ref={navigationRef}>
  //       <Stack.Navigator headerMode="none">
  //         <Stack.Screen name="Splash" component={Splash} />
  //         <Stack.Screen name="SignUp" component={SignUp} />
  //         <Stack.Screen name="Login" component={Login} />
  //         <Stack.Screen name="ResetPasscode" component={ResetPasscode} />
  //         <Stack.Screen name="Passcode" component={Passcode} />
  //         <Stack.Screen name='LiveTracking' component={TabStackNavigator} />
  //         <Stack.Screen name='TrackingDetails' component={TrackingDetails} />
  //       </Stack.Navigator>
  //   </NavigationContainer>

}
export default AppNavigator;