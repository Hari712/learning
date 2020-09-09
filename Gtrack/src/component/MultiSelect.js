import React, {Component, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, Modal, FlatList, Dimensions } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import images from '../constants/images'
import { ColorConstant } from '../constants/ColorConstants'
import { OutlinedTextField } from '@ubaids/react-native-material-textfield'
import FontSize from './FontSize';
import { ScrollView } from "react-native-gesture-handler";
       
let data = []; 
let selectedItem = [];

class MultiSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            isSelected: true,
            selected:'',
            buttonMeasurement: '',
            
        }
        this._buttonFrame = null;
        // this.focus = this.focus.bind(this);
    }

    componentDidMount(){
        const {dataList, selectedData} = this.props;

        selectedItem = selectedData ? selectedData : [];
        data = dataList ? dataList : ['Car','Truck','Tempo'] ;
    }

    onSubmit = () => {
        let {current: field } = this.fieldRef;  
    }

    render() {      
    
        const {label, dataList, innerRef, valueSet, outerStyle, ...otherProps} = this.props;
   

        function handleRightAccessory() {
            return <View style={styles.imageContainer}>
                    <Image source={images.image.next} resizemode='contain'style={styles.downArrow} />
                </View>
        }

        function renderRow(item, key) {
            return(
                <TouchableOpacity style={{flexDirection:'row', alignItems:'center', backgroundColor:'red'}} key={key} 
                        onPress={()=>{handleCheck(item,key)} }>
                    <Image source={selectedItem.includes(item) ? images.image.checkboxClick:images.image.checkbox} />
                    <Text>{item}</Text>
                </TouchableOpacity>
            )
        }

        function handleCheck(item,key) {
            console.log("Click Handle", item, selectedItem)
            if (selectedItem.includes(item)) {
                //selectedItem = selectedItem.filter(prevItem => prevItem !== item)
                const pos = selectedItem.indexOf(item)
                selectedItem.splice(pos, 1) 
                console.log("Remaining",  selectedItem)         
            }
            else {
                selectedItem.push(item)
                console.log("Added", selectedItem)
            }
           valueSet(selectedItem)
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
                <ScrollView style={styles.dropdown}>
                    <View>
                        {data.map((item,key)=>{renderRow(item,key)})}
                    </View>
                </ScrollView> 
                :null} 

                <Text>
                    Selected Items:
                </Text>

                <View style={styles.dropdown}>
                    {selectedItem.map((item)=>
                        <Text>{item}</Text>
                    )}
                </View>

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