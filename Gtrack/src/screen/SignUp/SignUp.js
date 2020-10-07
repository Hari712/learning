import React, { Component, useState,useEffect } from 'react'
import { View, Image, StyleSheet, Text, ImageBackground, Dimensions, TouchableOpacity, TextInput, Button } from 'react-native'
import images from '../../constants/images'
import { useDispatch, useSelector } from 'react-redux'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { AppConstants } from '../../constants/AppConstants'
import FontSize from '../../component/FontSize'
import NavigationService from '../../navigation/NavigationService'
import CustomButton from '../../component/Button'
import { EditText } from '../../component'
import CheckBox from 'react-native-check-box'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import isEmpty from 'lodash/isEmpty'
import Modal from 'react-native-modal'
import { CountrySelection } from 'react-native-country-list'
import AppManager from '../../constants/AppManager'
import * as LoginActions from '../Login/Login.Action'

const SignUp = () => {

    const dispatch = useDispatch()

    const [isSelected, setIsSelected] = useState(false)
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [countryCode, setCountryCode] = useState(0)
    const [phoneNumber, setPhoneNumber] = useState()
    const [isModalVisible, setModalVisible] = useState(true);

    function onTapSignUp() {
        let message = ''
        if (isEmpty(firstName)) {
            message = AppConstants.EMPTY_FIRST_NAME
        }
        else if (isEmpty(lastName)) {
            message = AppConstants.EMPTY_LAST_NAME
        }
        else if (isEmpty(email)) {
            message = AppConstants.EMPTY_EMAIL
        }
        else if (isEmpty(countryCode)) {
            message = AppConstants.EMPTY_COUNTRY_CODE
        }
        else if (isEmpty(phoneNumber)) {
            message = AppConstants.EMPTY_PHONE_NUMBER
        }

        if (!isEmpty(message)) {
            AppManager.showSimpleMessage('warning', { message: message, description: '', floating: true })

        } else {
            AppManager.showLoader()
            const requestBody = {
                "email" : email,
                "firstName" :firstName,
                "lastName" :lastName,
                "phone" : phoneNumber,
                "phonePrefix" : "+" + countryCode.toString()
            }
            dispatch(LoginActions.requestSignUp(requestBody, onSuccess, onError))

        }
    }

    function onSuccess(data) {
        AppManager.hideLoader()
        console.log("Success data",data)
        if(data.message=="Successfully created new data"){
            AppManager.showSimpleMessage('warning', { message: data.message, description: '', floating: true }) 
            NavigationService.navigate('Login')
        }
    }

    function onError(error) {
        AppManager.hideLoader()
        console.log("Error",error)
        if(error=='Email is already registered in the system'){
            AppManager.showSimpleMessage('warning', { message: error, description: '', floating: true }) 
        }
    }
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
      };
    const onCountrySelection = (country) => {
        setCountryCode(country.callingCode)
        setModalVisible(!isModalVisible)
    }  

    return (

        <ImageBackground style={styles.backgroundImage} source={images.image.splash} resizeMode={'stretch'}>
            <KeyboardAwareScrollView 
                contentContainerStyle={{ flexGrow: 1 }}
                automaticallyAdjustContentInsets={false}
                keyboardShouldPersistTaps='handled'
                enableOnAndroid={false}
                scrollEnabled={false}>
                <View style={styles.container}>
                    <Image source={images.image.defaultlogo} style={styles.imageStyle} />
                    <View style={styles.textConatiner}>
                        <Text style={[styles.textStyle, { fontSize: FontSize.FontSize.regular, fontWeight: 'bold', lineHeight: hp(5) }]}>Hello there,</Text>
                        <Text style={styles.textStyle}>Enter your information below to </Text>
                        <Text style={styles.textStyle}>create your account</Text>
                    </View>

                    <EditText 
                        placeholder='First Name' 
                        style={{ fontSize: FontSize.FontSize.small }}  
                        onChangeText={(text) => { setFirstName(text) }}
                        value={firstName} 
                    />
                    <EditText 
                        placeholder='Last Name' 
                        style={{ fontSize: FontSize.FontSize.small }} 
                        onChangeText={(text) => { setLastName(text) }}
                        value={lastName} 
                    />
                    <EditText 
                        placeholder='Email Address' 
                        style={{ fontSize: FontSize.FontSize.small }} 
                        onChangeText={(text) => { setEmail(text) }}
                        value={email} 
                    />
                    <View style={{ flexDirection:'row'}}>

                        <View style={styles.countryPicker }>
                            <Text style={styles.countryCode}>+{countryCode}</Text>
                        <TouchableOpacity  onPress={toggleModal}>
                            <Image style={{height:hp(1)}} source={images.countryPicker.downArrow}/> 
                        </TouchableOpacity>
                            <Modal 
                                isVisible={!isModalVisible} 
                                coverScreen={true}
                                //onBackButtonPress={() => setModalVisible(false)}
                                >
                                <View style={{flex: 1}}>
                                    <CountrySelection action={(item) => onCountrySelection(item)} selected={countryCode}/>
                                </View>
                            </Modal>
                    </View>

                        <View style={{ flex:0.75, paddingLeft:hp(1.5) }}>
                        <EditText 
                            placeholder='Mobile Number' 
                            style={{ fontSize: FontSize.FontSize.small }}
                            onChangeText={(text) => { setPhoneNumber(text) }} 
                            value={phoneNumber} />
                        </View>    
                    </View>    
                   

                    <View style={styles.checkboxMainStyle}>
                        <CheckBox
                            style={{alignSelf:'center'}}
                            unCheckedImage={<Image source={images.login.uncheckedbox}></Image>}
                            checkedImage={<Image source={images.login.checkedbox}></Image>}
                            onClick={() => { setIsSelected(!isSelected) }}
                            isChecked={isSelected}
                        />
                        <Text style={styles.termsConditionStyle}>Terms & Conditions</Text>
                    </View>

                    <CustomButton
                        title='Create an Account'
                        style={styles.buttonStyle}
                        textStyle={styles.buttonTextStyle}
                        onPress={() => onTapSignUp()}
                    />

                    <View style={styles.bottomContainer}>
                        <Text style={styles.bottomText}>Already have an account ? </Text>
                        <TouchableOpacity style={styles.subContainer} onPress={() => NavigationService.navigate('Login')}>
                            <Text style={styles.bottomBtn}>Log In</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </KeyboardAwareScrollView>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: hp(6)
    },
    imageStyle: {
        height: hp(10),
        resizeMode: 'contain'
    },
    textConatiner: {
        alignItems:'flex-start',
        marginVertical: hp(2),
        width:'100%'
    },
    textStyle: {
        color: ColorConstant.WHITE,
        fontSize: FontSize.FontSize.small,
        fontFamily:'Nunito-Regular'
    },
    checkboxMainStyle: {
        flexDirection: 'row',
        marginVertical: hp(1.5),
        width:'100%'
    },
    termsConditionStyle: {
        color: ColorConstant.WHITE,
        fontFamily:'Nunito-Regular',
        fontSize: hp(2.2),
        marginLeft: wp(3)
    },
    buttonStyle: {
        width: '100%',
        height: hp(5.5),
        marginTop: hp(3)
    },
    buttonTextStyle: {
        fontSize: FontSize.FontSize.medium,
        fontWeight: '500'
    },
    bottomContainer: {
        flexDirection: 'row',
        marginTop: hp(3),
    },
    bottomText: {
        color: ColorConstant.WHITE,
        fontFamily:'Nunito-Bold',
        fontSize:FontSize.FontSize.medium
    },
    bottomBtn: {
        color: ColorConstant.ORANGE,
        fontFamily:'Nunito-Bold',
        fontSize:FontSize.FontSize.medium
    },
    countryPicker: {
        flex:0.25,
        flexDirection:'row',
        borderRadius:7,
        paddingHorizontal:hp(1.5),
        backgroundColor:ColorConstant.WHITE,        
        height:hp(5.5),
        marginBottom:hp(2.5),
        alignItems:'center',
        
    },
    countryCode: {
        flex:1,
        fontSize:FontSize.FontSize.small,
        fontFamily:'Nunito-Regular',
        color:ColorConstant.BLACK,
    }
})

export default SignUp;