import React, {Component, useState} from 'react'
import { View, Image, StyleSheet, Text, ImageBackground, Dimensions, TouchableOpacity, TextInput} from 'react-native'
import images from '../../constants/images'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize'
import NavigationService from '../../navigation/NavigationService'
import { EditText } from '../../component'

const Passcode = ({navigation, route}) => {

    const { emailId } = route.params;

    const [passcode, setPasscode] = useState('')
    const [cancel, setCancel] = useState(false)
    const [login, setLogin] = useState(false)

    function loginHandle() {
        if (isConnected) {
            let message = ''
            if (_.isEmpty(passcode)) {
                message = AppConstants.EMPTY_PASSWORD
            }
            if (!_.isEmpty(message)) {
                AppManager.showSimpleMessage('warning', { message: message, description: '', floating: true })
            } else {
                AppManager.showLoader()
                const requestBody = {
                    emailOrPhone: emailId,
                    password: passcode
                }
                dispatch(LoginActions.requestLogin(requestBody, onLoginSuccess, onLoginError))
            }
        } else {
            AppManager.showNoInternetConnectivityError()
        }        
    }

    function onLoginSuccess(data) {
        AppManager.hideLoader()
        console.log("Success data",data)
        saveUserData(data)
        AppManager.showSimpleMessage('warning', { message:AppConstants.LOGIN_SUCCESS, description: '', floating: true })
        navigateToLiveTracking()
    
    }

    const saveUserData = async (data) => {
        try {
            const isSuccess = await storeItem(USER_DATA, data)
            if (isSuccess) {
                AppManager.hideLoader()
                dispatch(LoginActions.setLoginResponse(data))
            }
        } catch (error) {
            console.log(error)
        }
    }

    function onLoginError(error) {
        AppManager.hideLoader()
        console.log("Error",error)
        if(error){
            AppManager.showSimpleMessage('warning', { message:error, description: '', floating: true })
        }
    }

    function navigateToLiveTracking() {
        NavigationService.navigate('LiveTracking')
    }




    return(
        <ImageBackground style={styles.backgroundImage} source={images.image.splash} resizeMode={'stretch'}>
        <View style={styles.container}>
            <Image source={images.image.defaultlogo}/>
            <View style={styles.subContainer}>
                <Text style={styles.resetEmailText}>Passcode Reset Email Sent</Text>
                <Text style={styles.textStyle}>The New Passcode is sent on</Text>
                <Text style={[styles.textStyle,{color:ColorConstant.ORANGE}]}>{emailId}</Text>
            </View>
            
            <EditText 
                passcode style={styles.passcode} 
                value={passcode} 
                onChangeText={(value) => setPasscode(value)} 
                placeholder='Enter New Passcode' 
            />
        
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={()=>{
                    cancel?setCancel(false):setCancel(true)
                    navigation.goBack()
                }}style={[styles.cancelButton]}>
                    <Text style={styles.buttonTextColor}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => loginHandle()} 
                    style={styles.LoginButton}>
                    <Text style={styles.LoginButtonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View> 
        
    </ImageBackground>
)
}
const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal: hp(6)
},
subContainer: {
    marginVertical:hp(3),
    width: '100%'
},
resetEmailText: {
    color:ColorConstant.WHITE,
    fontSize:FontSize.FontSize.medium,
    fontWeight: 'bold',
    textAlign:'center',
    marginBottom: hp(1),
    fontFamily:'Nunito-Bold',
    textAlign:'center',
},
textStyle: {
    color:ColorConstant.WHITE,
    fontSize:FontSize.FontSize.small,
    //fontWeight: '500',
    fontFamily:'Nunito-SemiBold',
    textAlign:'center',
    marginTop:hp(1)
},
passcode: {
    paddingHorizontal:hp(1.5), 
    flexDirection:'row',
    alignItems:'center',
    marginTop:hp(0.5),
    justifyContent:'space-between'
},
buttonContainer: {
    flexDirection:'row',
    justifyContent:'space-between',
    width: '100%',
    marginVertical:hp(2),
    alignItems:'center'
},
cancelButton: {
    borderRadius:6,
    width:'42%',
    height:hp(6),
    justifyContent:'center',
    backgroundColor: ColorConstant.WHITE,
},
buttonTextColor: {
    textAlign: 'center',
    color: ColorConstant.ORANGE
},
LoginButton: {
    borderRadius:6,
    backgroundColor: ColorConstant.ORANGE,
    width:'42%',
    height:hp(6),
    justifyContent:'center'
},
LoginButtonText: {
    textAlign:'center',
    color: ColorConstant.WHITE
},
backgroundImage: {
    flex: 1
},
})
export default Passcode