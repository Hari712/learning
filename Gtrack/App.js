import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import {MAP_BOX_TOKEN } from './src/constants/AppConstants'

const isAndroid = Platform.OS === 'android'

const Mapbox = Platform.select({
  ios: () => null,
  android: () => require('@react-native-mapbox-gl/maps')
})();

export default class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false
    }
  }

  componentDidMount() {
    if (isAndroid) {
      Mapbox.default.setAccessToken(MAP_BOX_TOKEN);
      Mapbox.default.setTelemetryEnabled(false);
    }
  }
  render() {
    return (
    
      <AppNavigator /> 
               
  );
  }
} 
  

const styles = StyleSheet.create({
  
});

