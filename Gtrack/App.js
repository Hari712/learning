import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  // useEffect(() => {
  //   SplashScreen.hide(); 
  // },[]);
  return (
    
      <AppNavigator /> 
               
  );
};

const styles = StyleSheet.create({
  
});

export default App;
