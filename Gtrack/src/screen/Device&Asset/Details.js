import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions, ActivityIndicator, ScrollView } from 'react-native';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FontSize } from '../../component';
import { useDispatch, useSelector } from 'react-redux'
import * as DeviceActions from '../DeviceSetup/Device.Action'
import AppManager from '../../constants/AppManager'
import { getLoginInfo } from '../Selector'
import NavigationService from '../../navigation/NavigationService'
import isEmpty from 'lodash/isEmpty'

const Details = ({ route, navigation }) => {

    const { deviceId, title } = route.params

    const [deviceData, setDeviceData] = useState(null)

    const [isLoading, setIsLoading] = useState(true)

    const dispatch = useDispatch()

    const { loginInfo, isConnected } = useSelector((state) => ({
        loginInfo: getLoginInfo(state),
        isConnected: state.network.isConnected
    }))

    const user_id = loginInfo.id ? loginInfo.id : null

    useEffect(() => {
        loadDeviceDetail()
    }, [])

    function loadDeviceDetail() {
        AppManager.showLoader()
        dispatch(DeviceActions.requestGetDeviceDetailByIdAndUserId(user_id, deviceId, onDeviceDetailLoadedSuccess, onDeviceDetailLoadedError))
    }

    function onDeviceDetailLoadedSuccess(data) {
        setDeviceData(data)
        setIsLoading(false)
        AppManager.hideLoader()
    }

    function onDeviceDetailLoadedError(error) {
        AppManager.hideLoader()
        AppManager.showSimpleMessage('danger', { message: error, description: '' })
        setIsLoading(false)
    }

    function exportDeviceDetail() {
        AppManager.showLoader()
        let requestBody = {
            "paginationDTO" : {
              "pageNumber" : 0,
              "pageSize" : 5,
              "useMaxSearchAsLimit" : false,
              "searchColumnsList" : [{
              "columnName" : "searchParam",
              "searchStr": `${deviceId}`
          }],
              "sortHeader" : "id",
              "sortDirection" : "DESC"
            },
            "type" : null,
            "sendMail" : false
          }
        dispatch(DeviceActions.requestExportDeviceByDeviceID(user_id, requestBody, onDeviceDetailExportedSuccessfully, onDeviceDetailExportedFailure))
    }

    function onDeviceDetailExportedSuccessfully(data) {
        AppManager.hideLoader()
        AppManager.showSimpleMessage('success', { message: 'Device detail exported successfully. Please check your mail', description: '' })
    }

    function onDeviceDetailExportedFailure(error) {
        AppManager.hideLoader()
        AppManager.showSimpleMessage('danger', { message: error, description: '' })
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={{
                    color: ColorConstant.GREY,
                    fontSize: 14,
                    fontFamily: 'Nunito-SemiBold',
                    textAlign: 'center'
                }}>
                    Details of {title}
                </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={() => NavigationService.goBack()}>
                    <Image style={{ marginLeft: hp(2) }} source={images.image.back} />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    function renderDevicePlan(devicePlan) {
        const planType = devicePlan.planType ? devicePlan.planType : 'None'
        const activationDate = devicePlan.activationDate ? devicePlan.activationDate : ''
        const deActivationDate = devicePlan.deActivationDate ? devicePlan.deActivationDate : ''

        return (
            <View style={styles.cardContainer}>
                <View style={styles.headerDetail}>
                    <Text style={styles.headerText}>Plan Details</Text>
                    <Image source={images.image.list} />
                </View>
                <View style={styles.horizontalLine} />

                <View style={styles.details}>
                    <View style={[styles.detailsSubView, { flex: 1.5 }]} >
                        <Text style={styles.textStyle}>Plan</Text>
                        <Text style={[styles.textStyle, { color: ColorConstant.BLACK, marginTop: hp(1) }]}>{planType}</Text>
                    </View>
                    <View style={[styles.detailsSubView, { flex: 0.9 }]} >
                        <Text style={styles.textStyle}>Price</Text>
                        <Text style={[styles.textStyle, { color: ColorConstant.BLACK, marginTop: hp(1) }]}>$60</Text>
                    </View>
                    <View style={[styles.detailsSubView, { flex: 1.2 }]}>
                        <Text style={styles.textStyle}>Start Date</Text>
                        <Text style={[styles.textStyle, { color: ColorConstant.BLACK, marginTop: hp(1) }]}>{activationDate}</Text>
                    </View>
                    <View style={[styles.detailsSubView, { flex: 1 }]}>
                        <Text style={styles.textStyle}>End Date</Text>
                        <Text style={[styles.textStyle, { color: ColorConstant.BLACK, marginTop: hp(1) }]}>{deActivationDate}</Text>
                    </View>
                </View>
                <View style={styles.features}>
                    <Text style={[styles.textStyle, { marginTop: hp(1) }]}>Features</Text>
                    <Text style={[styles.textStyle, { marginTop: hp(1) }]}>{'\u2B24'} <Text style={{ color: ColorConstant.BLACK }}>    6 month Data Retention</Text></Text>
                    <Text style={[styles.textStyle, { marginTop: hp(1) }]}>{'\u2B24'} <Text style={{ color: ColorConstant.BLACK }}>    Phone,Text,Chat and Email Support</Text></Text>
                    <Text style={[styles.textStyle, { marginTop: hp(1) }]}>{'\u2B24'} <Text style={{ color: ColorConstant.BLACK }}>    Optional Protection Plan(2.99/mo)</Text></Text>
                    <Text style={[styles.textStyle, { marginTop: hp(1) }]}>{'\u2B24'} <Text style={{ color: ColorConstant.BLACK }}>    5% off future BHS Hardware purchase</Text></Text>
                </View>
            </View>
        )
    }

    function renderAssetDetail(assetDTO) {
        const assetName = assetDTO.assetName ? assetDTO.assetName : ''
        const description = assetDTO.description ? assetDTO.description : ''
        const assetType = assetDTO.assetType ? assetDTO.assetType : ''
        return (
            <View style={styles.cardContainer}>
                <View style={styles.headerDetail}>
                    <Text style={styles.headerText}>Asset Details</Text>
                    <Image source={images.image.pickupcar} />
                </View>
                <View style={styles.horizontalLine} />

                <View style={styles.details}>
                    <View style={[styles.detailsSubView, { flex: 1 }]} >
                        <Text style={styles.textStyle}>Type</Text>
                        <Text style={[styles.textStyle, { color: ColorConstant.BLACK, marginTop: hp(1) }]}>{assetType}</Text>
                    </View>
                    <View style={[styles.detailsSubView, { flex: 2 }]} >
                        <Text style={styles.textStyle}>Description</Text>
                        <Text style={[styles.textStyle, { color: ColorConstant.BLACK, marginTop: hp(1) }]}>{description}</Text>
                    </View>
                </View>
            </View>
        )
    }

    function renderUserDetail() {
        return (
            <View style={styles.cardContainer}>
                <View style={styles.headerDetail}>
                    <Text style={styles.headerText}>User Details</Text>
                    <Image source={images.image.user} />
                </View>
                <View style={styles.horizontalLine} />
                {Data.map((item, key) =>
                    <View key={key} style={styles.userDetails}>
                        <View style={[styles.detailsSubView, { flex: 1 }]} >
                            <Text style={styles.textStyle}>Name</Text>
                            <Text style={[styles.textStyle, { color: ColorConstant.BLACK, marginTop: hp(1) }]}>{item.name}</Text>
                        </View>
                        <View style={[styles.detailsSubView, { flex: 2 }]} >
                            <Text style={styles.textStyle}>Role</Text>
                            <Text style={[styles.textStyle, { color: ColorConstant.BLACK, marginTop: hp(1) }]}>{item.role}</Text>
                        </View>
                    </View>
                )}
            </View>
        )
    }

    function renderDeviceDetail() {
        const assetDTO = deviceData && deviceData.assetDTO ? deviceData.assetDTO : null
        const deviceDTO = deviceData && deviceData.deviceDTO ? deviceData.deviceDTO : null
        const devicePlan = deviceData && deviceData.devicePlan ? deviceData.devicePlan : null
        const groupDTO = deviceData && deviceData.groupDTO ? deviceData.groupDTO : null
        const users = groupDTO && groupDTO.users ? groupDTO.users : []
        const groupname = groupDTO ? groupDTO.groupName : 'None'
        return (
            <>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.container}>
                        <View style={styles.cardContainer}>
                            <View style={styles.headerDetail}>
                                <Text style={styles.headerText}>Device Details</Text>
                                <Image source={images.image.usb} />
                            </View>
                            <View style={styles.horizontalLine} />

                            <View style={styles.details}>
                                <View style={styles.detailsSubView} >
                                    <Text style={styles.textStyle}>ID</Text>
                                    <Text style={[styles.textStyle, { color: ColorConstant.BLACK, marginTop: hp(1) }]}>{deviceId}</Text>
                                </View>
                                <View style={[styles.detailsSubView, { flex: 2.5 }]} >
                                    <Text style={styles.textStyle}>Name</Text>
                                    <Text style={[styles.textStyle, { color: ColorConstant.BLACK, marginTop: hp(1) }]}>{title}</Text>
                                </View>
                                <View style={[styles.detailsSubView, { flex: 1 }]}>
                                    <Text style={styles.textStyle}>Group</Text>
                                    <Text style={[styles.textStyle, { color: ColorConstant.BLACK, marginTop: hp(1) }]}>{groupname}</Text>
                                </View>
                            </View>
                        </View>


                        {devicePlan ? renderDevicePlan() : null}
                        {assetDTO ? renderAssetDetail(assetDTO) : null}
                        {!isEmpty(users) ? renderUserDetail() : null}


                        <TouchableOpacity style={styles.export} onPress={() => exportDeviceDetail()}>
                            <Image source={images.image.export} />
                            <Text style={{ color: ColorConstant.WHITE }}>Export Details</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </>
        )
    }

    return (
        <>
            {isLoading ? null : renderDeviceDetail()}
        </>
    )
}

