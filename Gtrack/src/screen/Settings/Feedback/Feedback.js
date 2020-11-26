import React, { useState, Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { EditText, FontSize } from '../../../../src/component'
import { ColorConstant } from '../../../constants/ColorConstants';
import { FEEDBACK_VALIDATION_ERROR } from '../../../constants/AppConstants'
import images from '../../../constants/images';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginState } from '../../Selector';
import AppManager from '../../../constants/AppManager';
import * as SettingsActions from '../Settings.Action'
import isEmpty from 'lodash/isEmpty'
import DeviceInfo from 'react-native-device-info';
import { ScrollView } from 'react-native-gesture-handler';

const Feedback = ({ navigation }) => {

    const { loginData, isConnected } = useSelector(state => ({
        loginData: getLoginState(state),
        isConnected: state.network.isConnected
    }))
    
    const MAX_CHARACTERS_LIMIT = 250

    const [feedback, setFeedback] = useState('')

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
                    Settings
                </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={{ marginLeft: hp(2) }} source={images.image.back} />
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
        <ScrollView style={styles.container}>
            <View style={styles.mainView}>
                <Text style={styles.textViewStyle}>Feedback</Text>
            </View>


            <EditText
                placeholder="Type here"
                style={styles.descStyle}
                value={feedback}
                onChangeText={(value) => { setFeedback(value) }}
                maxLength={MAX_CHARACTERS_LIMIT}
                multiline={true}
                numberOfLines={4}
            />
           

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => resetText()} style={[styles.cancelButton]}>
                    <Text style={styles.buttonTextColor}>Reset</Text>
                </TouchableOpacity>

                <Text style={styles.textStyle}>Maximum 250 characters</Text>
            </View>

            <TouchableOpacity onPress={() => onSubmitFeedback()} style={styles.submitButtonStyle}>
                <Text style={styles.submitTextStyle}>Submit</Text>
            </TouchableOpacity>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorConstant.WHITE,
    },
    mainView: {
        width: '95%', 
        alignSelf: 'center', 
        alignItems: 'center', 
        justifyContent: 'space-evenly', 
        backgroundColor: ColorConstant.ORANGE, 
        height: hp(5)
    },
    textViewStyle: {
        color: ColorConstant.WHITE, 
        fontWeight: 'bold', 
        fontSize: FontSize.FontSize.medium
    },
    descStyle: {
        //minHeight: hp(40),
        height:hp(40),
        textAlignVertical: 'top',
        borderColor: ColorConstant.GREY,
        borderWidth: 1,
        width: '85%',
        alignSelf: 'center',
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
        height: hp(5)
    },
    submitTextStyle: {
        color: ColorConstant.WHITE, 
        fontWeight: 'bold', 
        fontSize: FontSize.FontSize.medium
    }
})

export default Feedback;
