import * as React from 'react';
import { Image, View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LiveTracking } from '../screen';
import { ColorConstant } from '../constants/ColorConstants';
import Users from '../screen/Users/Users';
import DashBoard from '../screen/Dashboard/Dashboard';
import DeviceAsset from '../screen/Device&Asset/DeviceAsset';
import Settings from '../screen/Settings/Settings';
import FontSize from '../component/FontSize';
import images from '../constants/images';
import Details from '../screen/Device&Asset/Details'
import EditDeviceAsset from '../screen/Device&Asset/EditDeviceAsset'
import CreateDeviceAsset from '../screen/Device&Asset/CreateDeviceAsset';


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
        borderBottomWidth: 0,
        height: hp(8),
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
    <LiveTrackingStack.Navigator initialRouteName="LiveTracking" headerMode='none' >
        <LiveTrackingStack.Screen name='LiveTracking' component={LiveTracking} />
    </LiveTrackingStack.Navigator>
    )
}

const UsersStackNavigator = () => {
    return(
        <UsersStack.Navigator initialRouteName="Users" headerMode="none" >
            <UsersStack.Screen name="Users" component={Users} />
        </UsersStack.Navigator>
    )
}

const DashBoardStackNavigator = () => {
    return(
        <DashBoardStack.Navigator initialRouteName="DashBoard" headerMode="none">
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
        </DeviceAssetStack.Navigator>
    )
}

const SettingsStackNavigator = () => {
    return(
        <SettingsStack.Navigator initialRouteName="Settings" headerMode="none">
            <SettingsStack.Screen name="Settings" component={Settings} />
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
                        <View style={{ justifyContent: 'center', alignItems: 'center',bottom:6}}>
                            <Image source={iconName} resizeMode='contain' />
                            <Text style={{textAlign:'center',fontSize:FontSize.FontSize.extraSmall,color:color}}>{route.name}</Text>
                        </View>
                    )
                },
            })}
            tabBarOptions={{
                keyboardHidesTabBar: true,
                style: { paddingVertical:hp(2), height:hp(8), backgroundColor: ColorConstant.WHITE,},
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
