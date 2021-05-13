import React, { useState, useEffect} from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, ScrollView } from 'react-native';
import images from '../../../constants/images';
import { ColorConstant } from '../../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import {FontSize, MultiSelect, TextField} from '../../../component';
import { useDispatch, useSelector } from 'react-redux';
import { translate } from '../../../../App'
import { AppConstants, SCREEN_CONSTANTS } from '../../../constants/AppConstants';
import { CircleIcon, CircleIconSelected, BackIcon, CrossIconBlue } from '../../../component/SvgComponent';
import * as LivetrackingActions from '../Livetracking.Action'
import { getLoginInfo, getSubuserState, isRoleAdmin } from '../../Selector';
import AppManager from '../../../constants/AppManager';
import * as UsersActions from '../../Users/Users.Action'
import { isEmpty } from 'lodash';


const AlarmType = ({navigation,route}) => {
    
  const { alarmType, selectedDeviceList, notificationType, deviceOverSpeedValue} = route.params
  
  const dispatch = useDispatch()

  const [alarmName, setAlarmName] = useState()
  const [speed, setSpeed] = useState()
  const [selectedCheckbox, setSelectedCheckbox] = useState(0) 
  const [notification, setNotification] = useState(false)
  const [emailNotification, setEmailNotification] = useState(false)
  const [selectUser, setSelectedUser] = useState([])

  const { loginInfo, subUserData, isConnected, isAdmin } = useSelector(state => ({
    loginInfo: getLoginInfo(state),
    subUserData: getSubuserState(state),
    isConnected: state.network.isConnected,
    isAdmin: isRoleAdmin(state)
  }))

  const userdata = Object.values(subUserData).map((item)=> item.firstName+" "+item.lastName )
  const [isIgnition, setIsIgnition] = useState(false)
  const [inputLabel, setInputLabel] = useState(translate("Alarms_string1"))
  const [overSpeedInputVisible, setOverspeedInputVisible] = useState()
  const [overSpeedInputValue, setOverspeedInputValue] = useState()
  const [batteryLevelInputVisible, setBatteryLevelInputVisible] = useState()
  const [batteryLevelInputValue, setBatteryLevelInputValue] = useState()
  const [movementInputVisible, setMovementInputVisible] = useState()
  const [movementInputValue, setMovementInputValue] = useState()
  
  useEffect(() => {  
    
    dispatch(UsersActions.requestGetSubuser(loginInfo.id, onSuccess, onError))   
    
    if(route){
      const { editData } = route.params;
      if(editData){  
        setAlarmName(editData.notification.attributes.name)      
        { editData.notification.attributes.everyday? setSelectedCheckbox(0) :
        editData.notification.attributes.weekdays ? setSelectedCheckbox(1) :
        setSelectedCheckbox(2) } 

        if(editData.notification.notificators){
          switch (editData.notification.notificators) {
            case "mail,web":
              setNotification(true)
              setEmailNotification(true)
              break;

            case "mail":
              setEmailNotification(true)
              break;

            case "web":
              setNotification(true)
              break;
          
            default:
              break;
          }
        }
        var tempUser = [] ;
        editData.users ?
          editData.users.filter((item)=> tempUser.push(item.firstName+" "+item.lastName)) : null;
        setSelectedUser(tempUser)
      }
    }
  },[])

  useEffect(() => { 

    if(notificationType === 'Alarm') {
      switch (alarmType) {

        case 'Overspeed':
          setOverspeedInputVisible(true)
          break;

        case 'Battery Level':
          setBatteryLevelInputVisible(true)
          break;

        case 'Movement':
          setMovementInputVisible(true)
          break;

        case 'Panic':
          break;
      
        default:
          break;
      }
    }
  }, [alarmType, notificationType])

  React.useLayoutEffect(() => {

    navigation.setOptions({
        headerTitle: () => (
            <Text style={{
                color:ColorConstant.GREY,
                fontSize: FontSize.FontSize.medium,
                fontWeight: '500',
                //letterSpacing: 0,
                textAlign:'center' }}>
                {translate("Alarms")}
            </Text>          
        ),  
        headerLeft:() => (
          <TouchableOpacity style={{padding:hp(2)}} onPress={() => navigation.goBack()}>
            <BackIcon />
          </TouchableOpacity>
        )  
    });
  },[navigation]);

  function sendData() {
    if (isConnected) {
      if (isEmpty(alarmName)) {
        AppManager.showSimpleMessage('warning', { message: translate(AppConstants.EMPTY_ALARM_NAME), description: '', floating: true })
      } else {
      AppManager.showLoader()
      var everyday, weekdays, weekends;

      switch (selectedCheckbox) {
        case 0: everyday = true
                weekdays = false
                weekends = false 
                break;

        case 1: everyday = false
                weekdays = true
                weekends = false 
                break;

        case 2: everyday = false
                weekdays = false
                weekends = true 
                break;
      
        default:  everyday = false
                  weekdays = false
                  weekends = false 
                  break;
      }

      let arrSelectedId = [];
      selectUser ? 
      subUserData.filter((item)=> {      
        selectUser.filter((selectedItem)=>{        
          if(item.firstName+" "+item.lastName === selectedItem){  
            arrSelectedId.push(item.id)
          }
        })  }) 
      :null;

      console.log("User ids",arrSelectedId)

      const {selectedDeviceID} = route.params;
      var requestBody, isUpdate;
      var notificator = notification && emailNotification ? "mail,web" : notification ? "web" : emailNotification ? "mail" : null
      var value = batteryLevelInputVisible ? batteryLevelInputValue :
                  overSpeedInputVisible ? overSpeedInputValue :
                  movementInputVisible ? movementInputValue :
                  deviceOverSpeedValue ? parseInt(deviceOverSpeedValue) :
                  null;
      if(route && route.params && route.params.editData) {
        // Editing/update body
        isUpdate = true;
        requestBody = {
          "userIds" : arrSelectedId,
          "deviceIds" : selectedDeviceID,
          "notification" : {
            "id" : route.params.editData.notification.id,
            "type" : notificationType,
            "always" : false,
            "notificators" : notificator,
            "attributes" : {
              "alarms": alarmType,
              "name": alarmName,
              "everyday": everyday,              
              "weekdays": weekdays,
              "weekends": weekends,
              "value" : value
            },
            "calendarId" : 0
          }
        }      
      } else {
        // create body 
        isUpdate = false;
        requestBody = {
          "userIds" : arrSelectedId,
          "deviceIds" : selectedDeviceID,
          "notification" : {
            "id" : 0,
            "type" : notificationType,
            "always" : false,
            "notificators" : notificator,
            "attributes" : {
              "alarms": alarmType,
              "value" : value,
              "name": alarmName,
              "everyday": everyday,              
              "weekdays": weekdays,
              "weekends": weekends
            },
            "calendarId" : 0
          }
        }
      } 
      console.log("requestbody",requestBody)
      dispatch(LivetrackingActions.requestAddAlarmsNotification(isUpdate, loginInfo.id, requestBody, onAddSuccess, onError))
  }
} else {
  AppManager.showNoInternetConnectivityError()
}
}

  function onAddSuccess(data) {
    if (isConnected) {
      AppManager.hideLoader()  
      let message  
      if(route && route.params && route.params.editData){
        message = 'Alarm updated successfully'
      }else {
        message = 'Alarm created successfully'
      }
      navigation.navigate(SCREEN_CONSTANTS.ALARMS)  
      AppManager.showSimpleMessage('success', { message: message, description: '' })
      dispatch(LivetrackingActions.requestGetAlarmsList(loginInfo.id, onSuccess, onError)) 
    } else {
      AppManager.showNoInternetConnectivityError()
    }
  }

  function onSuccess(data) {
    console.log(data)
    AppManager.hideLoader()     
  }

  function onError(error) {
    console.log(error)
    AppManager.showSimpleMessage('danger', { message: error, description: '' })
    AppManager.hideLoader()
  }

return ( 
  <View style={styles.container}>
    
    <View style={styles.header}>
      <Text  style={{fontFamily:'Nunito-Bold',fontSize:16,color:ColorConstant.WHITE}}>{alarmType}</Text>
    </View>

    <ScrollView nestedScrollEnabled={true} keyboardShouldPersistTaps='always' style={{flex:1}}>
      <View style={{paddingHorizontal:hp(5)}}>
        <View style={{marginVertical:hp(3)}}>
          <Text style={styles.textStyle}>{translate("Device_Name")}</Text>
          {selectedDeviceList.map((device,key) =>
            <Text key={key} style={[styles.textStyle,{marginTop:hp(1),color:ColorConstant.BLACK}]}>
              {device}
            </Text> 
          )}
        </View>

        <TextField 
          valueSet={setAlarmName} 
          maxLength={30}
          label={translate("Alarms_name")}
          defaultValue={alarmName}
          outerStyle={styles.outerStyle} 
        />

        { !isAdmin ? 
          <MultiSelect 
            label="Select User"
            dataList={userdata} 
            allText={translate("All_string")}
            hideSelectedDeviceLable={true}
            hideDeleteButton={true}
            rowStyle={styles.rowStyle}
            dropdownStyle={{height:hp(20)}}
            outerStyle={{marginTop:hp(2)}}
            textStyle={{color:ColorConstant.BLUE}}
            valueSet={setSelectedUser} 
            selectedData={selectUser}
            CloseIcon={<CrossIconBlue/>}
            selectedItemContainerStyle={styles.selectedItemContainerStyle} 
            selectedItemRowStyle={styles.selectedItemRowStyle}
            deleteHandle={(item)=>setSelectedUser(selectUser.filter((item1) => item1 != item))}
          /> : 
          null }

        {overSpeedInputVisible &&
          <TextField 
            valueSet={setOverspeedInputValue} 
            maxLength={30}
            label='Speed Limit (mph)'
            defaultValue={overSpeedInputValue}
            outerStyle={[styles.outerStyle,{marginTop:hp(2)}]} 
          />
        }

        {batteryLevelInputVisible &&
          <TextField 
            valueSet={setBatteryLevelInputValue} 
            maxLength={30}
            label='Battery Level (%)*'
            defaultValue={batteryLevelInputValue}
            outerStyle={[styles.outerStyle,{marginTop:hp(2)}]} 
          />
        }

        {movementInputVisible &&
          <TextField 
            valueSet={setMovementInputValue} 
            maxLength={30}
            label='Battery Level (%)*'
            defaultValue={movementInputValue}
            outerStyle={[styles.outerStyle,{marginTop:hp(2)}]} 
          />
        }

        <View style={{marginVertical:hp(3)}}>
          <Text style={styles.textStyle}>{translate("Time")}</Text>
          {time.map((item,key) =>
            <View key={key} style={{flexDirection:'row',alignItems:'center'}}>
              <TouchableOpacity style={{flexDirection:'row', marginVertical:hp(1),}} onPress={() => key==selectedCheckbox? setSelectedCheckbox(-1):setSelectedCheckbox(key)}>
                {key==selectedCheckbox ? <CircleIconSelected/> : <CircleIcon/> } 
                <Text style={[styles.textStyle,{color:ColorConstant.BLACK}]}> {item}</Text>
              </TouchableOpacity>
            </View> )}
        </View>
          
      </View>

      <TouchableOpacity onPress={() => setNotification(!notification)} style={{flexDirection:'row',alignItems:'center',paddingHorizontal:hp(4)}}>
          <Image style={{alignSelf:'flex-start'}} source={notification? images.liveTracking.checkboxClick : images.liveTracking.checkbox}></Image>
          <Text style={styles.notificationStyle}> {translate("Push Notification")}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setEmailNotification(!emailNotification)} style={{flexDirection:'row',alignItems:'center',paddingHorizontal:hp(4)}}>
          <Image style={{alignSelf:'flex-start'}} source={emailNotification? images.liveTracking.checkboxClick : images.liveTracking.checkbox}></Image>
          <Text style={styles.notificationStyle}> {translate("Email Notification")}</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => navigation.navigate(SCREEN_CONSTANTS.CREATE_NEW)} style={styles.cancelButton}>
                <Text style={{textAlign:'center',color:ColorConstant.BLUE}}>{translate("Cancel")}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => sendData()} style={styles.nextButton}>
                <Text style={{textAlign:'center',color:ColorConstant.WHITE}}>{translate("Save")}</Text>
            </TouchableOpacity>
      </View> 
    </ScrollView>
  </View>
      )
    }

