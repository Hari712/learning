import React, { useState } from 'react'
import { View, Image, StyleSheet, Text, ImageBackground, TouchableOpacity, Button, Linking } from 'react-native'
import images from '../../constants/images'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import NavigationService from '../../navigation/NavigationService'
import CustomButton from '../../component/Button'
import FontSize from '../../component/FontSize'
import { translate } from '../../../App'
import { SCREEN_CONSTANTS } from '../../constants/AppConstants'
import { GtrackIndiaLogo, GtrackIndiaLogoNew } from '../../component/SvgComponent'
import { Dialog } from 'react-native-simple-dialogs'

const GetStarted = (navigation) => {
    const [isUserSignup, setIsUserSignup] = useState(false)
    function onButtonPress() {
		setIsUserSignup(false)
	}
    const DialogToContactAdmin=()=>{
        console.log('DialogToContactAdminDialogToContactAdminDialogToContactAdmin',isUserSignup)
        return <Dialog
        visible={isUserSignup}
            // title={heading}
            titleStyle={styles.titleStyle}
            animationType='slide'
            dialogStyle={{ borderRadius: hp(2), backgroundColor: ColorConstant.WHITE }}
        >
            <View>

            <View style={styles.dialogTextView}>
            
            <Text style={styles.messageStyle}>Contact</Text>
                        <TouchableOpacity onPress={() => Linking.openURL('mailto:connect@gtrackindia.com') }>
                        <Text style={[styles.messageStyle,{color: ColorConstant.ORANGE,}]}> connect@gtrackindia.com</Text>
                        </TouchableOpacity>
                        <Text style={styles.messageStyle}> for signup.</Text>
                    </View>
            

                <View style={{  height: hp(5), alignItems: 'center',justifyContent:'center' }}>
                    {/* <TouchableOpacity style={{ width: wp(30), margin: hp(2), backgroundColor: ColorConstant.WHITE, borderRadius: 4, borderWidth: 1, borderColor: ColorConstant.BLUE, height: hp(5) }} onPress={onButtonPress}>
                        <Text style={{ color: ColorConstant.BLUE, textAlign: 'center', fontFamily: 'Nunito-Bold', paddingVertical: hp(1), height: hp(5),  fontSize: FontSize.FontSize.medium }}>
                          Cancel
                        </Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={{ width: wp(30), margin: hp(2), backgroundColor: ColorConstant.BLUE, borderRadius: 4, color: ColorConstant.WHITE }} onPress={onButtonPress} >
                        <Text style={{ color: ColorConstant.WHITE, textAlign: 'center', fontFamily: 'Nunito-Bold', paddingVertical: hp(1), height: hp(5),fontSize: FontSize.FontSize.medium }}>
                           Okay
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </Dialog>
    }
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.backgroundImage} source={images.image.splash} resizeMode={'stretch'}>

                {/* <GtrackIndiaLogo/> */}
                <GtrackIndiaLogo style={styles.imageStyle} />
                {/* <Image style={styles.imageStyle} source={images.image.logo}/> */}

                <View style={styles.mainViewStyle}>
                    <View style={styles.viewStyle}>
                        <Text style={styles.textStyle}> {translate("Splash_string4")} </Text>
                        <TouchableOpacity onPress={() => {setIsUserSignup(true)}}>
                            <Text style={styles.loginTextStyle}>{translate("Splash_string5")}</Text>
                        </TouchableOpacity>
                    </View>

                    <CustomButton
                        title={translate("Splash_string2")}
                        style={styles.buttonStyle}
                        textStyle={styles.buttonTextStyle}
                        onPress={() =>  NavigationService.navigate(SCREEN_CONSTANTS.LOGIN)}
                    />

                </View>
               {DialogToContactAdmin()}
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    dialogTextView:{
        flexShrink: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: hp(2),
        flexWrap:'wrap'},
    backgroundImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    titleStyle: {
        color: ColorConstant.ORANGE,
        textAlign: 'center',
        fontSize: FontSize.FontSize.regular,
        fontWeight: 'bold'
    },
    messageStyle: {
        color: ColorConstant.BLACK,
        textAlign: 'center',
        fontSize: FontSize.FontSize.medium
    },
    buttonsStyle: {
        alignItems: 'center',
        marginBottom: hp(3)
    },
    imageStyle: {
        position: 'absolute',
        alignSelf: 'center'
    },
    mainViewStyle: {
        position: 'absolute',
        bottom: 20,
        //alignContent:'center', 
        alignItems: 'center',
        //width:wp(100)
    },
    viewStyle: {
        flexDirection: 'row',
        marginBottom: hp(2)
    },
    textStyle: {
        color: ColorConstant.WHITE,
        fontSize: hp(2.2),
        fontFamily: 'Nunito-Bold'
        //fontWeight: 'bold'
    },
    loginTextStyle: {
        color: ColorConstant.ORANGE,
        fontSize: hp(2.2),
        fontWeight: 'bold'
    },
    buttonStyle: {
        width: wp(80),
        height: hp(5.3),
    },
    buttonTextStyle: {
        fontSize: FontSize.FontSize.regular,
        fontWeight: '600',
        fontFamily: 'Nunito-Bold'
    }
})

export default GetStarted