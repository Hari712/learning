import React, {Component, useState} from 'react'
import { View, Image, StyleSheet, Text, ImageBackground, Dimensions, TouchableOpacity, TextInput} from 'react-native'
import images from '../../constants/images'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize'
import NavigationService from '../../navigation/NavigationService'

const ResetPasscode = () => {
    return(
        <ImageBackground style={styles.backgroundImage} source={images.image.splash} resizeMode={'stretch'}>
        <View style={styles.container}>
            <Image source={images.image.defaultlogo}/>
            <View style={{margin:hp(3),width:'75%'}}>
                <Text style={{color:ColorConstant.WHITE,fontSize:FontSize.FontSize.regular,textAlign:'center'}}>Reset your Passcode</Text>
            </View>
            <TextInput placeholder='Email Address/Mobile Number' placeholderTextColor={ColorConstant.GREY} style={styles.inputTextStyle}></TextInput>
            
            <TouchableOpacity onPress={() => NavigationService.navigate('Passcode')}   style={{ borderRadius:6, width:'75%', margin:hp(2),  alignItems:'center' ,backgroundColor:ColorConstant.ORANGE,height:hp(6)}}>
                <Text style={{color:ColorConstant.WHITE,  flex:1,textAlignVertical:'center'}}>Reset</Text>
            </TouchableOpacity>

            <View style={{flexDirection:'row', marginTop:hp(3)}}>
                <Text style={{color:ColorConstant.WHITE,fontWeight:'100'}}>Login into Existing Account   </Text>
                <TouchableOpacity style={styles.subContainer} onPress={() => NavigationService.navigate('Login')}>
                   <Image source={images.image.login}/>
                </TouchableOpacity>
                
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
//     const [email, setEmail] = useState('')
//     return (
//         <SafeAreaView style={styles.container}>
//             <ImageBackground style={styles.backgroundImage} source={images.image.bgLight} resizeMode={'stretch'} >
//                 <View style={styles.imageContainer}>
//                     <Image source={images.image.groupIcon} />
//                 </View>
//                 <View style={styles.form}>
//                     <Text style={styles.header}>Reset Your Passcode</Text>
//                     <FormTextInput
//                         placeholder="Email Address / Mobile Number"
//                         value={email}
//                         onChangeText={(value: string) => setEmail(value.trim())}
//                     />
//                     <Button
//                         title='RESET PASSCODE'
//                         style={{ marginTop: '5%' }}
//                         onPress={() => { navigation.navigate('Passcode') }} />
//                     <TouchableOpacity style={styles.existingTextContainer}
//                         onPress={() => { }}>
//                         <Text style={[styles.text, { paddingRight: 10 }]}>Login into Existing Account</Text>
//                         <Image source={images.image.login} />
//                     </TouchableOpacity>
//                 </View>
//                 <Text style={styles.text}>Copywrite.OneViz</Text>
//             </ImageBackground>
//         </SafeAreaView>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     backgroundImage: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         paddingVertical: 15
//     },
//     imageContainer: {
//         flex: 0.34,
//         justifyContent: 'flex-end',
//     },
//     form: {
//         flex: 0.66,
//         marginTop: '18%',
//         width: '75%',
//     },
//     text: {
//         fontSize: FontSize.FontSize.small,
//         color: '#4DADE1',
//         alignSelf: 'center',
//     },
//     header: {
//         fontSize: FontSize.FontSize.small,
//         color: '#4DADE1',
//         paddingBottom: 15
//     },
//     existingTextContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         alignSelf: 'center',
//         marginTop: '5%'
//     }
// })
export default ResetPasscode