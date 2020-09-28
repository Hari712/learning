import React, { useState, Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { ColorConstant } from '../../constants/ColorConstants';
import images from '../../constants/images';
import FontSize from '../../component/FontSize';

const Notification = ({ navigation }) => {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={{
                    color: ColorConstant.GREY,
                    fontSize: FontSize.FontSize.medium,
                    fontWeight: '500',
                    textAlign: 'center'
                }}>
                    Notification
                </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={{ marginLeft: hp(2) }} source={images.image.back} />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    return(
        <View>
            <Text>kk</Text>
        </View>
    )
}

export default Notification;

const DATA = [
    {
        titleIcon: images.image.notification.speed,
        title: 'Speed',
        device: 'TrackPort 4G Vehical GPS Tracker',
        description: 'Speed Violation Limit 50mph',
        speed: 'Speed 75mph',
        time: '3h ago',
        crossIcon: images.image.notification.cross
    },
    {
        titleIcon: images.image.notification.battery,
        title: 'Battery',
        device: 'Spark Nano 7 GPS Tracker',
        description: 'Low Battery 20%',
        time: '10h ago',
        crossIcon: images.image.notification.cross
    },
    {
        titleIcon: images.image.notification.car,
        title: 'Tow',
        device: 'Spark Nano 7 GPS Tracker',
        description: 'Your vehicle being towed',
        time: '1d ago',
        crossIcon: images.image.notification.cross
    },
    {
        titleIcon: images.image.notification.Geofence,
        title: Geofence,
        device: 'TrackPort International',
        description: 'Your device is out of bounds',
        time: '1d ago',
        crossIcon: images.image.notification.cross
    },
    {
        titleIcon: images.image.notification.EngineStatus,
        title: 'Engine Status',
        device: 'UK Van',
        description: 'Your vehicle engine is idle',
        time: '1d ago',
        crossIcon: images.image.notification.cross
    },
]