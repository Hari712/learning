import React, { Component, useState } from 'react'
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
import _ from 'lodash'

const Login = () => {

    const { isConnected } = useSelector(state => ({
        isConnected: state.network.isConnected,
    }))

    const [email, setEmail] = useState('')
    const [passcode, setPasscode] = useState('')
    const [isSelected, setIsSelected] = useState(false)

    function onTapLoginButton() {
        if (isConnected) {
            let message = ''
            if (_.isEmpty(email)) {
                message = AppConstants.EMPTY_EMAIL_OR_PHONE
            }
            else if (!validateEmailorPhoneNumber(email)) {
                message = AppConstants.INVALID_EMAIL_OR_PHONE
            }
            else if (_.isEmpty(passcode)) {
                message = AppConstants.EMPTY_PASSWORD
            }
            if (!_.isEmpty(message)) {
                AppManager.showSimpleMessage('warning', { message: message, description: '', floating: true })
            } else {

            }
        } else {
            AppManager.showNoInternetConnectivityError()
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
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <Image source={images.image.defaultlogo} style={styles.imageStyle} />
                    <View style={styles.subContner}>
                        <Text style={styles.welcomeText}>WELCOME!</Text>
                    </View>

                    <EditText
                        value={email}
                        onChangeText={(value) => { setEmail(value) }}
                        placeholder='Email Address/Mobile Number'
                        style={{ fontSize: FontSize.FontSize.small, paddingHorizontal: hp(1.5), alignItems: 'center' }}
                    />

                    <EditText
                        value={passcode}
                        onChangeText={(value) => setPasscode(value)}
                        placeholder='Passcode'
                        passcode style={styles.passcodeText}
                    />

                    <CustomButton
                        title="Login"
                        onPress={() => navigateToLiveTracking()}
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
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height
    },
    container: {
        flex: 1,
        marginTop: hp(20),
        alignItems: 'center',
        width: '100%'
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
        // fontSize: FontSize.FontSize.small,
        // fontFamily:'Nunito-LightItalic',
        justifyContent: 'space-between',
    },
    button: {
        width: wp(75),
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
})

export default Login;