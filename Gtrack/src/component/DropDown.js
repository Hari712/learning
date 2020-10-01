import React, {Component, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, Modal, FlatList, Dimensions } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import images from '../constants/images'
import { ColorConstant } from '../constants/ColorConstants'
import { OutlinedTextField } from '@ubaids/react-native-material-textfield'
import FontSize from './FontSize';



class DropDown extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            isSelected: false,
            selected:'',
            buttonMeasurement: ''
        }
        this._buttonFrame = null;
        // this.focus = this.focus.bind(this);
    }

    onSubmit = () => {
        let {current: field } = this.fieldRef;  
    }

    render() {
    
        //isRelative will set the dropdown view absolute or relative ie over other components or expanding other component
        const {label, dataList, innerRef, outerStyle, dropdownStyle, isRelative, ...otherProps} = this.props;

        const data = ['Car','Truck','Tempo'];        

        function handleRightAccessory() {
            return <View style={styles.imageContainer}>
                    <Image source={images.image.next} resizemode='contain' style={styles.downArrow} />
                </View>
        }

        const show = () => {
            this.setState({isSelected: !this.state.isSelected})
        }

        return(
            <>
                <TouchableOpacity onPress={show} style={[styles.container, outerStyle]}  
                    onLayout={({nativeEvent}) => {
                        console.log("Sub container ",nativeEvent.layout)
                        this.setState({buttonMeasurement:nativeEvent.layout})
                        //setSubContainerHeight(nativeEvent.layout.height)
                    }}>
                    <OutlinedTextField
                        label={label}
                        tintColor={ColorConstant.GREY}
                        fontSize={FontSize.FontSize.small}
                        //labelTextStyle={{ fontFamily: 'Nunito-ExtraLightItalic' }}
                        labelFontSize={FontSize.FontSize.small}
                        contentInset={{ input: 10.45, label: 3 }}
                        //defaultValue={this.state.selected}
                        renderRightAccessory={() => handleRightAccessory()}
                        editable={false}
                        inputContainerStyle={styles.inputContainer}
                        activeLineWidth={1}
                        containerStyle={styles.inputButton}
                        {...otherProps}
                    />                   
                </TouchableOpacity>
                {/* </View> */}


                { this.state.isSelected ?
                    <View style={[isRelative ? 
                        styles.relativeDropdown: 
                        [styles.absoluteDropdown,{top:this.state.buttonMeasurement.y + this.state.buttonMeasurement.height}]
                    , dropdownStyle]}>
                        {(dataList?dataList:data).map((item,key)=>{
                            return(
                            <TouchableOpacity style={otherProps.dataRowStyle} key={key} onPress={()=>{
                                this.setState({
                                    selected: item, 
                                    isSelected:false,
                                })
                                this.props.valueSet(item)
                            }}>
                                <Text style={otherProps.dataTextStyle}>{item}</Text>
                            </TouchableOpacity>
                            )
                        })}
                    </View>
                :null} 

            </>   
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginVertical:hp(1),
        justifyContent: 'center', 
        //backgroundColor:'red'
    },
    downArrow: {
        marginVertical:hp(1),
    },
    relativeDropdown: {       
        marginTop:hp(0.5), 
        borderRadius:hp(2),
        opacity:1, 
        marginHorizontal:wp(10),
        alignSelf:'center',  
        elevation:5, 
        backgroundColor:'white', 
        width:'100%',
        paddingHorizontal:hp(3),
        paddingLeft:hp(3),
        borderWidth: 1,
        borderColor: ColorConstant.GREY,
    },
    absoluteDropdown: { 
        position:'absolute',        
        marginTop:hp(0.5), 
        borderRadius:hp(2),
        opacity:1, 
        marginHorizontal:wp(10),
        alignSelf:'center',  
        elevation:5, 
        zIndex:5,
        backgroundColor:'white', 
        width:'100%',
        paddingHorizontal:hp(3),
        paddingLeft:hp(3),
        borderWidth: 1,
        borderColor: ColorConstant.GREY,
    },

    inputContainer: {
        height: hp(6), 
    },
    inputButton: {
        alignSelf: 'center',
        width: '100%',
        height: hp(6)
    },
})
    

export default React.forwardRef((props, ref) =>
    <DropDown innerRef={ref} {...props} />
);