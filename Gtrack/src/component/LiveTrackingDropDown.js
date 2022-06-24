
import React, { Component, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, Modal, FlatList, Dimensions, ScrollView } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import images from '../constants/images'
import { ColorConstant } from '../constants/ColorConstants'
import { OutlinedTextField ,TextField} from 'react-native-material-textfield'
import FontSize from './FontSize';
import ShadowView from 'react-native-simple-shadow-view'
import { NextIcon } from "./SvgComponent";
import { color } from "react-native-reanimated";
import IconConstant from "../constants/iconConstant";
import { isEmpty } from "lodash";




class LiveTrackingDropDown extends React.Component {

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
        const { label, dataList, innerRef, outerStyle, dropdownStyle, isRelative, accessoryStyle, emptyDataText, edit,selectedValue, ...otherProps } = this.props;

        const data = ['Car', 'Truck', 'Tempo'];
        console.log('propspropspropsprops',selectedValue)
        function handleRightAccessory() {
            return <View style={[{ justifyContent: 'center', height: otherProps.inputContainerStyle && otherProps.inputContainerStyle.height ? otherProps.inputContainerStyle.height / 2 : styles.inputButton.height - hp(2) }, accessoryStyle]}>
                <NextIcon resizemode='contain' style={styles.downArrow, otherProps.rightIconStyle} />
                {/* <Image source={images.image.next} resizemode='contain' style={styles.downArrow, otherProps.rightIconStyle} /> */}
            </View>
        }

        const show = () => {
            if (edit === false) {
                return false;
            }
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
                    <TextField
                 lineWidth={0}
                        // textColor={ColorConstant.GREY}
                        // tintColor={ColorConstant.GREEN}
                        baseColor={ColorConstant.ORANGE}
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


                {this.state.isSelected ?
                    <View style={[isRelative ?
                        styles.relativeDropdown :
                        [styles.absoluteDropdown, { top: this.state.buttonMeasurement.y + this.state.buttonMeasurement.height }],
                        dropdownStyle]}>
                        <ScrollView nestedScrollEnabled={true} keyboardShouldPersistTaps='always' contentContainerStyle={{ flexGrow: 1 }} style={{ height: 'auto', maxHeight: hp(17), zIndex: 99,paddingRight:10 }}>
                            {dataList && dataList.length > 0 ? dataList.map((item, key) => {
                                return (
                                    <TouchableOpacity style={[{ flex: 1 }, otherProps.dataRowStyle]} key={key}
                                        onPress={() => {
                                            console.log("clicked")
                                            this.setState({
                                                selected: item.name,
                                                isSelected: false,
                                            }, () => { this.props.valueSet(item.id) })

                                        }}>
                                        <View style={{flexDirection:"row",justifyContent:'space-between'}}>
                                        <View > 
                                              <Text style={[styles.datatextStyle, otherProps.dataTextStyle,selectedValue === item.id && styles.datatextStyleColorOrange]}>{item.name}</Text>
                                              </View>
                                        <View style={{alignSelf:'center'}}> 
                                        <IconConstant type={item.status =='online'? 'deviceonline' :'deviceoffline'} color={ColorConstant.ORANGE} />
                                            </View>
                                     
                                       
                                        </View>
                                        {/* <Text style={[styles.datatextStyle, otherProps.dataTextStyle,selectedValue === item.name && styles.datatextStyleColorOrange]}>{item.name}</Text> */}

                                        {key < (dataList ? dataList.length - 1 : data.length - 1) ?
                                            <View style={styles.horizontalLine} />
                                            : null}

                                    </TouchableOpacity>
                                )
                            }) :
                                <View style={{ height: hp(6) }}>
                                    <Text style={{ textAlign: 'center', textAlignVertical: 'center', flex: 1 }}>{emptyDataText ? emptyDataText : "No data"}</Text>
                                </View>
                            }
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
    imageContainer: {
        marginBottom: hp(1)
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
        // borderWidth: 1,
        // borderColor: ColorConstant.GREY,
    },
    absoluteDropdown: {
        position: 'absolute',
        marginTop: hp(0.5),
        borderRadius: hp(2),
        opacity: 1,
        marginHorizontal: wp(10),
        alignSelf: 'center',
        elevation: 10,
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
        // borderWidth: 1,
        // borderColor: ColorConstant.GREY,
    },

    inputContainer: {
        height: hp(6),
    },
    datatextStyle: {
        paddingVertical: hp(1.5),
        
        flex: 1
    },
    datatextStyleColorOrange: {
        color:ColorConstant.ORANGE
    },
    // datatextStyleColorOrange: {
    //     color:ColorConstant.ORANGE
    // },
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
    <LiveTrackingDropDown innerRef={ref} {...props} />
);