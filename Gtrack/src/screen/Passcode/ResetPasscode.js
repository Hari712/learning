import React, { Component, useState } from 'react'
import { View, Image, StyleSheet, Text, ImageBackground, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import images from '../../constants/images'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize'
import NavigationService from '../../navigation/NavigationService'
import CustomButton from '../../component/Button'
import { EditText } from '../../component'

const ResetPasscode = () => {
    const [email, setEmail] = useState('')
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
                    onPress={() => NavigationService.navigate('Passcode')}
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