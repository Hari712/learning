import * as React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LiveTracking, Users, DashBoard,DeviceAsset,EditDeviceAsset,CreateDeviceAsset,Details,Settings,Profile,Subscription,PaymentSettings,Permission,About,RateUs,Feedback,Manage,AddUser,EditProfile,Notification, SensorInfo, DeviceInfo, GeoFence, GeoFenceCreateNew, GeoFenceType, GeoFenceDetails,AdvanceSettings, SettingNotification, Alarms, CreateNew, AlarmType, AlarmDetail, ActivateDevice, AssignAsset, AssignGroup, BarcodeScanner, CompleteSetup, GeoFenceCreator, SettingsChangePassCode,TrackingDetails } from '../screen';
import { ColorConstant } from '../constants/ColorConstants';
import { FontSize } from '../component';
import images from '../constants/images';
import { translate } from '../../App'
import { isRoleRegular } from '../screen/Selector';
import { useSelector } from 'react-redux';
import { AppConstants, SCREEN_CONSTANTS } from '../constants/AppConstants';

const Tab = createBottomTabNavigator();
const LiveTrackingStack = createStackNavigator();
const UsersStack = createStackNavigator();
const DashBoardStack = createStackNavigator();
const DeviceAssetStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const ScreenOptions = {
    headerStyle: {
        backgroundColor: ColorConstant.WHITE,
        elevation: 10,
        shadowOpacity: 0.9,
        borderBottomWidth: 0
    },
    headerTintColor: ColorConstant.GREY,
    headerTitleStyle: {
        fontSize: FontSize.FontSize.medium,
        fontWeight: '500',
    },
    headerTitleAlign: 'center',
    headerTransparent: false,
}


const LiveTrackingStackNavigator = () => {
    
    return(
    <LiveTrackingStack.Navigator initialRouteName="LiveTracking" headerMode='screen'  screenOptions={ScreenOptions}>
        <LiveTrackingStack.Screen name={SCREEN_CONSTANTS.LIVE_TRACKING} component={LiveTracking} />
        <LiveTrackingStack.Screen name={SCREEN_CONSTANTS.NOTIFICATION} component={Notification} />
        <LiveTrackingStack.Screen name={SCREEN_CONSTANTS.SENSOR_INFO} component={SensorInfo} />
        <LiveTrackingStack.Screen name={SCREEN_CONSTANTS.DEVICE_INFO} component={DeviceInfo} />
        <LiveTrackingStack.Screen name={SCREEN_CONSTANTS.GEOFENCE} component={GeoFence} />
        <LiveTrackingStack.Screen name={SCREEN_CONSTANTS.GEOFENCE_CREATE_NEW} component={GeoFenceCreateNew} />
        <LiveTrackingStack.Screen name={SCREEN_CONSTANTS.GEOFENCE_TYPE} component={GeoFenceType} />
        <LiveTrackingStack.Screen name={SCREEN_CONSTANTS.GEOFENCE_DETAILS} component={GeoFenceDetails} />
        <LiveTrackingStack.Screen name={SCREEN_CONSTANTS.ALARMS} component={Alarms} />
        <LiveTrackingStack.Screen name={SCREEN_CONSTANTS.CREATE_NEW} component={CreateNew} />
        <LiveTrackingStack.Screen name={SCREEN_CONSTANTS.ALARMS_TYPE} component={AlarmType} />
        <LiveTrackingStack.Screen name={SCREEN_CONSTANTS.ALARMS_DETAIL} component={AlarmDetail} />
        <LiveTrackingStack.Screen name={SCREEN_CONSTANTS.ACTIVATE_DEVICE} component={ActivateDevice} />
        <LiveTrackingStack.Screen name={SCREEN_CONSTANTS.ASSIGN_ASSET} component={AssignAsset} />
        <LiveTrackingStack.Screen name={SCREEN_CONSTANTS.ASSIGN_GROUP} component={AssignGroup} />
        <LiveTrackingStack.Screen name={SCREEN_CONSTANTS.BARCODE_SCANNER} component={BarcodeScanner}/>
        <LiveTrackingStack.Screen name={SCREEN_CONSTANTS.COMPLETE_SETUP} component={CompleteSetup}/>
        <LiveTrackingStack.Screen name={SCREEN_CONSTANTS.GEOFENCE_CREATOR} component={GeoFenceCreator}/>
    </LiveTrackingStack.Navigator>
    )
}

const UsersStackNavigator = () => {
    return(
        <UsersStack.Navigator initialRouteName="Users" headerMode="screen" screenOptions={ScreenOptions} >
            <UsersStack.Screen name={SCREEN_CONSTANTS.USERS} component={Users} />
            <UsersStack.Screen name={SCREEN_CONSTANTS.ADD_USER} component={AddUser} />
        </UsersStack.Navigator>
    )
}

const DashBoardStackNavigator = () => {
    return(
        <DashBoardStack.Navigator initialRouteName="DashBoard" headerMode="none" headerMode="screen" screenOptions={ScreenOptions}>
            <DashBoardStack.Screen name={SCREEN_CONSTANTS.DASHBOARD} component={DashBoard} />
            <DashBoardStack.Screen name={SCREEN_CONSTANTS.TRACKING_DETAILS} component={TrackingDetails} />
        </DashBoardStack.Navigator>
    )
}

