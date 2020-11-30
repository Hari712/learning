import React, { useState, useEffect, useLayoutEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { DropDown, AddNewAssetDialog } from '../../component'
import NavigationService from '../../navigation/NavigationService'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import images from '../../constants/images'
import { useSelector, useDispatch } from 'react-redux'
import { getAssetListInfo, makeGetDeviceDetail, getLoginInfo } from '../Selector'
import { ColorConstant } from '../../constants/ColorConstants'
import FontSize from '../../component/FontSize'
import ShadowView from 'react-native-simple-shadow-view'
import isEmpty from 'lodash/isEmpty'
import AppManager from '../../constants/AppManager'
import * as DeviceActions from '../DeviceSetup/Device.Action'

const AssignAsset = ({ navigation, route }) => {

    const deviceInfo = route.params.device ? route.params.device : null

    const dispatch = useDispatch()

    const getDeviceDetail = makeGetDeviceDetail()

    const { loginInfo, device, assetList, isConnected } = useSelector(state => ({
        loginInfo: getLoginInfo(state),
        assetList: getAssetListInfo(state),
        device: getDeviceDetail(state, deviceInfo.id),
        isConnected: state.network.isConnected
    }))

    const user_id = loginInfo.id ? loginInfo.id : null
    const assetNameList = isEmpty(assetList) ? [] : assetList.map((item) => item.assetName)
    const [asset, setAsset] = useState('')
    const [isAssetDialogVisible, setIsAssetDialogVisible] = useState(false)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={styles.headerTitle}>
                    Device Setup
                </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={() => NavigationService.goBack()}>
                    <Image style={styles.headerLeftStyle} source={images.image.back} />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    function navigateToAssignGroup() {
        NavigationService.push('AssignGroup')
    }

    function onTapNotNow() {
        NavigationService.push('AssignGroup')
    }

    function onSubmit(item) {
        setIsAssetDialogVisible(false)
        AppManager.showLoader()
        let obj = {...item, ...{ deviceId: device.deviceId  }}
        let requestBody = {
            assetDTO : obj
        }
        AppManager.showLoader()
        dispatch(DeviceActions.requestAddAsset(user_id, requestBody, onAssignAssetSuccess, onAssignAssetError))
    }

    function onAssignAssetSuccess(data) {
        AppManager.hideLoader()
        NavigationService.push('AssignAsset', { device: deviceDTO })
    }

    function onAssignAssetError(error) {
        AppManager.hideLoader()
    }

    function renderAddNewAssetDialog() {
        return (
            <AddNewAssetDialog
                isVisible={isAssetDialogVisible}
                deviceId={device.deviceId}
                onSubmit={(item) => onSubmit(item)}
                onTapClose={() => setIsAssetDialogVisible(false)}
                onSwipeComplete={() => setIsAssetDialogVisible(false)}
            />
        )
    }

    function onTapAddNewAsset() {
        setIsAssetDialogVisible(true)
    }

    return (
        <>
            <View style={styles.container}>
                <View style={{ alignItems: 'center', paddingTop: hp(1), paddingHorizontal: hp(3), }}>
                    <Image style={{ width: hp(16), height: hp(16) }} source={images.image.deviceSetup.step2} resizeMode="contain" />
                    <Text style={styles.title}>Assign Asset</Text>
                    <View style={styles.deviceInfoContainer}>
                        <Text style={styles.deviceInfo}>Device ID</Text>
                        <Text style={[styles.deviceInfo, { marginTop: hp(0.5), color: ColorConstant.BLUE }]}>{device.deviceId}</Text>
                        <Text style={[styles.deviceInfo, { marginTop: hp(1.0), color: ColorConstant.BLACK }]}>Device Name</Text>
                        <Text style={[styles.deviceInfo, { marginTop: hp(0.5), color: ColorConstant.BLUE }]}>{device.deviceName}</Text>
                    </View>
                </View>
                <View style={{ paddingHorizontal: hp(3), paddingTop: hp(2) }}>
                    <DropDown
                        defaultValue={asset}
                        label='Select Existing Asset'
                        valueSet={setAsset}
                        dataList={assetNameList}
                        contentInset={{ label: hp(-0.2) }}
                        inputContainerStyle={styles.inputContainer}
                        accessoryStyle={{ top: hp(0.9) }}
                        outerStyle={{ marginBottom: hp(0) }}
                    />
                    <ShadowView style={styles.shadowContainer}>
                        <TouchableOpacity style={styles.activateButton} onPress={() => onTapAddNewAsset()}>
                            <Text style={styles.activateButtonTitle}>Add New Asset</Text>
                        </TouchableOpacity>
                    </ShadowView>
                </View>
                <View style={styles.buttonMainContainer}>
                    <ShadowView style={[styles.shadowContainer, { width: '40%' }]}>
                        <TouchableOpacity style={[styles.cancelButton]} onPress={() => onTapNotNow()}>
                            <Text style={styles.buttonTextColor}>Not Now</Text>
                        </TouchableOpacity>
                    </ShadowView>
                    <ShadowView style={[styles.shadowContainer, { width: '40%' }]}>
                        <TouchableOpacity style={styles.nextButton} onPress={() => navigateToAssignGroup()}>
                            <Text style={styles.nextButtonText}>Next</Text>
                        </TouchableOpacity>
                    </ShadowView>
                </View>
            </View>
            {renderAddNewAssetDialog()}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorConstant.WHITE
    },
    headerTitle: {
        color: ColorConstant.GREY,
        fontSize: FontSize.FontSize.medium,
        fontWeight: '500',
        textAlign: 'center'
    },
    headerLeftStyle: {
        marginLeft: hp(2)
    },
    title: {
        marginTop: hp(1),
        color: ColorConstant.BLUE,
        fontSize: FontSize.FontSize.small,
        fontWeight: '600'
    },
    textNameStyle: {
        color: ColorConstant.BLACK,
        fontSize: FontSize.FontSize.small,
        fontWeight: '500'
    },
    shadowContainer: {
        width: '100%',
        shadowColor: ColorConstant.GREY,
        marginTop: hp(1),
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 3,
        shadowOpacity: 0.3
    },
    inputContainer: {
        height: hp(5),
        borderRadius: hp(5),
    },
    activateButton: {
        width: '100%',
        backgroundColor: ColorConstant.ORANGE,
        width: '100%',
        height: hp(5),
        borderRadius: hp(1),
        marginTop: hp(1),
        justifyContent: 'center',
        alignItems: "center"
    },
    activateButtonTitle: { color: ColorConstant.WHITE, fontWeight: '600', fontSize: FontSize.FontSize.small },
    buttonMainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp(75),
        marginTop: hp(3),
        alignSelf: 'center'
    },
    cancelButton: {
        borderRadius: hp(1),
        height: hp(5),
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: ColorConstant.BLUE,
    },
    buttonTextColor: {
        textAlign: 'center',
        color: ColorConstant.BLUE
    },
    nextButton: {
        borderRadius: hp(1),
        height: hp(5),
        justifyContent: 'center',
        backgroundColor: ColorConstant.BLUE,
    },
    nextButtonText: {
        textAlign: 'center',
        color: ColorConstant.WHITE,
        fontWeight: 'bold'
    },
    deviceInfoContainer: { backgroundColor: ColorConstant.PINK, borderRadius: hp(1), alignItems: 'center', justifyContent: 'center', marginTop: hp(2), width: '100%', paddingVertical: hp(1) },
    deviceInfo: { color: ColorConstant.BLACK, fontSize: hp(1.2), fontWeight: '400' },
})

export default AssignAsset