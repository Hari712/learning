import React, { useState, useEffect, useLayoutEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { DropDown, AddNewGroupDialog } from '../../component'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import images from '../../constants/images'
import { useSelector, useDispatch } from 'react-redux'
import { getGroupListInfo, makeGetDeviceDetail, getLoginInfo } from '../Selector'
import { ColorConstant } from '../../constants/ColorConstants'
import FontSize from '../../component/FontSize'
import AppManager from '../../constants/AppManager'
import ShadowView from 'react-native-simple-shadow-view'
import NavigationService from '../../navigation/NavigationService'
import isEmpty from 'lodash/isEmpty'
import * as DeviceActions from './Device.Action'
import mapKeys from 'lodash/mapKeys'


const AssignGroup = ({ navigation, route }) => {

    const deviceInfo = route.params.device ? route.params.device : null

    const dispatch = useDispatch()

    const getDeviceDetail = makeGetDeviceDetail()

    const { loginInfo, groupList, isConnected, device } = useSelector(state => ({
        loginInfo: getLoginInfo(state),
        groupList: getGroupListInfo(state),
        isConnected: state.network.isConnected,
        device: getDeviceDetail(state, deviceInfo.id),
    })) 

    const user_id = loginInfo.id ? loginInfo.id : null
    const arrGroupnames = isEmpty(groupList) ? [] : groupList.map((item) => item.groupName)
    const [group, setGroup] = useState('')
    const [isAddNewGroupDialogVisible, setIsAddNewGroupDialogVisibility] = useState(false)

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


    function onTapAddNewGroup() {
        setIsAddNewGroupDialogVisibility(true)
    }

    function onTapNext() {
        if (isEmpty(group)) {
            AppManager.showSimpleMessage('warning', { message: 'Please select group', description: '', floating: true })
        }
        else {
            let selectedGroups = groupList.filter((item) => item.groupName == group)
            if (!isEmpty(selectedGroups)) {
                let selectedGroup = selectedGroups[0]
                let arrDeviceList = selectedGroups.devices ? selectedGroups.devices : []
                let deviceobjs = mapKeys(arrDeviceList, 'id')
                let devicelist = { ...deviceobjs, [device.id]: device }
                let updatedArrList = Object.values(devicelist)
                let requestBody = {
                    groupDTO: { ...selectedGroup, ...{ devices: updatedArrList, isQuickAdd: false  } }
                }
                AppManager.showLoader()
                dispatch(DeviceActions.requestLinkDeviceWithGroup(user_id, requestBody, onAssignGroupSuccess, onAssignGroupError))
            } 
        }
        
    }

    function onAssignGroupSuccess(data) {
        AppManager.hideLoader()
        NavigationService.push('CompleteSetup')
    }

    function onAssignGroupError(error) {
        AppManager.hideLoader()
    }

    function onTapNotNow() {
        NavigationService.push('CompleteSetup')
    }

    function onSubmit(item) {

    }

    function renderAddNewGroupDialog() {
        return (
            <AddNewGroupDialog
                isVisible={isAddNewGroupDialogVisible}
                onSubmit={(item) => onSubmit(item)}
                onTapClose={() => setIsAddNewGroupDialogVisibility(false)}
                onSwipeComplete={() => setIsAddNewGroupDialogVisibility(false)}
            />
        )
    }

    return (
        <>
        <View style={styles.container}>
            <View style={{ alignItems: 'center', paddingTop: hp(1), paddingHorizontal: hp(3) }}>
                <Image style={{ width: hp(16), height: hp(16) }} source={images.image.deviceSetup.step3} resizeMode="contain" />
                <Text style={styles.title}>Assign Group</Text>
            </View>
            <View style={{ paddingHorizontal: hp(3), paddingTop: hp(2), zIndex: 10 }}>
                <DropDown
                    defaultValue={group}
                    label='Select Group'
                    valueSet={setGroup}
                    dataList={arrGroupnames}
                    contentInset={{ label: hp(-0.2) }}
                    inputContainerStyle={styles.inputContainer}
                    accessoryStyle={{ top: hp(0.0) }}
                    outerStyle={{ marginBottom: hp(0) }}
                />
            </View>
            <ShadowView style={[styles.shadowContainer, { paddingHorizontal: hp(3) }]}>
                    <TouchableOpacity style={styles.activateButton} onPress={() => onTapAddNewGroup()}>
                        <Text style={styles.activateButtonTitle}>Add New Group</Text>
                    </TouchableOpacity>
            </ShadowView>
            <View style={styles.buttonMainContainer}>
                <ShadowView style={[styles.shadowContainer, { width: '40%' }]}>
                    <TouchableOpacity style={[styles.cancelButton]} onPress={() => onTapNotNow()}>
                        <Text style={styles.buttonTextColor}>Not Now</Text>
                    </TouchableOpacity>
                </ShadowView>
                <ShadowView style={[styles.shadowContainer, { width: '40%' }]}>
                    <TouchableOpacity style={styles.nextButton} onPress={() => onTapNext()}>
                        <Text style={styles.nextButtonText}>Next</Text>
                    </TouchableOpacity>
                </ShadowView>
            </View>
        </View>
        {renderAddNewGroupDialog()}
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
})

export default AssignGroup