import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ColorConstant } from '../../../constants/ColorConstants';
import { FontSize } from '../../../component';
import { useSelector, useDispatch } from 'react-redux';
import {  getLoginState, isRoleRegular } from '../../Selector';
import { GeoFenceTrashIcon } from '../../../component/SvgComponent';
import Switches from 'react-native-switches'
import AppManager from '../../../constants/AppManager';
import * as LivetrackingActions from '../Livetracking.Action'
import { isCircle } from './../../../utils/helper';

const GeofenceList = ( props ) => {

    const { item, setActiveGeofence, setSelectedDevice, setDialogVisible, dialogVisible, setGeofenceId, setGeofenceName, setDeleteDialogBox, deleteDialogBox } = props

    const { loginData, isRegular } = useSelector(state => ({
        loginData: getLoginState(state),
        isRegular: isRoleRegular(state)
    }))

    const geoFenceType = isCircle(item.geofence.area) ? 'Circle' : 'Polygon'

    const dispatch = useDispatch()

    function onChangeSwitch(item) {
        AppManager.showLoader()
        dispatch(LivetrackingActions.enableDisableGeofence(loginData.id, item.geofence.id, !item.isActive, onChangeUserStatusSuccess, onChangeUserStatusError))
    }

    function onChangeUserStatusSuccess(data) {
        console.log("Success",data)
        const { result } = data
        AppManager.hideLoader()
        AppManager.showSimpleMessage('success', { message: result, description: '' })
    }
    
    function onChangeUserStatusError(error) {
        AppManager.hideLoader()
        AppManager.showSimpleMessage('danger', { message: error, description: '' })
    }

    const onTapItem = () => {
        setActiveGeofence(item)
        setSelectedDevice(item.deviceList)
        setDialogVisible(!dialogVisible)
    }

    return (

        <View style={styles.cardContainer} >
            <View style={styles.blueBox}>
                <TouchableOpacity onPress={onTapItem} style={{flex:1,marginRight:hp(1)}}>
                    <Text style={styles.blueBoxTitle}> {item.geofence.name} </Text>
                </TouchableOpacity>
                <Switches shape={'line'} buttonColor={item.isActive? ColorConstant.DARKENGREEN : ColorConstant.RED } textOn={item.isActive ? "Enable" :"Disable"} textOff=' ' textFont={"Nunito-Regular"} textSize={10} colorTextOn={ColorConstant.WHITE}  showText={true} value={item.isActive}  buttonSize={15} onChange={() => onChangeSwitch(item)}/>
                { !isRegular ?
                <TouchableOpacity style={{padding:hp(1),marginLeft:hp(2)}} onPress={() => { 
                    setGeofenceId(item.geofence.id)
                    setGeofenceName(item.geofence.name)
                    setDeleteDialogBox(!deleteDialogBox)
                }}>
                    <GeoFenceTrashIcon/>
                </TouchableOpacity> : null}
            </View>

            <TouchableOpacity onPress={onTapItem} style={styles.whiteContainer}>
                <View style={styles.GroupMainView}>
                    <Text style={styles.whiteContainerText}>Geofence Type</Text>
                    <Text style={styles.whiteContainerSubText}>{geoFenceType}</Text>
                </View>
                
                <View style={styles.deviceNameMainView}>
                    <Text style={styles.whiteContainerText}>Device Name</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={styles.whiteContainerSubText}>{item.deviceList[0] ? item.deviceList[0].deviceName : "-"}</Text>
                        <Text style={styles.whiteContainerSubText}>{item.deviceList.length > 1 ? "+" + (item.deviceList.length - 1) : null}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>

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
    dialogStyle: {
        borderRadius: 15,
        backgroundColor: ColorConstant.WHITE
    },
    container: {
        flex: 1,
        paddingHorizontal:hp(1.5),
        backgroundColor: ColorConstant.WHITE,
    },
    createNewMainView: {
        width: '95%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: ColorConstant.ORANGE,
        height: hp(5),
        borderRadius: 14,
        marginTop: hp(3)
    },
    createNewText: {
        fontSize: FontSize.FontSize.small,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    cardContainer: {
        width: '95%',
        marginVertical: hp(1.5),
        alignSelf: 'center',
        backgroundColor: ColorConstant.WHITE,
        borderRadius: 12,
        // elevation:3,
        borderWidth: 0.3,
        borderColor: ColorConstant.GREY,
        shadowColor: ColorConstant.GREY,
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 0 },
    },
    blueBox: {
        backgroundColor: ColorConstant.BLUE,
        alignItems: 'center',
        height: hp(5),
        flexDirection: 'row',
        width: "100%",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        paddingHorizontal: hp(2),

    },
    blueBoxTitle: {
        color: ColorConstant.WHITE,
        fontSize: hp(1.4),
        fontWeight: 'bold',
        flex: 1,
        fontFamily: 'Nunito-Bold',
        textAlignVertical:'center'
    },
    whiteContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: hp(1.5),
        paddingHorizontal: wp(3.5),
        paddingBottom: hp(1.5)
    },
    GroupMainView: {
        flexDirection: 'column',
        flex: 1
    },
    whiteContainerText: {
        color: ColorConstant.GREY,
        fontSize: hp(1.4),
        fontFamily: 'Nunito-Regular'
    },
    whiteContainerSubText: {
        color: ColorConstant.BLACK,
        fontSize: FontSize.FontSize.small,
        fontFamily: 'Nunito-Regular'
    },
    deviceNameMainView: {
        flex: 1
    },
    mainViewHeading: {
        height: hp(80),
        width: wp(77)
    },
    deleteDialogMainView: {
        height: hp(23),
        width: wp(80)
    },
    subHeadingView: {
        flexDirection: 'row',
        //marginTop: hp(2),
        justifyContent: 'space-between'
    },
    deleteText: {
        fontSize: FontSize.FontSize.medium,
        color: ColorConstant.ORANGE,
        fontWeight: 'bold',
        marginLeft: wp(25),
    },
    textMainView: {
        marginTop: hp(5),
        alignSelf: 'center'
    },
    textViewStyle: {
        fontSize: FontSize.FontSize.small,
        color: ColorConstant.BLACK
    },
    headingText: {
        fontSize: FontSize.FontSize.medium,
        color: ColorConstant.ORANGE,
        fontWeight: 'bold',
        textAlign:'center',
        flex:1
        //marginLeft: wp(30)
    },
    crossImageStyle: {
        marginTop: hp(0.5),
        marginRight: wp(2)
    },
    popUpCardContainer: {
        width: '100%',
        marginRight: wp(2),
        marginTop: hp(2),
        elevation: 3,
        alignSelf: 'center',
        backgroundColor: ColorConstant.WHITE,
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: ColorConstant.GREY,
        shadowColor: ColorConstant.GREY,
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 0 },
    },
    titleViewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: hp(2),
        alignItems: 'center',
        marginVertical: hp(1),
    },
    titleTextStyle: {
        color: ColorConstant.BLUE,
        fontSize: FontSize.FontSize.small,
    },
    lineStyle: {
        borderBottomColor: ColorConstant.GREY,
        borderBottomWidth: 0.5,
        marginHorizontal: hp(2)
    },
    mapViewMainView: {
        height: hp(20),
        width: '100%',
        paddingHorizontal: wp(5),
        padding: hp(2)
    },
    buttonMainContainer: {
        width: wp(70),
        marginTop: hp(3),
        marginLeft: wp(23)
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp(75),
        marginTop: hp(7),
        alignSelf: 'center',
    },
    cancelButton: {
        borderRadius: 6,
        width: '40%',
        height: hp(4),
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
        height: hp(4),
        justifyContent: 'center',
        backgroundColor: ColorConstant.BLUE,
    },
    nextButtonText: {
        textAlign: 'center',
        color: ColorConstant.WHITE,
        fontWeight: 'bold'
    },
    infoDataMainView: {
        flexDirection: 'row',
        marginTop: hp(1.5),
        paddingHorizontal: hp(2.5),
        paddingBottom: hp(1.5)
    },
    infoDataSubView: {
        flexDirection: 'column',
        width: '50%'
    },
    secondRowMainView: {
        flexDirection: 'row',
        paddingHorizontal: hp(2.5),
        paddingBottom: hp(1)
    },
    visibilityMainView: {
        flexDirection: 'column',
        width: '36%'
    },
    secondRowSubView: {
        flexDirection: 'column',
        width: '35%'
    },
    mainTextStyle: {
        color: ColorConstant.GREY,
        fontSize: hp(1.4),
        marginTop: hp(1.5),
    },
    intersectionImageStyle: {
        marginTop: hp(1),
        height: hp(10),
        width: wp(20)
    },
    fontSizeStyle: {
        fontSize: hp(1.4),
        color: ColorConstant.BLACK,
        marginTop: hp(1)
    },
    perimeterMainView: {
        flexDirection: 'column',
        width: '35%'
    },
    areaMainView: {
        flexDirection: 'column',
        width: '40%'
    },
    deviceSummaryDetailView: {
        width: hp(2.5),
        height: hp(2.5),
        backgroundColor: '#E77575',
        borderRadius: hp(0.5),
        marginTop: hp(1)
    },
    fontSizeMainView: {
        flexDirection: 'column',
        width: '40%'
    },
    typeMainViewStyle: {
        flexDirection: 'column',
        width: '35%'
    },
    textStyle: {
        color: ColorConstant.BLACK,
        fontSize: hp(1.4),
        marginTop: hp(1),
    },
    geoFenceDetailMainView: {
        flexDirection: 'row'
    },
    detailsMainView: {
        width: '90%'
    },
    descriptionMainStyle: {
        flexDirection: 'column'
    }
})

export default GeofenceList