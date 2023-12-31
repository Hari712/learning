import React, { useState, useEffect,useCallback} from 'react';
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

import Thumb from './Slider/Thumb'
import RailSelected from './Slider/RailSelected'
import Rail from './Slider/Rail'
import Notch from './Slider/Notch'
import Label from './Slider/Label'



import RangeSlider from 'rn-range-slider';

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
  const [isLoadingData,setIsLoadingData]= useState(true)
  const [low, setLow] = useState(-20);
  const [high, setHigh] = useState(60);
  const { isConnected, loginInfo, alertList, distUnit } = useSelector(state => ({
    isConnected: state.network.isConnected,
    loginInfo: getLoginInfo(state),
    alertList: getAlertTypetListInfo(state),
    distUnit: dist(state)
}))
  console.log('route', route)
  useEffect(() => {
    setIsLoadingData(true)
    AppManager.showLoader()
    dispatch(LivetrackingActions.requestGetDevicesByUserId(loginInfo.id, onDeviceSuccess, onDeviceError)),
    dispatch(LivetrackingActions.requestGetAlertTypes(loginInfo.id, onSuccess, onError))
  }, [])
  useEffect(() => {    
    if(route && route.params && !route.params.isPanic){
      const editData = route.params;
      console.log("Edit data",editData)
      if(editData){
        const devices = Object.values(editData.editData.devices).map((item)=>item)

    
        // if(editData.editData.attributes.alarms === "temperature"){
        //   const valuess =editData.editData.attributes.value
        //   console.log('devicesdevicesdevicesdevicesdevicesdevicesdevices',valuess, 
        //   valuess.substr(0, valuess.indexOf(':')),      valuess.substr(2, valuess.indexOf(':')),valuess.split(':')[0],valuess.split(':')[1]
        //   )
        //   setLow(valuess.split(':')[0]/10)
        //   setHigh(valuess.split(':')[1]/10)
        // }
        setSelectedDevice(devices)
        setSelectedNotification(editData.editData.notificationType)
        setEditingValues(editData.editData)
        setSelectedAlarmType(editData.editData.attributes.alarms)
        if( editData.editData.notificationType == 'deviceOverspeed' && editData.editData.attributes.value){
          setOverspeedInputValue(editData.editData.attributes.value,distUnit)
        }
      }
    }
    if(route && route.params && route.params.isPanic) {
      console.log('alertList', alertList)
      setSelectedNotification("alarm")
      setSelectedAlarmType("sos")
    }
  }, 
  [])
