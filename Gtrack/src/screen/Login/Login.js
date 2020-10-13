import React, { Component, useState,useEffect } from 'react'
import { View, Image, StyleSheet, Text, ImageBackground, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import images from '../../constants/images'
import { useDispatch, useSelector } from 'react-redux'
import { ColorConstant } from '../../constants/ColorConstants'
import { AppConstants } from '../../constants/AppConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize'
import NavigationService from '../../navigation/NavigationService'
import { validateEmailorPhoneNumber } from '../../utils/helper'
import AppManager from '../../constants/AppManager'
import { EditText } from '../../component'
import CustomButton from '../../component/Button'
import CheckBox from 'react-native-check-box'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { storeItem } from '../../utils/storage'
import { USER_DATA } from '../../constants/AppConstants'
import _ from 'lodash'
import * as LoginActions from './Login.Action'


const Login = () => {
    
    const dispatch = useDispatch()

    const { isConnected } = useSelector(state => ({
        isConnected: state.network.isConnected,
    }))

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [isSelected, setIsSelected] = useState(false)
    const [isClickInfo,setIsClickInfo] = useState(false)

    function onTapLoginButton() {
        if (isConnected) {
            let message = ''
            if (_.isEmpty(email)) {
                message = AppConstants.EMPTY_EMAIL_OR_PHONE
            }
            // else if (!validateEmailorPhoneNumber(email)) {
            //     message = AppConstants.INVALID_EMAIL_OR_PHONE
            // }
            else if (_.isEmpty(password)) {
                message = AppConstants.EMPTY_PASSWORD
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
        AppManager.hideLoader()
        console.log("Success data",data)
        saveUserData(data)
        AppManager.showSimpleMessage('warning', { message:AppConstants.LOGIN_SUCCESS, description: '', floating: true })
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
        console.log("Error",error)
        if(error){
            AppManager.showSimpleMessage('warning', { message:error, description: '', floating: true })
        }
    }

    function navigateToLiveTracking() {
        NavigationService.navigate('LiveTracking')
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
                        <Text style={styles.welcomeText}>WELCOME!</Text>
                    </View>

                    <EditText
                        value={email}
                        onChangeText={(value) => { setEmail(value) }}
                        placeholder='Email Address/Mobile Number'
                        rightContainer={
                            <TouchableOpacity onPress={()=>setIsClickInfo(!isClickInfo)} style={{width:wp(3),zIndex:1}}>
                                <Image source={isClickInfo?images.login.infoClick:images.login.info} />
                            </TouchableOpacity>
                        }
                        style={{ paddingHorizontal: hp(1.5), alignItems: 'center' }}
                    /> 
                    {isClickInfo?
                        <View style={styles.infoPopup}>
                            <Text style={styles.infoText}>Enter mobile number without country code.</Text>
                        </View>
                    :null}                  
                    

                    <EditText
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                        placeholder='Passcode'
                        passcode style={styles.passcodeText}
                    />

                    <CustomButton
                        title="Login"
                        //onPress={() => navigateToLiveTracking()}
                        onPress={() => onTapLoginButton()}
                        style={styles.button}
                        textStyle={styles.buttonTextStyle}
                    />

                    <TouchableOpacity style={styles.subContainer} onPress={() => navigateToResetPasscode()}>
                        <Text style={styles.resetText}>Reset Passcode</Text>
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
        fontFamily:'Nunito-Bold',
        letterSpacing: wp(1),
        textAlign: 'center'
    },
    passcodeText: {
        paddingHorizontal: hp(1.5),
        flexDirection: 'row',
        alignItems: 'center',
        color:'red',
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
        fontFamily:'Nunito-SemiBold'
    },
    infoPopup: {
        borderRadius:7,
        paddingVertical:hp(0.5),
        paddingLeft:hp(2),
        backgroundColor:ColorConstant.TRANSPARENT,
        width:'100%',
        borderColor:ColorConstant.WHITE,
        borderWidth:1,
        marginBottom:hp(2.5),
    },
    infoText: {
        fontSize: FontSize.FontSize.small, 
        color:ColorConstant.WHITE,
        fontFamily:'Nunito-LightItalic'
    }
})

export default Login;