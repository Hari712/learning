import React, { Component, useState } from 'react'
import { View, Image, StyleSheet, Text, ImageBackground, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import images from '../../constants/images'
import { useDispatch, useSelector } from 'react-redux'
import { ColorConstant } from '../../constants/ColorConstants'
import { validatePassword } from '../../utils/helper'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { AppConstants } from '../../constants/AppConstants'
import AppManager from '../../constants/AppManager'
import _ from 'lodash'
import NavigationService from '../../navigation/NavigationService'
import { EditText, FontSize } from '../../component'
import * as LoginActions from '../Login/Login.Action'

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
            if (_.isEmpty(passcode)) {
                message = AppConstants.EMPTY_PASSWORD
            }
            else if (!validatePassword(passcode)) {
                message = AppConstants.INVALID_PASSWORD
            }
            else if (_.isEmpty(confirmpasscode)) {
                message = AppConstants.EMPTY_CONFIMR_PASSWORD
            }
            else if (!validatePassword(confirmpasscode)) {
                message = AppConstants.INVALID_PASSWORD
            }
            else if (!(passcode == confirmpasscode)) {
                message = AppConstants.PASSWORD_DOES_NOT_MATCH
            }
            if (!_.isEmpty(message)) {
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
        NavigationService.navigate('LiveTracking')
    }




    return (
        <ImageBackground style={styles.backgroundImage} source={images.image.splash} resizeMode={'stretch'}>
            <View style={styles.container}>
                <Image source={images.image.defaultlogo} />
                <View style={styles.subContainer}>
                    <Text style={styles.resetEmailText}>Set New Passcode</Text>
                    <Text style={[styles.textStyle, { color: ColorConstant.ORANGE }]}>{emailId}</Text>
                </View>

                <EditText
                    passcode style={styles.passcode}
                    value={passcode}
                    onChangeText={(value) => setPasscode(value)}
                    placeholder='Enter New Passcode'
                />

                <EditText
                    passcode style={styles.passcode}
                    value={confirmpasscode}
                    onChangeText={(value) => setConfirmPasscode(value)}
                    placeholder='Confirm New Passcode'
                />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                    }} style={[styles.cancelButton]}>
                        <Text style={styles.buttonTextColor}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => loginHandle()}
                        style={styles.LoginButton}>
                        <Text style={styles.LoginButtonText}>Login</Text>
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