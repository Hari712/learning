import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Modal from 'react-native-modal'
import FontSize from './FontSize'
import { ColorConstant } from '../constants/ColorConstants'
import { CloseIcon, ConfirmationDeleteIcon } from '../component/SvgComponent'


const LogoutConfirmationDialog = (props) => {

    const { isVisible, onSwipeComplete, onTapClose, onTapConfirm, text = 'Are you sure you really want to logout from app?' } = props

    function hideDialog() {
        onTapClose && onTapClose()
    }

    function onConfirm() {
        onTapConfirm && onTapConfirm()
    }

    function renderBody() {
        return (
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <ConfirmationDeleteIcon height={hp(10)} />
                </View>
                <TouchableOpacity style={styles.closeIcon} onPress={() => hideDialog()}>
                    <CloseIcon height={hp(5)} />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{text}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonNo} onPress={() => hideDialog()}>
                        <Text style={styles.textNo}>No</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonYes} onPress={() => onConfirm()}>
                        <Text style={styles.textYes}>Yes</Text>
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
    iconContainer: {
        width: '100%', justifyContent: 'center', alignItems: 'center', elevation: 4,
        shadowColor: ColorConstant.GREY,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 3,
        shadowOpacity: 1
    },
    closeIcon: {
        position: 'absolute',
        right: 10,
        top: 0
    },
    textContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: hp(4)
    },
    text: {
        color: ColorConstant.BLUE,
        fontSize: hp(1.8),
        fontWeight: '500',
        textAlign: 'center',
        lineHeight: 25
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: hp(3),
        marginTop: hp(3),
        justifyContent: 'space-between',
        marginBottom: hp(2)
    },
    buttonNo: {
        backgroundColor: ColorConstant.BLUE,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp(1),
        width: wp(30)
    },
    textNo: {
        color: ColorConstant.WHITE,
        fontSize: FontSize.FontSize.medium
    },
    buttonYes: {
        borderColor: ColorConstant.BLUE,
        borderWidth: 1.0,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp(1),
        width: wp(30)
    },
    textYes: {
        color: ColorConstant.BLUE,
        fontSize: FontSize.FontSize.medium
    }
})

export default LogoutConfirmationDialog