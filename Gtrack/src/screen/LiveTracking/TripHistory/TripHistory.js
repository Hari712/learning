import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import * as TripHistoryActions from './TripHistory.Action'
import { ColorConstant } from '../../../constants/ColorConstants';
import  { FontSize }from '../../../component';
import { FlatList } from 'react-native-gesture-handler';
import { translate } from '../../../../App'
import { SCREEN_CONSTANTS } from '../../../constants/AppConstants';
import { BackIcon, NextOrangeIcon } from '../../../component/SvgComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupDevicesListInfo, getLoginState } from '../../Selector';
import AppManager from '../../../constants/AppManager';

const TripHistory = ({ navigation }) => {

    const { loginData, groupDevices, isConnected } = useSelector(state => ({
        loginData: getLoginState(state),
        groupDevices: getGroupDevicesListInfo(state),
        isConnected: state.network.isConnected
    }))

    console.log("khushi",groupDevices)

    const dispatch = useDispatch()

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={{
                    color: ColorConstant.GREY,
                    fontSize: FontSize.FontSize.medium,
                    fontWeight: '500',
                    textAlign: 'center'
                }}>
                    {translate("Trip History")}
                </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity style={{padding:hp(2)}} onPress={() => navigation.goBack()}>
                    <BackIcon />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    useEffect(()=>{
        fetchGroupDevices()
        //fetchTripHistory()
    },[])

    function fetchGroupDevices() {
        AppManager.showLoader() 
        dispatch(TripHistoryActions.getGroupDevicesRequset(loginData.id, onSuccess, onError))
    }

    function onSuccess(data) {    
        console.log("Success",data) 
        AppManager.hideLoader()
    }
    
    function onError(error) {
        AppManager.hideLoader()
        console.log("Error",error)  
    }

    function fetchTripHistory() {
        if (isConnected) {
            const requestBody =  {
                "pageNumber" : 0,
                "pageSize" : 5,
                "useMaxSearchAsLimit" : false,
                "searchColumnsList" : null,
                "sortHeader" : "id",
                "sortDirection" : "DESC"
            }
            dispatch(TripHistoryActions.getTripHistoryRequest(requestBody, loginData.id, 12, '2021-03-02T10:00:00.000', '2021-03-02T12:00:00.000', onSuccess, onError))
        } else {
            AppManager.showNoInternetConnectivityError()
        }
    }

    const SensorInfoItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.sensorInfoMainView} onPress={() => { navigation.navigate(SCREEN_CONSTANTS.TRIP_HISTORY_DETAILS, {data: item})} } >
                <View style={styles.deviceinfoView}>
                    <Text style={{ fontSize: FontSize.FontSize.small, color: ColorConstant.BLACK }}>{item.name}</Text>
                    <NextOrangeIcon style={{ width: wp(2), height: hp(3), marginTop: 2 }} resizeMode="contain"/>
                </View>
                <View style={styles.footerIconStyle} />
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{fontFamily:'Nunito-Regular',color:ColorConstant.BLUE,paddingHorizontal:hp(2),marginTop:hp(2)}}>Select device</Text>
            <FlatList
                style={{}}
                contentContainerStyle={{}}
                data={groupDevices}
                renderItem={SensorInfoItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorConstant.WHITE,
    },

    sensorInfoMainView: {
        width: Dimensions.get('screen').width - 30,
        marginTop: hp(2),
        alignSelf: 'center',
        backgroundColor: ColorConstant.WHITE,
        borderRadius: 15,
        borderWidth: 0.3,
        borderColor: ColorConstant.GREY,
        shadowColor: ColorConstant.GREY,
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 0 },
    },

    deviceinfoView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: hp(2),
        paddingHorizontal: wp(2),
        alignItems: 'center'
    },

    footerIconStyle: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor: ColorConstant.BLUE,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderWidth: 0.3,
        borderColor: ColorConstant.BLUE,
        padding: 5
    },
})

export default TripHistory;

const SENSORINFOITEMS = [
    {
        title: 'Trackport 4G Vehicle GPS Tracker'
    },
    {
        title: 'Trackport 4G Vehicle GPS Tracker'
    },
    {
        title: 'Trackport International'
    },
    {
        title: 'UK Van'
    }
]