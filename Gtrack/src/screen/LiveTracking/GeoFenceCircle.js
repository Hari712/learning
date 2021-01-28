import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, Dimensions } from 'react-native'
import isEmpty from 'lodash/isEmpty'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ColorConstant } from '../../constants/ColorConstants';
import { translate } from '../../../App'
import Slider from "react-native-slider";
import { useSelector } from 'react-redux'
import { isUserLoggedIn } from '../Selector'
import GetLocation from 'react-native-get-location'
const { width, height } = Dimensions.get('window');
import circle from '@turf/circle'
import { map } from 'lodash';

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.1;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const isAndroid = Platform.OS === 'android'

const Map = Platform.select({
    ios: () => require('react-native-maps'),
    android: () => require('@react-native-mapbox-gl/maps')
})();

const GeoFenceCircle = () => {

    const { isLoggedIn } = useSelector(state => ({
        isLoggedIn: isUserLoggedIn(state)
    }))

    const [region, setRegion] = useState()

    const [isEditing, setIsEditing] = useState(false)

    const [isScrollEnabled, setIsScrollEnabled] = useState(true)

    const [selectedCoordinate, setSelectedCoordinate] = useState(null)

    const [radius, setRadius] = useState(500)

    const [value, setValue] = useState(0.3);


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
            setSelectedCoordinate(e.nativeEvent.coordinate)
            setRadius(50)
        }
    }


    function renderAppleMap() {

        function renderMainCoordinate() {
            return (
                <Map.default.Marker
                    coordinate={selectedCoordinate}
                    draggable
                />
            )
        }

        function renderAppleMapCircle() {
            return (
                <Map.default.Circle
                    center={selectedCoordinate}
                    radius={radius}
                    fillColor="rgba(255, 0, 0, 0.4)"
                    strokeColor="rgba(0,0,0,0.5)"
                    strokeWidth={2}
                />
            )
        }

        function onPanDragMap(e) {
            console.log(e)
        }

        return (
            <View style={StyleSheet.absoluteFillObject}>
                <Map.default style={StyleSheet.absoluteFillObject} scrollEnabled={isScrollEnabled} showsUserLocation={true} initialRegion={region} scrollEnabled={isScrollEnabled} onPress={(mapInfo) => onPressAppleMap(mapInfo)}>
                    {!isEmpty(selectedCoordinate) ? renderMainCoordinate() : null}
                    {!isEmpty(selectedCoordinate) ? renderAppleMapCircle() : null}
                </Map.default>
            </View>
        )
    }

    function onPressMapBox(mapInfo) {
        if (isEditing) {
            console.log(mapInfo)
            const { geometry } = mapInfo
            const coordinates = geometry.coordinates
            setSelectedCoordinate(coordinates)
        }
    }

    function renderMapBox() {

        // let coordinate = []
        // if (!isEmpty(selectedCoordinate)) {
        //     coordinate.push(selectedCoordinate.longitude)
        //     coordinate.push(selectedCoordinate.latitude)
        // }
        
        let options = { steps: 50, units: 'kilometers', properties: { foo: 'bar' } };


        function renderMapBoxCircle() {
            return (
                <Map.default.ShapeSource
                    id="areaCircle"
                    shape={{
                        "type": "FeatureCollection",
                        "features": [
                            circle(selectedCoordinate, radius)
                        ]
                    }}
                >
                    <Map.default.FillLayer
                        id='areaCircle'
                        style={{ fillOpacity: 0.5 }} />
                </Map.default.ShapeSource>
            )
        }

        function renderMainCoordinate() {
            return (
                <Map.default.PointAnnotation
                    id={"1asdfrtyg"}
                    coordinate={selectedCoordinate}
                    key={12}
                >
                </Map.default.PointAnnotation>
            )
        }

        return (
            <>
                <Map.default.MapView style={{ flex: 1 }}  onPress={(mapInfo) => onPressMapBox(mapInfo)}>
                    <Map.default.UserLocation
                        renderMode='normal'
                        visible={true}
                        showsUserHeadingIndicator={true}
                        animated={true}
                    />
                    {!isEmpty(selectedCoordinate) ? renderMainCoordinate() : null}
                    {!isEmpty(selectedCoordinate) ? renderMapBoxCircle() : null}
                </Map.default.MapView>
            </>
        )
    }

    function onChangeRadius(val) {
        let radius = isAndroid ? val  : val / 1000
        console.log(radius)
        setRadius(Math.round(radius))
    }

    function renderButton() {
        return (
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => setIsEditing(prevState => !prevState)}
                    style={[styles.bubble, styles.button]}
                >
                    <Text>
                        {isEditing ? 'Finish Circle' : 'Draw Circle'}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function renderSlider() {
        if (isEditing && selectedCoordinate) {
            return (
                <View style={styles.sliderContainer}>
                    <View style={styles.sliderSubView}>
                        <Text style={styles.radiusTextSize}>{translate("Geofence_CreateNew_string3")}</Text>
                        <View style={styles.radiusMainView}>
                            <Text style={styles.textStyleInfo}>400m</Text>
                            <Text style={styles.otherTextStyle}>2</Text>
                        </View>
                    </View>
                    <View style={styles.sliderView}>
                        <Slider
                            value={value}
                            onValueChange={(value) => onChangeRadius(value)}
                            minimumValue={0.5}
                            maximumValue={1000}
                            step={1}
                            minimumTrackTintColor={ColorConstant.BLUE}
                            maximumTrackTintColor={ColorConstant.BLUE}
                            thumbTintColor={ColorConstant.ORANGE}
                            trackStyle={{ height: '16%', borderRadius: 3 }}
                        />
                    </View>
                </View>
            )
        } else {
            return null
        }
    }

    return (
        <View style={styles.container}>
            {isAndroid ? renderMapBox() : renderAppleMap()}
            {renderButton()}
            {renderSlider()}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
    }
})

export default GeoFenceCircle