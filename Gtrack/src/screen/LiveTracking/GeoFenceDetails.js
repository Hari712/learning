import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, TextInput, Dimensions, ImageBackground } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants';
import FontSize from '../../component/FontSize';
import TextField from '../../component/TextField';
import DropDown from '../../component/DropDown';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import { translate } from '../../../App'

const GeoFenceDetails = ({ navigation }) => {
    const [name, setName] = useState();
    const [description, setDescrption] = useState();
    const [colorPicker, setColorPicker] = useState();
    const [fontsize, setFontsize] = useState();
    const [visibilityFrom, setVisibilityFrom] = useState();
    const [visibilityTo, setVisibilityTo] = useState();
    const [cancel, setCancel] = useState(false)
    const [uploadImage, setUploadImage] = useState('')
    const [isClickOnSave, setIsClickOnSave] = useState(false);
    const [saveButton, setSaveButton] = useState(false);
    const fontsizeList = ['08', '06', '04'];

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={styles.headerTitle}>
                    {translate("Geo Fence")}
                </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={styles.headerLeftStyle} source={images.image.back} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const upload = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            setUploadImage(image.path)
            console.log("images....", image);
        });
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.mainView}>
                <Text style={styles.textViewStyle}>{translate("Geofence_Details_string4")}</Text>
            </View>

            <View style={styles.subContainer}>
                <View style={styles.scene}>

                    <View style={styles.textInputField}>
                        <TextField
                            valueSet={setName}
                            label={translate( "Name_string")}
                            value={name}
                            onChangeText={(text) => setName(text)}
                            style={styles.textNameStyle}
                            labelFontSize={hp(1.4)}
                            labelTextStyle={{ top: hp(0.5) }}
                            contentInset={{ input: 12 }}
                        />
                    </View>

                    <View style={styles.textInputField}>
                        <TextField
                            valueSet={setDescrption}
                            label={translate("Geofence_string2")}
                            value={description}
                            onChangeText={(text) => setDescrption(text)}
                            // style={styles.textNameStyle}
                            labelFontSize={hp(1.4)}
                            labelTextStyle={{ top: hp(0.5) }}
                            multiline={true}
                            contentInset={{ input: 7 }}
                        />
                    </View>

                    <View style={styles.textInputField}>
                        <TextField
                            valueSet={setColorPicker}
                            label={translate("Geofence_Details_string")}
                            value={colorPicker}
                            onChangeText={(text) => setColorPicker(text)}
                            style={styles.textNameStyle}
                            labelFontSize={hp(1.4)}
                            labelTextStyle={{ top: hp(0.5) }}
                            contentInset={{ input: 12 }}
                        />
                    </View>

                    <View style={styles.dropDownMainView}>
                        <View style={styles.dropdownView}>
                            <DropDown
                                defaultValue={fontsize}
                                label={translate("Geofence_string7")}
                                valueSet={setFontsize}
                                dataList={fontsizeList}
                                outerStyle={{ marginBottom: hp(2) }}
                            />

                            <DropDown
                                defaultValue={visibilityFrom}
                                label={translate("Geofence_Details_string1")}
                                valueSet={setVisibilityFrom}
                                dataList={fontsizeList}
                                outerStyle={{ marginBottom: hp(2) }}
                            />

                            <DropDown
                                defaultValue={visibilityTo}
                                label={translate("Geofence_Details_string2")}
                                valueSet={setVisibilityTo}
                                dataList={fontsizeList}
                                outerStyle={{ marginBottom: hp(2) }}
                            />
                        </View>

                        {/* {uploadImage ? */}
                        <TouchableOpacity style={styles.uploadMainView} onPress={upload}>
                            <Image source={images.geoFence.uploadGrey} resizeMode="contain" />
                            <Text style={styles.uploadText}>{translate("Geofence_Details_string3")}</Text>
                        </TouchableOpacity>
                        {/* :
                            <Image source ={{uri:uploadImage}}/> */}
                        {/* } */}
                    </View>

                    <View style={styles.buttonMainContainer}>
                        <TouchableOpacity onPress={() => { cancel ? setCancel(false) : setCancel(true), navigation.goBack() }} style={[styles.cancelButton]}>
                            <Text style={styles.buttonTextColor}>{translate("Cancel_string4")}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('GeoFence'),
                                    setIsClickOnSave(!isClickOnSave),
                                    setName(name),
                                    setDescrption(description),
                                    setColorPicker(colorPicker),
                                    setFontsize(fontsize),
                                    setVisibilityFrom(visibilityFrom),
                                    setVisibilityTo(visibilityTo),
                                    setUploadImage(uploadImage)
                            }} style={styles.nextButton}>
                            <Text style={styles.nextButtonText}>{translate("Save_string")}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    headerTitle: {
        color: ColorConstant.GREY,
        fontSize: FontSize.FontSize.medium,
        fontWeight: '500',
        textAlign: 'center'
    },
    headerLeftStyle: {
        marginLeft: wp(4)
    },
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
    subContainer: {
        height: Dimensions.get('window').height,
        alignItems: 'center',
        backgroundColor: ColorConstant.WHITE
    },
    scene: {
        width: '90%',
        marginHorizontal: hp(5),
        marginTop: hp(2),
    },
    textInputField: {
        width: '100%',
        alignSelf: 'center',
        margin: hp(0.5)
    },
    dropDownMainView: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        height: hp(25)
    },
    dropdownView: {
        width: '50%'
    },
    textNameStyle: {
        color: ColorConstant.BLACK,
        fontSize: FontSize.FontSize.small,
        fontWeight: '500',
    },
    outerStyle: {
        width: '85%',
        backgroundColor: ColorConstant.WHITE
    },
    dropdownStyle: {
        width: '85%',
        alignSelf: 'center'
    },
    uploadMainView: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ColorConstant.WHITE,
        borderWidth: 1,
        borderColor: ColorConstant.GREY,
        width: '47%',
        marginTop: hp(1),
        borderRadius: 10
    },
    uploadText: {
        fontSize: FontSize.FontSize.small,
        marginTop: hp(1),
        color: ColorConstant.GREY
    },
    buttonMainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp(75),
        marginTop: hp(6),
        alignSelf: 'center',
        paddingBottom: hp(6)
    },
    cancelButton: {
        borderRadius: 6,
        width: '40%',
        height: hp(5),
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: ColorConstant.BLUE,
    },
    buttonTextColor: {
        textAlign: 'center',
        color: ColorConstant.BLUE
    },
    nextButton: {
        borderRadius: 6,
        width: '40%',
        height: hp(5),
        justifyContent: 'center',
        backgroundColor: ColorConstant.BLUE,
        opacity: 0.5
    },
    nextButtonText: {
        textAlign: 'center',
        color: ColorConstant.WHITE,
        fontWeight: 'bold'
    }
})

export default GeoFenceDetails;