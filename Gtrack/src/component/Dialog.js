import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions, ScrollView, TextInput } from 'react-native';
import { ColorConstant } from '../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from './FontSize';
import { Dialog } from 'react-native-simple-dialogs';


const CustomDialog = (props) => {



    const { heading, message, negativeHandle, positiveHandle, negativeButtonName, positiveButtonName, ...otherProps } = props;

    useEffect(() => {

    }, [])


    return (
        <Dialog
            title={heading}
            titleStyle={styles.titleStyle}
            animationType='slide'
            dialogStyle={{ borderRadius: hp(2), backgroundColor: ColorConstant.WHITE }}
            {...otherProps}
        >
            <View>


                <View style={{ marginBottom: hp(4) }}>
                    <Text style={styles.messageStyle}>{message}</Text>
                </View>

                <View style={{ flexDirection: 'row', height: hp(5), alignItems: 'center' }}>
                    <TouchableOpacity style={{ width: wp(30), margin: hp(2), backgroundColor: ColorConstant.WHITE, borderRadius: 4, borderWidth: 1, borderColor: ColorConstant.BLUE, height: hp(5) }} onPress={negativeHandle}>
                        <Text style={{ color: ColorConstant.BLUE, textAlign: 'center', fontFamily: 'Nunito-Bold', paddingVertical: hp(1), height: hp(5), textTransform: 'uppercase', fontSize: FontSize.FontSize.medium }}>
                            {negativeButtonName ? negativeButtonName : "Cancel"}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: wp(30), margin: hp(2), backgroundColor: ColorConstant.BLUE, borderRadius: 4, color: ColorConstant.WHITE }} onPress={positiveHandle} >
                        <Text style={{ color: ColorConstant.WHITE, textAlign: 'center', fontFamily: 'Nunito-Bold', paddingVertical: hp(1), height: hp(5), textTransform: 'uppercase', fontSize: FontSize.FontSize.medium }}>
                            {positiveButtonName ? positiveButtonName : "Okay"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </Dialog>


    )
}

const styles = StyleSheet.create({

    titleStyle: {
        color: ColorConstant.ORANGE,
        textAlign: 'center',
        fontSize: FontSize.FontSize.regular,
        fontWeight: 'bold'
    },
    messageStyle: {
        color: ColorConstant.BLACK,
        textAlign: 'center',
        fontSize: FontSize.FontSize.small
    },
    buttonsStyle: {
        alignItems: 'center',
        marginBottom: hp(3)
    },
})
export default CustomDialog