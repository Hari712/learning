import React, { useState, Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Dialog } from 'react-native-simple-dialogs';
import { EditText, FontSize, TextField } from '.';
import { translate } from '../../App';
import { ColorConstant } from '../constants/ColorConstants';
import { RateUsDialogIcon, StarIcon, StarIconClick } from './SvgComponent'
import { AirbnbRating  } from 'react-native-ratings'
// import Icon from 'react-native-vector-icons/Ionicons'



const RateUsDialog = (props) => {
    console.log("inside Rateus ",props)
    const {visible, setVisible} = props;
    const [starCount, setStarCount] = useState(4)
    const [description, setDescrption] = useState()
    const MAX_CHARACTERS_LIMIT = 250

    return(
        <View>
            <Dialog 
            visible={visible}
            //dialogStyle={styles.dialogStyle}  
            onTouchOutside={() => setVisible(false)}
            > 
            <RateUsDialogIcon style={{alignSelf:'center'}} />
            <Text style={{textAlign:'center',fontFamily:'Nunito-Regular',fontSize:14,paddingHorizontal:hp(5)}}>How would you rate your experience with us ?</Text>
            <View style={{flexDirection:'row',alignSelf:'center',marginVertical:hp(3),paddingHorizontal:hp(2)}}>
                <Text style={{color:ColorConstant.LIGHTGREY,fontFamily:'Nunito-SemiBold',fontSize:12,flex:1,alignSelf:'center',textAlign:'right'}}>Poor</Text> 
                
                <View style={{paddingHorizontal:wp(1)}} >
                    <AirbnbRating
                        count={5}
                        showRating={false}
                        defaultRating={starCount}
                        selectedColor={'#ff7f21'}
                        size={20}
                        onFinishRating={(rate)=>setStarCount(rate)}
                    />
                </View>
                
                <Text style={{color:ColorConstant.LIGHTGREY,fontFamily:'Nunito-SemiBold',fontSize:12 ,flex:1,alignSelf:'center',textAlign:'left'}}>Excellent</Text> 
            </View>
            <View style={styles.decsContainer}>
                <TextInput
                    placeholder="Additional Comments"
                    style={styles.descStyle}
                    value={description}
                    onChangeText={(value) => { setDescrption(value) }}
                    maxLength={MAX_CHARACTERS_LIMIT}
                    multiline={true}
                    numberOfLines={4}
                />
            </View>
            <View style={styles.submitButtonStyle}>
                <TouchableOpacity onPress={()=>setVisible(!visible)} >
                    <Text style={styles.submitTextStyle} >{translate("Submit")}</Text>
                </TouchableOpacity>
                </View>
            </Dialog>
        </View>
    )
}

const styles = StyleSheet.create({
    descStyle: {
        height:hp(20),
        textAlignVertical: 'top',
        fontSize: FontSize.FontSize.small,
        padding:hp(1.5)
    },
    decsContainer: {
        elevation:4,
        backgroundColor:ColorConstant.WHITE,
        borderRadius:10,
        borderWidth:0.5,
        borderColor:ColorConstant.GREY
    },
    submitButtonStyle: {
        borderRadius: 6, 
        marginTop: hp(5), 
        width: '85%', 
        alignSelf: 'center', 
        alignItems: 'center', 
        justifyContent: 'space-evenly', 
        backgroundColor: ColorConstant.BLUE, 
        height: hp(5)
    },
    submitTextStyle: {
        color: ColorConstant.WHITE, 
        fontWeight: 'bold', 
        fontSize: FontSize.FontSize.medium
    }
})

export default RateUsDialog;