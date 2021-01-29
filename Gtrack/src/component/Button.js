import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { ColorConstant } from '../constants/ColorConstants';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from './FontSize'

const CustomButton = (props) => {
    const { title = '', style = {}, textStyle = {}, disabled , onPress } = props;

    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.button, style]}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: hp(5.5),
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ColorConstant.ORANGE,
    },

    text: {
        fontSize: FontSize.FontSize.regular,
        color: ColorConstant.WHITE,
        fontWeight: '500',
    },
});

export default CustomButton;