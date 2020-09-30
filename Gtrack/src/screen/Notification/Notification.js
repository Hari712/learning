import React, {useState, Component} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants';
import FontSize from '../../component/FontSize';
import { FlatList } from 'react-native-gesture-handler';

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
                    Notifications
                </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={{ marginLeft: hp(2) }} source={images.image.back} />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    const NotificationItems = ({item}) => {
        return(
            <View>
                <View style={{ flexDirection: 'row', flex: 1, paddingVertical: hp(1.5), paddingHorizontal: wp(1.5) }}>
                    <View style={{ flexDirection: 'row', flex: 0.8, alignItems: 'center' }}>
                        <View style={{ flex: 0.25 }}>
                            <View style={styles.notificationDetailView}>
                                <Image source={item.titleIcon} style={{ height: hp(3.5), width: hp(3.5) }} resizeMode='contain' />
                            </View>
                        </View>

                        <View style={{ paddingHorizontal: '3%', marginTop: hp(1), flex: 0.75 }}>
                            <Text style={{ color: ColorConstant.BLACK, fontSize: FontSize.FontSize.small, fontWeight: 'bold' }}>{item.title}</Text>
                            <Text style={{ color: ColorConstant.GREY, fontSize: hp(1.4), marginTop: hp(1) }}>{item.device}</Text>
                            <Text style={{ color: ColorConstant.GREY, fontSize: hp(1.2), marginTop: hp(1) }}>{item.description}</Text>
                            <Text style={{ color: ColorConstant.GREY, fontSize: hp(1.2), marginTop: hp(1) }}>{item.speed}</Text>
                        </View>
                    </View>

                    <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'flex-end', }}>
                        <View style={styles.stateViewStyle}>
                            <Text style={{ color: ColorConstant.GREY, fontSize: hp(1.2) }}>{item.time}</Text>
                            <Image source={item.crossIcon} style={{ height: hp(1.3), width: hp(1.3) }} resizeMode='contain' />
                        </View>
                    </View>
                </View>

                <View style={styles.lineStyle} />
            </View>
        )
    }

    return(
        <SafeAreaView style={styles.container}>
            <FlatList
                styles={{}}
                contentContainerStyle={{}}
                data={DATA}
                renderItem={NotificationItems}
                keyExtractor={(item,index) => index.toString()}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: ColorConstant.WHITE,
    },
    notificationDetailView: {
        width: hp(6),
        height: hp(6),
        justifyContent: 'center',
        alignItems: 'center'
      },
      stateViewStyle: {
        width: '90%',
        height: hp(2.5),
        justifyContent: 'center',
        alignItems: 'center',
        // paddingHorizontal: '6%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: wp(2)
      },
      lineStyle: {
        borderBottomColor: ColorConstant.GREY, 
        borderBottomWidth: 0.3 
      },
})

export default Notification;

const DATA = [
    {
        titleIcon: images.notification.speed,
        title: 'Speed',
        device: 'TrackPort 4G Vehical GPS Tracker',
        description: 'Speed Violation Limit 50mph',
        speed: 'Speed 75Mph',
        time: '3h ago',
        crossIcon: images.notification.crossIcon
    },
    {
        titleIcon: images.notification.battery,
        title: 'Battery',
        device: 'Spark Nano 7 GPS Tracker',
        description: 'Low Battery 20%',
        time: '10h ago',
        crossIcon: images.notification.crossIcon
    },
    {
        titleIcon: images.notification.car,
        title: 'Tow',
        device: 'Spark Nano 7 GPS Tracker',
        description: 'Your vehicle is being towed.',
        time: '1d ago',
        crossIcon: images.notification.crossIcon
    },
    {
        titleIcon: images.notification.geoFence,
        title: 'Geofence',
        device: 'TrackPort International',
        description: 'Your device is out of bounds.',
        time: '1d ago',
        crossIcon: images.notification.crossIcon,
    },
    {
        titleIcon: images.notification.engineStatus,
        title: 'Engine Status',
        device: 'UK Van',
        description: 'Your vehicle engine is die',
        time: '1d ago',
        crossIcon: images.notification.crossIcon,
    },
    {
        titleIcon: images.notification.IgniteOn,
        title: 'Ignition On',
        device: 'Spark Nano 7 GPS Tracker',
        description: 'Your vehicle is turned On.',
        time: '3d ago',
        crossIcon: images.notification.crossIcon,
    },
    {
        titleIcon: images.notification.Movement,
        title: 'Movement',
        device: 'TrackPort International',
        description: 'Your vehicle has started moving.',
        time: '3d ago',
        crossIcon: images.notification.crossIcon,
    },
    {
        titleIcon: images.notification.IgniteOff,
        title: 'Ignite Off',
        device: 'UK Van',
        description: 'Your vehicle is turned off',
        time: '4d ago',
        crossIcon: images.notification.crossIcon,
    },
    {
        titleIcon: images.notification.panic,
        title: 'Panic',
        device: 'TrackPort 4G Vehicle GPS Tracker',
        description: 'There is a panic alert',
        time: '4d ago',
        crossIcon: images.notification.crossIcon,
    },
    {
        titleIcon: images.notification.panic,
        title: 'Panic',
        device: 'TrackPort International',
        description: 'There is a panic alert',
        time: '4d ago',
        crossIcon: images.notification.crossIcon,
    }
]