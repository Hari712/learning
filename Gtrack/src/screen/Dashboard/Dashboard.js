import React, { Component, useEffect, useState } from 'react'
import { View, Image, StyleSheet, Text, ImageBackground, Dimensions, TouchableOpacity, TextInput, SafeAreaView, Platform } from 'react-native'
import images from '../../constants/images'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import ShadowView from 'react-native-simple-shadow-view'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { ScrollView } from 'react-native-gesture-handler'
import ActivityRings from "react-native-activity-rings";
import LiveTrackingDashboard from "../../screen/Dashboard/LiveTrackingDashboard"
import { translate } from '../../../App'
import { DropDown, FontSize} from '../../component'
import { useDispatch, useSelector } from 'react-redux'
import * as DashboardActions from './Dashboad.Action'
import { getDeviceDetailsListInfo, getLoginInfo } from '../Selector'
import iconConstant from '../../constants/iconConstant'

const Dashboard = ({ navigation }) => {

  const [isClickDownArrow, setIsClickDownArrow] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState();

  
  const dispatch = useDispatch()

  const { isConnected, deviceDetails, loginInfo} = useSelector(state => ({
    isConnected: state.network.isConnected,
    loginInfo: getLoginInfo(state),
    deviceDetails: getDeviceDetailsListInfo(state),
}))

console.log("Device Details",loginInfo.role.map((role)=>role.name))

  const user_id = loginInfo.id ? loginInfo.id : null

  const role = loginInfo.role.map((role)=>role.name)


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (null),
    });
  },[navigation]);

  useEffect(() => {
    dispatch(DashboardActions.requestDeviceDetails(user_id, onDeviceDetailsSuccess, onDeviceDetailsError))
    dispatch(DashboardActions.requestActiveInactiveCount(user_id, onActiveInactiveCountSucess, onActiveInactiveCountError))
  }, [])

  const onDeviceDetailsSuccess = (data) => {
    console.log("Success",data)
  }

  const onDeviceDetailsError = (error) => {
    console.log("Error",error)
  }

  const onActiveInactiveCountSucess = (data) => {
    console.log("Success active",data)
  }

  const onActiveInactiveCountError = (error) => {
    console.log("Error",error)
  }

  // Active user component
  const ActiveUser = () => {
    return (
      <View style={styles.activeUserMainView}>

        {/* Regular active user view */}
        <ShadowView style={styles.cardContainer}>

          <Text style={styles.activeUserTextStyle}>REGULAR</Text>

          <View style={styles.activeUserView}>

            <ShadowView style={styles.shadowContainer}>

              <AnimatedCircularProgress
                size={hp(13)}
                backgroundWidth={hp(1)}
                width={9}
                fill={40}
                rotation={200}
                lineCap="round"
                style={{ borderRadius: hp(6.5)}}
                tintTransparency={false}
                tintColor={ColorConstant.GREEN}
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor={ColorConstant.WHITE}
              >
                {
                  (fill) => (
                    <View style={{ alignItems: 'center'}} >
                      <Text style={styles.percentage}> 40% </Text>
                      <Text style={styles.textStyle}>Active</Text>
                    </View>

                  )
                }
              </AnimatedCircularProgress>

            </ShadowView>

          </View>

        </ShadowView>

        {/* Owner active user view */}
        <ShadowView style={styles.cardContainer}>

          <Text style={styles.activeUserTextStyle}>OWNER</Text>

          <View style={styles.activeUserView}>

            <ShadowView style={styles.shadowContainer}>

              <AnimatedCircularProgress
                size={hp(13)}
                backgroundWidth={hp(1)}
                width={9}
                fill={80}
                rotation={150}
                lineCap="round"
                style={{ borderRadius: hp(6.5) }}
                tintTransparency={false}
                tintColor={ColorConstant.GREEN}
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor={ColorConstant.WHITE}
              >
                {
                  (fill) => (
                    <View style={{ alignItems: 'center' }} >
                      <Text style={styles.percentage}> 75% </Text>
                      <Text style={styles.textStyle}>Active</Text>
                    </View>

                  )
                }
              </AnimatedCircularProgress>

            </ShadowView>

          </View>

        </ShadowView>

      </View>
    )
  }


  // Device summary component
  const DeviceSummary = () => {
    return (
      <ShadowView style={styles.deviceSummaryContainer}>

        <View style={styles.deviceSummaryMainViewStyle}>

          <View style={styles.leftMainViewStyle}>
            <Text style={styles.summary}>{translate("Device Summary")}</Text>
          </View>

          <View style={styles.rightMainViewStyle}>
            <Text style={styles.devicesTextStyle}>{translate("Dashboard_string2")}: {deviceDetails.deviceCount}</Text>

            <TouchableOpacity onPress={() => { navigation.navigate('Device & Asset') }} >
              <Image source={images.dashBoard.fullScreen} style={styles.ViewallStyle} resizeMode='contain' />
            </TouchableOpacity>

            <Image source={images.dashBoard.SettingIcon} style={styles.refreshImageStyle} resizeMode='contain' />
          </View>

        </View>
        {console.log("Dashboad", deviceDetails.deviceList)}
        {Object.values(deviceDetails.deviceList).map((item, key) =>

          <ShadowView style={styles.summaryContainer} key={key}>
            <View style={styles.subContainer}>

              <View style={{ flexDirection: 'row', flex: 0.8, alignItems: 'center' }}>
                <View style={{ flex: 0.25 }}>
                  <View style={styles.deviceSummaryDetailView}>
                    <Image source={item.assetDTO && item.assetDTO.assetType ? iconConstant(item.assetDTO.assetType) : iconConstant('') } style={styles.image} resizeMode='contain' />
                  </View>
                </View>
                  {console.log("details",item)}
                <View style={styles.titleText}>
                  <Text style={styles.title}>{item.deviceDTO.deviceName}</Text>
                  <Text style={styles.subtitle }>{item.groupDTO && item.groupDTO.groupName ? item.groupDTO.groupName : "Default"}</Text>
                </View>

              </View>

              <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'flex-end', }}>
                <View style={[styles.stateViewStyle, { backgroundColor: item.deviceDTO.deviceStatus === 'ACTIVE' ? ColorConstant.LIGHTGREEN : ColorConstant.LIGHTRED }]}>
                  <Text style={[styles.stateTextStyle, { color: item.deviceDTO.deviceStatus === 'ACTIVE' ? ColorConstant.DARKGREEN : ColorConstant.DARKRED }]}>
                    {item.deviceDTO.deviceStatus === 'ACTIVE' ? 'ACTIVE' : 'INACTIVE'}
                  </Text>
                </View>
              </View>

            </View>
          </ShadowView>

        )}

      </ShadowView>
    )
  }

  const RecentAlarms = () => {
    return (
      <ShadowView style={styles.deviceSummaryContainer}>        

        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop:hp(8)}}>
          <View style={{ justifyContent: 'center', flexDirection: 'row', position: 'absolute', zIndex:0, backgroundColor: ColorConstant.PINK, width: '100%', height: hp(4), alignItems: 'center' }}>
            <Image source={images.dashBoard.bell} style={{ height: hp(2), width: hp(2) }} resizeMode='contain' />
            <Text style={[styles.alertText,{marginLeft: wp(1)}]}>30</Text>
            <Text style={styles.alertText }>{translate("Alerts")}</Text>
          </View>

          <ActivityRings data={activityData} config={activityConfig} />
        </View>


        <View style={[styles.deviceSummaryMainViewStyle, {position:"absolute"}]}>
          <View style={[styles.leftMainViewStyle,{paddingTop:hp(0.5)}]}>
            <Text style={styles.summary}>{translate("Recent Alarms")}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent:'flex-start', flex:1}}>
            <DropDown 
              label='Type' 
              defaultValue={selectedDevice} 
              valueSet={setSelectedDevice}  
              dataList={['Group 1','Group 2','Group 3']} 
              fontSize={hp(1.6)} 
              contentInset={{ input: 6, label: -8 }}
              outerStyle={styles.outerStyle} 
              accessoryStyle={{marginBottom:hp(0.5)}}
              dropdownStyle = {{top:hp(3.5),zIndex:99999}}
              inputContainerStyle={styles.inputContainerStyle} 
              containerStyle={styles.containerStyle} /> 
          </View>

          <View style={[styles.rightMainViewStyle,{paddingTop:hp(0.5)}]}>
            <TouchableOpacity style={styles.refreshImageStyle}>
              <Image source={images.dashBoard.refresh} resizeMode='contain' />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingVertical: hp(2) }}>
          <View style={[styles.alarmStatusMainView, { backgroundColor: ColorConstant.LIGHTBROWN }]}></View>
          <Text style={{ color: ColorConstant.BLUE, fontSize: hp(1.4) }}>{translate("Low Battery")}</Text>

          <View style={[styles.alarmStatusMainView, { backgroundColor: ColorConstant.BROWN }]}></View>
          <Text style={{ color: ColorConstant.BLUE, fontSize: hp(1.4) }}>{translate("Movement")}</Text>

          <View style={[styles.alarmStatusMainView, { backgroundColor: ColorConstant.DARKBROWN }]}></View>
          <Text style={{ color: ColorConstant.BLUE, fontSize: hp(1.4) }}>{translate("Dashboard_string7")}</Text>
        </View>

      </ShadowView>
    )
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.mainViewStyle}>

          <View style={styles.leftMainViewStyle}>
            <Text style={{ fontSize: FontSize.FontSize.small, fontWeight: 'bold', color: ColorConstant.BLACK }} >Users View</Text>
          </View>

          <View style={styles.rightMainViewStyle}>
            <Text style={styles.allUsersTextStyle}>All Users</Text>
            <TouchableOpacity onPress={()=>setIsClickDownArrow(!isClickDownArrow)}>
            <Image source={images.dashBoard.next} style={styles.nextImageStyle} resizeMode='contain' />
            </TouchableOpacity>


            {isClickDownArrow ?
              <View style={styles.userMenu}>
                {User.map((item, key) =>
                  <TouchableOpacity key={key}>
                    <Text style={styles.userStyle}>{item}</Text>
                    {key != User.length - 1 ? <View style={styles.horizontalLine} /> : null}
                  </TouchableOpacity>
                )
                }
              </View>
              : null}

            <TouchableOpacity onPress={() => { navigation.navigate('Users') }} >
              <Image source={images.dashBoard.fullScreen} style={styles.fullScreenStyle} resizeMode='contain' />
            </TouchableOpacity>

            <Image source={images.dashBoard.refresh} style={styles.refreshImageStyle} resizeMode='contain' />
          </View>
      
        </View>

        <ActiveUser />

        <DeviceSummary />

        <RecentAlarms />

        <LiveTrackingDashboard />

      </SafeAreaView>
      
    </ScrollView>
  )

}

