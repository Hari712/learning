import React, { useLayoutEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { BackIcon, CompleteSetupImage } from '../../component/SvgComponent'
import { ColorConstant } from '../../constants/ColorConstants'
import FontSize from '../../component/FontSize'
import NavigationService from '../../navigation/NavigationService'
import images from '../../constants/images'
import { translate } from '../../../App'


const CompleteSetup = ({ navigation }) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={styles.headerTitle}>
                    {translate("Device Setup")}
                </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={() => NavigationService.goBack()}>
                    <BackIcon style={{marginLeft:hp(2)}}/>
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    function onTapLink() {

    }

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Text style={styles.subscriptionText}>{translate("Device_setup_string1")}</Text>
                <TouchableOpacity style={{ marginBottom: hp(3) }} onPress={() => onTapLink()}>
                    <Text style={styles.webLink}>www.gtrack.com</Text>
                </TouchableOpacity>
                <CompleteSetupImage />
                <Text style={styles.completeSetupGuideText}>{translate("Device_setup_string2")}</Text>
                <TouchableOpacity style={styles.button}  onPress={() => NavigationService.popToTop()}>
                    <Text style={styles.buttonText}>{translate("Complete Setup")}</Text>
                </TouchableOpacity>
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
    subContainer: {
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: hp(2), 
        width: '100%'
    },
    subscriptionText: { color: ColorConstant.BLACK, fontSize: FontSize.FontSize.small, fontWeight: '600', textAlign: 'center' },
    webLink: { color: ColorConstant.BLUE, fontSize: FontSize.FontSize.small, fontWeight: '700', marginTop: hp(2), textAlign: 'center' },
    completeSetupGuideText: { color: ColorConstant.BLACK, fontSize: FontSize.FontSize.small, fontWeight: '600', marginTop: hp(4), textAlign: 'center', marginBottom: hp(3) },
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
    button: {
        borderRadius: hp(1),
        height: hp(5),
        width: wp(40),
        justifyContent: 'center',
        backgroundColor: ColorConstant.BLUE,
    },
    buttonText: {
        textAlign: 'center',
        color: ColorConstant.WHITE,
        fontWeight: 'bold'
    },
})

export default CompleteSetup