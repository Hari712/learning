import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, Dimensions } from 'react-native'
import isEmpty from 'lodash/isEmpty'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ColorConstant } from '../../../constants/ColorConstants';
import { translate } from '../../../../App'
import Slider from "react-native-slider";
import { useSelector } from 'react-redux'
import { isUserLoggedIn } from '../../Selector'
import GetLocation from 'react-native-get-location'
const { width, height } = Dimensions.get('window');
import circle from '@turf/circle'
import { BackIcon, NextIcon } from '../../../component/SvgComponent';
import { SCREEN_CONSTANTS } from '../../../constants/AppConstants';
import useSubscribeLocationUpdates from '../../../utils/useSubscribeLocationUpdates';

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.09;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const isAndroid = Platform.OS === 'android'

const Map = Platform.select({
    ios: () => require('react-native-maps'),
    android: () => require('@react-native-mapbox-gl/maps')
})();

const GeoFenceCircle = ({navigation,route}) => {

    const { devices } = route.params

    const { isLoggedIn } = useSelector(state => ({
        isLoggedIn: isUserLoggedIn(state)
    }))

    const [region, setRegion] = useState()
    const [regionAndroid, setRegionAndroid] = useState()
    const [isEditing, setIsEditing] = useState(false)
    const [completeEditing, setCompleteEditing] = useState(false)
    const [isScrollEnabled, setIsScrollEnabled] = useState(true)
    const [selectedCoordinate, setSelectedCoordinate] = useState(null)
    const [area, setArea] = useState('')
    const [radius, setRadius] = useState(500.001)
    const [value, setValue] = useState(0.3);
    const [oldData, setOldData] = useState()
    const location = useSubscribeLocationUpdates(isLoggedIn)

    useEffect(()=>{
        if(selectedCoordinate) {
            if(!isAndroid) {
                let delta = radius/10000
                const region = { 
                    latitude: selectedCoordinate.latitude, 
                    longitude: selectedCoordinate.longitude, 
                    latitudeDelta: delta, 
                    longitudeDelta: delta*ASPECT_RATIO
                } 
                setRegion(region)
            }
        }
    },[radius])

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={styles.headerTitle}>
                    {route.params ? "Edit Circle" : "Create Circle"}
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
                <TouchableOpacity disabled={!(area && (isAndroid ? selectedCoordinate[0]:selectedCoordinate))}  style={{marginRight:hp(2)}} onPress={() => navigation.navigate(SCREEN_CONSTANTS.GEOFENCE_DETAILS, { selectedArea: area, type: 'Circle', devices: devices, editingData:oldData })}>
                    <Text style={{color:area && (isAndroid? selectedCoordinate[0]:selectedCoordinate)  ? ColorConstant.BLACK:ColorConstant.DARKGREY}}>Next</Text>
                </TouchableOpacity>
            )
        });
    }, [navigation,area,oldData,selectedCoordinate]);

    useEffect(() => { 
        if(route.params && route.params.editingData) {
            const { editingData } = route.params
            setOldData(editingData)

            if(isAndroid){
                setRegionAndroid(editingData.coordinate)
                setSelectedCoordinate(editingData.coordinate)
                setRadius(editingData.radius)
            } else {
                const initialRegion = { latitude: editingData.coordinate.latitude, longitude: editingData.coordinate.longitude, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA } 
                setRegion(initialRegion)
                const coordinate = {latitude: editingData.coordinate.latitude, longitude: editingData.coordinate.longitude}
                setSelectedCoordinate(coordinate)
                setRadius(parseFloat(editingData.radius))
            }
            
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
        
    }, [route])

    useEffect(() => {
        if(completeEditing && selectedCoordinate){
            let tempArea = !isAndroid ?  "CIRCLE(" + selectedCoordinate.latitude + " " + selectedCoordinate.longitude + "," + radius + ")"
            : "CIRCLE(" + selectedCoordinate[1] + " " + selectedCoordinate[0] + "," + radius + ")"
            setArea(tempArea)
        } else if(oldData && selectedCoordinate){
            let tempArea = !isAndroid ?  "CIRCLE(" + selectedCoordinate.latitude + " " + selectedCoordinate.longitude + "," + radius + ")"
            : "CIRCLE(" + selectedCoordinate[1] + " " + selectedCoordinate[0] + "," + radius + ")"
            setArea(tempArea)
        } 
    }, [completeEditing,selectedCoordinate,radius, oldData])

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
            setRadius(radius)
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
                    fillColor="rgba(255, 127, 33, 0.4)"
                    strokeColor="rgba(255, 127, 33, 0.8)"
                    strokeWidth={2}
                />
            )
        }                                                          

        return (
            <View style={StyleSheet.absoluteFillObject}>
                <Map.default style={StyleSheet.absoluteFillObject} scrollEnabled={isScrollEnabled} 
                    showsUserLocation={true} 
                    initialRegion={region} 
                    region={region}
                    scrollEnabled={isScrollEnabled} 
                    onPress={(mapInfo) => onPressAppleMap(mapInfo)}>
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
                        style={{ fillOpacity: 0.5, fillColor:ColorConstant.ORANGE}} />
                    
                    <Map.default.LineLayer 
                        id='linelayer'
                        sourceLayerID='areaCirle'
                        style={{
                            lineColor:ColorConstant.ORANGE,
                            lineWidth:2
                        }}
                    />
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
                    <Map.default.Camera
						centerCoordinate={regionAndroid}
						// followUserLocation={true}
						zoomLevel={3.5}
					/>
                    {!isEmpty(selectedCoordinate) ? renderMainCoordinate() : null}
                    {!isEmpty(selectedCoordinate) ? renderMapBoxCircle() : null}
                </Map.default.MapView>
            </>
        )
    }

    function onChangeRadius(val) {
        let radius = isAndroid ? val  : val * 1000
        console.log(radius)
        setRadius(Math.round(radius))
    }

    function renderButton() {
        return (
            isAndroid ? 
                <View style={{position:"absolute", marginVertical:20}}>
                    <TouchableOpacity
                        onPress={() => {
                            isEditing ? setCompleteEditing(true) : null;
                            setIsEditing(prevState => !prevState)
                        }}
                        style={[styles.bubble, styles.button]} >
                        <Text>
                            {isEditing ? 'Finish Circle' : 'Draw Circle'}
                        </Text>
                        
                    </TouchableOpacity>
                </View>
            :
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            isEditing ? setCompleteEditing(true) : null;
                            setIsEditing(prevState => !prevState)
                        }}
                        style={[styles.bubble, styles.button]} >
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
                            <Text style={styles.textStyleInfo}>{radius} m</Text>
                            <Text style={styles.otherTextStyle}>2</Text>
                        </View>
                    </View>
                    <View style={styles.sliderView}>
                        <Slider
                            value={Platform.OS == 'android'? radius : radius/1000}
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
