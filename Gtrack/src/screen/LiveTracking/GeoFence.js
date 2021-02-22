import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, Dimensions, ScrollView, FlatList, RefreshControl } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants';
import { FontSize, MapView} from '../../component';
import { Dialog } from 'react-native-simple-dialogs';
import { translate } from '../../../App';
import { useDispatch, useSelector } from 'react-redux';
import { getGeofenceListInfo, getLoginState, isRoleRegular } from '../Selector';
import { CIRCLE_REGEX, POLYGON_REGEX, SCREEN_CONSTANTS } from '../../constants/AppConstants';
import * as LivetrackingActions from '../LiveTracking/Livetracking.Action'
import { GeoFenceListIcon, PinIcon, GeoFenceTrashIcon, BackIcon } from '../../component/SvgComponent';
import AppManager from '../../constants/AppManager';
import { isCircle } from '../../utils/helper';
import { toNumber } from 'lodash';

const GeoFence = ({ navigation }) => {

    const { isRegular} = useSelector(state => ({
        isRegular: isRoleRegular(state)
    }))
    
    const [dialogVisible, setDialogVisible] = useState(false)
    const [deleteDialogBox, setDeleteDialogBox] = useState(false)
    const [activeGeofence, setActiveGeofence] = useState()
    const [geofenceId, setGeofenceId] = useState()
    const [geofenceName, setGeofenceName] = useState("")
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [selectedDevice, setSelectedDevice] = useState([]);

    const dispatch = useDispatch()

    const { loginData, geofenceList } = useSelector(state => ({
        loginData: getLoginState(state),
        geofenceList: getGeofenceListInfo(state)
    }))

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
        loadGeofenceList()
      }, [])

    function loadGeofenceList() {
        AppManager.showLoader()  
        dispatch(LivetrackingActions.requestGetGeofence(loginData.id, onSuccess, onError))
    }

    function onSuccess(data) {    
        setIsRefreshing(false) 
        AppManager.hideLoader()
      }
    
      function onError(error) {
        AppManager.hideLoader()
        setIsRefreshing(false) 
      }
    
    function hideDialog() {
        setDeleteDialogBox(false)
        setDialogVisible(false)
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

    const GeoFenceInfoItem = ({ item }) => {
        return (
            
            <TouchableOpacity style={styles.cardContainer} onPress={() => { 
                setActiveGeofence(item)
                setSelectedDevice(item.deviceList)
                setDialogVisible(!dialogVisible)
            }}>
                <View style={styles.blueBox}>
                    <Text style={styles.blueBoxTitle}> {item.geofence.name} </Text>
                    { !isRegular ?
                    <TouchableOpacity style={{padding:hp(1)}} onPress={() => { 
                        setGeofenceId(item.geofence.id)
                        setGeofenceName(item.geofence.name)
                        setDeleteDialogBox(!deleteDialogBox)
                    }}>
                        <GeoFenceTrashIcon/>
                    </TouchableOpacity> : null}
                </View>

                <View style={styles.whiteContainer}>
                    <View style={styles.GroupMainView}>
                        <Text style={styles.whiteContainerText}>Group</Text>
                        <Text style={styles.whiteContainerSubText}>{item.GroupData}</Text>
                    </View>

                    <View style={styles.deviceNameMainView}>
                        <Text style={styles.whiteContainerText}>Device Name</Text>
                        {item.deviceList.map((device) => {
                            return(
                                <Text style={styles.whiteContainerSubText}>{device.deviceName}</Text>
                            )
                        })}
                    </View>
                </View>
            </TouchableOpacity>

        )
    }

    const renderViewDialog = () => {

        const [type, setType] = useState('')
        const [area, setArea] = useState(0)
        const [radius, setRadius] = useState(0)
        const [perimeter, setPerimeter] = useState(0)
        const [coordinate, setCoordinate] = useState()
        const [coordinates, setCoordinates] = useState()

        const CIRCLE = (item) => {
            setType("CIRCLE")
            setRadius(CIRCLE_REGEX.exec(item)[2])
            let rad = CIRCLE_REGEX.exec(item)[2]
            let lat = parseFloat(CIRCLE_REGEX.exec(item)[1].split(" ")[0])
            let lng = parseFloat(CIRCLE_REGEX.exec(item)[1].split(" ")[1])
            setCoordinate([lng, lat])
            setArea(Math.round(Math.PI*rad*rad/10000))
            setPerimeter(Math.round(Math.PI*2*rad/100))
        }

        const POLYGON = (item) => {
            setType("POLYGON")
            const re = /\(\((.*)\)\)/;
            console.log("Polypoly ",item.match(re)[1].split(","))
            setCoordinate(item.match(re)[1].split(",")[0].split(" "))
            setCoordinates(item.match(re)[1].split(","))
        }

        useEffect(()=>{
            if(activeGeofence){
                console.log("khushi", isCircle(activeGeofence.geofence.area))
                isCircle(activeGeofence.geofence.area) ? 
                    CIRCLE(activeGeofence.geofence.area):
                    POLYGON(activeGeofence.geofence.area)
            }            
        },[activeGeofence])


        return(
        <Dialog
            visible={dialogVisible}
            onTouchOutside={() => { hideDialog() }} 
            dialogStyle={styles.dialogStyle} >

        <View style={styles.mainViewHeading}>
            <View style={styles.subHeadingView}>
                <Text style={styles.headingText}>{translate("View")}</Text>
                <TouchableOpacity onPress={() => { hideDialog() }}>
                    <Image source={images.geoFence.CrossBlack} resizeMode="contain" style={styles.crossImageStyle} />
                </TouchableOpacity>
            </View>

            <View style={styles.popUpCardContainer}>
                <View style={styles.titleViewStyle}>
                    <Text style={styles.titleTextStyle}>{translate("Details")}</Text>
                    <GeoFenceListIcon width={12.287} height={16.382} resizeMode='contain' />
                </View>

                <View style={styles.lineStyle} />

                <View style={styles.infoDataMainView}>
                    <View style={styles.infoDataSubView}>
                        <Text style={styles.mainTextStyle}>{translate("Name")}</Text>
                        <Text style={styles.textStyle}>{activeGeofence && activeGeofence.geofence.name}</Text>
                    </View>

                    <View style={styles.descriptionMainStyle}>
                        <Text style={styles.mainTextStyle}>{translate("Description")}</Text>
                        <Text style={styles.textStyle}>{activeGeofence && activeGeofence.geofence.description}</Text>
                    </View>
                </View>

                <View style={styles.geoFenceDetailMainView}>
                    <View style={styles.detailsMainView}>
                        <View style={styles.secondRowMainView}>
                            <View style={styles.secondRowSubView}>
                                <Text style={styles.mainTextStyle}>{translate("Colour")}</Text>
                                <View style={[styles.deviceSummaryDetailView,{backgroundColor:activeGeofence ? activeGeofence.geofence.attributes.color : ColorConstant.WHITE}]}></View>
                            </View>

                            <View style={styles.fontSizeMainView}>
                                <Text style={styles.mainTextStyle}>{translate("FontSize")}</Text>
                                <Text style={styles.fontSizeStyle}>08</Text>
                            </View>

                            <View style={styles.typeMainViewStyle}>
                                <Text style={styles.mainTextStyle}>{translate("Type")}</Text>
                                <Text style={styles.fontSizeStyle}>{type && type}</Text>
                            </View>
                        </View>

                        <View style={styles.secondRowMainView}>
                            <View style={styles.visibilityMainView}>
                                <Text style={styles.mainTextStyle}>{translate("Visibility")}</Text>
                                <Text style={styles.fontSizeStyle}>02 to 20</Text>
                            </View>

                            <View style={styles.areaMainView}>
                                <Text style={styles.mainTextStyle}>{translate("Area")}</Text>
                                <Text style={styles.fontSizeStyle}>{area + " sq m"}</Text>
                            </View>

                            <View style={styles.perimeterMainView}>
                                <Text style={styles.mainTextStyle}>{translate("Perimeter")}</Text>
                                <Text style={styles.fontSizeStyle}>{perimeter} m</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.secondRowMainView}>
                        <View style={styles.descriptionMainStyle}>
                            <Text style={styles.mainTextStyle}>{translate("Image")}</Text>
                            <Image source={images.geoFence.Intersection} resizeMode='stretch' style={styles.intersectionImageStyle} />
                        </View>
                    </View>
                </View>

                <View style={styles.secondRowMainView}>
                    <View style={styles.descriptionMainStyle}>
                        <Text style={styles.mainTextStyle}>{translate("Selected Devices")}</Text>
                        {activeGeofence && activeGeofence.deviceList.map((device) =>{
                            return(
                                <Text style={styles.fontSizeStyle}>{device.deviceName}</Text>
                            )
                        })}
                    </View>
                </View>
            </View>

            <View style={styles.popUpCardContainer}>
                <View style={styles.titleViewStyle}>
                    <Text style={styles.titleTextStyle}>{translate("Location")}</Text>
                    <PinIcon width={12.652} height={16.982} resizeMode='contain'/>
                </View>

                <View style={styles.lineStyle} />

                <View style={styles.mapViewMainView}>
                    <MapView currentLocation={coordinate} />
                </View>
            </View>

            { !isRegular ?
            <View style={styles.buttonMainContainer}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate(SCREEN_CONSTANTS.GEOFENCE_CREATE_NEW,{
                        editingData:{ 
                            selectedArea:area,
                            type:type,
                            devices:selectedDevice,
                            name:activeGeofence.geofence.name,
                            description:activeGeofence.geofence.description, 
                            coordinate:coordinate,
                            radius: radius,
                            coordinates: coordinates
                        }})
                        hideDialog()
                    }
                } style={styles.nextButton}>
                    <Text style={styles.nextButtonText}>{translate("Edit")}</Text>
                </TouchableOpacity>
            </View>  : null } 

        </View>

        </Dialog>
        )
    }

    const renderDeleteDialog = () => {
        return(
            <Dialog visible={deleteDialogBox} onTouchOutside={() => { hideDialog() }} dialogStyle={styles.dialogStyle}>

                <View style={styles.deleteDialogMainView}>

                    <View style={styles.subHeadingView}>
                        <Text style={styles.deleteText}>Are you sure ?</Text>
                        <TouchableOpacity onPress={() => { hideDialog() }}>
                            <Image source={images.geoFence.CrossBlack} resizeMode="contain" style={styles.crossImageStyle} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textMainView}>
                        <Text style={styles.textViewStyle}>Do you really want to delete {geofenceName} ? </Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => hideDialog()  } style={[styles.cancelButton]}>
                            <Text style={styles.buttonTextColor}>{translate("Cancel")}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => ondeleteGeofence()} style={styles.nextButton}>
                            <Text style={styles.nextButtonText}>{translate("Delete_string")}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Dialog>
        )
    }

    const onRefresh = () => {
        setIsRefreshing(true)
        loadGeofenceList() 
    }

    return (
        <SafeAreaView style={styles.container}>
            { !isRegular ?
            <TouchableOpacity style={styles.createNewMainView} onPress={() => navigation.navigate(SCREEN_CONSTANTS.GEOFENCE_CREATE_NEW)} >
                <Text style={styles.createNewText}>{translate("Create New")}</Text>
            </TouchableOpacity> : null }

            <FlatList
                style={{}}
                contentContainerStyle={{}}
                data={geofenceList}
                renderItem={GeoFenceInfoItem}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={
                    <RefreshControl 
                      refreshing={isRefreshing}
                      onRefresh={onRefresh}     
                    />
                  }
            />

            {renderViewDialog()} 

            {renderDeleteDialog()}   

        </SafeAreaView>
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
        marginTop: hp(2),
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
        marginLeft: wp(30)
    },
    crossImageStyle: {
        marginTop: hp(0.5),
        marginRight: wp(5)
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
        paddingHorizontal: hp(1.5),
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
        width: '68%'
    },
    descriptionMainStyle: {
        flexDirection: 'column'
    }
})

export default GeoFence;

const GEOFENCEINFO = [
    {
        title: 'Gas Station',
        deleteIcon: images.geoFence.deleteIcon,
        Group: 'Group',
        DeviceName: 'Device Name',
        GroupData: 'Home',
        DeviceNameData: 'Track Port International'
    },
    {
        title: 'Oil Refinery',
        deleteIcon: images.geoFence.deleteIcon,
        Group: 'Group',
        DeviceName: 'Device Name',
        GroupData: 'Home',
        DeviceNameData: 'Spark Nano 7 GPS Tracker'
    }
]
