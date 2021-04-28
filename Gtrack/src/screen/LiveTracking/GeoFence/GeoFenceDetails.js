import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ColorConstant } from '../../../constants/ColorConstants';
import { FontSize, MultiSelect, TextField }from '../../../component';
import images from '../../../constants/images'
import { translate } from '../../../../App'
import { SCREEN_CONSTANTS } from '../../../constants/AppConstants';
import { AddIcon, BackIcon, CrossIconBlue } from '../../../component/SvgComponent';
import AppManager from '../../../constants/AppManager';
import * as LivetrackingActions from '../Livetracking.Action'
import { getLoginInfo } from '../../Selector';
import { useDispatch, useSelector } from 'react-redux';
import {  SlidersColorPicker  } from 'react-native-color';
import tinycolor from 'tinycolor2'
import * as UsersActions from '../../Users/Users.Action'
import { getSubuserState } from './../../Selector';

const GeoFenceDetails = ({ navigation, route }) => {

    const { isConnected, loginInfo, subUserData } = useSelector(state => ({
        isConnected: state.network.isConnected,
        loginInfo: getLoginInfo(state),
        subUserData: getSubuserState(state),
    }))
    
    const { selectedArea, type, devices, editingData } = route.params

    let colorData = ['#247ba0', '#70c1b3', '#b2dbbf', '#f3ffbd', '#ff1654']

    const dispatch = useDispatch()

    const userdata = Object.values(subUserData).map((item)=> item.firstName+" "+item.lastName )
    const [name, setName] = useState();
    const [description, setDescrption] = useState();
    const [color, setColor] = useState(tinycolor('#70c1b3').toHexString())
    const [modalVisible, setModalVisible] = useState(false)
    const [recents, setRecents] = useState(colorData)
    const [cancel, setCancel] = useState(false)
    const [selectUser, setSelectedUser] = useState([])
    const [selectedCheckbox, setSelectedCheckbox] = useState(0) 
    const [notification, setNotification] = useState(false)
    const [emailNotification, setEmailNotification] = useState(false)

    let response = { 
        deviceList : [],
        geofence: {},
        isActive: null
    }

    useEffect(() => { 
        if(editingData) {
            setName(editingData.name)
            setDescrption(editingData.description) 
            setColor(editingData.color)
        }
    }, [editingData,navigation,route])

    useEffect(() => { 
        dispatch(UsersActions.requestGetSubuser(loginInfo.id, onUserSuccess, onUserError))  
    }, [])

    function onUserSuccess(data) {
        console.log("data",data)
        AppManager.hideLoader()     
    }
    
    function onUserError(error) {
        console.log(error)
        // AppManager.showSimpleMessage('danger', { message: error, description: '' })
        AppManager.hideLoader()
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
            ),
        });
    }, [navigation]);

    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }

    function onTapSave() {
        if (isConnected) {
            AppManager.showLoader()
            if(editingData){
                const requestBody = {
                    area: selectedArea,
                    attributes: {
                        color: color.toString()
                    },
                    calendarId: 0,
                    description: description,
                    id: editingData.id,
                    name: name
                }
                dispatch(LivetrackingActions.requestUpdateGeofence(loginInfo.id, requestBody, onUpdateSuccess, onUpdateError))
            } else {
            const requestBody = {
                area: selectedArea,
                attributes: {
                    color: color.toString()
                },
                calendarId: 0,
                description: description,
                id: null,
                name: name
            }
            dispatch(LivetrackingActions.requestAddGeofence(loginInfo.id, requestBody, onSuccess, onError))
        }
    } else {
        AppManager.showNoInternetConnectivityError()
    }
    }

    function onUpdateSuccess(data) { 
        response.geofence = data.result
        if (isConnected) {
            dispatch(LivetrackingActions.requestLinkGeofenceToUpdatedDevices(loginInfo.id, data.result.id, devices, onLinkSuccess, onError)) 
            AppManager.hideLoader()
            AppManager.showSimpleMessage('success', { message: "Geofence Updated successfully", description: '', floating: true })
        } else {
            AppManager.showNoInternetConnectivityError()
        }
    }

    function onUpdateError(error) {
        AppManager.hideLoader()
        AppManager.showSimpleMessage('warning', { message: error, description: '', floating: true }) 
    }  

    function onSuccess(data) { 
        response.geofence = data.result
        dispatch(LivetrackingActions.requestLinkGeofenceToDevices(loginInfo.id, data.result.id, devices, onLinkSuccess, onError)) 
        AppManager.hideLoader()
        AppManager.showSimpleMessage('success', { message: "Geofence created successfully", description: '', floating: true })
        
    }

    function onLinkSuccess(data) {
        response.deviceList = devices
        if(editingData){
            dispatch(LivetrackingActions.setUpdatedGeofenceResponse(response))
        }else{
            dispatch(LivetrackingActions.setAddGeofenceResponse(response)) 
        }
        AppManager.hideLoader()
        navigation.navigate(SCREEN_CONSTANTS.GEOFENCE)
    }

    function onError(error) {
    AppManager.hideLoader()
    AppManager.showSimpleMessage('warning', { message: error, description: '', floating: true }) 
    }

    const renderColorAccessory = () => {
        return(
            <View style={{flexDirection:'row', width:wp(100)}}>

                {recents.map((colorItem)=>{
                    return(
                        <TouchableOpacity onPress={() =>setColor(tinycolor(colorItem).toHexString())}
                        style={{backgroundColor:colorItem, height:wp(5), width:wp(5), borderRadius:3,marginRight:hp(2), borderColor:ColorConstant.BLACK, borderWidth:color == colorItem ? 1 :0}} />
                    )
                })}

                <TouchableOpacity onPress = {() =>toggleModal()} 
                    style={{backgroundColor:ColorConstant.WHITE, 
                        height:wp(5), width:wp(5), borderColor:ColorConstant.GREY, borderWidth:1,
                        alignItems:'center',justifyContent:'center',
                        borderRadius:3}}>
                    <AddIcon />
                </TouchableOpacity>

            </View>

            
        )
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.mainView}>
                <Text style={styles.textViewStyle}>Type : {type}</Text>
            </View>

            <View style={styles.subContainer}>
                <View style={styles.scene}>

                    <View style={styles.textInputField}>
                        <TextField
                            valueSet={setName}
                            label={translate( "Name") + '*' }
                            defaultValue={name}
                            onChangeText={(text) => setName(text)}
                            style={styles.textNameStyle}
                            labelFontSize={hp(1.4)}
                            labelTextStyle={{ top: hp(0.5) }}
                            contentInset={{ input: 12 }}
                        />
                    </View>

                    <View style={styles.textInputField}>
                        <TextField
                            valueSet={setDescrption}
                            label={translate("Description")}
                            defaultValue={description}
                            onChangeText={(text) => setDescrption(text)}
                            // style={styles.textNameStyle}
                            labelFontSize={hp(1.4)}
                            labelTextStyle={{ top: hp(0.5) }}
                            multiline={true}
                            contentInset={{ input: 7 }}
                        />
                    </View>
                    
                    <View style={{marginBottom:hp(1)}}>
                        <Text style={{color:ColorConstant.GREY}}>Pick Color</Text>
                    </View>

                    {renderColorAccessory()}

                    <SlidersColorPicker
                        visible={modalVisible}
                        color={color}
                        returnMode={'hex'}
                        onCancel={() => setModalVisible(false)}
                        onOk={colorHex => {
                            setModalVisible(false)
                            setColor(colorHex)
                            setRecents([colorHex,...recents.filter(c => c !== colorHex).slice(0, 4)])
                        }}
                        swatches={recents}
                        swatchesLabel={"RECENTS"}
                        okLabel="Done"
                        cancelLabel="Cancel"
                    />

                    <MultiSelect 
                        label="Select User"
                        dataList={userdata} 
                        allText={translate("All_string")}
                        hideSelectedDeviceLable={true}
                        hideDeleteButton={true}
                        rowStyle={styles.rowStyle}
                        dropdownStyle={{height:hp(20)}}
                        outerStyle={{marginTop:hp(3)}}
                        textStyle={{color:ColorConstant.BLUE}}
                        valueSet={setSelectedUser} 
                        selectedData={selectUser}
                        CloseIcon={<CrossIconBlue/>}
                        selectedItemContainerStyle={styles.selectedItemContainerStyle} 
                        selectedItemRowStyle={styles.selectedItemRowStyle}
                        deleteHandle={(item)=>setSelectedUser(selectUser.filter((item1) => item1 != item))}
                    /> 
                    <View style={{marginTop:hp(2)}}>
                        <TouchableOpacity onPress={() => setNotification(!notification)} style={{flexDirection:'row',alignItems:'center',left:wp(-2)}}>
                            <Image style={{alignSelf:'flex-start'}} source={notification? images.liveTracking.checkboxClick : images.liveTracking.checkbox}></Image>
                            <Text style={styles.notificationStyle}> {translate("Push Notification")}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setEmailNotification(!emailNotification)} style={{flexDirection:'row',alignItems:'center',left:wp(-2)}}>
                            <Image style={{alignSelf:'flex-start'}} source={emailNotification? images.liveTracking.checkboxClick : images.liveTracking.checkbox}></Image>
                            <Text style={styles.notificationStyle}> {translate("Email Notification")}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonMainContainer}>
                        <TouchableOpacity onPress={() => { cancel ? setCancel(false) : setCancel(true), navigation.goBack() }} style={[styles.cancelButton]}>
                            <Text style={styles.buttonTextColor}>{translate("Cancel")}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            disabled={!name}
                            onPress={() => onTapSave()} style={[styles.nextButton,{backgroundColor: name ? ColorConstant.BLUE : '#06418E50'}]}>
                            <Text style={styles.nextButtonText}>{translate("Save")}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

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
        marginLeft: wp(4)
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
        color: ColorConstant.WHITE,
        fontWeight: 'bold',
        fontSize: FontSize.FontSize.medium
    },
    subContainer: {
        // height: Dimensions.get('window').height,
        alignItems: 'center',
        backgroundColor: ColorConstant.WHITE
    },
    scene: {
        width: '90%',
        marginHorizontal: hp(5),
        marginTop: hp(2),
    },
    textInputField: {
        width: '100%',
        alignSelf: 'center',
        margin: hp(0.5)
    },
    dropDownMainView: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        height: hp(25)
    },
    dropdownView: {
        width: '50%'
    },
    textNameStyle: {
        color: ColorConstant.BLACK,
        fontSize: FontSize.FontSize.small,
        fontWeight: '500',
    },
    outerStyle: {
        width: '85%',
        backgroundColor: ColorConstant.WHITE
    },
    dropdownStyle: {
        width: '85%',
        alignSelf: 'center'
    },
    uploadMainView: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ColorConstant.WHITE,
        borderWidth: 1,
        borderColor: ColorConstant.GREY,
        width: '47%',
        marginTop: hp(1),
        borderRadius: 10
    },
    uploadText: {
        fontSize: FontSize.FontSize.small,
        marginTop: hp(1),
        color: ColorConstant.GREY
    },
    buttonMainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp(75),
        marginTop: hp(6),
        alignSelf: 'center',
        paddingBottom: hp(2)
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
        backgroundColor: ColorConstant.BLUE
    },
    nextButtonText: {
        textAlign: 'center',
        color: ColorConstant.WHITE,
        fontWeight: 'bold'
    },
    rowStyle: {
        borderBottomColor:ColorConstant.LIGHTGREY, 
        borderBottomWidth:1
    },
    selectedItemContainerStyle:{
        backgroundColor:"#F9FAFC",
        flexDirection:'row',
        flexWrap:'wrap',
        //backgroundColor:ColorConstant.LIGHTRED,
        borderRadius:8,
        marginTop:hp(2),
        elevation:0,
        padding:hp(1)
    },
    selectedItemRowStyle: {
        flexDirection:'row',  
        elevation:4,
        shadowColor: ColorConstant.GREY,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 3,
        shadowOpacity: 1,
        backgroundColor:ColorConstant.LIGHTBLUE,
        borderRadius:5,
        alignItems:'center',
        paddingHorizontal:hp(1),
        margin:4,
        height:hp(4),
    },
    notificationStyle: {
        fontFamily:'Nunito-Regular',
        fontSize:12,
        color:ColorConstant.BLUE
    }
})

export default GeoFenceDetails;