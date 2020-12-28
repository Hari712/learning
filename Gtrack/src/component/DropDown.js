import React, { Component, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, Modal, FlatList, Dimensions, ScrollView } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import images from '../constants/images'
import { ColorConstant } from '../constants/ColorConstants'
import { OutlinedTextField } from 'react-native-material-textfield'
import FontSize from './FontSize';
import ShadowView from 'react-native-simple-shadow-view'
import { NextIcon } from "./SvgComponent";



class DropDown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSelected: false,
            selected: '',
            buttonMeasurement: ''
        }
        this._buttonFrame = null;
        // this.focus = this.focus.bind(this);
    }

    onSubmit = () => {
        let { current: field } = this.fieldRef;
    }

    render() {

        //isRelative will set the dropdown view absolute or relative ie over other components or expanding other component
        const { label, dataList, innerRef, outerStyle, dropdownStyle, isRelative, accessoryStyle, ...otherProps } = this.props;

        const data = ['Car', 'Truck', 'Tempo'];

        function handleRightAccessory() {
            return <View style={[styles.imageContainer, accessoryStyle]}>
                <NextIcon resizemode='contain' style={styles.downArrow, otherProps.rightIconStyle}/>
                {/* <Image source={images.image.next} resizemode='contain' style={styles.downArrow, otherProps.rightIconStyle} /> */}
            </View>
        }

        const show = () => {
            this.setState({ isSelected: !this.state.isSelected })
        }

        return (
            <>
                    <TouchableOpacity onPress={show} style={[styles.container, outerStyle]}
                        onLayout={({ nativeEvent }) => {
                            console.log("Sub container ", nativeEvent.layout)
                            this.setState({ buttonMeasurement: nativeEvent.layout })
                            //setSubContainerHeight(nativeEvent.layout.height)
                        }}>
                        <OutlinedTextField
                            label={label}
                            textColor={ColorConstant.BLACK}
                            tintColor={ColorConstant.GREY}
                            baseColor={ColorConstant.GREY}
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
                        styles.relativeDropdown :
                        [styles.absoluteDropdown, { top: this.state.buttonMeasurement.y + this.state.buttonMeasurement.height }],
                        dropdownStyle]}>
                            <ScrollView nestedScrollEnabled={true} keyboardShouldPersistTaps='always' contentContainerStyle={{ flexGrow: 1 }} style={{height: 'auto', maxHeight:hp(17),zIndex:99}}>
                                {(dataList ? dataList : data).map((item, key) => {
                                    return (
                                        <TouchableOpacity style={[{flex:1}, otherProps.dataRowStyle]} key={key}
                                            onPress={() => {
                                                console.log("clicked")
                                                this.setState({
                                                    selected: item,
                                                    isSelected: false,
                                                },()=>{this.props.valueSet(item)})
                                                
                                            }}>
                                            <Text style={[styles.datatextStyle, otherProps.dataTextStyle]}>{item}</Text>
                                            
                                            {key <  (dataList ? dataList.length-1 : data.length-1) ?
                                                <View style={styles.horizontalLine} />
                                                : null}

                                        </TouchableOpacity>
                                    )
                                })}
                            </ScrollView>
                    </View>
                    : null}

            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginVertical: hp(1),
        justifyContent: 'center',
        //backgroundColor:'red'
    },
    downArrow: {
        marginVertical: hp(1),
    },
    imageContainer:{
        marginBottom:hp(1)
    },
    horizontalLine: {
        borderWidth: 0.5,
        borderRadius: 1,
        borderColor: ColorConstant.GREY
    },
    relativeDropdown: {
        marginTop: hp(0.5),
        borderRadius: hp(2),
        opacity: 1,
        marginHorizontal: wp(10),
        alignSelf: 'center',
        elevation: 5,
        shadowColor: ColorConstant.GREY,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 3,
        shadowOpacity: 0.3,
        backgroundColor: 'white',
        width: '100%',
        paddingHorizontal: hp(3),
        paddingLeft: hp(3),
        borderWidth: 1,
        borderColor: ColorConstant.GREY,
    },
    absoluteDropdown: {
        position: 'absolute',        
        marginTop: hp(0.5),
        borderRadius: hp(2),
        opacity: 1,
        marginHorizontal: wp(10),
        alignSelf: 'center',
        elevation:10,
        shadowColor: ColorConstant.GREY,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 3,
        shadowOpacity: 0.3,
        backgroundColor: ColorConstant.WHITE,
        width: '100%',
        paddingHorizontal: hp(3),
        paddingLeft: hp(3),
        borderWidth: 1,
        borderColor: ColorConstant.GREY,
    },

    inputContainer: {
        height: hp(6),
    },
    datatextStyle: {
        paddingVertical:hp(1.5),
        flex:1,
    },
    inputButton: {
        alignSelf: 'center',
        width: '100%',
        height: hp(6),
    },
    shadowContainer: {
        width: '100%',
        shadowColor: ColorConstant.GREY,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 3,
        shadowOpacity: 0.3
    },
})


export default React.forwardRef((props, ref) =>
    <DropDown innerRef={ref} {...props} />
);