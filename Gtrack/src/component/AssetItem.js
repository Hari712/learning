import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions, ScrollView, TextInput } from 'react-native';
import images from '../constants/images'
import { ColorConstant } from '../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { DropDown, TextField } from '../component';



const AssteItem = (props) => {

    const { item, index } = props

    const { assetName } = item

    const [editClick, setEditClick] = useState()
    const [type, setType] = useState();
    const [tempName, setTempName] = useState();
    const [description1, setDescrption1] = useState();

    function deleteAssetItem(item, key) {

    }

    const popUp = () => {        
        return(
            <View style={{backgroundColor:ColorConstant.PINK,paddingVertical:10,width:'100%',marginTop:hp(2)}}>
                        
                <TextField valueSet={setTempName} value={assetName} label='Name*' outerStyle={{width:'85%',backgroundColor:ColorConstant.WHITE}} /> 
                
                <TextField multiline={true} valueSet={setDescrption1} defaultValue={description1} label='Description' outerStyle={{width:'85%',backgroundColor:ColorConstant.WHITE, marginTop:hp(10)}} /> 
                
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={()=>setEditClick(-1)} style={{borderRadius:6,borderColor:ColorConstant.BLUE,borderWidth:1,backgroundColor:ColorConstant.WHITE,width:'30%',height:hp(6),justifyContent:'center'}}>
                        <Text style={{textAlign:'center',color:ColorConstant.BLUE}}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity  style={{borderRadius:6,backgroundColor:ColorConstant.BLUE,width:'30%',height:hp(6),justifyContent:'center'}}>
                        <Text style={{textAlign:'center',color:ColorConstant.WHITE}}>Save</Text>
                    </TouchableOpacity>
                </View>

                <DropDown label='Type*' defaultValue={type} valueSet={setType}  outerStyle={{width:'85%',alignSelf:'center',backgroundColor:ColorConstant.WHITE, position:'absolute', marginTop: hp(11) }} dropdownStyle={{width:'85%',alignSelf:'center'}} />

            </View>
        )
    }   


    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={[styles.blueCard, { backgroundColor: (index == editClick) ? ColorConstant.ORANGE : ColorConstant.BLUE }]} />
                <View style={styles.whiteCard}>
                    <Text style={{ flex: 1, color: (index == editClick) ? ColorConstant.BLUE : ColorConstant.BLACK }}>{assetName}</Text>
                    <TouchableOpacity onPress={() => {
                        (index == editClick) ? setEditClick(-1) :
                        setEditClick(index)
                    }} style={{ marginRight: hp(2) }}>
                        <Image source={(index == editClick) ? images.manage.editClick : images.manage.edit} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteAssetItem(item, index)} >
                        <Image source={images.manage.trashBlack} />
                    </TouchableOpacity>
                </View>
            </View>
            {(index==editClick)? 
             popUp() : null}  
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    card: {
        //paddingHorizontal:hp(2),
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent:'space-between',
        width: '85%',
        height: hp(6),
        borderRadius: 12,
        marginVertical: hp(2),
        elevation: 4,
        shadowColor: ColorConstant.GREY,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 3,
        shadowOpacity: 1,
        backgroundColor: ColorConstant.WHITE
    },
    blueCard: {
        height: hp(6),
        width: wp(6),
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12
    },
    buttonContainer: {
        flexDirection:'row',
        justifyContent:'space-evenly',
        //width:'75%',
        //margin:hp(3),
        marginTop:hp(3),
        alignItems:'center'
    },
    whiteCard: {
        flexDirection: 'row',
        paddingHorizontal: hp(2),
        alignItems: 'center',
        width: '90%'
    },
})

export default AssteItem