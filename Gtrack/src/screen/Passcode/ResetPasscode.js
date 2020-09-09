import React, { Component, useState } from 'react'
import { View, Image, StyleSheet, Text, ImageBackground, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import images from '../../constants/images'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize'
import NavigationService from '../../navigation/NavigationService'
import CustomButton from '../../component/Button'
import { EditText } from '../../component'

const ResetPasscode = () => {
    const [email, setEmail] = useState('')
    return (
        <ImageBackground style={styles.backgroundImage} source={images.image.splash} resizeMode={'stretch'}>
            <View style={styles.container}>
                <Image source={images.image.defaultlogo} />
                <View style={styles.headingMainStyle}>
                    <Text style={styles.headingTextStyle}>Reset your Passcode</Text>
                </View>

                <EditText
                    value={email}
                    onChangeText={(value) => { setEmail(value) }}
                    placeholder='Email Address/Mobile Number'
                    style={styles.emailTextStyle}
                />

                <CustomButton
                    title="Reset"
                    onPress={() => NavigationService.navigate('Passcode')}
                    style={styles.button}
                    textStyle={styles.buttonTextStyle}
                />

                <View style={styles.LoginIntoMainView}>
                    <Text style={styles.LoginIntoTextView}>Login into Existing Account</Text>
                    <TouchableOpacity style={styles.subContainer} onPress={() => NavigationService.navigate('Login')}>
                        <Image source={images.image.login} />
                    </TouchableOpacity>

                </View>

            </View>

        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height
    },
    container: {
        flex: 1,
        marginTop: hp(20),
        alignItems: 'center',
    },
    headingMainStyle: {
        margin: hp(3),
        width: wp(75)
    },
    headingTextStyle: {
        color: ColorConstant.WHITE,
        fontSize: FontSize.FontSize.medium,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    emailTextStyle: {
        fontSize: FontSize.FontSize.small,
        paddingHorizontal: hp(1.5),
        alignItems: 'center'
    },
    button: {
        width:wp(75),
        height:hp(5.5),
        marginTop: hp(3)
    },
    buttonTextStyle: {
        fontSize: FontSize.FontSize.medium, 
        fontWeight: '500'
    },
    LoginIntoMainView: {
        flexDirection: 'row', 
        marginTop: hp(5)
    },
    LoginIntoTextView: {
        color: ColorConstant.WHITE, 
        fontWeight: 'bold',
        fontSize: FontSize.FontSize.medium
    },
    subContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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