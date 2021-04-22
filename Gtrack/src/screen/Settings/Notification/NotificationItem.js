import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, LayoutAnimation } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import images from '../../../constants/images'
import { ColorConstant } from '../../../constants/ColorConstants'
import { translate } from '../../../../App'
import{ FontSize }from '../../../component'
import { BackIcon, ToggleButtonIcon, DownArrowIcon, NextArrowIcon, ToggleButtonIconClicked } from '../../../component/SvgComponent'
import AppManager from '../../../constants/AppManager'
import { getLoginState, getSettigsNotificationListInfo } from '../../Selector'
import { useDispatch, useSelector } from 'react-redux'
import * as SettingNotificationActions from '../Settings.Action'


const NotificationItem = (props) => {

    const { item, isSaveClick, setIsSaveClick} = props

    const { loginData, notificationData } = useSelector(state => ({
        loginData: getLoginState(state),
        isConnected: state.network.isConnected,
        notificationData: getSettigsNotificationListInfo(state)
    }))

    const [isCollapsed, setIsCollapsed] = useState(false)
    const [notiValue, setNotiValue] = useState()
    
    const dispatch = useDispatch()

    useEffect(() => {    
        console.log("khushi",isSaveClick)
        // AppManager.showLoader() 
        // const requestBody = [ {
        //     "id" : notifItem.notification.id,
        //     "type" : notifItem.notification.type,
        //     "always" : notifItem.notification.always,
        //     "notificators" : notiValue,
        //     "attributes" : {
        //     "fence" : 1
        //     },
        //     "calendarId" : 0
        // } ]
        // dispatch(SettingNotificationActions.requestUpdateSettingsNotification(requestBody, loginData.id, onSuccess, onError))
    },[isSaveClick, notiValue])


    const updateLayout = () => {
        setIsCollapsed(!isCollapsed)
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }

    function onUpadateNotification(notifItem, notificator,toggle)  {

        //let notiValue = notifItem.notification.notificators ? notifItem.notification.notificators.split(",") :[];
        setNotiValue(notifItem.notification.notificators ? notifItem.notification.notificators.split(",") :[])
    
        if(notiValue.includes(notificator)){
            //notiValue = notiValue.filter((item)=> item != notificator)
            setNotiValue(notiValue.filter((item)=> item != notificator))
        } else{
            notiValue.push(notificator)

        }
        notiValue = notiValue.join();

        // console.log("khushi",notificator,notifItem,toggle, notiValue)
        // AppManager.showLoader() 
        // const requestBody = [ {
        //     "id" : notifItem.notification.id,
        //     "type" : notifItem.notification.type,
        //     "always" : notifItem.notification.always,
        //     "notificators" : notiValue,
        //     "attributes" : {
        //     "fence" : 1
        //     },
        //     "calendarId" : 0
        // } ]
        dispatch(SettingNotificationActions.setLocalSettingsNotification(notifItem, notiValue))
        // dispatch(SettingNotificationActions.requestUpdateSettingsNotification(requestBody, loginData.id, onSuccess, onError))
    }

    // function onTapSave() {
    //     console.log("khushi")
    //     AppManager.showLoader() 
    //     const requestBody = [ {
    //         "id" : notifItem.notification.id,
    //         "type" : notifItem.notification.type,
    //         "always" : notifItem.notification.always,
    //         "notificators" : notiValue,
    //         "attributes" : {
    //         "fence" : 1
    //         },
    //         "calendarId" : 0
    //     } ]
    //     dispatch(SettingNotificationActions.requestUpdateSettingsNotification(requestBody, loginData.id, onSuccess, onError))
    // }

    const renderExpandItem = (filterKey) => {

        return (
            notificationData.map((item) => {

                const { notification } = item
                const { attributes } = notification

                const toggler = item.notification.notificators ? item.notification.notificators.includes(filterKey) : false

                return(
                    <View style={{ height: isCollapsed ? null : 0, overflow: 'hidden' }}>
                        <View style={styles.headingViewStyle}>
                            <Text style = {styles.headingTextStyle}>{notification.type}</Text>
                                <TouchableOpacity onPress={() => onUpadateNotification(item,filterKey,!toggler) } >
                                    { toggler ? <ToggleButtonIconClicked/> : <ToggleButtonIcon/> }
                                </TouchableOpacity>
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

export default NotificationItem