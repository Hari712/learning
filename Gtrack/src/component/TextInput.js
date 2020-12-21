import React, {Component, useState } from "react";
import { StyleSheet, TextInput, View, Text, Image, TouchableOpacity } from "react-native";
import FontSize from '../component/FontSize'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import images from '../constants/images'
import { ColorConstant } from '../constants/ColorConstants'
import { EyeIcon, EyeClickIcon } from "./SvgComponent";

class EditText extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            isSelected: false,
        }
        this.focus = this.focus.bind(this);
    }

    focus() {
        this.refs.textInput.focus();
    }

    render() {
        const {style, passcode, rightContainer,  ...otherProps} = this.props;
        return(
            passcode ?

            <View style={[styles.inputTextStyle,style]}>
                <TextInput 
                    secureTextEntry={!this.state.isSelected} 
                    style={styles.textStyle}
                    placeholderTextColor={ColorConstant.GREY} 
                    ref={'textInput'}
                    {...otherProps}
                />

                <TouchableOpacity onPress={() => this.setState({isSelected:!this.state.isSelected})}>
                    {this.state.isSelected?
                    <EyeClickIcon/>
                    :
                    <EyeIcon/>}
                </TouchableOpacity>
            </View>

            :

            <View style={[styles.inputTextStyle, {flexDirection:'row'},style]}>
                <TextInput 
                    placeholderTextColor={ColorConstant.GREY} 
                    ref={'textInput'}
                    style={styles.textStyle}
                    {...otherProps}
                />
                {rightContainer}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputTextStyle: {
        borderRadius:7,
        paddingHorizontal:hp(2),
        backgroundColor:ColorConstant.WHITE,
        width:'100%',
        height:hp(5.5),
        marginBottom:hp(2.5),
    },
    textStyle: {
        fontSize: FontSize.FontSize.small, 
        flex:1,
        color:ColorConstant.BLACK,
        fontFamily:'Nunito-LightItalic'
    }
})
    

export default EditText