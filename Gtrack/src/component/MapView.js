import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, Platform } from 'react-native';
import images from '../constants/images';
import { ColorConstant } from '../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useSelector } from 'react-redux'
import { isUserLoggedIn } from '../screen/Selector'
import useSubscribeLocationUpdates from '../utils/useSubscribeLocationUpdates'

const isAndroid = Platform.OS === 'android'
const {height} = Dimensions.get('window')

//var points1 = [-7.941227, 39.584127]
var centerCoord = [-7.941227, 39.584127]


const Map = Platform.select({
	ios: () => require('react-native-maps'),
	android: () => require('@react-native-mapbox-gl/maps')
})();

const MapView = (props) => {

	const { isConnected, isLoggedIn } = useSelector(state => ({
		isConnected: state.network.isConnected,
		isLoggedIn: isUserLoggedIn(state)
	}))

	const location = useSubscribeLocationUpdates(isLoggedIn)
	// const shape = route.params;
	console.log("type.1", props)
	props.currentLocation ? centerCoord = props.currentLocation : null;
	
	useEffect(() => {

		if (location) {
			const { latitude, longitude, course, speed, accuracy, altitude } = location
			centerCoord = [longitude, latitude]
		}

	},[location])
	// const [coordinate, setCoordinate] = useState([])
    


	function renderPolygon() {

		const offset = 0.01

		const coordinates = [[
			[centerCoord[0] , centerCoord[1] - offset],
			[centerCoord[0] - offset , centerCoord[1]],
			[centerCoord[0] - offset , centerCoord[1] + offset],
			[centerCoord[0] + offset , centerCoord[1] + offset],
			[centerCoord[0] + offset , centerCoord[1]]
		]]

		return(
		/* Polygon */
		<Map.default.ShapeSource
			id="source"
			shape={{
				type: 'Feature',
				geometry: {
					type: 'Polygon',
					coordinates: coordinates,
				},
			}}>
			<Map.default.FillLayer id="fill" 
				style={{
					fillColor: ColorConstant.ORANGE, 
					fillOpacity:0.3, 
				}} />
			<Map.default.LineLayer id="line" 
				style={{
					lineColor: ColorConstant.ORANGE, 
					lineWidth: 2
				}}
			/>
			<Map.default.CircleLayer  
				id="points"
				center={[centerCoord]}
				style={{
					circleRadius: 4,
					circleColor: ColorConstant.ORANGE, 
				}} 
			/>
		</Map.default.ShapeSource>
		)
	}
	
	function renderCircle() {
		return (
			<Map.default.ShapeSource
			id="source"
			shape={{
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: centerCoord,
				},
			}}>
				<Map.default.CircleLayer  
					id="circle" 
					maxZoomLevel={100}
					center={[centerCoord]}
					style={{
						circleRadius: props.radius,
						circleColor: ColorConstant.ORANGE, 
						circleOpacity:0.3, 
						circleStrokeWidth: 2,
						circleStrokeColor:ColorConstant.ORANGE, 
						circleTranslate:[0,0], 
						circleTranslateAnchor:'viewport'}} />
			</Map.default.ShapeSource>
		)
	}

	function renderMapBox() {
		console.log("Android")
		return (
			<View style={{ flex: 1 }}>
				<Map.default.MapView style={{ flex: 1 }} >
					
					<Map.default.UserLocation
						renderMode='normal'
						visible={true}					
						showsUserHeadingIndicator={true}
						animated={true}					
					/>
			
					<Map.default.MarkerView 
						coordinate={centerCoord} 
						id='point1'
						pinColor="red"
						//draggable = {true}
						anchor={{x: 0.5, y: 1}}
						// onDragEnd = {()=>console.log("Something ")}
						//onPress={(event)=>console.log("Something 2",event)}
						//onMarkerPress = {(event)=>console.log("Something 2",event)}
						>
							<View>
								<Image source={images.image.defaultlogo} style={{height:hp(4), resizeMode:"contain"}} />
							</View>
					</Map.default.MarkerView>

					<Map.default.Camera
						centerCoordinate={centerCoord}
						// followUserLocation={true}
						zoomLevel={12}
					/>

					{ props.type == 'Circle' ? renderCircle() : null }
					{ props.type == 'Polygon' ? renderPolygon() : null }

				</Map.default.MapView>
			</View>
		)
	};

	function renderApppleMap() {
        console.log("apple")
        
		return (
            <View style={styles.container}>
                <View style={StyleSheet.absoluteFillObject}>
                    <Map.default style={StyleSheet.absoluteFillObject} showsUserLocation={true}>
                        {/* {<Map.Marker
                            coordinate={coordinate}
							title={selectedRoute.shipmentName}

                        />} */}
						<Map.default.Polygon></Map.default.Polygon>
                    </Map.default>
                    <View style={{ position: 'absolute', top: 100, left: 50 }} />
                </View>

                
            </View>
        )
	}

	
	return (
		<View style={styles.container}>
			{console.log("Platform: ",Platform.OS)}
			{isAndroid ? renderMapBox() : renderApppleMap()}

			{/* <Mapbox.MapView
				styleURL={Mapbox.StyleURL.Street}
				zoomLevel={15}
				onTouchStart={() => { setIsLineClick(false) }}
				centerCoordinate={[11.256, 43.77]} 
				style={styles.container}>
				
				{renderAnnotations()}

			</Mapbox.MapView> */}

		</View>
	);
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default MapView;