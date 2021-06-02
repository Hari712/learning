import React, { useState, useEffect} from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, ScrollView } from 'react-native';
import { ColorConstant } from '../../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useDispatch, useSelector } from 'react-redux';
import AppManager from '../../../constants/AppManager';
import * as LivetrackingActions from '../Livetracking.Action'
import App, { translate } from '../../../../App'
import { DropDown, MultiSelect, FontSize, TextField} from '../../../component';
import { SCREEN_CONSTANTS } from '../../../constants/AppConstants';
import { BackIcon } from '../../../component/SvgComponent';
import { getLoginInfo, getAlertTypetListInfo, dist } from '../../Selector';
import isEmpty from 'lodash/isEmpty'
import { convertSpeedtoKnot, convertSpeedVal, NOTIFICATION_TYPE, showNotificationName, showNotificationLabel } from './../../../utils/helper';


const CreateNew = ({navigation,route}) => {

  const dispatch = useDispatch()

  const [selectedDevice, setSelectedDevice] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState();
  const [editingValues, setEditingValues] = useState();
  const [arrDeviceList, setDeviceList] = useState([])
  const [arrDeviceNames, setDeviceNames] = useState([])
  const [selectedAlarmType, setSelectedAlarmType] = useState()
  const [selectAlarmDDy, setSelectAlarmDDy] = useState()
  const [overSpeedInputValue, setOverspeedInputValue] = useState()

  const { isConnected, loginInfo, alertList, distUnit } = useSelector(state => ({
    isConnected: state.network.isConnected,
    loginInfo: getLoginInfo(state),
    alertList: getAlertTypetListInfo(state),
    distUnit: dist(state)
}))

  useEffect(() => {    
    if(route){
      const editData = route.params;
      console.log("Edit data",editData)
      if(editData){
        const devices = Object.values(editData.editData.devices).map((item)=>item.deviceName)
        setSelectedDevice(devices)
        setSelectedNotification(editData.editData.notification.type)
        setEditingValues(editData.editData)
        setSelectedAlarmType(editData.editData.notification.attributes.alarms)
        if( editData.editData.notification.type == 'deviceOverspeed' && editData.editData.notification.attributes.value){
          setOverspeedInputValue(convertSpeedVal(editData.editData.notification.attributes.value,distUnit))
        }
      }
    }
  }, 
  [])

  useEffect(() => {
    dispatch(LivetrackingActions.requestGetDevicesByUserId(loginInfo.id, onDeviceSuccess, onDeviceError)),
    dispatch(LivetrackingActions.requestGetAlertTypes(loginInfo.id, onSuccess, onError))
  }, [])

  function onSuccess(data) {
    AppManager.hideLoader()
  }

  function onError(error) {
    console.log(error)
    AppManager.hideLoader()
  }

  function onDeviceSuccess(data) {
      console.log("Data",data)
      let arr = Object.values(data.result).map((item,key)=>item)
      setDeviceList(arr)
      let arrDeviceNames = arr.map((item,key)=>item.deviceName)
      setDeviceNames(arrDeviceNames)
  }

  function onDeviceError(error) {
      console.log(error)
  }

  const onPressNext = () => {   
    if (isEmpty(selectedDevice)) {
      AppManager.showSimpleMessage('warning', { message: 'Please select atleast one device', description:'', floating: true })
    } else {
      let arrSelectedId = [];
      selectedDevice ? 
      arrDeviceList.filter((item)=> {      
        selectedDevice.filter((selectedItem)=>{        
          if(item.deviceName === selectedItem){ 
            console.log("loop",item.id,selectedItem)   
            arrSelectedId.push(item.id)
          }
        })  }) 
      :null;
        
      navigation.navigate(SCREEN_CONSTANTS.ALARMS_TYPE,{
        alarmType:selectedAlarmType, 
        deviceOverSpeedValue:convertSpeedtoKnot(overSpeedInputValue, distUnit),
        selectedDeviceList:selectedDevice,
        notificationType:selectedNotification, 
        selectedDeviceID: arrSelectedId, 
        editData:editingValues})
      
    }
  }

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

return ( 
<>
  <ScrollView contentContainerStyle={styles.container}>
    
      <TouchableOpacity style={styles.header}>
        <Text  style={{fontFamily:'Nunito-Bold',fontSize:16,color:ColorConstant.WHITE}}>{route.params?'Edit': 'Create New'}</Text>
      </TouchableOpacity>
      <View style={{paddingHorizontal:hp(4),marginTop:hp(3),zIndex:5, flex:1}}>
        <MultiSelect 
                label={translate("Select_Device")}
                dataList={arrDeviceNames} 
                allText={translate("All_string")}
                hideSelectedDeviceLable={true}
                hideDeleteButton={true}
                rowStyle={styles.rowStyle}
                dropdownStyle={{height:hp(20)}}
                outerStyle={{marginTop:hp(2)}}
                valueSet={setSelectedDevice} 
                selectedData={selectedDevice}
                selectedItemContainerStyle={styles.selectedItemContainerStyle} 
                selectedItemRowStyle={styles.selectedItemRowStyle}
                deleteHandle={(item)=>setSelectedDevice(selectedDevice.filter((item1) => item1 != item))}
                />  
        <View onLayout={({nativeEvent}) => setSelectAlarmDDy(nativeEvent.layout.y)} /> 

        {selectedNotification == 'deviceOverspeed' &&
            <TextField 
              valueSet={setOverspeedInputValue} 
              maxLength={30}
              label={ dist=='km' ? 'Speed Limit (kph)' : 'Speed Limit (mph)'}
              defaultValue={overSpeedInputValue}
              outerStyle={[styles.outerStyle,{marginTop:hp(14)}]} 
            />
        } 
        
        {selectedNotification == 'alarm' &&
          <View style={{marginTop:hp(14),marginBottom:hp(12)}}> 
            <DropDown label={translate("Alarm_Type")} 
              defaultValue={showNotificationName(selectedAlarmType)} 
              valueSet={(item) => setSelectedAlarmType(showNotificationLabel(item))} 
              dataList={alarmTypes.map((item) => showNotificationName(item) )} />   
          </View>
        }
        
        <View style={{marginTop:hp(3),top:selectAlarmDDy,position:'absolute',paddingHorizontal:hp(4),width:wp(100),flex:1}}>       
            <DropDown label='Notification Type*' 
              defaultValue={showNotificationName(selectedNotification)} 
              valueSet={(item)=> setSelectedNotification(showNotificationLabel(item))} 
              dataList={alertList.map((item)=>showNotificationName(item))} />   
        </View>

    </View>

    {
      selectedDevice.length>=0 && selectedNotification ?
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => navigation.navigate(SCREEN_CONSTANTS.ALARMS)} style={styles.cancelButton}>
                <Text style={{textAlign:'center',color:ColorConstant.BLUE}}>{translate("Cancel")}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onPressNext()} style={styles.nextButton}>
                <Text style={{textAlign:'center',color:ColorConstant.WHITE}}>{translate("Next")}</Text>
            </TouchableOpacity>
        </View> 
      : null 
    }

  </ScrollView>
  </>
  )
}

