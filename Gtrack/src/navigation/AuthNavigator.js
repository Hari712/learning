import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Splash, SignUp, Login, ResetPasscode, Passcode } from '../screen';

const AuthStack = createStackNavigator()

const AuthStackNavigator = () => (
    <AuthStack.Navigator initialRouteName="Splash" headerMode="none">
        <AuthStack.Screen name="Splash" component={Splash} />
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="SignUp" component={SignUp} />
        <AuthStack.Screen name="ResetPasscode" component={ResetPasscode} />
        <AuthStack.Screen name="Passcode" component={Passcode} />
    </AuthStack.Navigator>
)

export default AuthStackNavigator