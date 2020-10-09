import React, { useState, Component, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import images from '../../../constants/images'
import { ColorConstant } from '../../../constants/ColorConstants'
import { getLoginState } from '../../Selector'
import FontSize from '../../../component/FontSize'
import ShadowView from 'react-native-simple-shadow-view'
import Dialog from '../../../component/Dialog'

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

    useEffect(() => {
    
    }, [])

    function RenderBillingDialog(item, index) {
        return (
            <Dialog 
                    heading="Are you sure ?"
                    message={"Do you really want to delete Home Address ?"}
                    visible={dialogVisible}
                    onTouchOutside={() => setDialogVisible(false)}
                    positiveButtonName={"Delete"}
                    negativeButtonName={"Cancel"}
                    negativeHandle={() => setDialogVisible(false)}
                    positiveHandle={() => setDialogVisible(false)}
                />
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.mainView}>
                <Text style={styles.textViewStyle}>My Profile</Text>
            </View>

            <View style={styles.mainViewStyle}>
                <View style={styles.blueBoxStyle}>
                <Text style={styles.textStyle}>{loginData.firstName} {loginData.lastName}</Text>

                    <TouchableOpacity onPress={()=> { navigation.navigate('EditProfile', {firstName:loginData.firstName,lastName:loginData.lastName, phoneNumber:loginData.phone, emailId:loginData.email}) }} >
                        <Image source={images.image.edit} />
                    </TouchableOpacity>
                </View>

                <View style={styles.subMainView}>
                    <View style={styles.emailMainView}>
                        <Image source={images.image.settings.email} style={{ height: hp(1.8), width: hp(1.8) }} resizeMode='contain' />
                        <Text style={styles.emailText}>{loginData.email}</Text>
                    </View>

                    <View style={styles.emailMainView}>
                        <Image source={images.image.settings.phone} style={{ height: hp(1.8), width: hp(1.8) }} resizeMode='contain' />
                        <Text style={styles.emailText}>{loginData.phone}</Text>
                    </View>
                </View>

                <View style={styles.billingAddressMainView}>
                    <View style={styles.billingView}>
                        <Text style={styles.billingAddressText}>Billing Address</Text>
                        <Image source={images.image.settings.billingAddress} />
                    </View>

                    <View style={styles.underLineStyle} />

                    <View style={styles.textMainView}>
                        <Text style={styles.textStyleNone}>None</Text>
                    </View>
                </View>

                <View style={styles.billingAddressMainView}>
                    <View style={styles.billingView}>
                        <Text style={styles.billingAddressText}>Shipping Address</Text>
                        <Image source={images.image.settings.shippingAddress} />
                    </View>

                    <View style={styles.underLineStyle} />

                    <TouchableOpacity style={styles.textMainView} onPress={() => { setDialogVisible(!dialogVisible) }}>
                        <Text style={styles.textStyleNone}>None</Text>
                        <Image source={images.image.settings.trash} />
                    </TouchableOpacity>
                </View>

                {RenderBillingDialog()}

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
        // elevation: 3,
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
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: hp(2),
        marginTop: hp(1)
    },
    emailMainView: {
        flexDirection: 'row',
    },
    emailText: {
        color: ColorConstant.BLACK,
        fontSize: hp(1.4),
        marginLeft: wp(3)
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