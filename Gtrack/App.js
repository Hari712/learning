import 'react-native-gesture-handler';
import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, Platform, PermissionsAndroid, I18nManager } from 'react-native';
import { appManagerRef } from './src/constants/AppManager'
import { Loader } from './src/component'
import { Provider } from "react-redux";
import FlashMessage from "react-native-flash-message"
import { ReduxNetworkProvider } from 'react-native-offline'
import store from './src/store/Store'
import AppNavigator from './src/navigation/AppNavigator';
import { MAP_BOX_TOKEN } from './src/constants/AppConstants'
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize"; // Use for caching/memoize for better performance
import OfflineStatusBar from './src/component/OfflineBar'
import SocketProvider from './src/provider/SocketProvider'
import withCodePush from './src/hoc/withCodePush'

export const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  en: () => require("./src/locales/en.json"),
  fr: () => require("./src/locales/fr.json")
};

export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

export const setI18nConfig = () => {
  // fallback if no available language fits
  const fallback = { languageTag: "en", isRTL: false };

  const { languageTag, isRTL } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;

  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;
};

const handleLocalizationChange = () => {
  setI18nConfig();
  // forceUpdate();
};



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

  async function initMapBox() {
    if (isAndroid) {
      Mapbox.default.setAccessToken(MAP_BOX_TOKEN);
      Mapbox.default.setTelemetryEnabled(false);
      const permission = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
      ]);
    }
  }

  return (
    <Provider store={store}>
      <ReduxNetworkProvider pingInterval={40000}>
        <SocketProvider>
         <AppNavigator />
        </SocketProvider>
        <FlashMessage position="top" animated={true} />
        {isLoading ? <Loader /> : null}
        <OfflineStatusBar />
      </ReduxNetworkProvider>
    </Provider>
  )
})

const App = () => {

  React.useEffect(() => {
    setI18nConfig(); // set initial config
    RNLocalize.addEventListener("change", handleLocalizationChange());
  },[])
  
  return (
    <MainApp ref={appManagerRef} />
  )
}



export default withCodePush(App)

