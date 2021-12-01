
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, FlatList, RefreshControl, TextInput, Image } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ColorConstant } from '../../../constants/ColorConstants';
import { FontSize } from '../../../component';
import { translate } from '../../../../App';
import images from '../../../constants/images'
import { useDispatch, useSelector } from 'react-redux';
import { getGeofenceListInfo, getLoginState, isRoleRegular } from '../../Selector';
import { SCREEN_CONSTANTS } from '../../../constants/AppConstants';
import * as LivetrackingActions from '../Livetracking.Action'
import { BackIcon, NextIcon } from '../../../component/SvgComponent';
import AppManager from '../../../constants/AppManager';
import GeofenceList from './GeofenceList';
import GeofenceEditDialog from '../../../component/GeofenceEditDialog';
import GeofenceDeleteDialog from '../../../component/GeofenceDeleteDialog';
import { isEmpty } from 'lodash';
import { useIsFocused } from '@react-navigation/native';

const GeoFence = ({ navigation }) => {
    
    const [dialogVisible, setDialogVisible] = useState(false)
    const [deleteDialogBox, setDeleteDialogBox] = useState(false)
    const [activeGeofence, setActiveGeofence] = useState()
    const [geofenceId, setGeofenceId] = useState()
    const [geofenceName, setGeofenceName] = useState("")
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [selectedDevice, setSelectedDevice] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("")
    const [isTypeClick, setIsTypeClick] = useState(false)
    const [dropDownPos, setDropDownPos] = useState();
    const [isMenuClick, setIsMenuClick] = useState(0)
    const [selectedType, setSelectedType] = useState('')
    const [geofenceListData, setGeofenceData] = useState([])
    const isFocused = useIsFocused();
    const dispatch = useDispatch()

    const { loginData, geofenceList, isRegular } = useSelector(state => ({
        loginData: getLoginState(state),
        geofenceList: getGeofenceListInfo(state),
        isRegular: isRoleRegular(state)
    }))
  

    React.useEffect(() => {
      if(isFocused){
        loadGeofenceSearchList('')
      }
    },[isFocused]);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={styles.headerTitle}>
                    {translate("Geo Fence")}
                </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity style={{padding:hp(2)}} onPress={() => navigation.goBack()}>
                    <BackIcon />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    useEffect(() => {
        if(!isEmpty(geofenceList)) {
            const filteredList = geofenceList.filter(i => {
                const included = i.userDTOS.filter(user => user.id === loginData.id)
                if(!isEmpty(included)) {
                    return i;
                }
             })
             setGeofenceData(filteredList)
            console.log('geofenceList', geofenceList, filteredList, loginData.id)
        }
    }, [geofenceList])
    // useEffect(() => {  
    //     loadGeofenceList()
    // }, [])

    useEffect(() => {  
        loadGeofenceSearchList(selectedType)
    }, [selectedType])

    function loadGeofenceSearchList(searchInput){
        AppManager.showLoader() 
        dispatch(LivetrackingActions.requestSearchGeofence(loginData.id, searchInput, onSuccess, onError))
    }

    // function loadGeofenceList() {
    //     AppManager.showLoader()  
    //     dispatch(LivetrackingActions.requestGetGeofence(loginData.id, onSuccess, onError))
    // }

    function onSuccess(data) { 
        console.log("geofence",data)   
        setIsRefreshing(false) 
        setIsTypeClick(false)
        AppManager.hideLoader()
    }
    
    function onError(error) {
        AppManager.hideLoader()
        setIsRefreshing(false) 
    }

    function ondeleteGeofence() {
        setDeleteDialogBox(false)   
        AppManager.showLoader()  
        dispatch(LivetrackingActions.requestDeleteGeofence(loginData.id, geofenceId, onGeofenceDeleteSuccess, onGeofenceDeleteError))
    }

    function onGeofenceDeleteSuccess(data) { 
        AppManager.showSimpleMessage('success', { message: "Geofence deleted successfully", description: '', floating: true })
        dispatch(LivetrackingActions.requestGetGeofence(loginData.id, onSuccess, onError))
        AppManager.hideLoader()
    }
    
    function onGeofenceDeleteError(error) {
        AppManager.hideLoader()
        console.log("Error",error)  
    }

    function GeoFenceInfoItem({ item }) {
        return(
            <GeofenceList  
                item={item}
                setActiveGeofence={setActiveGeofence}
                setSelectedDevice={setSelectedDevice}
                setDialogVisible={setDialogVisible}
                dialogVisible={dialogVisible}
                setGeofenceId={setGeofenceId}
                setGeofenceName={setGeofenceName}
                setDeleteDialogBox={setDeleteDialogBox}
                deleteDialogBox={deleteDialogBox}
            />
        )
    }

    function renderViewDialog() {
        return(
            <GeofenceEditDialog 
                dialogVisible={dialogVisible}
                setDialogVisible={setDialogVisible}
                selectedDevice={selectedDevice}
                activeGeofence={activeGeofence}
            />
        )
    }

    function renderDeleteDialog() {
        return(
            <GeofenceDeleteDialog 
                deleteDialogBox={deleteDialogBox}
                geofenceName={geofenceName}
                setDeleteDialogBox={setDeleteDialogBox}
                ondeleteGeofence={ondeleteGeofence}
            />
        )
    }

    const onRefresh = () => {
        setIsRefreshing(true)
        loadGeofenceSearchList('')
        // loadGeofenceList() 
    }

    const searchHandle = (keyword) => {
        setSearchKeyword(keyword)
        loadGeofenceSearchList(keyword)
    }

    const onTypeClick = (item,key) => {
        (key == isMenuClick) ? setIsMenuClick(-1) : setIsMenuClick(key)
        if(item == 'All') {
            setSelectedType('')
        }else 
            setSelectedType(item.toUpperCase())
            
    }
    const searchBar = () => {
        return (
                <View style={styles.search}>
                    <TextInput 
                        placeholder={translate("Search_here")}
                        style={styles.searchText}
                        onChangeText={text => searchHandle(text) }                    
                        value={searchKeyword}
                        placeholderTextColor={ColorConstant.GREY}
                    />
                </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {searchBar()}
            <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:hp(1.5),marginTop:hp(2)}}>
            { !isRegular ?
                <TouchableOpacity style={styles.createNewMainView} onPress={() => navigation.navigate(SCREEN_CONSTANTS.GEOFENCE_CREATE_NEW)} >
                    <Text style={styles.createNewText}>{translate("Create New")}</Text>
                </TouchableOpacity> : null }
                <TouchableOpacity style={styles.allType} onPress={()=> setIsTypeClick(!isTypeClick)}>
                    <Text style={[styles.createNewText,{color:ColorConstant.GREY}]}>{selectedType == '' ? 'All Type' : selectedType.charAt(0).toUpperCase() + selectedType.slice(1).toLowerCase()}</Text>
                    <NextIcon/>
                </TouchableOpacity> 
            </View>

            <View style={styles.activeUserMainView} onLayout={({nativeEvent}) => setDropDownPos(nativeEvent.layout.y)} ></View>
            {geofenceListData.length > 0 ?
            <FlatList
                style={{}}
                contentContainerStyle={{}}
                data={geofenceListData}
                renderItem={GeoFenceInfoItem}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={
                    <RefreshControl 
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}     
                    />
                }
            /> :
            <View style={styles.noRecords}>
                <Text style={styles.noRecordsText}>No records found</Text>
            </View>
            }  

            {isTypeClick ?
                <View style={[styles.userMenu,{position:'absolute', top:dropDownPos}, isRegular && { left: wp(6), top:dropDownPos + hp(1) }]}>
                    {geofenceType.map((item, key) =>
                        <TouchableOpacity  key={key} onPress={()=> onTypeClick(item,key)}>
                            <Text style={[styles.userStyle,{color: (key == isMenuClick) ? ColorConstant.ORANGE : ColorConstant.BLUE}]}>{item}</Text>
                            {key != geofenceType.length - 1 ? <View style={styles.horizontalLine} /> : null}
                        </TouchableOpacity>
                    )
                    }
                </View>
            : null}

            {renderViewDialog()} 

            {renderDeleteDialog()}   

        </SafeAreaView>
    )
}

