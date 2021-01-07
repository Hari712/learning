import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ColorConstant } from '../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from './FontSize'
import MultiSelect from './MultiSelect';
import isEmpty from 'lodash/isEmpty'
import { useDispatch, useSelector } from 'react-redux';
import * as DeviceActions from '../screen/DeviceSetup/Device.Action'
import { getLoginInfo } from '../screen/Selector';
import AppManager from '../constants/AppManager';
import CustomDialog from './Dialog';
import { CrossIcon, DownArrowIcon, UpArrowIcon, TrashIcon, AddIconClicked, AddIcon, TrashBlueIcon } from './SvgComponent';

const GroupItem = props => {

    const { item, arrDeviceList, arrDeviceNames, addClick, setAddClick } = props;

    const itemNumber = props.index;

    const { groupName, devices, index, id } = item

    const arrDevices = isEmpty(devices) ? [] : devices

    const dispatch = useDispatch()

    const { isConnected, loginInfo } = useSelector(state => ({
        isConnected: state.network.isConnected,
        loginInfo: getLoginInfo(state),
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
        AppManager.showLoader()
        let arrSelectedDevices = arrDeviceList.filter((item) => selectedDevices.includes(item.deviceName))
        const  requestBody = {
            "deviceDTO" : null,
            "assetDTO" : null,
            "groupDTO" : {
            "id" : id,
            "groupName" : groupName,
            "devices" : arrSelectedDevices,
            "isQuickAdd" : false
            },
            "devicePlan" : null
        }
        dispatch(DeviceActions.requestUpdateGroupDevice(loginInfo.id, requestBody, onRemoveDeviceSuccess, onRemoveDeviceError))
    }

    const removeConfirm = () => {
        setDialogVisible(false)
        AppManager.showLoader()
        const requestBody = {
            "groupId" : id,
            "deviceId" : removeDeviceId.toString()
        }          
        dispatch(DeviceActions.requestRemoveDevice(loginInfo.id, requestBody, removeDeviceKey, item.id, onRemoveDeviceSuccess, onRemoveDeviceError))
    }

    
    const onRemoveDeviceSuccess = (data) => {
        AppManager.showSimpleMessage('success', { message: data.message, description: '', floating: true })
        console.log("Success",data)
        setAddClick(-1)
        setSelectedDevices([])
        AppManager.hideLoader()
    }

    const onRemoveDeviceError = (error) => {
        AppManager.hideLoader()
        AppManager.showSimpleMessage('danger', { message: error, description: '', floating: true })
        console.log("Error",error)
    }

    const onDeleteGroup = () => {
        setDeleteGroupDialogVisible(true)
    }

    const deleteGroupConfirm = () => {
        setDeleteGroupDialogVisible(false)
        AppManager.showLoader()
        dispatch(DeviceActions.requestDeleteGroup(loginInfo.id, id, onDeleteGroupSuccess, onDeleteGroupError))
    }

    const onDeleteGroupSuccess = (data) => {
        AppManager.showSimpleMessage('success', { message: data.message, description: '', floating: true })
        console.log("Success",data)
        AppManager.hideLoader()
    }

    const onDeleteGroupError = (error) => {
        AppManager.hideLoader()
        AppManager.showSimpleMessage('danger', { message: error, description: '', floating: true })
        console.log("Error",error)
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
                        <CrossIcon/>
                        {/* <Image source={images.manage.close} /> */}
                    </TouchableOpacity>
                </View>
                <View style={{ width:wp(85), alignSelf: 'center' }}>
                    <MultiSelect
                        label='Select Device'
                        dataList={arrDeviceNames} 
                        valueSet={setSelectedDevices}
                        selectedData={selectedDevices}
                        selectedItemContainerStyle={styles.selectedItemContainerStyle}
                        hideDeleteButton={true}
                        hideSelectedDeviceLable={true}
                        deleteHandle={deleteFunction}
                        dropdownStyle={{width:wp(70)}}
                        selectedItemRowStyle={styles.selectedItemRowStyle}
                        outerStyle={{ width: wp(70), alignSelf: 'center' }} />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={()=> onPressCancel()} style={{ borderRadius: 6, borderWidth: 1, borderColor: ColorConstant.BLUE, backgroundColor: ColorConstant.WHITE, width: '42.5%', height: hp(6), justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', color: ColorConstant.BLUE }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> onUpdateGroup()} style={{ borderRadius: 6, backgroundColor: ColorConstant.BLUE, width: '42.5%', height: hp(6), justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', color: ColorConstant.WHITE }}>Okay</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    return (
        <View style={{ width: '100%', alignItems: 'center', paddingVertical:hp(2) }}>
        <View style={[styles.card, { height: (index == selectedKey) ? subContainerHeight : hp(5), borderColor: (index == selectedKey) ? ColorConstant.ORANGE : ColorConstant.WHITE }]} >

            {/* Arrow Left Side */}
            <TouchableOpacity onPress={() => (index == selectedKey) ? setSelectedKey(-1) : setSelectedKey(index)} style={[styles.arrow, { backgroundColor: (index == selectedKey) ? ColorConstant.ORANGE : ColorConstant.BLUE }]}>
                {(index == selectedKey) ? <UpArrowIcon/> : <DownArrowIcon/> }
            </TouchableOpacity>

            <View style={{ flex: 1, padding: 10 }} onLayout={({ nativeEvent }) => { setSubContainerHeight(nativeEvent.layout.height) }}>
                {/* heading */}
                <View  style={{ flexDirection: 'row', width: '100%', paddingHorizontal: 10 }}>
                    <Text style={{ flex: 1, color: (index == selectedKey) ? ColorConstant.ORANGE : ColorConstant.BLACK }}>{groupName}</Text>
                    <TouchableOpacity style={{flex:0.3}} onPress={()=> onDeleteGroup()} >
                        <TrashIcon style={styles.icon} width={16.567} height={18.547}/>
                    </TouchableOpacity>                   
                    <TouchableOpacity style={{flex:0.3}} style={{ alignSelf: 'center' }} 
                        onPress={() => {
                            (item.id == addClick) ?
                                setAddClick(-1) :
                                setAddClick(item.id)
                        }}
                    >
                        {item.id == addClick ? <AddIconClicked width={14.487} height={14.487}/> : <AddIcon width={14.487} height={14.487}/> }
                    </TouchableOpacity>
                </View>

                {/* Expanded data View */}

                {(index == selectedKey) ?
                    <View style={{ marginTop: hp(2) }} >
                        {arrDevices.map((subitem, subkey) => {
                            const itemKey = `${subkey}${index}`
                            return (
                                <View key={itemKey} style={styles.subCategory}>
                                    <View style={{ width: 2, backgroundColor: ColorConstant.BLUE, marginRight: hp(1), marginLeft: 4, borderRadius: 10 }} />
                                    <Text style={{ flex: 1, color: ColorConstant.BLUE }}>{subitem.deviceName}</Text>
                                    <TouchableOpacity onPress={()=>onDeleteDevice(subitem.id, subkey)}>
                                        <TrashBlueIcon width={16.567} height={18.547} style={styles.icon}/>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </View>
                : null}


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
        width: '85%',
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
        margin: 4,
        alignSelf: 'center'
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
        flexDirection:'row',
        flexWrap:'wrap',
        width: wp(70)
    }
});

export default GroupItem
