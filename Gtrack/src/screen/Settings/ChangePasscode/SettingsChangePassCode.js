import React, { useState ,Component} from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, Dimensions, ScrollView, TextInput} from 'react-native';
import images from '../../../constants/images';
import { ColorConstant } from '../../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import {  Button, FontSize, TextField } from '../../../component';
import { cps } from 'redux-saga/effects';
import { Dialog } from 'react-native-simple-dialogs';

const SettingsChangePassCode = ({navigation,route}) => {

    const [oldPasscode, setOldPasscode] = useState('')
    const [newPasscode, setNewPasscode] = useState('')
    const [confirmPasscode, setConfirmPassword] = useState('')
    const [dialogVisible,setDialogVisible] = useState(false)
    
  React.useEffect(() => {

  },[])



  React.useLayoutEffect(() => {

    navigation.setOptions({
        headerTitle: () => (
            <Text style={{
                color:ColorConstant.GREY,
                fontSize: FontSize.FontSize.medium,
                fontWeight: '500',
                //letterSpacing: 0,
                textAlign:'center' }}>
                Settings
            </Text>          
        ),  
        headerLeft:() => (
            <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Image style={{marginLeft:hp(2)}} source={images.image.back}/>
            </TouchableOpacity>
        )  
    });
  },[navigation]);

const oldPasscodeHandleRightAccessory = () =>{
    return(
        <Text>Khushi</Text>
    )
}

const newPasscodeHandleRightAccessory = () =>{
    return(
        <Text>Khushi</Text>
    )
}

return ( 
    <View style={styles.container}>
        <View style={{width:'100%'}}>
            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.headerTitle}>Change Passcode</Text>
            </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal:hp(4)}}>
        <View style={{marginTop:hp(5)}}>
            <TextField 
                valueSet={setOldPasscode}
                secureTextEntry={true} 
                value={oldPasscode} 
                label='Old Passcode*' 
                renderRightAccessory={() => oldPasscodeHandleRightAccessory()}
                onChangeText={(text) => setOldPasscode(text)}
            />
        </View>

        <View style={{marginTop:hp(3)}}>
            <TextField 
                valueSet={setNewPasscode} 
                secureTextEntry={true}
                value={newPasscode} 
                label='New Passcode*' 
                renderRightAccessory={() => newPasscodeHandleRightAccessory()}
                onChangeText={(text) => setNewPasscode(text)}
            />
        </View>

        <View style={{marginTop:hp(3)}}>
            <TextField 
                valueSet={setConfirmPassword} 
                secureTextEntry={true}
                value={confirmPasscode} 
                label='Confirm Passcode*' 
                onChangeText={(text) => setOldPasscode(text)}
            />
        </View>

        <View style={{backgroundColor:ColorConstant.PINK,borderRadius:4,marginTop:hp(3)}}>
            <Text style={{padding:hp(2),fontSize:12,fontFamily:"Nunito-Regular"}}>A passcode should be a minimum of 8 characters long with no spaces must contain at least one Uppercase(A-Z). Lowercase(a-z), Digit (0-9), and a Special character from @ # $ % ^ & </Text>
        </View>
        </View>

        <TouchableOpacity onPress={()=>setDialogVisible(!dialogVisible)} style={{backgroundColor:ColorConstant.BLUE,width:'70%',alignSelf:'center',borderRadius:4,height:hp(5),marginTop:hp(5)}}>
            <Text style={{textAlign:'center',paddingVertical:hp(0.7),color:ColorConstant.WHITE,fontFamily:"Nunito-Bold"}}>Submit</Text>
        </TouchableOpacity>

        <Dialog 
            visible={dialogVisible}
            onTouchOutside={() => setDialogVisible(false)}
        > 
        <Image style={{alignSelf:'center',marginVertical:hp(3)}} source={images.image.bluebell} />
        <Text style={{textAlign:'center'}}>Your new passcode has been set successfully!</Text>
        <TouchableOpacity onPress={()=>setDialogVisible(!dialogVisible)} style={{backgroundColor:ColorConstant.BLUE,width:'70%',alignSelf:'center',borderRadius:4,height:hp(5),marginTop:hp(5)}}>
            <Text style={{textAlign:'center',paddingVertical:hp(0.7),color:ColorConstant.WHITE,fontFamily:"Nunito-Bold"}}>OK</Text>
        </TouchableOpacity>
        </Dialog>
        
      
    </View>
      
      )
    }



const styles = StyleSheet.create({

  container: {
    backgroundColor:ColorConstant.WHITE,
    flex:1
  },
  textStyle: {
    fontSize:12,
    fontFamily:'Nunito-Regular',
    color:ColorConstant.BLACK
  },
  unitContainer: {
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:hp(2)
  },
  subText: {
    fontSize:10,
    fontFamily:'Nunito-Italic',
    color:ColorConstant.BLACK
  },
  unit: {
    fontSize:12,
    fontFamily:'Nunito-SemiBold',
    color:ColorConstant.BLACK
  },
  language: {
    fontSize:12,
    fontFamily:'Nunito-Regular',
    color:ColorConstant.ORANGE
  },
  unitText: {
    fontSize:10,
    flex:1,
    fontFamily:'Nunito-Regular',
    color:ColorConstant.ORANGE
  },
  headerTitle: {
    fontFamily:'Nunito-Bold',
    fontSize:16,
    color:ColorConstant.WHITE
  },
  addButton : {
    backgroundColor:ColorConstant.ORANGE,
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    height:hp(7),
  
  },

});


export default SettingsChangePassCode;