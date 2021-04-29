import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native'
import isEmpty from 'lodash/isEmpty'
import GetLocation from 'react-native-get-location'
import { BackIcon, NextIcon } from '../../../component/SvgComponent';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SCREEN_CONSTANTS } from '../../../constants/AppConstants';
import { ColorConstant } from '../../../constants/ColorConstants';
import { FontSize } from '../../../component';
const { width, height } = Dimensions.get('window');

const isAndroid = Platform.OS === 'android'
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 30;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = Platform.select({
    ios: () => require('react-native-maps'),
    android: () => require('@react-native-mapbox-gl/maps')
})();

const GeoFencePolyGon = ({navigation, route}) => {

    const { devices } = route.params

    const [region, setRegion] = useState()
    const [isEditing, setIsEditing] = useState(false)
    const [isScrollEnabled, setIsScrollEnabled] = useState(true)
    const [selectedCoordinates, setSelectedCoordinates] = useState([])
    const [completeEditing, setCompleteEditing] = useState(false)
    const [area, setArea] = useState('')
    const [oldData, setOldData] = useState()
    const [regionAndroid, setRegionAndroid] = useState()
    const [color, setColor] = useState(ColorConstant.ORANGE)


    useEffect(() => {
        if(route.params && route.params.editingData) {
            const { editingData } = route.params
            setOldData(editingData)
            console.log("OldCoorniate",editingData.coordinates, editingData.coordinate)
            const initialRegion = Platform.OS == 'ios' ?  { latitude: editingData.coordinate.latitude, longitude: editingData.coordinate.longitude, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA } : null
            setRegion(initialRegion)
            setRegionAndroid(editingData.coordinate)
            setSelectedCoordinates(editingData.coordinates)
            setColor(editingData.color)
            
        } else {
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
    }, [])


    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={styles.headerTitle}>
                    Create Polygon
                </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity style={{padding:hp(2)}} onPress={() => {
                    setIsEditing(false)
                    navigation.goBack()}}>
                    <BackIcon />
                </TouchableOpacity>
            ),
            headerRight: () => (
              
                <TouchableOpacity disabled={!(area && selectedCoordinates[0])}  style={{padding:hp(2)}} onPress={() => navigation.navigate(SCREEN_CONSTANTS.GEOFENCE_DETAILS, { selectedArea: area, type: 'Polygon', devices: devices, editingData:oldData })}>
                    <Text style={{color:area && selectedCoordinates[0] ? ColorConstant.BLACK:ColorConstant.DARKGREY}}>Next</Text>
                </TouchableOpacity>
            )
        });
    }, [navigation,area,selectedCoordinates]);

    useEffect(() => {
        const cords = Object.values(selectedCoordinates).map((item)=>{
            return Platform.OS == 'ios' ? 
            item.coordinates.latitude +' '+ item.coordinates.longitude
            : item.coordinates[1] +' '+ item.coordinates[0]
        })
        if(completeEditing && selectedCoordinates){
            let tempArea = "POLYGON((" + cords + "))"
            setArea(tempArea)
        }else if(oldData && selectedCoordinates){
            let tempArea = "POLYGON((" + cords + "))"
            setArea(tempArea)
        }
    }, [completeEditing,selectedCoordinates,oldData])


    useEffect(() => {

        if (isEditing) {
            setIsScrollEnabled(false)
        } else {
            setIsScrollEnabled(true)
        }

    }, [isEditing])


    function onPressAppleMap(e) {
        if (isEditing) {
            const coordinate = e.nativeEvent.coordinate
            const index = selectedCoordinates.length
            const coordInfo = { id: index, coordinates: coordinate }
            setSelectedCoordinates(prevState => [...prevState, coordInfo])
        }
    }


    function renderAppleMap() {


        function renderCoordinates() {
            return (
                <>
                    {selectedCoordinates.map(coordInfo => (
                        <Map.default.Marker
                            key={coordInfo.id.toString()}
                            coordinate={coordInfo.coordinates}
                            //   onPress={e => console.log(e.nativeEvent)}
                            draggable={true}
                            onDragEnd={(e) => {
                                const { coordinate } = e.nativeEvent
                                setSelectedCoordinates(prevState => prevState.map((item, index) => {
                                    if (item.id == coordInfo.id) {
                                        item.coordinates = coordinate
                                        return item
                                    }
                                    return item
                                }))
                            }}
                        />
                    ))}
                </>
            )
        }


        function renderPolyGon() {
            const arrCoordinates = selectedCoordinates.map((item, index) => item.coordinates)
            return (
                <>
                    <Map.default.Polygon
                        coordinates={arrCoordinates}
                        fillColor={color}
                        strokeColor={color}
                        strokeWidth={1}
                    />
                </>
            )
        }

        return (
            <View style={StyleSheet.absoluteFillObject}>
                <Map.default style={StyleSheet.absoluteFillObject} showsUserLocation={true} initialRegion={region} scrollEnabled={isScrollEnabled} onPress={(mapInfo) => onPressAppleMap(mapInfo)}>
                    {!isEmpty(selectedCoordinates) ? renderCoordinates() : null}
                    {!isEmpty(selectedCoordinates) ? renderPolyGon() : null}
                </Map.default>
            </View>
        )
    }

    function onPressMapBox(mapInfo) {
        if (isEditing) {
            const { geometry } = mapInfo
            const coordinates = geometry.coordinates
            const index = selectedCoordinates.length
            const coordInfo = { id: index, coordinates: coordinates }
            setSelectedCoordinates(prevState => [...prevState, coordInfo])
        }
    }

    function renderMapBox() {

        function renderCoordinates() {
            return (
                <>
                    {selectedCoordinates.map((item, index) => {
                        return (
                            <Map.default.PointAnnotation
                                id={item.id.toString()}
                                draggable
                                coordinate={item.coordinates}
                                key={index}
                                onDragEnd={(e) => {
                                    const { coordinates } = e.geometry
                                    console.log('Event Coordinate',e)
                                    setSelectedCoordinates(prevState => prevState.map((coordInfo, index) => {
                                        if (item.id == coordInfo.id) {
                                            coordInfo.coordinates = coordinates
                                            return coordInfo
                                        }
                                        return coordInfo
                                    }))
                                }}
                            >
                            </Map.default.PointAnnotation>
                        )
                    })}
                </>
            )
        }

        function renderPolygon() {
            const arrCoordinates = selectedCoordinates.map((item) => item.coordinates)
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
                    <Map.default.FillLayer id="areaPolygon" style={{ fillOpacity: 0.5,fillColor:color }} />
                    <Map.default.LineLayer 
                        id='linelayer'
                        sourceLayerID='areaPoly'
                        style={{
                            lineColor:color,
                            lineWidth:2
                        }}
                    />
                </Map.default.ShapeSource>
            )
        }

        return (
            <>
                <Map.default.MapView style={{ flex: 1 }} onPress={(mapInfo) => onPressMapBox(mapInfo)}>
                    <Map.default.UserLocation
                        renderMode='normal'
                        visible={true}
                        showsUserHeadingIndicator={true}
                        animated={true}
                    />
                    <Map.default.Camera
						centerCoordinate={regionAndroid}
						// followUserLocation={true}
						zoomLevel={3.5}
					/>
                    {!isEmpty(selectedCoordinates) ? renderCoordinates() : null}
                    {!isEmpty(selectedCoordinates) && selectedCoordinates.length > 2 ? renderPolygon() : null}
                </Map.default.MapView>
            </>
        )
    }

    function renderButton() {
        return (
            isAndroid ? 
                <View style={{position:"absolute", marginVertical:20}}>
                    <TouchableOpacity
                        onPress={() => {
                            isEditing ? setCompleteEditing(true) && selectedCoordinates[0] : null;
                            setIsEditing(prevState => {if(prevState == false) {
                                return true
                            }else{
                                return selectedCoordinates[0]? false : true
                            }})
                        }}
                        style={[styles.bubble, styles.button]} >
                        <Text style={{fontSize:FontSize.FontSize.small}}>
                            {isEditing ? 'Finish\nPolygon' : 'Draw\nPolygon'}
                        </Text>
                        
                    </TouchableOpacity>
                </View>
            :
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            isEditing ? setCompleteEditing(true) && selectedCoordinates.latitute : null;
                            setIsEditing(prevState => {if(prevState == false) {
                                return true
                            }else{
                                return selectedCoordinates.latitute ? false : true
                            }})
                        }}
                        style={[styles.bubble, styles.button]} >
                        <Text>
                            {isEditing ? 'Finish Polygon' : 'Draw Polygon'}
                        </Text>
                        
                    </TouchableOpacity>
                </View>
        )
    }


    return (
        <View style={styles.container}>
            {isAndroid ? renderMapBox() : renderAppleMap()}
            {renderButton()}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
    }
})

export default GeoFencePolyGon