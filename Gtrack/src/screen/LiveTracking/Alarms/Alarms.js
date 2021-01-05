import React, { useState ,Component, useEffect} from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, Dimensions, ScrollView, TextInput, RefreshControl, FlatList} from 'react-native';
import images from '../../../constants/images';
import { ColorConstant } from '../../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FontSize } from '../../../component';
import { useDispatch, useSelector } from 'react-redux';
import * as LoginActions from '../../Login/Login.Action'
import * as LivetrackingActions from '../Livetracking.Action'
import { translate } from '../../../../App'
import { getAlarmsListInfo, getLoginState, isRoleRegular } from '../../Selector';
import { AppConstants, SCREEN_CONSTANTS } from '../../../constants/AppConstants';
import { BackIcon, DeleteIcon, EditIcon } from '../../../component/SvgComponent';
import AppManager from '../../../constants/AppManager';


const Alarms = ({navigation}) => {

  const { isRegular, loginData, alarmListData } = useSelector(state => ({
    isRegular: isRoleRegular(state),
    loginData: getLoginState(state),
    alarmListData: getAlarmsListInfo(state)
  }))

  const dispatch = useDispatch()

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [list, setList] = useState(DATA);

  useEffect(() => {  
    loadAlarmList()
  }, [])

 function loadAlarmList() {
  AppManager.showLoader()  
  dispatch(LivetrackingActions.requestGetAlarmsList(loginData.id, onSuccess, onError))
 }
  function onSuccess(data) {    
    console.log("Success",data) 
    setIsRefreshing(false) 
    AppManager.hideLoader()
  }
  
  function onError(error) {
    AppManager.hideLoader()
    console.log("Error",error)  
    setIsRefreshing(false) 
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
            <TouchableOpacity onPress={()=>navigation.goBack()}>
              <BackIcon style={{marginLeft:hp(2)}}/>
            </TouchableOpacity>
        )  
    });
  },[navigation]);

  function handleRemove(notificationId) {
    AppManager.showLoader()
    dispatch(LivetrackingActions.requestDeleteNotification(loginData.id, notificationId, onDeleteSuccess, onDeleteError))    
  }

  const onDeleteSuccess = (data) => {
    AppManager.hideLoader()
    loadAlarmList()
    console.log("Success",data)
  }

  const onDeleteError = (error) => {
    AppManager.hideLoader()
    console.log("Error",data)    
  }

  const renderItem = ({item,index}) => {
    // console.log("Item no: ",index, item)
    const {attributes} = item.notification
    return(  
    <View style={styles.cardContainer} key={index}>
      <TouchableOpacity onPress={() => navigation.navigate(SCREEN_CONSTANTS.ALARMS_DETAIL,{data:item})}>
          {/* Blue top head */}
          <View style={styles.blueBox}>
              <View style={{flex:1}}>
                <Text style={styles.blueBoxTitle}>{attributes && attributes.name ? attributes.name : null}</Text>
                <Text style={[styles.blueBoxTitle,{fontFamily:'Nunito-Regular'}]}>{item.notification.type}</Text>
              </View>

              { !isRegular ?
              <TouchableOpacity style={{zIndex:5, padding: hp(1.5)}} onPress={()=>{navigation.navigate(SCREEN_CONSTANTS.CREATE_NEW,{editData:item})}}>
                <EditIcon  width={13.947}  height={13.947}/>
              </TouchableOpacity> : null }

              { !isRegular ?
              <TouchableOpacity onPress={() => handleRemove(item.notification.id)} style={{zIndex:5, padding:hp(1)}} >
                <DeleteIcon width={13.943} height={15.463}/>
              </TouchableOpacity> : null }       
          </View>
          

          {/* White Body container */}
          <View style={styles.whiteContainer}>
            {item.devices.map((entry,key) =>
              <View key={key} style={styles.whiteSubView}>
                <Text style={styles.assetText}>{entry.deviceName}</Text>
              </View>
            )}
          </View>

          {/* Duration*/}
          <View style={styles.horizontalLine} />
            <View style={styles.duration}>
                <Text style={styles.durationText}>
                  { attributes && attributes.everyday ? 
                    "Everyday (All hours)" : 
                    attributes && attributes.weekdays ? "Weekdays(Monday-Friday, All hours)" : "Weekends(Saturday-Sunday, All hours)" }                
                </Text>
          </View>
        </TouchableOpacity>
    </View>
    )   
  }

    const onRefresh = () => {
      setIsRefreshing(true) 
      loadAlarmList()
  }


return ( 
  <View style={styles.container}>
    { !isRegular ?
      <TouchableOpacity onPress={() => navigation.navigate(SCREEN_CONSTANTS.CREATE_NEW)} style={styles.header}>
        <Text style={{fontFamily:'Nunito-Bold',fontSize:16,color:ColorConstant.WHITE}}>{translate("Create New")}</Text>
      </TouchableOpacity> : null }

      <FlatList
        data={alarmListData}
        renderItem={renderItem}
        keyExtractor={(item,index) => {return index}}
        refreshControl={
          <RefreshControl 
            refreshing={isRefreshing}
            onRefresh={onRefresh}     
          />
        }
      />

  </View>
      )
    }
const DATA = [
    {
        id: 0,
        title: 'Speed',
        type: 'Overspeed Alarm',
        asset: ['TrackPort International'],
        duration: 'Weekdays(Monday-Friday, All hours)'
    },
    {
        id: 1,
        title: 'Emergency',
        type: 'Panic Alarm',
        asset: ['Spark Nano 7 GPS Tracker', 'TrackPort International', 'TrackPort 4G Vehicle GPS Tracker'],
        duration: 'Everyday(All hours)'
    },
    
];


const styles = StyleSheet.create({

  container: {
    height:'100%'
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
    width:'90%',
    backgroundColor: ColorConstant.ORANGE,
    borderRadius: 12,
    height:hp(6),
    borderWidth: 0.3,
    borderColor: ColorConstant.GREY,
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
    marginVertical:hp(3)
},
blueBox : {
  backgroundColor:ColorConstant.BLUE,
  alignItems:'center',
  height:hp(6),
  flexDirection:'row',
  width:"100%",
  borderTopLeftRadius:12,
  borderTopRightRadius:12,
  paddingHorizontal:hp(3),
  paddingVertical:hp(0.3)
},
blueBoxTitle :{
  color:ColorConstant.WHITE,
  fontSize:12,
  //fontSize:FontSize.FontSize.small,
  flex:1,
  fontFamily:'Nunito-Bold'
},
whiteContainer : {
  flexDirection:'row',
  flexWrap:'wrap'
},
whiteSubView : {
  backgroundColor:ColorConstant.PINK,
  borderRadius:10, 
  marginLeft:hp(2),
  marginVertical:hp(0.8),
  alignItems:'center'
},
assetText: {
  fontSize:10,
  paddingVertical:hp(0.5),
  paddingHorizontal:hp(1),
  fontFamily:'Nunito-Regular',
  color:ColorConstant.ORANGE
},
horizontalLine:{
  borderBottomWidth:0.5,
  width:'90%',
  alignSelf:'center',
  borderBottomColor:ColorConstant.GREY
},
duration : {
  //flexDirection:'row',
  marginTop:hp(1.5),
  paddingHorizontal:hp(2.5),
  paddingBottom:hp(1.5),
  alignItems:'center'
},
durationText: {
  fontSize:10,
  fontFamily:'Nunito-Regular',
  color:ColorConstant.GREY
},
});


export default Alarms;