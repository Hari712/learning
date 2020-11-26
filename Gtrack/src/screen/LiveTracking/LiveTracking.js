import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Platform } from 'react-native';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useSelector } from 'react-redux'
import { isUserLoggedIn } from '../Selector'
import useSubscribeLocationUpdates from '../../utils/useSubscribeLocationUpdates'
import { navigationRef } from '../../navigation/NavigationService';
import MapView from '../../component/MapView';
import FontSize from '../../component/FontSize';

const LiveTracking = ({navigation}) => {

	const [isLineClick, setIsLineClick] = useState(false)	
	const [currentPosition, setCurrentPosition] = useState([-7.941227, 39.584127]) //by default

	const { isConnected, isLoggedIn } = useSelector(state => ({
		isConnected: state.network.isConnected,
		isLoggedIn: isUserLoggedIn(state)
	}))

	const location = useSubscribeLocationUpdates(isLoggedIn)

	React.useLayoutEffect(() => {
		navigation.setOptions({
		  header: () => (null),
		});
	  },[navigation]);

	useEffect(()=> {
		if (location) {
			const { latitude, longitude, course, speed, accuracy, altitude } = location
			let centerCoord = [longitude, latitude]
			setCurrentPosition(centerCoord);
		}
	},[location])

	const onPressHandle = ({ navigation, item, color, setColor }) => {
		if(item === 'Sensor Information') {
			navigation.navigate('SensorInfo')
		}
		else if (item == 'Geo Fence') {
			navigation.navigate('GeoFence')
		}
		else {
            navigation.navigate('Alarms')
        }
	}

	return (
		<View style={styles.container}>

			<MapView currentLocation={currentPosition} />

			<View style={styles.subContainer}>

				<TouchableOpacity onPress={() =>  {navigation.navigate('Notification'), setIsLineClick(false)}} style={styles.bellIconStyle}>
					<Image source={images.image.bluebell} />
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={1} onPress={() => setIsLineClick(!isLineClick)} style={styles.lineIconStyle}>
					{isLineClick ?
						<Image source={images.image.orangeline} /> :
						<Image source={images.image.blueline} />
					}
				</TouchableOpacity>

				{isLineClick ?
					<View style={styles.lineContainer}>
						{data.map((item, key) =>
							<TouchableOpacity key={key} onPress={() => onPressHandle({ navigation, item })}>
								<Text style={styles.textStyle}>{item}</Text>
								{key != data.length - 1 ? <View style={styles.horizontalLine} /> : null}
							</TouchableOpacity>
						)
						}
					</View>
					: null}

				<TouchableOpacity onPress={() => {
					navigation.navigate('TrackingDetails')
					setIsLineClick(false)
					console.log("Line Icon Pressed")
				}} style={[styles.lineIconStyle, { backgroundColor: ColorConstant.BLUE }]}>
					<Image style={{ tintColor: ColorConstant.WHITE }} source={images.image.add} />
				</TouchableOpacity>
			</View>
		</View>
	);
}

const data = ['Geo Fence', 'Sensor Information', 'Alarms']

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	subContainer: {
		position: 'absolute', flex: 1, right: 20, marginTop: hp(5), width: hp(7.5)
	},
	bellIconStyle: {
		borderRadius: 13,
		height: hp(7.3),
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%', backgroundColor: ColorConstant.WHITE
	},
	lineIconStyle: {
		borderRadius: 13, height: hp(7.3), marginTop: hp(2), justifyContent: 'center', alignItems: 'center', width: '100%', backgroundColor: ColorConstant.WHITE
	},
	lineContainer: {
		backgroundColor: 'white',
		padding: 5,
		paddingVertical: hp(1.5),
		right: wp(18),
		borderRadius: 16,
		width: '300%',
		top: hp(9.5),
		justifyContent: 'space-between',
		position: 'absolute',
		shadowColor: ColorConstant.GREY,
		shadowOffset: { height: 0, width: 0 },
		shadowOpacity: 1,
		elevation: 10,
		shadowRadius: 3
	},
	textStyle: {
		margin: hp(0.5),
		color: ColorConstant.BLUE,
		textAlignVertical: 'center',
		paddingLeft: hp(0.5),
		fontSize:FontSize.FontSize.small,
		fontFamily:'Nunito-Regular'
	},
	horizontalLine: {
		borderBottomWidth: 0.5, borderBottomColor: ColorConstant.GREY, margin: hp(0.7)
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