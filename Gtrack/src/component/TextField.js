import React, {Component, useState } from "react";
import { StyleSheet, TextInput, View, TouchableOpacity, Image } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import images from '../constants/images'
import { ColorConstant } from '../constants/ColorConstants'
import { OutlinedTextField } from '@ubaids/react-native-material-textfield'
import FontSize from './FontSize';
import { color } from "react-native-reanimated";



class TextField extends React.Component {

    //fieldRef = React.createRef();

    

    constructor(props) {
        super(props);
        this.state={
            isSelected: false,
            textValue:''
        }
        // this.focus = this.focus.bind(this);
    }

    onSubmit = () => {
        this.props.valueSet(this.state.textValue)
    }

    render() {
    
        const {label, innerRef, outerStyle, multiline, onChangeText, ...otherProps} = this.props;

        const handleInput = text => {
            //this.props.valueSet(text)
            this.setState({textValue: text})
            return text
        }
        return(
           
            <OutlinedTextField
                label={label}
                textColor={ColorConstant.BLACK}
                tintColor={ColorConstant.GREY}
                baseColor={ColorConstant.GREY}
                fontSize={FontSize.FontSize.small}
                labelTextStyle={{ fontFamily: 'Montserrat-Regular'}}
                labelFontSize={FontSize.FontSize.small}
                contentInset={{ input: 12, label: 1.4 }}
                formatText={handleInput}
                value={this.state.textValue}
                //renderRightAccessory={() => handleRightAccessory()}
                //editable={false}
                inputContainerStyle={multiline ? styles.descContainer : styles.inputContainer}
                activeLineWidth={1}
                containerStyle={[styles.inputButton, {height: multiline ? hp(15) : hp(6)} , outerStyle]}
                // formatText={this.formatText}
                onSubmitEditing={this.onSubmit}
                onChangeText={onChangeText}
                ref={innerRef}
                {...otherProps}
            />

            // <TextInput 
            //     placeholderTextColor={ColorConstant.GREY} 
            //     ref={'textInput'}
            //     style={[styles.inputTextStyle, style]} 
            //     {...otherProps}
            // />
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        height: hp(6),
    },
    descContainer: {
        height: hp(15),
    },
    inputButton: {        
        alignSelf: 'center',
        width: '100%',
        marginVertical: hp(1)
    },
})
    

export default React.forwardRef((props, ref) =>
    <TextField innerRef={ref} {...props} />
);