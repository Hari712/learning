import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ColorConstant } from '../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from './FontSize'
import MultiSelect from './MultiSelect';
import isEmpty from 'lodash/isEmpty'
import { useDispatch, useSelector } from 'react-redux';
import * as DeviceActions from '../screen/DeviceSetup/Device.Action'
import { getLoginInfo, isRoleAdmin, isRoleOwner } from '../screen/Selector';
import AppManager from '../constants/AppManager';
import CustomDialog from './Dialog';
import { CrossIcon, DownArrowIcon, UpArrowIcon, TrashIcon, AddIconClicked, AddIcon, TrashBlueIcon, RadioButtonIcon, RadioButtonIconClicked } from './SvgComponent';

const GroupItem = props => {

    const { item, arrDeviceList, arrDeviceNames, addClick, setAddClick, loadNonGroupedDevice, fetchGroupList } = props;

    const itemNumber = props.index;

    const { groupName, devices, index, id } = item

    const arrDevices = isEmpty(devices) ? [] : devices

    const isDefault = item.isDefault

    const dispatch = useDispatch()

    const { isConnected, loginInfo, isAdmin, isOwner } = useSelector(state => ({
        isConnected: state.network.isConnected,
        loginInfo: getLoginInfo(state),
        isAdmin: isRoleAdmin(state),
        isOwner: isRoleOwner(state),
    }))

    const [selectedKey, setSelectedKey] = useState(-1);
    const [subContainerHeight, setSubContainerHeight] = useState();
    // const [addClick, setAddClick] = useState(-1);
    const [selectedDevices, setSelectedDevices] = useState([]);
    const [deleteDeviceKey, setDeleteDeviceKey] = useState();
    const [dialogVisible, setDialogVisible] = useState(false)
    const [deleteGroupDialogVisible, setDeleteGroupDialogVisible] = useState(false)
    const [removeDeviceId, setRemoveDeviceId] = useState()
    const [removeDeviceKey, setRemoveDeviceKey] = useState()

    const deleteFunction = (item, key) => {
        setDeleteDeviceKey(key)
        setSelectedDevices(selectedDevices.filter((item, key) => key != deleteDeviceKey))
    }

    const onUpdateGroup = () => {
        if (isConnected) {
            AppManager.showLoader()
            let arrSelectedDevices = arrDeviceList.filter((item) => selectedDevices.includes(item))
            const requestBody = {
                "deviceDTO": null,
                "assetDTO": null,
                "groupDTO": {
                    "id": id,
                    "groupName": groupName,
                    "devices": arrSelectedDevices,
                    "isQuickAdd": false
                },
                "devicePlan": null
            }
            dispatch(DeviceActions.requestUpdateGroupDevice(loginInfo.id, requestBody, onSuccess, onRemoveDeviceError))
        } else {
            AppManager.showNoInternetConnectivityError()
        }
    }

    const setDefaultGroup = () => {
        if (isConnected) {
            AppManager.showLoader()
            let arrSelectedDevices = arrDeviceList.filter((item) => selectedDevices.includes(item))
            const requestBody = {
                "deviceDTO": null,
                "assetDTO": null,
                "groupDTO": {
                    "id": id,
                    "groupName": groupName,
                    "devices": arrSelectedDevices,
                    "isQuickAdd": false,
                    "isDefault": true
                },
                "devicePlan": null
            }
            dispatch(DeviceActions.requestUpdateGroupDevice(loginInfo.id, requestBody, onSetDefaultSuccess, onRemoveDeviceError))
        } else {
            AppManager.showNoInternetConnectivityError()
        }
    }
    const onSetDefaultSuccess = (data) => {
        AppManager.showSimpleMessage('success', { message: 'Default Group changed successfully', description: '', floating: true })
        console.log("Success", data)
        dispatch(DeviceActions.requestGetAllUserGroups(loginInfo.id, onGroupListLoadedSuccess, onGroupListLoadedError))
        loadNonGroupedDevice()
        setAddClick(-1)
        setSelectedDevices([])
        AppManager.hideLoader()
    }

    const removeConfirm = () => {
        setDialogVisible(false)
        AppManager.showLoader()
        const requestBody = {
            "groupId": id,
            "deviceId": removeDeviceId.toString()
        }
        dispatch(DeviceActions.requestRemoveDevice(loginInfo.id, requestBody, removeDeviceKey, item.id, onRemoveDeviceSuccess, onRemoveDeviceError))
    }

    const onSuccess = (data) => {
        AppManager.showSimpleMessage('success', { message: 'Device added to the group successfully', description: '', floating: true })
        console.log("Success", data)
        dispatch(DeviceActions.requestGetAllUserGroups(loginInfo.id, onGroupListLoadedSuccess, onGroupListLoadedError))
        loadNonGroupedDevice()
        setAddClick(-1)
        setSelectedDevices([])
        AppManager.hideLoader()
    }

    function onGroupListLoadedSuccess(data) {
        AppManager.hideLoader()
    }

    function onGroupListLoadedError(error) {
        AppManager.hideLoader()
    }
    const onRemoveDeviceSuccess = (data) => {
        AppManager.showSimpleMessage('success', { message: 'Device removed successfully from the group', description: '', floating: true })
        console.log("Success", data)
        setAddClick(-1)
        setSelectedDevices([])
        loadNonGroupedDevice()
        AppManager.hideLoader()
    }

    const onRemoveDeviceError = (error) => {
        AppManager.hideLoader()
        AppManager.showSimpleMessage('danger', { message: error, description: '', floating: true })
        console.log("Error", error)
    }

    const onDeleteGroup = () => {
        setDeleteGroupDialogVisible(true)
    }

    const deleteGroupConfirm = () => {
        if (isConnected) {
            setDeleteGroupDialogVisible(false)
            AppManager.showLoader()
            dispatch(DeviceActions.requestDeleteGroup(loginInfo.id, id, onDeleteGroupSuccess, onDeleteGroupError))
        } else {
            AppManager.showNoInternetConnectivityError()
        }
    }

    const onDeleteGroupSuccess = (data) => {
        AppManager.showSimpleMessage('success', { message: 'Group deleted successfully', description: '', floating: true })
        console.log("Success", data)
        loadNonGroupedDevice()
        fetchGroupList()
        AppManager.hideLoader()
    }

    const onDeleteGroupError = (error) => {
        AppManager.hideLoader()
        AppManager.showSimpleMessage('danger', { message: error, description: '', floating: true })
        console.log("Error", error)
    }


    const onDeleteDevice = (deviceId, key) => {
        setRemoveDeviceId(deviceId)
        setRemoveDeviceKey(key)
        setDialogVisible(true)
    }

    const onPressCancel = () => {
        setAddClick(-1)
        setSelectedDevices([])
    }

    const addDevicePopup = () => {
        return (
            <View style={styles.popup}>
                <View style={{ flexDirection: 'row', margin: hp(2) }}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ color: ColorConstant.ORANGE, fontSize: FontSize.FontSize.medium, fontWeight: 'bold' }}>Add Device</Text>
                    </View>
                    <TouchableOpacity onPress={() => setAddClick(-1)} style={{ alignSelf: 'center', height: hp(2) }}>
                        <CrossIcon />
                        {/* <Image source={images.manage.close} /> */}
                    </TouchableOpacity>
                </View>
                <View style={{ width: wp(80), alignSelf: 'center' }}>
                    <MultiSelect
                        label='Select Device'
                        dataList={arrDeviceNames}
                        valueSet={setSelectedDevices}
                        selectedData={selectedDevices}
                        selectedItemContainerStyle={styles.selectedItemContainerStyle}
                        hideDeleteButton={true}
                        hideSelectedDeviceLable={true}
                        deleteHandle={deleteFunction}
                        dropdownStyle={{ width: wp(70) }}
                        selectedItemRowStyle={styles.selectedItemRowStyle}
                        outerStyle={{ width: wp(70), alignSelf: 'center' }} />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => onPressCancel()} style={{ borderRadius: 6, borderWidth: 1, borderColor: ColorConstant.BLUE, backgroundColor: ColorConstant.WHITE, width: '42.5%', height: hp(6), justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', color: ColorConstant.BLUE }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onUpdateGroup()} style={{ borderRadius: 6, backgroundColor: ColorConstant.BLUE, width: '42.5%', height: hp(6), justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', color: ColorConstant.WHITE }}>Okay</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function renderDevices() {
        return (
            <>
                {arrDevices.map((subitem, subkey) => {
                    const itemKey = `${subkey}${index}`
                    return (
                        <View key={itemKey} style={styles.subCategory}>
                            <View style={{ width: 2, backgroundColor: ColorConstant.BLUE, marginRight: hp(1), marginLeft: 4, borderRadius: 10 }} />
                            <Text style={{ flex: 1, color: ColorConstant.BLUE }}>{subitem && subitem.deviceName}</Text>
                            {isDefault || isAdmin ? null : <TouchableOpacity onPress={() => onDeleteDevice(subitem.id, subkey)}>
                                <TrashBlueIcon width={16.567} height={18.547} style={styles.icon} />
                            </TouchableOpacity>}
                        </View>
                    )
                })}
            </>
        )
    }

    function renderDefaultContainer() {
        return (
            <View style={{ paddingVertical: hp(0.7), justifyContent: 'center', alignItems: 'center', backgroundColor: ColorConstant.LIGHTGREY, borderRadius: hp(1), paddingHorizontal: hp(1) }}>
                <Text style={{ fontSize: hp(1.5), fontWeight: '300' }}>Default</Text>
            </View>
        )
    }

    function renderActionButton() {
        return (
            <>
                {!isAdmin ?
                    <TouchableOpacity style={{ padding: hp(0.5), marginRight: hp(1.5), }} onPress={() => onDeleteGroup()} >
                        <TrashIcon style={styles.icon} height={hp(2.4)} width={hp(2.4)} />
                    </TouchableOpacity>
                    : null}

                <TouchableOpacity style={{ flex: 0.3, }} style={{ alignSelf: 'center' }}
                    onPress={() => {
                        (item.id == addClick) ?
                            setAddClick(-1) :
                            setAddClick(item.id)
                    }}
                >
                    {item.id == addClick ? <AddIconClicked height={hp(1.8)} width={hp(1.8)} /> : <AddIcon height={hp(1.8)} width={hp(1.8)} />}
                </TouchableOpacity>
            </>
        )
    }

    return (
        <View style={{ width: '100%', alignItems: 'center', paddingVertical: hp(2) }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }} >
                {!isAdmin && <View style={{ paddingRight: wp(3) }}>
                    {isDefault ? <RadioButtonIconClicked /> :
                        <TouchableOpacity onPress={() => setDefaultGroup()}>
                            <RadioButtonIcon />
                        </TouchableOpacity>
                    }
                </View>
                }
                <View style={[styles.card, { height: (index == selectedKey) ? subContainerHeight : hp(5), borderColor: (index == selectedKey) ? ColorConstant.ORANGE : ColorConstant.WHITE }]} >
                    {/* Arrow Left Side */}
                    <TouchableOpacity onPress={() => (index == selectedKey) ? setSelectedKey(-1) : setSelectedKey(index)} style={[styles.arrow, { backgroundColor: (index == selectedKey) ? ColorConstant.ORANGE : ColorConstant.BLUE }]}>
                        {(index == selectedKey) ? <UpArrowIcon /> : <DownArrowIcon />}
                    </TouchableOpacity>

                    <View style={{ flex: 1, padding: 10 }} onLayout={({ nativeEvent }) => { setSubContainerHeight(nativeEvent.layout.height) }}>
                        {/* heading */}
                        <View onPress={() => (index == selectedKey) ? setSelectedKey(-1) : setSelectedKey(index)} style={{ flexDirection: 'row', width: '100%', paddingHorizontal: 10 }}>
                            <TouchableOpacity style={{ flex: 1, alignSelf: 'center' }} onPress={() => (index == selectedKey) ? setSelectedKey(-1) : setSelectedKey(index)} >
                                <Text style={{ color: (index == selectedKey) ? ColorConstant.ORANGE : ColorConstant.BLACK }}>{groupName}</Text>
                                {/* {(index !== selectedKey) && item.devices.length > 0 ?
                                <View style={{backgroundColor: ColorConstant.LIGHTENBLUE,width:wp(8),alignItems:'center', marginRight: wp(5)}}>
                                    <Text style={{color:ColorConstant.BLUE,fontFamily:'Nunito-Bold'}}>{item.devices.length}</Text>
                                </View> : null 
                            } */}
                            </TouchableOpacity>
                            {isDefault && isOwner ? renderDefaultContainer() : renderActionButton()}
                        </View>

                        {/* Expanded data View */}

                        {(index == selectedKey) ?
                            <View style={{ marginTop: hp(1) }} >
                                {!isEmpty(arrDevices) ? renderDevices() : <Text style={styles.noDevicesText}>No Devices</Text>}
                            </View>
                            : null}


                    </View>
                </View>
            </View>
            {/* Popup View */}
            {(item.id == addClick) ? addDevicePopup() : null}

            <CustomDialog
                heading="Are you sure ?"
                message={"Do you really want to delete the group ?" + "\n \n" + "All the devices will be assigned to default group"}
                visible={deleteGroupDialogVisible}
                onTouchOutside={() => setDeleteGroupDialogVisible(false)}
                negativeHandle={() => setDeleteGroupDialogVisible(false)}
                positiveHandle={deleteGroupConfirm}
            />

            <CustomDialog
                heading="Are you sure ?"
                message={"Do you really want to remove device from the group?" + "\n \n" + "This process can be undone."}
                visible={dialogVisible}
                onTouchOutside={() => setDialogVisible(false)}
                negativeHandle={() => setDialogVisible(false)}
                positiveHandle={removeConfirm}
            />

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    scene: {
        //flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        //alignContent:'center',
        width: '85%',
        //paddingHorizontal:hp(2),
        //marginVertical:hp(1),
        borderRadius: 12,
        borderWidth: 0.5,
        marginTop: hp(5)
    },
    arrow: {
        backgroundColor: ColorConstant.BLUE,
        width: wp(6),
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        //alignContent:'center',
        width: '80%',
        minHeight: hp(6),
        //paddingHorizontal:hp(2),
        //marginVertical:hp(1),
        borderRadius: 12,
        borderWidth: 0.5,
        // marginTop: hp(5),
        elevation: 3,
        shadowColor: ColorConstant.GREY,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 3,
        shadowOpacity: 1,
        backgroundColor: ColorConstant.WHITE
    },
    popup: {
        borderRadius: 12,
        marginTop: hp(2),
        // marginRight:wp(1),
        // marginLeft:wp(11),
        //alignItems:'center',
        elevation: 3,
        shadowColor: ColorConstant.GREY,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 3,
        shadowOpacity: 1,
        backgroundColor: ColorConstant.WHITE
    },
    icon: {
        // margin: 4,
        alignSelf: 'center',
        // padding: hp(0.5),
        // backgroundColor: 'red'
    },
    subCategory: {
        flexDirection: 'row',
        width: '90%',
        paddingVertical: 5,
        paddingRight: 10,
        alignSelf: 'center',
        margin: 4,
        elevation: 7,
        borderRadius: 8,
        backgroundColor: ColorConstant.WHITE
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '85%',
        //margin:hp(3),
        marginTop: hp(3),
        marginBottom: hp(3),
        alignSelf: 'center'
    },
    selectedItemRowStyle: {
        flexDirection: 'row',
        elevation: 4,
        backgroundColor: ColorConstant.LIGHTPINK,
        borderRadius: 5,
        alignItems: 'center',
        paddingHorizontal: hp(1),
        // flexWrap:'wrap',
        margin: 4,
        height: hp(4),
    },
    selectedItemContainerStyle: {
        backgroundColor: ColorConstant.PINK,
        borderRadius: 8,
        marginTop: hp(2),
        elevation: 0,
        padding: hp(1),
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: wp(70)
    },
    noDevicesText: {
        fontWeight: '400',
        fontSize: FontSize.FontSize.small,
        color: ColorConstant.BLACK,
        marginLeft: hp(1)
    }
});

export default GroupItem

