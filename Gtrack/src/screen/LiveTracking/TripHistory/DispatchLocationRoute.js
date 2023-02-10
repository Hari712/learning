
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

const DispatchLocationRoute = ({ navigation, route }) => {

    const { item } = route.params

    const [lineString, setLineString] = useState(null)
    const [showStartLocation,setShowStartLocation] = useState(false)
    const [showEndLocation,setShowEndLocation] = useState(false)
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

        let tripStartCord = [item.tripLongitude, item.tripLatitude]
        function renderStartPoint() {
            return(
                <Map.default.PointAnnotation
                    id='startPoint' 
                    coordinate={tripStartCord}
                    anchor={{x: 0.5, y: 0.5}}
                    title = {"Start"}
                    onSelected={(data)=>{setShowStartLocation(!showStartLocation),setShowEndLocation(false)}}
                    onDeselected={(data)=>{setShowStartLocation(!showStartLocation),setShowEndLocation(false)}}
                >  
                   <LocationOrangeIcon width={30} height={30}/>
                    
                    {renderPopup('Start',item.tripAddress)}

                </Map.default.PointAnnotation>
            )
        }

        // function renderEndPoint() {
        //     return(
        //         <Map.default.PointAnnotation
        //             id='endPoint' 
        //             coordinate={tripEndCord}
        //             anchor={{x: 0.5, y: 1}}
        //             onSelected={(data)=>{setShowEndLocation(!showEndLocation),setShowStartLocation(false)}}
        //             onDeselected={(data)=>{setShowEndLocation(!showEndLocation),setShowStartLocation(false)}}
        //         >
        //             <LocationOrangeIcon width={30} height={30}/>

        //             {/* {renderPopup('End',item.tripEndAddress)} */}

        //         </Map.default.PointAnnotation>
        //     )
        // }

        // function renderLine() {
        //     return(
        //         <Map.default.ShapeSource
        //             id='route'
        //             shape={lineString}>
        //             <Map.default.LineLayer
        //                 id='lineroute'
        //                 style={{
        //                     lineCap: 'round',
        //                     lineWidth: 5,
        //                     lineOpacity: 0.8,
        //                     lineColor: ColorConstant.ORANGE,
        //                 }}
        //             />
        //         </Map.default.ShapeSource>
        //     )
        // }
        const ShowPopup=()=>{
            setShowStartLocation(false)
            setShowEndLocation(false)
        }
        return (
            <Map.default.MapView style={{ flex: 1,}}  onPress={()=>ShowPopup()} attributionEnabled={false} logoEnabled={false} rotateEnabled={false} styleURL={MAP_BOX_STYLEURL}>
                      
                <Map.default.Camera
                    zoomLevel={14}
                    minZoomLevel={4}
                    maxZoomLevel={15}
                    animationMode='flyTo'
                    animationDuration={6000}
                    centerCoordinate={tripStartCord}
                />
                {renderStartPoint()}
                <Map.default.RasterSource {...rasterSourceProps}>
						<Map.default.RasterLayer
							id="googleMapLayer"
							sourceID="googleMapSource"
							// style={{rasterOpacity: 0.5}}
					
							layerIndex={0}
						/>
                </Map.default.RasterSource>	
                
            </Map.default.MapView>
        )
    }

    function renderAppleMap() {
  
        let initialRegion = 
        {
            latitude: item.tripLatitude,
            longitude: item.tripLongitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }

        let tripStartCord = {
            latitude: item.tripLatitude,
            longitude: item.tripLongitude,
        }
    

        return (

            <Map.default
                style={styles.mapContainer}
                ref={mapRef}
                initialRegion={initialRegion}
                showsUserLocation={false}
            >
                <Map.Marker coordinate={tripStartCord} >
                <LocationOrangeIcon/>
                    <Map.Callout>
                        {renderPopUpText('Start',item.tripAddress)}
                    </Map.Callout>
                </Map.Marker>

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

export default DispatchLocationRoute