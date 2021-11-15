import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions, ScrollView, FlatList, ActivityIndicator, RefreshControl, TouchableWithoutFeedback, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import {  getLoginInfo, getGroupDevicesListInfo } from '../Selector'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import AppManager from '../../constants/AppManager'
import { FontSize } from '../../component';
import NavigationService from '../../navigation/NavigationService';
import { translate } from '../../../App';
import { SCREEN_CONSTANTS } from '../../constants/AppConstants';
import * as LivetrackingActions from '../LiveTracking/Livetracking.Action'

const DeviceView = ({ navigation }) => {

    const dispatch = useDispatch()

    const [menuClick, setMenuClick] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [isLoadMoreData, setIsLoadMoreData] = useState(false)
    const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(false)
    const [pageIndex, setPageIndex] = useState(0)
    const [pageCount, setPageCount] = useState(10)
    const [totalCount, setTotalCount] = useState(0)

    const {  isConnected, loginInfo, groupDevices } = useSelector(state => ({
        isConnected: state.network.isConnected,
        loginInfo: getLoginInfo(state),
        groupDevices: getGroupDevicesListInfo(state),
    }))

    const user_id = loginInfo.id ? loginInfo.id : null

    useEffect(()=>{
        fetchGroupDevices()
    },[])
    
    function fetchGroupDevices() {
        AppManager.showLoader() 
        dispatch(LivetrackingActions.requestGetGroupDevices(user_id, onSuccess, onError))
    }

    function onSuccess(data) {    
        console.log("Success",data) 
        AppManager.hideLoader()
    }
    
    function onError(error) {
        AppManager.hideLoader()
        console.log("Error",error)  
    }

const onRefresh = () => {
    setIsRefreshing(true)
    setPageIndex(0)
}

const renderFooter = () => {
//it will show indicator at the bottom of the list when data is loading otherwise it returns null
if (!isLoadMoreData || isRefreshing) return null;
return <ActivityIndicator style={styles.activityIndicator} />;
}

const loadMoreDevices = () => {
    if (!onEndReachedCalledDuringMomentum && !isLoadMoreData) {
        if (deviceList.length < totalCount) {
        setIsRefreshing(false)
        setIsLoadMoreData(true)
        setOnEndReachedCalledDuringMomentum(true)
        setPageIndex(pageIndex + 1)
        }
    }
}

function renderDeviceCell({ item, index }) {
    const grpName = item.groupName
    console.log('groupDevices', item)
    return (
        <>
            { item.devices.map((dvItem)=>{
                return (
                    <TouchableOpacity 
                        onPress={() => { NavigationService.push(SCREEN_CONSTANTS.TRACKING_DETAILS, {selectedDevice:dvItem}) }} 
                        style={styles.cardContainer}>

                        {/* Blue top head */}
                        <View style={styles.blueConatiner}>
                            <View style={styles.blueTopHead}>
                                <Text style={styles.headerTitle}>{dvItem.name}</Text>
                            </View>
                            {/* <View style={styles.toolTip}>
                                    <IconConstantDeviceCell />
                                </Tooltip>
                            </View> */}
                        </View>

                        {/* White Body container */}
                        <View style={styles.whiteBodyContainer}>
                            
                            <View style={styles.column} >
                                <Text style={styles.whiteBodyText}>Device Id</Text>
                                <Text style={[styles.whiteBodyText, { color: ColorConstant.BLACK }]}>{dvItem.uniqueId}</Text>
                            </View>
                            <View style={styles.column} >
                                <Text style={styles.whiteBodyText}>{translate("Group")}</Text>
                                <Text style={[styles.whiteBodyText, { color: ColorConstant.BLACK }]}>{grpName}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
            
            )
            })

            }
        </>
    )
}


return (
<>
    
    <View style={{ flex: 1 }}>
    {groupDevices.length > 0 ? 
        <FlatList
        refreshControl={
            <RefreshControl
            style={styles.refreshIndicator}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            />
        }    
        // showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        // ListFooterComponent={renderFooter}
        // onEndReached={() => loadMoreDevices()}
        // onEndReachedThreshold={0.1}
        // onMomentumScrollBegin={() => { setOnEndReachedCalledDuringMomentum(false) }}
        data={groupDevices}
        renderItem={(data) => renderDeviceCell(data)}
        />
        : 
        
        <View style={styles.noRecords}>
        <Text style={styles.noRecordsText}>No devices found</Text>
        </View> }

    </View>

</>

)
}

