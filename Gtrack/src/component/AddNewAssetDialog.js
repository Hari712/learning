import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import Modal from 'react-native-modal'
import TextField from './TextField'
import DropDown from './DropDown'
import { useSelector, useDispatch } from 'react-redux'
import { AppConstants } from '../constants/AppConstants'
import { getAssetTypeListInfo, getLoginInfo } from '../screen/Selector'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from './FontSize'
import { ColorConstant } from '../constants/ColorConstants'
import images from '../constants/images'
import isEmpty from 'lodash/isEmpty'
import * as DeviceActions from '../screen/DeviceSetup/Device.Action'
import AppManager from '../constants/AppManager'

function AddNewAssetDialog(props) {

    const dispatch = useDispatch()

    const { isVisible, onSwipeComplete, onTapClose, onSubmit, deviceId } = props

    const { assetTypeList, isConnected, loginInfo } = useSelector(state => ({
        loginInfo: getLoginInfo(state),
        assetTypeList: getAssetTypeListInfo(state),
        isConnected: state.network.isConnected
    }))

    const user_id = loginInfo.id ? loginInfo.id : null
    const arrAssetTypeList = isEmpty(assetTypeList) ? [] : assetTypeList.map((item) => item.assetType)
    const [assetname, setAssetName] = useState('')
    const [assetType, setAssetType] = useState('')
    const [assetDescription, setAssetDescription] = useState('')

    const [assetNameError, setAssetNameError] = useState(null)
    const [assetTypeError, setAssetTypeError] = useState(null)


    useEffect(() => {
        if (assetNameError) {
            setAssetNameError(null)
        }
        
    },[assetname])

    useEffect(() => {
        if (assetTypeError) {
            setAssetNameError(null)
        }
    },[assetType])

    function onTapCreateAssign() {
        if (isEmpty(assetname)) {
            setAssetNameError(AppConstants.EMPTY_ASSET)
        }
        else if (isEmpty(assetType)) {
            setAssetTypeError(AppConstants.EMPTY_ASSET_TYPE)
        }
        else {
            let obj = {
                assetType: assetType,
                assetName: assetname,
                isQuickAdd: false
            }
            let requestBody = {
                assetDTO : obj
            }
            AppManager.showLoader()
            dispatch(DeviceActions.requestAddAsset(user_id, requestBody, onAddAssetSuccess, onAddAssetError))
        }
    }

    function onAddAssetSuccess(data) {
        AppManager.hideLoader()
        hideDialog()
    }

    function onAddAssetError(error) {
        AppManager.hideLoader()
        AppManager.showSimpleMessage('danger', { message: error, description: '', floating: true })
    }
    

    function hideDialog() {
        setTimeout(() => onCancelDialog(), 200)
    }

    function onCancelDialog() {
        onTapClose && onTapClose()
    }

    function renderBody() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Add New Asset</Text>
                    <View style={styles.closeButton}>
                        <TouchableOpacity onPress={() => onCancelDialog()}>
                            <Image style={{ width: hp(1.5), height: hp(1.5) }} source={images.geoFence.CrossBlack} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TextField
                    valueSet={setAssetName}
                    label='Asset Name*'
                    value={assetname}
                    onChangeText={(text) => setAssetName(text)}
                    style={styles.textNameStyle}
                    labelFontSize={hp(1.4)}
                    labelTextStyle={{ top: hp(0.3) }}
                    contentInset={{ label: hp(-0.5) }}
                    inputContainerStyle={styles.inputContainer}
                    outerStyle={{ marginBottom: hp(0.5) }}
                />
                {assetNameError ? <Text style={{ fontSize: FontSize.FontSize.small, color:'red', marginBottom: hp(1) }}>{assetNameError}</Text> : null}
                <View style={{ zIndex: 10 }}>
                <DropDown
                    defaultValue={assetType}
                    label='Type*'
                    valueSet={setAssetType}
                    dataList={arrAssetTypeList}
                    contentInset={{ label: hp(-0.2) }}
                    inputContainerStyle={styles.inputContainer}
                    accessoryStyle={{ top: hp(0.9) }}
                    outerStyle={{ marginBottom: hp(0.5), zIndex: 10 }}
                />
                </View>
                {assetTypeError ? <Text style={{ fontSize: FontSize.FontSize.small, color:'red', marginBottom: hp(1) }}>{assetTypeError}</Text> : null}
                <TextField
                    valueSet={setAssetDescription}
                    multiline={true}
                    label='Description (optional)'
                    value={assetDescription}
                    onChangeText={(text) => setAssetDescription(text)}
                    labelFontSize={hp(1.4)}
                    labelTextStyle={{ top: hp(-0.2) }}
                    multiline={true}
                    contentInset={{ input: 7 }}
                    outerStyle={{ marginBottom: hp(0) }}
                />
                <TouchableOpacity style={styles.button} onPress={() => onTapCreateAssign()}>
                    <Text style={styles.buttonTitle}>{`Create & Assign`}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <Modal
            testID={'modal'}
            isVisible={isVisible}
            onBackdropPress={() => hideDialog()}
            onSwipeComplete={() => onSwipeComplete()}
            swipeDirection={['down']}
            propagateSwipe={true}>
            {renderBody()}
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: hp(1.5),
        marginTop: hp(2),
        backgroundColor: 'white',
        paddingHorizontal: hp(2),
        borderRadius: hp(1)
    },
    header: {
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '100%', 
        marginBottom: hp(2)
    },
    headerTitle: {
        color: ColorConstant.ORANGE, 
        fontSize: FontSize.FontSize.small, 
        fontWeight: '600' 
    },
    closeButton: {
        position: 'absolute', 
        right: 0, 
        top: 3
    },
    textNameStyle: {
        color: ColorConstant.BLACK,
        fontSize: FontSize.FontSize.small,
        fontWeight: '500'
    },
    inputContainer: {
        height: hp(5),
        borderRadius: hp(5),
    },
    button: {
        width: '100%',
        backgroundColor: ColorConstant.BLUE,
        width: '100%',
        height: hp(5),
        borderRadius: hp(0.5),
        marginTop: hp(2),
        justifyContent: 'center',
        alignItems: "center",
        marginBottom: hp(2)
    },
    buttonTitle: { color: ColorConstant.WHITE, fontWeight: '600', fontSize: FontSize.FontSize.small }
})

export default AddNewAssetDialog