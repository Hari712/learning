import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, LayoutAnimation } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import images from '../../../constants/images'
import { ColorConstant } from '../../../constants/ColorConstants'
import { translate } from '../../../../App'
import{ FontSize }from '../../../component'
import { BackIcon, ToggleButtonIcon } from '../../../component/SvgComponent'
import AppManager from '../../../constants/AppManager'
import { getLoginState, getSettigsNotificationListInfo } from '../../Selector'
import { useDispatch, useSelector } from 'react-redux'
import * as SettingNotificationActions from '../Settings.Action'
import DownArrowIcon from './../../../component/SvgComponent/DownArrowIcon';
import NextArrowIcon from './../../../component/SvgComponent/NextArrowIcon';
import ToggleButtonIconClicked from './../../../component/SvgComponent/ToggleButtonIconClicked';

const NOTIFICATIONS = ['Push Notification','Email Notification','SMS Notification']

const PUSHNOTIFICATION = [
    {
        heading: 'Ignition On',
        description: 'Setting_Notification_string10',
        onOffIcon: images.image.settings.onIcon 
    }, 
    {
        heading: 'Ignition Off',
        description: 'Setting_Notification_string11',
        onOffIcon: images.image.settings.IconOff
    },
    {
        heading: 'Overspeed',
        description: 'Setting_Notification_string12',
        onOffIcon: images.image.settings.onIcon
    },
    {
        heading: 'Underspeed',
        description: 'Setting_Notification_string13',
        onOffIcon: images.image.settings.IconOff
    },
    {
        heading: 'Movement',
        description: 'Setting_Notification_string14',
        onOffIcon: images.image.settings.onIcon
    },
    {
        heading: 'Stationary',
        description: 'Setting_Notification_string15',
        onOffIcon: images.image.settings.IconOff
    },
    {
        heading: 'Engine Idle',
        description: 'Setting_Notification_string16',
        onOffIcon: images.image.settings.onIcon
    },
    {
        heading: 'Battery Level',
        description: 'Setting_Notification_string17',
        onOffIcon: images.image.settings.IconOff
    },
    {
        heading: 'Fuel Level',
        description: 'Setting_Notification_string18',
        onOffIcon: images.image.settings.IconOff
    },
    {
        heading: 'Panic',
        description: 'Setting_Notification_string19',
        onOffIcon: images.image.settings.onIcon
    },
    {
        heading: 'Geofence',
        description: 'Setting_Notification_string20',
        onOffIcon: images.image.settings.IconOff
    }
]

const PHONENOTIFICATION = [
    {
        heading: 'Ignition On',
        description: 'Setting_Notification_string10',
        onOffIcon: images.image.settings.onIcon 
    }, 
    {
        heading: 'Ignition Off',
        description: 'Setting_Notification_string11',
        onOffIcon: images.image.settings.IconOff
    }
]


