import React, { Component, useState } from 'react'
import { View, Image, StyleSheet, Text, ImageBackground, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import images from '../../constants/images'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize'
import NavigationService from '../../navigation/NavigationService'
import { EditText } from '../../component'
import CustomButton from '../../component/Button'
import CheckBox from 'react-native-check-box'

const Login = () => {

    const [email, setEmail] = useState('')
    const [passcode, setPasscode] = useState('')
    const [isSelected, setIsSelected] = useState(false)


    return (
        <ImageBackground style={styles.backgroundImage} source={images.image.splash} resizeMode={'stretch'}>
            <View style={styles.container}>
                <Image source={images.image.defaultlogo} />
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

                <View style={styles.checkboxMainStyle}>
                    <CheckBox
                        style={{}}
                        unCheckedImage={<Image source={images.image.checkbox}></Image>}
                        checkedImage={<Image source={images.image.checkedbox}></Image>}
                        onClick={() => { setIsSelected(!isSelected) }}
                        isChecked={isSelected}
                    />
                    <Text style={styles.checkboxText}>Keep me logged in</Text>
                </View>

                <CustomButton 
                    title="Login" 
                    onPress={() => NavigationService.navigate('LiveTracking')} 
                    style={styles.button} 
                    textStyle={styles.buttonTextStyle}
                />

                <TouchableOpacity style={styles.subContainer} onPress={() => NavigationService.navigate('ResetPasscode')}>
                    <Text style={styles.resetText}>Reset Passcode</Text>
                </TouchableOpacity>

            </View>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
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
        fontWeight: 'bold',
        letterSpacing: wp(1),
        textAlign: 'center'
    },
    passcodeText: {
        paddingHorizontal: hp(1.5),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    checkboxMainStyle: {
        width: wp(75),
        margin: hp(1.5),
        flexDirection: 'row'
    },
    checkboxText: {
        color: ColorConstant.WHITE,
        fontSize: FontSize.FontSize.medium,
        marginLeft: wp(3)
    },
    button: {
        width:wp(75),
        height:hp(5.5),
        marginTop: hp(3)
    },
    buttonTextStyle: {
        fontSize: FontSize.FontSize.medium, 
        fontWeight: '500'
    },
    backgroundImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height
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
        marginTop: hp(3)
    },
    inputTextStyle: {
        borderRadius: 6,
        paddingHorizontal: hp(2),
        backgroundColor: ColorConstant.WHITE,
        width: '75%',
        margin: hp(1.5),
        color: 'black',
    },
})

export default Login;