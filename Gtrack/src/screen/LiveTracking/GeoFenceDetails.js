import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, TextInput, Dimensions, ImageBackground } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants';
import FontSize from '../../component/FontSize';
import TextField from '../../component/TextField';
import DropDown from '../../component/DropDown';

const GeoFenceDetails = ({ navigation }) => {
    const [value, setValue] = useState()
    const [description, setDescrption] = useState();
    const [colorPicker, setColorPicker] = useState();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={{
                    color: ColorConstant.GREY,
                    fontSize: FontSize.FontSize.medium,
                    fontWeight: '500',
                    textAlign: 'center'
                }}>
                    Geo Fence
                </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={{ marginLeft: wp(4) }} source={images.image.back} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.mainView}>
                <Text style={styles.textViewStyle}>Type: Polygon</Text>
            </View>

            <View style={styles.subContainer}>
                <View style={styles.scene}>
                    <TextField valueSet={setValue} defaultValue={value} label='Name' style={{}} />

                    <TextField valueSet={setDescrption} defaultValue={description} label='Description' multiline={true} outerStyle={styles.outerStyle} />

                    <TextField valueSet={setColorPicker} defaultValue={colorPicker} label='Pick Colour' />

                    <View style={{ backgroundColor: 'yellow', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column', backgroundColor: 'red', width: '50%' }}>

                            <Text>llll</Text>

                        </View>
                        <Image source={images.geoFence.backgroundImage} style={{ height: hp(25), width: wp(45) }} resizeMode='stretch' />
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
    subContainer: {
        height: Dimensions.get('window').height,
        alignItems: 'center',
        backgroundColor: ColorConstant.WHITE
    },
    scene: {
        width: '90%',
        marginHorizontal: hp(5),
        marginTop: hp(3)
    },
    outerStyle: {
        marginTop: hp(3)
    },
})

export default GeoFenceDetails;