const Data = [
    {
        name: 'Tom Smith',
        role: 'Owner'
    },
    {
        name: 'David Smith',
        role: 'Regular'
    }
]

const styles = StyleSheet.create({

    container: {
        width: '100%',
        //height:Dimensions.get('screen').height,
        backgroundColor: ColorConstant.WHITE
    },
    cardContainer: {
        //width:'100%',
        width: Dimensions.get('screen').width - 30,
        marginTop: hp(4),
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
    },
    headerDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: hp(2),
        alignItems: 'center',
        marginVertical: hp(1)
    },
    headerText: {
        color: ColorConstant.BLUE,
        fontSize: FontSize.FontSize.small,
        //fontWeight:'600'
        //fontSize:12,
        fontFamily: 'Nunito-Regular'
    },
    details: {
        flexDirection: 'row',
        marginTop: hp(1.5),
        marginHorizontal: hp(2),
        paddingBottom: hp(1)
    },
    detailsSubView: {
        flexDirection: 'column',
        flex: 3
    },
    horizontalLine: {
        borderBottomColor: ColorConstant.GREY,
        borderBottomWidth: 0.5,
        marginHorizontal: hp(2)
    },
    textStyle: {
        color: ColorConstant.GREY,
        //fontSize:FontSize.FontSize.small,
        fontSize: 10,
        fontFamily: 'Nunito-Regular'
    },
    features: {
        marginHorizontal: hp(2),
        paddingBottom: hp(2),
        //marginTop:hp(0.5)
    },
    userDetails: {
        flexDirection: 'row',
        //marginTop:hp(1),
        marginHorizontal: hp(2),
        marginVertical: hp(1.5)
    },
    export: {
        borderRadius: 6,
        flexDirection: 'row',
        width: '45%',
        bottom: hp(5),
        // marginTop:hp(8),
        marginVertical: hp(7),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: ColorConstant.BLUE,
        height: hp(6)
    },
    activityIndicator: {
        color: "#000",
        marginTop: '2%'
    }

});

export default Details;