const alarmTypes = ["lowspeed","lowBattery","sos"] ;

const styles = StyleSheet.create({

  container: {
    backgroundColor:ColorConstant.WHITE,
    flexGrow:1
  },
  cardContainer: {
    width:'90%',
    marginVertical: hp(1.5),
    alignSelf: 'center',
    backgroundColor: ColorConstant.WHITE,
    borderRadius: 12,
    elevation:3,
    borderColor: ColorConstant.GREY,
    shadowColor:ColorConstant.GREY,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
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
buttonContainer: {
    flexDirection:'row',
    justifyContent:'space-evenly',
    //width:'75%',
    //margin:hp(3),
    bottom:10,
    flex:1,
    alignItems:'flex-end'
},
cancelButton: {
    borderRadius:6,
    borderColor:ColorConstant.BLUE,
    borderWidth:1,
    backgroundColor:ColorConstant.WHITE,
    width:'30%',
    height:hp(6),
    justifyContent:'center'
},
nextButton: {
    borderRadius:6,
    backgroundColor:ColorConstant.BLUE,
    width:'30%',
    height:hp(6),
    justifyContent:'center'
},
selectedItemContainerStyle:{
    backgroundColor:ColorConstant.PINK,
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
backgroundColor:ColorConstant.LIGHTPINK,
borderRadius:5,
alignItems:'center',
paddingHorizontal:hp(1),
//flexWrap:'wrap',
margin:4,
height:hp(4),
},
  rowStyle: {
    borderBottomColor:ColorConstant.LIGHTGREY, 
    borderBottomWidth:1
  }
});


export default CreateNew;