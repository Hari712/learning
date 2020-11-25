import React, { useLayoutEffect } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import NavigationService from '../../navigation/NavigationService'
import { ColorConstant } from '../../constants/ColorConstants'
import FontSize from '../../component/FontSize'

const BarcodeScanner = ({ navigation }) => {


    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={styles.headerTitle}>
                    Device Setup
                </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={() => NavigationService.goBack()}>
                    <Image style={styles.headerLeftStyle} source={images.image.back} />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    function onBarCodeRead(scanResult) {
        // scanResult.data will contain your scanned data
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