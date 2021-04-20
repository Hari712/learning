import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Platform } from 'react-native';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { isRoleRegular, isUserLoggedIn, getAllUserDevicesList } from '../Selector';
import useSubscribeLocationUpdates from '../../utils/useSubscribeLocationUpdates';
import { MapView, FontSize } from '../../component';
import NavigationService from '../../navigation/NavigationService';
import { translate } from '../../../App';
import { AppConstants, SCREEN_CONSTANTS } from '../../constants/AppConstants';
import { BellIcon, BluelineIcon, LiveTrackingPlusIcon, OrangelineIcon } from '../../component/SvgComponent';
import { useIsFocused } from '@react-navigation/native';
import { FullScreenIcon, RefreshIcon, RightArrowIcon } from '../../component/SvgComponent';

const LiveTracking = ({ navigation }) => {
	const [isLineClick, setIsLineClick] = useState(false);
	const [currentPosition, setCurrentPosition] = useState(); //by default

	const { isLoggedIn, isRegular, deviceList } = useSelector(state => ({
		isLoggedIn: isUserLoggedIn(state),
		isRegular: isRoleRegular(state),
		deviceList: getAllUserDevicesList(state)
	}));

	const isFocused = useIsFocused();

	React.useEffect(
		() => {
			isFocused ? null : setIsLineClick(false);
		},
		[isFocused]
	);

	const location = useSubscribeLocationUpdates(isLoggedIn);

	React.useLayoutEffect(
		() => {
			navigation.setOptions({
				header: () => null,
			});
		},
		[navigation]
	);

	useEffect(
		() => {
			if (location) {
				const { latitude, longitude, course, speed, accuracy, altitude } = location;
				let centerCoord =
					Platform.OS == 'ios'
						? { coordinates: { latitude: latitude, longitude: longitude } }
						: [longitude, latitude];
				setCurrentPosition(centerCoord);
			}
		},
		[location]
	);

	const onPressHandle = ({ navigation, item, color, setColor }) => {
		if (item === 'Sensor Information') {
			setIsLineClick(false);
			navigation.navigate(SCREEN_CONSTANTS.SENSOR_INFO);
		} else if (item == 'Geo Fence') {
			setIsLineClick(false);
			navigation.navigate(SCREEN_CONSTANTS.GEOFENCE);
		} else if (item == 'Alarms') {
			setIsLineClick(false);
			navigation.navigate(SCREEN_CONSTANTS.ALARMS);
		} else {
			navigation.navigate(SCREEN_CONSTANTS.TRIP_HISTORY);
		}
	};

	function navigateToDeviceSetup() {
		setIsLineClick(false);
		NavigationService.push(SCREEN_CONSTANTS.ACTIVATE_DEVICE);
	}

	function renderDeviceSelectionView() {
		return (
			<View
				style={{
					height: hp(3),
					backgroundColor: ColorConstant.WHITE,
					position: 'absolute',
					marginTop: hp(7),
					borderRadius: 13,
					alignSelf: 'center',
					justifyContent: 'center',
					marginHorizontal: hp(3),
				}}
			>
				<View
					style={{
						justifyContent: 'space-between',
						flexDirection: 'row',
						alignItems: 'center',
						paddingHorizontal: wp(3),
					}}
				>
					<TouchableOpacity>
						<Image
							source={images.dashBoard.leftIcon}
							resizeMode="contain"
							style={{ width: wp(1.5), height: hp(1.5) }}
						/>
					</TouchableOpacity>
					<Text style={{ color: ColorConstant.BROWN, fontSize: hp(1.4), marginHorizontal: hp(1) }}>
						{' '}TrackPort International{' '}
					</Text>
					<TouchableOpacity>
						<RightArrowIcon resizeMode="contain" width={6.779} height={10.351} />
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	return (
		<View onStartShouldSetResponder={() => setIsLineClick(false)} style={styles.container}>
			<MapView currentLocation={currentPosition} />
			{renderDeviceSelectionView()}
			<View style={styles.subContainer}>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(SCREEN_CONSTANTS.NOTIFICATION), setIsLineClick(false);
					}}
					style={styles.bellIconStyle}
				>
					<BellIcon />
					{/* <Image source={images.image.bluebell} /> */}
				</TouchableOpacity>

				<TouchableOpacity
					activeOpacity={1}
					onPress={() => setIsLineClick(!isLineClick)}
					style={styles.lineIconStyle}
				>
					{isLineClick ? <OrangelineIcon /> : <BluelineIcon />}
				</TouchableOpacity>

				{isLineClick
					? <View style={styles.lineContainer}>
							{data.map((item, key) =>
								<TouchableOpacity key={key} onPress={() => onPressHandle({ navigation, item })}>
									<Text style={styles.textStyle}>
										{translate(item)}
									</Text>
									{key != data.length - 1 ? <View style={styles.horizontalLine} /> : null}
								</TouchableOpacity>
							)}
						</View>
					: null}

				{!isRegular
					? <TouchableOpacity
							onPress={() => navigateToDeviceSetup()}
							style={[styles.lineIconStyle, { backgroundColor: ColorConstant.BLUE }]}
						>
							<LiveTrackingPlusIcon />
						</TouchableOpacity>
					: null}
			</View>
		</View>
	);
};

const data = ['Geo Fence', 'Sensor Information', 'Alarms', 'Trip History'];

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	subContainer: {
		position: 'absolute',
		flex: 1,
		right: 20,
		marginTop: hp(5),
		width: hp(7.5),
	},
	bellIconStyle: {
		borderRadius: 13,
		height: hp(7.3),
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		backgroundColor: ColorConstant.WHITE,
	},
	lineIconStyle: {
		borderRadius: 13,
		height: hp(7.3),
		marginTop: hp(2),
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		backgroundColor: ColorConstant.WHITE,
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
		shadowRadius: 3,
	},
	textStyle: {
		margin: hp(0.5),
		color: ColorConstant.BLUE,
		textAlignVertical: 'center',
		paddingLeft: hp(0.5),
		fontSize: FontSize.FontSize.small,
		fontFamily: 'Nunito-Regular',
	},
	horizontalLine: {
		borderBottomWidth: 0.5,
		borderBottomColor: ColorConstant.GREY,
		margin: hp(0.7),
	},
	map: {
		height: 400,
		marginTop: 80,
	},
	annotationContainer: {
		width: 30,
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
		borderRadius: 15,
	},
	annotationFill: {
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: 'blue',
		transform: [{ scale: 0.6 }],
	},
});

export default LiveTracking;