const styles = StyleSheet.create({

headerRight: {
    marginRight: wp(5),
    height: hp(2.2),
    width: wp(3),
    resizeMode: 'contain'
},
menuPopup: {
    backgroundColor: 'white',
    padding: 5,
    paddingVertical: hp(1.5),
    right: wp(3),
    borderRadius: 16,
    width: hp(15),
    top: hp(0.5),
    justifyContent: 'space-between',
    position: 'absolute',
    shadowColor: ColorConstant.GREY,
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 1,
    elevation: 10,
    shadowRadius: 3,
    zIndex: 20
},
textStyle: {
    marginVertical: hp(0.5),
    color: ColorConstant.BLUE,
    textAlignVertical: 'center',
    paddingLeft: hp(0.5)
},
activityIndicator: {
    color: "#000",
    marginTop: '2%'
},
noRecords: {
    marginVertical:hp(38),
    alignItems:'center'
},
noRecordsText: {
    fontFamily:"Nunito-Regular",
    fontSize:hp(2)
},
refreshIndicator: { tintColor: 'black' },
cardContainer: {
    //width:'100%',
    width: Dimensions.get('screen').width - 30,
    marginVertical: hp(1.5),
    // height:hp(18),
    alignSelf: 'center',
    backgroundColor: ColorConstant.WHITE,
    borderRadius: 15,
    elevation: 3,
    borderWidth: 0.3,
    borderColor: ColorConstant.GREY,
    shadowColor: ColorConstant.GREY,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
},
blueConatiner: {
    backgroundColor: ColorConstant.BLUE,
    flexDirection: 'row',
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: hp(3)
},
activeInactiveText: {
    flexDirection: 'row',
    width: "100%",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent:'center'
   // paddingHorizontal: hp(3)
},
blueTopHead: {
    alignContent: 'space-between',
    marginVertical: hp(0.5)
},
editButton: {
    flexDirection: 'row',
    zIndex: 10,
    padding: hp(1.5),
    marginLeft: 'auto'
},
headerTitle: {
    color: ColorConstant.WHITE,
    fontSize: FontSize.FontSize.small
},
toolTipText: {
    alignSelf: 'center',
    fontSize: FontSize.FontSize.medium,
},
pointerStyle: {
    elevation: 0.1,
    top: 3,
    borderBottomWidth: 12,
},
toolTipContainer: {
    borderColor: ColorConstant.ORANGE,
    borderWidth: 1,
    borderRadius: 6
},
image: {
    height: hp(1.5),
    resizeMode: 'contain'
},
id: {
    color: ColorConstant.ORANGE,
    fontSize: FontSize.FontSize.extraSmall
},
headerRight: {
    marginRight: wp(5),
    height: hp(2.2),
    width: wp(3),
    resizeMode: 'contain'
},
toolTip: {
    marginTop: hp(1),
    left: 10,
    zIndex:10
},
textStyle: {
    margin: hp(0.5),
    color: ColorConstant.BLUE,
    textAlignVertical: 'center',
    paddingLeft: hp(0.5)
},
whiteBodyContainer: {
    flexDirection: 'row',
    marginTop: hp(1.5),
    paddingHorizontal: hp(2.5),
    paddingBottom: hp(1.5)
},
whiteBodyText: {
    color: ColorConstant.GREY,
    fontSize: FontSize.FontSize.small
},
column: {
    flexDirection: 'column', width: '50%'
}
})


export default DeviceView