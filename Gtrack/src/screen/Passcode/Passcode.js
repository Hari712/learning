import React, {Component, useState} from 'react'
import { View, Image, StyleSheet, Text, ImageBackground, Dimensions, TouchableOpacity, TextInput} from 'react-native'
import images from '../../constants/images'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize'
import NavigationService from '../../navigation/NavigationService'
import { EditText } from '../../component'

const Passcode = ({navigation}) => {

    const [email, setEmail] = useState('')
    const [passcode, setPasscode] = useState('')
    const [cancel, setCancel] = useState(false)
    const [login, setLogin] = useState(false)
  
    return(
        <ImageBackground style={styles.backgroundImage} source={images.image.splash} resizeMode={'stretch'}>
        <View style={styles.container}>
            <Image source={images.image.defaultlogo}/>
            <View style={{margin:hp(4),width:'75%'}}>
                <Text style={{color:ColorConstant.WHITE,fontSize:FontSize.FontSize.medium,textAlign:'center'}}>Passcode Reset Email Sent</Text>
                <Text style={{color:ColorConstant.WHITE,fontSize:FontSize.FontSize.small,textAlign:'center',marginTop:hp(1)}}>The New Passcode is sent on</Text>
                <Text style={{color:ColorConstant.ORANGE,fontSize:FontSize.FontSize.small,textAlign:'center',marginTop:hp(1)}}>@davidsmith@gmail.com</Text>
            </View>
            
            <EditText passcode style={{paddingHorizontal:hp(1.5), flexDirection:'row',alignItems:'center',marginTop:hp(0.5),justifyContent:'space-between'}} value={passcode} onChangeText={(value) => setPasscode(value)} placeholder='Enter New Passcode' />
           
            <View style={{flexDirection:'row',justifyContent:'space-between',width:'75%',margin:hp(2),alignItems:'center'}}>
                <TouchableOpacity onPress={()=>{
                    cancel?setCancel(false):setCancel(true)
                    navigation.goBack()
                }}style={{borderRadius:6,backgroundColor:cancel?ColorConstant.WHITE:ColorConstant.ORANGE,width:'42%',height:hp(6),justifyContent:'center'}}>
                    <Text style={{textAlign:'center',color:cancel?ColorConstant.ORANGE:ColorConstant.WHITE}}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => NavigationService.navigate('LiveTracking')} style={{borderRadius:6,backgroundColor:login?ColorConstant.WHITE:ColorConstant.ORANGE,width:'42%',height:hp(6),justifyContent:'center'}}>
                    <Text style={{textAlign:'center',color:login?ColorConstant.ORANGE:ColorConstant.WHITE}}>Login</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity onPress={() => login?setLogin(false):setLogin(true)} style={{borderRadius:6,backgroundColor:login?ColorConstant.WHITE:ColorConstant.ORANGE,width:'42%',height:hp(6),justifyContent:'center'}}>
                    <Text style={{textAlign:'center',color:login?ColorConstant.ORANGE:ColorConstant.WHITE}}>Login</Text>
                </TouchableOpacity> */}
            </View>
        </View> 
           
    </ImageBackground>
)
}
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
})
export default Passcode