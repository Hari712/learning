import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, Platform } from 'react-native';
import images from '../constants/images';
import { ColorConstant } from '../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import BottomSheet from 'reanimated-bottom-sheet';
import FontSize from './FontSize';

const isAndroid = Platform.OS === 'android'
const {height} = Dimensions.get('window')

const Map = Platform.select({
	ios: () => require('react-native-maps'),
	android: () => require('@react-native-mapbox-gl/maps')
})();

const MapView = () => {
    
    React.useEffect(()=>{

	   
    },[])

	function renderMapBox() {
		console.log("android")
		return (
			<View style={{ flex: 1 }}>
				<Map.default.MapView style={{ flex: 1 }}>
					<Map.default.UserLocation
						renderMode='normal'
						visible={true}						
						showsUserHeadingIndicator={true}
						
					/>
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