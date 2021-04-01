import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ColorConstant } from '../../../constants/ColorConstants';
import { FontSize, TextField }from '../../../component';
import ImagePicker from 'react-native-image-crop-picker';
import { translate } from '../../../../App'
import { SCREEN_CONSTANTS } from '../../../constants/AppConstants';
import { AddIcon, BackIcon } from '../../../component/SvgComponent';
import AppManager from '../../../constants/AppManager';
import * as LivetrackingActions from '../Livetracking.Action'
import { getLoginInfo } from '../../Selector';
import { useDispatch, useSelector } from 'react-redux';
import {  SlidersColorPicker  } from 'react-native-color';
import tinycolor from 'tinycolor2'

const GeoFenceDetails = ({ navigation, route }) => {

    const { isConnected, loginInfo } = useSelector(state => ({
        isConnected: state.network.isConnected,
        loginInfo: getLoginInfo(state),
    }))
    
    const { selectedArea, type, devices, editingData } = route.params

    let colorData = ['#247ba0', '#70c1b3', '#b2dbbf', '#f3ffbd', '#ff1654']

    const dispatch = useDispatch()

    const [name, setName] = useState();
    const [description, setDescrption] = useState();
    const [color, setColor] = useState(tinycolor('#70c1b3').toHexString())
    const [modalVisible, setModalVisible] = useState(false)
    const [recents, setRecents] = useState(colorData)
    const [cancel, setCancel] = useState(false)

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
            dispatch(LivetrackingActions.requestLinkGeofenceToDevices(loginInfo.id, data.result.id, devices, onLinkSuccess, onError)) 
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
        dispatch(LivetrackingActions.setAddGeofenceResponse(response))
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
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
        height: Dimensions.get('window').height,
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
        backgroundColor: ColorConstant.BLUE
    },
    nextButtonText: {
        textAlign: 'center',
        color: ColorConstant.WHITE,
        fontWeight: 'bold'
    }
})

export default GeoFenceDetails;