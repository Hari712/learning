import React, { Component, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, Modal, FlatList, Dimensions, ScrollView, Platform } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import images from '../constants/images'
import { ColorConstant } from '../constants/ColorConstants'
import { OutlinedTextField } from 'react-native-material-textfield'
import FontSize from './FontSize';
import ShadowView from "react-native-simple-shadow-view"

let data = [];
let selectedItem = [];
let selectedAll = false;

class MultiSelect extends React.Component {

    constructor(props) {
        super();
        this.state = {
            isSelected: false,
        }
    }

    condition(array1, array2) {
        console.log('array1, array2array1, array2array1, array2',array1,array2,array1.length === array2.length,array1.length > 0 && array1.length === array2.length)
        // if(array1.length > 0 && array1.length === array2.length){
        // const newArray = JSON.stringify(array1.map((item)=>item).sort((a,b) => a > b ? 1 : -1)) === JSON.stringify(array2.map((item)=>item).sort((a,b) => a > b ? 1 : -1)) 
        // console.log('newArraynewArraynewArraynewArraynewArraynewArray',newArray)
        // return (array1.length==0 ? false : newArray)
        // }
        if(array1.length === array2.length){
            return true
        }
        else{
            return false
            }
        } 
        

    render() {

        const { label, dataList, selectedData, innerRef, valueSet, outerStyle, selectedItemContainerStyle, ...otherProps } = this.props;

        selectedItem = selectedData ? selectedData : [];
        data = dataList ? dataList : ['Car', 'Truck', 'Tempo'];    

        selectedAll = this.condition(selectedItem, data)

        function handleRightAccessory() {
            return <View style={[{height:styles.inputButton.height-hp(2), justifyContent:'center'}]}>
                <Image source={images.image.next} resizemode='contain'  />
            </View>
        }

        const show = () => {
            this.setState({ isSelected: !this.state.isSelected })
        }
        console.log('selectedItem.includes(item)selectedItem.includes(itrem)selectedItem.includes(item)selectedItem.includes(item)selectedItem.includes(item)',selectedAll,selectedItem)
        return (
            <SafeAreaView >
                <View>
                        <ShadowView style={styles.shadowContainer}>
                    <TouchableOpacity onPress={show} style={[styles.container, outerStyle]}>
                        <OutlinedTextField
                            label={label}
                            textColor={ColorConstant.BLACK}
                            tintColor={ColorConstant.GREY}
                            baseColor={ColorConstant.GREY}
                            fontSize={FontSize.FontSize.small}
                            //labelTextStyle={{ fontFamily: 'Nunito-Regular' }}
                            labelFontSize={FontSize.FontSize.small}
                            contentInset={{ input: 10.45, label: 1.4 }}
                            renderRightAccessory={() => handleRightAccessory()}
                            editable={false}
                            //value='Select Group'
                            inputContainerStyle={styles.inputContainer}
                            activeLineWidth={1}
                            containerStyle={styles.inputButton}
                            {...otherProps}
                        />
                    </TouchableOpacity>
                </ShadowView>
     
                { this.state.isSelected ?
                    data.length > 0 ?
                        <ScrollView nestedScrollEnabled={true} keyboardShouldPersistTaps='always' 
                            style={[styles.dropdown, otherProps.dropdownStyle, data.length == 1 && { height:hp(11)}]}>
                        {/* Select All */}
                            <TouchableOpacity style={[styles.row, otherProps.rowStyle]}
                                onPress={ () => {
                                    console.log('selectAll this.state.isSelected ? data',selectedAll,data)
                                    // selectedAll =  this.condition(selectedItem, data) 
                                    if (selectedAll) {
                                     
                                        valueSet(() => [])
                                        // selectedAll = false
                                    }
                                    else {
                                    
                                        valueSet(() => data)
                                        // selectedAll = true;
                                        // selectedAll = this.condition(selectedItem, data)
                                    }
                                }}>
                                <Image source={selectedAll ? images.image.checkboxClick : images.image.checkbox} />
                                <Text style={{ color: ColorConstant.BLUE, fontFamily: 'Nunito-Regular', fontSize: 12 }}>{otherProps.allText ? otherProps.allText : 'Select All'}</Text>
                            </TouchableOpacity> 

                        {/* Data Rows */}
                        {data && data.length >0 &&data.map((item, key) => {
                                console.log('itemitemitemitemitemitemitemitemitemitemitemitem',item,selectedItem)
                            return (
                                <TouchableOpacity key={key} style={[styles.row, key < data.length-1 && otherProps.rowStyle]}
                                    onPress={() => {
                                        if (selectedItem.includes(item)) {
                                            // if(selectedAll){
                                                // selectedAll=false
                                            // }
                                            valueSet(oldArray => oldArray.filter(function (value) { return value != item }))
                                        }
                                        if (selectedItem.find((element) => { return element.id === item.id })) {
                                            // selectedAll=false
                                            valueSet(oldArray => oldArray.filter(function (value) { return value.id != item.id }))
                                        }
                                        else {
                                            valueSet(oldArray => [...oldArray, item])
                                           let selectedData =[...selectedItem, item]
                                        // //    const isSelectedAllData =  this.condition([...selectedItem, item], data)
                                        //    if(selectedData.length === data.length){
                                        //        selectedAll = true
                                        //        valueSet(oldArray => [...oldArray, item])
                                        //    }
                                        //    else{
                                        //     selectedAll = false
                                        //     valueSet(oldArray => [...oldArray, item])
                                        //    }
                                        //    console.log('isSelectedAllDataisSelectedAllDataisSelectedAllDataisSelectedAllDataisSelectedAllData',selectedData.length ===data.length)
                                          
                                        }
                                    }}>
                                    <Image source={ selectedItem.includes(item) ? images.image.checkboxClick :  selectedItem.find((element) => { return element.id === item.id }) ?images.image.checkboxClick :images.image.checkbox} />
                                    <Text style={{ color: ColorConstant.BLUE, fontFamily: 'Nunito-Regular', fontSize: 12, textTransform: 'capitalize'  }}>{item.deviceName ? item.deviceName: item.firstName+" "+item.lastName}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                        : 
                        <View style={[styles.dropdown, otherProps.dropdownStyle,{height:hp(6)}]}>
                            <Text style={{textAlign:'center',textAlignVertical:'center',flex:1}}>No data</Text>
                        </View>
                    : null
                }


                {/* Selected Devices or Item List */}
                { selectedItem && selectedItem.length && !otherProps.hideSelectedDeviceLable ?
                    <Text style={{ color: ColorConstant.ORANGE, margin: hp(2), fontFamily: 'Nunito-SemiBold', fontSize: 12 }}>
                        Selected Device List
                </Text> : null}
                <ScrollView nestedScrollEnabled={true}>
                {selectedItem && selectedItem.length ?
                    <ScrollView style={[styles.selectedContainer, selectedItemContainerStyle]} nestedScrollEnabled={true}>
                        {Object.values(selectedItem).map((item, key) =>
                            <View key={key} style={{ flexWrap: 'wrap', flexShrink: 1 }}>
                                <View style={[otherProps.selectedItemRowStyle]}>
                                    <Text style={[{ marginRight: hp(1), color: ColorConstant.ORANGE }, otherProps.textStyle]} key={key}>{item.deviceName ? item.deviceName: item.firstName+" "+item.lastName}</Text>
                                    {otherProps.hideDeleteButton ?
                                        <TouchableOpacity onPress={() => otherProps.deleteHandle(item, key)} 
                                            style={{ height:otherProps.selectedItemRowStyle.height ? otherProps.selectedItemRowStyle.height : hp(2), justifyContent: 'center' }}>  
                                            {otherProps.CloseIcon ? otherProps.CloseIcon : <Image style={{ height: hp(2) }} source={images.manage.closeClick} />}
                                        </TouchableOpacity> : null}
                                </View>
                            </View>
                        )}
                    </ScrollView> : null}
                    </ScrollView>
                    </View>
            </SafeAreaView>
        )
    }
}

export class MultiSelectGroup extends React.Component {

    selectedAll = false;

    constructor(props) {
        super();
        this.state = {
            isSelected: false,
        }
        
    }
    
    condition(array1, array2) {
        const newArray = JSON.stringify(array1.map((item)=>item.id).sort((a,b) => a > b ? 1 : -1)) === JSON.stringify(array2.map((item)=>item.id).sort((a,b) => a > b ? 1 : -1))
        return (newArray)
    } 

    render() {

        const { label, dataList, selectedData, innerRef, valueSet, outerStyle, selectedItemContainerStyle, ...otherProps } = this.props;

        selectedItem = selectedData ? selectedData : [];
        data = dataList ? dataList : [{
            "id": 1,
            "groupName": "gtrack",
            "devices": [{
                "id": 1,
                "deviceId": null,
                "deviceName": "Vegit1 Truck",
                "deviceStatus": null,
                "assetAllocationDate": null
            }],
            "isQuickAdd": false,
            "users": []
        }];
        console.log("selected",selectedItem,data)
        
        selectedAll = this.condition(selectedItem, data)
        

        function handleRightAccessory() {
            return <View style={[{height:outerStyle && outerStyle.height?outerStyle.height-hp(3): styles.inputButton.height-hp(3), justifyContent:'center'}]}>
                <Image source={images.image.next} resizemode='contain'  />
            </View>
        }

        const show = () => {
            this.setState({ isSelected: !this.state.isSelected })
        }

        return (
            <SafeAreaView >
                
                <TouchableOpacity onPress={show} style={[styles.container, outerStyle]}>
                    <OutlinedTextField
                        label={label}
                        textColor={ColorConstant.BLACK}
                        tintColor={ColorConstant.GREY}
                        baseColor={ColorConstant.GREY}
                        fontSize={FontSize.FontSize.small}
                        //labelTextStyle={{ fontFamily: 'Nunito-Regular' }}
                        labelFontSize={FontSize.FontSize.small}
                        contentInset={{ input: 16, label: 1.4 }}
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
                    data.length > 0 ?
                    <ScrollView nestedScrollEnabled={true} showsHorizontalScrollIndicator={true}
                        style={[styles.dropdown, otherProps.dropdownStyle, data.length == 1 && { height:hp(11)}]} contentContainerStyle={{ flexGrow: 1 }}>
                        {/* Select All */}
                        {data.length > 0 ?
                            <TouchableOpacity style={[styles.row, otherProps.rowStyle]}
                                onPress={() => {
                                    if (selectedAll) {
                                        // selectedAll = false;
                                        valueSet(oldArray => [])
                                        selectedAll = this.condition(selectedItem, data)
                                    }
                                    else {
                                        // selectedAll = true;
                                        valueSet(oldArray => data)
                                        selectedAll = this.condition(selectedItem, data)
                                    }
                                }}>
                                <Image source={selectedAll ? images.image.checkboxClick : images.image.checkbox} />
                                <Text style={{ color: ColorConstant.BLUE, fontFamily: 'Nunito-Regular', fontSize: 12 }}>{otherProps.allText ? otherProps.allText : 'Select All'}</Text>
                            </TouchableOpacity>
                        : null }

                        {/* Data Rows */}
               
                        {data.map((item, key) => {
                            return (
                                <TouchableOpacity key={item.id} style={[styles.row, key < data.length-1 && otherProps.rowStyle]}
                                    onPress={() => {
                                        if (selectedItem.find((element) => { return element.id === item.id })) {
                                            // selectedAll=false
                                            valueSet(oldArray => oldArray.filter(function (value) { return value.id != item.id }))
                                        }
                                        else {
                                            valueSet(oldArray => [...oldArray, item])
                                            
                                        }
                                    }}>
                                    <Image source={selectedItem.find((element) => { return element.id === item.id }) ? images.image.checkboxClick : images.image.checkbox} />
                                    <Text style={{ color: ColorConstant.BLUE, fontFamily: 'Nunito-Regular', fontSize: 12, textTransform: 'capitalize' }}>{item.groupName}</Text>
                                </TouchableOpacity>
                            )
                        })}
                
                    </ScrollView>
                    : 
                    <View style={[styles.dropdown, otherProps.dropdownStyle,{height:hp(6)}]}>
                        <Text style={{textAlign:'center',textAlignVertical:'center',flex:1}}>No data</Text>
                    </View>
                : null
            }


                {/* Selected Devices or Item List */}
                { selectedItem && selectedItem.length && !otherProps.hideSelectedDeviceLable ?
                    <Text style={{ color: ColorConstant.ORANGE, margin: hp(2), fontFamily: 'Nunito-SemiBold', fontSize: 12 }}>
                        Selected Device List
                </Text> : null}

                {selectedItem && selectedItem.length ?
                    <View style={[styles.selectedContainer, selectedItemContainerStyle]}>
                        {Object.values(selectedItem).map((item, key) =>
                            <View key={item.id} style={{ flexWrap: 'wrap', flexShrink: 1 }}>
                                <View style={[otherProps.selectedItemRowStyle]}>
                                    <Text style={[{ marginRight: hp(1), color: ColorConstant.ORANGE }, otherProps.textStyle]} >{item.groupName}</Text>
                                    {otherProps.hideDeleteButton ?
                                        <TouchableOpacity onPress={() => otherProps.deleteHandle(item)}
                                            style={{ height:otherProps.selectedItemRowStyle.height ? otherProps.selectedItemRowStyle.height : hp(2),  justifyContent: 'center' }}>
                                            <Image style={{ height: hp(2) }} source={images.manage.closeClick} />
                                        </TouchableOpacity> : null}
                                </View>
                            </View>
                        )}
                    </View> : null}

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginVertical: hp(1),
        justifyContent: 'center',
    },
    downArrow: {
        // alignSelf:'center',
        marginVertical: hp(1),
        //backgroundColor:'red'
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
    dropdown: {
        position: 'relative',
        borderRadius: hp(2),
        opacity: 4,
        height: hp(30),
        marginHorizontal: wp(10),
        alignSelf: 'center',
        elevation: 5,
        shadowColor: ColorConstant.GREY,
        shadowOpacity: 0.5,
        shadowRadius: hp(2),
        shadowOffset: { width: 0, height: 0 },
        borderWidth:Platform.OS=='ios'? 0.4 : 0,
        borderColor:ColorConstant.GREY,
        backgroundColor: ColorConstant.WHITE,
        width: '100%',
        paddingHorizontal: hp(2)
    },
    selectedContainer: {
        position: 'relative',
        borderRadius: hp(2),
        opacity: 4,
        marginHorizontal: wp(10),
        alignSelf: 'center',
        elevation: 5,
        shadowColor: ColorConstant.GREY,
        shadowOpacity: 0.5,
        shadowRadius: hp(2),
        shadowOffset: { width: 0, height: 0 },
        backgroundColor: ColorConstant.WHITE,
        width: '100%',
        paddingHorizontal: hp(2),
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
        flexDirection: 'row',
        alignItems: 'center'
    },
})


export default React.forwardRef((props, ref) =>
    <MultiSelect innerRef={ref} {...props} />
);