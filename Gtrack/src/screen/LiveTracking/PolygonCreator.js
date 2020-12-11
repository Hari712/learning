import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native'
import MapView, { MAP_TYPES, Polygon, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps'

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

const regionInfo = {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
}

const GeoFenceCreator = ({ naviagtion }) => {

    const [region, setRegion] = useState(regionInfo)
    const [polygons, setPolyGons] = useState([])
    const [editing, setEditing] = useState(null)
    const [creatingHole, setCreatingHole] = useState(false)
    const mapOptions = {
        scrollEnabled: true,
    }
    useEffect(() => {

        if (editing) {
            mapOptions.scrollEnabled = false;
            mapOptions.onPanDrag = e => onPress(e);
        }

    }, [editing])


    function finish() {
        setPolyGons([...polygons, editing])
        setEditing(null)
        setCreatingHole(false)
    }

    function createHole() {
        if (!creatingHole) {
            setCreatingHole(true)
            setEditing({
                ...editing,
                holes: [...editing.holes, []],
            })
        } else {
            const holes = [...editing.holes];
            if (holes[holes.length - 1].length === 0) {
                holes.pop();
                setEditing({ ...editing, holes })
            }
            setCreatingHole(false)
        }

    }

    function onPress(e) {
        if (!editing) {
            setEditing({
                id: id++,
                coordinates: [e.nativeEvent.coordinate],
                holes: [],
            })
        }
        else if (!creatingHole) {
            setEditing({
                ...editing,
                coordinates: [...editing.coordinates, e.nativeEvent.coordinate],
            })
        }
        else {
            const holes = [...editing.holes];
            holes[holes.length - 1] = [
                ...holes[holes.length - 1],
                e.nativeEvent.coordinate,
            ];
            setEditing({
                ...editing,
                id: id++, // keep incrementing id to trigger display refresh
                coordinates: [...editing.coordinates],
                holes,
            })

        }
    }

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_DEFAULT}
                style={styles.map}
                mapType={MAP_TYPES.STANDARD}
                initialRegion={region}
                onPress={e => onPress(e)}
                {...mapOptions}
            >
                {polygons.map((polygon) => {
                    return (
                        <Polygon
                            key={polygon.id}
                            coordinates={polygon.coordinates}
                            holes={polygon.holes}
                            strokeColor="#F00"
                            fillColor="rgba(255,0,0,0.5)"
                            strokeWidth={1}
                        />
                    )
                })}
                {editing && (<Polygon
                    key={editing.id}
                    coordinates={editing.coordinates}
                    holes={editing.holes}
                    strokeColor="#000"
                    fillColor="rgba(255,0,0,0.5)"
                    strokeWidth={1}
                />)}
            </MapView>
            <View style={styles.buttonContainer}>
                {editing && (
                    <TouchableOpacity
                        onPress={() => createHole()}
                        style={[styles.bubble, styles.button]}
                    >
                        <Text>
                            {creatingHole ? 'Finish Hole' : 'Create Hole'}
                        </Text>
                    </TouchableOpacity>
                )}
                {editing && (
                    <TouchableOpacity
                        onPress={() => finish()}
                        style={[styles.bubble, styles.button]}
                    >
                        <Text>Finish</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    bubble: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    latlng: {
        width: 200,
        alignItems: 'stretch',
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    }
})

export default GeoFenceCreator