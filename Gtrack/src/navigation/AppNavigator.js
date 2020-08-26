import { createStackNavigator } from '@react-navigation/stack';
import { Splash, SignUp, Login, ResetPasscode, Passcode, LiveTracking } from '../screen';
import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './NavigationService';
import { TabStackNavigator } from './TabStack';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
        <Stack.Navigator headerMode="none">
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ResetPasscode" component={ResetPasscode} />
        <Stack.Screen name="Passcode" component={Passcode} />
        <Stack.Screen name='LiveTracking' component={TabStackNavigator} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AppNavigator;