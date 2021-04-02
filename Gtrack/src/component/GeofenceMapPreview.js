import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Platform, Dimensions, Text } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ColorConstant } from '../constants/ColorConstants';
import { useSelector } from 'react-redux'
import { isUserLoggedIn } from '../screen/Selector'
import GetLocation from 'react-native-get-location'
const { width, height } = Dimensions.get('window');
import circle from '@turf/circle'
import { FontSize } from '.';
import { PinIcon } from './SvgComponent';
import { translate } from '../../App';

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 30;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const isAndroid = Platform.OS === 'android'

const Map = Platform.select({
    ios: () => require('react-native-maps'),
    android: () => require('@react-native-mapbox-gl/maps')
})();

const GeoFenceMapPreview = (props) => {

    const { currentLocation, type, circleCoordinate, radius, polygonCoordinates } = props

    const [region, setRegion] = useState()

    const [regionAndroid, setRegionAndroid] = useState()

    const isScrollEnabled = false

    useEffect(() => { 
        if(currentLocation) {
            const initialRegion = Platform.OS == 'ios' ?  { latitude: currentLocation.latitude, longitude: currentLocation.longitude, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA } : null
            setRegion(initialRegion)
            setRegionAndroid(currentLocation)
            
        }else{
            GetLocation.getCurrentPosition({
                enableHighAccuracy: false,
                timeout: 15000,
            })
                .then(location => {
                    const { latitude, longitude } = location     
                    const initialRegion = { latitude: latitude, longitude: longitude, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA }
                    setRegion(initialRegion)
                    setRegionAndroid([longitude, latitude])
                })
                .catch(error => {
                    const { code, message } = error;
                    console.warn(code, message);
                })
        }
        
    }, [currentLocation])

    function renderAppleMap() {

        function renderMainCoordinate() {
            return (
                <Map.default.Marker
                    coordinate={currentLocation}
                />
            )
        }

        function renderAppleMapCircle() {
            return (
                <Map.default.Circle
                    center={circleCoordinate}
                    radius={1000*radius}
                    fillColor="rgba(255, 0, 0, 0.4)"
                    strokeColor="rgba(255,0,0,0.6)"
                    strokeWidth={2}
                />
            )
        }

        function renderApplePolygonCoordinates() {
            return (
                <>
                    {polygonCoordinates.map(coordInfo => (
                        <Map.default.Marker
                            key={coordInfo.id.toString()}
                            coordinate={coordInfo.coordinates}
                        />
                    ))}
                </>
            )
        }


        function renderApplePolyGon() {
            const arrCoordinates = polygonCoordinates.map((item, index) => item.coordinates)
            return (
                <>
                    <Map.default.Polygon
                        coordinates={arrCoordinates}
                        strokeColor="#F00"
                        fillColor="rgba(255,0,0,0.5)"
                        strokeWidth={1}
                    />
                </>
            )
        }

        return (
            <View style={StyleSheet.absoluteFillObject}>
                <Map.default style={StyleSheet.absoluteFillObject} scrollEnabled={isScrollEnabled} showsUserLocation={true} initialRegion={region} scrollEnabled={isScrollEnabled} >
                    {type == 'Circle' ? renderMainCoordinate() : renderApplePolygonCoordinates()}
                    {type == 'Circle' ? renderAppleMapCircle() : renderApplePolyGon()}
                </Map.default>
            </View>
        )
    }

    function renderMapBox() {

        function renderMapBoxCircle() {
            return (
                <Map.default.ShapeSource
                    id="areaCircle"
                    shape={{
                        "type": "FeatureCollection",
                        "features": [
                            circle(circleCoordinate, radius)
                        ]
                    }}
                >
                    <Map.default.FillLayer
                        id='areaCircle'
                        style={{ fillOpacity: 0.5 }} />
                </Map.default.ShapeSource>
            )
        }

        function renderMapboxPolygon() {
            const arrCoordinates = polygonCoordinates.map((item) => item.coordinates)
            return (
                <Map.default.ShapeSource
                    id="areaPolygon"
                    shape={{
                        type: "Feature",
                        properties: {},
                        geometry: {
                            type: "Polygon",
                            coordinates: [arrCoordinates]
                        }
                    }}>
                    <Map.default.FillLayer id="areaPolygon" style={{ fillOpacity: 0.5 }} />
                </Map.default.ShapeSource>
            )
        }

        function renderPolygonCoordinates() {
            return (
                <>
                    {polygonCoordinates.map((item, index) => {
                        return (
                            <Map.default.MarkerView coordinate={item.coordinates}> 
                                <View style={{backgroundColor:ColorConstant.RED,width:wp(3),height:wp(3),borderRadius:5}} />
                            </Map.default.MarkerView>
                            
                            // <Map.default.PointAnnotation
                            //     id={item.id.toString()}
                            //     coordinate={item.coordinates}
                            //     key={index}
                            // >
                            // </Map.default.PointAnnotation>
                        )
                    })}
                </>
            )
        }

        function renderMainCoordinate() {
            return (
                <Map.default.PointAnnotation
                    id={"1asdfrtyg"}
                    coordinate={currentLocation}
                    key={12}
                >
                </Map.default.PointAnnotation>
            )
        }

        return (
            <>
                <Map.default.MapView style={{ flex: 1 }} scrollEnabled={false}>
                    <Map.default.UserLocation
                        renderMode='normal'
                        visible={true}
                        showsUserHeadingIndicator={true}
                        animated={true}
                    />
                    <Map.default.Camera
						centerCoordinate={regionAndroid}
						// followUserLocation={true}
						zoomLevel={type == 'Circle' ? 2 : 3}
					/>
                    {type == 'Circle' ? renderMainCoordinate() : renderPolygonCoordinates()}
                    {type == 'Circle' ? renderMapBoxCircle() : renderMapboxPolygon()}
                </Map.default.MapView>
            </>
        )
    }

    return (

        <View style={styles.popUpCardContainer}>
            <View style={styles.titleViewStyle}>
                <Text style={styles.titleTextStyle}>{translate("Location")}</Text>
                <PinIcon width={12.652} height={16.982} resizeMode='contain'/>
            </View>

            <View style={styles.lineStyle} />

            <View style={styles.mapViewMainView}>
                <View style={styles.container}>
                    {isAndroid ? renderMapBox() : renderAppleMap()}
                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:ColorConstant.GREY
    },
    sliderContainer: {
        width: '100%',
        position: 'absolute',
        backgroundColor: ColorConstant.WHITE,
        bottom: hp(1),
        paddingHorizontal: hp(2)
    },
    sliderSubView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    radiusTextSize: {
        color: '#B5B5B5',
        fontSize: hp(1.4),
        paddingTop: hp(1),
        marginLeft: wp(3)
    },
    radiusMainView: {
        flexDirection: 'row',
        paddingTop: hp(1),
        marginRight: wp(3)
    },
    textStyleInfo: {
        fontSize: hp(1.4),
        lineHeight: 20,
        color: ColorConstant.ORANGE
    },
    otherTextStyle: {
        fontSize: hp(1.4),
        lineHeight: 15,
        color: ColorConstant.ORANGE
    },
    sliderView: {
        marginLeft: 10,
        marginRight: 10,
        alignItems: "stretch",
        justifyContent: "center"
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
    bubble: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
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
})

export default GeoFenceMapPreview
