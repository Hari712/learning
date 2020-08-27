import React, {Component, useState} from 'react'
import { View, Image, StyleSheet, Text, ImageBackground, Dimensions, TouchableOpacity, TextInput} from 'react-native'
import images from '../../constants/images'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize'
import NavigationService from '../../navigation/NavigationService'
import { EditText } from '../../component'
import CustomButton from '../../component/Button'


const Login = () => {

    const [email, setEmail] = useState('')
    const [passcode, setPasscode] = useState('')


return ( 
    <ImageBackground style={styles.backgroundImage} source={images.image.splash} resizeMode={'stretch'}>
        <View style={styles.container}>
            <Image source={images.image.defaultlogo} />
            <View style={styles.subContner}>
                <Text style={styles.welcomeText}>WELCOME !</Text>
            </View>
            
            <EditText value={email} onChangeText={(value) => {setEmail(value)}} placeholder='Email Address/Mobile Number' />
            <EditText passcode style={styles.passcodeText} value={passcode} onChangeText={(value) => setPasscode(value)} placeholder='Passcode' />

    
            <View style={styles.checkboxContainer}>
                <Image source={images.image.checkbox}></Image>
                <Text style={styles.checkboxText}>  Keep me logged in</Text>
            </View>
            
            <CustomButton title="Login" onPress={() => NavigationService.navigate('LiveTracking')} style={styles.button}  />
            
            {/*             
            <TouchableOpacity onPress={() => NavigationService.navigate('LiveTracking')} style={{ borderRadius:6, width:'75%', margin:hp(2),  alignItems:'center' ,backgroundColor:ColorConstant.ORANGE,height:hp(6)}}>
                <Text style={{color:ColorConstant.WHITE,  flex:1,textAlignVertical:'center'}}>Login</Text>
            </TouchableOpacity> */}

            <TouchableOpacity style={styles.subContainer} onPress={() => NavigationService.navigate('ResetPasscode')}>
                <Text style={styles.resetText}>Reset Passcode</Text>
            </TouchableOpacity>

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
subContner: {
    margin:hp(3),
    width:'75%'
},
welcomeText: {
    color:ColorConstant.WHITE,
    fontSize:FontSize.FontSize.regular,
    textAlign:'center'
},
passcodeText: {
    paddingHorizontal:hp(1.5), 
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
},
checkboxContainer: {
    width:'75%',
    margin:hp(1.5),
    flexDirection:'row'
},
checkboxText: {
    color:ColorConstant.WHITE,
    fontWeight:'100',
    fontSize:FontSize.FontSize.medium
},
button: {
    borderRadius:6, 
    width:'75%', 
    margin:hp(2),  
    alignItems:'center',
    backgroundColor:ColorConstant.ORANGE,height:hp(6)
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
resetText: {
    color:ColorConstant.WHITE,
    fontWeight:'100'
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