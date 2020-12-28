import React from 'react'
import { View, Image, StyleSheet, Text, ImageBackground, TouchableOpacity } from 'react-native'
import images from '../../constants/images'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import NavigationService from '../../navigation/NavigationService'
import CustomButton from '../../component/Button'
import FontSize from '../../component/FontSize'
import { translate } from '../../../App'
import { SCREEN_CONSTANTS } from '../../constants/AppConstants'
import { GtrackLogoIcon } from '../../component/SvgComponent'

const GetStarted = (navigation) => {
    return ( 
        <View style={styles.container}>
            <ImageBackground style={styles.backgroundImage} source={images.image.splash} resizeMode={'stretch'}>

                <GtrackLogoIcon/>
                {/* <Image style={styles.imageStyle} source={images.image.logo}/> */}

                    <View style={styles.mainViewStyle}>
                        <View style={styles.viewStyle}>
                            <Text style={styles.textStyle}> {translate("Splash_string1")} </Text>
                            <TouchableOpacity onPress={() => NavigationService.navigate(SCREEN_CONSTANTS.LOGIN)}>
                                <Text style={styles.loginTextStyle}>{translate("Splash_string2")}</Text>
                            </TouchableOpacity>
                        </View>

                        <CustomButton
                            title={translate("Splash_string3")}
                            style={styles.buttonStyle}
                            textStyle={styles.buttonTextStyle}
                            onPress={() => NavigationService.navigate(SCREEN_CONSTANTS.SIGNUP)} 
                        />
                        
                    </View>

            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageStyle: {
        position:'absolute', 
        alignSelf:'center'
    },
    mainViewStyle: {
        position:'absolute', 
        bottom: 20, 
        //alignContent:'center', 
        alignItems:'center', 
        //width:wp(100)
    },
    viewStyle: {
        flexDirection:'row', 
        marginBottom:hp(2)
    },
    textStyle: {
        color:ColorConstant.WHITE,
        fontSize: hp(2.2),
        fontFamily:'Nunito-Bold'
        //fontWeight: 'bold'
    },
    loginTextStyle: {
        color:ColorConstant.ORANGE,
        fontSize: hp(2.2),
        fontWeight:'bold'
    },
    buttonStyle: {
        width:wp(80),
        height:hp(5.3),
    },
    buttonTextStyle: {
        fontSize: FontSize.FontSize.regular, 
        fontWeight: '600',
        fontFamily: 'Nunito-Bold'
    }
})

export default GetStarted