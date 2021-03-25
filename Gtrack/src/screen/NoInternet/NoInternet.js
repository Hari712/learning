import React, { useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { FontSize, NotificationMessage } from '../../component'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useDispatch } from 'react-redux'
import { ColorConstant } from '../../constants/ColorConstants'
import SvgNoConnection from '../../component/SvgComponent/SvgNoConnection'
import NavigationService from '../../navigation/NavigationService'


const NoInternet = () => {
    const dispatch = useDispatch()

    const onReload = () => {
       // dispatch(ConnectivityActions.reloadRequest())
    }

    useEffect(() => {
        NotificationMessage.hideLoader()
    }, [])

    function dismiss() {
        NavigationService.goBack()
    }

    return (
        <View style={styles.container}>
            <SvgNoConnection height={hp(20)} width={hp(20)} />
            <Text style={styles.text}>No Internet Connectivity</Text>
            <TouchableOpacity onPress={onReload} style={styles.button} >
                <Text style={styles.buttonText}>Retry</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => dismiss()} style={[styles.button, { top: hp(3) }]} >
                <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: ColorConstant.darker,
        marginTop: hp(3),
        fontSize: FontSize.FontSize.regular,
        fontFamily: 'Montserrat-Medium'
    },
    button: {
        backgroundColor: ColorConstant.darker,
        borderRadius: hp(1),
        width: wp(27.5),
        height: hp(4.8),
        justifyContent: 'center',
        alignItems: 'center',
        bottom: -hp(15)
    },
    buttonText: {
        color: '#fff',
        fontSize: FontSize.FontSize.tow,
        textTransform: 'capitalize',
        fontFamily: 'Montserrat-Medium',
        textAlign: 'center',
        textAlignVertical: 'center',
        letterSpacing: 0.5
    }
});

export default NoInternet