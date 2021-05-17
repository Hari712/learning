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
import isEmpty from 'lodash/isEmpty'

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

    const [arrDeviceList, setDeviceList] = useState([])
    const [arrDeviceNames, setDeviceNames] = useState([])

    useEffect(() => {
        loadNonGroupedDevice()
    }, [])

    function loadNonGroupedDevice() {
        console.log("devices Called")
        let requestBody = {
            nonGrouped: true,
            nonLinked: false
        }
        dispatch(DeviceActions.requestGetAllNonGroupedDevice(loginInfo.id, requestBody, onNonGroupedDeviceLoadedSuccess, onNonGroupedDeviceLoadedError))
    }


    function onNonGroupedDeviceLoadedSuccess(data) {
        let arr = isEmpty(data) ? [] : data
        setDeviceList(arr)
        let arrDeviceNames = arr.map((item) => item.deviceName)
        setDeviceNames(arrDeviceNames)
    }

    console.log("data",arrDeviceList,arrDeviceNames)

    function onNonGroupedDeviceLoadedError(error) {
        console.log(error)
    }
    const [addClick, setAddClick] = useState(-1);

    function renderItem({ item, index }) {
        return (
            <>
                <GroupItem 
                    item={item}
                    index={index}
                    arrDeviceNames={arrDeviceNames}
                    arrDeviceList={arrDeviceList}
                    addClick={addClick}
                    setAddClick={setAddClick}
                    loadNonGroupedDevice={loadNonGroupedDevice}
                    fetchGroupList={fetchGroupList}
                />
            </>
        )
    }

    const onRefresh = () => {
        setIsRefreshing(true)
    }

    return (
        <View styles={styles.container}>
            {groupList.length > 0 ?
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
                keyExtractor={(item, index) => index.toString()}
            /> :
            <View style={styles.noRecords}>
                <Text style={styles.noRecordsText}>No records found</Text>
            </View> }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    noRecords: {
        marginVertical:hp(38),
        alignItems:'center'
    },
    noRecordsText: {
    fontFamily:"Nunito-Regular",
    fontSize:hp(2)
    },
    refreshIndicator: { tintColor: 'white' }
})

export default GroupList