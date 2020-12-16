import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, Platform } from 'react-native';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import BottomSheet from 'reanimated-bottom-sheet';
import FontSize from '../../component/FontSize';
import MapView from '../../component/MapView';
// import { LiveTracking } from '..';

const {height} = Dimensions.get('window')

const TrackingDetails = () => {

	const sheetRef = useRef(null);
    
    React.useEffect(()=>{

		sheetRef.current.snapTo(0)
	   
    },[])

	const renderContent = () => (
		<View style={styles.subView}>
			<Text style={styles.mainTitle}>Tracking Details</Text>
			<View style={styles.subContainerView}>
				<Text style={styles.title}>Address</Text>
				<Image style={styles.icon} source={images.dashBoard.pin}/>
			</View> 
			<View style={styles.address}>
				<Text style={{fontSize:FontSize.FontSize.small}}>900 Dufferian Street,{'\n'}Toronto MG L40 1V6 {'\n'}Canada</Text>
			</View>
			<View style={styles.subContainerView}>
				<Text style={styles.title}>Date & Time</Text>
				<Image style={styles.icon} source={images.dashBoard.calender}/>
			</View> 
			<View style={styles.otherDetails}>
				<Text style={styles.date}>21/07/2020</Text>
				<Text style={[styles.date,{flex:1}]}>02:00:04</Text>
			</View> 
			<View style={styles.subContainerView}>
				<Text style={styles.title}>Other details</Text>
				<Image style={styles.icon} source={images.dashBoard.list}/>
			</View> 
			<View style={styles.otherDetails}>
				<View style={{flex:1}}>
					<Text style={styles.otherDetailText}>Duration</Text>
					<Text style={[styles.otherDetailText,{color:ColorConstant.BLACK}]}>12m 8s</Text>
				</View>
				<View style={{flex:1}}>
					<Text style={styles.otherDetailText}>Distance</Text>
					<Text style={[styles.otherDetailText,{color:ColorConstant.BLACK}]}>16.47mi</Text>
				</View>
				<View style={{flex:0.3}}>
					<Text style={styles.otherDetailText}>Speed</Text>
					<Text style={[styles.otherDetailText,{color:ColorConstant.BLACK}]}>66mph</Text>
				</View>    
			</View>         
		</View>
	);

	return (
		<View style={styles.container}>
			<MapView/>
			{/* <LiveTracking /> */}

			<BottomSheet
				ref={sheetRef}
				snapPoints={[height/2, height/4, hp(7)]}
				borderRadius={30}
				renderContent={renderContent}
     		/>

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
	subContainer: {
		position: 'absolute', flex: 1, right: 20, top: 20, width: hp(7.5)
	},
	textStyle: {
		margin: hp(0.5),
		color: ColorConstant.BLUE,
		textAlignVertical: 'center',
		paddingLeft: hp(0.5)
	},
	horizontalLine: {
		borderBottomWidth: 0.5, 
		borderBottomColor: ColorConstant.GREY, 
		margin: hp(0.7)
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
	},
	subView: {
		width:'100%',
		alignItems:'center',
		height:height/2,		
		backgroundColor:ColorConstant.WHITE,
	},
	mainTitle: {
		color:ColorConstant.ORANGE,
		fontWeight:'bold',
		paddingTop:hp(2),
		fontSize:FontSize.FontSize.medium,
		fontFamily:'Nunito-Bold'
	},
	subContainerView: {
		flexDirection:'row',
		marginHorizontal:hp(4),
		marginTop:hp(4) ,
		alignItems:'center',
		justifyContent:'flex-start',
		borderBottomColor:ColorConstant.GREY,
		borderBottomWidth:0.5
	},
	icon: {
		alignSelf:'flex-start'
	},
	title: {
		flex:1,color:ColorConstant.GREY,
		fontSize:hp(1.5),
		fontWeight:'bold',
		marginBottom:hp(1),
		fontFamily:'Nunito-SemiBold'
	},
	address: {
		fontWeight:'700',
		alignSelf:'flex-start',
		marginHorizontal:hp(4),
		marginTop:hp(1)
	},
	date: {
		fontSize:hp(1),
		flex:0.8
	},
	otherDetails: {
		alignSelf:'flex-start',
		marginHorizontal:hp(4),
		marginTop:hp(1),
		flexDirection:'row'
	},
	otherDetailText: {
		color:ColorConstant.GREY,fontSize:hp(1.2),
		marginBottom:hp(1),
	}
});

export default TrackingDetails;