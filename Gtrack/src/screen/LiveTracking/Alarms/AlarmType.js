import React, { useState ,Component, useEffect} from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, Dimensions, ScrollView, TextInput, RefreshControl, FlatList} from 'react-native';
import images from '../../../constants/images';
import { ColorConstant } from '../../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import {FontSize, MultiSelect, TextField} from '../../../component';
import { useDispatch, useSelector } from 'react-redux';
import { translate } from '../../../../App'
import { SCREEN_CONSTANTS } from '../../../constants/AppConstants';
import { CircleIcon, CircleIconSelected, CheckboxIcon, BackIcon } from '../../../component/SvgComponent';
import * as LivetrackingActions from '../Livetracking.Action'
import { getLoginInfo, getAlertTypetListInfo } from '../../Selector';
import AppManager from '../../../constants/AppManager';
import { color } from 'react-native-reanimated';


const AlarmType = ({navigation,route}) => {
    
  const { alarmType, selectedDeviceList} = route.params
  
  const dispatch = useDispatch()

  const [alarmName, setAlarmName] = useState()
  const [speed, setSpeed] = useState()
  const [selectedCheckbox, setSelectedCheckbox] = useState(-1) 
  const [notification, setNotification] = useState(false)
  const [selectUser, setSelectedUser] = useState([])

  const { loginInfo } = useSelector(state => ({
    loginInfo: getLoginInfo(state)
  }))

  const [isIgnition, setIsIgnition] = useState(false)
  const [inputLabel, setInputLabel] = useState(translate("Alarms_string1"))

  useEffect(() => {    
    if(route){
      const { editData } = route.params;

      if(editData){  
        setAlarmName(editData.notification.attributes.name)      
        { editData.notification.attributes.everyday? setSelectedCheckbox(0) :
        editData.notification.attributes.weekdays ? setSelectedCheckbox(1) :
        setSelectedCheckbox(2) } 

        if(editData.notification.notificators)
          setNotification(true)
      }
    }
  },[])

  useEffect(() => {    
    if(alarmType === "ignitionOn" || alarmType === "ignitionOff")
      setIsIgnition(true)

    if(alarmType === "deviceFuelDrop")
      setInputLabel("Fuel Level(%)")

  }, [alarmType])

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
            <TouchableOpacity onPress={()=>navigation.goBack()}>
              <BackIcon style={{marginLeft:hp(2)}}/>
            </TouchableOpacity>
        )  
    });
  },[navigation]);

  function sendData() {
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

    const {selectedDeviceID} = route.params;
    var requestBody, isUpdate;
    if(route && route.params && route.params.editData) {
      // Editing/update body
      isUpdate = true;
      requestBody = {
        "userIds" : [],
        "deviceIds" : selectedDeviceID,
        "notification" : {
          "id" : route.params.editData.notification.id,
          "type" : alarmType,
          "always" : false,
          "notificators" : notification ? "mail,web" : null,
          "attributes" : {
            "name": alarmName,
            "everyday": everyday,              
            "weekdays": weekdays,
            "weekends": weekends
          },
          "calendarId" : 0
        }
      }      
    } else {
      // create body 
      isUpdate = false;
      requestBody = {
        "userIds" : [],
        "deviceIds" : selectedDeviceID,
        "notification" : {
          "id" : 0,
          "type" : alarmType,
          "always" : false,
          "notificators" : notification ? "mail,web" : null,
          "attributes" : {
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

  function onAddSuccess(data) {
    AppManager.hideLoader()    
    navigation.navigate(SCREEN_CONSTANTS.ALARMS)  
    AppManager.showSimpleMessage('success', { message: data.message, description: '' })
    dispatch(LivetrackingActions.requestGetAlarmsList(loginInfo.id, onSuccess, onError))  
  }

  function onSuccess(data) {
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
          label={translate("Alarms_name")}
          defaultValue={alarmName}
          outerStyle={styles.outerStyle} 
          />

        <MultiSelect 
            label="Select User"
            dataList={user} 
            allText={translate("All_string")}
            hideSelectedDeviceLable={true}
            hideDeleteButton={true}
            rowStyle={styles.rowStyle}
            dropdownStyle={{height:hp(20)}}
            outerStyle={{marginTop:hp(2)}}
            textStyle={{color:ColorConstant.BLUE,flexWrap: 'wrap', flexShrink: 1}}
            valueSet={setSelectedUser} 
            selectedData={selectUser}
            selectedItemContainerStyle={styles.selectedItemContainerStyle} 
            selectedItemRowStyle={styles.selectedItemRowStyle}
            deleteHandle={(item)=>setSelectedUser(selectUser.filter((item1) => item1 != item))}
          /> 

        {isIgnition ? null : 
          <View style={styles.inputTextStyle}>
            <TextInput 
              placeholder={inputLabel}
              style={styles.speedText}
              onChangeText={text => setSpeed(text) }                    
              value={speed}                    
            />
          </View>
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
          {/* <CheckboxIcon/> */}
          <Image style={{alignSelf:'flex-start'}} source={notification? images.liveTracking.checkboxClick : images.liveTracking.checkbox}></Image>
          <Text style={styles.notificationStyle}> {translate("Push Notification")}</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => navigation.navigate(SCREEN_CONSTANTS.CREATE_NEW)} style={styles.cancelButton}>
                <Text style={{textAlign:'center',color:ColorConstant.BLUE}}>{translate("Cancel")}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => sendData()} style={styles.nextButton}>
                <Text style={{textAlign:'center',color:ColorConstant.WHITE}}>{translate("Save")}</Text>
            </TouchableOpacity>
        </View> 
  </View>
      )
    }

const time = ['Every day(All hours)', 'Weekdays only(Monday-Friday,All hours)','Weekends only(Saturday-Sunday,All hours)' ]

const user = ["John Smith", "John Carter", "John abc"]
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
  elevation:4,
  marginTop:hp(0.5),
  borderBottomColor:ColorConstant.GREY,
  borderBottomWidth:1,
  backgroundColor:ColorConstant.WHITE,
  borderRadius:4,
  shadowColor: ColorConstant.GREY,
  shadowOffset: {
    width: 0,
    height: 0
  },
  shadowRadius: 3,
  shadowOpacity: 1,
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
    alignItems:'center'
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
  //flexWrap:'wrap',
  margin:4,
  height:hp(4),
  },
});


export default AlarmType;