import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { ColorConstant } from '../constants/ColorConstants';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

const CustomButton = (props) => {
    const { title = '', style = {}, textStyle = {}, onPress} = props;

    return (
        <TouchableOpacity onPress={onPress} style={[styles.button,style]}>
                <Text style={[styles.text,textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius:6, 
        width:'75%', 
        margin:hp(2),  
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:ColorConstant.ORANGE,
        height:hp(6)
    },

    text: {
        color:ColorConstant.WHITE,  
        flex:1,
        textAlignVertical:'center'
    },
});

export default CustomButton;