const geofenceType = ["All", "Circle", "Polygon"]

const styles = StyleSheet.create({
    headerTitle: {
        color: ColorConstant.GREY,
        fontSize: FontSize.FontSize.medium,
        fontWeight: '500',
        textAlign: 'center'
    },
    container: {
        flex: 1,
        paddingHorizontal:hp(1.5),
        backgroundColor: ColorConstant.WHITE,
    },
    createNewMainView: {
        width: '48%',
        // alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        // paddingHorizontal:hp(1.5),
        backgroundColor: ColorConstant.ORANGE,
        height: hp(5),
        borderRadius: 10,
        marginVertical:hp(1)
        // marginTop: hp(3)
    },
    allType : {
        alignItems:'center',
        borderColor:ColorConstant.GREY,
        backgroundColor:ColorConstant.WHITE,
        borderWidth:0.5,
        width:'48%',
        height:hp(5),
        borderRadius:10,
        alignSelf:'center',
        flexDirection:'row',
        justifyContent:'space-around',
        shadowColor: ColorConstant.GREY,
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 1,
        elevation: 10,
        shadowRadius: 3
    },
    createNewText: {
        fontSize: FontSize.FontSize.small,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    noRecords: {
        marginVertical:hp(35),
        alignItems:'center'
    },
    noRecordsText: {
        fontFamily:"Nunito-Regular",
        fontSize:hp(2)
    },
    searchText: {
        //fontSize:FontSize.FontSize.small,
        fontSize:14,
        color:ColorConstant.BLACK,
        fontFamily:'Nunito-LightItalic'
    },
    search: {
        paddingHorizontal:hp(2),
        height:hp(5),
        marginHorizontal:hp(1.5),
        borderRadius:12,
        marginTop:hp(4),
        justifyContent  : 'center',
        // marginBottom:hp(2),
        elevation:4,
        shadowColor: ColorConstant.BLACK,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 3,
        shadowOpacity: 0.2,
        backgroundColor:ColorConstant.WHITE
    },
    horizontalLine: {
        borderBottomWidth: 0.5, borderBottomColor: ColorConstant.GREY, margin: hp(0.7)
    },
    userStyle: {
        margin: hp(0.5),
        //color: ColorConstant.BLUE,
        textAlignVertical: 'center',
        paddingLeft: hp(0.5),
        fontSize:FontSize.FontSize.small,
        fontFamily:'Nunito-Regular'
    },
    activeUserMainView: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        backgroundColor:ColorConstant.WHITE
    },
    userMenu: {
        backgroundColor: ColorConstant.WHITE,
        // padding: 5,
        paddingVertical: hp(1.5),
        paddingHorizontal: hp(1.5),
        right: wp(6),
        // width:'100%',
        //zIndex:10,
        borderRadius: 10,
        width: wp(42),
        //bottom: hp(11),
        justifyContent: 'space-between',
        position: 'absolute',
        shadowColor: ColorConstant.GREY,
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 1,
        elevation: 10,
        shadowRadius: 3
    },
})

export default GeoFence;
