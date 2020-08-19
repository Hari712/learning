import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Splash from './src/screen/Splash/splash'

const App = () => {
  // useEffect(() => {
  //   SplashScreen.hide(); 
  // },[]);
  return (
        <Splash />        
  );
};

const styles = StyleSheet.create({
  
});

export default App;
