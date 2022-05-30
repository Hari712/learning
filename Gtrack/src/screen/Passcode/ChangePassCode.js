import React, { Component, useState } from 'react'
import { View, Image, StyleSheet, Text, ImageBackground, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import images from '../../constants/images'
import { useDispatch, useSelector } from 'react-redux'
import { ColorConstant } from '../../constants/ColorConstants'
import { validatePassword } from '../../utils/helper'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { AppConstants, SCREEN_CONSTANTS } from '../../constants/AppConstants'
import AppManager from '../../constants/AppManager'
import isEmpty from "lodash/isEmpty"
import NavigationService from '../../navigation/NavigationService'
import { EditText, FontSize } from '../../component'
import * as LoginActions from '../Login/Login.Action'
import { translate } from '../../../App'

const ChangePasscode = ({ navigation, route }) => {

    const dispatch = useDispatch()

    const { emailId } = route.params;

    const [passcode, setPasscode] = useState('')
    const [confirmpasscode, setConfirmPasscode] = useState('')


    const { isConnected } = useSelector(state => ({
        isConnected: state.network.isConnected,
    }))

    function loginHandle() {
        if (isConnected) {
            let message = ''
            if (isEmpty(passcode)) {
                message = translate(AppConstants.EMPTY_PASSWORD)
            }
            else if (!validatePassword(passcode)) {
                message = translate(AppConstants.INVALID_PASSWORD)
            }
            else if (isEmpty(confirmpasscode)) {
                message = translate(AppConstants.EMPTY_CONFIRM_PASSWORD)
            }
            else if (!validatePassword(confirmpasscode)) {
                message = translate(AppConstants.INVALID_PASSWORD)
            }
            else if (!(passcode == confirmpasscode)) {
                message = translate(AppConstants.PASSWORD_DOES_NOT_MATCH)
            }
            if (!isEmpty(message)) {
                AppManager.showSimpleMessage('warning', { message: message, description: '', floating: true })
            } else {
                AppManager.showLoader()
                const requestBody = {
                    email: emailId,
                    password: passcode,
                    confirmPassword: confirmpasscode
                }
                dispatch(LoginActions.requestResetPasscode(requestBody, onResetPasscodeSuccess, onResetPasscodeError))
            }
        } else {
            AppManager.showNoInternetConnectivityError()
        }
    }

    function onResetPasscodeSuccess(data) {
        AppManager.hideLoader()
        console.log("Success data", data)
        AppManager.showSimpleMessage('success', { message: 'Password reset successfully. Please login to continue', description: '', floating: true })
        NavigationService.popToTop()
    }

    function onResetPasscodeError(error) {
        AppManager.hideLoader()
        console.log("Error", error)
        AppManager.showSimpleMessage('warning', { message: error, description: '', floating: true })
    }

    function onLoginSuccess(data) {
        AppManager.hideLoader()
        console.log("Success data", data)
        saveUserData(data)
        AppManager.showSimpleMessage('warning', { message: AppConstants.LOGIN_SUCCESS, description: '', floating: true })
        navigateToLiveTracking()

    }

    const saveUserData = async (data) => {
        try {
            const isSuccess = await storeItem(USER_DATA, data)
            if (isSuccess) {
                AppManager.hideLoader()
                dispatch(LoginActions.setLoginResponse(data))
            }
        } catch (error) {
            console.log(error)
        }
    }

    function onLoginError(error) {
        AppManager.hideLoader()
        console.log("Error", error)
        if (error) {
            AppManager.showSimpleMessage('warning', { message: error, description: '', floating: true })
        }
    }

    function navigateToLiveTracking() {
        NavigationService.navigate(SCREEN_CONSTANTS.CHANGE_PASSCODE)
    }




    return (
        <ImageBackground style={styles.backgroundImage} source={images.image.splash} resizeMode={'stretch'}>
            <View style={styles.container}>
                <Image source={images.image.defaultlogo} />
                <View style={styles.subContainer}>
                    <Text style={styles.resetEmailText}>{translate("Set Passcode")}</Text>
                    <Text style={[styles.textStyle, { color: ColorConstant.ORANGE }]}>{emailId}</Text>
                </View>

                <EditText
                    passcode style={styles.passcode}
                    value={passcode}
                    onChangeText={(value) => setPasscode(value)}
                    placeholder={translate("New Passcode")}
                />

                <EditText
                    passcode style={styles.passcode}
                    value={confirmpasscode}
                    onChangeText={(value) => setConfirmPasscode(value)}
                    placeholder={translate("Confirm Passcode")}
                />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                    }} style={[styles.cancelButton]}>
                        <Text style={styles.buttonTextColor}>{translate("Cancel")}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => loginHandle()}
                        style={styles.LoginButton}>
                        <Text style={styles.LoginButtonText}>{translate("Login")}</Text>
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
export default ChangePasscode