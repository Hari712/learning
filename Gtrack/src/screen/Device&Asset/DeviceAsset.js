import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions, ScrollView, FlatList, ActivityIndicator, RefreshControl, TouchableWithoutFeedback, Modal } from 'react-native';
import images from '../../constants/images'
import { DeviceCell } from '../../component'
import { useSelector, useDispatch } from 'react-redux'
import { getDeviceListInfo, getLoginInfo } from '../Selector'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import AppManager from '../../constants/AppManager'
import * as DeviceActions from '../DeviceSetup/Device.Action'
import isEmpty from 'lodash/isEmpty'
import { FontSize } from '../../component';
import NavigationService from '../../navigation/NavigationService';
import Tooltip from 'rn-tooltip';
import { translate } from '../../../App';
import { SCREEN_CONSTANTS } from '../../constants/AppConstants';
import { MenuIcon, MenuIconClicked } from '../../component/SvgComponent';
import { useIsFocused } from '@react-navigation/native';

const DeviceAsset = ({ navigation }) => {

  const dispatch = useDispatch()

  const [menuClick, setMenuClick] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isLoadMoreData, setIsLoadMoreData] = useState(false)
  const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(false)
  const [pageIndex, setPageIndex] = useState(0)
  const [pageCount, setPageCount] = useState(10)
  const [totalCount, setTotalCount] = useState(0)

  const { deviceList, isConnected, loginInfo } = useSelector(state => ({
    deviceList: getDeviceListInfo(state),
    isConnected: state.network.isConnected,
    loginInfo: getLoginInfo(state)
  }))
 console.log("deviceList",deviceList)
  const user_id = loginInfo.id ? loginInfo.id : null

  const isFocused = useIsFocused();

  React.useEffect(() => {
    isFocused ? loadData() : setMenuClick(false)
  },[isFocused]);

  useLayoutEffect(() => {

    navigation.setOptions({
      headerLeft: () => (null),
      headerRight: () => (
        <TouchableOpacity style={{width: wp(12), height: '100%', justifyContent: 'center',  alignItems: 'center'}} activeOpacity={1} onPress={() => setMenuClickEvent()}>
          {menuClick ? <MenuIconClicked style={styles.headerRight}/> :  <MenuIcon style={styles.headerRight}/> }
        </TouchableOpacity>
      )
    });
  }, [navigation,menuClick]);

  function setMenuClickEvent() {
   setMenuClick(prevState => !prevState)
  }

  useEffect(() => {
    loadData()
    return () => {

    }
  }, [])

  const loadData = () => {
    AppManager.showLoader()
    fetchDeviceList()
  }


  useEffect(() => {
    if (isRefreshing == true || isLoadMoreData == true) {
      fetchDeviceList()
    }
  }, [pageIndex, isRefreshing, isLoadMoreData])

  function menuHandle(item) {
    if (item == 'Create') {
      NavigationService.navigate(SCREEN_CONSTANTS.CREATE_DEVICE_ASSET)
    } else if (item == 'Manage') {
      NavigationService.navigate(SCREEN_CONSTANTS.MANAGE)
    }
    // else if (item == 'Export All Devices') {
    //   exportAllDevices()
    // }
    setMenuClickEvent()
  }

  function exportAllDevices() {
    AppManager.showLoader()
    dispatch(DeviceActions.requestExportAllDevices(user_id, onDeviceExportSuccess, onDeviceExportError))
  }

  function onDeviceExportSuccess(data) {
    AppManager.hideLoader()
    AppManager.showSimpleMessage('success', { message: 'Device CSV exported successfully. Please check your mail', description: '' })
  }

  function onDeviceExportError(error) {
    AppManager.hideLoader()
    AppManager.showSimpleMessage('danger', { message: error, description: '' })
  }

  function fetchDeviceList() {
    let requestBody = {
      pageNumber: pageIndex,
      pageSize: pageCount,
      useMaxSearchAsLimit: false,
      searchColumnsList: null,
      sortHeader: 'id',
      sortDirection: 'DESC'
    }
    loadDeviceList(requestBody)
  }

  function loadDeviceList(requestBody) {
    dispatch(DeviceActions.requestGetAllUserDevice(user_id, requestBody, onDeviceListLoadedSuccess, onDeviceListLoadedError))
  }

  function onDeviceListLoadedSuccess(data) {
    console.log("Data",data)
    AppManager.hideLoader()
    const arrList = data.data ? data.data : []
    const totalCount = data.totalCount ? data.totalCount : 0
    if (isEmpty(arrList)) {
      let pagenumber = pageIndex - 1 < 0 ? 0 : pageIndex - 1
      setPageIndex(pagenumber)
    }
    setTotalCount(totalCount)
    setIsRefreshing(false)
    setIsLoadMoreData(false)
  }

  function onDeviceListLoadedError(error) {
    AppManager.hideLoader()
    setIsRefreshing(false)
    setIsLoadMoreData(false)
    let pagenumber = pageIndex - 1 < 0 ? 0 : pageIndex - 1
    setPageIndex(pagenumber)
  }

  const onRefresh = () => {
    setIsRefreshing(true)
    setPageIndex(0)
  }

  const renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (isLoadMoreData) 
    return <View ><ActivityIndicator size="large" color="#000000" /></View>;
    else    
        return null;
    // if (!isLoadMoreData || isRefreshing) return null;
    // return <ActivityIndicator style={styles.activityIndicator} />;
  }

  const loadMoreDevices = () => {
    // if (!onEndReachedCalledDuringMomentum && !isLoadMoreData) {
    //   if (deviceList.length < totalCount) {
    //     setOnEndReachedCalledDuringMomentum(true)
    //     setIsLoadMoreData(true)
    //     setIsRefreshing(false)
    //     setPageIndex(pageIndex + 1)
    //   }
    // }
    if (!onEndReachedCalledDuringMomentum && !isLoadMoreData) {
      if (deviceList.length < totalCount) {
      // setIsRefreshing(false)
      setIsLoadMoreData(true)
      // setToMerge(true)
      setPageIndex(pageIndex + 1)
      }
      else {
          setIsLoadMoreData(false)
          setOnEndReachedCalledDuringMomentum(true)
      }
  }
  }

  function renderDeviceCell({ item, index }) {
    return (
      <DeviceCell
        item={item}
      />
    )
  }

  function renderMenu() {
    return (
      <View style={styles.menuPopup}>
        {Menu.map((item, key) =>
          <TouchableOpacity  key={key} style={{ borderBottomColor: ColorConstant.GREY, borderBottomWidth: key != Menu.length - 1 ? 0.4 : 0 }} onPress={() => menuHandle(item)}>
            <Text style={styles.textStyle}>{item}</Text>
          </TouchableOpacity>
        )
        }
      </View>
    )
  }

  return (
    <>
    {menuClick ? renderMenu() : null}
    <TouchableWithoutFeedback onPress={()=> setMenuClick(false)}>
      
      <View style={{ flex: 1, flexGrow: 1 }}>
        {deviceList.length > 0 ? 
          <FlatList
            refreshControl={
              <RefreshControl
                style={styles.refreshIndicator}
                refreshing={isRefreshing}
                onRefresh={onRefresh}
              />
            }    
            contentContainerStyle={{paddingVertical: hp(2)}}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={renderFooter}
            onEndReached={() => loadMoreDevices()}
            onEndReachedThreshold={0.1}
            onMomentumScrollBegin={() => { setOnEndReachedCalledDuringMomentum(false) }}
            data={deviceList}
            renderItem={(data) => renderDeviceCell(data)}
          />
           : 
           
          <View style={styles.noRecords}>
            <Text style={styles.noRecordsText}>No devices found</Text>
          </View> }

      </View>
      </TouchableWithoutFeedback>
    </>

  )
}

const Menu = ['Create', 'Manage']

const styles = StyleSheet.create({
  headerRight: {
    // marginRight: wp(5),
    height: hp(2.2),
    width: wp(3),
    resizeMode: 'contain'
  },
  menuPopup: {
    backgroundColor: 'white',
    padding: 5,
    paddingVertical: hp(0.5),
    right: wp(3),
    borderRadius: 16,
    width: hp(15),
    top: hp(0.5),
    justifyContent: 'space-between',
    position: 'absolute',
    shadowColor: ColorConstant.GREY,
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 1,
    elevation: 10,
    shadowRadius: 3,
    zIndex: 20
  },
  textStyle: {
    marginVertical: hp(0.5),
    color: ColorConstant.BLUE,
    textAlignVertical: 'center',
    paddingLeft: hp(0.5)
  },
  activityIndicator: {
    color: "#000",
    // marginTop: '2%'
  },
  noRecords: {
    marginVertical:hp(38),
    alignItems:'center'
  },
  noRecordsText: {
    fontFamily:"Nunito-Regular",
    fontSize:hp(2)
  },
  refreshIndicator: { tintColor: 'black' }
})


export default DeviceAsset