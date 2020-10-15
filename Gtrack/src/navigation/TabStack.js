import * as React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LiveTracking, Users, DashBoard,DeviceAsset,EditDeviceAsset,CreateDeviceAsset,Details,Settings,Profile,Subscription,PaymentSettings,Permission,About,RateUs,Feedback,Manage,AddUser,EditProfile,Notification, SensorInfo, DeviceInfo, GeoFence, GeoFenceCreateNew, GeoFenceType } from '../screen';
import { ColorConstant } from '../constants/ColorConstants';
import FontSize from '../component/FontSize';
import images from '../constants/images';

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
    <LiveTrackingStack.Navigator initialRouteName="LiveTracking" headerMode='screen'  screenOptions={ScreenOptions} >
        <LiveTrackingStack.Screen name='LiveTracking' component={LiveTracking} />
        <LiveTrackingStack.Screen name='Notification' component={Notification} />
        <LiveTrackingStack.Screen name='SensorInfo' component={SensorInfo} />
        <LiveTrackingStack.Screen name='DeviceInfo' component={DeviceInfo} />
        <LiveTrackingStack.Screen name='GeoFence' component={GeoFence} />
        <LiveTrackingStack.Screen name='GeoFenceCreateNew' component={GeoFenceCreateNew} />
        <LiveTrackingStack.Screen name='GeoFenceType' component={GeoFenceType} />
    </LiveTrackingStack.Navigator>
    )
}

const UsersStackNavigator = () => {
    return(
        <UsersStack.Navigator initialRouteName="Users" headerMode="screen" screenOptions={ScreenOptions} >
            <UsersStack.Screen name="Users" component={Users} />
            <UsersStack.Screen name="AddUser" component={AddUser} />
        </UsersStack.Navigator>
    )
}

const DashBoardStackNavigator = () => {
    return(
        <DashBoardStack.Navigator initialRouteName="DashBoard" headerMode="none" headerMode="screen" screenOptions={ScreenOptions}>
            <DashBoardStack.Screen name="DashBoard" component={DashBoard} />
        </DashBoardStack.Navigator>
    )
}

const DeviceAssetStackNavigator = () => {
    return(
        <DeviceAssetStack.Navigator initialRouteName="DeviceAsset" headerMode="screen" screenOptions={ScreenOptions} >
            <DeviceAssetStack.Screen name="Device & Asset" component={DeviceAsset} />
            <DeviceAssetStack.Screen name="Details" component={Details}/>
            <DeviceAssetStack.Screen name="EditDeviceAsset" component={EditDeviceAsset}/>
            <DeviceAssetStack.Screen name="CreateDeviceAsset" component={CreateDeviceAsset}/>
            <DeviceAssetStack.Screen name="Manage" component={Manage} />
        </DeviceAssetStack.Navigator>
    )
}

const SettingsStackNavigator = () => {
    return(
        <SettingsStack.Navigator initialRouteName="Settings" headerMode="screen" screenOptions={ScreenOptions} >
            <SettingsStack.Screen name="Settings" component={Settings} />
            <SettingsStack.Screen name="Profile" component={Profile} />
            <SettingsStack.Screen name="EditProfile" component={EditProfile} />
            <SettingsStack.Screen name="Subscription" component={Subscription} />
            <SettingsStack.Screen name="PaymentSettings" component={PaymentSettings} />
            <SettingsStack.Screen name="Permission" component={Permission} />
            <SettingsStack.Screen name="About" component={About} />
            <SettingsStack.Screen name="RateUs" component={RateUs} />
            <SettingsStack.Screen name="Feedback" component={Feedback} />
        </SettingsStack.Navigator>
    )
}

export const TabStackNavigator = ({ }) => {
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
            <Tab.Screen name="Users" component={UsersStackNavigator} />
            <Tab.Screen name="DashBoard" component={DashBoardStackNavigator} />
            <Tab.Screen name="Device & Asset" component={DeviceAssetStackNavigator} />
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