const User =["All Users","Regular","Owner"]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorConstant.WHITE,
  },

  mainViewStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(3),
    zIndex:2,
  },
  outerStyle:{
    height: hp(3.5),
    marginVertical:0,
    flex:1
  },
  inputContainerStyle: {
    height: hp(3.5),
    width:'100%',
  },
  containerStyle: {
    alignSelf: 'center',
    height: hp(2),
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
    paddingBottom: hp(3)
  },
  alertText: {
    marginLeft: wp(3), 
    fontWeight: 'bold', 
    fontSize: hp(1.4), 
    color: ColorConstant.BLUE
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

  alarmStatusMainView: {
    width: wp(4),
    height: hp(1.8),
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },

  activeUserMainView: {
    justifyContent: 'space-evenly',
    flexDirection: 'row'
  },

  cardContainer: {
    backgroundColor: ColorConstant.WHITE,
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
		backgroundColor: 'white',
		padding: 5,
		paddingVertical: hp(1.5),
    right: wp(26),
    zIndex:10,
		borderRadius: 16,
		width: '80%',
		top: hp(3),
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
		color: ColorConstant.BLUE,
		textAlignVertical: 'center',
		paddingLeft: hp(0.5),
		fontSize:FontSize.FontSize.small,
		fontFamily:'Nunito-Regular'
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

  summaryContainer: {
    marginVertical: hp(2),
    paddingVertical: '3%',
    backgroundColor: ColorConstant.WHITE,
    borderRadius: hp(5.5/2),
    borderWidth:  Platform.OS=="ios" ? 0.5 : 0,
    borderColor: ColorConstant.GREY,
    shadowColor: ColorConstant.BLACK,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    elevation: 10,
    paddingHorizontal: '3%',
    marginHorizontal: '4%'
  },
  subContainer: {
    flexDirection: 'row', 
    flex: 1
  },

  deviceSummaryDetailView: {
    width: hp(6),
    height: hp(6),
    backgroundColor: ColorConstant.LIGHTBLUE,
    borderRadius: hp(8),
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    paddingHorizontal: '3%', 
    marginTop: hp(1), 
    flex: 0.75
  },
  title: {
    color: ColorConstant.BLACK, 
    fontSize: hp(1.4), 
    fontWeight: '500'
  },
  subtitle: {
    color: ColorConstant.GREY, 
    fontSize: hp(1.4), 
    marginTop: hp(1)
  },
  image: {
    height: hp(3.5), 
    width: hp(3.5)
  },

  stateViewStyle: {
    width: '90%',
    height: hp(2.5),
    backgroundColor: ColorConstant.GREY,
    borderRadius: hp(2.5 / 2),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '3%'
  },

  stateTextStyle: {
    fontSize: hp(1.0),
    fontWeight: '500'
  }

})

export default Dashboard;

const DeviceSummaryData = [
  {
    title: 'TrackPort International',
    subtitle: 'Home',
    state: 'Active',
    icon: images.dashBoard.carIcon
  },
  {
    title: 'TrackPort 4G Vehicle GPS Tracker',
    subtitle: 'Fedex Ground',
    state: 'Inactive',
    icon: images.dashBoard.truckIcon
  },
  {
    title: 'Spark Nano 7 GPS Tracker',
    subtitle: 'Industrial',
    state: 'Active',
    icon: images.dashBoard.carIcon
  },
]

const activityData = [
  {
    value: 0.8,
    color: ColorConstant.BROWN,
    backgroundColor: ColorConstant.GREY,
    label: "ACTIVITY",
  },
  {
    value: 0.6,
    color: ColorConstant.DARKBROWN,
    backgroundColor: ColorConstant.GREY,
    label: "ACTIVITY",
  },
  {
    label: "RINGS",
    value: 0.2,
    color: ColorConstant.LIGHTBROWN,
    backgroundColor: ColorConstant.GREY,
  }
];

const activityConfig = {
  width: 180,
  height: 180,
  radius: 55,
  ringSize: 5,
};