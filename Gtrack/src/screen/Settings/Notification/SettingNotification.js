import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { ColorConstant } from '../../../constants/ColorConstants'
import { translate } from '../../../../App'
import{ FontSize }from '../../../component'
import { BackIcon } from '../../../component/SvgComponent'
import AppManager from '../../../constants/AppManager'
import { getLoginState, getSettigsNotificationListInfo } from '../../Selector'
import { useDispatch, useSelector } from 'react-redux'
import * as SettingNotificationActions from '../Settings.Action'
import NotificationItem from './NotificationItem';

const NOTIFICATIONS = [
    'Push Notification',
    'Email Notification',
    // 'SMS Notification'
]

const SettingNotification = ({ navigation }) => {

    const { loginData, notificationData, isConnected } = useSelector(state => ({
        loginData: getLoginState(state),
        isConnected: state.network.isConnected,
        notificationData: getSettigsNotificationListInfo(state)
    }))

    const [isDisable, setIsDisable] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {    
        AppManager.showLoader() 
        dispatch(SettingNotificationActions.requestGetSettingsNotification(loginData.id, onSuccess, onError))
        
    },[])

    function onSuccess(data) {   
        AppManager.hideLoader()
    }
    
    function onError(error) {
        AppManager.hideLoader()
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
            headerRight: () => (
                <TouchableOpacity disabled={!isDisable} style={{paddingRight:hp(2)}} onPress={() => onTapSave()}>
                    <Text style={{color: isDisable ? ColorConstant.BLACK : ColorConstant.GREY }}>Save</Text>
                </TouchableOpacity>
            ),
            headerLeft: () => (
                <TouchableOpacity style={{padding:hp(2)}} onPress={() => navigation.goBack()}>
                    <BackIcon />
                </TouchableOpacity>
            )
        });
    }, [navigation, isDisable]);

    const onTapSave = () => { 
        if(isConnected) {
            let data = notificationData.map((item)=>item.notification)
            AppManager.showLoader() 
            const requestBody = data
            dispatch(SettingNotificationActions.requestUpdateSettingsNotification(requestBody, loginData.id, onUpdateSuccess, onUpdateError))
        } else {
            AppManager.showNoInternetConnectivityError()
        }
    }

    function onUpdateSuccess(data) { 
        AppManager.showSimpleMessage('success', { message: 'Notification updated successfully', description: '', floating: true })
        AppManager.hideLoader()
    }
    
    function onUpdateError(error) {
        AppManager.showSimpleMessage('danger', { message: error, description: '', floating: true })
        AppManager.hideLoader()
    }

    function renderNotifications({item}) {
        return(
            <NotificationItem 
                item={item}
                isDisable={isDisable}
                setIsDisable={setIsDisable}
            />
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
    textViewStyle: {
        color: ColorConstant.WHITE,
        fontWeight: 'bold',
        fontSize: FontSize.FontSize.medium
    }
})

export default SettingNotification;