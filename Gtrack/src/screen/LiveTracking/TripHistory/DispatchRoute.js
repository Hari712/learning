import React, { useEffect, useState, useLayoutEffect, useRef } from 'react'
import { View, StyleSheet, TouchableOpacity,  Dimensions, Platform, Text } from 'react-native'
import { lineString as makeLineString } from '@turf/helpers';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import isEmpty from 'lodash/isEmpty'
import { ColorConstant } from './../../../constants/ColorConstants';
import { EndPointIcon, MarkerIcon, StartPointIcon, LocationOrangeIcon } from '../../../component/SvgComponent'
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

const DispatchRoute = ({ navigation, route }) => {
    const { item } = route.params

    console.log("ItemRoute",item)
    // const arrCords = coords && isEmpty(coords) ? [] : coords
    // const coord = arrCords[0]
    // const latitude = parseFloat(coord && coord.coords.Lat) || 0.0
    // const longitude = parseFloat(coord && coord.coords.Lon) || 0.0
    // const region = { latitude: latitude, longitude: longitude, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA }

    // const [coordList, setCoordList] = useState([])
    const [lineString, setLineString] = useState(null)

    const mapRef = useRef()

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => null ,
        })
    }, [navigation])

    
    function renderPopup(point, title, address) {
        return(
            <Map.default.Callout 
                contentStyle={{elevation:10,borderColor:ColorConstant.WHITE,borderWidth:1,borderRadius:10}}
                title={
                    <View style={{width:wp(50),paddingHorizontal:hp(2)}}>
                        <View style={{flexDirection:'row'}}>
                            { point == 'startPoint' ? <StartPointIcon/> : <EndPointIcon/> }
                            <Text style={{paddingLeft:hp(2)}}>{title}</Text>
                        </View>
                        <Text style={{paddingLeft:hp(4)}}>{address}</Text>
                    </View>
                } 
            />
        )
    }

    function renderMapBox() {

        let tripStartCord = [item.tripStartLongitude, item.tripStartLatitude]
        let tripEndCord = [item.tripEndLongitude, item.tripEndLatitude]

        useEffect(()=>{
            if(isAndroid){
                let coordinateArray = item.tripTravelledPositions.map((coorItem)=>{return([coorItem[1],coorItem[0]])} )
                coordinateArray = [tripStartCord,...coordinateArray,tripEndCord]
                setLineString({
                    "type": "FeatureCollection",
                    "features": [
                        {
                            "type": "Feature",
                            "properties": {},
                            "geometry": {
                                "type": "LineString",
                                "coordinates": coordinateArray
                            }
                        }
                    ]
                })
            }
        },[])

        function renderStartPoint() {
            return(
                <Map.default.PointAnnotation
                    id='startPoint' 
                    coordinate={tripStartCord}
                    anchor={{x: 0.5, y: 0.5}}
                    title = {"Start"}
                >  
                    <MarkerIcon width={20} height={20} />
                    
                    {renderPopup('startPoint','Start',item.tripStartAddress)}

                </Map.default.PointAnnotation>
            )
        }

        function renderEndPoint() {
            return(
                <Map.default.PointAnnotation
                    id='endPoint' 
                    coordinate={tripEndCord}
                    anchor={{x: 0.5, y: 0.5}}
                >
                    <LocationOrangeIcon width={30} height={30}/>

                    {renderPopup('endPoint', 'End',item.tripEndAddress)}

                </Map.default.PointAnnotation>
            )
        }

        function renderLine() {
            return(
                <Map.default.ShapeSource
                    id='route'
                    shape={lineString}>
                    <Map.default.LineLayer
                        id='lineroute'
                        style={{
                            lineCap: 'round',
                            lineWidth: 5,
                            lineOpacity: 0.8,
                            lineColor: ColorConstant.ORANGE,
                        }}
                    />
                </Map.default.ShapeSource>
            )
        }

        return (
            <Map.default.MapView style={{ flex: 1 }}>
                <Map.default.UserLocation
                    renderMode='normal'
                    visible={true}
                    showsUserHeadingIndicator={true}
                />
                <Map.default.Camera
                    zoomLevel={14}
                    centerCoordinate={tripStartCord}
                />
                {renderStartPoint()}
                {renderEndPoint()}
                {!isEmpty(lineString) ? renderLine(): null}
                
                
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
                    strokeColor={"red"} // fallback for when `strokeColors` is not supported by the map-provider
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
                }
                )}
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

export default DispatchRoute