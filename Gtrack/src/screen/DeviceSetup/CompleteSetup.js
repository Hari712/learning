import React, { useLayoutEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, Linking } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { BackIcon, CompleteSetupImage } from '../../component/SvgComponent'
import { ColorConstant } from '../../constants/ColorConstants'
import FontSize from '../../component/FontSize'
import NavigationService from '../../navigation/NavigationService'
import images from '../../constants/images'
import { translate } from '../../../App'
import { SCREEN_CONSTANTS } from '../../constants/AppConstants'


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
        Linking.openURL("https://gtrack.vegitone.com/")
    }

return (
    <View style={styles.container}>
        <View style={styles.subContainer}>
            <Text style={styles.completeSetupGuideText}>{translate("Device_setup_string2")}</Text>
            <Text style={[styles.subscriptionText,{color:ColorConstant.GREY,marginVertical:hp(1),fontFamily:'Nunito-Italic'}]}>*Your device will be inactive as no plan is subscribed</Text>
            <TouchableOpacity style={styles.button}  onPress={() => NavigationService.navigate(SCREEN_CONSTANTS.DEVICE_ASSET)}>
                <Text style={styles.buttonText}>{translate("Complete Setup")}</Text>
            </TouchableOpacity>
            <CompleteSetupImage style={{marginVertical:hp(6)}} />
            <Text style={styles.subscriptionText}>{translate("Device_setup_string1")}</Text>
            <TouchableOpacity onPress={() => onTapLink()}>
                <Text style={styles.webLink}>www.gtrack.com</Text>
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
    subscriptionText: { color: ColorConstant.BLACK, fontSize: FontSize.FontSize.small, fontFamily:'Nunito-Semibold', textAlign: 'center' },
    webLink: { color: ColorConstant.ORANGE,fontFamily:'Nunito-Bold', fontSize: FontSize.FontSize.small, marginTop: hp(2), textAlign: 'center' },
    completeSetupGuideText: { color: ColorConstant.BLACK, fontSize: FontSize.FontSize.small,fontFamily:'Nunito-Semibold', marginTop: hp(4), textAlign: 'center', marginBottom: hp(1) },
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
        marginTop:hp(1)
    },
    buttonText: {
        textAlign: 'center',
        color: ColorConstant.WHITE,
        fontFamily:'Nunito-Bold'
    },
})

export default CompleteSetup