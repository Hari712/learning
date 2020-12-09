import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions, ScrollView, TextInput } from 'react-native';
import { ColorConstant } from '../../constants/ColorConstants'
import { AppConstants } from '../../constants/AppConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FontSize, TextField, DropDown, MultiSelect } from '../../component';
import { useSelector, useDispatch } from 'react-redux'
import * as DeviceActions from '../DeviceSetup/Device.Action'
import NavigationService from '../../navigation/NavigationService'
import { getLoginInfo, getAssetTypeListInfo, getDeviceListInfo } from '../Selector'
import isEmpty from 'lodash/isEmpty'
import AppManager from '../../constants/AppManager';


function CreateAsset() {

    const dispatch = useDispatch()

    const [type, setType] = useState();
    const [device, setDevice] = useState();
    const [description, setDescrption] = useState('');
    const [assetName, setAssetName] = useState()
    const [arrDeviceNames, setDeviceNames] = useState([])

    const [arrConsolidatedDeviceList, setConsolidatedDeviceList] = useState([])

    const { assetTypeList, isConnected, loginInfo } = useSelector(state => ({
        assetTypeList: getAssetTypeListInfo(state),
        isConnected: state.network.isConnected,
        loginInfo: getLoginInfo(state)
    }))

    const user_id = loginInfo.id ? loginInfo.id : null
    const arrAssetTypeList = isEmpty(assetTypeList) ? [] : assetTypeList.map((item) => item.assetType)

    useEffect(() => {
        loadConsolidatedDevices()
    }, [])

    function goBack() {
        NavigationService.goBack()
    }

    function loadConsolidatedDevices() {
        dispatch(DeviceActions.requestGetConsolidatedDevice(user_id, onLoadConsolidatedDevices, onLoadConsolidatedDevicesError))
    }

    function onLoadConsolidatedDevices(data) {
        let arrDevices= isEmpty(data) ? [] : data
        setConsolidatedDeviceList(arrDevices)
        let arrDeviceNames = arrDevices.map((item) => item.deviceName)
        setDeviceNames(arrDeviceNames)
    }

    function onLoadConsolidatedDevicesError(error) {
        console.log(error)
    }

    function onTapSave() {
        let message = ''
        if (isEmpty(assetName)) {
            message = AppConstants.EMPTY_ASSET_TYPE
        }
        else if (isEmpty(type)) {
            message = AppConstants.EMPTY_ASSET_TYPE
        }
        else if (isEmpty(device)) {
            message = AppConstants.EMPTY_DEVICE_SELECTION
        }
        if (!isEmpty(message)) {
            AppManager.showSimpleMessage('warning', { message: message, description: '', floating: true })
        } else {
            let arrSelectedDevices = arrConsolidatedDeviceList.filter((item) => item.deviceName == device)
            if (!isEmpty(arrSelectedDevices)) {
                let selectedDevice = arrSelectedDevices[0]
                let requestBody = {
                    assetDTO: {
                        assetType: type,
                        assetName: assetName,
                        deviceId: selectedDevice.id,
                        isQuickAdd: false,
                        description: description
                    }
                }
                AppManager.showLoader()
                dispatch(DeviceActions.requestAddAsset(user_id, requestBody, onCreateAssetSuccess, onCreateAssetError))
            }
        }
    }

    function onCreateAssetSuccess(data) {
        AppManager.hideLoader()
        AppManager.showSimpleMessage('success', { message: 'Asset successfully linked with device', description: '', floating: true })
        NavigationService.goBack()
    }

    function onCreateAssetError(error) {
        AppManager.hideLoader()
        AppManager.showSimpleMessage('danger', { message: error, description: '', floating: true })
    }

    return (
        <View style={styles.container}>
            <View style={styles.scene}>
                <TextField
                    valueSet={setAssetName}
                    defaultValue={assetName}
                    label='Name*'                    
                />
                {/* Dropdown absolute - type */}
                <View style={{margin:hp(5)}}></View>

                <TextField
                    valueSet={setDescrption}
                    defaultValue={description}
                    label='Description (Optional)'
                    multiline={true}
                    contentInset={{ input:hp(1) }}
                    outerStyle={styles.outerStyle}
                />
                {/* Dropdown absolute - device */}
                <View style={{margin:hp(5)}}></View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => goBack()}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.buttonStyle, { backgroundColor: ColorConstant.BLUE }]} onPress={() => onTapSave()}>
                        <Text style={styles.saveText}>Save</Text>
                    </TouchableOpacity>
                </View>

                <DropDown
                    defaultValue={device}
                    label='Select Device'
                    valueSet={setDevice}
                    dataList={arrDeviceNames}
                    // contentInset={{ label: hp(-0.2) }}
                    // inputContainerStyle={styles.inputContainer}
                    // accessoryStyle={{marginBottom:0}}
                    outerStyle={{ position:'absolute', width:'100%', marginTop: hp(34) }}
                />

                <DropDown
                    label='Type'
                    defaultValue={type}
                    valueSet={setType}
                    dataList={arrAssetTypeList}
                    // contentInset={{ label: hp(-0.2) }}
                    // inputContainerStyle={styles.inputContainer}
                    // accessoryStyle={{marginBottom:0}}
                    outerStyle={{ position:'absolute', width:'100%', marginTop: 75 }}
                />


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        alignItems: 'center',
        backgroundColor: ColorConstant.WHITE
    },
    scene: {
        width: '85%',
        marginHorizontal: hp(5),
        marginTop: hp(5)
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: hp(3),
        alignItems: 'center'
    },
    buttonStyle: {
        borderRadius: 6,
        borderWidth: 1,
        borderColor: ColorConstant.BLUE,
        backgroundColor: ColorConstant.WHITE,
        width: '42%',
        height: hp(6),
        justifyContent: 'center'
    },
    cancelText: {
        textAlign: 'center',
        color: ColorConstant.BLUE
    },
    saveText: {
        textAlign: 'center',
        color: ColorConstant.WHITE
    },
    inputContainer: {
        height: hp(5),
        borderRadius: hp(5),
    }
})

export default CreateAsset