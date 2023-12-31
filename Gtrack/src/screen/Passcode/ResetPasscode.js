import React, { Component, useState } from 'react'
import { View, Image, StyleSheet, Text, ImageBackground, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import images from '../../constants/images'
import { useDispatch, useSelector } from 'react-redux'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import NavigationService from '../../navigation/NavigationService'
import { EditText, CustomButton, FontSize } from '../../component'
import { AppConstants, SCREEN_CONSTANTS } from '../../constants/AppConstants'
import AppManager from '../../constants/AppManager'
import * as LoginActions from '../Login/Login.Action'
import { validateEmailorPhoneNumber } from '../../utils/helper'
import { translate } from '../../../App'
import { LoginIcon, LoginWelcomeIcon } from '../../component/SvgComponent'
import isEmpty from 'lodash/isEmpty';

const ResetPasscode = () => {
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()

    const { isConnected } = useSelector(state => ({
        isConnected: state.network.isConnected,
    }))

    function onTapReset() {
        let emailStr = String(email).trim().toLowerCase()
        if (isConnected) {
            let message = '';
            if (isEmpty(emailStr)) {
                message = translate(AppConstants.EMPTY_EMAIL_OR_PHONE);
            } else if (!validateEmailorPhoneNumber(emailStr)) {
                message = translate(AppConstants.INVALID_EMAIL_OR_PHONE);
                // AppManager.showSimpleMessage('warning', { message: translate(AppConstants.INVALID_EMAIL_OR_PHONE), description: '', floating: true })
            }

            if (!isEmpty(message)) {
                AppManager.showSimpleMessage('warning', { message: message, description: '', floating: true });
            } else {
                AppManager.showLoader()
                const requestBody = {
                    "emailOrPhone": email.toString(),
                }
                dispatch(LoginActions.requestGetOTP(requestBody, onSuccess, onError))
            }
        } else {
            AppManager.showNoInternetConnectivityError()
        }
    }
    function onSuccess(data) {
        AppManager.hideLoader()
        console.log("Success", data)
        AppManager.showSimpleMessage('warning', { message: data.message, description: '', floating: true })
        NavigationService.navigate(SCREEN_CONSTANTS.PASSCODE, { emailId: email })
    }

    function onError(error) {
        AppManager.hideLoader()
        if (error) {
            AppManager.showSimpleMessage('warning', { message: error, description: '', floating: true })
        }
    }
    return (
        <ImageBackground style={styles.backgroundImage} source={images.image.splash} resizeMode={'stretch'}>
            <View style={styles.container}>
                <LoginWelcomeIcon />
                <View style={styles.headingMainStyle}>
                    <Text style={styles.headingTextStyle}>{translate("Reset_Passcode_string1")}</Text>
                </View>

                <EditText
                    value={email}
                    onChangeText={(value) => { setEmail(value) }}
                    placeholder={translate("Login_string2")}
                    style={styles.emailTextStyle}
                />

                <CustomButton
                    title="Reset"
                    onPress={() => onTapReset()}
                    style={styles.button}
                    textStyle={styles.buttonTextStyle}
                />

                <TouchableOpacity style={styles.LoginIntoMainView} onPress={() => NavigationService.navigate(SCREEN_CONSTANTS.LOGIN)}>
                    <Text style={styles.LoginIntoTextView}>{translate("Reset_Passcode_string3")}  </Text>
                    <LoginIcon width={hp(2.3)} height={hp(2.3)} />
                    {/* <Image source={images.image.login} /> */}
                </TouchableOpacity>

            </View>

        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: hp(6)
    },
    headingMainStyle: {
        marginVertical: hp(3),
        width: wp(75)
    },
    headingTextStyle: {
        color: ColorConstant.WHITE,
        fontSize: FontSize.FontSize.medium,
        fontFamily: 'Nunito-Bold',
        textAlign: 'center'
    },
    emailTextStyle: {
        fontSize: FontSize.FontSize.small,
        paddingHorizontal: hp(1.5),
        alignItems: 'center'
    },
    button: {
        width: '100%',
        height: hp(5.5),
        marginTop: hp(2)
    },
    buttonTextStyle: {
        fontSize: FontSize.FontSize.medium,
        fontWeight: '500'
    },
    LoginIntoMainView: {
        flexDirection: 'row',
        marginTop: hp(5),
        alignItems: 'center'
    },
    LoginIntoTextView: {
        color: ColorConstant.WHITE,
        //fontWeight: 'bold',
        fontSize: FontSize.FontSize.medium,
        fontFamily: 'Nunito-SemiBold',
    },
})

export default ResetPasscode