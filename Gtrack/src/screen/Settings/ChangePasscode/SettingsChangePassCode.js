import React, { useState } from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, ColorPropType } from 'react-native';
import images from '../../../constants/images';
import { ColorConstant } from '../../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FontSize, TextField } from '../../../component';
import { Dialog } from 'react-native-simple-dialogs';
import isEmpty from 'lodash/isEmpty'
import { AppConstants } from '../../../constants/AppConstants';
import { validatePassword } from '../../../utils/helper';
import AppManager from '../../../constants/AppManager';
import { useDispatch, useSelector } from 'react-redux';
import * as SettingsActions from '../Settings.Action'
import { getLoginState } from '../../Selector';
import { translate } from '../../../../App';
import { BackIcon, SettingsEyeIcon, SettingsEyeIconClicked } from '../../../component/SvgComponent';
import { useRef } from 'react';

const SettingsChangePassCode = ({navigation,route}) => {

    const dispatch = useDispatch()

    const oldPwdRef = useRef();
    const newPwdRef = useRef();
    const confirmPwdRef = useRef();

    const [oldPasscode, setOldPasscode] = useState('')
    const [newPasscode, setNewPasscode] = useState('')
    const [confirmPasscode, setConfirmPassword] = useState('')
    const [dialogVisible,setDialogVisible] = useState(false)
    const [oldpwdEyeClick, setOldpwdEyeClick] = useState(false)
    const [NewpwdEyeClick, setNewpwdEyeClick] = useState(false)
    const [confirmPwdEyeClick, setConfirmPwdEyeClick] = useState(false)

    const { loginData,isConnected } = useSelector(state => ({
      loginData: getLoginState(state),
      isConnected: state.network.isConnected,
  }))
     
  
  React.useLayoutEffect(() => {

    navigation.setOptions({
        headerTitle: () => (
            <Text style={{
                color:ColorConstant.GREY,
                fontSize: FontSize.FontSize.medium,
                fontWeight: '500',
                //letterSpacing: 0,
                textAlign:'center' }}>
                {translate("Settings")}
            </Text>          
        ),  
        headerLeft:() => (
          <TouchableOpacity style={{padding:hp(2)}} onPress={() => navigation.goBack()}>
            <BackIcon />
          </TouchableOpacity>
        )  
    });
  },[navigation]);

const oldPasscodeHandleRightAccessory = () =>{
    return(
        <TouchableOpacity onPress={()=>setOldpwdEyeClick(!oldpwdEyeClick)}>
          { oldpwdEyeClick ? <SettingsEyeIconClicked/> : <SettingsEyeIcon/> }
        </TouchableOpacity>
       
    )
}

const newPasscodeHandleRightAccessory = () =>{
    return(
      <TouchableOpacity onPress={()=>setNewpwdEyeClick(!NewpwdEyeClick)}>
        { NewpwdEyeClick ? <SettingsEyeIconClicked/> : <SettingsEyeIcon/> }
      </TouchableOpacity>
    )
}

const confirmPasscodeHandleRightAccessory = () =>{
  return(
    <TouchableOpacity onPress={()=>setConfirmPwdEyeClick(!confirmPwdEyeClick)}>
      { confirmPwdEyeClick ? <SettingsEyeIconClicked/> : <SettingsEyeIcon/> }
    </TouchableOpacity>
  )
}

function resetText() { 
  setDialogVisible(!dialogVisible) 
  setOldPasscode('')
  oldPwdRef.current.clear()
  setNewPasscode('')
  newPwdRef.current.clear()
  setConfirmPassword('')
  confirmPwdRef.current.clear()
}

function onSubmitPasscode() {
  if (isConnected) {
      let message = ''
      if (isEmpty(oldPasscode)) {
          message = translate(AppConstants.EMPTY_OLD_PASSCODE)
      }
      else if (isEmpty(newPasscode)) {
          message = translate(AppConstants.EMPTY_NEW_PASSCODE)
      }
      else if (!validatePassword(newPasscode)) {
          message = translate(AppConstants.INVALID_PASSWORD)
      }
      else if (isEmpty(confirmPasscode)) {
          message = translate(AppConstants.EMPTY_CONFIRM_PASSWORD)
      }
      else if (newPasscode != confirmPasscode) {
          message = translate(AppConstants.PASSWORD_DOES_NOT_MATCH)
      }
      if (!isEmpty(message)) {
          AppManager.showSimpleMessage('warning', { message: message, description: '', floating: true })
      } 
      else {
          AppManager.showLoader()
          const requestBody = {
            password: oldPasscode.toString(),
            newPassword: newPasscode.toString(),
            confirmNewPassword: confirmPasscode.toString()
          }
          dispatch(SettingsActions.requestChangePasscode(requestBody, loginData.id, onSuccess, onError))
      }
  }
  else {
      AppManager.showNoInternetConnectivityError()
  }
}

const onSuccess = (data) => {
  AppManager.hideLoader()
  setDialogVisible(!dialogVisible)
  console.log("Success data", data)
  AppManager.showSimpleMessage('success', { message: 'Successfully Changed Password', description: '', floating: true })
}

const onError = (error) => {
  AppManager.hideLoader()
  console.log("Error", error)
  AppManager.showSimpleMessage('warning', { message: error, description: '', floating: true })
}




return ( 
    <View style={styles.container}>
        <View style={{width:'100%'}}>
            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.headerTitle}>{translate("Change Passcode")}</Text>
            </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal:hp(4)}}>
          <View style={{marginTop:hp(5)}}>
              <TextField 
                  valueSet={setOldPasscode}
                  secureTextEntry={!oldpwdEyeClick?true:false} 
                  value={oldPasscode} 
                  label='Old Passcode*' 
                  ref={oldPwdRef}
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
                  ref={newPwdRef}
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
                  renderRightAccessory={() => confirmPasscodeHandleRightAccessory()}
                  ref={confirmPwdRef}
                  onChangeText={(text) => setConfirmPassword(text)}
              />
          </View>

          <View style={styles.pinkContainer}>
              <Text style={styles.pinkViewText}>{translate("Change_Passcode_String")}</Text>
          </View>

        </View>

        <TouchableOpacity onPress={()=>onSubmitPasscode()} style={styles.submitButton}>
          <Text style={styles.submit}>{translate("Submit")}</Text>
        </TouchableOpacity>

        <Dialog 
            visible={dialogVisible}
            dialogStyle={styles.dialogStyle}  
            onTouchOutside={() => setDialogVisible(false)}
        > 
        <Image resizeMode='contain' style={styles.dialogImg} source={images.image.changePasscode.success} />
        <Text style={{textAlign:'center'}}>{translate("Password_Sucess")}</Text>
        <TouchableOpacity onPress={()=>resetText()} style={styles.okButton}>
            <Text style={styles.okText}>{translate("OK")}</Text>
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
    paddingVertical:hp(1),
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
    paddingVertical:hp(1),
    color:ColorConstant.WHITE,
    fontFamily:"Nunito-Bold"
  }
});


export default SettingsChangePassCode;