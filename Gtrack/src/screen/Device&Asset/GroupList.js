import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions, ScrollView, TextInput, FlatList, RefreshControl } from 'react-native';
import images from '../../constants/images';
import { GroupItem } from '../../component'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import * as DeviceActions from '../DeviceSetup/Device.Action'
import { useDispatch, useSelector } from 'react-redux'
import AppManager from '../../constants/AppManager'
import { getLoginInfo, getGroupListInfo } from '../Selector'

const GroupList = () => {

    const dispatch = useDispatch()

    const [isRefreshing, setIsRefreshing] = useState(false)

    const { isConnected, loginInfo, groupList } = useSelector(state => ({
        isConnected: state.network.isConnected,
        loginInfo: getLoginInfo(state),
        groupList: getGroupListInfo(state),
    }))

    const user_id = loginInfo.id ? loginInfo.id : null

    useEffect(() => {
        loadGroupList()
    }, [])

    useEffect(() => {
        if (isRefreshing == true) {
            fetchGroupList()
        }
    },[isRefreshing])

    function loadGroupList() {
        AppManager.showLoader()
        dispatch(DeviceActions.requestGetAllUserGroups(user_id, onGroupListLoadedSuccess, onGroupListLoadedError))
    }

    function fetchGroupList() {
        dispatch(DeviceActions.requestGetAllUserGroups(user_id, onGroupListLoadedSuccess, onGroupListLoadedError))
    }
    

    function onGroupListLoadedSuccess(data) {
        AppManager.hideLoader()
        setIsRefreshing(false)
    }

    function onGroupListLoadedError(error) {
        AppManager.hideLoader()
        setIsRefreshing(false)
    }

    function renderItem({ item, index }) {
        return (
            <>
                <GroupItem 
                    item={item}
                    index={index}
                />
            </>
        )
    }

    const onRefresh = () => {
        setIsRefreshing(true)
    }

    return (
        <View styles={styles.container}>
            <FlatList
                refreshControl={
                    <RefreshControl
                      style={styles.refreshIndicator}
                      refreshing={isRefreshing}
                      onRefresh={onRefresh}
                    />
                }
                data={groupList}
                renderItem={(data) => renderItem(data)}
                keyExtractor={(index) => index.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    refreshIndicator: { tintColor: 'white' }
})

export default GroupList