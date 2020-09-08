import React, {Component} from 'react'
import { View, Image, StyleSheet, Text, ImageBackground, Dimensions, TouchableOpacity } from 'react-native'
import images from '../../constants/images'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import NavigationService from '../../navigation/NavigationService'
import CustomButton from '../../component/Button'
import FontSize from '../../component/FontSize'

const Splash = (navigation) => {
    return ( 
        <View style={styles.container}>
            <ImageBackground style={styles.backgroundImage} source={images.image.splash} resizeMode={'stretch'}>

                <Image style={styles.imageStyle} source={images.image.logo}/>

                    <View style={styles.mainViewStyle}>
                        <View style={styles.viewStyle}>
                            <Text style={styles.textStyle}> Already have an account ? </Text>
                            <TouchableOpacity onPress={() => NavigationService.navigate('Login')}>
                                <Text style={styles.loginTextStyle}>Log In</Text>
                            </TouchableOpacity>
                        </View>

                        <CustomButton
                            title='Get Started' 
                            style={styles.buttonStyle}
                            textStyle={styles.buttonTextStyle}
                            onPress={() => NavigationService.navigate('SignUp')} 
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
        alignContent:'center', 
        alignItems:'center', 
        width:wp(100)
    },
    viewStyle: {
        flexDirection:'row', 
        marginBottom:hp(2)
    },
    textStyle: {
        color:ColorConstant.WHITE,
        fontSize: hp(2.2),
        fontWeight: 'bold'
    },
    loginTextStyle: {
        color:ColorConstant.ORANGE,
        fontSize: hp(2.2),
        fontWeight:'bold'
    },
    buttonStyle: {
        width:wp(80),
        height:hp(5.5),
    },
    buttonTextStyle: {
        fontSize: FontSize.FontSize.regular, 
        fontWeight: 'bold'
    }
})

export default Splash;