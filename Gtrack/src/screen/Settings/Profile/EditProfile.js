import React, { useState, Component, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import images from '../../../constants/images';
import { ColorConstant } from '../../../constants/ColorConstants';
import FontSize from '../../../component/FontSize';
import TextField from '../../../component/TextField';
import Dialog, { DialogContent, DialogFooter, DialogButton } from 'react-native-popup-dialog';
import DropDown from '../../../component/DropDown';
import CheckBox from 'react-native-check-box'

const EditProfile = ({ navigation, route, item }) => {
    const { firstName, lastName, emailId, phoneNumber } = route.params;
    const [value, setValue] = useState();
    const [cancel, setCancel] = useState(false)
    const [country, setCountry] = useState();
    const [isSelected, setIsSelected] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(false)

    //RenderBillingDialog
    const [viewDialogBox, setViewDialogBox] = useState(false)
    const [address1Value, setAddress1Value] = useState();
    const [address2Value, setAddress2Value] = useState();

    const [addressLine1, setAddressLine1] = useState();
    const [addressLine2, setAddressLine2] = useState();

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
    const [viewNewShippingAdd, setViewNewShippingAdd] = useState()

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

    const BillingAddress = () => {
        return (
            <View style={styles.cardContainer}>
                <TouchableOpacity onPress={() => { setViewDialogBox(!viewDialogBox) }}>
                    <View style={styles.billingView}>
                        <Text style={styles.billingAddressText}>Billing Address</Text>
                        <Image source={images.image.settings.billingAddress} />
                    </View>
                </TouchableOpacity>

                <View style={styles.footerIconStyle}>
                    {!isClickOnSave ?
                        null
                        :
                        <TouchableOpacity onPress={() => { setIsCollapsed(!isCollapsed) }} >
                            <Image source={images.image.settings.downArrow} onPress />
                        </TouchableOpacity>
                    }
                </View>

                {isCollapsed && isClickOnSave ?
                    <View style={styles.cardContainer}>
                        <View style={styles.billingView}>
                            <Text style={{ fontSize: FontSize.FontSize.small, color: ColorConstant.ORANGE, fontWeight: '500' }}>Billing Address</Text>
                            <Image source={images.image.settings.billing} />
                        </View>

                        <View style={styles.underLineStyle} />

                        <View style={styles.textMainView}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: hp(1) }}>
                                <View>
                                    <Text style={styles.textStyleNone}>{addressLine1}</Text>
                                    <Text style={styles.textStyleNone}>{addressLine2}</Text>
                                    <Text style={styles.textStyleNone}>{country}</Text>
                                </View>

                                <TouchableOpacity style={{ marginTop: hp(1) }} onPress={() => { setViewEditDialogBox(!viewEditDialogBox) }}>
                                    <Image source={images.image.settings.editIcon} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.shippingFooterStyle}>
                            <Image source={images.image.settings.upArrow} />
                        </View>

                    </View>
                    :
                    null

                }

            </View>
        )
    }

    // <View style={styles.cardContainer}>
    //     <View style={styles.billingView}>
    //         <Text style={{ fontSize: FontSize.FontSize.small, color: ColorConstant.ORANGE, fontWeight: '500' }}>Billing Address</Text>
    //         <Image source={images.image.settings.billing} />
    //     </View>

    //     <View style={styles.underLineStyle} />

    //     <View style={styles.textMainView}>
    //         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: hp(1) }}>
    //             <View>
    //                 <Text style={styles.textStyleNone}>{addressLine1}</Text>
    //                 <Text style={styles.textStyleNone}>{addressLine2}</Text>
    //                 <Text style={styles.textStyleNone}>{country}</Text>
    //             </View>

    //             <TouchableOpacity style={{ marginTop: hp(1) }} onPress={() => { setViewEditDialogBox(!viewEditDialogBox) }}>
    //                 <Image source={images.image.settings.editIcon} />
    //             </TouchableOpacity>
    //         </View>
    //     </View>

    //     <View style={styles.shippingFooterStyle}>
    //         <Image source={images.image.settings.upArrow} />
    //     </View>

    // </View>


    const ShippingAddress = () => {
        return (
            <View>
                {!isSelected ?
                    <View style={styles.cardContainer}>
                        <TouchableOpacity onPress={() => { navigation.navigate('Settings') }}>
                            <View style={styles.billingView}>
                                <Text style={styles.billingAddressText}>Shipping Address</Text>
                                <Image source={images.image.settings.billingAddress} />
                            </View>
                            <View style={styles.footerIconStyle}>

                            </View>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={styles.cardContainer}>
                        <View style={styles.billingView}>
                            <Text style={{ fontSize: FontSize.FontSize.small, color: ColorConstant.ORANGE, fontWeight: '500' }}>Shipping Address</Text>
                            <Image source={images.image.settings.address} />
                        </View>

                        <View style={styles.underLineStyle} />

                        <View style={styles.textMainView}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: hp(1) }}>
                                <View>
                                    {setEditShippingAddName ?
                                        <View>
                                            <Text style={styles.textStyleNone}>{viewEditShippingAddName}</Text>
                                            <Text style={styles.textStyleNone}>{addressLine1}</Text>
                                            <Text style={styles.textStyleNone}>{addressLine2}</Text>
                                            <Text style={styles.textStyleNone}>{country}</Text>
                                        </View>
                                        :
                                        <View>
                                            <Text style={styles.textStyleNone}>{addressLine1}</Text>
                                            <Text style={styles.textStyleNone}>{addressLine2}</Text>
                                            <Text style={styles.textStyleNone}>{country}</Text>
                                        </View>
                                    }
                                </View>

                                <TouchableOpacity style={{ marginTop: hp(1) }} onPress={() => { setViewEditDialogBox(!viewEditDialogBox) }}>
                                    <Image source={images.image.settings.editIcon} />
                                </TouchableOpacity>

                            </View>

                            <View style={styles.underLineStyle} />

                            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: hp(1) }}>
                            {setViewNewShippingAdd ?
                                <View>
                                    <Text style={styles.textStyleNone}>{newShippingAddressName}</Text>
                                    <Text style={styles.textStyleNone}>{newShippingAddressLine1}</Text>
                                    <Text style={styles.textStyleNone}>{newShippingAddressLine2}</Text>
                                    <Text style={styles.textStyleNone}>{country}</Text>
                                </View>
                                :
                                <View>
                                    <Text style={styles.textStyleNone}>{newShippingAddressLine1}</Text>
                                    <Text style={styles.textStyleNone}>{newShippingAddressLine1}</Text>
                                    <Text style={styles.textStyleNone}>{country}</Text>
                                </View>
                            }
                            <TouchableOpacity style={{ marginTop: hp(1) }} onPress={() => { setViewEditDialogBox(!viewEditDialogBox) }}>
                                <Image source={images.image.settings.editIcon} />
                            </TouchableOpacity>
                        </View> */}

                            <View style={styles.subCardContainer}>
                                <TouchableOpacity style={{ padding: 20 }} onPress={() => { setViewNewShippingDialog(!viewNewShippingDialog) }}>
                                    <Image source={images.image.settings.address} style={{ alignSelf: 'center' }} />
                                    <Text style={{ alignSelf: 'center', marginTop: hp(2), fontSize: FontSize.FontSize.small, fontWeight: '500', color: ColorConstant.ORANGE }}>Add New Shipping Address</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.shippingFooterStyle}>
                            <Image source={images.image.settings.upArrow} />
                        </View>

                    </View>
                }
            </View>
        )
    }

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

    function RenderBillingDialog(item, index) {
        return (
            <Dialog
                visible={viewDialogBox}
                onTouchOutside={() => hideDialog()}
            >
                <DialogContent>
                    <View style={styles.billingAddressDialogView}>
                        <View style={styles.billingMainView}>
                            <Image source={images.image.settings.billing} />
                            <Text style={styles.headingTextStyle}> Billing Address </Text>
                            <Image source={images.image.settings.crossIcon} />
                        </View>
                        <View style={styles.textInputField}>
                            <TextField valueSet={setAddress1Value} label='Address line 1*' value={address1Value} onChangeText={(text) => setAddress1Value(text)} style={styles.textNameStyle} labelFontSize={hp(1.4)} labelTextStyle={{ top: hp(0.5) }} contentInset={{ input: 12 }} />
                        </View>

                        <View style={styles.textInputField}>
                            <TextField valueSet={setAddress2Value} label='Address line 2*' value={address2Value} onChangeText={(text) => setAddress2Value(text)} style={styles.textNameStyle} labelFontSize={hp(1.4)} labelTextStyle={{ top: hp(0.5) }} contentInset={{ input: 12 }} />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', zIndex: 1000 }}>
                            <View style={styles.countryField}>
                                <DropDown defaultValue={country} label='Select Country' valueSet={setCountry} dataList={countryList} />
                            </View>

                            <View style={styles.countryField}>
                                <DropDown defaultValue={country} label='Select State' valueSet={setCountry} dataList={countryList} />
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={styles.countryField}>
                                <DropDown defaultValue={country} label='Select City' valueSet={setCountry} dataList={countryList} />
                            </View>

                            <View style={styles.countryField}>
                                <TextField valueSet={setValue} label='Zip/Postal Code' style={styles.textNameStyle} labelFontSize={hp(1.4)} labelTextStyle={{ top: hp(0.5) }} contentInset={{ input: 12 }} />
                            </View>
                        </View>

                        <View style={styles.checkboxMainStyle}>
                            <View style={{ shadowColor: ColorConstant.GREY, shadowOpacity: 0.5, shadowRadius: 10 }}>
                                <CheckBox
                                    style={{}}
                                    unCheckedImage={<Image source={images.image.settings.rectangle} ></Image>}
                                    checkedImage={<Image source={images.image.settings.GroupCheckBox}></Image>}
                                    onClick={() => { setIsSelected(!isSelected), setAddressLine1(address1Value), setAddressLine2(address2Value) }}
                                    isChecked={isSelected}
                                />
                            </View>
                            <Text style={styles.termsConditionStyle}>In this address also your shipping address?</Text>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => hideDialog()} style={[styles.cancelButton]}>
                                <Text style={styles.buttonTextColor}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => { hideDialog(), setIsClickOnSave(!isClickOnSave), setAddressLine1(address1Value), setAddressLine2(address2Value) }}
                                style={styles.LoginButton}>
                                <Text style={styles.LoginButtonText}>Save</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </DialogContent>
            </Dialog>
        )
    }

    function RenderShippingEditDialog(item, index) {
        return (
            <Dialog
                visible={viewEditDialogBox}
                onTouchOutside={() => hideDialog()}
            >
                <DialogContent>
                    <View style={styles.billingAddressDialogView}>
                        <View style={styles.billingMainView}>
                            <Image source={images.image.settings.address} />
                            <Text style={styles.headingTextStyle} >Edit Shipping Address</Text>
                            <Image source={images.image.settings.crossIcon} />
                        </View>

                        <View style={styles.textInputField}>
                            <TextField valueSet={setViewEditShippingAddName} label='Shipping Address Name*' value={viewEditShippingAddName} onChangeText={(text) => setViewEditShippingAddName(text)} style={styles.textNameStyle} labelFontSize={hp(1.4)} labelTextStyle={{ top: hp(0.5) }} contentInset={{ input: 12 }} />
                        </View>

                        <View style={styles.textInputField}>
                            <TextField valueSet={setAddressLine1} label='Address line 1*' value={address1Value} onChangeText={(text) => setAddressLine1(text)} style={styles.textNameStyle} labelFontSize={hp(1.4)} labelTextStyle={{ top: hp(0.5) }} contentInset={{ input: 12 }} />
                        </View>

                        <View style={styles.textInputField}>
                            <TextField valueSet={setAddressLine2} label='Address line 2*' value={address2Value} onChangeText={(text) => setAddressLine2(text)} style={styles.textNameStyle} labelFontSize={hp(1.4)} labelTextStyle={{ top: hp(0.5) }} contentInset={{ input: 12 }} />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', zIndex: 1000 }}>
                            <View style={styles.countryField}>
                                <DropDown defaultValue={country} label='Select Country' valueSet={setCountry} dataList={countryList} />
                            </View>

                            <View style={styles.countryField}>
                                <DropDown defaultValue={country} label='Select State' valueSet={setCountry} dataList={countryList} />
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={styles.countryField}>
                                <DropDown defaultValue={country} label='Select City' valueSet={setCountry} dataList={countryList} />
                            </View>

                            <View style={styles.countryField}>
                                <TextField valueSet={setValue} label='Zip/Postal Code' style={styles.textNameStyle} labelFontSize={hp(1.4)} labelTextStyle={{ top: hp(0.5) }} contentInset={{ input: 12 }} />
                            </View>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => hideDialog()} style={[styles.cancelButton]}>
                                <Text style={styles.buttonTextColor}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => { hideDialog(), setEditShippingAddName(viewEditShippingAddName) }}
                                style={styles.LoginButton}>
                                <Text style={styles.LoginButtonText}>Save</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </DialogContent>
            </Dialog>
        )
    }

    function RenderNewShippingDialog(item, index) {
        return (
            <Dialog
                visible={viewNewShippingDialog}
                onTouchOutside={() => hideDialog()}
            >
                <DialogContent>
                    <View style={styles.billingAddressDialogView}>
                        <View style={styles.billingMainView}>
                            <Image source={images.image.settings.address} />
                            <Text style={styles.headingTextStyle} >New Shipping Address</Text>
                            <Image source={images.image.settings.crossIcon} />
                        </View>

                        <View style={styles.textInputField}>
                            <TextField valueSet={setNewShippingAddressName} label='Shipping Address Name*' value={newShippingAddressName} onChangeText={(text) => setNewShippingAddressName(text)} style={styles.textNameStyle} labelFontSize={hp(1.4)} labelTextStyle={{ top: hp(0.5) }} contentInset={{ input: 12 }} />
                        </View>

                        <View style={styles.textInputField}>
                            <TextField valueSet={setNewShippingAddressLine1} label='Address line 1*' value={newShippingAddressLine1} onChangeText={(text) => setNewShippingAddressLine1(text)} style={styles.textNameStyle} labelFontSize={hp(1.4)} labelTextStyle={{ top: hp(0.5) }} contentInset={{ input: 12 }} />
                        </View>

                        <View style={styles.textInputField}>
                            <TextField valueSet={setNewShippingAddressLine2} label='Address line 2*' value={newShippingAddressLine2} onChangeText={(text) => setNewShippingAddressLine2(text)} style={styles.textNameStyle} labelFontSize={hp(1.4)} labelTextStyle={{ top: hp(0.5) }} contentInset={{ input: 12 }} />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', zIndex: 1000 }}>
                            <View style={styles.countryField}>
                                <DropDown defaultValue={country} label='Select Country' valueSet={setCountry} dataList={countryList} />
                            </View>

                            <View style={styles.countryField}>
                                <DropDown defaultValue={country} label='Select State' valueSet={setCountry} dataList={countryList} />
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={styles.countryField}>
                                <DropDown defaultValue={country} label='Select City' valueSet={setCountry} dataList={countryList} />
                            </View>

                            <View style={styles.countryField}>
                                <TextField valueSet={setValue} label='Zip/Postal Code' style={styles.textNameStyle} labelFontSize={hp(1.4)} labelTextStyle={{ top: hp(0.5) }} contentInset={{ input: 12 }} />
                            </View>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => hideDialog()} style={[styles.cancelButton]}>
                                <Text style={styles.buttonTextColor}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => { hideDialog(), setViewNewShippingAdd(newShippingAddressName) }}
                                style={styles.LoginButton}>
                                <Text style={styles.LoginButtonText}>Save</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.mainView}>
                <Text style={styles.textViewStyle}>Edit Profile</Text>
            </View>

            <ScrollView style={{ height: "100%" }}>
                <View style={styles.mainViewStyle}>
                    <View style={styles.textInputField}>
                        <TextField valueSet={setValue} label='First Name' value={firstName} style={styles.textNameStyle} labelFontSize={hp(1.4)} labelTextStyle={{ top: hp(0.5) }} />
                    </View>

                    <View style={styles.textInputField}>
                        <TextField valueSet={setValue} label='Last Name' value={lastName} style={styles.textNameStyle} labelFontSize={hp(1.4)} labelTextStyle={{ top: hp(0.5) }} />
                    </View>

                    <View style={styles.textInputField}>
                        <Text style={styles.EmailTextStyle}>Email Address</Text>
                        <Text style={styles.textNameStyle}>{emailId}</Text>
                    </View>

                    <View style={styles.textInputField}>
                        <TextField valueSet={setValue} label='Phone Number' value={phoneNumber} style={styles.textNameStyle} labelFontSize={hp(1.4)} labelTextStyle={{ top: hp(0.5) }} />
                    </View>

                    <BillingAddress />

                    <ShippingAddress />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => { cancel ? setCancel(false) : setCancel(true), navigation.goBack() }} style={[styles.cancelButton]}>
                            <Text style={styles.buttonTextColor}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { navigation.goBack() }}
                            style={styles.LoginButton}>
                            <Text style={styles.LoginButtonText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {RenderBillingDialog()}

            {RenderShippingEditDialog()}

            {RenderNewShippingDialog()}

        </View>
    )
}

const countryList = ['Canada', 'India', 'USA'];



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
        elevation: 3,
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
        marginTop: hp(3),
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