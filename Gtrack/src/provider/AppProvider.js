import React, { createContext, useContext, useEffect, useCallback, useState, useRef } from 'react'
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging'
import { FCM_TOKEN, SCREEN_CONSTANTS } from '../constants/AppConstants'
import AsyncStorage from '@react-native-community/async-storage'
import debounce from 'lodash/debounce'
import isNil from 'lodash/isNil'
import { NotificationMessage } from '../component'
import store from '../store/Store'
import { routeNameRef } from '../navigation/NavigationService';
import NavigationService from '../navigation/NavigationService';
const AppContext = createContext(null)

let unsubscribe = null

const AppProvider = (props) => {


    const debounceMessage = useCallback(debounce(showNewMessage, 1000, { leading: true }), [])


    const value = {
        checkPermission: () => checkPermission(),
        requestPermission: () => requestPermission(),
        initPushNotifictaions: () => initPushNotifictaions()
    }


    async function initData() {
        checkPermission()
        initPushNotifictaions()
    }

    useEffect(() => {
        initData()
        return () => unsubscribe && unsubscribe()
    }, [])

    function initPushNotifictaions() {
        initForegroundListener()
        initBackgroundListener()
        initQuitStateListener()
    }

    function initForegroundListener() {
        unsubscribe = firebase.messaging().onMessage(async (remoteMessage) => {
            const state = store.getState()
            console.log('remoteMessageremoteMessageremoteMessage',remoteMessage)
            if (!isNil(state) && !isNil(state.login)) {
                console.log('FCM Message Data:', remoteMessage.data,remoteMessage);
                debounceMessage(remoteMessage, false)
            }
        });
    }
    console.log('unsubscribe',unsubscribe)
    function initBackgroundListener() {
        //This handler will be fired when app is opened from background state
      
        console.log(
            'Notification caused app to open from background state: called'
        );
        messaging().onNotificationOpenedApp(remoteMessage => {
            const module = remoteMessage && remoteMessage.data && remoteMessage.data.notificationModule ? remoteMessage.data.notificationModule : ''
            // if (routeNameRef && routeNameRef.current && routeNameRef.current === 'ChatMessage' && module === 'CHAT') {

            // } else {
                NavigationService.navigate(SCREEN_CONSTANTS.NOTIFICATION)
            // }
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage
            );
            const state = store.getState()
            if (!isNil(state) && !isNil(state.login)) {
                showNewMessage(remoteMessage, true)
            }
            //navigation.navigate(remoteMessage.data.type);
        });
        
    }

    function initQuitStateListener() {
        // Check whether an initial notification is available
        // This handler will be fired when app is opened from quit state
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    const module = remoteMessage && remoteMessage.data && remoteMessage.data.notificationModule ? remoteMessage.data.notificationModule : ''
                    if (routeNameRef && routeNameRef.current && routeNameRef.current === 'ChatMessage' && module === 'CHAT') {
                        setTimeout(() => {
                            const state = store.getState()
                            if (!isNil(state) && !isNil(state.login)) {
                                showNewMessage(remoteMessage, true)
                            }
                        }, 5000);
                    } else {
                        // NavigationService.navigate('NotificationList')
                        if (Platform.OS == "ios") {
                            setTimeout(() => {
                                const state = store.getState()
                                if (!isNil(state) && !isNil(state.login)) {
                                    showNewMessage(remoteMessage, true)
                                }
                            }, 5000);
                        }
                    }
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage.notification,
                    );

                    //setInitialRoute(remoteMessage.data.type);
                }
            });
    }

    //Check whether Push Notifications are enabled or not
    async function checkPermission() {
        const authStatus = await messaging().hasPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL
            console.log('enabledenabledenabledenabledenabledenabled',enabled)
        if (enabled) {
            
            getToken()
        } else {
            requestPermission()
        }
    }

    //Get Device Registration Token
    async function getToken() {
        let fcmToken = await AsyncStorage.getItem(FCM_TOKEN);
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                console.log('fcmToken:', fcmToken);
                await AsyncStorage.setItem(FCM_TOKEN, fcmToken);
            }
        }
        console.log('FCM token.....', fcmToken)
    }

    //Request for Push Notification
    async function requestPermission() {
        try {
            const authStatus = await messaging().requestPermission();
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL
            if (enabled) {
                console.log('Authorization status:', authStatus);
                getToken()
            }

        } catch (error) {
            // If user do not allow Push Notification
            console.log('Rejected');
        }
    }


    function showNewMessage(remoteMessage, isBackgroundState) {

        const messageTitle = remoteMessage && remoteMessage.notification && remoteMessage.notification.title ? remoteMessage.notification.title : ''
        const messageBody = remoteMessage && remoteMessage.notification && remoteMessage.notification.body ? remoteMessage.notification.body : ''
        const notificationId = remoteMessage && remoteMessage.data && remoteMessage.data.notificationId ? remoteMessage.data.notificationId : ''
        const moduleID = remoteMessage && remoteMessage.data && remoteMessage.data.moduleID ? remoteMessage.data.moduleID : ''
        const time = remoteMessage && remoteMessage.data && remoteMessage.data.notificationTime ? remoteMessage.data.notificationTime : ''
        const module = remoteMessage && remoteMessage.data && remoteMessage.data.notificationModule ? remoteMessage.data.notificationModule : ''
        const state = store.getState()

        let notificationData = null
        // if (module === 'CHAT') {
        //     let messageData = messageTitle + ' has sent you message' + '\n' + messageBody
        //     notificationData = { notificationMessage: messageData, time: time, isUnread: true }
        // } else {
        //     notificationData = { notificationMessage: messageBody, time: time, isUnread: true }
        // }

        // if (routeNameRef && routeNameRef.current && routeNameRef.current === 'ChatMessage' && module === 'CHAT') {

        // } else {
        //     // store.dispatch(NotificationActions.setNotificationData(notificationData))
        // }

        const { company, driver_id } = state.login


        if (!isBackgroundState) {
            if (routeNameRef && routeNameRef.current) {

            } else {
               // NotificationMessage.showSimpleMessage('default', { message: messageTitle, description: messageBody, floating: true, onPress: () => { onTapNotification(module, remoteMessage) } })
            }
        } else {
            onTapNotification(module, remoteMessage)
        }

    }

    function onTapNotification(module, remoteMessage) {
        
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export const useAppProvider = () => {
    return useContext(AppContext)
}

export default AppProvider