import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, Dimensions, ScrollView, TextInput} from 'react-native';
import { ColorConstant } from '../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from './FontSize';
import { ConfirmDialog } from 'react-native-simple-dialogs';


const Dialog = (props) => {

    

    const { heading, message, negativeHandle, positiveHandle, negativeButtonName, positiveButtonName, ...otherProps  } = props;

    useEffect(()=>{
        
    },[])


        return(
            <ConfirmDialog
                title={heading}
                titleStyle={styles.titleStyle}
                message={message}
                messageStyle={styles.messageStyle}               
                buttonsStyle={styles.buttonsStyle}
                dialogStyle={{borderRadius:hp(2)}}                
                negativeButton={{
                    title: negativeButtonName ? negativeButtonName :"Cancel",
                    onPress: negativeHandle,
                    titleStyle:{backgroundColor:ColorConstant.WHITE,borderRadius:4,borderWidth:1,borderColor:ColorConstant.BLUE, color:ColorConstant.BLUE,width:wp(30),marginRight:hp(2)}
                }}
                positiveButton={{
                    title: positiveButtonName ? positiveButtonName : "Okay",
                    onPress: positiveHandle,
                    titleStyle:{backgroundColor:ColorConstant.BLUE,borderRadius:4, color:ColorConstant.WHITE,width:wp(30),marginRight:hp(2)}
                }} 
                {...otherProps}
                />
                
            
        )
    }
   
    const styles = StyleSheet.create({

    titleStyle: {
        color:ColorConstant.ORANGE, 
        textAlign:'center',
        fontSize:FontSize.FontSize.regular,
        fontWeight:'bold'
    },
    messageStyle: {
        color:ColorConstant.BLACK, 
        textAlign:'center',
        fontSize:FontSize.FontSize.small
    },
    buttonsStyle: {
        alignItems:'center',
        marginBottom:hp(3)
    },
})
export default Dialog