const DeviceAssetStackNavigator = () => {
    return(
        <DeviceAssetStack.Navigator initialRouteName="DeviceAsset" headerMode="screen" screenOptions={ScreenOptions} >
            <DeviceAssetStack.Screen name="Device & Asset" component={DeviceAsset} />
            <DeviceAssetStack.Screen name={SCREEN_CONSTANTS.DETAILS} component={Details}/>
            <DeviceAssetStack.Screen name={SCREEN_CONSTANTS.EDIT_DEVICE_ASSET} component={EditDeviceAsset}/>
            <DeviceAssetStack.Screen name={SCREEN_CONSTANTS.CREATE_DEVICE_ASSET} component={CreateDeviceAsset}/>
            <DeviceAssetStack.Screen name={SCREEN_CONSTANTS.MANAGE} component={Manage} />
        </DeviceAssetStack.Navigator>
    )
}

const SettingsStackNavigator = () => {
    return(
        <SettingsStack.Navigator initialRouteName="Settings" headerMode="screen" screenOptions={ScreenOptions} >
            <SettingsStack.Screen name={SCREEN_CONSTANTS.SETTINGS} component={Settings} />
            <SettingsStack.Screen name={SCREEN_CONSTANTS.PROFILE} component={Profile} />
            <SettingsStack.Screen name={SCREEN_CONSTANTS.EDIT_PROFILE} component={EditProfile} />
            <SettingsStack.Screen name={SCREEN_CONSTANTS.PERMISSION} component={Permission} />
            <SettingsStack.Screen name={SCREEN_CONSTANTS.ABOUT} component={About} />
            <SettingsStack.Screen name={SCREEN_CONSTANTS.RATE_US} component={RateUs} />
            <SettingsStack.Screen name={SCREEN_CONSTANTS.FEEDBACK} component={Feedback} />
            <SettingsStack.Screen name={SCREEN_CONSTANTS.ADVANCE_SETTINGS} component={AdvanceSettings} />
            <SettingsStack.Screen name={SCREEN_CONSTANTS.SETTINGS_CHANGE_PASSCODE} component={SettingsChangePassCode} />
            <SettingsStack.Screen name={SCREEN_CONSTANTS.SETTINGS_NOTIFICATION} component={SettingNotification} />
        </SettingsStack.Navigator>
    )
}

export const TabStackNavigator = ({ }) => {
    const { isRegular } = useSelector(state => ({
        isRegular: isRoleRegular(state)
      }))

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, title,size }) => {
                    let iconName;

                    if (route.name === 'Live Tracking') {
                        if (focused) {
                            iconName=images.image.liveTrackingClick
                            color=ColorConstant.ORANGE
                        } else {
                            iconName = images.image.liveTrackingDefault
                            color=ColorConstant.GREY
                        }
                    }
                    else if (route.name === 'Users') {
                        if (focused) {
                            iconName = images.image.usersClick
                            color=ColorConstant.ORANGE
                        } else {
                            iconName = images.image.usersDefault
                            color=ColorConstant.GREY
                        }
                    }
                    else if (route.name === 'DashBoard') {
                        if (focused) {
                            iconName = images.image.dashBoardClick
                            color=ColorConstant.ORANGE
                        } else {
                            iconName = images.image.dashBoardDefault
                            color=ColorConstant.GREY
                        }
                    }
                    else if (route.name === 'Device & Asset') {
                        if (focused) {
                            iconName = images.image.deviceAssetClick
                            color=ColorConstant.ORANGE
                        } else {
                            iconName = images.image.deviceAssetDefault
                            color=ColorConstant.GREY
                        }
                    } 
                    else if (route.name === 'Settings') {
                        if (focused) {
                            iconName = images.image.settingClick
                            color=ColorConstant.ORANGE
                        } else {
                            iconName = images.image.settingDefault
                            color=ColorConstant.GREY
                        }
                    } 
                    // You can return any component that you like here!
                    return (
                        <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={iconName} resizeMode='contain' style={styles.tabIcon}/>
                            <Text style={{textAlign:'center',fontSize:FontSize.FontSize.extraSmall,fontFamily:'Nunito-Regular',color:color}}>{route.name}</Text>
                        </View>
                    )
                },
            })}
            tabBarOptions={{
                keyboardHidesTabBar: true,
                style: {  backgroundColor: ColorConstant.WHITE,},
                showLabel: false,
                
            }}
            initialRouteName='LiveTracking'
            
        >
            <Tab.Screen name="Live Tracking" component={LiveTrackingStackNavigator} />
            { !isRegular ? <Tab.Screen name="Users" component={UsersStackNavigator} /> : null }
            { !isRegular ? <Tab.Screen name="DashBoard" component={DashBoardStackNavigator} /> : null  }
            { !isRegular ? <Tab.Screen name="Device & Asset" component={DeviceAssetStackNavigator} /> : null }
            <Tab.Screen name="Settings" component={SettingsStackNavigator} />

        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabIcon: {
        height: hp(2.3),
        width: hp(2.3),
        marginBottom: hp(0.6)
    }
})