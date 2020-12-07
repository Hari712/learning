import React, { Component, useState, useEffect } from 'react'
import { View, Image, StyleSheet, Text, ImageBackground, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import images from '../../constants/images'
import { useDispatch, useSelector } from 'react-redux'
import { ColorConstant } from '../../constants/ColorConstants'
import { AppConstants } from '../../constants/AppConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import NavigationService from '../../navigation/NavigationService'
import { validateEmailorPhoneNumber } from '../../utils/helper'
import AppManager from '../../constants/AppManager'
import { EditText, CustomButton, FontSize } from '../../component'
import CheckBox from 'react-native-check-box'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { storeItem } from '../../utils/storage'
import { USER_DATA } from '../../constants/AppConstants'
import _ from 'lodash'
import * as LoginActions from './Login.Action'
import * as SettingsActions from '../Settings/Settings.Action'
import DeviceInfo from 'react-native-device-info';
import { translate } from '../../../App'
import * as DeviceActions from '../DeviceSetup/Device.Action'


const Login = () => {

    const dispatch = useDispatch()

    const { isConnected } = useSelector(state => ({
        isConnected: state.network.isConnected,
    }))

    const [email, setEmail] = useState('Khushbu.solanki+3@ekzero.com')
    const [password, setPassword] = useState('Khushi@1234')
    const [isSelected, setIsSelected] = useState(false)
    const [isClickInfo, setIsClickInfo] = useState(false)

    function onTapLoginButton() {
        if (isConnected) {
            let message = ''
            if (_.isEmpty(email)) {
                message = translate(AppConstants.EMPTY_EMAIL_OR_PHONE)
            }
            else if (!validateEmailorPhoneNumber(email)) {
                message = translate(AppConstants.INVALID_EMAIL_OR_PHONE)
            }
            else if (_.isEmpty(password)) {
                message = translate(AppConstants.EMPTY_PASSWORD)
            }
            if (!_.isEmpty(message)) {
                AppManager.showSimpleMessage('warning', { message: message, description: '', floating: true })
            } else {
                AppManager.showLoader()
                const requestBody = {
                    emailOrPhone: email,
                    password: password
                }
                dispatch(LoginActions.requestLogin(requestBody, onLoginSuccess, onLoginError))
            }
        } else {
            AppManager.showNoInternetConnectivityError()
        }
    }

    function onLoginSuccess(data) {
        console.log("Success data", data)
        AppManager.hideLoader()
        storeItem(USER_DATA, data)
        let deviceType = DeviceInfo.getSystemName();
        let version = DeviceInfo.getVersion();
        dispatch(SettingsActions.requestGetFeedBack(data.userDTO.id, version, deviceType, onFeedbackSuccess, onFeedbackError))
        dispatch(DeviceActions.requestGetAllAssetsType(data.userDTO.id, onAssetTypeLoadedSuccess, onAssetTypeLoadedErrror))
        dispatch(DeviceActions.requestGetAllUserAssets(data.userDTO.id, onUserAssetListLoadedSuccess, onUserAssetListLoadedError))
        dispatch(DeviceActions.requestGetAllUserGroups(data.userDTO.id, onGetAllUserGroupsSuccess, onGetAllUserGroupError))
    }

    function onGetAllUserGroupsSuccess(data) {
        console.log('Group List Loaded Success')
    }
    
    function onGetAllUserGroupError(error) {
        console.log('Group List Loaded Error')
    }

    function onUserAssetListLoadedSuccess(data) {
        console.log('Asset List Loaded Success')
    }

    function onUserAssetListLoadedError(error) {
        console.log('Asset List Loaded Error')
    }

    function onAssetTypeLoadedSuccess(data) {
        console.log('Asset Type Loaded Success')
    }

    function onAssetTypeLoadedErrror(error) {
        console.log('Asset Type Loaded error', error)
    }

    function onFeedbackSuccess(data) {
        console.log("Success Feedback", data)
        AppManager.hideLoader()
    }

    function onFeedbackError(error) {
        console.log("Error Feedback", error)
    }

    function onLoginError(error) {
        AppManager.hideLoader()
        console.log("Error", error)
        if (error) {
            AppManager.showSimpleMessage('warning', { message: error, description: '', floating: true })
        }
    }

    function navigateToResetPasscode() {
        NavigationService.navigate('ResetPasscode')
    }

    return (
        <ImageBackground style={styles.backgroundImage} source={images.image.splash} resizeMode={'stretch'}>
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                automaticallyAdjustContentInsets={false}
                keyboardShouldPersistTaps='handled'
                enableOnAndroid={false}
                scrollEnabled={false}>

                <View style={styles.container}>
                    <Image source={images.image.defaultlogo} style={styles.imageStyle} />
                    <View style={styles.subContner}>
                        <Text style={styles.welcomeText}>{translate("Login_string1")}</Text>
                    </View>

                    <EditText
                        value={email}
                        onChangeText={(value) => { setEmail(value) }}
                        placeholder={translate("Login_string2")}
                        rightContainer={
                            <TouchableOpacity onPress={() => setIsClickInfo(!isClickInfo)} style={{ width: wp(3), zIndex: 1 }}>
                                <Image source={isClickInfo ? images.login.infoClick : images.login.info} />
                            </TouchableOpacity>
                        }
                        style={{ paddingHorizontal: hp(1.5), alignItems: 'center' }}
                    />
                    {isClickInfo ?
                        <View style={styles.infoPopup}>
                            <Text style={styles.infoText}>{translate("Login_string6")}</Text>
                        </View>
                        : null}


                    <EditText
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                        placeholder={translate("Login_string4")}
                        passcode style={styles.passcodeText}
                    />

                    <CustomButton
                        title={translate("Login")}
                        onPress={() => onTapLoginButton()}
                        style={styles.button}
                        textStyle={styles.buttonTextStyle}
                    />

                    <TouchableOpacity style={styles.subContainer} onPress={() => navigateToResetPasscode()}>
                        <Text style={styles.resetText}>{translate("Login_string5")}</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </ImageBackground>


    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
    },
    container: {
        flex: 1,
        marginTop: hp(20),
        alignItems: 'center',
        paddingHorizontal: hp(6)
    },
    subContner: {
        margin: hp(3),
        width: wp(75)
    },
    welcomeText: {
        color: ColorConstant.WHITE,
        fontSize: FontSize.FontSize.regular,
        //fontWeight: 'bold',
        fontFamily: 'Nunito-Bold',
        letterSpacing: wp(1),
        textAlign: 'center'
    },
    passcodeText: {
        paddingHorizontal: hp(1.5),
        flexDirection: 'row',
        alignItems: 'center',
        color: 'red',
        justifyContent: 'space-between',
    },
    button: {
        width: '100%',
        height: hp(5.5),
        marginTop: hp(3)
    },
    buttonTextStyle: {
        fontSize: FontSize.FontSize.medium,
        fontWeight: '500'
    },
    subContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    resetText: {
        color: ColorConstant.WHITE,
        fontSize: FontSize.FontSize.small,
        fontWeight: '500',
        marginTop: hp(3),
        fontFamily: 'Nunito-SemiBold'
    },
    infoPopup: {
        borderRadius: 7,
        paddingVertical: hp(0.5),
        paddingLeft: hp(2),
        backgroundColor: ColorConstant.TRANSPARENT,
        width: '100%',
        borderColor: ColorConstant.WHITE,
        borderWidth: 1,
        marginBottom: hp(2.5),
    },
    infoText: {
        fontSize: FontSize.FontSize.small,
        color: ColorConstant.WHITE,
        fontFamily: 'Nunito-LightItalic'
    }
})

export default Login;