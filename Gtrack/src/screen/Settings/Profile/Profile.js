import React, { useState, Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import images from '../../../constants/images';
import { ColorConstant } from '../../../constants/ColorConstants';
import { getLoginState } from '../../Selector';
import ShadowView from 'react-native-simple-shadow-view';
import { translate } from '../../../../App'
import { Dialog, FontSize }from '../../../component';
import { SCREEN_CONSTANTS } from '../../../constants/AppConstants';
import { BackIcon, EditIcon } from '../../../component/SvgComponent';

const Profile = ({ navigation }) => {

    const [dialogVisible,setDialogVisible] = useState(false)

    const { loginData } = useSelector(state => ({
        loginData: getLoginState(state),
    }))

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
                <TouchableOpacity onPress={() => navigation.goBack()}>
                   <BackIcon style={{marginLeft:hp(2)}}/>
                </TouchableOpacity>
            )
            
        });
    }, [navigation]);

    useEffect(() => {
    
    }, [])

    function RenderBillingDialog(item, index) {
        return (
            <Dialog 
                    heading={translate("Dailog_string")}
                    message={translate("Dailog_string1")}
                    visible={dialogVisible}
                    onTouchOutside={() => setDialogVisible(false)}
                    positiveButtonName={translate("Delete")}
                    negativeButtonName={translate("Cancel")}
                    negativeHandle={() => setDialogVisible(false)}
                    positiveHandle={() => setDialogVisible(false)}
                />
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.mainView}>
                <Text style={styles.textViewStyle}>{translate("Profile_string2")}</Text>
            </View>

            <View style={styles.mainViewStyle}>
                <View style={styles.blueBoxStyle}>
                <Text style={styles.textStyle}>{loginData.firstName} {loginData.lastName}</Text>

                    <TouchableOpacity onPress={()=> { navigation.navigate(SCREEN_CONSTANTS.EDIT_PROFILE, {loginData:loginData}) }} >
                        <EditIcon width={12.947} height={12.947}/>
                    </TouchableOpacity>
                </View>

                {/* <View style={styles.subMainView}>
                    <View style={styles.emailMainView}>
                        <Image source={images.image.settings.email} style={{ height: hp(1.8), width: hp(1.8), }} resizeMode='contain' />
                        <Text style={styles.emailText}>{loginData.email}</Text>
                    </View>

                    <View style={[styles.emailMainView,{flex:0.4}]}>
                        <Image source={images.image.settings.phone} style={{ height: hp(1.8), width: hp(1.8) }} resizeMode='contain' />
                        <Text style={styles.emailText}>{loginData.phonePrefix} {loginData.phone}</Text>
                    </View>
                </View> */}

                <View style={styles.subMainView}>
                    <View style = {{flexDirection: 'row' }}>
                        <View style = {{ }}>
                            <Text  style={styles.emailText}> {translate("Mobile Number")} </Text>
                            <Text  style={styles.emailText}> {translate("Email Address")} </Text>
                            <Text  style={styles.emailText}> {translate("User Type")} </Text>
                        </View>
                        <View style = {{ }}>
                            <Text style={[styles.emailText, {marginLeft: wp(5)}]}>{loginData.phonePrefix} {loginData.phone}</Text>
                            <Text style={[styles.emailText, {marginLeft: wp(5)}]}>{loginData.email}</Text>
                            <Text style={[styles.emailText, {marginLeft: wp(5)}]}>Member</Text>
                        </View>
                        
                    </View>
                </View>

            </View>
           

        </View>
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
    mainViewStyle: {
        width: Dimensions.get('screen').width - 30,
        marginTop: hp(3),
        alignSelf: 'center',
        backgroundColor: ColorConstant.WHITE,
        borderRadius: 15,
        elevation: 4,
        borderWidth: 0.3,
        borderColor: ColorConstant.GREY,
        shadowColor: ColorConstant.GREY,
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 0 },
        paddingBottom: hp(3)
    },
    blueBoxStyle: {
        backgroundColor: ColorConstant.BLUE,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        alignItems: 'center',
        padding: 12
    },
    textStyle: {
        fontSize: FontSize.FontSize.small,
        fontWeight: "bold",
        color: ColorConstant.WHITE
    },
    subMainView: {
        // alignItems: 'center',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        padding: hp(2),
        // marginTop: hp(1)
    },
    emailMainView: {
        flexDirection: 'row',
        alignItems:'center',
        flex:1,
        justifyContent:'space-evenly'
    },
    emailText: {
        color: ColorConstant.BLACK,
        fontSize: hp(1.4),
        marginTop: hp(3)
    },
    billingAddressMainView: {
        width: Dimensions.get('screen').width - 50,
        marginTop: hp(3),
        alignSelf: 'center',
        backgroundColor: ColorConstant.WHITE,
        borderRadius: 15,
        // elevation: 3,
        borderWidth: 0.3,
        borderColor: ColorConstant.GREY,
        shadowColor: ColorConstant.GREY,
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 0 },
    },
    billingView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: hp(3),
        marginVertical: hp(1)
    },
    billingAddressText: {
        color: ColorConstant.BLUE,
        fontSize: hp(1.4),
    },
    underLineStyle: {
        borderBottomColor: ColorConstant.GREY, 
        borderBottomWidth: 0.5, 
        marginHorizontal: hp(2),
    },
    textMainView: {
        marginHorizontal: hp(3),
        marginVertical: hp(1),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },  
    textStyleNone: {
        color: ColorConstant.BLACK, 
        fontSize: FontSize.FontSize.small
    },
    billingAddressDialogView: {
        width: wp(80),
        height: hp(25)
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp(75),
        marginTop: hp(5),
        alignSelf: 'center',
        paddingBottom: hp(6),
    },
    cancelButton: {
        borderRadius: 6,
        width: '42%',
        height: hp(6),
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: ColorConstant.BLUE,
    },
    buttonTextColor: {
        textAlign: 'center',
        color: ColorConstant.BLUE
    },
    LoginButton: {
        borderRadius: 6,
        width: '42%',
        height: hp(6),
        justifyContent: 'center',
        backgroundColor: ColorConstant.BLUE,
    },
    LoginButtonText: {
        textAlign: 'center',
        color: ColorConstant.WHITE,
        fontWeight: 'bold'
    },
})

export default Profile;