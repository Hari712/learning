import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, Dimensions } from 'react-native'
import isEmpty from 'lodash/isEmpty'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ColorConstant } from '../../../constants/ColorConstants';
import { translate } from '../../../../App'
import Slider from "react-native-slider";
import { useSelector } from 'react-redux'
import { isUserLoggedIn,getLiveTrackingDeviceList} from '../../Selector'
import GetLocation from 'react-native-get-location'
const { width, height } = Dimensions.get('window');
import AppManager from '../../../constants/AppManager'
import circle from '@turf/circle'
import { BackIcon, NextIcon } from '../../../component/SvgComponent';
import { MAP_BOX_STYLEURL, rasterSourceProps, SCREEN_CONSTANTS } from '../../../constants/AppConstants';
import useSubscribeLocationUpdates from '../../../utils/useSubscribeLocationUpdates';
import round from 'lodash';

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.09;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const isAndroid = Platform.OS === 'android'

const Map = Platform.select({
    ios: () => require('react-native-maps'),
    android: () => require('@rnmapbox/maps')
})();

const GeoFenceCircle = ({navigation,route}) => {

    const { devices, editedType } = route.params

    const { isLoggedIn,devicePositions } = useSelector(state => ({
        devicePositions: getLiveTrackingDeviceList(state),
        isLoggedIn: isUserLoggedIn(state)
    }))

    const [region, setRegion] = useState()
    const [regionAndroid, setRegionAndroid] = useState()
    const [isEditing, setIsEditing] = useState(false)
    const [completeEditing, setCompleteEditing] = useState(false)
    const [isScrollEnabled, setIsScrollEnabled] = useState(true)
    const [selectedCoordinate, setSelectedCoordinate] = useState(null)
    const [area, setArea] = useState('')
    const [radius, setRadius] = useState(100)
    const [value, setValue] = useState(0.5);
    const [oldData, setOldData] = useState()
    const location = useSubscribeLocationUpdates(isLoggedIn)
    const [color, setColor] = useState(ColorConstant.ORANGE)
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
    },[])

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
                    {route.params.editingData ? "Edit Circle" : "Create Circle"}
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
        if(route.params && route.params.editingData && editedType) {
            const { editingData } = route.params
            setOldData(editingData)
            setColor(editingData.color)
        }
        if(route.params && route.params.editingData && !editedType) {
            const { editingData } = route.params
            setOldData(editingData)
            setColor(editingData.color)

            if(isAndroid){
                setRegionAndroid(editingData.coordinate)
                setSelectedCoordinate(editingData.coordinate)
                setRadius(parseFloat(editingData.radius))
                // setValue(editingData.radius ? parseFloat(editingData.radius) : 0.5)
            } else {
                const initialRegion = { latitude: editingData.coordinate.latitude, longitude: editingData.coordinate.longitude, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA } 
                setRegion(initialRegion)
                const coordinate = {latitude: editingData.coordinate.latitude, longitude: editingData.coordinate.longitude}
                setSelectedCoordinate(coordinate)
                setRadius(parseFloat(editingData.radius))
                // setValue(editingData.radius ? parseFloat(editingData.radius) : 0.5)
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

    useEffect( () => {
      
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
                    fillColor={color}
                    strokeColor={color}
                    // fillColor="rgba(255, 127, 33, 0.4)"
                    // strokeColor="rgba(255, 127, 33, 0.8)"
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
                            circle(selectedCoordinate, radius/1000)
                        ]
                    }}
                >
                    <Map.default.FillLayer
                        id='areaCircle'
                        style={{ fillOpacity: 0.5, fillColor:color}} />
                    
                    <Map.default.LineLayer 
                        id='linelayer'
                        sourceLayerID='areaCirle'
                        style={{
                            lineColor:color,
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
                <Map.default.MapView style={{ flex: 1 }}  onPress={(mapInfo) => onPressMapBox(mapInfo)} attributionEnabled={false} logoEnabled={false} rotateEnabled={false} styleURL={MAP_BOX_STYLEURL}>
                    <Map.default.UserLocation
                        renderMode='normal'
                        visible={true}
                        showsUserHeadingIndicator={true}
                        animated={true}
                    />
                  
                    {regionAndroid ?
						  <Map.default.Camera
                          animationMode='flyTo'
                          animationDuration={5000}
                          zoomLevel={17}
                          centerCoordinate={regionAndroid}
                          // followUserLocation={true}
                        //   zoomLevel={3.5}
                      /> : 
						<Map.default.Camera 
							zoomLevel={3.5}
							centerCoordinate={[79.570507, 22.385092]}
						/> }
                    {!isEmpty(selectedCoordinate) ? renderMainCoordinate() : null}
                    {!isEmpty(selectedCoordinate) ? renderMapBoxCircle() : null}
                    <Map.default.RasterSource {...rasterSourceProps}>
						<Map.default.RasterLayer
							id="googleMapLayer"
							sourceID="googleMapSource"
							// style={{rasterOpacity: 0.5}}
					
							layerIndex={0}
						/>
					</Map.default.RasterSource>	
                </Map.default.MapView>
            </>
        )
    }

    function onChangeRadius(val) {
        let rad = val * 1000
        console.log("Radius",rad)
        setRadius(rad)
    }

    function renderButton() {
        return (
            isAndroid ? 
                <View style={{position:"absolute", marginVertical:20}}>
                    <TouchableOpacity
                        onPress={() => {
                            isEditing ? setCompleteEditing(true) : false;
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
                            isEditing ? setCompleteEditing(true) : false;
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
console.log('isEditingisEditingisEditingisEditing',isEditing,selectedCoordinate)
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
                            value={radius/1000}
                            onValueChange={(value) => onChangeRadius(value)}
                            minimumValue={0.1}
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
    function mapOverlayContainer() {
        return ( <>
         {!isEditing && isEmpty(selectedCoordinate) ? <View style={{flex: 1,
                position: 'absolute',
                left: 0,
                top: 0,
                opacity: 0.5,
                backgroundColor: 'black',
                width: wp(100), 
                height: hp(100),
                }} /> : null}
            {isEditing && isEmpty(selectedCoordinate) ? 
                 <View style={{flex: 1,
                        position: 'absolute',
                        marginTop: hp(10),
                        alignSelf: 'center',
                        opacity: 0.5,
                        backgroundColor: ColorConstant.OVERLAY_BG,
                        borderRadius: hp(25),
                        width: wp(50), 
                        height: hp(5),
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}> 
                    <Text style={{color: ColorConstant.BLACK, fontSize: 20, fontWeight: 'bold'}}>Tap to Draw</Text> 
                </View> : null}
            </>
        );
    }

    return (
        <View style={styles.container}>
            {isAndroid ? renderMapBox() : renderAppleMap()}
                {mapOverlayContainer()}
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
