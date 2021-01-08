import React, { useState, Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Dialog } from 'react-native-simple-dialogs';
import { translate } from '../../App';
import { CircleIconSelected } from './SvgComponent';

const RateUsDialog = (props) => {
    console.log("inside Rateus ",props)
    const {visible, setVisible} = props;

    return(
        <View>
                <Dialog 
                visible={visible}
                //dialogStyle={styles.dialogStyle}  
                onTouchOutside={() => setVisible(false)}
            > 
            <CircleIconSelected/>
            <Text style={{textAlign:'center'}}>{translate("Password_Sucess")}</Text>
            <TouchableOpacity onPress={()=>setVisible(!visible)} >
                <Text >{translate("OK")}</Text>
            </TouchableOpacity>
            </Dialog>
        </View>
    )
}

export default RateUsDialog;