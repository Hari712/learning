import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, Dimensions, ScrollView, LayoutAnimation } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import images from '../../constants/images';
import { getGroupListInfo, getGeofenceDeviceListInfo, getLoginInfo } from "../Selector";
import { useDispatch, useSelector } from "react-redux";
import { ColorConstant } from '../../constants/ColorConstants';
import NavigationService from '../../navigation/NavigationService'
import { translate } from '../../../App'
import { DropDown, MultiSelectDropdown, FontSize }from '../../component';
import { SCREEN_CONSTANTS } from '../../constants/AppConstants';
import { BackIcon } from '../../component/SvgComponent';
import isEmpty from 'lodash/isEmpty'
import AppManager from '../../constants/AppManager'
import * as LivetrackingActions from '../LiveTracking/Livetracking.Action'

const GeoFenceCreateNew = ({ navigation }) => {

    const { groupList, isConnected, geofenceDeviceList, loginInfo } = useSelector(state => ({
        groupList: getGroupListInfo(state),
        isConnected: state.network.isConnected,
        geofenceDeviceList: getGeofenceDeviceListInfo(state),
        loginInfo: getLoginInfo(state),
    })) 


    const arrGroupnames = isEmpty(groupList) ? [] : groupList.map((item) => item.groupName)
    const [cancel, setCancel] = useState(false)
    const [arrDeviceList, setArrDeviceList] = useState([])
    const [selectedDevice, setSelectedDevice] = useState([]);
    const [role, setRole] = useState();
    const DATA =['Circle','Polygon']

    const dispatch = useDispatch()

    useEffect(() => {  
        setArrDeviceList(Object.values(geofenceDeviceList).map((item) => item.deviceName))
        console.log("list",arrDeviceList)
    }, [geofenceDeviceList])

    useEffect(() => {  
        loadDeviceList()
    }, [])

      function loadDeviceList() {
        AppManager.showLoader()  
        dispatch(LivetrackingActions.requestGetDevicesByUserId(loginInfo.id, onSuccess, onError))
      }
    
      function onSuccess(data) {    
        console.log("Success",data) 
        AppManager.hideLoader()
      }
    
      function onError(error) {
        AppManager.hideLoader()
        console.log("Error",error)  
      }

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

    function navigateToPolygonCreator() {
        role === 'Circle' ?
            NavigationService.push(SCREEN_CONSTANTS.GEOFENCE_CIRCLE) :
            NavigationService.push(SCREEN_CONSTANTS.GEOFENCE_POLYGON)
       //navigation.navigate('GeoFenceType', { type: role })
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.mainView}>
                <Text style={styles.textViewStyle}>{translate("Create New")}</Text>
            </View>
            <View style={styles.multiselectMainView}>
                <MultiSelectDropdown
                    label="Select Device"
                    dataList={arrDeviceList} 
                    allText={translate("Select_all_string")}
                    hideSelectedDeviceLable={true}
                    hideDeleteButton={true}
                    rowStyle={styles.rowStyle}
                    dropdownStyle={{ height: hp(20) }}
                    outerStyle={[styles.outerStyle, { marginTop: hp(4) }]}
                    valueSet={setSelectedDevice}
                    selectedData={selectedDevice}
                    selectedItemContainerStyle={styles.selectedItemContainerStyle}
                    selectedItemRowStyle={styles.selectedItemRowStyle}
                    deleteHandle={(item, key) => setSelectedDevice(selectedDevice.filter((item1, key1) => key1 != key))}
                />
            </View>

            <View style={styles.dropDown}>
                <View style={styles.dropDownSubView}>
                    <DropDown
                        label={translate("Geofence_CreateNew_string2")}
                        defaultValue={role}
                        valueSet={setRole}
                        dataList={DATA}
                        contentInset={{ input:13, label: 4.5 }}
                        outerStyle={[styles.outerViewStyle]}
                        dropdownStyle={styles.dropdownStyle}
                        dataRowStyle={styles.dataRowStyle}
                        dataTextStyle={{ color: ColorConstant.BLUE, marginTop: hp(1), marginBottom: hp(1) }}
                        // labelFontSize={hp(1.4)}
                        // labelTextStyle={{ top: hp(0.5) }}
                    />
                </View>
            </View>
            {/* {DATA.map((item,index) => */}
                <View style={styles.buttonMainContainer}>
                    <TouchableOpacity onPress={() => { cancel ? setCancel(false) : setCancel(true), navigation.goBack() }} style={[styles.cancelButton]}>
                        <Text style={styles.buttonTextColor}>{translate("Cancel")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigateToPolygonCreator()}  style={styles.nextButton}>
                        <Text style={styles.nextButtonText}>{translate("Next")}</Text>
                    </TouchableOpacity>
                </View>
            {/* )} */}

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    headerTitle: {
        color: ColorConstant.GREY,
        fontSize: FontSize.FontSize.medium,
        fontWeight: '500',
        textAlign: 'center'
    },
    headerLeftStyle: {
        marginLeft: hp(2)
    },
    container: {
        flex: 1,
        backgroundColor: ColorConstant.WHITE,
    },
    mainView: {
        width: '95%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: ColorConstant.ORANGE,
        height: hp(5)
    },
    textViewStyle: {
        fontSize: FontSize.FontSize.small,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    multiselectMainView: {
        width: '85%', 
        alignSelf: 'center'
    },
    rowStyle: {
        borderBottomColor: ColorConstant.LIGHTGREY,
        borderBottomWidth: 1,
    },
    outerStyle: {
        elevation: 4,
        backgroundColor: ColorConstant.WHITE,
        borderRadius: 7,
        shadowColor: ColorConstant.GREY,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 1,
        shadowOpacity: 1,
    },
    selectedItemContainerStyle: {
        backgroundColor: ColorConstant.PINK,
        borderRadius: 8,
        marginTop: hp(2),
        elevation: 0,
        padding: hp(1)
    },
    selectedItemRowStyle: {
        flexDirection: 'row',
        elevation: 4,
        shadowColor: ColorConstant.GREY,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 3,
        shadowOpacity: 1,
        backgroundColor: ColorConstant.LIGHTPINK,
        borderRadius: 5,
        alignItems: 'center',
        paddingHorizontal: hp(1),
        //flexWrap:'wrap',
        margin: 4,
        height: hp(4),
    },
    dropDown:{
        marginTop:hp(2),
        width: '85%', 
        alignSelf: 'center'
    },
    dropDownSubView: {
        flex: 1
    },
    outerViewStyle:{
        elevation:4,
        backgroundColor:ColorConstant.WHITE,
        borderRadius:7,
        shadowColor: ColorConstant.GREY,
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowRadius: 1,
        shadowOpacity: 1,
      },
      dropdownStyle: {
        position:'relative', 
        top:hp(0.1), 
        width:'100%',
        borderRadius: 13
      },
      dataRowStyle: {
        borderBottomWidth:1,
        borderBottomColor:ColorConstant.LIGHTGREY, 
      },
    buttonMainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp(75),
        marginTop: hp(6),
        alignSelf: 'center',
        paddingBottom: hp(6)
    },
    cancelButton: {
        borderRadius: 6,
        width: '40%',
        height: hp(5),
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: ColorConstant.BLUE,
    },
    buttonTextColor: {
        textAlign: 'center',
        color: ColorConstant.BLUE
    },
    nextButton: {
        borderRadius: 6,
        width: '40%',
        height: hp(5),
        justifyContent: 'center',
        backgroundColor: ColorConstant.BLUE,
    },
    nextButtonText: {
        textAlign: 'center',
        color: ColorConstant.WHITE,
        fontWeight: 'bold'
    }
})

export default GeoFenceCreateNew;