import React, { useState, useEffect } from 'react'
import { Platform } from 'react-native'
import RNLocation from "react-native-location";
import { requestLocationPermission, checkLocationPermission } from './helper'


const useSubscribeLocationUpdates = (login) => {

    const state = login

    const [location, setLocation] = useState(null)

    let unsubscribe = null

    useEffect(() => {
        function configureLocation() {
            RNLocation.configure({
                distanceFilter: 1000, // Meters
                desiredAccuracy: {
                  ios: "best",
                  android: "balancedPowerAccuracy"
                },
                // Android only
                androidProvider: "auto",
                interval: 60000, // Milliseconds
                fastestInterval: 120000, // Milliseconds
                maxWaitTime: 60000, // Milliseconds
                // iOS Only
                activityType: "other",
                allowsBackgroundLocationUpdates: false,
                headingFilter: 1, // Degrees
                headingOrientation: "portrait",
                pausesLocationUpdatesAutomatically: false,
                showsBackgroundLocationIndicator: false,
            })
        }
        function subscribeLocationUpdates() {
            if (state) {
                configureLocation()
                if (Platform.OS === 'ios'){
                    unsubscribe = RNLocation.subscribeToLocationUpdates(locations => {
                        const isLocationExist = locations && locations.length > 0
                        if (isLocationExist) {
                            const locationInfo = locations[0]
                            setLocation(locationInfo)
                        } else {
                            setLocation(null)
                        }
                    })
                } else {
                    unsubscribe = RNLocation.subscribeToLocationUpdates(locations => {
                        const isLocationExist = locations && locations.length > 0
                        if (isLocationExist) {
                            const locationInfo = locations[0]
                            setLocation(locationInfo)
                        } else {
                            setLocation(null)
                        }
                    })
                }
            } else {
                setLocation(null)
            }
        }

        async function checkPermissionAsSubscribeLocationUpdates() {
            const isGranted = await checkLocationPermission()
            if (isGranted) {
                subscribeLocationUpdates()
            } else {
                const isPermissionGranted = await requestLocationPermission()
                if (isPermissionGranted) {
                    subscribeLocationUpdates()
                }
            }
        }

        checkPermissionAsSubscribeLocationUpdates()

        return () => {
            unsubscribe && unsubscribe()
        };

    }, [state]);

    return location

}

export default useSubscribeLocationUpdates