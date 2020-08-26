import React, { Component,useState } from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity} from 'react-native';
import Mapbox from '@react-native-mapbox-gl/maps'
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

//const [bell,setBell] = useState(false)
export default class LiveTracking extends Component {
	
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
	// renderItems(item,key) {
	// 	console.log('khushi',item)
	// 	return(
	// 	<View style={{width:'100%'}}>
	// 	 <View style={{backgroundColor:'red',height:hp(2),right:80}}>
	// 		 <Text>{item}</Text>
	// 	  </View>
	// 	  </View>	 
	// 	)
	// }

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

                <View style={{ position:'absolute', flex:1,right:20, top:20,width:'15%'}}>
					<TouchableOpacity  style={{borderRadius:13,height:hp(7.3),justifyContent:'center',alignItems:'center',width:'100%',backgroundColor:ColorConstant.WHITE}}>
                   		 <Image source={images.image.bluebell}/> 
						{/* {bell?
						Object.values(data).map((item,key)=> this.renderItems(item,key))
						:null}	 */}
					</TouchableOpacity> 
					<TouchableOpacity  style={{borderRadius:13,height:hp(7.3),marginTop:hp(2) ,justifyContent:'center',alignItems:'center',width:'100%',backgroundColor:ColorConstant.WHITE}}>
				    <Image source={images.image.blueline}/>
					</TouchableOpacity>
					<TouchableOpacity style={{borderRadius:13,height:hp(7.3),marginTop:hp(2),justifyContent:'center',alignItems:'center',width:'100%',backgroundColor:ColorConstant.BLUE}}>
                    <Image style={{tintColor:ColorConstant.WHITE}} source={images.image.add}/> 
					</TouchableOpacity>
					 {/* {Object.values(data).map((item,key)=> this.renderItems(item,key))} */}
                </View>                
			</View>

			
          
		);
	}
}

const data = ['Geo Fence','Sensoe Information','Alarms']

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