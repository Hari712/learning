import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, RefreshControl, TouchableOpacity, Dimensions, FlatList, TextInput, ActivityIndicator, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import images from '../../constants/images'
import { AssteItem } from '../../component'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import * as DeviceActions from '../DeviceSetup/Device.Action'
import { useDispatch, useSelector } from 'react-redux'
import * as UsersActions from './Users.Action'
import AppManager from '../../constants/AppManager';
import { getAssetListInfo, getLoginInfo, getMobileuserState } from '../Selector'
import { UserAddIcon, FilterIcon, FilterIconClicked, NoRecordFoundImage } from '../../component/SvgComponent';
import { translate } from '../../../App';
import UsersList from './UsersList';
import UsersFilterDialog from '../../component/UsersFilterDialog';
import isEmpty from 'lodash/isEmpty'
import { useIsFocused } from '@react-navigation/native';
import { uniqBy } from 'lodash';
import { getLoginState, getSubuserState } from '../Selector'

const MobileUserList = () => {

    const [isRefreshing, setIsRefreshing] = useState(false)
    const [searchKeyword, setSearchKeyword] = useState("")
    const [visible, setVisible] = useState(false)
    const [status, setStatus] = useState(-1)
    const [IsRole, setIsRole] = useState(-1)
    const [roleKeyword, setRoleKeyword] = useState(["ROLE_REGULAR", "ROLE_OWNER"])
    const [statusKey, setStatusKey] = useState(["Active", "InActive"])
    const [isLoadMoreData, setIsLoadMoreData] = useState(false)
    const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(false)
    const [pageIndex, setPageIndex] = useState(0)
    const [pageCount, setPageCount] = useState(10)
    const [totalCount, setTotalCount] = useState(0)
    const [searchData, setSearchData] = useState([])
    const [toMerge, setToMerge] = useState(false)

    const { loginData, mobileUserData, isConnected } = useSelector(state => ({
        loginData: getLoginState(state),
        mobileUserData: getMobileuserState(state),
        isConnected: state.network.isConnected,
    }))

    const user_id = loginData.id ? loginData.id : null
    const dispatch = useDispatch()

    const isFocused = useIsFocused();

    React.useEffect(() => {
        if (!isFocused) {
            resetHandle()
        }
    }, [isFocused]);

    useEffect(() => {
        if (isRefreshing == true || isLoadMoreData == true) {
            fetchUserslist()
        }
        if (searchKeyword || roleKeyword || statusKey) {
            fetchUserslist()
        }
    }, [pageIndex, isRefreshing, isLoadMoreData, searchKeyword, roleKeyword, statusKey])

    useEffect(() => {
        AppManager.showLoader()
        fetchUserslist()
    }, [])

    useEffect(() => {
        if (toMerge && pageIndex > 0) {
            setSearchData(uniqBy([...searchData, ...mobileUserData], 'id'))
        } else {
            setSearchData(mobileUserData)
        }
    }, [mobileUserData])

    const fetchUserslist = () => {
        if (isConnected) {
            const requestBody = {
                "pageNumber": pageIndex,
                "pageSize": pageCount,
                "useMaxSearchAsLimit": false,
                "searchColumnsList": [
                    {
                        "columnName": "searchParam",
                        "searchStr": searchKeyword
                    },
                    // {
                    //     "columnName": "role",
                    //     "searchStrList": roleKeyword
                    // },
                    {
                        "columnName": "isDeactivated",
                        "searchStrList": statusKey
                    },
                    {
                        "columnName": "mobileDeviceUser",
                        "searchStr": "true"
                    }
                ],
                "sortHeader": "id",
                "sortDirection": "DESC"
            }
            dispatch(UsersActions.requestMobileUserByFilter(requestBody, loginData.id, onSuccess, onError))
        } else {
            AppManager.showNoInternetConnectivityError()
        }
    }

    function onSuccess(data) {
        console.log("Success mobile user", data)
        AppManager.hideLoader()
        setIsRefreshing(false)
        const arrList = data.result.data ? data.result.data : []
        const totalCount = data.result.totalCount ? data.result.totalCount : 0
        if (isEmpty(arrList)) {
            let pagenumber = pageIndex - 1 < 0 ? 0 : pageIndex - 1
            setPageIndex(pagenumber)
        }
        setTotalCount(totalCount)
        setIsRefreshing(false)
        setIsLoadMoreData(false)
    }

    function onError(error) {
        AppManager.hideLoader()
        console.log("Error", error)
        setIsRefreshing(false)
        setVisible(false)
        setIsLoadMoreData(false)
        let pagenumber = pageIndex - 1 < 0 ? 0 : pageIndex - 1
        setPageIndex(pagenumber)
    }

    const resetHandle = () => {
        setVisible(false)
        AppManager.showLoader()
        setIsRole(-1)
        setStatus(-1)
        setPageIndex(0)
        setSearchKeyword("")
        setRoleKeyword(["ROLE_REGULAR", "ROLE_OWNER"])
        setStatusKey(["Active", "InActive"])
        setIsLoadMoreData(false)
        setOnEndReachedCalledDuringMomentum(false)
        setIsRefreshing(false)
        setToMerge(false)
    }

    const filterHandle = () => {
        AppManager.showLoader()
        setVisible(false)
        setPageIndex(0)
        setRoleKeyword(IsRole == 0 ? ["ROLE_OWNER"] : IsRole == 1 ? ["ROLE_REGULAR"] : ["ROLE_REGULAR", "ROLE_OWNER"])
        setStatusKey(status == 0 ? ["Active"] : status == 1 ? ["InActive"] : ["Active", "InActive"])
    }


    const searchHandle = (keyword) => {
        setPageIndex(0)
        setSearchKeyword(keyword)
    }

    function filterDialog() {
        return (
            <UsersFilterDialog
                visible={visible}
                setVisible={setVisible}
                status={status}
                setStatus={setStatus}
                IsRole={IsRole}
                setIsRole={setIsRole}
                resetHandle={resetHandle}
                filterHandle={filterHandle}
                userType={'mobile'}
            />
        )
    }

    const onRefresh = () => {
        setPageIndex(0)
        setIsRefreshing(true)
        dispatch(UsersActions.requestGetSubuser(loginData.id, onSuccess, onError))
    }

    const renderFooter = () => {
        //it will show indicator at the bottom of the list when data is loading otherwise it returns null
        if (!isLoadMoreData || isRefreshing) return null;
        return <View><ActivityIndicator size="large" color="#000000" /></View>;
    }

    const loadMoreUsers = () => {
        if (!onEndReachedCalledDuringMomentum && !isLoadMoreData) {
            if (searchData.length < totalCount) {
                setIsRefreshing(false)
                setIsLoadMoreData(true)
                setToMerge(true)
                setOnEndReachedCalledDuringMomentum(true)
                setPageIndex(pageIndex + 1)
            }
        }
    }

    // function renderItem({ item, index }) {
    //     return (
    //         <>
    //             <AssteItem
    //                 item={item}
    //                 index={index}
    //                 editClick={editClick}
    //                 setEditClick={setEditClick}
    //             />
    //         </>
    //     )
    // }

    const searchBar = () => {
        return (
            <View style={styles.searchSubContainer}>
                <View style={styles.search}>
                    <TextInput
                        placeholder={translate("Search_here")}
                        style={styles.searchText}
                        onChangeText={text => searchHandle(text)}
                        value={searchKeyword}
                        placeholderTextColor={ColorConstant.GREY}
                    />

                </View>
                {/* <TouchableOpacity style={styles.addButton} onPress={() => setVisible(!visible)} >
                    {visible ? <FilterIconClicked /> : <FilterIcon />}
                </TouchableOpacity> */}
                {/* <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate(SCREEN_CONSTANTS.ADD_USER)} style={styles.addButton}>
                    <UserAddIcon />
                </TouchableOpacity> */}

            </View>
        )
    }

    function renderItem({ item }) {
        return (
            <UsersList
                item={item}
                userType={'mobile'}
            />
        )
    }

    return (
        <View styles={styles.container}>

            <View style={styles.searchContainer}>
                {searchBar()}
            </View>
            {mobileUserData.length > 0 ?
                <FlatList
                    contentContainerStyle={{ paddingBottom: '25%' }}
                    data={searchData}
                    renderItem={renderItem}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={renderFooter}
                    onEndReached={() => loadMoreUsers()}
                    onEndReachedThreshold={0.1}
                    onMomentumScrollBegin={() => { setOnEndReachedCalledDuringMomentum(false) }}
                /> :
                <View style={styles.noRecords}>
                    <NoRecordFoundImage />
                    <Text style={styles.noRecordsText}>No Records Round</Text>
                </View>
            }
            {filterDialog()}
            {/* } */}
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    searchContainer: {
        width: '90%',
        // alignItems:'center',
        alignSelf: 'center'
        //marginVertical:hp(0.1)
    },
    search: {
        paddingHorizontal: hp(2),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        shadowOpacity: 0.5,
        backgroundColor: ColorConstant.WHITE
    },
    addButton: {
        //paddingHorizontal:hp(2),
        //marginHorizontal:hp(2),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '14%',
        height: hp(6),
        borderRadius: 12,
        marginTop: hp(4),
        //marginBottom:hp(2),
        elevation: 4,
        shadowColor: ColorConstant.GREY,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 3,
        shadowOpacity: 0.5,
        backgroundColor: ColorConstant.WHITE

    },
    searchText: {
        //fontSize:FontSize.FontSize.small,
        flex: 0.9,
        fontSize: 14,
        color: ColorConstant.BLACK,
        fontFamily: 'Nunito-LightItalic',
    },
    searchSubContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    noRecords: {
        height: '84%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noRecordsText: {
        fontFamily: "Nunito-Regular",
        fontSize: hp(2),
        color: ColorConstant.DARK_GREY,
        marginTop: hp(1),
    },

    refreshIndicator: { tintColor: ColorConstant.BLUE }
})

export default MobileUserList