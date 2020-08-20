import React, {Component} from 'react'
import { View, Image, StyleSheet, Text, ImageBackground, Dimensions, TouchableOpacity, TextInput, CheckBox } from 'react-native'
import images from '../../constants/images'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize'

const Login = () => {
    return ( 
        <Text>Login Screen</Text>
              
        // <ImageBackground style={styles.backgroundImage} source={images.image.splash} resizeMode={'stretch'}>
        //     <View style={styles.container}>
        //         <Image style={{marginTop:hp(0.1)}} source={images.image.defaultlogo}/>
        //         <View style={{margin:hp(2),width:'75%'}}>
        //             <Text style={{color:ColorConstant.WHITE,fontSize:FontSize.FontSize.regular}}>Hello there,</Text>
        //             <Text style={{color:ColorConstant.WHITE,fontSize:FontSize.FontSize.small}}>Enter your information below to </Text>
        //             <Text style={{color:ColorConstant.WHITE,fontSize:FontSize.FontSize.small}}>create your account</Text>
        //         </View>
        //         <TextInput placeholder='First Name'  style={{borderRadius:6,backgroundColor:ColorConstant.WHITE,width:'75%',color:ColorConstant.GREY,fontStyle:'italic'}}></TextInput>
        //         <TextInput placeholder='Last Name'  style={{borderRadius:6,backgroundColor:ColorConstant.WHITE,width:'75%',marginTop:hp(3),color:ColorConstant.GREY,fontStyle:'italic'}}></TextInput>
        //         <TextInput placeholder='Email Address'  style={{borderRadius:6,backgroundColor:ColorConstant.WHITE,width:'75%',marginTop:hp(3),color:ColorConstant.GREY,fontStyle:'italic'}}></TextInput>
        //         <TextInput placeholder='Mobile Number'  style={{borderRadius:6,backgroundColor:ColorConstant.WHITE,width:'75%',marginTop:hp(3),color:ColorConstant.GREY,fontStyle:'italic'}}></TextInput>

        //         <CheckBox
                
        //         ></CheckBox>
        //     </View>      
        // </ImageBackground>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:hp(12),
        alignItems:'center',
        width:'100%'
    },
    backgroundImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height
    },
    subContainer: {
        //marginTop: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
//     textStyle: {
//         //fontSize: FontSize.FontSize.regular,
//         paddingRight: 15,
//         color: Color.BLUE
//     },
})

export default Login;