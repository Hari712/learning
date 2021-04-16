import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import images from '../constants/images';
import { ColorConstant } from '../constants/ColorConstants';
import { FontSize, MapView} from '../component';
import { Dialog } from 'react-native-simple-dialogs';
import { translate } from '../../App';
import { CIRCLE_REGEX, SCREEN_CONSTANTS } from '../constants/AppConstants';
import { GeoFenceListIcon, PinIcon } from '../component/SvgComponent';
import { isCircle } from '../utils/helper';
import { useSelector } from 'react-redux';
import { isRoleRegular } from '../screen/Selector';
import NavigationService from '../navigation/NavigationService';
import GeoFenceMapPreview from './GeofenceMapPreview';

const GeofenceEditDialog = (props) => {

    const { dialogVisible, setDialogVisible, activeGeofence, selectedDevice } = props

    const { isRegular } = useSelector(state => ({
        isRegular: isRoleRegular(state)
    }))

    const [type, setType] = useState('')
    const [area, setArea] = useState(0)
    const [radius, setRadius] = useState(0)
    // const [perimeter, setPerimeter] = useState(0)
    const [coordinate, setCoordinate] = useState()
    const [coordinates, setCoordinates] = useState()

    const CIRCLE = (item) => {
        setType("Circle")
        setRadius(CIRCLE_REGEX.exec(item)[2])
        let rad = CIRCLE_REGEX.exec(item)[2]
        let lat = parseFloat(CIRCLE_REGEX.exec(item)[1].split(" ")[0])
        let lng = parseFloat(CIRCLE_REGEX.exec(item)[1].split(" ")[1])
        // setCoordinate([lng, lat])
        Platform.OS == 'ios'?
        setCoordinate({"latitude": lat, "longitude": lng}):
        setCoordinate([lng, lat])

        setArea(Math.round(Math.PI*rad*rad/10000))
        //setPerimeter(Math.round(Math.PI*2*rad/100))
    }

    const POLYGON = (item) => {
        setType("Polygon")
        const re = /\(\((.*)\)\)/;
        const coord = item.match(re)[1].split(",").map((pos) => pos.split(" "))
        const cords = coord.map((item,key) =>{ return Platform.OS == 'ios'? 
            {
                coordinates:{ 
                    "latitude":     parseFloat(item[0]),
                    "longitude":    parseFloat(item[1])
                }, id:key
            }:
            {
                coordinates:[parseFloat(item[1]),parseFloat(item[0])],
                id:key
            }})
        setCoordinates(cords)
        setCoordinate(cords[0].coordinates)
    }

    useEffect(()=>{
        if(activeGeofence){
            isCircle(activeGeofence.geofence.area) ? 
                CIRCLE(activeGeofence.geofence.area):
                POLYGON(activeGeofence.geofence.area)
        }            
    },[activeGeofence])


return(
    <Dialog
        visible={dialogVisible}
        onTouchOutside={() =>  setDialogVisible(false) } 
        dialogStyle={styles.dialogStyle} >

    <View style={styles.mainViewHeading}>
        <View style={styles.subHeadingView}>
            <Text style={styles.headingText}>{translate("View")}</Text>
            <TouchableOpacity onPress={() => setDialogVisible(false) }>
                <Image source={images.geoFence.CrossBlack} resizeMode="contain" style={styles.crossImageStyle} />
            </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{paddingHorizontal:hp(1)}}>
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
                    <Text style={styles.textStyle}>{activeGeofence && activeGeofence.geofence.description ? activeGeofence.geofence.description : '-'}</Text>
                </View>
            </View>

            <View style={styles.geoFenceDetailMainView}>
                <View style={styles.detailsMainView}>
                    <View style={styles.secondRowMainView}>
                        <View style={styles.secondRowSubView}>
                            <Text style={styles.mainTextStyle}>{translate("Colour")}</Text>
                            <View style={[styles.deviceSummaryDetailView,{backgroundColor:activeGeofence ? activeGeofence.geofence.attributes.color : ColorConstant.WHITE}]}></View>
                        </View>

                        <View style={styles.typeMainViewStyle}>
                            <Text style={styles.mainTextStyle}>{translate("Type")}</Text>
                            <Text style={styles.fontSizeStyle}>{type && type}</Text>
                        </View>

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
            </View>
        </View>

        {type ? <GeoFenceMapPreview 
            currentLocation={coordinate} 
            type={type}
            circleCoordinate={coordinate}
            radius={radius}
            polygonCoordinates={coordinates}
        /> : null }

        { !isRegular ?
        <View style={styles.buttonMainContainer}>
            <TouchableOpacity onPress={() => {
                NavigationService.navigate(SCREEN_CONSTANTS.GEOFENCE_CREATE_NEW,{
                    editingData:{ 
                        selectedArea:area,
                        type:type,
                        devices:selectedDevice,
                        name:activeGeofence.geofence.name,
                        color:activeGeofence.geofence.attributes.color,
                        description:activeGeofence.geofence.description, 
                        coordinate:coordinate,
                        radius: radius,
                        coordinates: coordinates,
                        id:activeGeofence.geofence.id
                    }})
                    setDialogVisible(false)
                }
            } style={styles.nextButton}>
                <Text style={styles.nextButtonText}>{translate("Edit")}</Text>
            </TouchableOpacity>
        </View>  : null } 
    </ScrollView>
    </View>

    </Dialog>
    )
}

const styles = StyleSheet.create({
    dialogStyle: {
        borderRadius: 15,
        backgroundColor: ColorConstant.WHITE
    },
    mainViewHeading: {
        //height: hp(80),
        width: wp(77)
    },
    subHeadingView: {
        flexDirection: 'row',
        //marginTop: hp(2),
        justifyContent: 'space-between'
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
    secondRowSubView: {
        flexDirection: 'column',
        width: '35%'
    },
    mainTextStyle: {
        color: ColorConstant.GREY,
        fontSize: hp(1.4),
        marginTop: hp(1.5),
    },
    fontSizeStyle: {
        fontSize: hp(1.4),
        color: ColorConstant.BLACK,
        marginTop: hp(1)
    },
    deviceSummaryDetailView: {
        width: hp(2.5),
        height: hp(2.5),
        backgroundColor: '#E77575',
        borderRadius: hp(0.5),
        marginTop: hp(1)
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

export default GeofenceEditDialog;