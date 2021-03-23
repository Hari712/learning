import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Keyboard, Platform } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { EditText, FontSize } from '../../../../src/component'
import { ColorConstant } from '../../../constants/ColorConstants';
import { FEEDBACK_VALIDATION_ERROR } from '../../../constants/AppConstants'
import { useDispatch, useSelector } from 'react-redux';
import { getLoginState } from '../../Selector';
import AppManager from '../../../constants/AppManager';
import * as SettingsActions from '../Settings.Action'
import isEmpty from 'lodash/isEmpty'
import DeviceInfo from 'react-native-device-info';
import { ScrollView } from 'react-native-gesture-handler';
import { translate } from '../../../../App';
import { BackIcon } from '../../../component/SvgComponent';

const Feedback = ({ navigation }) => {

    const { loginData, isConnected } = useSelector(state => ({
        loginData: getLoginState(state),
        isConnected: state.network.isConnected
    }))
    
    const MAX_CHARACTERS_LIMIT = 250

    const [feedback, setFeedback] = useState('')
    const [keyboardHeight, setKeyboardHeight] = useState(0)

    function onKeyboardDidShow(KeyboardEvent){
        setKeyboardHeight(KeyboardEvent.endCoordinates.height)
    }

    function onKeyboardDidHide() {
        setKeyboardHeight(0)
    }

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow',onKeyboardDidShow)
        Keyboard.addListener('keyboardDidHide',onKeyboardDidHide)
        return () => {
            Keyboard.removeListener('keyboardDidShow',onKeyboardDidShow)
            Keyboard.removeListener('keyboardDidHide',onKeyboardDidHide)
        }   
    },[])

    const dispatch = useDispatch()

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={{
                    color: ColorConstant.GREY,
                    fontSize: FontSize.FontSize.medium,
                    fontWeight: '500',
                    textAlign: 'center'
                }}>
                    {translate("Settings")}
                </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity style={{padding:hp(2)}} onPress={() => navigation.goBack()}>
                    <BackIcon />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    function onSubmitFeedback() {
        if (isConnected) {
            if (isEmpty(feedback)) {
                AppManager.showSimpleMessage('warning', { message: FEEDBACK_VALIDATION_ERROR, description: '', floating: true })
            } else {
                let systemVersion = DeviceInfo.getSystemVersion()
                let deviceType = DeviceInfo.getSystemName().toUpperCase();
                let version = DeviceInfo.getVersion();
                const requestBody = {
                    "id": loginData.feedback ? loginData.feedback.id : null,
                    "appVersion": version,
                    "deviceType": deviceType,
                    "systemVersion": systemVersion,
                    "feedback" : feedback
                }
                console.log("Request Body",requestBody)
                AppManager.showLoader()
                dispatch(SettingsActions.requestAddFeedback(requestBody, loginData.id, onSuccess, onError))
            }
        } else {
            AppManager.showNoInternetConnectivityError()
        }
    }

    const onSuccess = (data) => {
        AppManager.hideLoader()
        AppManager.showSimpleMessage('success', { message: 'Feedback submitted successfully', description: '', floating: true })
        resetText()
    }

    const onError = (error) => {
        AppManager.hideLoader()
    }

    function resetText() {
        setFeedback('')
    }

    return (
        <ScrollView keyboardShouldPersistTaps='handled' style={[styles.container,{marginBottom:Platform.OS == 'ios' ? keyboardHeight: 0}]}>
            <View style={styles.mainView}>
                <Text style={styles.textViewStyle}>{translate("Feedback")}</Text>
            </View>


            <EditText
                placeholder={translate("Type here")}
                style={styles.descStyle}
                value={feedback}
                onChangeText={(value) => { setFeedback(value) }}
                maxLength={MAX_CHARACTERS_LIMIT}
                multiline={true}
                numberOfLines={4}
            />


            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => resetText()} style={[styles.cancelButton]}>
                    <Text style={styles.buttonTextColor}>{translate("Reset")}</Text>
                </TouchableOpacity>

                <Text style={styles.textStyle}>{translate("Feedback__string")}</Text>
            </View>

            <TouchableOpacity onPress={() => onSubmitFeedback()} style={styles.submitButtonStyle}>
                <Text style={styles.submitTextStyle}>{translate("Submit")}</Text>
            </TouchableOpacity>

        </ScrollView>
        // </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorConstant.WHITE,
    },
    mainView: {
        width: "100%", 
        alignSelf: 'center', 
        alignItems: 'center', 
        justifyContent: 'space-evenly', 
        backgroundColor: ColorConstant.ORANGE, 
        height: hp(5)
    },
    textViewStyle: {
        color: ColorConstant.WHITE, 
        fontWeight: 'bold', 
        fontSize: FontSize.FontSize.medium,
    },
    descStyle: {
        //minHeight: hp(40),
        height:hp(40),
        textAlignVertical: 'top',
        borderColor: ColorConstant.GREY,
        borderWidth: 1,
        width: '85%',
        alignSelf: 'center',
        alignItems:'flex-start',
        marginTop: hp(4),
        fontSize: FontSize.FontSize.small
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '85%',
    },
    cancelButton: {
        borderRadius: 6,
        width: '30%',
        height: hp(5),
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: ColorConstant.ORANGE,
        marginLeft: wp(8)
    },
    buttonTextColor: {
        textAlign: 'center',
        color: ColorConstant.ORANGE,
        fontSize: hp(2.2)
    },

    textStyle: {
        color: ColorConstant.GREY,
        fontSize: FontSize.FontSize.small,
        fontStyle: 'italic',
        marginLeft: wp(15)
    },
    submitButtonStyle: {
        borderRadius: 6, 
        marginTop: hp(5), 
        width: '85%', 
        alignSelf: 'center', 
        alignItems: 'center', 
        justifyContent: 'space-evenly', 
        backgroundColor: ColorConstant.BLUE, 
        height: hp(5),
        marginBottom:hp(3)
    },
    submitTextStyle: {
        color: ColorConstant.WHITE, 
        fontWeight: 'bold', 
        fontSize: FontSize.FontSize.medium
    }
})

export default Feedback;
