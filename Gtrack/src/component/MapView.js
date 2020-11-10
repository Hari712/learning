import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, Platform } from 'react-native';
import images from '../constants/images';
import { ColorConstant } from '../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import BottomSheet from 'reanimated-bottom-sheet';
import FontSize from './FontSize';
import { TouchableOpacity } from 'react-native-gesture-handler';

const isAndroid = Platform.OS === 'android'
const {height} = Dimensions.get('window')

var points1 = [-7.941227, 39.584127]


const Map = Platform.select({
	ios: () => require('react-native-maps'),
	android: () => require('@react-native-mapbox-gl/maps')
})();

const MapView = () => {
    
    React.useEffect(()=>{},[])

	function renderMapBox() {
		console.log("Android")
		return (
			<View style={{ flex: 1 }}>
				<Map.default.MapView style={{ flex: 1 }} >					
					
					<Map.default.UserLocation
						renderMode='normal'
						visible={true}					
						showsUserHeadingIndicator={true}
					
					/>

					<Map.default.MarkerView 
						coordinate={points1} 
						id='point1'
						draggable = {true}
						anchor={{x: 0.5, y: 0.5}}
						onPress={()=>console.log("Something 2")}
						onDragEnd = {()=>console.log("Something ")}
						>
							<View
								style={{
								width: 20,
								height: 20,
								borderRadius: 10,
								backgroundColor: ColorConstant.BLACK,
								}}
							/>
					</Map.default.MarkerView>

					<Map.default.Camera
						centerCoordinate={[-7.946227, 39.589127]}
						zoomLevel={12}
					/>

					<Map.default.ShapeSource
						id="source"
						onPress={()=>console.log("khushi")}
						shape={{
							type: 'Feature',
							geometry: {
								type: 'Polygon',
								coordinates: [
									[
										points1,
										[-7.951227, 39.584127],
										[-7.965227, 39.589127],
										[-7.961227, 39.599127],
										[-7.941227, 39.604127],
									],
								],
							},
						}}>
						<Map.default.FillLayer id="fill" style={{fillColor: '#0000ff40'}} />
						<Map.default.LineLayer id="line" style={{lineColor: '#f008', lineWidth: 4}} />
						<Map.default.CircleLayer id="circle" style={{circleRadius: 20, circleColor: 'yellow', circleOpacity:0.4, circleStrokeWidth: 2, circleTranslate:[0,0], circleTranslateAnchor:'viewport'}} />
					</Map.default.ShapeSource>					
					
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