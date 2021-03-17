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
import { translate } from '../../../App';
import { DeviceAssetListIcon, PickupCarIcon, DeviceAssetUserIcon, UsbIcon, ExportIcon, BackIcon } from '../../component/SvgComponent';

const Details = ({ route, navigation }) => {

    const { deviceId, title, devicePrimaryId } = route.params

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
        dispatch(DeviceActions.requestGetDeviceDetailByIdAndUserId(user_id, devicePrimaryId, onDeviceDetailLoadedSuccess, onDeviceDetailLoadedError))
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
        if (isConnected) {
            AppManager.showLoader()
            let requestBody = {
                "paginationDTO": {
                    "pageNumber": 0,
                    "pageSize": 5,
                    "useMaxSearchAsLimit": false,
                    "searchColumnsList": [{
                        "columnName": "searchParam",
                        "searchStr": `${deviceId}`
                    }],
                    "sortHeader": "id",
                    "sortDirection": "DESC"
                },
                "type": null,
                "sendMail": false
            }
            dispatch(DeviceActions.requestExportDeviceByDeviceID(user_id, requestBody, onDeviceDetailExportedSuccessfully, onDeviceDetailExportedFailure))
        } else {
            AppManager.showNoInternetConnectivityError()
        }
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
                <TouchableOpacity style={{padding:hp(2)}} onPress={() => navigation.goBack()}>
                    <BackIcon />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    function renderDevicePlanDetail(devicePlan) {
        const devicePlanName = devicePlan && devicePlan.subscriptionPlanCurrency && devicePlan.subscriptionPlanCurrency.subscriptionPlan && devicePlan.subscriptionPlanCurrency.subscriptionPlan.planName ? devicePlan.subscriptionPlanCurrency.subscriptionPlan.planName : 'None'
        const activationDate = devicePlan && devicePlan.activationDate ? devicePlan.activationDate : ''
        const deActivationDate = devicePlan && devicePlan.deActivationDate ? devicePlan.deActivationDate : ''
        const planDuration = devicePlan && devicePlan.planDuration ? devicePlan.planDuration : null
        const planPrice = devicePlan && planDuration === 'MONTHLY' ? devicePlan.monthlyFee : devicePlan.yearlyFee
        // const tax = devicePlan && devicePlan.tax ? devicePlan.tax : 0
        // const actualTax = (planPrice * tax) / 100
        // const payableAmount = planPrice + actualTax
        return (
            <>
                <View style={styles.details}>
                    <View style={[styles.detailsSubView, { flex: 1.5 }]} >
                        <Text style={styles.textStyle}>{translate("Plan")}</Text>
                        <Text style={[styles.textStyle, { color: ColorConstant.BLACK, marginTop: hp(1) }]}>{devicePlanName}</Text>
                    </View>
                    <View style={[styles.detailsSubView, { flex: 0.9 }]} >
                        <Text style={styles.textStyle}>{translate("Price")}</Text>
                        <Text style={[styles.textStyle, { color: ColorConstant.BLACK, marginTop: hp(1) }]}>$ {planPrice}</Text>
                    </View>
                    <View style={[styles.detailsSubView, { flex: 1.2 }]}>
                        <Text style={styles.textStyle}>{translate("Start Date")}</Text>
                        <Text style={[styles.textStyle, { color: ColorConstant.BLACK, marginTop: hp(1) }]}>{activationDate}</Text>
                    </View>
                    <View style={[styles.detailsSubView, { flex: 1 }]}>
                        <Text style={styles.textStyle}>{translate("End Date")}</Text>
                        <Text style={[styles.textStyle, { color: ColorConstant.BLACK, marginTop: hp(1) }]}>{deActivationDate}</Text>
                    </View>
                </View>
                <View style={styles.features}>
                    <Text style={[styles.textStyle, { marginTop: hp(1) }]}>{translate("Features")}</Text>
                    <Text style={[styles.textStyle, { marginTop: hp(1) }]}>{'\u2B24'} <Text style={{ color: ColorConstant.BLACK }}>    6 month Data Retention</Text></Text>
                    <Text style={[styles.textStyle, { marginTop: hp(1) }]}>{'\u2B24'} <Text style={{ color: ColorConstant.BLACK }}>    Phone,Text,Chat and Email Support</Text></Text>
                    <Text style={[styles.textStyle, { marginTop: hp(1) }]}>{'\u2B24'} <Text style={{ color: ColorConstant.BLACK }}>    Optional Protection Plan(2.99/mo)</Text></Text>
                    <Text style={[styles.textStyle, { marginTop: hp(1) }]}>{'\u2B24'} <Text style={{ color: ColorConstant.BLACK }}>    5% off future BHS Hardware purchase</Text></Text>
                </View>
            </>
        )
    }

    function renderNoDetailsAvailable() {
        return (
            <View style={{ width: '100%', marginVertical: hp(2), justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: ColorConstant.BLACK, fontSize: FontSize.FontSize.extraSmall }}>No Details Available</Text>
            </View>
        )
    }

    function renderDevicePlan(devicePlan) {


        return (
            <View style={styles.cardContainer}>
                <View style={styles.headerDetail}>
                    <Text style={styles.headerText}>{translate("Plan Details")}</Text>
                    <DeviceAssetListIcon width={11.624} height={15.166}/>
                </View>
                <View style={styles.horizontalLine} />
                {devicePlan ? renderDevicePlanDetail(devicePlan) : renderNoDetailsAvailable()}

            </View>
        )
    }

    function renderAssetDetail(assetDTO) {
        const assetName = assetDTO.assetName ? assetDTO.assetName : ''
        const description = assetDTO.description ? assetDTO.description : 'none'
        const assetType = assetDTO.assetType ? assetDTO.assetType : ''
        return (
            <>
                <View style={styles.details}>
                    <View style={[styles.detailsSubView, { flex: 1 }]} >
                        <Text style={styles.textStyle}>{translate("Type")}</Text>
                        <Text style={[styles.textStyle, { color: ColorConstant.BLACK, marginTop: hp(1) }]}>{assetType}</Text>
                    </View>
                    <View style={[styles.detailsSubView, { flex: 2 }]} >
                        <Text style={styles.textStyle}>{translate("Description")}</Text>
                        <Text style={[styles.textStyle, { color: ColorConstant.BLACK, marginTop: hp(1) }]}>{description}</Text>
                    </View>
                </View>
            </>
        )
    }

    function renderAsetInfo(assetDTO) {
        return (
            <View style={styles.cardContainer}>
                <View style={styles.headerDetail}>
                    <Text style={styles.headerText}>Asset Details</Text>
                    <PickupCarIcon width={16.501} height={14.563}/>
                </View>
                <View style={styles.horizontalLine} />
                {assetDTO ? renderAssetDetail(assetDTO) : renderNoDetailsAvailable()}
            </View>
        )
    }

    function renderUserDetail() {
        return (
            <>
                {Data.map((item, key) =>
                    <View key={key} style={styles.userDetails}>
                        <View style={[styles.detailsSubView, { flex: 1 }]} >
                            <Text style={styles.textStyle}>{translate("Name")}</Text>
                            <Text style={[styles.textStyle, { color: ColorConstant.BLACK, marginTop: hp(1) }]}>{item.name}</Text>
                        </View>
                        <View style={[styles.detailsSubView, { flex: 2 }]} >
                            <Text style={styles.textStyle}>{translate("Role")}</Text>
                            <Text style={[styles.textStyle, { color: ColorConstant.BLACK, marginTop: hp(1) }]}>{item.role}</Text>
                        </View>
                    </View>
                )}
            </>
        )
    }

    function renderUserInfo(users) {
        return (
            <View style={styles.cardContainer}>
                <View style={styles.headerDetail}>
                    <Text style={styles.headerText}>{translate("User Details")}</Text>
                    <DeviceAssetUserIcon  width={13.316} height={15.563}/>
                </View>
                <View style={styles.horizontalLine} />
                {isEmpty(users) ? renderNoDetailsAvailable() : renderUserDetail()}
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
                                <Text style={styles.headerText}>{translate("Device Details")}</Text>
                                <UsbIcon width={13.892} height={15.213}/>
                            </View>
                            <View style={styles.horizontalLine} />

                            <View style={styles.details}>
                                <View style={styles.detailsSubView} >
                                    <Text style={styles.textStyle}>{translate("ID")}</Text>
                                    <Text style={[styles.textStyle, { color: ColorConstant.BLACK, marginTop: hp(1) }]}>{deviceId}</Text>
                                </View>
                                <View style={[styles.detailsSubView, { flex: 2.5 }]} >
                                    <Text style={styles.textStyle}>{translate("Name")}</Text>
                                    <Text style={[styles.textStyle, { color: ColorConstant.BLACK, marginTop: hp(1) }]}>{title}</Text>
                                </View>
                                <View style={[styles.detailsSubView, { flex: 1 }]}>
                                    <Text style={styles.textStyle}>{translate("Group")}</Text>
                                    <Text style={[styles.textStyle, { color: ColorConstant.BLACK, marginTop: hp(1) }]}>{groupname}</Text>
                                </View>
                            </View>
                        </View>


                        {renderDevicePlan(devicePlan)}
                        {renderAsetInfo(assetDTO)}
                        {renderUserInfo()}


                        <TouchableOpacity style={styles.export} onPress={() => exportDeviceDetail()}>
                            <ExportIcon/>
                            <Text style={{ color: ColorConstant.WHITE }}>{translate("Export Details")}</Text>
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
        width: '35%',
        bottom: hp(5),
        // marginTop:hp(8),
        marginVertical: hp(7),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: ColorConstant.BLUE,
        height: hp(5)
    },
    activityIndicator: {
        color: "#000",
        marginTop: '2%'
    }

});

export default Details;