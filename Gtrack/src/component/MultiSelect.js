import React, {Component, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, Modal, FlatList, Dimensions, ScrollView } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import images from '../constants/images'
import { ColorConstant } from '../constants/ColorConstants'
import { OutlinedTextField } from 'react-native-material-textfield'
import FontSize from './FontSize';
       
let data = []; 
let selectedItem = [];
let selectedAll = false;

class MultiSelect extends React.Component {

    constructor(props) {
        super();
        this.state={
            isSelected: false,            
        }
    }

    

    render() {    
    
        const {label, dataList, selectedData, innerRef, valueSet, outerStyle, selectedItemContainerStyle, ...otherProps} = this.props;

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
                        //labelTextStyle={{ fontFamily: 'Nunito-Regular' }}
                        labelFontSize={FontSize.FontSize.small}
                        contentInset={{ input: 10.45, label: 1.4 }}
                        renderRightAccessory={() => handleRightAccessory()}
                        editable={false}
                        value='Select Group'
                        inputContainerStyle={styles.inputContainer}
                        activeLineWidth={1}
                        containerStyle={styles.inputButton}
                        {...otherProps}
                    />
                </TouchableOpacity>


                { this.state.isSelected ?
                <ScrollView style={[styles.dropdown,otherProps.dropdownStyle]}>
                    {/* Select All */}
                    <TouchableOpacity style={[styles.row, otherProps.rowStyle]} 
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
                        <Text style={{color:ColorConstant.BLUE,fontFamily:'Nunito-Regular',fontSize:12}}>{otherProps.allText? otherProps.allText : 'Select All'}</Text>
                    </TouchableOpacity>

                    {/* Data Rows */}
                    {data.map((item,key)=>{
                        return(
                            <TouchableOpacity key={key} style={[styles.row, otherProps.rowStyle]} 
                                onPress={()=>{
                                    if (selectedItem.includes(item)) {
                                        valueSet(oldArray => oldArray.filter(function(value){return value != item}) )       
                                    }
                                    else {                                            
                                        valueSet(oldArray => [...oldArray, item])
                                    }
                                } }>
                                <Image source={ selectedItem.includes(item) ? images.image.checkboxClick :images.image.checkbox} />
                                <Text style={{color:ColorConstant.BLUE,fontFamily:'Nunito-Regular',fontSize:12}}>{item}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView> 
                :null}


                {/* Selected Devices or Item List */}
                { selectedItem && selectedItem.length && !otherProps.hideSelectedDeviceLable ?
                <Text style={{color:ColorConstant.ORANGE,margin:hp(2),fontFamily:'Nunito-SemiBold',fontSize:12}}>
                    Selected Device List
                </Text>:null}
                
                {selectedItem && selectedItem.length?
                <View style={[styles.selectedContainer, selectedItemContainerStyle]}>
                    { Object.values(selectedItem).map((item,key)=>
                    <View style={{flexWrap:'wrap', flexShrink:1 }}>
                        <View style={[otherProps.selectedItemRowStyle]}>
                            <Text style={[{marginRight:hp(1),color:ColorConstant.ORANGE},otherProps.textStyle]} key={key}>{item}</Text>
                            {otherProps.hideDeleteButton ?
                            <TouchableOpacity onPress={()=>otherProps.deleteHandle(item, key)} /*onPress={()=>{
                                if (selectedItem.includes(item)) {
                                    valueSet(oldArray => oldArray.filter(function(value){return value != item}) )}}} */     
                                style={{paddingTop:hp(0.5),justifyContent:'center'}}>
                                <Image style={{height:hp(2)}} source={images.manage.closeClick}/>
                            </TouchableOpacity>  : null}
                        </View>
                    </View>
                    )}
                </View>:null }            

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
        // alignSelf:'center',
        marginVertical:hp(1),
        //backgroundColor:'red'
    },
    dropdown: { 
        position:'relative',
        borderRadius:hp(2),
        opacity:4,
        height:hp(30), 
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
        backgroundColor:ColorConstant.WHITE, 
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