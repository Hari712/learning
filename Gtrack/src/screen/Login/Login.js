import React, {Component, useState} from 'react'
import { View, Image, StyleSheet, Text, ImageBackground, Dimensions, TouchableOpacity, TextInput} from 'react-native'
import images from '../../constants/images'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize'
import NavigationService from '../../navigation/NavigationService'
import { EditText } from '../../component'


const Login = () => {

    const [email, setEmail] = useState('')
    const [passcode, setPasscode] = useState('')


return ( 
    <ImageBackground style={styles.backgroundImage} source={images.image.splash} resizeMode={'stretch'}>
        <View style={styles.container}>
            <Image source={images.image.defaultlogo} />
            <View style={{margin:hp(3),width:'75%'}}>
                <Text style={{color:ColorConstant.WHITE,fontSize:FontSize.FontSize.regular,textAlign:'center'}}>WELCOME !</Text>
            </View>
            
            <EditText value={email} onChangeText={(value) => {setEmail(value)}} placeholder='Email Address/Mobile Number' />
            <EditText passcode style={{paddingHorizontal:hp(1.5), flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} value={passcode} onChangeText={(value) => setPasscode(value)} placeholder='Passcode' />

    
            <View style={{width:'75%',margin:hp(1.5),flexDirection:'row'}}>
                <Image source={images.image.checkbox}></Image>
                <Text style={{color:ColorConstant.WHITE,fontWeight:'100',fontSize:FontSize.FontSize.medium}}>  Keep me logged in</Text>
            </View>
            
            <TouchableOpacity onPress={() => NavigationService.navigate('LiveTracking')} style={{ borderRadius:6, width:'75%', margin:hp(2),  alignItems:'center' ,backgroundColor:ColorConstant.ORANGE,height:hp(6)}}>
                <Text style={{color:ColorConstant.WHITE,  flex:1,textAlignVertical:'center'}}>Login</Text>
            </TouchableOpacity>

            {/* <View style={{flexDirection:'row', marginBottom:hp(2)}}> */}
                <TouchableOpacity style={styles.subContainer} onPress={() => NavigationService.navigate('ResetPasscode')}>
                    <Text style={{color:ColorConstant.WHITE,fontWeight:'100'}}>Reset Passcode</Text>
                </TouchableOpacity>
            {/* </View> */}

        </View> 
        
    </ImageBackground>
)}

const styles = StyleSheet.create({
container: {
    flex: 1,
    marginTop:hp(20),
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

export default Login;