import React, { useEffect, useState, useLayoutEffect, useRef } from 'react'
import { View, StyleSheet, Dimensions, Platform, Text, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import isEmpty from 'lodash/isEmpty'
import { ColorConstant } from './../../../constants/ColorConstants';
import { EndPointIcon, MarkerIcon, StartPointIcon, LocationOrangeIcon, BackIcon } from '../../../component/SvgComponent'
import { FontSize } from '../../../component';
import { MAP_BOX_STYLEURL, rasterSourceProps } from '../../../constants/AppConstants';
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.08;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const isAndroid = Platform.OS === 'android'

const Map = Platform.select({
    ios: () => require('react-native-maps'),
    android: () => require('@react-native-mapbox-gl/maps')
})();

const DispatchRouteTotalTrip = ({ navigation, route }) => {

    const { item ,points,devicename} = route.params

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
                {devicename}
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

        let tripStartCord = [item[0][1], item[0][0]]
        let tripEndCord = [item[item.length - 1][1], item[item.length - 1][0]]

        useEffect(()=>{
            if(isAndroid){
                let coordinateArray = item.map((coorItem)=>{return([coorItem[1],coorItem[0]])} )
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
                <>
                {points.map((item, index) => {
                    console.log('itemitemitemitemitemitemitemitem',item)
                    let cordinate = [item[1],item[0]]
                    return (
                        <Map.default.PointAnnotation
            
                            coordinate={cordinate}
                            anchor={{x: 0.5, y: 0.5}}
                            // anchor={{x: 0.5, y: 0.5}}
                            // onDragEnd={(e) => {
                            //     const { coordinates } = e.geometry
                            //     console.log('Event Coordinate',e)
                            //     setSelectedCoordinates(prevState => prevState.map((coordInfo, index) => {
                            //         if (item.id == coordInfo.id) {
                            //             coordInfo.coordinates = coordinates
                            //             return coordInfo
                            //         }
                            //         return coordInfo
                            //     }))
                            // }}
                        >    
                           <LocationOrangeIcon width={30} height={30}/>
                        </Map.default.PointAnnotation>
                    )
                })}
                </>
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
            <Map.default.MapView style={{ flex: 1}} attributionEnabled={false} logoEnabled={false} rotateEnabled={false} styleURL={MAP_BOX_STYLEURL}>
          
                <Map.default.Camera
                    zoomLevel={14}
                    centerCoordinate={tripStartCord}
                />

                {!isEmpty(lineString) ? renderLine(): null}

                {renderStartPoint()}

        

                <Map.default.RasterSource {...rasterSourceProps}>
						<Map.default.RasterLayer
							id="googleMapLayer"
							sourceID="googleMapSource"
							layerIndex={0}
						/>
                </Map.default.RasterSource>	
                
            </Map.default.MapView>
        )
    }

    function renderAppleMap() {

        let initialRegion = 
        {
            latitude: item[0][0],
            longitude: item[0][1],
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }

        let  tripStartCord = {
            latitude: item[0][0],
            longitude: item[0][1],
        }
        let tripEndCord   = {
            latitude: item[item.length - 1][0],
            longitude: item[item.length - 1][1]
        }

        useEffect(()=>{

            if(!isAndroid){
                let coordinateArray = item.map((coorItem)=>{return({longitude:coorItem[1],latitude:coorItem[0]})} )
                // coordinateArray = [tripStartCord,...coordinateArray,tripEndCord]
                console.log('coordinateArraycoordinateArraycoordinateArray',coordinateArray)
                setLineString(coordinateArray)
            }
        },[])
        function renderPoinst() {
            return(
                <>
                     {points.map(coordInfo => { return(
                        <Map.Marker
                   
                            coordinate={{
                                latitude: coordInfo[0],
                                longitude: coordInfo[1]
                            }}
                        />
                    )})}
                </>
            )
        }

   
        return (

            <Map.default
                style={styles.mapContainer}
                ref={mapRef}
                initialRegion={initialRegion}
                showsUserLocation={false}
            >
                <Map.Marker coordinate={tripStartCord} >
                    <MarkerIcon/>
                    {/* <Map.Callout>
                        {renderPopUpText('Start',item.tripStartAddress)}
                    </Map.Callout> */}
                </Map.Marker>
               {renderPoinst()}
                <Map.Marker coordinate={tripEndCord}  >
                    {/* <LocationOrangeIcon/> */}
                    {/* <Map.Callout>
                        {renderPopUpText('End',item.tripEndAddress)}
                    </Map.Callout> */}
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

export default DispatchRouteTotalTrip