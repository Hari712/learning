import React, { Component, useEffect, useState, useRef } from 'react'
import { StyleSheet, SafeAreaView, FlatList, View, Text,TouchableOpacity } from 'react-native'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { ScrollView } from 'react-native-gesture-handler'
import LiveTrackingDashboard from "../../screen/Dashboard/LiveTrackingDashboard"
import { FontSize } from '../../component'
import { useDispatch, useSelector } from 'react-redux'
import * as DashboardActions from './Dashboad.Action'
import { getDeviceDetailsListInfo, getLoginInfo, getNotificationCountListInfo, getNotifiedDevicesInfo, isRoleAdmin, isRoleOwner, isRoleRegular } from '../Selector'
import AppManager from '../../constants/AppManager'
import RecentAlarms from './RecentAlarm'
import DeviceSummary from './DeviceSummary'
import ActiveUser from './ActiveUser'
import DeviceView from './DeviceView';
import { useIsFocused } from '@react-navigation/native';
import RBSheet from "react-native-raw-bottom-sheet";

const Dashboard = ({ navigation }) => {

  const [isClickDownArrow, setIsClickDownArrow] = useState(false)
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false)
  const [bottomsheedData,setBottomsheetData] = useState([])

	const [selectedDevice, setSelectedDevice] = useState(null);
	const [selectedDeviceIndex, setSelectedDeviceIndex] = useState(0);
  const sheetRef = useRef(null);

  const dispatch = useDispatch()

  const { isConnected, deviceDetails, loginInfo, isRegular, isAdmin, isOwner, notiDevices } = useSelector(state => ({
    isConnected: state.network.isConnected,
    loginInfo: getLoginInfo(state),
    deviceDetails: getDeviceDetailsListInfo(state),
    notificationCount: getNotificationCountListInfo(state),
    isRegular: isRoleRegular(state),
    isAdmin: isRoleAdmin(state),
    isOwner: isRoleOwner(state),
    notiDevices: getNotifiedDevicesInfo(state)
  }))

  const user_id = loginInfo.id ? loginInfo.id : null

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (null),
    });
  }, [navigation]);

  const isFocused = useIsFocused();
  useEffect(()=>{
    if(bottomsheedData != []){
      setSelectedDevice(bottomsheedData[0])
    }},[bottomsheedData])
    useEffect(() => {
      if(!bottomSheetVisible){
       sheetRef.current.open()
   }
     }, [bottomSheetVisible])
   
  React.useEffect(() => {
    if (isFocused) {
      fetchDeviceDetails()
      fetchNotifiedDevices()
    }
  }, [isFocused]);

  useEffect(() => {
    fetchDeviceDetails()
    fetchNotifiedDevices()
    // sheetRef.current.open()

  }, [])

  // useEffect(() => {
  //   sheetRef.current.open()
  // }, [])

  function fetchDeviceDetails() {
    AppManager.showLoader()
    dispatch(DashboardActions.requestDeviceDetails(user_id, onSuccess, onError))
  }

  function fetchNotifiedDevices() {
    AppManager.showLoader()
    dispatch(DashboardActions.requestGetNotifiedDevices(user_id, onSuccess, onError))
  }

  const onSuccess = (data) => {
    AppManager.hideLoader()
    console.log("success", data)
    setIsClickDownArrow(false)
  }

  const onError = (error) => {
    AppManager.hideLoader()
    console.log("Error", error)
  }

  function onPressDevice(index) {
    const arr = bottomsheedData ? bottomsheedData : [];
    const device = arr[index];
    setSelectedDevice(device);
    setSelectedDeviceIndex(index);
    
    setBottomSheetVisible(false);
  }

  const renderItems = ({ item, index }) => {
    console.log('bottom sheet -------', item, index,selectedDevice.id,selectedDeviceIndex,item.id)
    return (
      <View style={[styles.cardContainer, { borderBottomWidth: index == bottomsheedData.length - 1 ? 0 : 0.8, }]}>
        <TouchableOpacity
          onPress={() => {onPressDevice(index)}}>
          <Text style={[styles.bottomSheetTextStyle, {color:selectedDevice.id == item.id ?  ColorConstant.ORANGE :ColorConstant.GREY}]}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const RenderContent = () => (
    <View style={styles.subView}>
      <Text style={styles.mainTitle}>Select Device</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ width: '90%', marginHorizontal: hp(2), marginVertical: hp(2), }}
        contentContainerStyle={{ paddingBottom: '5%' }}
        data={bottomsheedData}
        renderItem={renderItems}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
  console.log('bottomsheedDatabottomsheedDatabottomsheedData',bottomSheetVisible)

  const RenderBottomSheet = () => {

    return <RBSheet
      ref={sheetRef}
      closeOnDragDown={true}
      height={hp(45)}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0,0,0,0.5)'
        },
        container: {
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30
        },
        draggableIcon: {
          width: hp(10),
          backgroundColor: ColorConstant.ORANGE
        }
      }}

      onClose={() => setBottomSheetVisible(false)}
            onOpen={() => setBottomSheetVisible(true)}
    >
      <RenderContent />
    </RBSheet>

  }

  const openSheet = () => {
   
    sheetRef.current.open();
    setBottomSheetVisible(true);
  }

  return (

    <ScrollView>
      <SafeAreaView style={styles.container}>

        {isOwner ?
          <>
            <LiveTrackingDashboard onOpen={()=>openSheet()} setSheetVisible={(value) => {
              setBottomsheetData(value)
            }} selectedIndex ={selectedDeviceIndex}  />
            <DeviceSummary deviceList={deviceDetails} />
            <RecentAlarms deviceList={notiDevices} />
            <ActiveUser />
            <RenderBottomSheet />
          </> : null}

        {isAdmin ?
          <>
            <LiveTrackingDashboard onOpen={()=>openSheet()} setSheetVisible={(value) => {
              setBottomsheetData(value)
            }}  selectedIndex ={selectedDeviceIndex}  />
            <DeviceSummary deviceList={deviceDetails} />
            <RecentAlarms deviceList={notiDevices} />
            <RenderBottomSheet />
          </> : null}

        {isRegular ?
          <>
            <DeviceView />
          </> : null}
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
    backgroundColor: ColorConstant.WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1),
    zIndex: 10,
  },
  subView: {
    width: '100%',
    alignItems: 'center',
    // height: height / 2,
    backgroundColor: ColorConstant.WHITE,
  },
  mainTitle: {
    color: ColorConstant.ORANGE,
    fontWeight: 'bold',
    paddingTop: hp(2),
    fontSize: FontSize.FontSize.medium,
    fontFamily: 'Nunito-Bold'
  },
  cardContainer: {
    // alignItems: 'center',
    paddingVertical: hp(1.5),
    paddingHorizontal: hp(1),
    borderColor: ColorConstant.LIGTH_GREY,
  },
  bottomSheetTextStyle: {
    margin: hp(0.5),
    color: ColorConstant.GREY,
    textAlignVertical: 'center',
    paddingLeft: hp(0.5),
    fontSize: FontSize.FontSize.small,
    fontWeight: '600',
    fontFamily: 'Nunito-Regular',
  },
})

export default Dashboard;



