import React, { useState, useRef, useLayoutEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ScrollView, Button } from 'react-native'
import TextField from '../../component/TextField'
import { AppConstants, SCREEN_CONSTANTS, DEVICE_ID_VALIDATION_REGX } from '../../constants/AppConstants'
import { BackIcon, DownArrowIcon } from '../../component/SvgComponent'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import images from '../../constants/images'
import { useDispatch, useSelector } from 'react-redux'
import { getLoginInfo } from '../Selector'
import { ColorConstant } from '../../constants/ColorConstants'
import FontSize from '../../component/FontSize'
import ShadowView from 'react-native-simple-shadow-view'
import NavigationService from '../../navigation/NavigationService'
import { translate } from '../../../App'
import AppManager from '../../constants/AppManager'
import isEmpty from 'lodash/isEmpty'
import * as DeviceActions from './Device.Action'
import { getFormattedPhoneNumber } from '../../utils/helper'
import Modal from 'react-native-modal'
import { CountrySelection } from 'react-native-country-list'

const AddMobileTracker = ({ navigation }) => {
    const dispatch = useDispatch()

    const { loginInfo, isConnected } = useSelector(state => ({
        loginInfo: getLoginInfo(state),
        isConnected: state.network.isConnected
    }))

    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const emailRef = useRef()
    const mobileRef = useRef()
    const phonePrefixRef = useRef()
    const deviceNameRef = useRef()

    const user_id = loginInfo.id ? loginInfo.id : null
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [deviceName, setDeviceName] = useState('')
    const [isModalVisible, setModalVisible] = useState(false)
    const [phonePrefix, setPhonePrefix] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [cancel, setCancel] = useState(false)
    const [country, setCountry] = useState();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={styles.headerTitle}>
                    {translate("Add Mobile as Tracker")}
                </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity style={{ padding: hp(2) }} onPress={() => navigation.goBack()}>
                    <BackIcon />
                </TouchableOpacity>
            )
        });
    }, [navigation])

    function onTapSubmit() {
        if (isConnected) {
            let message = ''
            if (isEmpty(firstName)) {
                message = translate(AppConstants.EMPTY_FIRST_NAME)
            } else if (isEmpty(lastName)) {
                message = translate(AppConstants.EMPTY_LAST_NAME)
            } else if (isEmpty(email)) {
                message = translate(AppConstants.EMPTY_EMAIL)
            } else if (isEmpty(phoneNumber)) {
                message = translate(AppConstants.EMPTY_PHONE_NUMBER)
            }
            else if (isEmpty(deviceName)) {
                message = translate(AppConstants.EMPTY_DEVICE_NAME)
            }
            if (!isEmpty(message)) {
                AppManager.showSimpleMessage('warning', { message: message, description: '', floating: true })
            } else {
                // AppManager.showLoader()
                const requestBody = {
                    "firstName": firstName,
                    "lastName": lastName,
                    "email": email,
                    "phonePrefix": phonePrefix,
                    "phone": phoneNumber,
                    "deviceName": deviceName
                }
                console.log('request body----', requestBody)
                dispatch(DeviceActions.requestAddMobileAsTracker(user_id, requestBody, onSuccess, onError))
            }
        } else {
            AppManager.showNoInternetConnectivityError()
        }

    }
    function onSuccess(data) {
        AppManager.hideLoader()
        console.log("Success", data)
    }

    function onError(error) {
        AppManager.hideLoader()
        console.log("Error", error)
        AppManager.showSimpleMessage('warning', { message: error, description: '', floating: true })
    }

    const handleOnChangePhone = (value) => {
        const phone = getFormattedPhoneNumber(value)
        setPhoneNumber(phone)
        return phone
    }

    function getPhone(phone) {
        return phone.replace(NUMBER_REGEX, '')
    }

    function setCountryCodeData() {
        if (!isEmpty(country)) {
            const ccode = `+${country.callingCode}`
            phonePrefixRef && phonePrefixRef.current && phonePrefixRef.current.setValue(ccode)
            setPhonePrefix(ccode)
        }
    }

    function renderCountrySelection() {
        return (
            <Modal
                isVisible={isModalVisible}
                style={styles.modal}
                onBackButtonPress={() => setModalVisible(false)}
            >
                <CountrySelection action={(item) => setCountry(item)} selected={country} />
                <Button title={translate("Done")} onPress={() => {
                    setCountryCodeData()
                    setModalVisible(false)
                }} />
            </Modal>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView keyboardShouldPersistTaps='handled' style={{ height: "100%" }}>
                <View style={{ flex: 0.7, paddingHorizontal: hp(3), paddingTop: hp(4) }}>

                    <View style={styles.shadowContainer}>
                        <TextField
                            valueSet={setFirstName}
                            label={translate("User_First_Name")}
                            value={firstName}
                            onChangeText={(text) => setFirstName(text)}
                            style={styles.textNameStyle}
                            labelFontSize={hp(1.4)}
                            labelTextStyle={{ top: hp(0.3) }}
                            contentInset={{ label: hp(-0.5) }}
                            ref={firstNameRef}
                            inputContainerStyle={styles.inputContainer}
                        />
                    </View>
                    <View style={styles.shadowContainer}>
                        <TextField
                            valueSet={setLastName}
                            label={translate("User_Last_Name")}
                            value={lastName}
                            onChangeText={(text) => setLastName(text)}
                            style={styles.textNameStyle}
                            labelFontSize={hp(1.4)}
                            labelTextStyle={{ top: hp(0.3) }}
                            contentInset={{ label: hp(-0.5) }}
                            ref={lastNameRef}
                            inputContainerStyle={styles.inputContainer}
                        />
                    </View>
                    <View style={styles.shadowContainer}>
                        <TextField
                            valueSet={setEmail}
                            label={translate("User_Email_Address")}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            style={styles.textNameStyle}
                            labelFontSize={hp(1.4)}
                            labelTextStyle={{ top: hp(0.3) }}
                            contentInset={{ label: hp(-0.5) }}
                            ref={emailRef}
                            inputContainerStyle={styles.inputContainer}
                        />
                    </View>
                    {/* <View style={styles.shadowContainer}>
                    <TextField
                        valueSet={setMobile}
                        label={translate("Mobile_Number")}
                        value={mobile}
                        onChangeText={(text) => setMobile(text)}
                        style={styles.textNameStyle}
                        labelFontSize={hp(1.4)}
                        labelTextStyle={{ top: hp(0.3) }}
                        contentInset={{ label: hp(-0.5) }}
                        ref={mobileRef}
                        inputContainerStyle={styles.inputContainer}
                    />
                </View> */}
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.countryPicker} onPress={() => setModalVisible(true)}>
                            <TextField
                                valueSet={setPhonePrefix}
                                label={translate("Country_Code")}
                                ref={phonePrefixRef}
                                renderRightAccessory={() => <DownArrowIcon {...styles.dropdownImage} />}
                                editable={false}
                                value={phonePrefix}
                                formatText={input => handleOnChangePhone(input)}
                                style={styles.textNameStyle}
                                labelFontSize={hp(1.4)}
                                labelTextStyle={{ top: hp(0.5) }}
                            />
                        </TouchableOpacity>
                        <View style={{ flex: 0.6, paddingLeft: hp(1.5) }}>
                            <TextField
                                valueSet={setPhoneNumber}
                                label={translate("Phone Number")}
                                value={phoneNumber}
                                formatText={input => handleOnChangePhone(input)}
                                style={styles.textNameStyle}
                                labelFontSize={hp(1.4)}
                                labelTextStyle={{ top: hp(0.5) }}
                            />
                        </View>
                    </View>
                    <View style={styles.shadowContainer}>
                        <TextField
                            valueSet={setDeviceName}
                            label={translate("Device Name")}
                            value={deviceName}
                            onChangeText={(text) => setDeviceName(text)}
                            style={styles.textNameStyle}
                            labelFontSize={hp(1.4)}
                            labelTextStyle={{ top: hp(0.3) }}
                            contentInset={{ label: hp(-0.5) }}
                            ref={deviceNameRef}
                            inputContainerStyle={styles.inputContainer}
                        />
                    </View>
                    <ShadowView style={styles.shadowContainer}>
                        <TouchableOpacity style={styles.activateButton} onPress={() => onTapSubmit()}>
                            <Text style={styles.activateButtonTitle}>{translate("Submit")}</Text>
                        </TouchableOpacity>
                    </ShadowView>
                </View>
            </ScrollView>
            {renderCountrySelection()}
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorConstant.WHITE
    },
    headerTitle: {
        color: ColorConstant.GREY,
        fontSize: FontSize.FontSize.medium,
        fontWeight: '500',
        textAlign: 'center'
    },
    headerLeftStyle: {
        marginLeft: hp(2)
    },
    title: {
        marginTop: hp(1),
        color: ColorConstant.BLUE,
        fontSize: FontSize.FontSize.small,
        fontWeight: '600'
    },
    textNameStyle: {
        color: ColorConstant.BLACK,
        fontSize: FontSize.FontSize.small,
        fontWeight: '500'
    },
    shadowContainer: {
        width: '100%',
        shadowColor: ColorConstant.GREY,
        marginTop: hp(1),
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 3,
        shadowOpacity: 0.3
    },
    inputContainer: {
        height: hp(5),
        borderRadius: hp(5),
    },
    activateButton: {
        width: '100%',
        backgroundColor: ColorConstant.BLUE,
        width: '100%',
        height: hp(5),
        borderRadius: hp(1),
        marginTop: hp(1),
        justifyContent: 'center',
        alignItems: "center"
    },
    activateButtonTitle: { color: ColorConstant.WHITE, fontWeight: '600', fontSize: FontSize.FontSize.medium },
    countryPicker: {
        flex: 0.4,
    },
    dropdownImage: {
        height: hp(1.3),
        width: hp(1.3),
        marginTop: hp(2.3),
        alignSelf: 'center',
        color: '#000'
    },
    modal: {
        margin: 0,
        paddingVertical: Platform.OS == 'ios' ? hp(2) : null,
        height: "100%",
        backgroundColor: "#f4f4f4"
    },

})

export default AddMobileTracker