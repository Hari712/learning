import React, { useState, Component, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, RefreshControl, ActivityIndicator } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants';
import { FontSize }from '../../component';
import { FlatList } from 'react-native-gesture-handler';
import Tooltip from 'rn-tooltip';
import { translate } from '../../../App'
import { BackIcon, GreyCrossIcon } from '../../component/SvgComponent'
import { getLivetrackingGroupDevicesListInfo, getLoginState, isUserLoggedIn, getLiveNotificationsInfo, getReadEventsInfo, getLiveNotificationsTotalPagesInfo, getLiveNotificationCountsInfo, getLiveNotificationsTotalCountsInfo } from '../Selector';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import IconConstant from '../../constants/iconConstant';
import NavigationService from '../../navigation/NavigationService';
import { SCREEN_CONSTANTS } from '../../constants/AppConstants';
import * as LiveTrackingAction from '../LiveTracking/Livetracking.Action'
import { isReadEvent, notificationEvents, removeEvent, setReadNotificationEvents } from '../../utils/socketHelper';
import { showNotificationName, showNotificationDesc } from './../../utils/helper';
import { isEmpty } from 'lodash';
import AppManager from '../../constants/AppManager';
import { useIsFocused } from '@react-navigation/native';

const Notification = ({ navigation }) => {
    const [pageIndex, setPageIndex] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoadMoreData, setIsLoadMoreData] = useState(false);
    const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(false);
    const isFocused = useIsFocused()

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

    const { isLoggedIn, isRegular, devicePositions, groupDevices, loginData, hasPanic, notiEvents, readEvents, totalPages, totalCounts, isNewEvent } = useSelector(state => ({
		isLoggedIn: isUserLoggedIn(state),
		//isRegular: isRoleRegular(state),
		//devicePositions: getLiveTrackingDeviceList(state),
		groupDevices: getLivetrackingGroupDevicesListInfo(state),
		//hasPanic: hasPanicAlarm(state),
		loginData: getLoginState(state),
        notiEvents: getLiveNotificationsInfo(state),
        readEvents: getReadEventsInfo(state),
        totalPages: getLiveNotificationsTotalPagesInfo(state),
        totalCounts: getLiveNotificationsTotalCountsInfo(state),
        isNewEvent: getLiveNotificationCountsInfo(state),
	}));

    useEffect(() => {
         if(isFocused) {
            setIsLoadMoreData(false)
            setIsRefreshing(false)
              setPageIndex(0)
              requestNotificationList()
         }
    }, [isFocused])

    useEffect(() => {
        console.log('isNewEvent 1234', isNewEvent)
        if(isNewEvent) {
            setPageIndex(0)
            setIsLoadMoreData(false)
            setIsRefreshing(false)
            requestNotificationList()
        }
    }, [isNewEvent])

    useEffect(() => {
        if(isRefreshing) {
            requestNotificationList()
        }
    }, [isRefreshing])

    // useEffect(() => {
    //     if(isLoadMoreData) {
    //         requestNotificationList()
    //     }
    // }, [isLoadMoreData])

    function requestNotificationList() {
        (!isRefreshing) && AppManager.showLoader() 
        const requestBody = {
            "pageNumber" : pageIndex,
            "pageSize" : 10,
            "useMaxSearchAsLimit" : false,
            "searchColumnsList" : [],
            "sortHeader" : "id",
            "sortDirection" : "DESC"
          }
        dispatch(LiveTrackingAction.requestGetNotificationList(loginData.id, requestBody,  onSuccess, onError))
    }
    function loadMoreNotificationList() {
        const requestBody = {
            "pageNumber" : pageIndex,
            "pageSize" : 10,
            "useMaxSearchAsLimit" : false,
            "searchColumnsList" : [],
            "sortHeader" : "id",
            "sortDirection" : "DESC"
          }
          const isMerge = pageIndex > 0
        dispatch(LiveTrackingAction.requestGetNotificationList(loginData.id, requestBody, isMerge,  onSuccess, onError))
    }

    function onSuccess(data) {    
        console.log("Success",data) 
        dispatch(LiveTrackingAction.setReadNotificationEvents())
        setIsLoadMoreData(false)
        setIsRefreshing(false)
        AppManager.hideLoader()
    }
    
    function onError(error) {
        AppManager.hideLoader()
        console.log("Error",error)  
    }
    const dispatch = useDispatch()
    console.log('notificationEvents', notificationEvents, notiEvents)
    const removeNotification = (item) => {
        removeEvent(item)
        dispatch(LiveTrackingAction.removeNotificationEventResponse(item.id))
    }

    const onNotificationPress = (item) => {
        const requestBody = {
            "notificationIds" : [ item.id ]
          }
          dispatch(LiveTrackingAction.updateNotificationEvents(loginData.id, requestBody, onSuccess, onError))

        function onSuccess(data) {
            NavigationService.navigate(SCREEN_CONSTANTS.ALARMS)
            setReadNotificationEvents(item)
        }
        function onError(error) {
            console.log(error)
        }
    }

    const NotificationItems = ({ item }) => { 
        const deviceDetail = groupDevices.filter((gitem) => gitem.uniqueId === item.deviceIdentifier )        
        const notiType = item.notificationType
        const titleStr = showNotificationName(notiType)
        const imgString = String(notiType).toLowerCase()
        const descriptionStr = showNotificationDesc(notiType) + " at " + moment(item.notificationTime).format("hh:mm a")
        console.log("device 1234", notiEvents, deviceDetail, groupDevices)

        return (
            <TouchableOpacity onPress={()=>{
                onNotificationPress(item)
                }} >
                <View style={styles.notificationMainView}>
                    <View style={styles.notificationLeftMainView}>
                        <View style={styles.notificationLeftView}>
                            <View style={styles.notificationDetailView}>
                                <IconConstant type={imgString} color={ColorConstant.ORANGE} />
                            </View>
                        </View>

                        <View style={styles.notificationRightView}>
                            <Text style={styles.titleStyle, {color: item.isRead ? ColorConstant.GREY : ColorConstant.BLACK}}>{titleStr}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={ item.isRead ? styles.deviceReadStyle : styles.deviceStyle}>{deviceDetail[0] && deviceDetail[0].name}</Text>
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
                            {/* <TouchableOpacity style={{padding:10,zIndex:5}} onPress={()=> removeNotification(item)} >
                                <GreyCrossIcon style={styles.crossImageStyle} resizeMode='contain'/>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                </View>

                <View style={styles.lineStyle} />
            </TouchableOpacity>
        )
    }
    const renderFooter = () => {
        //it will show indicator at the bottom of the list when data is loading otherwise it returns null
        if (isLoadMoreData) return <View><ActivityIndicator size="large" color="#000000" /></View>;
        else return null
      }
    const loadMoreUsers = () => {
            if (!onEndReachedCalledDuringMomentum && !isLoadMoreData) {
              if (notiEvents.length < totalCounts) {
                setIsRefreshing(false)
                setIsLoadMoreData(true)
                setOnEndReachedCalledDuringMomentum(true)
                setPageIndex(pageIndex + 1)
              }
            }
    }
    const onRefresh = () => {
        setIsRefreshing(true)
        setPageIndex(0)
      }
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
               
                data={notiEvents}
                refreshControl={
                    <RefreshControl 
                      refreshing={isRefreshing}
                      onRefresh={onRefresh}     
                    />
                  }
                ListFooterComponent={renderFooter}
                onEndReached={() => loadMoreUsers()}
                onEndReachedThreshold={0.1}
                onMomentumScrollBegin={() => { setOnEndReachedCalledDuringMomentum(false) }}
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