import React, { Component, useState } from 'react'
import { View, Image, StyleSheet, Text, ImageBackground, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import images from '../../constants/images'
import { useDispatch, useSelector } from 'react-redux'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import isEmpty from 'lodash/isEmpty'
import NavigationService from '../../navigation/NavigationService'
import { AppConstants, SCREEN_CONSTANTS } from '../../constants/AppConstants'
import { EditText, FontSize } from '../../component'
import * as LoginActions from '../Login/Login.Action'
import AppManager from '../../constants/AppManager'
import { translate } from '../../../App'
import { LoginWelcomeIcon } from '../../component/SvgComponent'


const Passcode = ({ navigation, route }) => {

    const dispatch = useDispatch()

    const { emailId } = route.params;

    const [passcode, setPasscode] = useState('')

    const { isConnected } = useSelector(state => ({
        isConnected: state.network.isConnected,
    }))

    function requestVerifyOTP() {
        if (isConnected) {
            let message = ''
            if (isEmpty(passcode)) {
                message = translate(AppConstants.EMPTY_OTP)
            }
            if (!isEmpty(message)) {
                AppManager.showSimpleMessage('warning', { message: message, description: '', floating: true })
            } else {
                AppManager.showLoader()
                const requestBody = {
                    userEmail: emailId,
                    otp: passcode
                }
                dispatch(LoginActions.requestVerifyOTP(requestBody, onVerifyOTPSuccess, onVerifyOTPError))
            }
        } else {
            AppManager.showNoInternetConnectivityError()
        }
    }

    function onVerifyOTPSuccess(data) {
        AppManager.hideLoader()
        console.log("Success data", data)
        NavigationService.navigate(SCREEN_CONSTANTS.CHANGE_PASSCODE, { emailId: emailId })
    }

    function onVerifyOTPError(error) {
        AppManager.hideLoader()
        console.log("Error", error)
        if (error) {
            AppManager.showSimpleMessage('warning', { message: error, description: '', floating: true })
        }
    }

    return (
        <ImageBackground style={styles.backgroundImage} source={images.image.splash} resizeMode={'stretch'}>
            <View style={styles.container}>
                <LoginWelcomeIcon />
                <View style={styles.subContainer}>
                    <Text style={styles.resetEmailText}>{translate("Passcode_string1")}</Text>
                    <Text style={styles.textStyle}>{translate("Passcode_string2")}</Text>
                    <Text style={[styles.textStyle, { color: ColorConstant.ORANGE }]}>{emailId}</Text>
                </View>

                <EditText
                    passcode style={styles.passcode}
                    value={passcode}
                    onChangeText={(value) => setPasscode(value)}
                    placeholder={translate("Passcode_string3")}
                />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.cancelButton]}>
                        <Text style={styles.buttonTextColor}>{translate("Cancel")}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => requestVerifyOTP()}
                        style={styles.LoginButton}>
                        <Text style={styles.LoginButtonText}>{translate("Submit")}</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: hp(6)
    },
    subContainer: {
        marginVertical: hp(3),
        width: '100%'
    },
    resetEmailText: {
        color: ColorConstant.WHITE,
        fontSize: FontSize.FontSize.medium,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: hp(1),
        fontFamily: 'Nunito-Bold',
        textAlign: 'center',
    },
    textStyle: {
        color: ColorConstant.WHITE,
        fontSize: FontSize.FontSize.small,
        //fontWeight: '500',
        fontFamily: 'Nunito-SemiBold',
        textAlign: 'center',
        marginTop: hp(1)
    },
    passcode: {
        paddingHorizontal: hp(1.5),
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp(0.5),
        justifyContent: 'space-between'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: hp(2),
        alignItems: 'center'
    },
    cancelButton: {
        borderRadius: 6,
        width: '42%',
        height: hp(6),
        justifyContent: 'center',
        backgroundColor: ColorConstant.WHITE,
    },
    buttonTextColor: {
        textAlign: 'center',
        color: ColorConstant.ORANGE
    },
    LoginButton: {
        borderRadius: 6,
        backgroundColor: ColorConstant.ORANGE,
        width: '42%',
        height: hp(6),
        justifyContent: 'center'
    },
    LoginButtonText: {
        textAlign: 'center',
        color: ColorConstant.WHITE
    },
    backgroundImage: {
        flex: 1
    },
})
export default Passcode