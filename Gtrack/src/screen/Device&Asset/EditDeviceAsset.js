import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Dialog, FontSize, TextField, DropDown, AssetConfirmationDialog } from '../../component'
import { useSelector, useDispatch } from 'react-redux'
import { getLoginInfo, makeGetDeviceDetail, getAssetTypeListInfo, getGroupListInfo, getAssetListInfo } from '../Selector'
import isEmpty from 'lodash/isEmpty'
import AppManager from '../../constants/AppManager'
import { AppConstants } from '../../constants/AppConstants'
import NavigationService from '../../navigation/NavigationService'
import * as DeviceActions from '../DeviceSetup/Device.Action'

const EditDeviceAsset = ({ route, navigation }) => {

    const deviceInfo = route.params.device ? route.params.device : null
    const assetInfo = route.params.assetDTO ? route.params.assetDTO : null
    const groupInfo = route.params.groupDTO ? route.params.groupDTO : null

    const dispatch = useDispatch()

    const getDeviceDetail = makeGetDeviceDetail()

    const { assetList, isConnected, loginInfo, groupList } = useSelector(state => ({
        assetList: getAssetListInfo(state),
        isConnected: state.network.isConnected,
        loginInfo: getLoginInfo(state),
        groupList: getGroupListInfo(state),
    }))

    const user_id = loginInfo.id ? loginInfo.id : null
    const assetDTO = isEmpty(assetInfo) ? null : assetInfo

    const asstName = assetDTO && assetDTO.assetName ? assetDTO.assetName : ''

    const assetType = assetDTO && assetDTO.assetType ? assetDTO.assetType : 'None'

    const assetDescription = assetDTO && assetDTO.description ? assetDTO.description : 'None'

    const groupDTO = isEmpty(groupInfo) ? null : groupInfo

    const groupName = groupDTO && groupDTO.groupName ? groupDTO.groupName : null


    const arrAssetList = isEmpty(assetList) ? [] : assetList.map((item) => item.assetName)
    const deviceId = deviceInfo.deviceId ? deviceInfo.deviceId : ''

    const devName = deviceInfo.deviceName ? deviceInfo.deviceName : ''

    const arrGroupnames = isEmpty(groupList) ? [] : groupList.map((item) => item.groupName)

    const nameRef = useRef();

    const [deviceName, setDeviceName] = useState(devName);
    const [assetName, setAssetName] = useState(asstName)
    const [type, setType] = useState(assetType);
    const [assetDesc, setAssetDescription] = useState(assetDescription)
    const [group, setGroup] = useState(groupName);
    const [dialogVisible, setDialogVisible] = useState(false)


    useEffect(() => {
        if (assetName) {
            let selectedAssetList = assetList.filter((item) => item.assetName == assetName)
            if (!isEmpty(selectedAssetList)) {
                let selectedAset = selectedAssetList[0]
                setType(selectedAset.assetType)
                setAssetDescription(selectedAset.description)
            }
        }

    }, [assetName])

    useEffect(() => {
        if (group) {
            let selectedGroupList = groupList.filter((item) => item.groupName == group)
            if (!isEmpty(selectedGroupList)) {
                let selectedGroup = selectedGroupList[0]
                setGroup(selectedGroup.groupName)
            }
        }

    }, [group])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={{
                    color: ColorConstant.GREY,
                    fontSize: FontSize.FontSize.medium,
                    fontWeight: '500',
                    textAlign: 'center'
                }}>
                    Edit Device & Asset
                </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={() => NavigationService.goBack()}>
                    <Image style={{ marginLeft: hp(2) }} source={images.image.back} />
                </TouchableOpacity>
            )
        });
    }, [navigation])

    const clear = () => {
        setDeviceName('')
        nameRef.current.clear();
        setType('')
        setGroup('')
    }

    function onTapSave() {
        let message = ''
        if (isEmpty(deviceName)) {
            message = AppConstants.EMPTY_DEVICE_NAME
        }
        // else if (isEmpty(type)) {
        //     message = AppConstants.EMPTY_ASSET_TYPE
        // }
        // else if (isEmpty(group)) {
        //     message = AppConstants.EMPTY_GROUP_SELECTION
        // }
        if (!isEmpty(message)) {
            AppManager.showSimpleMessage('warning', { message: message, description: '', floating: true })
        } else {
            
            setDialogVisible(true)
        }
    }

    function onTapConfirm() {
        setDialogVisible(false)
        let deviceDTO = { ...deviceInfo, ...{ deviceName: deviceName } }
            let groupDTObj = groupDTO ? groupDTO : null
            if (!isEmpty(group)) {
                let arrSelectedGroup = groupList.filter((item) => item.groupName == group)
                if (!isEmpty(arrSelectedGroup)) {
                    let selectedGroup = arrSelectedGroup[0]
                    groupDTObj = selectedGroup
                }
            }

            let assetDtObj = assetDTO ? assetDTO : null
            if (!isEmpty(assetName)) {
                let arrSelectedAsset = assetList.filter((item) => item.assetName == assetName)
                if (!isEmpty(arrSelectedAsset)) {
                    let selectedAsset = arrSelectedAsset[0]
                    assetDtObj = selectedAsset
                }
            }

            AppManager.showLoader()
            let requestBody = {
                deviceDTO: deviceDTO,
                assetDTO: assetDtObj,
                groupDTO: groupDTObj
            }
            dispatch(DeviceActions.requestUpdateDevice(user_id, requestBody, onUpdateDeviceSuccess, onUpdateDevcieError))
    }

    function onUpdateDeviceSuccess(data) {
        AppManager.hideLoader()
        AppManager.showSimpleMessage('success', { message:'Device updated successfully', description: '' })
        NavigationService.goBack()
    }

    function onUpdateDevcieError(error) {
        AppManager.hideLoader()
        AppManager.showSimpleMessage('danger', { message: error, description: '' })
    }

    function renderAssetConfirmationDialog() {
        return (
            <AssetConfirmationDialog
                isVisible={dialogVisible}
                // deviceId={device.deviceId}
                // onSubmit={(item) => onSubmit(item)}
                onTapConfirm={() => onTapConfirm()}
                onTapClose={() => setDialogVisible(false)}
                onSwipeComplete={() => setDialogVisible(false)}
            />
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <View style={styles.device}>
                    <Image style={{ resizeMode: 'stretch' }} source={images.image.usb} />
                    <Text style={styles.textStyle}>Device</Text>
                </View>
                <View style={styles.id}>
                    <Text style={styles.idTitle}>Id</Text>
                    <Text style={styles.idText}>{deviceId}</Text>
                </View>

                <View style={styles.textField}>
                    <TextField valueSet={setDeviceName} label='Name*' ref={nameRef} value={devName} />
                </View>
                <View style={styles.horizontalLine} />

                <View style={[styles.device, { marginTop: hp(2) }]}>
                    <Image style={{ resizeMode: 'stretch' }} source={images.image.pickupcar} />
                    <Text style={styles.textStyle}>Asset</Text>
                </View>

                <View style={{ margin: hp(5) }}/>

                <View style={styles.nameDesc}>
                    <View style={styles.column} >
                        <Text style={styles.nameDescText}>Type</Text>
                        <Text style={styles.name}>{type}</Text>
                    </View>
                    <View style={styles.column} >
                        <Text style={styles.nameDescText}>Description (Optional)</Text>
                        <Text style={styles.name}>{assetDesc}</Text>
                    </View>
                </View>
                <View style={styles.horizontalLine} />

                <View style={[styles.device, { marginTop: hp(2) }]}>
                    <Image style={{ resizeMode: 'stretch' }} source={images.image.list} />
                    <Text style={styles.textStyle}>Select Group</Text>
                </View>

                <View style={{ margin: hp(5) }}/>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => clear()} style={[styles.button, { backgroundColor: ColorConstant.WHITE, borderColor: ColorConstant.BLUE, borderWidth: 1 }]}>
                        <Text style={[styles.buttonText, { color: ColorConstant.BLUE }]}>Clear</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => onTapSave()} style={styles.button}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ width:'100%', marginTop:385, position:'absolute' }}>
                    <DropDown label='Select Group' defaultValue={group} valueSet={setGroup} dataList={arrGroupnames} />
                </View>

                <View style={{ width:'100%', marginTop:200, position:'absolute' }}>
                    <DropDown label='Name' defaultValue={assetName} valueSet={setAssetName} dataList={arrAssetList} />
                </View>

                {renderAssetConfirmationDialog()}
            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        backgroundColor: ColorConstant.WHITE,
        alignItems: 'center'
    },
    subContainer: {
        marginHorizontal: hp(3),
        marginVertical: hp(5),
        width: Dimensions.get('window').width - 40
    },
    device: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textStyle: {
        marginLeft: hp(2),
        color: ColorConstant.BLUE,
        fontSize: FontSize.FontSize.small,
        fontWeight: '600'
    },
    id: {
        flexDirection: 'row',
        marginTop: hp(2)
    },
    idTitle: {
        color: ColorConstant.BLUE,
        fontSize: FontSize.FontSize.small,
        fontWeight: '600',
        flex: 1
    },
    idText: {
        marginLeft: hp(1.5),
        color: ColorConstant.BLACK,
        fontSize: FontSize.FontSize.small,
        fontWeight: '600',
        flex: 20
    },
    textField: {
        width: '100%',
        alignSelf: 'center',
        margin: hp(3)
    },
    horizontalLine: {
        borderBottomColor: ColorConstant.GREY,
        borderBottomWidth: 0.3,
        marginHorizontal: hp(2),
        width: wp(95),
        alignSelf: 'center'
    },
    nameDesc: {
        flexDirection: 'row',
        marginTop: hp(2),
        marginBottom: hp(3)
    },
    column: {
        flexDirection: 'column',
        flex: 1
    },
    nameDescText: {
        color: ColorConstant.BLUE,
        fontSize: FontSize.FontSize.small
    },
    name: {
        color: ColorConstant.BLACK,
        fontSize: FontSize.FontSize.small,
        marginTop: hp(1)
    },
    button: {
        borderRadius: 6,
        backgroundColor: ColorConstant.BLUE,
        width: '42%',
        height: hp(6),
        justifyContent: 'center'
    },
    buttonText: {
        textAlign: 'center',
        color: ColorConstant.WHITE
    },
    messageStyle: {
        color: ColorConstant.BLACK,
        textAlign: 'center',
        fontSize: FontSize.FontSize.small
    },
    dialogButton: {
        alignItems: 'center',
        marginBottom: hp(3)
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        //width:'75%',
        //margin:hp(3),
        marginTop: hp(5),
        alignItems: 'center'
    }
});

export default EditDeviceAsset;