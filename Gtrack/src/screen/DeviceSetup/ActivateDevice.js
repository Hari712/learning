import React, { useState, useEffect, useLayoutEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import TextField from '../../component/TextField'
import { BarCodeScanIcon } from '../../component/SvgComponent'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import images from '../../constants/images'
import { ColorConstant } from '../../constants/ColorConstants'
import FontSize from '../../component/FontSize'
import ShadowView from 'react-native-simple-shadow-view'
import NavigationService from '../../navigation/NavigationService'
import { translate } from '../../../App'

const ActivateDevice = ({ navigation }) => {

    const [deviceId, setDeviceId] = useState('')
    const [deviceName, setDeviceName] = useState('')


    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={styles.headerTitle}>
                    {translate("Activate_device_string1")}
                </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={styles.headerLeftStyle} source={images.image.back} />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    function handleRightAccessory() {
        return (
            <View style={{ top: hp(0.6) }}>
                <TouchableOpacity onPress={() => navigateToBarcodeScanner()}>
                    <BarCodeScanIcon width={hp(3.0)} height={hp(2.5)} preserveAspectRatio="none" />
                </TouchableOpacity>
            </View>
        )
    }

    function navigateToBarcodeScanner() {
        NavigationService.push('BarcodeScanner')
    }

    function navigateToAssignAsset() {
        NavigationService.push('AssignAsset')
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ width: hp(16), height: hp(16) }} source={images.image.deviceSetup.step1} resizeMode="contain" />
                <Text style={styles.title}>{translate("Activate_device_string2")}</Text>
            </View>
            <View style={{ flex: 0.7, paddingHorizontal: hp(3), paddingTop: hp(2) }}>
                <View style={styles.shadowContainer}>
                    <TextField
                        valueSet={setDeviceId}
                        label={translate("Device Id")}
                        value={deviceId}
                        onChangeText={(text) => setDeviceId(text)}
                        style={styles.textNameStyle}
                        labelFontSize={hp(1.4)}
                        labelTextStyle={{ top: hp(0.3) }}
                        renderRightAccessory={() => handleRightAccessory()}
                        contentInset={{ label: hp(-0.5) }}
                        inputContainerStyle={styles.inputContainer}
                    />

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
                        inputContainerStyle={styles.inputContainer}
                    />
                </View>
                <ShadowView style={styles.shadowContainer}>
                    <TouchableOpacity style={styles.activateButton} onPress={() => navigateToAssignAsset()}>
                        <Text style={styles.activateButtonTitle}>{translate("Activate")}</Text>
                    </TouchableOpacity>
                </ShadowView>
            </View>
        </View>

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
    activateButtonTitle: { color: ColorConstant.WHITE, fontWeight: '600', fontSize: FontSize.FontSize.medium  }
})

export default ActivateDevice