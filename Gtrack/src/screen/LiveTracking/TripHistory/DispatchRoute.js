import React, { useEffect, useState, useLayoutEffect, useRef } from 'react'
import { View, StyleSheet, Dimensions, Platform, Text, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import isEmpty from 'lodash/isEmpty'
import { ColorConstant } from './../../../constants/ColorConstants';
import { EndPointIcon, MarkerIcon, StartPointIcon, LocationOrangeIcon, BackIcon } from '../../../component/SvgComponent'
import { FontSize } from '../../../component';
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.08;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const isAndroid = Platform.OS === 'android'

const Map = Platform.select({
    ios: () => require('react-native-maps'),
    android: () => require('@react-native-mapbox-gl/maps')
})();

const DispatchRoute = ({ navigation, route }) => {

    const { item } = route.params

    const [lineString, setLineString] = useState(null)

    const mapRef = useRef()

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         header: () => null ,
    //     })
    // }, [navigation])
    console.log('DispatchRoute', item)
    useLayoutEffect(() => {

        navigation.setOptions({
            headerTitle: () => (
                <Text style={{
                    color: ColorConstant.GREY,
                    fontSize: FontSize.FontSize.medium,
                    fontWeight: '500',
                    //letterSpacing: 0,
                    textAlign:'center' }}>
                    {item.deviceName}
                </Text>          
            ),
            headerLeft: () => (
                <TouchableOpacity style={{padding:hp(2)}} onPress={() => navigation.goBack()}>
                    <BackIcon />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    function renderPopUpText(title, address) {
        return(
            <View style={{width:wp(50),paddingHorizontal:hp(2)}}>
                <View style={{flexDirection:'row'}}>
                    { title == 'Start' ? <StartPointIcon/> : <EndPointIcon/> }
                    <Text style={styles.title}>{title}</Text>
                </View>
                <Text style={styles.address}>{address}</Text>
            </View>
        )
    }

    
    function renderPopup(title, address) {
        return(
            <Map.default.Callout 
                contentStyle={{elevation:10,zIndex:10,borderColor:ColorConstant.WHITE,borderWidth:1,borderRadius:10}}
                containerStyle={{zIndex:10}}
                title={renderPopUpText(title, address)} 
            />
        )
    }

    function renderMapBox() {

        let tripStartCord = [item.tripTravelledPositions[0][1], item.tripTravelledPositions[0][0]]
        let tripEndCord = [item.tripTravelledPositions[item.tripTravelledPositions.length - 1][1], item.tripTravelledPositions[item.tripTravelledPositions.length - 1][0]]

        useEffect(()=>{
            if(isAndroid){
                let coordinateArray = item.tripTravelledPositions.map((coorItem)=>{return([coorItem[1],coorItem[0]])} )
                // coordinateArray = [...coordinateArray]
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
                    
                    {renderPopup('Start',item.tripStartAddress)}

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

                    {renderPopup('End',item.tripEndAddress)}

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
            <Map.default.MapView style={{ flex: 1}} >
                {/* <Map.default.UserLocation
                    renderMode='normal'
                    visible={true}
                    showsUserHeadingIndicator={true}
                /> */}
                <Map.default.Camera
                    zoomLevel={14}
                    centerCoordinate={tripStartCord}
                />

                {!isEmpty(lineString) ? renderLine(): null}

                {renderStartPoint()}

                {renderEndPoint()}
                
            </Map.default.MapView>
        )
    }

    function renderAppleMap() {

        let initialRegion = 
        {
            latitude: item.tripTravelledPositions[0][0],
            longitude: item.tripTravelledPositions[0][1],
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }

        let tripStartCord = {
            latitude: item.tripTravelledPositions[0][0],
            longitude: item.tripTravelledPositions[0][1],
        }
        let tripEndCord = {
            latitude: item.tripTravelledPositions[item.tripTravelledPositions.length - 1][0],
            longitude: item.tripTravelledPositions[item.tripTravelledPositions.length - 1][1]
        }

        useEffect(()=>{

            if(!isAndroid){
                let coordinateArray = item.tripTravelledPositions.map((coorItem)=>{return({longitude:coorItem[1],latitude:coorItem[0]})} )
                // coordinateArray = [tripStartCord,...coordinateArray,tripEndCord]
                setLineString(coordinateArray)
            }
        },[])

        return (

            <Map.default
                style={styles.mapContainer}
                ref={mapRef}
                initialRegion={initialRegion}
                showsUserLocation={false}
            >
                <Map.Marker coordinate={tripStartCord} >
                    <MarkerIcon/>
                    <Map.Callout>
                        {renderPopUpText('Start',item.tripStartAddress)}
                    </Map.Callout>
                </Map.Marker>

                <Map.Marker coordinate={tripEndCord}  >
                    <LocationOrangeIcon/>
                    <Map.Callout>
                        {renderPopUpText('End',item.tripEndAddress)}
                    </Map.Callout>
                </Map.Marker>

                <Map.Polyline
                    coordinates={lineString}
                    strokeColor={ColorConstant.ORANGE}
                    strokeWidth={3}
                />
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
    },
    title: {
        paddingLeft:hp(2),color:ColorConstant.GREY,fontFamily:'Nunito-Regular',fontSize:FontSize.FontSize.medium
    },
    address: {
        paddingLeft:hp(4),color:ColorConstant.BLUE,fontFamily:'Nunito-Regular',fontSize:FontSize.FontSize.small
    }
})

export default DispatchRoute