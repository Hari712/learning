import React, { useState, Component, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView, Dimensions, FlatList, SafeAreaView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import images from '../../../constants/images';
import { useDispatch, useSelector } from 'react-redux'
import { ColorConstant } from '../../../constants/ColorConstants';
import { FontSize, TextField }from '../../../component';
import * as ProfileActions from '../Profile/Profile.Action'
import AppManager from '../../../constants/AppManager'
import { translate } from '../../../../App'
import { AppConstants, SCREEN_CONSTANTS } from '../../../constants/AppConstants';
import { BackIcon } from '../../../component/SvgComponent';
import { isEmpty } from 'lodash';
import { validateEmailorPhoneNumber } from '../../../utils/helper';


const EditProfile = ({ navigation, route, item }) => {
    const dispatch = useDispatch()

    const { loginData, userType } = route.params;
    const { id } = loginData;


    //User data variables
    const [firstName, setFirstName] = useState(loginData.firstName);
    const [lastName, setLastName] = useState(loginData.lastName);
    const [phoneNumber, setPhoneNumber] = useState(loginData.phone)

    // useEffect ()

    const [value, setValue] = useState();
    const [cancel, setCancel] = useState(false)
    const [country, setCountry] = useState();
    const [isSelected, setIsSelected] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(false)

    //RenderBillingDialog
    const [viewDialogBox, setViewDialogBox] = useState(false)
    const [address1Value, setAddress1Value] = useState();
    const [address2Value, setAddress2Value] = useState();
    const [postalCode, setPostalCode] = useState();

    const [addressLine1, setAddressLine1] = useState();
    const [addressLine2, setAddressLine2] = useState();

    const [data, setData] = useState([]);

    const [isClickOnSave, setIsClickOnSave] = useState(false);

    // RenderShippingEditDialog
    const [viewEditDialogBox, setViewEditDialogBox] = useState(false)
    const [viewEditShippingAddName, setViewEditShippingAddName] = useState()
    const [editShippingAddName, setEditShippingAddName] = useState()

    //RenderNewShippingDialog
    const [viewNewShippingDialog, setViewNewShippingDialog] = useState(false)
    const [newShippingAddressName, setNewShippingAddressName] = useState()
    const [newShippingAddressLine1, setNewShippingAddressLine1] = useState()
    const [newShippingAddressLine2, setNewShippingAddressLine2] = useState()

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

    // const BillingAddress = () => {
    //     return (
    //         <View style={styles.cardContainer}>
    //             {isCollapsed && isClickOnSave ?
    //                 <View >
    //                     <View style={styles.billingView}>
    //                         <Text style={{ fontSize: FontSize.FontSize.small, color: ColorConstant.ORANGE, fontWeight: '500' }}>Billing Address</Text>
    //                         <Image source={images.image.settings.billing} />
    //                     </View>

    //                     <View style={styles.underLineStyle} />

    //                     <View style={styles.textMainView}>
    //                         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: hp(1) }}>
    //                             <View>
    //                                 <Text style={styles.textStyleNone}>{addressLine1}</Text>
    //                                 <Text style={styles.textStyleNone}>{addressLine2}</Text>
    //                                 <Text style={styles.textStyleNone}>{country}</Text>
    //                             </View>

    //                             <TouchableOpacity style={{ marginTop: hp(1) }} onPress={() => { setViewEditDialogBox(!viewEditDialogBox) }}>
    //                                 <Image source={images.image.settings.editIcon} />
    //                             </TouchableOpacity>
    //                         </View>
    //                     </View>

    //                     <TouchableOpacity style={styles.shippingFooterStyle} onPress={() => { setIsCollapsed(!isCollapsed) }} >
    //                         <Image source={images.image.settings.upArrow} />
    //                     </TouchableOpacity>

    //                 </View>
    //                 :
    //                 <View>
    //                     <TouchableOpacity onPress={() => { setViewDialogBox(!viewDialogBox) }}>
    //                         <View style={styles.billingView}>
    //                             <Text style={styles.billingAddressText}>Billing Address</Text>
    //                             <Image source={images.image.settings.billingAddress} />
    //                         </View>
    //                     </TouchableOpacity>

    //                     <View style={styles.footerIconStyle}>
    //                         {!isClickOnSave ?
    //                             null
    //                             :
    //                             <TouchableOpacity onPress={() => { setIsCollapsed(!isCollapsed) }} >
    //                                 <Image source={images.image.settings.downArrow} onPress />
    //                             </TouchableOpacity>
    //                         }
    //                     </View>
    //                 </View>
    //             }
    //         </View>
    //     )
    // }

    // const ShippingAddress = (item, index) => {
    //     console.log('item-------', item)
    //     return (
    //         <View>
    //             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: hp(1) }}>
    //                 <View>
    //                     {setEditShippingAddName ?
    //                         <View>
    //                             <Text style={styles.textStyleNone}>{item.item.Name ? item.item.Name : ''}</Text>
    //                             <Text style={styles.textStyleNone}>{item.item.AddressLine1}</Text>
    //                             <Text style={styles.textStyleNone}>{item.item.AddressLine2}</Text>
    //                             <Text style={styles.textStyleNone}>{item.item.country}</Text>
    //                         </View>
    //                         :
    //                         <View>
    //                             <Text style={styles.textStyleNone}>{item.item.AddressLine1}</Text>
    //                             <Text style={styles.textStyleNone}>{item.item.AddressLine2}</Text>
    //                             <Text style={styles.textStyleNone}>{item.item.country}</Text>
    //                         </View>
    //                     }
    //                 </View>

    //                 <TouchableOpacity style={{ marginTop: hp(1) }} onPress={() => { setViewEditDialogBox(!viewEditDialogBox) }}>
    //                     <Image source={images.image.settings.editIcon} />
    //                 </TouchableOpacity>

    //             </View>

    //             <View style={styles.underLineStyle} />
    //         </View>
    //     )
    // }

    function hideDialog() {
        setViewDialogBox(false)
        setViewEditDialogBox(false)
        setViewNewShippingDialog(false)
    }

    useEffect(() => {
        console.log('Dialog Visibility', viewDialogBox)
        console.log('Dialog Visibility', viewEditDialogBox)
        console.log('Dialog Visibility', viewNewShippingDialog)
    }, [viewDialogBox], [viewEditDialogBox], [viewNewShippingDialog])

    function storeItem(item, index) {
        let array = []
        let dataItems = {
            Name: viewEditShippingAddName,
            AddressLine1: address1Value,
            AddressLine2: address2Value,
            zip: postalCode,
            country: country
        }
        array.push(dataItems)
        setData(array)
    }

    function editProfile() {
        let message = ''
        if(!validateEmailorPhoneNumber(phoneNumber)){
            message = translate(AppConstants.INVALID_PHONE_NUMBER) 
        }
        if(!isEmpty(message)){
            AppManager.showSimpleMessage('warning', { message: message, description: '', floating: true })
        } else {
        AppManager.showLoader()
        const requestBody = {
            "id": id,
            "firstName": firstName,
            "lastName": lastName,
            "email": loginData.email,
            "phone": phoneNumber
            //"phonePrefix": phonePrefix
        }
        console.log("Data", requestBody);
        dispatch(ProfileActions.requestEditProfile(requestBody, id, onSuccess, onError))
    }
}

    function onSuccess(data) {
        AppManager.hideLoader()
        console.log("Success", data)
        dispatch(ProfileActions.setEditProfileResponse(data))
        AppManager.showSimpleMessage('success', { message: 'Profile updated successfully', description: '', floating: true })
        navigation.navigate(SCREEN_CONSTANTS.PROFILE)
    }

    function onError(error) {
        AppManager.hideLoader()
        console.log("Error", error)
        AppManager.showSimpleMessage('warning', { message: error, description: '', floating: true })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainView}>
                <Text style={styles.textViewStyle}>{translate("Edit Profile")}</Text>
            </View>

            <ScrollView keyboardShouldPersistTaps='handled' style={{ height: "100%" }}>
                <View style={styles.mainViewStyle}>
                    <View style={styles.textInputField}>
                        <TextField
                            valueSet={setFirstName}
                            label={translate("First Name")}
                            value={firstName}
                            style={styles.textNameStyle}
                            labelFontSize={hp(1.4)}
                            labelTextStyle={{ top: hp(0.5) }}
                        />
                    </View>

                    <View style={styles.textInputField}>
                        <TextField
                            valueSet={setLastName}
                            label={translate("Last Name")}
                            value={lastName}
                            style={styles.textNameStyle}
                            labelFontSize={hp(1.4)}
                            labelTextStyle={{ top: hp(0.5) }}
                        />
                    </View>

                    <View style={styles.textInputField}>
                        <TextField
                            valueSet={setPhoneNumber}
                            label={translate("Phone Number")}
                            value={phoneNumber}
                            style={styles.textNameStyle}
                            labelFontSize={hp(1.4)}
                            labelTextStyle={{ top: hp(0.5) }}
                        />
                    </View>

                    <View style = {{flexDirection: 'row'}}>
                        <View style = {{ marginLeft: wp(1) }}>
                            <Text style={styles.EmailTextStyle}>{translate("Email Address")}</Text>
                            <Text style={styles.textNameStyle}>{loginData.email}</Text>
                        </View>
                           
                        <View style = {{ marginLeft: wp(15)}}>
                            <Text style={styles.EmailTextStyle}>{translate("User Type")}</Text>
                            <Text style={styles.textNameStyle}>{userType == "ROLE_OWNER" ? "Owner" : "Regular"}</Text>
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => { cancel ? setCancel(false) : setCancel(true), navigation.goBack() }} style={[styles.cancelButton]}>
                            <Text style={styles.buttonTextColor}>{translate("Cancel")}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => editProfile()}
                            style={styles.LoginButton}>
                            <Text style={styles.LoginButtonText}>{translate("Done")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
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
    },
    textInputField: {
        width: '100%',
        alignSelf: 'center',
        margin: hp(1.5)
    },
    countryField: {
        width: '45%',
    },
    checkboxMainStyle: {
        flexDirection: 'row',
        width: wp(75),
        margin: hp(1.5),
    },
    termsConditionStyle: {
        color: ColorConstant.BLACK,
        fontSize: FontSize.FontSize.small,
        marginLeft: wp(3)
    },
    textNameStyle: {
        color: ColorConstant.BLACK,
        fontSize: FontSize.FontSize.small,
        fontWeight: '500',
    },
    EmailTextStyle: {
        color: ColorConstant.GREY,
        fontSize: hp(1.4),
        marginBottom: hp(1)
    },
    cardContainer: {
        width: Dimensions.get('screen').width - 30,
        marginTop: hp(2),
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
    subCardContainer: {
        width: Dimensions.get('screen').width - 60,
        marginTop: hp(2),
        alignSelf: 'center',
        backgroundColor: ColorConstant.PINK,
        borderRadius: 15,
        elevation: 3,
        borderWidth: 0.3,
        borderColor: ColorConstant.GREY,
        shadowColor: ColorConstant.GREY,
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 0 },
        marginBottom: hp(3)
    },
    billingView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: hp(1.5),
        marginVertical: hp(1)
    },
    billingAddressText: {
        color: ColorConstant.BLACK,
        fontSize: FontSize.FontSize.small,
    },
    underLineStyle: {
        borderBottomColor: ColorConstant.GREY,
        borderBottomWidth: 0.5,
        marginHorizontal: hp(1),
    },
    textMainView: {
        marginHorizontal: hp(1.5),
        marginVertical: hp(1)
    },
    textStyleNone: {
        color: ColorConstant.BLACK,
        fontSize: FontSize.FontSize.small
    },
    footerIconStyle: {
        backgroundColor: ColorConstant.BLUE,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        alignItems: 'center',
        padding: 5,
    },
    shippingFooterStyle: {
        backgroundColor: ColorConstant.ORANGE,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        alignItems: 'center',
        padding: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp(75),
        marginTop: hp(10),
        alignSelf: 'center',
        paddingBottom: hp(6)
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
    billingAddressDialogView: {
        width: wp(80),
        height: hp(75)
    },
    billingMainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: hp(2),
        marginBottom: hp(3)
    },
    headingTextStyle: {
        color: ColorConstant.ORANGE,
        fontSize: FontSize.FontSize.small,
        fontWeight: '500'
    },
})

export default EditProfile;

const countryList = ['Canada', 'India', 'USA'];

const DATA = [
    {
        Name: "Home",
        AddressLine1: "Amarcar",
        AddressLine2: 'Gorwa',
        zip: '6523154'
    },
]