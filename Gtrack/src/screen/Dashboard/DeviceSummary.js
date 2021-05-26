import React, { Component, useEffect, useState } from 'react'
import { View, Image, StyleSheet, Text,TouchableOpacity, Platform } from 'react-native'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import ShadowView from 'react-native-simple-shadow-view'
import { translate } from '../../../App'
import { FontSize} from '../../component'
import IconConstant from '../../constants/iconConstant'
import { SCREEN_CONSTANTS } from '../../constants/AppConstants'
import { DeviceSetupIcon, FullScreenIcon } from '../../component/SvgComponent'
import NavigationService from '../../navigation/NavigationService'
import { SubscriptionStatus, SubscriptionStatusColor } from '../../utils/helper'

const DeviceSummary = (props) => {
    return (
        <ShadowView style={styles.deviceSummaryContainer}>

            <View style={styles.deviceSummaryMainViewStyle}>

            <View style={styles.leftMainViewStyle}>
                <Text style={styles.summary}>{translate("Device Summary")}</Text>
            </View>

            <View style={styles.rightMainViewStyle}>
                <Text style={styles.devicesTextStyle}>{translate("Dashboard_string2")} {props.deviceList.deviceCount}</Text>

                <TouchableOpacity onPress={() => { NavigationService.navigate('Device & Asset') }} >
                    <FullScreenIcon style={styles.ViewallStyle} resizeMode='contain'/>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> NavigationService.navigate(SCREEN_CONSTANTS.ACTIVATE_DEVICE)} >
                    <DeviceSetupIcon style={styles.refreshImageStyle} resizeMode='contain'/>
                </TouchableOpacity>
            </View>

            </View>
            {Object.values(props.deviceList.deviceList).map((item, key) =>

            <ShadowView style={styles.summaryContainer} key={key}>
                <View style={styles.subContainer}>

                <View style={{ flexDirection: 'row', flex: 0.8, alignItems: 'center' }}>
                    <View style={{ flex: 0.25 }}>
                        <View style={styles.deviceSummaryDetailView}>
                            {/* <Image source={item.assetDTO && item.assetDTO.assetType ? iconConstant(item.assetDTO.assetType) : iconConstant('') } style={styles.image} resizeMode='contain' /> */}
                            {item.assetDTO && item.assetDTO.assetType ? <IconConstant color={ColorConstant.BLUE} type={item.assetDTO.assetType} /> : <IconConstant color={ColorConstant.BLUE} type={'default'} /> }
                        </View>
                    </View>
                    <View style={styles.titleText}>
                        <Text style={styles.title}>{item.deviceDTO.deviceName}</Text>
                        <Text style={styles.subtitle }>{item.groupDTO && item.groupDTO.groupName ? item.groupDTO.groupName : "Default"}</Text>
                    </View>

                </View>

                <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'flex-end', }}>
                    <View style={[styles.stateViewStyle, { backgroundColor: SubscriptionStatusColor(item.devicePlan && item.devicePlan.status).bg }]}>
                        <Text style={[styles.stateTextStyle, { color: SubscriptionStatusColor(item.devicePlan && item.devicePlan.status).color }]}>
                            {SubscriptionStatus(item.devicePlan && item.devicePlan.status)}
                        </Text> 
                    </View>
                </View>

                </View>
            </ShadowView>

            )}

            </ShadowView>
        )
}

const styles = StyleSheet.create({
    leftMainViewStyle: {
        paddingLeft: wp(5),
        paddingRight: wp(3),
        // paddingBottom: hp(1)
    },
    summary: {
        fontSize: hp(1.4), 
        fontWeight: 'bold', 
        color: ColorConstant.BLACK
    },
    rightMainViewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: wp(6),
        paddingLeft: wp(3),
        // paddingBottom: hp(0)
    },
    devicesTextStyle: {
        marginRight: wp(5),
        color: ColorConstant.BLUE,
        fontSize: FontSize.FontSize.small,
        fontWeight: '500'
    },
    ViewallStyle: {
        height: hp(2),
        width: hp(2),
        marginRight: wp(3)
    },
    refreshImageStyle: {
        height: hp(2),
        width: hp(2)
    },
    activeUserView: {
        width: hp(16),
        height: hp(16),
        backgroundColor: '#E6EAF3',
        borderRadius: hp(8),
        justifyContent: 'center',
        alignItems: 'center',
    },
    deviceSummaryContainer: {
        backgroundColor: ColorConstant.WHITE,
        width: '93%',
        marginVertical: hp(2),
        // height: hp(40),
        flex:1,
        borderRadius: hp(5.5 / 2),
        borderWidth: 0.5,
        borderColor: ColorConstant.WHITE,
        shadowColor: ColorConstant.BLACK,
        shadowOpacity: 0.3,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 0 },
        alignSelf: 'center',
        marginTop: hp(2),
        paddingBottom: hp(1)
    },
    deviceSummaryMainViewStyle: Platform.OS=="ios" ? {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: hp(2.5),
        zIndex: 5
    }:{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: hp(2.5),
    },
    summaryContainer: {
        marginVertical: hp(1.5),
        paddingVertical: '3%',
        backgroundColor: ColorConstant.WHITE,
        borderRadius: hp(5.5/2),
        borderWidth:  Platform.OS=="ios" ? 0.5 : 0,
        borderColor: ColorConstant.GREY,
        shadowColor: ColorConstant.BLACK,
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.3,
        elevation: 10,
        paddingHorizontal: '3%',
        marginHorizontal: '4%'
    },
    subContainer: {
        flexDirection: 'row', 
        flex: 1
    },
    deviceSummaryDetailView: {
        width: hp(6),
        height: hp(6),
        backgroundColor: ColorConstant.LIGHTBLUE,
        borderRadius: hp(8),
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        paddingHorizontal: '3%', 
        marginTop: hp(1), 
        flex: 0.74
    },
    title: {
        color: ColorConstant.BLACK, 
        fontSize: hp(1.4), 
        fontWeight: '500'
    },
    subtitle: {
        color: ColorConstant.GREY, 
        fontSize: hp(1.4), 
        marginTop: hp(1)
    },
    image: {
        height: hp(3.5), 
        width: hp(3.5)
    },
    stateViewStyle: {
        width: '90%',
        height: hp(2.5),
        backgroundColor: ColorConstant.GREY,
        borderRadius: hp(2.5 / 2),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '3%'
    },
    stateTextStyle: {
        fontSize: hp(1.0),
        fontWeight: '500'
    }

})

export default DeviceSummary;

