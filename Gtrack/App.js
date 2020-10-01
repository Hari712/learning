import 'react-native-gesture-handler';
import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { appManagerRef } from './src/constants/AppManager'
import { Loader } from './src/component'
import { Provider } from "react-redux";
import FlashMessage from "react-native-flash-message"
import { ReduxNetworkProvider } from 'react-native-offline'
import store from './src/store/Store'
import AppNavigator from './src/navigation/AppNavigator';
import { MAP_BOX_TOKEN } from './src/constants/AppConstants'

const isAndroid = Platform.OS === 'android'

const Mapbox = Platform.select({
  ios: () => null,
  android: () => require('@react-native-mapbox-gl/maps')
})();

const MainApp = forwardRef((props, ref) => {

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    initMapBox()
  }, [])

  useImperativeHandle(ref, () => ({
    showLoader: () => showLoader(),
    hideLoader: () => hideLoader()
  }))

  function showLoader() {
    setIsLoading(true)
  }

  function hideLoader() {
    setIsLoading(false)
  }

  function initMapBox() {
    if (isAndroid) {
      Mapbox.default.setAccessToken(MAP_BOX_TOKEN);
      Mapbox.default.setTelemetryEnabled(false);
    }
  }

  return (
    <Provider store={store}>
      <ReduxNetworkProvider>
        <AppNavigator />
        <FlashMessage position="top" animated={true} />
        {isLoading ? <Loader /> : null}
      </ReduxNetworkProvider>
    </Provider>
  )
})

const App = () => {
  return (
    <MainApp ref={appManagerRef} />
  )
}



export default App

