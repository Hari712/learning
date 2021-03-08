import React, { Component, useEffect, useState } from 'react'
import { View, Image, StyleSheet, Text, ImageBackground, Dimensions, TouchableOpacity, TextInput, SafeAreaView, Platform } from 'react-native'
import images from '../../constants/images'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import ShadowView from 'react-native-simple-shadow-view'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { ScrollView } from 'react-native-gesture-handler'
import LiveTrackingDashboard from "../../screen/Dashboard/LiveTrackingDashboard"
import { FontSize} from '../../component'
import { useDispatch, useSelector } from 'react-redux'
import * as DashboardActions from './Dashboad.Action'
import { getDeviceDetailsListInfo, getLoginInfo, getActiveInactiveCountListInfo, getNotificationCountListInfo } from '../Selector'
import iconConstant from '../../constants/iconConstant'
import round from 'lodash/round'
import AppManager from '../../constants/AppManager'
import { SCREEN_CONSTANTS } from '../../constants/AppConstants'
import { FullScreenIcon, RefreshIcon } from '../../component/SvgComponent'
import RecentAlarms from './RecentAlarm'
import DeviceSummary from './DeviceSummary'
import ActiveUser from './ActiveUser'

const Dashboard = ({ navigation }) => {

  const [isClickDownArrow, setIsClickDownArrow] = useState(false)  
  const [isMenuClick, setIsMenuClick] = useState(0)
  const [dropDownPos, setDropDownPos] = useState();
  const [selectedRole, setSelectedRole] = useState('all')

  
  const dispatch = useDispatch()

  const { isConnected, deviceDetails, loginInfo, countsInfo, notificationCount} = useSelector(state => ({
    isConnected: state.network.isConnected,
    loginInfo: getLoginInfo(state),
    deviceDetails: getDeviceDetailsListInfo(state),
    countsInfo: getActiveInactiveCountListInfo(state),
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
   // fetchCounts()
  }, [])

  // useEffect(()=>{
  //   fetchCounts()
  // },[selectedRole])

  // function fetchCounts() {
  //   AppManager.showLoader()
  //   dispatch(DashboardActions.requestActiveInactiveCount(user_id, selectedRole, onSuccess, onError))
  // }

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

  // const onRoleHandle = (item,key) => {
  //   (key == isMenuClick) ? setIsMenuClick(-1) : setIsMenuClick(key)
  //   if(item == 'All Users') {
  //     setSelectedRole('all')
  //   }else if(item == 'Regular') {
  //     setSelectedRole('regular')
  //   }else{
  //     setSelectedRole('owner')
  //   }
  //   fetchCounts()
  // }


  // Active user component
  // const ActiveUser = () => { 
  //   return (
  //     <View>
  //       <View style={styles.mainViewStyle}>

  //         <View style={styles.leftMainViewStyle}>
  //           <Text style={{ fontSize: FontSize.FontSize.small, fontWeight: 'bold', color: ColorConstant.BLACK }} >Users View</Text>
  //         </View>

  //         <View style={styles.rightMainViewStyle}>
  //           <Text style={styles.allUsersTextStyle}>All Users</Text>
  //           <TouchableOpacity onPress={()=>setIsClickDownArrow(!isClickDownArrow)}>
  //           <Image source={images.dashBoard.next} style={styles.nextImageStyle} resizeMode='contain' />
  //           </TouchableOpacity>

  //           <TouchableOpacity onPress={() => { navigation.navigate(SCREEN_CONSTANTS.USERS) }} >
  //             <FullScreenIcon style={styles.fullScreenStyle} resizeMode='contain'/>
  //           </TouchableOpacity>

  //           <TouchableOpacity onPress={() => { fetchCounts() }} >
  //             <RefreshIcon style={styles.refreshImageStyle} resizeMode='contain'/>
  //           </TouchableOpacity>
  //         </View>

  //       </View>
      
  //     <View style={styles.activeUserMainView} onLayout={({nativeEvent}) => setDropDownPos(nativeEvent.layout.y)} >        

  //       { 
  //         countsInfo && countsInfo.map((item, key)=>{
  //         return(
  //           <ShadowView key={key} style={styles.cardContainer}>
  //             <Text style={styles.activeUserTextStyle}>{item.role}</Text>
  //             <View style={styles.activeUserView}>
  //               <ShadowView style={styles.shadowContainer}>

  //                 <AnimatedCircularProgress
  //                   size={hp(13)}
  //                   backgroundWidth={hp(1)}
  //                   width={9}
  //                   fill={round((100*item.active/(item.active+item.inactive)),2)}
  //                   rotation={200}
  //                   lineCap="round"
  //                   style={{ borderRadius: hp(6.5)}}
  //                   tintTransparency={false}
  //                   tintColor={ColorConstant.GREEN}
  //                   onAnimationComplete={() => console.log('onAnimationComplete')}
  //                   backgroundColor={ColorConstant.WHITE}
  //                 >
  //                   {
  //                     (fill) => (
  //                       <View style={{ alignItems: 'center'}} >
  //                         <Text style={styles.percentage}> {round((100*item.active/(item.active+item.inactive)),2)}% </Text>
  //                         <Text style={styles.textStyle}>Active</Text>
  //                       </View>
  //                     )
  //                   }
  //                 </AnimatedCircularProgress>
  //               </ShadowView>
  //             </View>
  //           </ShadowView>
  //         )})
  //       }

  //       </View> 

  //       {isClickDownArrow ?
  //             <View style={[styles.userMenu,{position:'absolute', top:dropDownPos}]}>
  //               {User.map((item, key) =>
  //                 <TouchableOpacity  key={key} onPress={()=> onRoleHandle(item,key)}>
  //                   <Text style={[styles.userStyle,{color: (key == isMenuClick) ? ColorConstant.ORANGE : ColorConstant.BLUE}]}>{item}</Text>
  //                   {key != User.length - 1 ? <View style={styles.horizontalLine} /> : null}
  //                 </TouchableOpacity>
  //               )
  //               }
  //             </View>
  //             : null}

  //     </View>
  //   )
  // }

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

// const User =["All Users","Regular","Owner"]

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
  leftMainViewStyle: {
    paddingLeft: wp(5),
    paddingRight: wp(3),
    // paddingBottom: hp(1)
  },
  percentage: {
    fontSize: FontSize.FontSize.regular, 
    fontWeight: 'bold'
  },
  textStyle: {
    fontSize: hp(1.4), 
    color: ColorConstant.GREY, 
    marginTop: hp(0.5)    
  },
  rightMainViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: wp(6),
    paddingLeft: wp(3),
    // paddingBottom: hp(0)
  },
  allUsersTextStyle: {
    marginRight: wp(3),
    color: ColorConstant.BLUE,
    fontSize: FontSize.FontSize.small,
    fontWeight: '500'
  },
  devicesTextStyle: {
    marginRight: wp(5),
    color: ColorConstant.BLUE,
    fontSize: FontSize.FontSize.small,
    fontWeight: '500'
  },

  ViewallStyle: {
    height: hp(2),
    width: hp(2),
    marginRight: wp(3)
  },

  nextImageStyle: {
    height: hp(1.2),
    width: hp(1.2),
    top: 5,
    marginRight: wp(7)
  },
  fullScreenStyle: {
    height: hp(2),
    width: hp(2),
    marginRight: wp(5)
  },
  refreshImageStyle: {
    height: hp(2),
    width: hp(2)
  },
  activeUserMainView: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    backgroundColor:ColorConstant.WHITE
  },
  cardContainer: {
    backgroundColor: ColorConstant.WHITE,
    marginVertical:hp(2),
    width: '45%',
    // height: hp(25),
    paddingBottom:hp(3),
    borderRadius: hp(5.5 / 2),
    borderWidth: 0.5,
    borderColor: ColorConstant.WHITE,
    shadowColor: ColorConstant.BLACK,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    alignItems: 'center'
  },

  activeUserTextStyle: {
    color: ColorConstant.BLUE,
    fontSize: FontSize.FontSize.small,
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 15
  },

  activeUserView: {
    width: hp(16),
    height: hp(16),
    backgroundColor: '#E6EAF3',
    borderRadius: hp(8),
    justifyContent: 'center',
    alignItems: 'center',
  },

  shadowContainer: {
    backgroundColor: ColorConstant.WHITE,
    shadowColor: ColorConstant.BLACK,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
    borderRadius: hp(6.5), width: hp(13), height: hp(13),
    paddingBottom:50
  },
  userMenu: {
		backgroundColor: ColorConstant.WHITE,
		padding: 5,
		paddingVertical: hp(1.5),
    right: wp(24),
    //zIndex:10,
		borderRadius: 16,
		width: '30%',
		bottom: hp(11),
		justifyContent: 'space-between',
		position: 'absolute',
		shadowColor: ColorConstant.GREY,
		shadowOffset: { height: 0, width: 0 },
		shadowOpacity: 1,
		elevation: 10,
		shadowRadius: 3
  },
  horizontalLine: {
		borderBottomWidth: 0.5, borderBottomColor: ColorConstant.GREY, margin: hp(0.7)
	},
  userStyle: {
		margin: hp(0.5),
		//color: ColorConstant.BLUE,
		textAlignVertical: 'center',
		paddingLeft: hp(0.5),
		fontSize:FontSize.FontSize.small,
		fontFamily:'Nunito-Regular'
	}
})

export default Dashboard;


