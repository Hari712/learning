import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask'
import images from '../../constants/images'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import NavigationService from '../../navigation/NavigationService'
import { ColorConstant } from '../../constants/ColorConstants'
import FontSize from '../../component/FontSize'
import { translate } from '../../../App'
import { BackIcon } from '../../component/SvgComponent';

const BarcodeScanner = ({ navigation, route }) => {
    const { setDeviceID } = route.params
    const [deviceId, setDevice] = useState()
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={styles.headerTitle}>
                    {translate("Device Setup")}
                </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity style={{padding:hp(2)}} onPress={() => navigation.goBack()}>
                    <BackIcon />
                </TouchableOpacity>
            )
        });
    }, [navigation]);
    useEffect(() => {
        if(deviceId) {
            setDeviceID(deviceId) 
            NavigationService.goBack()
        }
    }, [deviceId])

    function onBarCodeRead(scanResult) {
        // scanResult.data will contain your scanned data
        setDevice(scanResult.data.toString())
    }

    return (
        <View style={styles.container}>
            <RNCamera
                style={{ flex: 1 }}
                onBarCodeRead={(result) => onBarCodeRead(result)}
            // ... other related props of RNCamera
            >
                <BarcodeMask
                    width={wp(60)} height={hp(20)} showAnimatedLine={true} outerMaskOpacity={0.8}
                />
            </RNCamera>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
    lowerSection: {
        paddingVertical: 30,
        paddingHorizontal: 20,
        backgroundColor: 'white',
    },
})

export default BarcodeScanner