const SettingNotification = ({ navigation }) => {

    const { loginData, notificationData } = useSelector(state => ({
        loginData: getLoginState(state),
        isConnected: state.network.isConnected,
        notificationData: getSettigsNotificationListInfo(state)
    }))

    const [webData, setWebData] = useState()
    const [mailData, setMailData] = useState()
    const [smsData, setSmsData] = useState()

    const dispatch = useDispatch()

    useEffect(() => {  
        // let temp = notificationData.map((item)=> item.notification)
        // let notificatorsType = temp.map((item) => item.notificators) 
        // notificatorsType == "mail" ? setMailData(temp) : 
        // notificatorsType == "web" ? setWebData(temp) : 
        // setMailData(temp)
        // setWebData(temp)
        // if(notificationData){
        //     let temp = notificationData.filter((item)=>item)
        //     let remaining = notificationData.filter((item)=> item.notification.notificators ? !item.notification.notificators.includes("mail").includes("web"): null)
        //     let mail = notificationData.filter((item)=> item.notification.notificators ? item.notification.notificators.includes("mail"): null)
        //     let web = notificationData.filter((item)=> item.notification.notificators ? item.notification.notificators.includes("web"): null)
        //     console.log("note",temp,mail,web,remaining)
        // }
    },[notificationData])

    useEffect(() => {    
        AppManager.showLoader() 
        dispatch(SettingNotificationActions.requestGetSettingsNotification(loginData.id, onSuccess, onError))
        
    },[])

    function onSuccess(data) {    
        console.log("Success user",data) 
        AppManager.hideLoader()

    }
    
    function onError(error) {
        AppManager.hideLoader()
        console.log("Error",error)  
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={{
                    color: ColorConstant.GREY,
                    fontSize: FontSize.FontSize.medium,
                    fontWeight: '500',
                    textAlign: 'center'
                }}>
                    {translate("Settings")}
                </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity style={{padding:hp(2)}} onPress={() => navigation.goBack()}>
                    <BackIcon />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    function renderNotifications({item}) {
        return(
            <NotificationsItem item={item}/>
        )
    }

    const NotificationsItem = ({ item }) => {

        const [isCollapsed, setIsCollapsed] = useState(false)

        const updateLayout = () => {
            setIsCollapsed(!isCollapsed)
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        }

        const renderExpandItem = (filterKey) => {
            console.log("data",notificationData)
            return (
                notificationData.map((item) => {

                    const {notification} = item
                    const {attributes} = notification

                    const toggler = item.notification.notificators ? item.notification.notificators.includes(filterKey) : false
                    console.log("toggler",attributes)
                    return(
                        <View style={{ height: isCollapsed ? null : 0, overflow: 'hidden' }}>
                            <View style={styles.headingViewStyle}>
                                <Text style = {styles.headingTextStyle}>{notification.type}</Text>
                                { toggler ? <ToggleButtonIconClicked/> : <ToggleButtonIcon/>}
                            </View>
                            <View style = {{paddingHorizontal: wp(5)}}>
                                <Text style = {styles.descriptionText}>{attributes.name && attributes.name}</Text>
                            </View>
                        </View>
                    )
                })
            )
        }


        const ExpandableReportItem = () => {
            return (
                item =='Email Notification' ?
                renderExpandItem('mail')
            :
                item =='Push Notification' ?
                renderExpandItem('web')
            :
                renderExpandItem('sms')
            )
        }

        return (
            
            <View>
                <TouchableOpacity style={styles.bodySubContainer} onPress={updateLayout} activeOpacity={0.8}>
                    <View style={styles.mainViewStyle}>
                        <Text style={[styles.titleTextStyle, {color: isCollapsed ? ColorConstant.ORANGE : ColorConstant.BLUE } ]}>
                            {translate(item)}</Text>
                        <View style={{marginTop: hp(0.5)}}>
                            {isCollapsed ? <DownArrowIcon color={ColorConstant.ORANGE}/>:<NextArrowIcon/>}
                        </View>
                    </View>
                    <View style={styles.lineStyle} />
                </TouchableOpacity>

                <ExpandableReportItem />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.mainView}>
                <Text style={styles.textViewStyle}>{translate("Notifications")}</Text>
            </View>

            <FlatList
                style={{}}
                contentContainerStyle={{}}
                data={NOTIFICATIONS}
                renderItem={renderNotifications}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorConstant.WHITE,
    },
    mainView: {
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: ColorConstant.ORANGE,
        height: hp(5)
    },
    bodySubContainer: {
        flexDirection: 'column',
        justifyContent: "space-between",
    },
    mainViewStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(5)
    },
    headingViewStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: hp(1),
        paddingHorizontal: wp(5)
    },
    titleIconStyle: {
        height: hp(2),
        width: hp(2),
    },
    textViewStyle: {
        color: ColorConstant.WHITE,
        fontWeight: 'bold',
        fontSize: FontSize.FontSize.medium
    },
    titleTextStyle: {
        fontSize: FontSize.FontSize.medium,
    },
    headingTextStyle: {
        fontSize: FontSize.FontSize.small,
        color: ColorConstant.BLACK
    },
    descriptionText: {
        fontSize: hp(1.4),
        fontStyle: 'italic',
        color: ColorConstant.GREY
    },
    lineStyle: {
        borderBottomColor: '#e3e3e3',
        borderBottomWidth: 1
    },

})

export default SettingNotification;