import React, {Component, useState } from "react";
import { StyleSheet, TextInput, View, Text, Image, TouchableOpacity } from "react-native";
import FontSize from '../component/FontSize'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import images from '../constants/images'
import { ColorConstant } from '../constants/ColorConstants'

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
        const {style, passcode, ...otherProps} = this.props;
        return(
            passcode ?

            <View style={[styles.inputTextStyle,style]}>
                <TextInput 
                    secureTextEntry={!this.state.isSelected} 
                    style={{ fontSize: FontSize.FontSize.small }}
                    placeholderTextColor={ColorConstant.GREY} 
                    ref={'textInput'}
                    {...otherProps}
                />

                <TouchableOpacity onPress={() => this.setState({isSelected:!this.state.isSelected})}>
                    {this.state.isSelected?
                    <Image source={images.image.eyeicon}/>
                    :
                    <Image source={images.image.disableyeicon}/>}
                </TouchableOpacity>
            </View>

            :

            <TextInput 
                placeholderTextColor={ColorConstant.GREY} 
                ref={'textInput'}
                style={[styles.inputTextStyle, style]} 
                {...otherProps}
            />
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
        color:'black',
        fontFamily:'Nunito-LightItalic'
    },
})
    

export default EditText