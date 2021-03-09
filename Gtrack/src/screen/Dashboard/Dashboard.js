import React, { Component, useEffect, useState } from 'react'
import {  StyleSheet, SafeAreaView } from 'react-native'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { ScrollView } from 'react-native-gesture-handler'
import LiveTrackingDashboard from "../../screen/Dashboard/LiveTrackingDashboard"
import { FontSize} from '../../component'
import { useDispatch, useSelector } from 'react-redux'
import * as DashboardActions from './Dashboad.Action'
import { getDeviceDetailsListInfo, getLoginInfo, getNotificationCountListInfo } from '../Selector'
import AppManager from '../../constants/AppManager'
import RecentAlarms from './RecentAlarm'
import DeviceSummary from './DeviceSummary'
import ActiveUser from './ActiveUser'

const Dashboard = ({ navigation }) => {

    const [isClickDownArrow, setIsClickDownArrow] = useState(false)  

    const dispatch = useDispatch()

    const { isConnected, deviceDetails, loginInfo, notificationCount} = useSelector(state => ({
      isConnected: state.network.isConnected,
      loginInfo: getLoginInfo(state),
      deviceDetails: getDeviceDetailsListInfo(state),
      notificationCount: getNotificationCountListInfo(state)
    }))


    const user_id = loginInfo.id ? loginInfo.id : null

    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerLeft: () => (null),
      });
    },[navigation]);

    useEffect(() => {
      fetchDeviceDetails()
    }, [])

    function fetchDeviceDetails() {
      AppManager.showLoader()
      dispatch(DashboardActions.requestDeviceDetails(user_id, onSuccess, onError))
    }

    const onSuccess = (data) => {
      AppManager.hideLoader()
      console.log("Success",data)
      setIsClickDownArrow(false)
    }

    const onError = (error) => {
      AppManager.hideLoader()
      console.log("Error",error)
    }

  
    return (

        <ScrollView>
            <SafeAreaView style={styles.container}>

            <LiveTrackingDashboard />

            <DeviceSummary deviceList={deviceDetails} />

            <RecentAlarms deviceList={deviceDetails}/>

            {/* {deviceDetails?<RecentAlarms deviceList={deviceDetails}/>:null} */}

            <ActiveUser />

            </SafeAreaView>
          
        </ScrollView>

      )

  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorConstant.WHITE,
  },
  mainViewStyle: {
    alignItems: 'center',
    backgroundColor:ColorConstant.WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1),
    zIndex:10,
  },
})

export default Dashboard;


