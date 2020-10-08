import { createStackNavigator } from '@react-navigation/stack';
import { Splash, SignUp, Login, ResetPasscode, Passcode, LiveTracking } from '../screen';
import React, { useEffect } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import NavigationService, { navigationRef } from './NavigationService';
import { TabStackNavigator } from './TabStack';

import TrackingDetails from '../component/TrackingDetails';
import { getItem } from '../utils/storage';
import { USER_DATA } from '../constants/AppConstants'
import { useDispatch } from 'react-redux';
import * as LoginActions from '../screen/Login/Login.Action'

const Stack = createStackNavigator();


function AppNavigator() {

  const dispatch = useDispatch();

  useEffect(() => {

    async function getLoggedInData(){
      const response = await getItem(USER_DATA)
      console.log("Response",response)
      if (response) {
        dispatch(LoginActions.setLoginResponse(response))
        NavigationService.navigate("LiveTracking")
    }      
    }
    setTimeout( ()=>{      
      getLoggedInData();
    },3000)
  },[])


  return (
    <NavigationContainer ref={navigationRef}>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="ResetPasscode" component={ResetPasscode} />
          <Stack.Screen name="Passcode" component={Passcode} />
          <Stack.Screen name='LiveTracking' component={TabStackNavigator} />
          <Stack.Screen name='TrackingDetails' component={TrackingDetails} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AppNavigator;