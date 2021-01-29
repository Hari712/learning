import { map, set } from 'lodash';
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native'
import isEmpty from 'lodash/isEmpty'
import GetLocation from 'react-native-get-location'
const { width, height } = Dimensions.get('window');

const isAndroid = Platform.OS === 'android'
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.1;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = Platform.select({
    ios: () => require('react-native-maps'),
    android: () => require('@react-native-mapbox-gl/maps')
})();

const GeoFencePolyGon = () => {

    const [region, setRegion] = useState()

    const [isEditing, setIsEditing] = useState(false)

    const [isScrollEnabled, setIsScrollEnabled] = useState(true)

    const [selectedCoordinates, setSelectedCoordinates] = useState([])


    useEffect(() => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                const { latitude, longitude } = location
                const initialRegion = { latitude: latitude, longitude: longitude, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA }
                setRegion(initialRegion)
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
    }, [])


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
                        strokeColor="#F00"
                        fillColor="rgba(255,0,0,0.5)"
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
                    <Map.default.FillLayer id="areaPolygon" style={{ fillOpacity: 0.5 }} />
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
                    {!isEmpty(selectedCoordinates) ? renderCoordinates() : null}
                    {!isEmpty(selectedCoordinates) && selectedCoordinates.length > 2 ? renderPolygon() : null}
                </Map.default.MapView>
            </>
        )
    }

    function renderButton() {
        return (
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => setIsEditing(prevState => !prevState)}
                    style={[styles.bubble, styles.button]}
                >
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