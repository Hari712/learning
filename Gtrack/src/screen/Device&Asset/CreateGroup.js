import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions, ScrollView, TextInput } from 'react-native';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FontSize, TextField, DropDown, MultiSelect } from '../../component';
import { AppConstants } from '../../constants/AppConstants'
import { useSelector, useDispatch } from 'react-redux'
import * as DeviceActions from '../DeviceSetup/Device.Action'
import NavigationService from '../../navigation/NavigationService'
import { getLoginInfo } from '../Selector'
import isEmpty from 'lodash/isEmpty'
import AppManager from '../../constants/AppManager'

function Group() {

    const dispatch = useDispatch()
    const [group, setGroup] = useState();
    const [selectedDevices, setSelectedDevices] = useState([]);
    const [detailsToggle, setDetailsToggle] = useState(false);
    const [arrDeviceList, setDeviceList] = useState([])
    const [arrDeviceNames, setDeviceNames] = useState([])

    const { loginInfo, isConnected } = useSelector(state => ({
        loginInfo: getLoginInfo(state),
        isConnected: state.network.isConnected
    }))

    const user_id = loginInfo.id ? loginInfo.id : null

    useEffect(() => {
        loadNonGroupedDevice()
    }, [])

    useEffect(() => {
        group ? null : setDetailsToggle(false)
    }, [group])

    function loadNonGroupedDevice() {
        let requestBody = {
            nonGrouped: true,
            nonLinked: false
        }
        dispatch(DeviceActions.requestGetAllNonGroupedDevice(user_id, requestBody, onNonGroupedDeviceLoadedSuccess, onNonGroupedDeviceLoadedError))
    }


    function onNonGroupedDeviceLoadedSuccess(data) {
        let arr = isEmpty(data) ? [] : data
        setDeviceList(arr)
        let arrDeviceNames = arr.map((item) => item.deviceName)
        setDeviceNames(arrDeviceNames)
        console.log("arr",arrDeviceNames)
    }

    function onNonGroupedDeviceLoadedError(error) {
        console.log(error)
    }

    function onTapSave() {
        if (isConnected) {
            let arrSelectedDevices = arrDeviceList ? arrDeviceList.filter((item) => selectedDevices.includes(item.deviceName)) : []
                let requestBody = {
                    groupDTO: {
                        groupName: group,
                        devices: arrSelectedDevices
                    }
                }
                AppManager.showLoader()
                dispatch(DeviceActions.requestAddGroup(user_id, requestBody, onCreateGroupSuccess, onCreateGroupError))
        } else {
            AppManager.showNoInternetConnectivityError()
        }
    }
 
    function onCreateGroupSuccess(data) {
        AppManager.hideLoader()
        AppManager.showSimpleMessage('success', { message: 'Group successfully created', description: '', floating: true })
        NavigationService.goBack()
    }

    function onCreateGroupError(error) {
        AppManager.hideLoader()
        AppManager.showSimpleMessage('warning', { message: error, description: '', floating: true })
    }


    return (

        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
            <View style={styles.container}>

                <View style={styles.scene} >
                    <TextField valueSet={setGroup} label='Group Name*' defaultValue={group} />
                </View>

                {detailsToggle ?
                    <View style={styles.detailsToggle}>
                        <MultiSelect
                            label='Select Device'
                            allText='Select All'
                            dataList={arrDeviceNames}
                            valueSet={setSelectedDevices}
                            textStyle={{ color: ColorConstant.BLUE, fontSize: 12, paddingVertical: hp(1), fontFamily: 'Nunito-Regular' }}
                            selectedData={selectedDevices}
                        />
                    </View>
                    : null}

                <View style={styles.scene} >
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonStyle} onPress={() => NavigationService.goBack()}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity disabled={!group} onPress={() => { detailsToggle ? onTapSave() : setDetailsToggle(true) }} style={[styles.nextButton, { backgroundColor: group ? ColorConstant.BLUE : '#06418E50', }]}>
                            <Text style={styles.saveText}> {detailsToggle ? 'Save' : 'Next'} </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    contentContainerStyle: {
        flexGrow:1,
        //height: Dimensions.get('window').height,
        backgroundColor: ColorConstant.WHITE,
    },
    container: {
        alignItems: 'center',
        backgroundColor: ColorConstant.WHITE
    },
    scene: {
        //flex: 1,
        //alignContent:'center',
        width: '85%',
        marginHorizontal: hp(5),
        //marginVertical:hp(1),
        marginTop: hp(5)
    },
    detailsToggle: {
        backgroundColor: ColorConstant.PINK,
        paddingVertical: 10,
        width: '100%',
        paddingHorizontal: '7.5%'
    },
    nextButton: {
        borderRadius: 6,
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
    buttonStyle: {
        borderRadius: 6,
        borderWidth: 1,
        borderColor: ColorConstant.BLUE,
        backgroundColor: ColorConstant.WHITE,
        width: '42%',
        height: hp(6),
        justifyContent: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        //width:'75%',
        //margin:hp(3),
        marginVertical:hp(3),
        // marginTop: hp(3),
        alignItems: 'center'
    }
})

export default Group