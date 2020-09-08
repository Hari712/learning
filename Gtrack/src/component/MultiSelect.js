import React, {Component, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, Modal, FlatList, Dimensions } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import images from '../constants/images'
import { ColorConstant } from '../constants/ColorConstants'
import { OutlinedTextField } from '@ubaids/react-native-material-textfield'
import FontSize from './FontSize';



class MultiSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            isSelected: true,
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
    
        const {label, dataList, innerRef, outerStyle, ...otherProps} = this.props;

        const data = ['Car','Truck','Tempo'];        

        function handleRightAccessory() {
            return <View style={styles.imageContainer}>
                    <Image source={images.image.next} resizemode='contain'style={styles.downArrow} />
                </View>
        }

        const show = () => {
            this.setState({isSelected: !this.state.isSelected})
        }

        return(
            <SafeAreaView>
                <TouchableOpacity onPress={show} style={[styles.container, outerStyle]}>
                    <OutlinedTextField
                        label={label}
                        tintColor={ColorConstant.GREY}
                        fontSize={FontSize.FontSize.small}
                        labelTextStyle={{ fontFamily: 'Montserrat-Regular' }}
                        labelFontSize={FontSize.FontSize.small}
                        contentInset={{ input: 10.45, label: 1.4 }}
                        //defaultValue={this.state.selected}
                        renderRightAccessory={() => handleRightAccessory()}
                        editable={false}
                        inputContainerStyle={styles.inputContainer}
                        activeLineWidth={1}
                        containerStyle={styles.inputButton}
                        {...otherProps}
                    />
                </TouchableOpacity>


                { this.state.isSelected ?
                    <View style={styles.dropdown}>
                        {(dataList?dataList:data).map((item,key)=>{
                            return(
                            <TouchableOpacity key={key} onPress={()=>{
                                this.setState({
                                    selected: item, 
                                    isSelected:false,
                                })
                                this.props.valueSet(item)
                            }}>
                                <Text>{item}</Text>
                            </TouchableOpacity>
                            )
                        })}
                    </View>
                :null} 

            </SafeAreaView>   
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginVertical:hp(1),
        justifyContent: 'center',   
    },
    downArrow: {               
       // alignSelf:'center'
    },
    dropdown: { 
        position:'relative',
        
        borderRadius:hp(2),
        opacity:4, 
        marginHorizontal:wp(10),
        alignSelf:'center',  
        elevation:5, 
        backgroundColor:'white', 
        width:'100%',
        paddingLeft:hp(3) 
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
    <MultiSelect innerRef={ref} {...props} />
);