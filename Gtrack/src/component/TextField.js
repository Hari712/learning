import React, {Component, useState } from "react";
import { StyleSheet, TextInput, View, TouchableOpacity, Image } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import images from '../constants/images'
import { ColorConstant } from '../constants/ColorConstants'
import { OutlinedTextField } from 'react-native-material-textfield'
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
            this.setState({textValue: text}, ()=>this.props.valueSet(text))
            return text
        }
        return(
        
            <OutlinedTextField
                label={label}
                textColor={ColorConstant.BLACK}
                tintColor={ColorConstant.GREY}
                baseColor={ColorConstant.GREY}
                fontSize={FontSize.FontSize.small}
                //labelTextStyle={{ fontFamily: 'Nunito-Light'}}
                style={[styles.input, multiline && styles.bigInput]}
                labelFontSize={FontSize.FontSize.small}
                contentInset={{ label: hp(0.15), input: hp(2) }}
                formatText={handleInput}
                //value={this.state.textValue}
                //renderRightAccessory={() => handleRightAccessory()}
                //editable={false}
                multiline={multiline}
                inputContainerStyle={multiline ? styles.descContainer : styles.inputContainer}
                activeLineWidth={1}
                containerStyle={styles.inputButton}
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
    bigInput: {
        height: hp(10),
        marginBottom: hp(2.75)
    },
    input: {
        fontFamily: 'Nunito-Light',
        color: ColorConstant.GREY,
    },
    descContainer: {
        height: hp(12)
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