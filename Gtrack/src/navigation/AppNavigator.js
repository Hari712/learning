import { createStackNavigator } from '@react-navigation/stack';
import { Splash, SignUp, Login } from '../screen';
import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './NavigationService';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
        <Stack.Navigator headerMode="none">
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AppNavigator;