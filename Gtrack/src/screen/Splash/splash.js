import React, {Component} from 'react'
import { View, Image, StyleSheet, Text, ImageBackground, Dimensions, TouchableOpacity } from 'react-native'
import images from '../../constants/images'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import NavigationService from '../../navigation/NavigationService'
import CustomButton from '../../component/Button'

const Splash = (navigation) => {
    return ( 
              
        <ImageBackground style={styles.backgroundImage} source={images.image.splash} resizeMode={'stretch'}>
            
            <Image style={{position:'absolute', alignSelf:'center'}} source={images.image.logo}/>

            <View style={{position:'absolute', bottom: 20, alignContent:'center', alignItems:'center', width:Dimensions.get('window').width}}>
                <View style={{flexDirection:'row', marginBottom:hp(2)}}>
                    <Text style={{color:ColorConstant.WHITE,fontWeight:'400'}}>Already have an account ? </Text>
                    <TouchableOpacity style={styles.subContainer} onPress={() => NavigationService.navigate('Login')}>
                        <Text style={{color:ColorConstant.ORANGE,fontWeight:'100'}}>Log In</Text>
                    </TouchableOpacity>
                </View>

                <CustomButton title='Get Started' onPress={() => NavigationService.navigate('SignUp')} style={{ borderRadius:6, width:'80%', flex: 1,  alignItems:'center' ,backgroundColor:ColorConstant.ORANGE,height:hp(6)}} />
                
                {/* <TouchableOpacity onPress={() => NavigationService.navigate('SignUp')} style={{ borderRadius:6, width:'80%', flex: 1,  alignItems:'center' ,backgroundColor:ColorConstant.ORANGE,height:hp(6)}}>
                    <Text style={{color:ColorConstant.WHITE,  flex:1,textAlignVertical:'center'}}>Get Started</Text>
                </TouchableOpacity> */}
            </View>

        </ImageBackground>
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
})

export default Splash;