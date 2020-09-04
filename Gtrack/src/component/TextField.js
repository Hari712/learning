import React, {Component, useState } from "react";
import { StyleSheet, TextInput, View, TouchableOpacity, Image } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import images from '../constants/images'
import { ColorConstant } from '../constants/ColorConstants'
import { OutlinedTextField } from '@ubaids/react-native-material-textfield'
import FontSize from './FontSize';



class TextField extends React.Component {

    fieldRef = React.createRef();

    

    constructor(props) {
        super(props);
        this.state={
            isSelected: false,
        }
        // this.focus = this.focus.bind(this);
    }

    onSubmit = () => {
        let {current: field } = this.fieldRef;
        console.log("khushiMuKU",field.value());
        
    }

    render() {
    
        const {label, ...otherProps} = this.props;

        const handleInput = text => {
            this.props.valueSet(text)
            return text
        }
        return(
           
            <OutlinedTextField
                label={label}
                tintColor={ColorConstant.GREY}
                fontSize={FontSize.FontSize.small}
                labelTextStyle={{ fontFamily: 'Montserrat-Regular' }}
                labelFontSize={FontSize.FontSize.small}
                contentInset={{ input: 10.45, label: 1.4 }}
                formatText={handleInput}
                //value={text}
                //renderRightAccessory={() => handleRightAccessory()}
                //editable={false}
                //inputContainerStyle={styles.inputContainer}
                activeLineWidth={1}
                containerStyle={styles.inputButton}
                //formatText={this.formatText}
                onSubmitEditing={this.onSubmit}
                ref={this.fieldRef}
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
    inputButton: {
        alignSelf: 'center',
        width: wp(90),
        marginTop: hp(3)
    },
})
    

export default TextField