import React, { useState, Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants';
import { FontSize }from '../../component';
import { FlatList } from 'react-native-gesture-handler';
import Tooltip from 'rn-tooltip';
import { translate } from '../../../App'
import { BackIcon, GreyCrossIcon } from '../../component/SvgComponent'
import { getLivetrackingGroupDevicesListInfo, getLoginState, isUserLoggedIn, getLiveNotificationsInfo } from '../Selector';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import IconConstant from '../../constants/iconConstant';
import NavigationService from '../../navigation/NavigationService';
import { SCREEN_CONSTANTS } from '../../constants/AppConstants';
import * as LiveTrackingAction from '../LiveTracking/Livetracking.Action'
import { isReadEvent, notificationEvents, removeEvent, setReadNotificationEvents } from '../../utils/socketHelper';
import { showNotificationName, showNotificationDesc } from './../../utils/helper';

const Notification = ({ navigation }) => {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={styles.headingTitle}> {translate("Notifications")} </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity style={{padding:hp(2)}} onPress={() => navigation.goBack()}>
                    <BackIcon />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    const { isLoggedIn, isRegular, devicePositions, groupDevices, loginData, hasPanic, notiEvents } = useSelector(state => ({
		isLoggedIn: isUserLoggedIn(state),
		//isRegular: isRoleRegular(state),
		//devicePositions: getLiveTrackingDeviceList(state),
		groupDevices: getLivetrackingGroupDevicesListInfo(state),
		//hasPanic: hasPanicAlarm(state),
		loginData: getLoginState(state),
        notiEvents: getLiveNotificationsInfo(state)
	}));

    const dispatch = useDispatch()
    console.log('notificationEvents', notificationEvents)
    const removeNotification = (item) => {
        removeEvent(item)
        dispatch(LiveTrackingAction.removeNotificationEventResponse(item.id))
    }
    const NotificationItems = ({ item }) => { 
        const deviceDetail = groupDevices.filter((gitem) => gitem.id === item.deviceId )        
        const notiType = item.attributes.alarm ? item.attributes.alarm : item.type
        const titleStr = showNotificationName(notiType)
        const imgString = String(notiType).toLowerCase()
        const descriptionStr = showNotificationDesc(notiType) + " at " + moment(item.serverTime).format("hh:mm a")
        console.log("device", deviceDetail, groupDevices)

        return (
            <TouchableOpacity onPress={()=>{
                NavigationService.navigate(SCREEN_CONSTANTS.ALARMS)
                setReadNotificationEvents(item)
                }} >
                <View style={styles.notificationMainView}>
                    <View style={styles.notificationLeftMainView}>
                        <View style={styles.notificationLeftView}>
                            <View style={styles.notificationDetailView}>
                                <IconConstant type={imgString} color={ColorConstant.ORANGE} />
                            </View>
                        </View>

                        <View style={styles.notificationRightView}>
                            <Text style={styles.titleStyle, {color: isReadEvent(item) ? ColorConstant.GREY : ColorConstant.BLAC}}>{titleStr}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={isReadEvent(item) ? styles.deviceReadStyle : styles.deviceStyle}>{deviceDetail[0] && deviceDetail[0].name}</Text>
                                <Tooltip popover={                                    
                                            <View>
                                                {deviceDetail.map((dextra,key)=>{
                                                    if(key>0)
                                                    return (
                                                        <Text>{dextra}</Text>
                                                    )
                                                })}                                        
                                            </View>
                                        }
                                    backgroundColor={ColorConstant.WHITE}
                                    overlayColor={ColorConstant.TRANSPARENT}
                                    pointerStyle={{ elevation: 0.1, borderRightWidth: 4, borderLeftWidth: 4 }}
                                    containerStyle={{ borderColor: ColorConstant.ORANGE, borderWidth: 1, borderRadius: 6 }}
                                >
                                    <Text style={[styles.deviceStyle, { marginLeft: wp(4) }]}>{deviceDetail.length > 2 ? deviceDetail.length-1 : null}</Text>
                                </Tooltip>
                            </View>
                            <Text style={styles.descriptionStyle}>{descriptionStr}</Text>
                            {deviceDetail[0] && deviceDetail[0].assetType && <Text style={styles.speedTextStyle}>{deviceDetail[0] && deviceDetail[0].assetType}</Text> }
                        </View>
                    </View>

                    <View style={styles.notificationRightMainView}>
                        <View style={styles.stateViewStyle}>
                            <Text style={styles.timeTextStyle}>{moment(item.serverTime).fromNow()}</Text>
                            <TouchableOpacity style={{padding:4,zIndex:5}} onPress={()=> removeNotification(item)} >
                                <GreyCrossIcon style={styles.crossImageStyle} resizeMode='contain'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.lineStyle} />
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                styles={{}}
                contentContainerStyle={{}}
                data={notiEvents}
                // data={DATA}
                renderItem={NotificationItems}
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headingTitle: {
        color: ColorConstant.GREY,
        fontSize: FontSize.FontSize.medium,
        fontWeight: '500',
        textAlign: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: ColorConstant.WHITE,
    },
    notificationMainView: {
        flexDirection: 'row',
        flex: 1,
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(7)
    },
    notificationLeftMainView: {
        flexDirection: 'row',
        flex: 0.8,
        alignItems: 'center'
    },
    notificationRightMainView: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    notificationLeftView: {
        flex: 0.25
    },
    notificationDetailView: {
        width: hp(6),
        height: hp(6),
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyle: {
        height: hp(3.5),
        width: hp(3.5)
    },
    notificationRightView: {
        paddingHorizontal: '3%',
        marginVertical: hp(1),
        flex: 0.75
    },
    titleStyle: {
        color: ColorConstant.BLACK,
        fontSize: FontSize.FontSize.small,
        fontWeight: 'bold'
    },
    deviceStyle: {
        color: ColorConstant.BLACK,
        fontSize: hp(1.4),
        marginTop: hp(1)
    },
    deviceReadStyle: {
        color: ColorConstant.GREY,
        fontSize: hp(1.4),
        marginTop: hp(1)
    },
    descriptionStyle: {
        color: ColorConstant.GREY,
        fontSize: hp(1.2),
        marginTop: hp(1)
    },
    speedTextStyle: {
        color: ColorConstant.GREY,
        fontSize: hp(1.2),
        marginTop: hp(1)
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
    timeTextStyle: {
        color: ColorConstant.GREY,
        fontSize: hp(1.2),
        paddingRight:wp(2)
    },
    crossImageStyle: {
        height: hp(1.3),
        width: hp(1.3)
    },
    lineStyle: {
        borderBottomColor: ColorConstant.GREY,
        borderBottomWidth: 0.5,
    },
})

export default Notification;

const DATA = [
    {
        attributes: {}, // if any speed
        deviceId: 1443, //match with device ID ande get device name
        geofenceId: 0,
        id: 173097,
        maintenanceId: 0,
        positionId: 0,
        serverTime: "2021-05-25T11:35:58.150+0000", /// momnet 3hrs ago
        type: "deviceOnline"  // title 
    },
    {
        attributes: {}, // if any speed
        deviceId: 1443, //match with device ID ande get device name
        geofenceId: 0,
        id: 173097,
        maintenanceId: 0,
        positionId: 0,
        serverTime: "2021-05-25T11:35:58.150+0000", /// momnet 3hrs ago
        type: "deviceOffline"  // title 
    },
    {
        attributes: {}, // if any speed
        deviceId: 413, //match with device ID ande get device name
        geofenceId: 0,
        id: 173097,
        maintenanceId: 0,
        positionId: 0,
        serverTime: "2021-05-25T11:35:58.150+0000", /// momnet 3hrs ago
        type: "ignitionOff"  // title 
    },
]