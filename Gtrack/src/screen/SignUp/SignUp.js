import React, { Component, useState,useEffect } from 'react'
import { View, Image, StyleSheet, Text, ImageBackground, Dimensions, TouchableOpacity, TextInput, Button, Platform } from 'react-native'
import images from '../../constants/images'
import { useDispatch, useSelector } from 'react-redux'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { AppConstants, EMAIL_PHONE_REGEX, SCREEN_CONSTANTS } from '../../constants/AppConstants'
import NavigationService from '../../navigation/NavigationService'
import { EditText, CustomButton, FontSize } from '../../component'
import CheckBox from 'react-native-check-box'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import isEmpty from 'lodash/isEmpty'
import Modal from 'react-native-modal'
import { CountrySelection } from 'react-native-country-list'
import AppManager from '../../constants/AppManager'
import * as LoginActions from '../Login/Login.Action'
import { translate } from '../../../App'
import { LoginWelcomeIcon } from '../../component/SvgComponent'
import {  validateEmailorPhoneNumber, validateName } from '../../utils/helper'
import { TermsConditionModal } from './TermsConditionModal'

const SignUp = () => {

    const dispatch = useDispatch()

    const { isConnected } = useSelector(state => ({
        isConnected: state.network.isConnected,
    }))

    const [isTocAccepted, setIsTocAccepted] = useState(false)
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [countryCode, setCountryCode] = useState(1)
    const [country, setCountry] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [isModalVisible, setModalVisible] = useState(false)
    const [tocVisible, setTocVisible] = useState(false);
    let temp;

    function onTapSignUp() {
        if (isConnected) {
        let message = ''
        if (isEmpty(firstName)) {
            message = translate(AppConstants.EMPTY_FIRST_NAME)
        }
        else if(!validateName(firstName)){
            message = "Name should contain only alphabets" 
        }
        else if (isEmpty(lastName)) {
            message = translate(AppConstants.EMPTY_LAST_NAME)
        }
        else if (!validateName(lastName)) {
            message = "Name should contain only alphabets" 
        }
        else if (isEmpty(email)) {
            message = translate(AppConstants.EMPTY_EMAIL)
        }
        else if (!validateEmailorPhoneNumber(email)) {    
            message = translate(AppConstants.INVALID_EMAIL)
        }        
        else if (isEmpty(countryCode)) {
            message = translate(AppConstants.EMPTY_COUNTRY_CODE)
        }
        else if (isEmpty(phoneNumber)) {
            message = translate(AppConstants.EMPTY_PHONE_NUMBER)
        }
        else if (!validateEmailorPhoneNumber(phoneNumber)){
            message = translate(AppConstants.INVALID_PHONE_NUMBER)
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
    } else {
        AppManager.showNoInternetConnectivityError()
    }
    }

    function onSuccess(data) {
        AppManager.hideLoader()
        console.log("Success data",data)
        if(data){
            AppManager.showSimpleMessage('success', { message: translate(AppConstants.EMAIL_SENT), description: translate(AppConstants.EMAIL_SENT_DESC), floating: true }) 
            NavigationService.navigate(SCREEN_CONSTANTS.LOGIN)
        }
    }

    function onError(error) {
        AppManager.hideLoader()
        console.log("Error",error)
        if(error){
            AppManager.showSimpleMessage('warning', { message: error, description: '', floating: true }) 
        }
    }
    const toggleModal = () => {
        setModalVisible(true);
    };
        
    function navigateToLogin() {
        NavigationService.navigate(SCREEN_CONSTANTS.LOGIN)
        setFirstName('')
        setLastName('')
        setEmail('')
        setPhoneNumber('')
        setCountryCode('1')
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
                    <LoginWelcomeIcon width={59.196} height={79.371} style={styles.imageStyle}/>    
                    <View style={styles.textConatiner}>
                        <Text style={[styles.textStyle, { fontSize: FontSize.FontSize.regular, fontWeight: 'bold', lineHeight: hp(5) }]}>{translate("Signup_string1")}</Text>
                        <Text style={styles.textStyle}>{translate("Signup_string2")} </Text>
                        <Text style={styles.textStyle}>{translate("Signup_string3")}</Text>
                    </View>

                    <EditText 
                        placeholder={translate("First Name")} 
                        style={styles.editText}  
                        onChangeText={(text) => { setFirstName(text) }}
                        value={firstName} 
                    />
                    <EditText 
                        placeholder={translate("Last Name")} 
                        style={styles.editText}
                        onChangeText={(text) => { setLastName(text) }}
                        value={lastName} 
                    />
                    <EditText 
                        placeholder={translate("Email Address")}
                        style={styles.editText}
                        onChangeText={(text) => { setEmail(text) }}
                        value={email} 
                    />
                    <View style={{ flexDirection:'row'}}>

                        <View style={styles.countryPicker }>
                            <Text style={styles.countryCode}>+{countryCode}</Text>
                        <TouchableOpacity style={{zIndex:5}}  onPress={toggleModal}>
                            <Image style={{width:wp(3),height:hp(1),padding:hp(0.7)}} source={images.countryPicker.downArrow}/> 
                        </TouchableOpacity>
                            <Modal 
                                isVisible={isModalVisible} 
                                style={styles.modal}
                                onBackButtonPress={() => setModalVisible(false)}
                                >
                                {/* <View style={[styles.countrySelection]}> */}
                                    <CountrySelection  action={(item) => setCountry(item) } selected={country}/>
                                    <Button  title={translate("Done")} onPress={()=>{ 
                                        setCountryCode(country.callingCode)
                                        setModalVisible(false)
                                        }} />
                                {/* </View>                         */}
                            </Modal>
                        </View> 

                        <View style={{ flex:0.75, paddingLeft:hp(1.5) }}>
                        <EditText 
                            placeholder={translate("Mobile Number")}
                            style={styles.editText}
                            maxLength={10}
                            onChangeText={(text) => { setPhoneNumber(text) }} 
                            value={phoneNumber} />
                        </View>    
                    </View>    
                

                    <View style={styles.checkboxMainStyle}>
                        <CheckBox
                            style={{alignSelf:'center'}}
                            unCheckedImage={<Image source={images.login.uncheckedbox}></Image>}
                            checkedImage={<Image source={images.login.checkedbox}></Image>}
                            onClick={() => { setIsTocAccepted(!isTocAccepted) }}
                            isChecked={isTocAccepted}
                        />
                        <Text style={styles.termsConditionStyle}>I accept </Text>
                        <TouchableOpacity onPress={()=>setTocVisible(!tocVisible)}>
                            <Text style={styles.termsConditionStyleLink}>Terms & conditions</Text>
                        </TouchableOpacity>
                        
                    </View>

                    <CustomButton
                        disabled={!isTocAccepted}
                        title={translate("Signup_string5")}
                        style={[styles.buttonStyle,{backgroundColor: !isTocAccepted ? ColorConstant.GREY : ColorConstant.ORANGE}]}
                        textStyle={styles.buttonTextStyle}
                        onPress={() => onTapSignUp()}
                    />

                    <View style={styles.bottomContainer}>
                        <Text style={styles.bottomText}>{translate("Splash_string1")}  </Text>
                        <TouchableOpacity style={styles.subContainer} onPress={() =>navigateToLogin()}>
                            <Text style={styles.bottomBtn}>{translate("Splash_string2")}</Text>
                        </TouchableOpacity>
                    </View>

                    {tocVisible&&<TermsConditionModal tocVisible={tocVisible} setTocVisible={setTocVisible} />}

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
    editText : {
        fontSize: FontSize.FontSize.small
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
        marginLeft: wp(3),
    },
    termsConditionStyleLink: {
        color: ColorConstant.ORANGE,
        fontFamily:'Nunito-Regular',
        fontSize: hp(2.2),
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
        alignItems:'center'
        
    },
    modal: {
        margin:0, 
        paddingVertical:Platform.OS == 'ios' ? hp(2) : null,
        height:"100%",
        backgroundColor:"#f4f4f4"
    },
    countrySelection: {
        width:wp(100),
        height:hp(100),
        alignSelf:'center', 
        paddingVertical:Platform.OS=='ios' ? hp(2) : null
    },
    countryCode: {
        flex:1,
        fontSize:FontSize.FontSize.small,
        fontFamily:'Nunito-Regular',
        color:ColorConstant.BLACK,
    }
})

export default SignUp;