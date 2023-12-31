import React, { useState, Component, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions, ScrollView, TextInput, RefreshControl, FlatList } from 'react-native';
import { ColorConstant } from '../../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { CustomDialog, EditIcon, FontSize } from '../../../component';
import { useDispatch, useSelector } from 'react-redux';
import * as LivetrackingActions from '../Livetracking.Action'
import { translate } from '../../../../App'
import { getAlarmsListInfo, getLoginState, isRoleRegular } from '../../Selector';
import { AppConstants, SCREEN_CONSTANTS } from '../../../constants/AppConstants';
import { BackIcon, DeleteIcon, NoRecordFoundImage, } from '../../../component/SvgComponent';
import AppManager from '../../../constants/AppManager';
import { showNotificationName } from '../../../utils/helper';
import DeleteIconButton from '../../../component/DeleteIconButton';


const Alarms = ({ navigation }) => {

  const { isRegular, loginData, alarmListData, isConnected } = useSelector(state => ({
    isRegular: isRoleRegular(state),
    loginData: getLoginState(state),
    isConnected: state.network.isConnected,
    alarmListData: getAlarmsListInfo(state)
  }))

  const dispatch = useDispatch()

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState("")
  const [alarmName, setAlarmName] = useState()
  const [notificationId, setNotificationId] = useState()
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false)

  useEffect(() => {
    loadAlarmList()
  }, [])

  function loadAlarmList() {
    AppManager.showLoader()
    dispatch(LivetrackingActions.requestGetAlarmsList(loginData.id, onSuccess, onError))
  }

  function onSuccess(data) {
    console.log("Success", data)
    setIsRefreshing(false)
    AppManager.hideLoader()
  }

  function onError(error) {
    AppManager.hideLoader()
    console.log("Error", error)
    setIsRefreshing(false)
  }

  React.useLayoutEffect(() => {

    navigation.setOptions({
      headerTitle: () => (
        <Text style={{
          color: ColorConstant.GREY,
          fontSize: FontSize.FontSize.medium,
          fontWeight: '500',
          //letterSpacing: 0,
          textAlign: 'center'
        }}>
          {translate("Alarms")}
        </Text>
      ),
      headerLeft: () => (
        <TouchableOpacity style={{ padding: hp(2) }} onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  function handleRemove(item) {
    setAlarmName(item.attributes.name)
    setNotificationId(item.notificationKey)
    setDeleteDialogVisible(true)
  }

  function deleteAlarmConfirm() {
    if (isConnected) {
      setDeleteDialogVisible(false)
      AppManager.showLoader()
      dispatch(LivetrackingActions.requestDeleteNotification(loginData.id, notificationId, onDeleteSuccess, onDeleteError))
    } else {
      AppManager.showNoInternetConnectivityError()
    }
  }

  const onDeleteSuccess = (data) => {
    AppManager.hideLoader()
    loadAlarmList()
    AppManager.showSimpleMessage('success', { message: data.message, description: '' })
    console.log("Success", data)
  }

  const onDeleteError = (error) => {
    AppManager.hideLoader()
    console.log("Error", data)
    AppManager.showSimpleMessage('success', { message: data.message, description: '' })
  }
  const searchHandle = (keyword) => {
    setSearchKeyword(keyword)
    loadAlarmsSearchList(keyword)
  }
  function loadAlarmsSearchList(searchInput) {
    AppManager.showLoader()
    dispatch(LivetrackingActions.requestSearchAlarm(loginData.id, searchInput, onSuccess, onError))
  }
  function onSuccess(data) {
    console.log("geofence", data)
    setIsRefreshing(false)
    AppManager.hideLoader()
  }

  function onError(error) {
    AppManager.hideLoader()
    setIsRefreshing(false)
  }


  const renderItem = ({ item, index }) => {

    const { attributes } = item
    const editButVisible = String(item.notificationType).includes('geofenceEnter') || String(item.notificationType).includes('geofenceExit')

    return (
      <View style={styles.cardContainer} key={index}>
        <TouchableOpacity onPress={() => navigation.navigate(SCREEN_CONSTANTS.ALARMS_DETAIL, { data: item })}>
          {/* Blue top head */}
          <View style={styles.blueBox}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.blueBoxTitle}>{attributes && attributes.name ? attributes.name : null}</Text>
              <Text style={[styles.blueBoxTitle, { fontFamily: 'Nunito-Regular' }]}>{showNotificationName(item.notificationType)}</Text>
            </View>

            {!isRegular ? !editButVisible &&
              // <TouchableOpacity style={{ zIndex: 5, padding: hp(1), }} onPress={() => { navigation.navigate(SCREEN_CONSTANTS.CREATE_NEW, { editData: item }) }}>
              //   <EditIcon width={hp(2)} height={hp(2)} />
              // </TouchableOpacity>

              <EditIcon onPress={() => { navigation.navigate(SCREEN_CONSTANTS.CREATE_NEW, { editData: item }) }} />
              : null}

            {!isRegular ?

              <DeleteIconButton onPress={() => handleRemove(item)} /> : null}
          </View>


          {/* White Body container */}
          <View style={styles.whiteContainer}>
            {item.devices.length > 0 ? item.devices.map((entry, key) =>
              <View key={key} style={styles.whiteSubView}>
                <Text style={styles.assetText}>{entry.deviceName}</Text>
              </View>
            ) :<View  style={styles.whiteSubView}>
            <Text style={styles.assetText}>0 Device found</Text>
          </View>
          }
          </View>

          {/* Duration*/}
          {/* <View style={styles.horizontalLine} />
            <View style={styles.duration}>
                <Text style={styles.durationText}>
                  { attributes && attributes.everyday ? 
                    "Everyday (All hours)" : 
                    attributes && attributes.weekdays ? "Weekdays(Monday-Friday, All hours)" : "Weekends(Saturday-Sunday, All hours)" }                
                </Text>
          </View> */}
        </TouchableOpacity>
      </View>
    )
  }

  const onRefresh = () => {
    setIsRefreshing(true)
    loadAlarmList()
  }
  const searchBar = () => {
    return (
      <View style={styles.search}>
        <TextInput
          placeholder={translate("Search_here")}
          style={styles.searchText}
          onChangeText={text => searchHandle(text)}
          value={searchKeyword}
          placeholderTextColor={ColorConstant.GREY}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {searchBar()}
      {!isRegular ?
        <TouchableOpacity onPress={() => navigation.navigate(SCREEN_CONSTANTS.CREATE_NEW)} style={styles.header}>
          <Text style={{ fontFamily: 'Nunito-Bold', fontSize: 16, color: ColorConstant.WHITE }}>{translate("Create New")}</Text>
        </TouchableOpacity> : null}
      {alarmListData.length > 0 ?
        <FlatList
          data={alarmListData}
          renderItem={renderItem}
          keyExtractor={(item, index) => { return index.toString() }}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
            />
          }
        />
        :
        <View style={styles.noRecords}>
          <NoRecordFoundImage />
          <Text style={styles.noRecordsText}>No Records Found</Text>
        </View>
      }
      <CustomDialog
        heading="Are you sure ?"
        message={"Do you really want to delete " + alarmName + " alarm ?"}
        visible={deleteDialogVisible}
        onTouchOutside={() => setDeleteDialogVisible(false)}
        negativeHandle={() => setDeleteDialogVisible(false)}
        positiveHandle={deleteAlarmConfirm}
      />
    </View>
  )
}


const styles = StyleSheet.create({

  container: {
    height: '100%'
  },
  cardContainer: {
    width: '90%',
    marginVertical: hp(1.5),
    alignSelf: 'center',
    backgroundColor: ColorConstant.WHITE,
    borderRadius: 12,
    elevation: 3,
    borderColor: ColorConstant.GREY,
    shadowColor: ColorConstant.GREY,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
  },
  header: {
    width: '90%',
    backgroundColor: ColorConstant.ORANGE,
    borderRadius: 12,
    height: hp(6),
    borderWidth: 0.3,
    borderColor: ColorConstant.GREY,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: hp(3)
  },
  blueBox: {
    backgroundColor: ColorConstant.BLUE,
    alignItems: 'center',
    height: hp(6),
    flexDirection: 'row',
    width: "100%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingLeft: hp(3),
    paddingRight: hp(1.5),
    paddingVertical: hp(0.3)
  },
  blueBoxTitle: {
    color: ColorConstant.WHITE,
    fontSize: 12,
    //fontSize:FontSize.FontSize.small,
    // flex: 1,
    fontFamily: 'Nunito-Bold'
  },
  whiteContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  whiteSubView: {
    backgroundColor: ColorConstant.PINK,
    borderRadius: 10,
    marginLeft: hp(2),
    marginVertical: hp(0.8),
    alignItems: 'center'
  },
  assetText: {
    fontSize: 10,
    paddingVertical: hp(0.5),
    paddingHorizontal: hp(1),
    fontFamily: 'Nunito-Regular',
    color: ColorConstant.ORANGE
  },
  horizontalLine: {
    borderBottomWidth: 0.5,
    width: '90%',
    alignSelf: 'center',
    borderBottomColor: ColorConstant.GREY
  },
  duration: {
    //flexDirection:'row',
    marginTop: hp(1.5),
    paddingHorizontal: hp(2.5),
    paddingBottom: hp(1.5),
    alignItems: 'center'
  },
  durationText: {
    fontSize: 10,
    fontFamily: 'Nunito-Regular',
    color: ColorConstant.GREY
  },
  searchText: {
    //fontSize:FontSize.FontSize.small,
    fontSize: 14,
    color: ColorConstant.BLACK,
    fontFamily: 'Nunito-LightItalic'
  },
  search: {
    paddingHorizontal: hp(2),
    height: hp(5),
    marginHorizontal: hp(2.5),
    borderRadius: 12,
    marginTop: hp(4),
    // marginBottom:hp(2),
    elevation: 4,
    shadowColor: ColorConstant.BLACK,
    shadowOffset: {
      width: 0,
      height: 0
    },
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.2,
    backgroundColor: ColorConstant.WHITE
  },
  noRecords: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRecordsText: {
    fontFamily: "Nunito-Regular",
    fontSize: hp(2),
    color: ColorConstant.DARK_GREY,
    marginTop: hp(1),
  },
});


export default Alarms;