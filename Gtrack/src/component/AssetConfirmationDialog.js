import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import Modal from 'react-native-modal'
import TextField from './TextField'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from './FontSize'
import { ColorConstant } from '../constants/ColorConstants'
import images from '../constants/images'

const AssetConfirmationDialog = (props) => {

    const { isVisible, onSwipeComplete, onTapClose, onTapConfirm } = props

    function hideDialog() {
        setTimeout(() => onCancelDialog(), 200)
    }

    function onCancelDialog() {
        onTapClose && onTapClose()
    }

    // function onTapOkay() {
    //     onTapConfirm && onTapConfirm()
    // }

    function renderBody() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Are you sure ?</Text>
                    <View style={styles.closeButton}>
                        <TouchableOpacity onPress={() => onCancelDialog()}>
                            <Image style={{ width: hp(1.5), height: hp(1.5) }} source={images.geoFence.CrossBlack} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bodyContainer}>
                    <Text style={styles.bodyText}>Do you really want to attach asset ?</Text>
                    <Text style={[styles.bodyText, { marginTop: hp(1) }]}>It will get detach from the current device.</Text>
                </View>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => hideDialog()}>
                        <Text style={styles.buttonTitle}>Cancel</Text>
                    </TouchableOpacity> 
                    {/* <TouchableOpacity style={[styles.button, { backgroundColor: ColorConstant.BLUE }]} onPress={() => onTapOkay()}> */}
                    <TouchableOpacity style={[styles.button, { backgroundColor: ColorConstant.BLUE }]} onPress={() => onCancelDialog()}>
                        <Text style={[styles.buttonTitle, { color: ColorConstant.WHITE }]}>Okay</Text>
                    </TouchableOpacity>    
                </View>        
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
    closeButton: {
        position: 'absolute', 
        right: 0, 
        top: 3
    },
    headerText: { color: ColorConstant.ORANGE, fontSize: FontSize.FontSize.small, fontWeight: '600' },
    bodyContainer: {
        width: '100%', 
        marginTop: hp(2), 
        alignItems:'center'
    },
    bodyText: {
        color: ColorConstant.BLACK, 
        fontSize: hp(1.4), 
        fontWeight:'300'
    },
    bottomContainer: {
        width: '100%', 
        flexDirection:'row', 
        justifyContent:'space-between', 
        marginTop: hp(4), 
        paddingHorizontal: hp(2)
    },
    button: {
        borderColor: ColorConstant.BLUE, 
        borderRadius: hp(1.2), 
        borderWidth: 1.0, 
        width: wp(30), 
        height: hp(5), 
        alignItems:'center', 
        justifyContent:'center'
    },
    buttonTitle: { color: ColorConstant.BLUE, fontSize: FontSize.FontSize.small }
})

export default AssetConfirmationDialog