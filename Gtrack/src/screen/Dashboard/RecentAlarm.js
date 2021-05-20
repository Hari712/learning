import React, { Component, useEffect, useState } from 'react'
import { View, Image, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native'
import images from '../../constants/images'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import ShadowView from 'react-native-simple-shadow-view'
import ActivityRings from "react-native-activity-rings";
import { translate } from '../../../App'
import { DropDown, FontSize} from '../../component'
import { useDispatch, useSelector } from 'react-redux'
import * as DashboardActions from './Dashboad.Action'
import { getDeviceDetailsListInfo, getLoginInfo } from '../Selector'
import AppManager from '../../constants/AppManager'
import { RefreshIcon } from '../../component/SvgComponent'

let activityData = [];

const RecentAlarms = (props) => {

    const { deviceDetails, loginInfo } = useSelector(state => ({
        deviceDetails: getDeviceDetailsListInfo(state),
        loginInfo: getLoginInfo(state),
    }))
    
    let deviceListArr = props.deviceList.deviceList ;
    let deviceNameArr = Object.values(deviceListArr).map((item)=>item.deviceDTO.deviceName);
    const [selectedDevice, setSelectedDevice] = useState(deviceNameArr[0]);
    const [alarmData, setAlarmData] = useState()

    const dispatch = useDispatch()

    useEffect(() => {
        selectedDevice ? null : setSelectedDevice(deviceNameArr[0])
        console.log("RecentAlarms", deviceNameArr)    
    },[deviceNameArr])

    useEffect(() => {
        fetchDeviceRecentAlarms()
    },[selectedDevice])
    
    function fetchDeviceRecentAlarms() {
        AppManager.showLoader()
        let deviceId;
        Object.values(deviceListArr).filter((item)=> {
            if(item.deviceDTO.deviceName === selectedDevice)
                deviceId = item.deviceDTO.id
        } )

        console.log("user id",deviceId)
        dispatch(DashboardActions.requestUserDeviceEventsOrNotifiactionCount(loginInfo.id, deviceId, onSuccess, onError))  
    }

    const onSuccess = (data) => {
        AppManager.hideLoader()
        console.log("Success",data)
        setAlarmData(data.result)
    }
    
    const onError = (error) => {
        AppManager.hideLoader()
        console.log("Error",error)
    } 

    if(alarmData) {
      let colorsArray = [ColorConstant.BROWN, ColorConstant.DARKBROWN, ColorConstant.LIGHTBROWN, ColorConstant.ORANGE, ColorConstant.LIGHTPINK]
      console.log("Alarm", alarmData)
      let totalCount = alarmData ? alarmData.totalAlarms : 0
      let array = alarmData ? alarmData.alarmCountDTOS.map((item, key)=>{
        return {
          value: item? item.count/totalCount:0,
          label: item? item.type : null,
          color: colorsArray[key],
          backgroundColor: ColorConstant.GREY
        }
      }) : []
      activityData = array
    }

    return (
        
    <ShadowView style={styles.deviceSummaryContainer}>        

        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop:hp(8)}}>
          <View style={{ justifyContent: 'center', flexDirection: 'row', position: 'absolute', zIndex:0, backgroundColor: ColorConstant.PINK, width: '100%', height: hp(4), alignItems: 'center' }}>
            <Image source={images.dashBoard.bell} style={{ height: hp(2), width: hp(2) }} resizeMode='contain' />
            <Text style={[styles.alertText,{marginLeft: wp(1)}]}>{alarmData ? alarmData.totalAlarms : 0}</Text>
            <Text style={styles.alertText }>{translate("Alerts")}</Text>
          </View>
          {/* Chart View */}
          <ActivityRings theme={"light"} data={activityData} config={activityConfig} />
        </View>

        {/* Legends View */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', padding: hp(2), flexWrap:'wrap' }}>
          {activityData.map((item)=>{
            return (
              <View style={{ paddingHorizontal: hp(1), flexDirection: 'row', alignItems:'center' }}>
                <View style={[styles.alarmStatusMainView, { backgroundColor: item.color }]}></View>
                <Text style={{ color: ColorConstant.BLUE, fontSize: hp(1.4), textAlignVertical:'center', paddingLeft:hp(1) }}>{item.label}</Text>
              </View>
            )
          })}
        </View>


        <View style={[styles.deviceSummaryMainViewStyle, {position:"absolute",marginTop:2}]}>
            <View style={[styles.leftMainViewStyle,{marginTop:hp(3)}]}>
                <Text style={styles.summary}>{translate("Recent Alarms")}</Text>
            </View>

            <View style={{alignItems: 'flex-start', justifyContent:'flex-start', flex:1}}>
                <DropDown 
                    label='Type' 
                    defaultValue={selectedDevice} 
                    valueSet={setSelectedDevice}  
                    dataList={deviceNameArr} 
                    fontSize={hp(1.6)} 
                    contentInset={{ input: 4, label: -8 }}
                    outerStyle={styles.outerStyle} 
                    accessoryStyle={{marginBottom:hp(0.5)}}
                    dropdownStyle = {{top:hp(6)}}
                    inputContainerStyle={styles.inputContainerStyle} 
                    containerStyle={styles.containerStyle} />
            </View>

            <View style={[styles.rightMainViewStyle,{marginTop:hp(3.3)}]}>
                <TouchableOpacity style={styles.refreshImageStyle} onPress={()=>fetchDeviceRecentAlarms()}>
                    <RefreshIcon resizeMode='contain'/>
                </TouchableOpacity>
            </View>
        </View>

        

      </ShadowView>
    )
  }

  
  
  const activityConfig = {
    width: 180,
    height: 180,
    radius: 55,
    ringSize: 5,
  };

  const styles = StyleSheet.create({
    outerStyle:{
      height: hp(5),
      paddingTop:hp(1.5),
      flex:1
    },
    inputContainerStyle: {
      height: hp(3.5),
      width:'100%',
    },
    containerStyle: {
      alignSelf: 'center',
      height: hp(5),
      flex:1
    },
    leftMainViewStyle: {
      paddingLeft: wp(5),
      paddingRight: wp(3),
      paddingBottom: hp(3)
    },
    summary: {
      fontSize: hp(1.4), 
      fontWeight: 'bold', 
      color: ColorConstant.BLACK
    },
    rightMainViewStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingRight: wp(6),
      paddingLeft: wp(3),
      paddingBottom: hp(3)
    },
    alertText: {
      marginLeft: wp(3), 
      fontWeight: 'bold', 
      fontSize: hp(1.4), 
      color: ColorConstant.BLUE
    },
    refreshImageStyle: {
      height: hp(2),
      width: hp(2)
    },
    alarmStatusMainView: {
      width: wp(4),
      height: hp(1.8),
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center'
    },
    deviceSummaryContainer: {
      backgroundColor: ColorConstant.WHITE,
      width: '93%',
      marginVertical: hp(2),
      // height: hp(40),
      flex:1,
      borderRadius: hp(5.5 / 2),
      borderWidth: 0.5,
      borderColor: ColorConstant.WHITE,
      shadowColor: ColorConstant.BLACK,
      shadowOpacity: 0.3,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 0 },
      alignSelf: 'center',
      marginTop: hp(2),
      paddingBottom: hp(1)
    },
    deviceSummaryMainViewStyle: Platform.OS=="ios" ? {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: hp(2.5),
      zIndex: 5
    }:{
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: hp(2.5),
    },
  })

  export default RecentAlarms
