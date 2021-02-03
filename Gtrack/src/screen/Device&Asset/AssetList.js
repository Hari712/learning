import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, RefreshControl, TouchableOpacity, Dimensions, FlatList, TextInput } from 'react-native';
import images from '../../constants/images'
import { AssteItem } from '../../component'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import * as DeviceActions from '../DeviceSetup/Device.Action'
import { useDispatch, useSelector } from 'react-redux'
import AppManager from '../../constants/AppManager'
import { getAssetListInfo, getLoginInfo } from '../Selector'

const AssetList = () => {

    const dispatch = useDispatch()

    const [isRefreshing, setIsRefreshing] = useState(false)
    const [editClick, setEditClick] = useState(-1)

    const { assetList, isConnected, loginInfo } = useSelector(state => ({
        assetList: getAssetListInfo(state),
        isConnected: state.network.isConnected,
        loginInfo: getLoginInfo(state)
    }))

    const user_id = loginInfo.id ? loginInfo.id : null

    const [search, setSearch] = useState('')

    useEffect(() => {
        loadAssetList()
    }, [])

    useEffect(() => {
        if (isRefreshing) {
            fetchAssetList()
        }
    },[isRefreshing])

    function loadAssetList() {
        AppManager.showLoader()
        fetchAssetList()
    }

    function fetchAssetList() {
        dispatch(DeviceActions.requestGetAllUserAssets(user_id, onAssetListLoadedSuccess, onAssetListLoadedError))
    }

    function onAssetListLoadedSuccess(data) {
        AppManager.hideLoader()
        setIsRefreshing(false)
    }

    function onAssetListLoadedError(error) {
        AppManager.hideLoader()
        setIsRefreshing(false)
    }

    const renderSearchBar = () => {

        const searchFilter = (text) => {
            assetData = asset.filter(item=> item.toLowerCase().includes(text.toLowerCase())) 
            setSearch(text)
        }

        return (
            <View style={{ paddingHorizontal: hp(3) }}>
                <View style={styles.search}>
                    <TextInput
                        placeholder='Search Here'
                        onChangeText={text => searchFilter(text) }                    
                        value={search}
                    />
                </View>
            </View>
        )
    }

    function renderItem({ item, index }) {
        return (
            <>
                <AssteItem
                    item={item}
                    index={index}
                    editClick={editClick}
                    setEditClick={setEditClick}
                />
            </>
        )
    }

    const onRefresh = () => {
        setIsRefreshing(true)
    }

    return (
        <View styles={styles.container}>
            {renderSearchBar()}
            {/* <View style={{flex:1}}> */}
            {assetList.length > 0 ?
            <FlatList
                style={{ height:'85%' }}
                nestedScrollEnabled={true}
                refreshControl={
                    <RefreshControl
                        style={styles.refreshIndicator}
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                    />
                }
                data={assetList}
                renderItem={(data) => renderItem(data)}
                keyExtractor={(item, index) => index.toString()}
            /> :
            <View style={styles.noRecords}>
                <Text style={styles.noRecordsText}>No records found</Text>
            </View> }
            {/* </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    noRecords: {
        marginVertical:hp(32),
        alignItems:'center'
    },
    noRecordsText: {
    fontFamily:"Nunito-Regular",
    fontSize:hp(2)
    },
    search: {
        paddingHorizontal: hp(2),
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: hp(6),
        borderRadius: 12,
        marginTop: hp(4),
        marginBottom: hp(2),
        elevation: 4,
        shadowColor: ColorConstant.GREY,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 3,
        shadowOpacity: 1,
        backgroundColor: ColorConstant.WHITE
    },
    refreshIndicator: { tintColor: ColorConstant.BLUE }
})

export default AssetList