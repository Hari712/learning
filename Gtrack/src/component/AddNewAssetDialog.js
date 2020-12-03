import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import Modal from 'react-native-modal'
import TextField from './TextField'
import DropDown from './DropDown'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from './FontSize'
import { ColorConstant } from '../constants/ColorConstants'
import images from '../constants/images'
import { translate } from '../../App'

function AddNewAssetDialog(props) {
    const { isVisible, onSwipeComplete, onTapClose } = props

    const [assetname, setAssetName] = useState('')
    const [assetType, setAssetType] = useState('')
    const [assetDescription, setAssetDescription] = useState('')

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
                    <Text style={styles.headerTitle}>{translate("Add_New_Asset")}</Text>
                    <View style={styles.closeButton}>
                        <TouchableOpacity onPress={() => onCancelDialog()}>
                            <Image style={{ width: hp(1.5), height: hp(1.5) }} source={images.geoFence.CrossBlack} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TextField
                    valueSet={setAssetName}
                    label={translate("Asset Name")}
                    value={assetname}
                    onChangeText={(text) => setAssetName(text)}
                    style={styles.textNameStyle}
                    labelFontSize={hp(1.4)}
                    labelTextStyle={{ top: hp(0.3) }}
                    contentInset={{ label: hp(-0.5) }}
                    inputContainerStyle={styles.inputContainer}
                    outerStyle={{ marginBottom: hp(0.5) }}
                />
                <DropDown
                    defaultValue={assetType}
                    label={translate("Type_star")}
                    valueSet={setAssetType}
                    dataList={['abc', 'cde', 'def', 'rock']}
                    contentInset={{ label: hp(-0.2) }}
                    inputContainerStyle={styles.inputContainer}
                    accessoryStyle={{ top: hp(0.9) }}
                    outerStyle={{ marginBottom: hp(0.5) }}
                />
                <TextField
                    valueSet={setAssetDescription}
                    multiline={true}
                    label= {translate("Edit_Device_Asset_string5")}
                    value={assetDescription}
                    onChangeText={(text) => setAssetDescription(text)}
                    labelFontSize={hp(1.4)}
                    labelTextStyle={{ top: hp(-0.2) }}
                    multiline={true}
                    contentInset={{ input: 7 }}
                    outerStyle={{ marginBottom: hp(0) }}
                />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonTitle}>{translate("Create_Assign")}</Text>
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