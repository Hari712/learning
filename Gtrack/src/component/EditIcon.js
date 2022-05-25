import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { ColorConstant } from '../constants/ColorConstants';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from './FontSize'
import { UsersEditIcon, } from '../component/SvgComponent';

const EditIcon = (props) => {
    const { btnStyle = {}, onPress } = props;

    return (
        <TouchableOpacity onPress={onPress}
            style={[styles.containerStyle, btnStyle]}>
            <UsersEditIcon height={hp(2.8)} width={hp(1.8)} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        marginLeft: hp(2),
        borderColor: ColorConstant.WHITE,
        borderWidth: 1,
        width: hp(3),
        height: hp(3),
        alignItems: 'center',
        borderRadius: 10,
        alignContent: 'center'
    },
});

export default EditIcon;