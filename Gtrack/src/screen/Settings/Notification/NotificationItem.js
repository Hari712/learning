import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, LayoutAnimation } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { ColorConstant } from '../../../constants/ColorConstants'
import { translate } from '../../../../App'
import{ FontSize }from '../../../component'
import { ToggleButtonIcon, DownArrowIcon, NextArrowIcon, ToggleButtonIconClicked } from '../../../component/SvgComponent'
import AppManager from '../../../constants/AppManager'
import { getLoginState, getSettigsNotificationListInfo } from '../../Selector'
import { useDispatch, useSelector } from 'react-redux'
import * as SettingNotificationActions from '../Settings.Action'
import SettingNotiDownArrowOrangeIcon from './../../../component/SvgComponent/SettingNotiDownArrowOrangeIcon';
import SettingNotiNextArrowIcon from './../../../component/SvgComponent/SettingNotiNextArrowIcon';


const NotificationItem = (props) => {

    const { item, isDisable, setIsDisable } = props

    const { loginData, notificationData } = useSelector(state => ({
        loginData: getLoginState(state),
        isConnected: state.network.isConnected,
        notificationData: getSettigsNotificationListInfo(state)
    }))

    const [isCollapsed, setIsCollapsed] = useState(false)
    
    const dispatch = useDispatch()

    const updateLayout = () => {
        setIsCollapsed(!isCollapsed)
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }

    function onUpdateNotification(notifItem, notificator)  {
        setIsDisable(true)
        let notiValue = notifItem.notificators ? notifItem.notificators.split(",") : []
        
        if(notiValue.includes(notificator)){
            notiValue = notiValue.filter((item)=> item != notificator)
        } 
        else {  
            notiValue.push(notificator)
        }
        
        notiValue = notiValue.join() // ['web','mail'] => join() => 'web,mail'

        dispatch(SettingNotificationActions.setLocalSettingsNotification(notifItem, notiValue))
        
    }

    const renderExpandItem = (filterKey) => {

        return (
            notificationData.map((item) => {

                const { attributes, type, notificators } = item
                const { name } = attributes

                const toggler = notificators ? notificators.includes(filterKey) : false

                return(
                    <View style={{ height: isCollapsed ? null : 0, overflow: 'hidden' }}>
                        <View style={styles.headingViewStyle}>
                            <Text style = {styles.headingTextStyle}>{type} </Text>
                                <TouchableOpacity onPress={() => onUpdateNotification(item,filterKey) } >
                                    { toggler ? <ToggleButtonIconClicked/> : <ToggleButtonIcon/> }
                                </TouchableOpacity>
                        </View>
                        <View style = {{paddingHorizontal: wp(5)}}>
                            <Text style = {styles.descriptionText}>{name}</Text>
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
            renderExpandItem('firebase')
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
                        {isCollapsed ? <SettingNotiDownArrowOrangeIcon />:<SettingNotiNextArrowIcon />}
                    </View>
                </View>
                <View style={styles.lineStyle} />
            </TouchableOpacity>

            <ExpandableReportItem />
        </View>
    )
}

const styles = StyleSheet.create({
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