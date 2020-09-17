import React, { useState, Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import images from '../../../constants/images';
import { ColorConstant } from '../../../constants/ColorConstants';
import FontSize from '../../../component/FontSize';
import TextField from '../../../component/TextField';
import Dialog, { DialogContent, DialogFooter, DialogButton } from 'react-native-popup-dialog';
import DropDown from '../../../component/DropDown';
import CheckBox from 'react-native-check-box'

const EditProfile = ({ navigation, route, index }) => {
    const { firstName, lastName, emailId, phoneNumber } = route.params;

    const [value, setValue] = useState();
    const [cancel, setCancel] = useState(false)
    const [viewDialogBox, setViewDialogBox] = useState(false)
    const [country, setCountry] = useState();
    const [isSelected, setIsSelected] = useState(false)

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

                    <View style={styles.cardContainer}>
                        <TouchableOpacity onPress={() => { setViewDialogBox(!viewDialogBox) }}>
                            <View style={styles.billingView}>
                                <Text style={styles.billingAddressText}>Billing Address</Text>
                                <Image source={images.image.settings.billingAddress} />
                            </View>
                            <View style={styles.footerIconStyle}>
                                <Image source={images.image.settings.downArrow} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.cardContainer}>
                        <TouchableOpacity onPress={() => { navigation.navigate('Settings') }}>
                            <View style={styles.billingView}>
                                <Text style={styles.billingAddressText}>Shipping Address</Text>
                                <Image source={images.image.settings.billingAddress} />
                            </View>
                            <View style={styles.footerIconStyle}>
                                <Image source={images.image.settings.downArrow} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => { cancel ? setCancel(false) : setCancel(true), navigation.goBack() }} style={[styles.cancelButton]}>
                            <Text style={styles.buttonTextColor}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('Passcode')}
                            style={styles.LoginButton}>
                            <Text style={styles.LoginButtonText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            <Dialog
                visible={viewDialogBox}
                onTouchOutside={() => { setViewDialogBox(false) }}
            >
                <DialogContent>
                    <View style={styles.billingAddressDialogView}>
                        <View style={styles.billingMainView}>
                            <Image source={images.image.settings.billing} />
                            <Text style={styles.headingTextStyle} >Billing Address</Text>
                            <Image source={images.image.settings.crossIcon} />
                        </View>
                        <View style={styles.textInputField}>
                            <TextField valueSet={setValue} label='Address line 1*' value={"Toronto City Hall 100 Queen St W"} style={styles.textNameStyle} labelFontSize={hp(1.4)} labelTextStyle={{ top: hp(0.5) }} contentInset={{ input: 12 }} />
                        </View>

                        <View style={styles.textInputField}>
                            <TextField valueSet={setValue} label='Address line 2*' style={styles.textNameStyle} labelFontSize={hp(1.4)} labelTextStyle={{ top: hp(0.5) }} contentInset={{ input: 12 }} />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
                            <View style={{shadowColor: ColorConstant.GREY, shadowOpacity: 0.5, shadowRadius: 10}}> 
                                <CheckBox
                                    style={{  }}
                                    unCheckedImage={<Image source={images.image.settings.rectangle} ></Image>}
                                    checkedImage={<Image source={images.image.settings.GroupCheckBox}></Image>}
                                    onClick={() => { setIsSelected(!isSelected) }}
                                    isChecked={isSelected}
                                />
                            </View>
                           
                            <Text style={styles.termsConditionStyle}>In this address also your shipping address?</Text>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => { setViewDialogBox(false)}} style={[styles.cancelButton]}>
                                <Text style={styles.buttonTextColor}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => { setViewDialogBox(false)}}
                                style={styles.LoginButton}>
                                <Text style={styles.LoginButtonText}>Save</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </DialogContent>

            </Dialog>


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
    footerIconStyle: {
        backgroundColor: ColorConstant.BLUE,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        alignItems: 'center',
        padding: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp(75),
        marginTop: hp(6),
        alignSelf: 'center',
        // paddingBottom: hp(6)
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