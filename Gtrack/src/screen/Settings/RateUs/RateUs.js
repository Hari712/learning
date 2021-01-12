import React, { useState, Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Dialog } from 'react-native-simple-dialogs';
import { translate } from '../../../../App';
import { CircleIconSelected } from '../../../component/SvgComponent';
const RateUs = ({ navigation }) => {
    const [dialogVisible,setDialogVisible] = useState(true)
    return(
        <View>
                <Dialog 
                visible={dialogVisible}
                //dialogStyle={styles.dialogStyle}  
                onTouchOutside={() => setDialogVisible(false)}
            > 
            <CircleIconSelected/>
            <Text style={{textAlign:'center'}}>{translate("Password_Sucess")}</Text>
            <TouchableOpacity onPress={()=>setDialogVisible(!dialogVisible)} >
                <Text >{translate("OK")}</Text>
            </TouchableOpacity>
            </Dialog>
        </View>
    )
}

export default RateUs;