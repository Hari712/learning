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
let selectedAll = false;

class MultiSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            isSelected: true,            
        }
    }

    

    render() {      
    
        const {label, dataList, selectedData, innerRef, valueSet, outerStyle, ...otherProps} = this.props;

        selectedItem = selectedData ? selectedData : [];
        data = dataList ? dataList : ['Car','Truck','Tempo'] ;     

        function handleRightAccessory() {
            return <View style={styles.imageContainer}>
                    <Image source={images.image.next} resizemode='contain'style={styles.downArrow} />
                </View>
        }        

        const show = () => {
            this.setState({isSelected: !this.state.isSelected})
        }

        return(
            <SafeAreaView >
                <TouchableOpacity onPress={show} style={[styles.container, outerStyle]}>
                    <OutlinedTextField
                        label={label}
                        tintColor={ColorConstant.GREY}
                        fontSize={FontSize.FontSize.small}
                        labelTextStyle={{ fontFamily: 'Montserrat-Regular' }}
                        labelFontSize={FontSize.FontSize.small}
                        contentInset={{ input: 10.45, label: 1.4 }}
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
                    {/* Select All */}
                    <TouchableOpacity style={styles.row} 
                        onPress={()=>{
                            if (selectedAll) {
                                selectedAll = false;
                                valueSet(oldArray=>[])       
                            }
                            else {  
                                selectedAll = true;                                          
                                valueSet(oldArray => data )
                            }                    
                        } }>
                        <Image source={ selectedAll ? images.image.checkboxClick :images.image.checkbox} />
                        <Text style={{color:ColorConstant.BLUE}}>Select All</Text>
                    </TouchableOpacity>

                    {/* Data Rows */}
                    {data.map((item,key)=>{
                        return(
                            <TouchableOpacity key={key} style={styles.row} 
                                onPress={()=>{
                                    if (selectedItem.includes(item)) {
                                        valueSet(oldArray => oldArray.filter(function(value){return value != item}) )       
                                    }
                                    else {                                            
                                        valueSet(oldArray => [...oldArray, item])
                                    }
                                } }>
                                <Image source={ selectedItem.includes(item) ? images.image.checkboxClick :images.image.checkbox} />
                                <Text style={{color:ColorConstant.BLUE}}>{item}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView> 
                :null} 
                 { this.state.isSelected ?
                <Text style={{color:ColorConstant.ORANGE,margin:hp(2)}}>
                   Selected Device List
                </Text>:null}

                <View style={styles.selectedContainer}>
                    { Object.values(selectedItem).map((item,key)=>
                        <Text key={key}>{item}</Text>
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
        height:'50%', 
        marginHorizontal:wp(10),
        alignSelf:'center',  
        elevation:5, 
        backgroundColor:'white', 
        width:'100%',
        paddingHorizontal:hp(2) 
    },
    selectedContainer: { 
        position:'relative',
        borderRadius:hp(2),
        opacity:4, 
        marginHorizontal:wp(10),
        alignSelf:'center',  
        elevation:5, 
        backgroundColor:'white', 
        width:'100%',
        paddingHorizontal:hp(2) 
    },
    inputContainer: {
        height: hp(6), 
    },
    inputButton: {
        alignSelf: 'center',
        width: '100%',
        height: hp(6)
    },
    row: {
        flexDirection:'row', 
        alignItems:'center'
    },
})
    

export default React.forwardRef((props, ref) =>
    <MultiSelect innerRef={ref} {...props} />
);