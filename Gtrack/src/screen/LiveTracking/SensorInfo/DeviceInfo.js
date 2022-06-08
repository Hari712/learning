import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { ColorConstant } from '../../../constants/ColorConstants'
import { translate } from '../../../../App'
import { FontSize } from '../../../component'
import { BackIcon, ListIcon, SensorIcon } from '../../../component/SvgComponent'
import AppManager from '../../../constants/AppManager'
import { getAdvanceSettingsInfo, getAssetItemInfo, getLoginState } from '../../Selector'
import { useSelector, useDispatch } from 'react-redux'
import * as LivetrackingActions from '../Livetracking.Action'
import { convertTemp, convertTime, convertAltitudeRound } from '../../../utils/helper'
import { isEmpty } from 'lodash'

const DeviceInfo = ({ navigation, route }) => {

    const { data } = route.params
    const { loginData, isConnected, assetData, advSettingsData } = useSelector(state => ({
        loginData: getLoginState(state),
        isConnected: state.network.isConnected,
        assetData: getAssetItemInfo(state),
        advSettingsData: getAdvanceSettingsInfo(state)
    }))

    const dispatch = useDispatch()

    useEffect(() => {
        console.log('isFocusedisFocusedisFocusedisFocused',data)
        if(data){
            // if(data.status != 'offline'){
               
              
            // }
            AppManager.showLoader()
            dispatch(LivetrackingActions.requestAllLastKnownPostion(loginData.id, data.positionId, onSuccess, onError))
            dispatch(LivetrackingActions.requestAssetInfo(loginData.id, data.id, onSuccess, onError))
        }
    },[])

    function onSuccess(data) {
        console.log("Sucess",data)
        AppManager.hideLoader()
    }

    function onError(data) {
        console.log("Sucess",data)
        AppManager.hideLoader()
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={{
                    color: ColorConstant.GREY,
                    fontSize: FontSize.FontSize.medium,
                    fontWeight: '500',
                    textAlign: 'center'
                }}>
                    {translate("Asset Information")}
                </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity style={{padding:hp(2)}} onPress={() => navigation.goBack()}>
                    <BackIcon />
                </TouchableOpacity>
            )
        });
    }, [navigation]);
    return (
        <SafeAreaView style={styles.DeviceInfoMainView}>
            <ScrollView>
                <View style={styles.mainView}>
                    <Text style={styles.textViewStyle}>{data.name}</Text>
                </View>
                {!isEmpty(assetData) ?
                <View>
                    {assetData.map((item)=>
                    <View>
                    <View style={styles.cardContainer}>
                        <View style={styles.titleViewStyle}>
                            <Text style={styles.titleTextStyle}>{translate("Information")}</Text>
                            <ListIcon/>
                        </View>

                        <View style={styles.lineStyle} />
                        <View style={styles.infoDataMainView}>
                            <View style={{ flexDirection: 'column', width: '35%' }}>
                                <Text style={styles.mainTextStyle}>{translate("State")}</Text>
                                <Text style={styles.textStyle}>Idle</Text>
                            </View>

                            <View style={{ flexDirection: 'column', width: '40%' }}>
                                <Text style={styles.mainTextStyle}>{translate("Time(Position)")}</Text>
                                <Text style={styles.textStyle}>{convertTime(item.deviceTime, advSettingsData).format("YYYY-MM-DD")}</Text>
                                <Text style={styles.textStyle}>{convertTime(item.deviceTime, advSettingsData).format("HH:mm:SS")}</Text>
                            </View>

                            <View style={{ flexDirection: 'column', width: '25%' }}>
                                <Text style={styles.mainTextStyle}>{translate("Time(Server)")}</Text>
                                <Text style={styles.textStyle}>{convertTime(item.serverTime, advSettingsData).format("YYYY-MM-DD")}</Text>
                                <Text style={styles.textStyle}>{convertTime(item.serverTime, advSettingsData).format("HH:mm:SS")}</Text>
                            </View>
                        </View>

                        <View style={styles.addressMainView}>
                            <Text style={styles.mainTextStyle}>{translate("Address")}</Text>
                            <Text style={styles.textStyle}>{item.address ? item.address :'Not available'}</Text>
                            {/* <Text style={styles.textStyle}>West Yorkshire, HD6 4JX, GB</Text> */}
                        </View>

                        <View style={styles.infoDataMainView}>
                            <View style={{ flexDirection: 'column', width: '35%' }}>
                                <Text style={styles.mainTextStyle}>{translate("Angle")}</Text>
                                <Text style={styles.textStyle}>Not available</Text>
                                {/* <Text style={styles.textStyle}>{item.angle ? item.angle + `\u02DA` :'Not available' }</Text> */}
                            </View>

                            <View style={{ flexDirection: 'column', width: '40%' }}>
                                <Text style={styles.mainTextStyle}>{translate("Engin_State_Hours")}</Text>
                                <Text style={styles.textStyle}>Off</Text>
                            </View>

                            <View style={{ flexDirection: 'column', width: '25%' }}>
                                <Text style={styles.mainTextStyle}>{translate("Altitude")}</Text>
                                <Text style={styles.textStyle}>{item.altitude ? convertAltitudeRound(item.altitude) + ' ft' :'Not available'}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.cardContainer}>
                        <View style={styles.titleViewStyle}>
                            <Text style={styles.titleTextStyle}>{translate("Sensor")}</Text>
                            <SensorIcon resizeMode='contain'/>
                        </View>

                        <View style={styles.lineStyle} />

                        <View style={styles.infoDataMainView}>
                            <View style={{ flexDirection: 'column', width: '35%' }}>
                                <Text style={styles.mainTextStyle}>{translate("Odometer")}</Text>
                                <Text style={styles.textStyle}>{item.attributes.odometer ? item.attributes.odometer + 'mi' : 'Not available' }</Text>
                            </View>

                            <View style={{ flexDirection: 'column', width: '40%' }}>
                                <Text style={styles.mainTextStyle}>{translate("Status")}</Text>
                                <Text style={styles.textStyle}>{item.attributes.status?item.attributes.status:'Not available'}</Text>
                            </View>

                            <View style={{ flexDirection: 'column', width: '25%' }}>
                                <Text style={styles.mainTextStyle}>{translate("Vehicle Power")}</Text>
                                <Text style={styles.textStyle}>{item.attributes.power ? item.attributes.power + 'V' :'Not available'}</Text>
                            </View>
                        </View>

                        <View style={styles.infoDataMainView}>
                            <View style={{ flexDirection: 'column', width: '35%' }}>
                                <Text style={styles.mainTextStyle}>{translate("Battery")}</Text>
                                <Text style={styles.textStyle}>{item.attributes.batteryLevel ? item.attributes.batteryLevel + "%" :'Not available'}</Text>
                            </View>

                            <View style={{ flexDirection: 'column', width: '40%' }}>
                                <Text style={styles.mainTextStyle}>{translate("Ignition")}</Text>
                                <Text style={styles.textStyle}>{item.attributes.ignition ? "On" : "Off"}</Text>
                            </View>

                            <View style={{ flexDirection: 'column', width: '25%' }}>
                                <Text style={styles.mainTextStyle}>{translate("Digital Input")}</Text>
                                <Text style={styles.textStyle}>Off</Text>
                            </View>
                        </View>

                        <View style={styles.sensorMainView}>
                            <View style={{ flexDirection: 'column', width: '35%' }}>
                                <Text style={styles.mainTextStyle}>{translate("Fuel Level")}</Text>
                                <Text style={styles.textStyle}>{item.attributes.fuel ? item.attributes.fuel + '%':'Not available'}</Text>
                            </View>

                            <View style={{ flexDirection: 'column', width: '40%' }}>
                                <Text style={styles.mainTextStyle}>{translate("Temperature")}</Text>
                                <Text style={styles.textStyle}>{convertTemp(item.attributes.coolantTemp, advSettingsData)}</Text>
                            </View>
                        </View>

                    </View>
                    </View> )}
                </View> : <Text style={styles.noDevice}>No Data Found</Text> }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    DeviceInfoMainView: {
        flex: 1,
        backgroundColor: ColorConstant.WHITE,
    },

    mainView: {
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: ColorConstant.ORANGE,
        height: hp(5)
    },

    textViewStyle: {
        color: ColorConstant.WHITE,
        fontWeight: 'bold',
        fontSize: FontSize.FontSize.medium
    },

    cardContainer: {
        //width:'100%',
        width: Dimensions.get('screen').width - 30,
        marginTop: hp(2),
        // height:hp(18),
        elevation: 3,
        alignSelf: 'center',
        backgroundColor: ColorConstant.WHITE,
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: ColorConstant.GREY,
        shadowColor: ColorConstant.GREY,
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 0 },
        paddingBottom: hp(1),
        marginBottom: hp(3)
    },

    titleViewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: hp(2),
        alignItems: 'center',
        marginVertical: hp(1),
    },

    titleTextStyle: {
        color: ColorConstant.BLUE,
        fontSize: FontSize.FontSize.small,
    },

    lineStyle: {
        borderBottomColor: ColorConstant.GREY,
        borderBottomWidth: 0.5,
        marginHorizontal: hp(2)
    },

    infoDataMainView: {
        flexDirection: 'row',
        marginTop: hp(1.5),
        paddingHorizontal: hp(2.5),
        paddingBottom: hp(1.5)
    },

    sensorMainView: {
        flexDirection: 'row',
        marginHorizontal: hp(2),
        paddingBottom: hp(1.5),
    },

    addressMainView: {
        marginHorizontal: hp(2),
        paddingBottom: hp(1.5),
    },

    mainTextStyle: {
        color: ColorConstant.GREY,
        fontSize: hp(1.4),
        marginTop: hp(1.5),
    },
    textStyle: {
        color: ColorConstant.BLACK,
        fontSize: hp(1.4),
        marginTop: hp(1),
    },
    noDevice: {
        alignSelf:'center',paddingVertical:hp(40),fontFamily:'Nunito-Regular'
    }
});

export default DeviceInfo;