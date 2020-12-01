import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Splash, SignUp, Login, ResetPasscode, Passcode, ChangePasscode, GetStarted } from '../screen';

const AuthStack = createStackNavigator()

const AuthStackNavigator = () => (
    <AuthStack.Navigator initialRouteName="GetStarted" headerMode="none">
        <AuthStack.Screen name="GetStarted" component={GetStarted} />
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="SignUp" component={SignUp} />
        <AuthStack.Screen name="ResetPasscode" component={ResetPasscode} />
        <AuthStack.Screen name="Passcode" component={Passcode} />
        <AuthStack.Screen name="ChangePasscode" component={ChangePasscode} />
    </AuthStack.Navigator>
)

export default AuthStackNavigator