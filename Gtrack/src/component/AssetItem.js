import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ColorConstant } from '../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { DropDown, TextField, DeleteConfirmationDialog } from '../component'
import { useSelector, useDispatch } from 'react-redux'
import AppManager from '../constants/AppManager'
import { getAssetTypeListInfo, getLoginInfo } from '../screen/Selector'
import isEmpty from 'lodash/isEmpty'
import * as DeviceActions from '../screen/DeviceSetup/Device.Action'
import { DeviceAssetEditIconClicked, DeviceAssetEditIcon, TrashIcon } from './SvgComponent';

const AssteItem = (props) => {

    const dispatch = useDispatch()

    const { item, index, editClick, setEditClick } = props

    const { loginInfo ,assetTypeList } = useSelector((state) => ({
        loginInfo: getLoginInfo(state),
        assetTypeList: getAssetTypeListInfo(state)
    }))

    const user_id = loginInfo.id ? loginInfo.id : null
    const { assetName, assetType, description } = item
    const [isDeleteConfirmationDialogVisible, setIsDeleteConfirmationDialog] = useState(false)
    const arrAssetTypeList = isEmpty(assetTypeList) ? [] : assetTypeList.map((item) => item.assetType)
    // const [editClick, setEditClick] = useState()
    const [assetLtype, setAssetLType] = useState(assetType);
    const [assetLName, setAssetLName] = useState(assetName);
    const [assetLdescription, setAssetLDescription] = useState(description)

    const popUp = () => {
        return (
            <View style={{ backgroundColor: ColorConstant.PINK, paddingVertical: 10, width: '100%', marginTop: hp(2) }}>

                <TextField valueSet={setAssetLName} value={assetLName} label='Name*' outerStyle={{ width: '85%', backgroundColor: ColorConstant.WHITE }} />

                <TextField multiline={true} valueSet={setAssetLDescription} defaultValue={assetLdescription} label='Description' outerStyle={{ width: '85%', backgroundColor: ColorConstant.WHITE, marginTop: hp(10) }} />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => setEditClick(-1)} style={{ borderRadius: 6, borderColor: ColorConstant.BLUE, borderWidth: 1, backgroundColor: ColorConstant.WHITE, width: '30%', height: hp(6), justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', color: ColorConstant.BLUE }}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ borderRadius: 6, backgroundColor: ColorConstant.BLUE, width: '30%', height: hp(6), justifyContent: 'center' }} onPress={() => requestUpdateAsset()}>
                        <Text style={{ textAlign: 'center', color: ColorConstant.WHITE }}>Save</Text>
                    </TouchableOpacity>
                </View>

                <DropDown label='Type*' defaultValue={assetLtype} valueSet={setAssetLType} dataList={arrAssetTypeList} outerStyle={{ width: '85%', alignSelf: 'center', backgroundColor: ColorConstant.WHITE, position: 'absolute', marginTop: hp(11) }} dropdownStyle={{ width: '85%', alignSelf: 'center' }} />

            </View>
        )
    }

    function requestUpdateAsset() {
        AppManager.showLoader()
        let requestBody = {
            id: item.id,
            assetType: assetLtype,
            assetName: assetLName,
            description: assetLdescription
        }
        dispatch(DeviceActions.requestUpdateAssetInfo(user_id, requestBody, onAssetUpdateSuccess, onAssetUpdateError))
    }

    function onAssetUpdateSuccess(data) {
        AppManager.hideLoader()
        AppManager.showSimpleMessage('success', { message: 'Asset Updated Successfully', description: '' })
        setEditClick(null)
    }

    function onAssetUpdateError(error) {
        AppManager.hideLoader()
        AppManager.showSimpleMessage('danger', { message: error, description: '' })
    }

    function requestDeleteAsset() {
        AppManager.showLoader()
        dispatch(DeviceActions.requestDeleteAssetByAssetId(user_id, item.id, onAssetDeleteSucccess, onAssetDeleteError))
    }

    function onAssetDeleteSucccess(data) {
        AppManager.hideLoader()
        AppManager.showSimpleMessage('success', { message: 'Asset deleted successfully', description: '' })
    }

    function onAssetDeleteError(error) {
        AppManager.hideLoader()
        AppManager.showSimpleMessage('danger', { message: error, description: '' })
    }

    function hideDeleteAssetConfirmationDialog() {
        setIsDeleteConfirmationDialog(false)
    }

    function showDeleteAssetConfirmationDialog() {
        setIsDeleteConfirmationDialog(true)
    }

    function onTapConfirm() {
        hideDeleteAssetConfirmationDialog()
        requestDeleteAsset()
    }

    function renderDeleteConfirmationDialog() {
        return (
            <DeleteConfirmationDialog 
                isVisible={isDeleteConfirmationDialogVisible}
                onTapConfirm={() => onTapConfirm()}
                onTapClose={() => hideDeleteAssetConfirmationDialog()}
                onSwipeComplete={() => hideDeleteAssetConfirmationDialog()}
            />
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={[styles.blueCard, { backgroundColor: (index == editClick) ? ColorConstant.ORANGE : ColorConstant.BLUE }]} />
                <View style={styles.whiteCard}>
                    <Text style={{ flex: 1, color: (index == editClick) ? ColorConstant.BLUE : ColorConstant.BLACK }}>{assetName}</Text>
                    <TouchableOpacity onPress={() => {
                        (index == editClick) ? setEditClick(-1) : setEditClick(index)
                    }} style={{ marginRight: hp(2) }}>
                        {(index == editClick) ? <DeviceAssetEditIconClicked width={16.93} height={17.011}/> : <DeviceAssetEditIcon width={16.93} height={17.011}/>}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => showDeleteAssetConfirmationDialog()} >
                        <TrashIcon width={17.567} height={19.547}/>
                    </TouchableOpacity>
                </View>
            </View>
            {(index == editClick) ?
                popUp() : null}
            {renderDeleteConfirmationDialog()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    card: {
        //paddingHorizontal:hp(2),
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent:'space-between',
        width: '85%',
        height: hp(6),
        borderRadius: 12,
        marginVertical: hp(2),
        elevation: 4,
        shadowColor: ColorConstant.GREY,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 3,
        shadowOpacity: 1,
        backgroundColor: ColorConstant.WHITE
    },
    blueCard: {
        height: hp(6),
        width: wp(6),
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        //width:'75%',
        //margin:hp(3),
        marginTop: hp(3),
        alignItems: 'center'
    },
    whiteCard: {
        flexDirection: 'row',
        paddingHorizontal: hp(2),
        alignItems: 'center',
        width: '90%'
    },
})

export default AssteItem