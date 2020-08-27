import React, { useState } from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity} from 'react-native';
import Mapbox from '@react-native-mapbox-gl/maps'
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

const LiveTracking = () => {

	const [isLineClick, setIsLineClick] = useState(false)

	function renderAnnotations() {
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

	return (

		<View style={styles.container}>
			
				<Mapbox.MapView
					styleURL={Mapbox.StyleURL.Street}
					zoomLevel={15}
					centerCoordinate={[11.256, 43.77]}
					style={styles.container}>
					{renderAnnotations()}
					
				</Mapbox.MapView>

				<View style={styles.subContainer}>

					<TouchableOpacity style={styles.bellIconStyle}>
							<Image source={images.image.bluebell}/> 
					</TouchableOpacity> 

					<TouchableOpacity activeOpacity={1} onPress={() =>isLineClick?setIsLineClick(false):setIsLineClick(true)} style={styles.lineIconStyle}>
							{isLineClick?
							<Image style={{position:'absolute'}} source={images.image.orangeline}/>:
							<Image style={{position:'absolute'}} source={images.image.blueline}/>
							}

								{isLineClick?
									<View style={styles.lineContainer}>
										{data.map((item) =>
										<View>
										<Text style={styles.textStyle}>{item}</Text>
										<View style={styles.horizontalLine}/>
									</View>
										)
										}
								</View>
								:null}
						
							</TouchableOpacity>
							<TouchableOpacity style={[styles.lineIconStyle,{backgroundColor:ColorConstant.BLUE}]}>
								<Image style={{tintColor:ColorConstant.WHITE}} source={images.image.add}/> 
							</TouchableOpacity>
				</View> 
		</View>
		);
	}

const data = ['Geo Fence','Sensor Information','Alarms']

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	subContainer: {
		position:'absolute', flex:1,right:20, top:20,width:'15%'
	},
	bellIconStyle: {
		borderRadius:13,height:hp(7.3),justifyContent:'center',alignItems:'center',width:'100%',backgroundColor:ColorConstant.WHITE
	},
	lineIconStyle: {
		borderRadius:13,height:hp(7.3),marginTop:hp(2) ,justifyContent:'center',alignItems:'center',width:'100%',backgroundColor:ColorConstant.WHITE
	},
	lineContainer:{
		backgroundColor:'white',padding:5,right:120,borderRadius:16,width:'280%',height:hp(18),top:38,justifyContent:'space-between'
	},
	textStyle:{
		margin:hp(0.5),color:ColorConstant.BLUE,textAlignVertical:'center'
	},
	horizontalLine:{
		borderBottomWidth:0.5,borderBottomColor:ColorConstant.GREY,margin:hp(0.7)
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

export default LiveTracking;