//   useEffect(()=>{
// console.log('isLoadingDataisLoadingDataisLoadingDataisLoadingData',)
//   },[isLoadingData])
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
      // let arrDeviceNames = arr.map((item,key)=>item.deviceName)
      setDeviceNames(arr)
      console.log('arrarrarrarrarr',arr)
      setIsLoadingData(false)
      AppManager.hideLoader()
  }

  function onDeviceError(error) {
    setIsLoadingData(false)
      console.log(error)
      AppManager.hideLoader()
  }

  const onPressNext = () => {   
    if (isEmpty(selectedDevice)) {
      AppManager.showSimpleMessage('warning', { message: 'Please select atleast one device', description:'', floating: true })
    } else {
      let arrSelectedId = [];
      selectedDevice ? 
      arrDeviceList.filter((item)=> {      
        selectedDevice.filter((selectedItem)=>{        
          if(item.id === selectedItem.id){ 
            console.log("loop",item.id,selectedItem)   
            route.params && !route.params.isPanic ? arrSelectedId.push(item) : arrSelectedId.push(item.id)
          }
        })  }) 
      :null;
      console.log('arrSelectedId', arrSelectedId,arrDeviceList,selectedDevice,selectedNotification)
      let LowValue=low*10
      let HighValue = high*10
      const TempratureData = selectedAlarmType == "temperature"  && low && high ? `${LowValue}:${HighValue}` : null 
      const TempratureToString = TempratureData != null ? TempratureData.toString() :null
      console.log('SELECTED TEMPRATURE DATA ',TempratureData)
      navigation.navigate(SCREEN_CONSTANTS.ALARMS_TYPE,{
        alarmType:selectedAlarmType, 
        deviceOverSpeedValue:overSpeedInputValue,
        // deviceOverSpeedValue:convertSpeedtoKnot(overSpeedInputValue, distUnit),
        selectedDeviceList:selectedDevice,
        notificationType:selectedNotification, 
        selectedDeviceID: arrSelectedId, 
        temprature:TempratureData,
        editData:editingValues,
        isPanic: route.params && route.params.isPanic ? route.params.isPanic : false
      })
      
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
  const renderThumb = useCallback(() => <Thumb/>, []);
  const renderRail = useCallback(() => <Rail/>, []);
  const renderRailSelected = useCallback(() => <RailSelected/>, []);
  const renderLabel = useCallback(value => <Label text={value}/>, []);
  const renderNotch = useCallback(() => <Notch/>, []);
  const handleValueChange = useCallback((low, high,byUser) => {
    console.log('byUserbyUserbyUserbyUserbyUser',byUser)
    if(byUser){
      console.log('byUserbyUserbyUserbyUserbyUser 1',byUser)
      setLow(low);
      setHigh(high);
    }
    else{
     
      if(route && route.params){
        const editData = route.params;
        if(editData){
       
          if(editData.editData.attributes.alarms === "temperature"){
            const valuess =editData.editData.attributes.value
            const ValueLow = valuess.split(':')[0]/10
            const ValueHigh = valuess.split(':')[1]/10

            if(!byUser){
                setLow(ValueLow)
                setHigh(ValueHigh)
            }
            if(byUser){
                setLow(low)
                setHigh(high)
            }
           
          }
      }
      }
      else{
      setLow(-20);
      setHigh(60);
    }
  }
  },[]);
  console.log('selectedDeviceselectedDeviceselectedDeviceselectedDevice',selectedDevice)
return ( 

  <ScrollView contentContainerStyle={styles.container}  >
    
      <TouchableOpacity style={styles.header}>
        <Text  style={{fontFamily:'Nunito-Bold',fontSize:16,color:ColorConstant.WHITE}}>{route.params  && !route.params.isPanic ?'Edit': 'Create New'}</Text>
      </TouchableOpacity>
      {isLoadingData === false ?
      <View style={{paddingHorizontal:hp(4),marginTop:hp(1.5),zIndex:5, flex:1,marginBottom:hp(2.5)}}>
      {/* arrDeviceNames && arrDeviceNames.length > 0 */}
       <MultiSelect 
                label={translate("Select_Device")}
                dataList={arrDeviceList} 
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
              label={ distUnit=='km' ? 'Speed Limit (kph)' : 'Speed Limit (mph)'}
              defaultValue={overSpeedInputValue}
              outerStyle={[styles.outerStyle,{marginTop:hp(14)}]} 
            />
        } 
        
        {selectedNotification == 'alarm' &&
          <View style={{marginTop:hp(14),marginBottom:hp(12)}}> 
            <DropDown label={translate("Alarm_Type")} 
              defaultValue={showNotificationName(selectedAlarmType)} 
              edit={route.params  ? false : true}
              isRelative={true}
              valueSet={(item) => setSelectedAlarmType(showNotificationLabel(item))} 
              dataList={alarmTypes.map((item) => showNotificationName(item) )}/>   
          </View>
        }
        
        <View style={{marginTop:hp(3),top:selectAlarmDDy,position:'absolute',paddingHorizontal:hp(4),width:wp(100),flex:1}}>       
            <DropDown label='Notification Type*' 
              edit={route.params ? false : true}
              isRelative={true}
              defaultValue={showNotificationName(selectedNotification)} 
              valueSet={(item)=> setSelectedNotification(showNotificationLabel(item))} 
              dataList={alertList.map((item)=>showNotificationName(item))} />   
        </View>
       
    </View>
   :null}
    {/* //{marginTop:hp(8),top:selectAlarmDDy,position:'absolute',paddingHorizontal:hp(2.5),width:wp(100),flex:1,zIndex:4, } */}
    {selectedNotification == "alarm" && selectedAlarmType == "temperature" &&
    <View style={[styles.sliderContainer]}>
            <View style={styles.sliderSubView}>
                        <Text style={styles.radiusTextSize}>{translate("Change_In_Temprature")}</Text>
                    
                    </View>
                    <View style={styles.sliderSubView}>
                      <View style={styles.radiusMainLeftView}>
                            <Text style={styles.textStyleInfo}>{low} °C</Text>
                        </View>
                        <View style={styles.radiusMainView}>
                            <Text style={styles.textStyleInfo}>{high} °C</Text>
                        </View>
                    </View>
                    <View style={styles.sliderView}>
                      <RangeSlider
                    style={styles.slider}
                    min={-20}
                    max={60}
                    low={low}
                    high={high}
                    step={1}
                    floatingLabel
                    renderThumb={renderThumb}
                    renderRail={renderRail}
                    renderRailSelected={renderRailSelected}
                    renderLabel={renderLabel}
                    renderNotch={renderNotch}
                    onValueChanged={handleValueChange}
                  />
                    </View>
                </View>
        } 

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

  )
}

const alarmTypes = ["lowspeed","lowBattery","sos","temperature"] ;

const styles = StyleSheet.create({
dropdown:{

  // width: '100%',
  // height:'auto'
  // backgroundColor:ColorConstant.WHITE,
  // flexGrow:1,
  // flex:1
},
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
    marginTop:hp(1.5),
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
outerStyle: {
  elevation: 4,
  backgroundColor: ColorConstant.WHITE,
  borderRadius: 7,
  shadowColor: ColorConstant.GREY,
  shadowOffset: {
      width: 0,
      height: 0
  },
  shadowRadius: 1,
  shadowOpacity: 1,
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
    padding:hp(1),maxHeight:hp(30)
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
  },
  sliderContainer: {
    width: '100%',
    bottom:hp(3),
    paddingHorizontal: hp(2),
},
sliderSubView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
},
radiusTextSize: {
    color: '#B5B5B5',
    fontSize: hp(1.4),
    paddingTop: hp(1),
    marginLeft: wp(3)
},
radiusMainLeftView: {
    flexDirection: 'row',
    paddingTop: hp(1),
    marginLeft: wp(3)
},
radiusMainView: {
    flexDirection: 'row',
    paddingTop: hp(1),
    marginRight: wp(3)
},
textStyleInfo: {
    fontSize: hp(1.4),
    lineHeight: 20,
    color: ColorConstant.ORANGE
},
otherTextStyle: {
  fontSize: hp(1.4),
  lineHeight: 15,
  color: ColorConstant.ORANGE
},
sliderView: {
  marginLeft: 10,
  marginRight: 10,
  alignItems: "stretch",
  justifyContent: "center"
},slider:{

}
});


export default CreateNew;