const time = ['Every day(All hours)', 'Weekdays only(Monday-Friday,All hours)','Weekends only(Saturday-Sunday,All hours)' ]

const user = ["John Smith", "John Carter", "John abc"]

const alarmTypes = ["Overspeed","Low speed","Battery Level","Movement","Panic"] 

const styles = StyleSheet.create({

container: {
  height:'100%',
  backgroundColor:ColorConstant.WHITE
},
header : {
  width:'100%',
  backgroundColor: ColorConstant.ORANGE,
  height:hp(7),
  borderColor: ColorConstant.GREY,
  alignItems:'center',
  alignSelf:'center',
  justifyContent:'center'
},
textStyle: {
  fontFamily:'Nunito-Regular',
  fontSize:FontSize.FontSize.small,
  color:ColorConstant.GREY
},
notificationStyle: {
  fontFamily:'Nunito-Regular',
  fontSize:12,
  color:ColorConstant.BLUE
},
outerStyle:{
  //elevation:4,
  marginTop:hp(0.5),
  borderBottomColor:ColorConstant.GREY,
  //borderBottomWidth:1,
  backgroundColor:ColorConstant.WHITE,
  borderRadius:4,
//   shadowColor: ColorConstant.GREY,
//   shadowOffset: {
//     width: 0,
//     height: 0
//   },
//   shadowRadius: 3,
//   shadowOpacity: 1,
},
inputTextStyle: {
  borderRadius:4,
  elevation:4,
  borderColor:ColorConstant.GREY,
  borderWidth:1,
  paddingHorizontal:hp(1),
  backgroundColor:ColorConstant.WHITE,
  height:hp(6),
  marginTop:hp(2)
},
speedText: {
  fontSize: 12, 
  flex:1,
  color:ColorConstant.BLACK,
  fontFamily:'Nunito-Regular'
},
buttonContainer: {
    flexDirection:'row',
    justifyContent:'space-evenly',
    marginTop:hp(5),
    paddingHorizontal:hp(5),
    alignItems:'center',
    paddingBottom:hp(2)
},
cancelButton: {
    borderRadius:6,
    borderColor:ColorConstant.BLUE,
    borderWidth:1,
    backgroundColor:ColorConstant.WHITE,
    width:'35%',
    height:hp(6),
    justifyContent:'center'
},
nextButton: {
    borderRadius:6,
    backgroundColor:ColorConstant.BLUE,
    width:'35%',
    height:hp(6),
    justifyContent:'center'
},
rowStyle: {
  borderBottomColor:ColorConstant.LIGHTGREY, 
  borderBottomWidth:1
},
selectedItemContainerStyle:{
  backgroundColor:"#F9FAFC",
  flexDirection:'row',
  flexWrap:'wrap',
  //backgroundColor:ColorConstant.LIGHTRED,
  borderRadius:8,
  marginTop:hp(2),
  elevation:0,
  padding:hp(1)
},
selectedItemRowStyle: {
  flexDirection:'row',  
  elevation:4,
  shadowColor: ColorConstant.GREY,
  shadowOffset: {
      width: 0,
      height: 0
  },
  shadowRadius: 3,
  shadowOpacity: 1,
  backgroundColor:ColorConstant.LIGHTBLUE,
  borderRadius:5,
  alignItems:'center',
  paddingHorizontal:hp(1),
  margin:4,
  height:hp(4),
  },
});


export default AlarmType;