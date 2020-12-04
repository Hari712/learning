import React, { useState ,Component} from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, ColorPropType } from 'react-native';
import images from '../../../constants/images';
import { ColorConstant } from '../../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FontSize, TextField } from '../../../component';
import { Dialog } from 'react-native-simple-dialogs';

const SettingsChangePassCode = ({navigation,route}) => {

    const [oldPasscode, setOldPasscode] = useState('')
    const [newPasscode, setNewPasscode] = useState('')
    const [confirmPasscode, setConfirmPassword] = useState('')
    const [dialogVisible,setDialogVisible] = useState(false)
    const [oldpwdEyeClick, setOldpwdEyeClick] = useState(false)
    const [NewpwdEyeClick, setNewpwdEyeClick] = useState(false)
    
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
        <TouchableOpacity onPress={()=>setOldpwdEyeClick(!oldpwdEyeClick)}>
          <Image source={oldpwdEyeClick? images.image.changePasscode.eyeicon : images.image.changePasscode.eyeDisable} />
        </TouchableOpacity>
       
    )
}

const newPasscodeHandleRightAccessory = () =>{
    return(
      <TouchableOpacity onPress={()=>setNewpwdEyeClick(!NewpwdEyeClick)}>
       <Image source={NewpwdEyeClick? images.image.changePasscode.eyeicon : images.image.changePasscode.eyeDisable} />
      </TouchableOpacity>
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
                  secureTextEntry={!oldpwdEyeClick?true:false} 
                  value={oldPasscode} 
                  label='Old Passcode*' 
                  renderRightAccessory={() => oldPasscodeHandleRightAccessory()}
                  onChangeText={(text) => setOldPasscode(text)}
              />
          </View>

          <View style={{marginTop:hp(3)}}>
              <TextField 
                  valueSet={setNewPasscode} 
                  secureTextEntry={!NewpwdEyeClick?true:false} 
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

          <View style={styles.pinkContainer}>
              <Text style={styles.pinkViewText}>A passcode should be a minimum of 8 characters long with no spaces must contain at least one Uppercase(A-Z). Lowercase(a-z), Digit (0-9), and a Special character from @ # $ % ^ & </Text>
          </View>

        </View>

        <TouchableOpacity onPress={()=>setDialogVisible(!dialogVisible)} style={styles.submitButton}>
            <Text style={styles.submit}>Submit</Text>
        </TouchableOpacity>

        <Dialog 
            visible={dialogVisible}
            dialogStyle={styles.dialogStyle}  
            onTouchOutside={() => setDialogVisible(false)}
        > 
        <Image resizeMode='contain' style={styles.dialogImg} source={images.image.changePasscode.success} />
        <Text style={{textAlign:'center'}}>Your new passcode has been set successfully!</Text>
        <TouchableOpacity onPress={()=>setDialogVisible(!dialogVisible)} style={styles.okButton}>
            <Text style={styles.okText}>OK</Text>
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
  pinkContainer: {
    backgroundColor:ColorConstant.PINK,
    borderRadius:4,
    marginTop:hp(3)
  },
  pinkViewText: {
    padding:hp(2),
    color:ColorConstant.BLACK,
    fontSize:12,
    fontFamily:"Nunito-Regular"
  },
  submitButton: {
    backgroundColor:ColorConstant.BLUE,
    width:'70%',
    alignSelf:'center',
    borderRadius:4,
    height:hp(5),
    marginTop:hp(5)
  },
  submit: {
    textAlign:'center',
    paddingVertical:hp(0.7),
    color:ColorConstant.WHITE,
    fontFamily:"Nunito-Bold"
  },
  dialogStyle: {
    borderRadius:hp(2),
    marginTop:hp(15)
  },
  dialogImg: {
    alignSelf:'center',
    marginVertical:hp(1)
  },
  okButton: {
    backgroundColor:ColorConstant.BLUE,
    width:'70%',
    alignSelf:'center',
    borderRadius:4,
    height:hp(5),
    marginTop:hp(5)
  },
  okText: {
    textAlign:'center',
    paddingVertical:hp(0.7),
    color:ColorConstant.WHITE,
    fontFamily:"Nunito-Bold"
  }
});


export default SettingsChangePassCode;