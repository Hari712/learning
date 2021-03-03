import React, { useEffect, useState, useLayoutEffect, useRef } from 'react'
import { View, StyleSheet, TouchableOpacity,  Dimensions, Platform } from 'react-native'
import { lineString as makeLineString } from '@turf/helpers';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import isEmpty from 'lodash/isEmpty'
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.9;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };
const isAndroid = Platform.OS === 'android'

const Map = Platform.select({
    ios: () => require('react-native-maps'),
    android: () => require('@react-native-mapbox-gl/maps')
})();

const TripHistoryMapView = ({ navigation }) => {

    // const { data, coords } = route.params
    // const arrCords = isEmpty(coords) ? [] : coords
    // const coord = arrCords[0]
    // const latitude = parseFloat(coord.coords.Lat) || 0.0
    // const longitude = parseFloat(coord.coords.Lon) || 0.0
    // const region = { latitude: latitude, longitude: longitude, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA }

    const arrInitialCoord = arrCords.map((item, index) => {
        const latitude = parseFloat(item.coords.Lat) || 0.0
        const longitude = parseFloat(item.coords.Lon) || 0.0
        let arr = []
        arr.push(longitude)
        arr.push(latitude)
        return arr
    })
    const [coordList, setCoordList] = useState([])
    const [lineString, setLineString] = useState(null)

    const mapRef = useRef()

    const dispatch = useDispatch()
    const backArrowprop = {
        marginRight: hp(3), width: hp(3.5), height: hp(3.5)
    } 
  

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Dispatch Route',
            headerTitleAlign: 'center',
            headerRight: () => null,
            headerLeft: () => (
                <View style={{ flexDirection: 'row', paddingLeft: wp(3) }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <SvgGoBackArrow { ...backArrowprop }/>
                    </TouchableOpacity>
                </View>
            )
        });
        return () => {

        };
    }, [navigation])

    function onSuccess(data) {
        NotificationMessage.hideLoader()
        processCoordinates(data)
        console.log('Route Data', data)
    }

    function processCoordinates(data) {
        const arr = Array.isArray(data) ? data : []

        if (isAndroid) {
            setCoordList(arr)
            let line = makeLineString(arr);
            setLineString(line)
        } else {
            const arrCoords = arr.map((item, index) => {
                const routeArr = item
                return {
                    'latitude': routeArr[1],
                    'longitude': routeArr[0]
                }
            })
            setCoordList(arrCoords)
            mapRef && mapRef.current && mapRef.current.fitToCoordinates(arrCoords, {
                edgePadding: DEFAULT_PADDING,
                animated: true,
            });
        }
    }

    function onError(error) {
        NotificationMessage.hideLoader()
    }

    function renderMapBox() {
        return (
            <Map.default.MapView style={{ flex: 1 }}>
                <Map.default.UserLocation
                    renderMode='normal'
                    visible={true}
                    showsUserHeadingIndicator={true}
                />
                <Map.default.Camera
                    zoomLevel={3}
                    bounds={{
                        ne: arrInitialCoord[0],
                        sw: arrInitialCoord[arrInitialCoord.length - 1],
                    }}
                />
                {!isEmpty(lineString) ? <Map.default.ShapeSource
                    id='route'
                    shape={lineString}>
                    <Map.default.LineLayer
                        id='lineroute'
                        style={{
                            lineCap: 'round',
                            lineWidth: 3,
                            lineOpacity: 0.84,
                            lineColor: ColorConstant.orange,
                        }}
                    />
                </Map.default.ShapeSource> : null}
                {arrCords.map((item, index) => {
                    const title = item.isPickUp ? 'Pick Up' : 'Drop Off'
                    const address = `${item.startAddressLineOne || ''}, ${item.startCity || ''}, ${item.startProvince || ''} ${item.startCountry || ''}`
                    const latitude = parseFloat(item.coords.Lat) || 0.0
                    const longitude = parseFloat(item.coords.Lon) || 0.0
                    let coordinate = []
                    coordinate.push(longitude)
                    coordinate.push(latitude)
                    return (
                        <Map.default.PointAnnotation
                            id={index.toString()}
                            coordinate={coordinate}
                            title={title}
                        >
                            <Map.default.Callout title={address} />
                        </Map.default.PointAnnotation>
                    )
                })}

            </Map.default.MapView>
        )
    }

    function renderAppleMap() {
        return (
            <Map.default
                style={styles.mapContainer}
                ref={mapRef}
                region={region}
                showsUserLocation={true}
            // onLayout={() => mapRef.fitToCoordinates(coordList, { edgePadding: { top: 10, right: 10, bottom: 10, left: 10 }, animated: false })}
            >
                <Map.Polyline
                    coordinates={coordList}
                    strokeColor={ColorConstant.orange} // fallback for when `strokeColors` is not supported by the map-provider
                    strokeWidth={3}
                />
                {arrCords.map((item, index) => {
                    const title = item.isPickUp ? 'Pick Up' : 'Drop Off'
                    const address = `${item.startAddressLineOne || ''}, ${item.startCity || ''}, ${item.startProvince || ''} ${item.startCountry || ''}`
                    const latitude = parseFloat(item.coords.Lat) || 0.0
                    const longitude = parseFloat(item.coords.Lon) || 0.0
                    const coordinate = { latitude: latitude, longitude: longitude }
                    return (
                        <Map.Marker
                            coordinate={coordinate}
                            title={title}
                            description={address}
                        />)
                })}
            </Map.default>
        )
    }

    return (
        <View style={styles.container}>
            {isAndroid ? renderMapBox() : renderAppleMap()}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
    }
})

export default TripHistoryMapView