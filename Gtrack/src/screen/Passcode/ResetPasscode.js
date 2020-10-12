import React, { Component, useState } from 'react'
import { View, Image, StyleSheet, Text, ImageBackground, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import images from '../../constants/images'
import { useDispatch, useSelector } from 'react-redux'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize'
import NavigationService from '../../navigation/NavigationService'
import CustomButton from '../../component/Button'
import { EditText } from '../../component'
import _ from 'lodash'
import { AppConstants } from '../../constants/AppConstants'
import AppManager from '../../constants/AppManager'
import * as LoginActions from '../Login/Login.Action'
import { validateEmailorPhoneNumber } from '../../utils/helper'

const ResetPasscode = () => {
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()

    const { isConnected } = useSelector(state => ({
        isConnected: state.network.isConnected,
    }))

    function onTapReset() {
        if (isConnected) {
            if (!validateEmailorPhoneNumber(email)) {        
                AppManager.showSimpleMessage('warning', { message:  AppConstants.INVALID_EMAIL_OR_PHONE, description: '', floating: true })
            } else {
                AppManager.showLoader()
                const requestBody = {
                    "emailOrPhone": email.toString(),
                }
                dispatch(LoginActions.requestResetPassword(requestBody, onSuccess, onError))
            }
        }
    }
    function onSuccess(data) {
        AppManager.hideLoader()
        console.log("Success",data)
        AppManager.showSimpleMessage('warning', { message:data.message, description: '', floating: true })
        NavigationService.navigate('Passcode')
    }

    function onError(error) {
        AppManager.hideLoader()
        if(error){
        AppManager.showSimpleMessage('warning', { message:error, description: '', floating: true })
        }
    }
    return (
        <ImageBackground style={styles.backgroundImage} source={images.image.splash} resizeMode={'stretch'}>
            <View style={styles.container}>
                <Image source={images.image.defaultlogo} />
                <View style={styles.headingMainStyle}>
                    <Text style={styles.headingTextStyle}>Reset your Passcode</Text>
                </View>

                <EditText
                    value={email}
                    onChangeText={(value) => { setEmail(value) }}
                    placeholder='Email Address/Mobile Number'
                    style={styles.emailTextStyle}
                />

                <CustomButton
                    title="Reset"        
                    onPress={() => onTapReset()}
                    style={styles.button}
                    textStyle={styles.buttonTextStyle}
                />

                <View style={styles.LoginIntoMainView}>
                    <Text style={styles.LoginIntoTextView}>Login into Existing Account   </Text>
                    <TouchableOpacity style={styles.subContainer} onPress={() => NavigationService.navigate('Login')}>
                        <Image source={images.image.login} />
                    </TouchableOpacity>

                </View>

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
        justifyContent:'center',
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
        fontFamily:'Nunito-Bold',
        textAlign: 'center'
    },
    emailTextStyle: {
        fontSize: FontSize.FontSize.small,
        paddingHorizontal: hp(1.5),
        alignItems: 'center'
    },
    button: {
        width: '100%',
        height:hp(5.5),
        marginTop: hp(2)
    },
    buttonTextStyle: {
        fontSize: FontSize.FontSize.medium, 
        fontWeight: '500'
    },
    LoginIntoMainView: {
        flexDirection: 'row', 
        marginTop: hp(5)
    },
    LoginIntoTextView: {
        color: ColorConstant.WHITE, 
        //fontWeight: 'bold',
        fontSize: FontSize.FontSize.medium,
        fontFamily:'Nunito-Bold'
    },
    subContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default ResetPasscode