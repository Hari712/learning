import React, {Component} from 'react'
import { View, Image, StyleSheet, Text, ImageBackground, Dimensions, TouchableOpacity, TextInput, CheckBox } from 'react-native'
import images from '../../constants/images'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize'
import NavigationService from '../../navigation/NavigationService'
import CustomButton from '../../component/Button'
import { EditText } from '../../component'

const SignUp = () => {
    return ( 
              
        <ImageBackground style={styles.backgroundImage} source={images.image.splash} resizeMode={'stretch'}>
            <View style={styles.container}>
                <Image source={images.image.defaultlogo}/>
                <View style={styles.textConatiner}>
                    <Text style={[styles.textStyle,{fontSize:FontSize.FontSize.medium}]}>Hello there,</Text>
                    <Text style={styles.textStyle}>Enter your information below to </Text>
                    <Text style={styles.textStyle}>create your account</Text>
                </View>

                <EditText placeholder='First Name' placeholderTextColor={ColorConstant.GREY} style={styles.inputTextStyle}/>
                <EditText placeholder='Last Name' placeholderTextColor={ColorConstant.GREY} style={styles.inputTextStyle}/>
                <EditText placeholder='Email Address' placeholderTextColor={ColorConstant.GREY} style={styles.inputTextStyle}/>
                <EditText placeholder='Mobile Number' placeholderTextColor={ColorConstant.GREY} style={styles.inputTextStyle}/>

                {/* <TextInput placeholder='First Name' placeholderTextColor={ColorConstant.GREY} style={styles.inputTextStyle}></TextInput>
                <TextInput placeholder='Last Name' placeholderTextColor={ColorConstant.GREY} style={styles.inputTextStyle}></TextInput>
                <TextInput placeholder='Email Address' placeholderTextColor={ColorConstant.GREY} style={styles.inputTextStyle}></TextInput>
                <TextInput placeholder='Mobile Number' placeholderTextColor={ColorConstant.GREY} style={styles.inputTextStyle}></TextInput> */}

                <View style={styles.checkbox}>
                <Image source={images.image.checkbox}></Image>
                <Text style={{color:ColorConstant.WHITE,fontWeight:'100',fontSize:FontSize.FontSize.medium}}>  Terms & Condtions</Text>
                </View>
                
                <CustomButton title='Create an Account' onPress={() => NavigationService.navigate('SignUp')} style={styles.button} />

                {/* <TouchableOpacity onPress={() => NavigationService.navigate('SignUp')} style={{ borderRadius:6, width:'75%', margin:hp(2),  alignItems:'center' ,backgroundColor:ColorConstant.ORANGE,height:hp(6)}}>
                    <Text style={{color:ColorConstant.WHITE,  flex:1,textAlignVertical:'center'}}>Create an Account</Text>
                </TouchableOpacity> */}

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
    bottomBtn: {
        color:ColorConstant.ORANGE,
        fontWeight:'100'
    },
    textConatiner: {
        margin:hp(2),
        width:'75%'
    },
    textStyle: {
        color:ColorConstant.WHITE,
        fontSize:FontSize.FontSize.small
    },
    button: {
        borderRadius:6, 
        width:'75%', 
        margin:hp(2),  
        alignItems:'center' ,
        backgroundColor:ColorConstant.ORANGE,
        height:hp(6)
    },
    checkbox: {
        width:'75%',
        margin:hp(1.5),
        flexDirection:'row'
    },
    bottomContainer: {
        flexDirection:'row', 
        marginBottom:hp(2)
    },
    bottomText: {
        color:ColorConstant.WHITE,
        fontWeight:'400'
    },
    inputTextStyle: {
        borderRadius:6,
        paddingHorizontal:hp(2),
        backgroundColor:ColorConstant.WHITE,
        width:'75%',
        margin:hp(1.5),
        color:'black',
        
        // fontStyle:'italic'
    },
})

export default SignUp;