import React, { Component, useState } from 'react'
import { View, Image, StyleSheet, Text, ImageBackground, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import images from '../../constants/images'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize'
import NavigationService from '../../navigation/NavigationService'
import CustomButton from '../../component/Button'
import { EditText } from '../../component'
import CheckBox from 'react-native-check-box'

const SignUp = () => {
    const [isSelected, setIsSelected] = useState(false)
    return (

        <ImageBackground style={styles.backgroundImage} source={images.image.splash} resizeMode={'stretch'}>
            <View style={styles.container}>
                <Image source={images.image.defaultlogo} style={styles.imageStyle} />
                <View style={styles.textConatiner}>
                    <Text style={[styles.textStyle, { fontSize: FontSize.FontSize.regular, fontWeight: 'bold', lineHeight: hp(5) }]}>Hello there,</Text>
                    <Text style={styles.textStyle}>Enter your information below to </Text>
                    <Text style={styles.textStyle}>create your account</Text>
                </View>

                <EditText placeholder='First Name' style={{ fontSize: FontSize.FontSize.small }} />
                <EditText placeholder='Last Name' style={{ fontSize: FontSize.FontSize.small }} />
                <EditText placeholder='Email Address' style={{ fontSize: FontSize.FontSize.small }} />
                <EditText placeholder='Mobile Number' style={{ fontSize: FontSize.FontSize.small }} />

                <View style={styles.checkboxMainStyle}>
                    <CheckBox
                        style={{}}
                        unCheckedImage={<Image source={images.image.checkbox}></Image>}
                        checkedImage={<Image source={images.image.checkedbox}></Image>}
                        onClick={() => { setIsSelected(!isSelected) }}
                        isChecked={isSelected}
                    />
                    <Text style={styles.termsConditionStyle}>Terms & Condtions</Text>
                </View>

                <CustomButton 
                    title='Create an Account' 
                    style={styles.buttonStyle}
                    textStyle={styles.buttonTextStyle}
                    onPress={() => NavigationService.navigate('SignUp')} 
                />

                <View style={styles.bottomContainer}>
                    <Text style={styles.bottomText}>Already have an account ? </Text>
                    <TouchableOpacity style={styles.subContainer} onPress={() => NavigationService.navigate('Login')}>
                        <Text style={styles.bottomBtn}>Log In</Text>
                    </TouchableOpacity>
                </View>

            </View>

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
        marginTop: hp(12),
        alignItems: 'center',
        width: '100%'
    },
    imageStyle: {
        height: hp(10),
        resizeMode: 'contain'
    },
    textConatiner: {
        margin: hp(2),
        width: wp(75)
    },
    textStyle: {
        color: ColorConstant.WHITE,
        fontSize: FontSize.FontSize.small,
    },
    checkboxMainStyle: {
        flexDirection: 'row',
        width: wp(75),
        margin: hp(1.5),
    },
    termsConditionStyle: {
        color: ColorConstant.WHITE,
        fontWeight: 'bold',
        fontSize: hp(2.2),
        marginLeft: wp(3)
    },
    buttonStyle: {
        width:wp(75),
        height:hp(5.5),
        marginTop: hp(3)
    },
    buttonTextStyle: {
        fontSize: FontSize.FontSize.medium, 
        fontWeight: '500'
    },
    bottomContainer: {
        flexDirection: 'row',
        marginTop: hp(3)
    },
    bottomText: {
        color: ColorConstant.WHITE,
    },
    bottomBtn: {
        color: ColorConstant.ORANGE,
    },
})

export default SignUp;