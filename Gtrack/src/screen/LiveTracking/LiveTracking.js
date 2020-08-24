import React, { Component } from 'react';
import { View, StyleSheet,Text, Image } from 'react-native';
import Mapbox from '@react-native-mapbox-gl/maps'
import images from '../../constants/images';

export default class MyComponent extends Component {
	renderAnnotations() {
		return (
			<Mapbox.PointAnnotation
				key="pointAnnotation"
				id="pointAnnotation"
				coordinate={[11.254, 43.772]}>
				<View style={styles.annotationContainer}>
					<View style={styles.annotationFill} />
				</View>
				<Mapbox.Callout title="An annotation here!" />
			</Mapbox.PointAnnotation>
		);
	}

	render() {
		return (
			<View style={styles.container}>
                
				<Mapbox.MapView
                    styleURL={Mapbox.StyleURL.Street}
                    zoomLevel={15}
					centerCoordinate={[11.256, 43.77]}
					style={styles.container}>
					{this.renderAnnotations()}
                    
				</Mapbox.MapView>

                <View style={{ position:'absolute', flex:1,right:20, top:20}}>
                    <Image source={images.image.bluebell}/>  
                    <Image source={images.image.blueline}/> 
                    <Image source={images.image.add}/> 
                </View>
                
			</View>
          
		);
	}
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
	},
	map: {
		height: 400,
		marginTop: 80
	},
	annotationContainer: {
		width: 30,
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
		borderRadius: 15
	},
	annotationFill: {
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: 'blue',
		transform: [{ scale: 0.6 }]
	}
});