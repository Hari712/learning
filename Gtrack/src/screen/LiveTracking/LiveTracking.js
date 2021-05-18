import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Platform, Dimensions } from 'react-native';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { lineString as makeLineString } from '@turf/helpers';
import { useSelector } from 'react-redux';
import { isRoleRegular, isUserLoggedIn, getAllUserDevicesList, getLiveTrackingDeviceList, getLivetrackingGroupDevicesListInfo } from '../Selector';
import useSubscribeLocationUpdates from '../../utils/useSubscribeLocationUpdates';
import { MapView, FontSize } from '../../component';
import NavigationService from '../../navigation/NavigationService';
import { translate } from '../../../App';
import { AppConstants, SCREEN_CONSTANTS } from '../../constants/AppConstants';
import { BellIcon, BluelineIcon, LiveTrackingPlusIcon, OrangelineIcon } from '../../component/SvgComponent';
import { useIsFocused } from '@react-navigation/native';
import { FullScreenIcon, RefreshIcon, RightArrowIcon } from '../../component/SvgComponent';
import useStateRef from '../../utils/useStateRef';
import isEmpty from 'lodash/isEmpty';
import mapKeys from 'lodash/mapKeys';
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.9;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };

const Map = Platform.select({
	ios: () => require('react-native-maps'),
	android: () => require('@react-native-mapbox-gl/maps'),
})();

const isAndroid = Platform.OS === 'android';

const LiveTracking = ({ navigation }) => {
	const [isLineClick, setIsLineClick] = useState(false);
	const [currentPosition, setCurrentPosition] = useState(); //by default

	const { isLoggedIn, isRegular, devicePositions, groupDevices } = useSelector(state => ({
		isLoggedIn: isUserLoggedIn(state),
		isRegular: isRoleRegular(state),
		devicePositions: getLiveTrackingDeviceList(state),
		groupDevices: getLivetrackingGroupDevicesListInfo(state)
	}));

	const [deviceList, setDeviceList, deviceListRef] = useStateRef(groupDevices);
	const [selectedDevice, setSelectedDevice, selectedDeviceRef] = useStateRef();
	const [selectedDeviceIndex, setSelectedDeviceIndex, selectedDeviceIndexRef] = useStateRef(0);
	const [devicePositionArray, setDevicePositionArray, devicePositionArrayRef] = useStateRef([]);
	const [coordList, setCoordList] = useState([]);
	const [lineString, setLineString] = useState(null);
	const [region, setRegion] = useStateRef();
	const isFocused = useIsFocused();

	useEffect(()=>{
		setDeviceList(groupDevices);
		if (!isEmpty(deviceList)) {
			const device = deviceList[selectedDeviceIndex];
			setSelectedDevice(device);		
		}
	},[groupDevices])

	const mapRef = useRef();

	React.useEffect(
		() => {
			isFocused ? null : setIsLineClick(false);
		},
		[isFocused]
	);

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
			if (!isEmpty(devicePositions) && selectedDeviceRef.current && selectedDevice) {
				const deviceInfo = selectedDevice;
				const arr = devicePositions.filter(item => item.deviceId === deviceInfo.id)
				if (!isEmpty(arr)) {
					let arrList = devicePositionArray;
					const devicePositionObject = mapKeys(arrList,'id');
					const device = arr[0];
					const updatedDevicePositionObject = {
						...devicePositionObject,
						...{[device.id]: device}
					};
					const arrLogs = Object.values(updatedDevicePositionObject)
					arrLogs.sort((a, b) => new Date(a.deviceTime).getTime() - new Date(b.deviceTime).getTime());
					setDevicePositionArray(arrLogs);
					console.log("arraylog",arrLogs)
				}
			}
		},
		[devicePositions]
	);

	useEffect(() => {
		if (!isEmpty(devicePositionArray) && devicePositionArray.length > 1) {
			if (isAndroid) {
				const arrCoords = devicePositionArray.map(item => {
					let arr = [];
						arr.push(item.longitude);
						arr.push(item.latitude);
						return arr;
				});
				let line = makeLineString(arrCoords);
				setLineString(line);
				console.log("line",line)
			} else {
				let arrCoords = [];
				devicePositionArray.map((item) => {
					arrCoords.push({
						'latitude': item.latitude,
						'longitude': item.longitude
					})
				})
				setCoordList(arrCoords)
				mapRef && mapRef.current && mapRef.current.fitToCoordinates(arrCoords, {
					edgePadding: DEFAULT_PADDING,
					animated: true,
				});
			}
		}
	}, [devicePositionArray]);

	useEffect(
		() => {
			if (selectedDeviceRef.current) {
				const deviceInfo = selectedDeviceRef.current;
				const arr = devicePositions.filter(item => item.deviceId === deviceInfo.id);
				if (!isEmpty(arr)) {
					const device = arr[0];
					let deviceRegion = {
						latitude: device.latitude,
						longitude: device.longitude,
						latitudeDelta: LATITUDE_DELTA,
						longitudeDelta: LONGITUDE_DELTA,
					};
					setDevicePositionArray([device]);
					setRegion(deviceRegion);
				}
				console.log(deviceInfo);
			}
		},
		[selectedDevice]
	);

	const onPressHandle = ({ navigation, item, color, setColor }) => {
 		if (item == 'Geo Fence') {
			setIsLineClick(false);
			navigation.navigate(SCREEN_CONSTANTS.GEOFENCE);
		} else if (item == 'Alarms') {
			setIsLineClick(false);
			navigation.navigate(SCREEN_CONSTANTS.ALARMS);
		} else if (item == 'Trip History'){
			navigation.navigate(SCREEN_CONSTANTS.TRIP_HISTORY);
		}	
		else if (item === 'Asset Information') {
			setIsLineClick(false)
			navigation.navigate(SCREEN_CONSTANTS.SENSOR_INFO)
		}
	};

	function navigateToDeviceSetup() {
		setIsLineClick(false);
		NavigationService.push(SCREEN_CONSTANTS.ACTIVATE_DEVICE);
	}

	function onPressNext() {
		let i = selectedDeviceIndexRef.current;
		const arr = deviceListRef.current ? deviceListRef.current : [];
		i = i + 1; // increase i by one
		i = i % arr.length; // if we've gone too high, start from `0` again
		const device = arr[i];
		setSelectedDevice(device);
		setSelectedDeviceIndex(i);
		setDevicePositionArray([]);
	}

	function onPressPrevious() {
		let i = selectedDeviceIndexRef.current;
		const arr = deviceListRef.current ? deviceListRef.current : [];
		if (i === 0) {
			// i would become 0
			i = arr.length; // so put it at the other end of the array
		}
		i = i - 1; // decrease by one
		const device = arr[i];
		setSelectedDevice(device);
		setSelectedDeviceIndex(i);
		setDevicePositionArray([]);
	}

	function renderDeviceSelectionView() {
		const deviceInfo = selectedDeviceRef.current;

		return (
			<View
				style={{
					height: hp(5),
					backgroundColor: ColorConstant.WHITE,
					position: 'absolute',
					marginTop: hp(4),
					borderRadius: 9,
					alignSelf: 'center',
					justifyContent: 'center',
					marginHorizontal: hp(3),
					width:wp(88)
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
					<TouchableOpacity style={{padding:hp(1)}} onPress={() => onPressPrevious()}>
						<Image
							source={images.dashBoard.leftIcon}
							resizeMode="contain"
							style={{ width: wp(2), height: hp(2) }}
						/>
					</TouchableOpacity>
					<Text style={{ color: ColorConstant.BROWN, fontSize: FontSize.FontSize.tow, marginHorizontal: hp(1), fontFamily:"Nunito-Bold" }}>
						{` ${deviceInfo.name} `}
					</Text>
					<TouchableOpacity style={{padding:hp(1)}} onPress={() => onPressNext()}>
						<RightArrowIcon resizeMode="contain" width={9.779} height={13.351} />
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	function renderAppleMap() {
		const isContainCoordinate = !isEmpty(devicePositionArrayRef.current);
		const isPolyLine = isEmpty(devicePositionArrayRef.current) ? false : devicePositionArrayRef.current.length > 1;
		const startingDestination = isContainCoordinate ? devicePositionArrayRef.current[0] : null;
		const address = isContainCoordinate ? startingDestination.address : '';
		const coordinate = isContainCoordinate
			? { latitude: startingDestination.latitude, longitude: startingDestination.longitude }
			: null;
		return (
			<Map.default 
				style={StyleSheet.absoluteFillObject} 
				region={region} ref={mapRef} 
				showsUserLocation={true}>

				{isContainCoordinate && 
					<Map.Marker 
						coordinate={coordinate} 
						description={address} />}

				{isPolyLine &&
					<Map.Polyline
						coordinates={coordList}
						strokeColor={ColorConstant.ORANGE} // fallback for when `strokeColors` is not supported by the map-provider
						strokeWidth={3}
					/>}
			</Map.default>
		);
	}

	function renderMapBox() {
		const isContainCoordinate = !isEmpty(devicePositionArrayRef.current);
		const isPolyLine = isEmpty(devicePositionArrayRef.current) ? false : devicePositionArrayRef.current.length > 1;
		const startingDestination = isContainCoordinate ? devicePositionArrayRef.current[0] : null;
		const address = isContainCoordinate ? startingDestination.address : '';
		let coordinate = [];
		if (isContainCoordinate) {
			coordinate.push(startingDestination.longitude);
			coordinate.push(startingDestination.latitude);
		}
		return (
			<View style={{ flex: 1 }}>
				<Map.default.MapView style={{ flex: 1 }}>
					<Map.default.UserLocation
						renderMode="normal"
						visible={true}
						showsUserHeadingIndicator={true}
						animated={true}
					/>
					{isContainCoordinate &&
						<Map.default.Camera
							zoomLevel={14}
							bounds={{
								ne: coordinate,
								sw: coordinate,
							}}
						/>}
					{!isEmpty(lineString)
						? <Map.default.ShapeSource id="route" shape={lineString}>
								<Map.default.LineLayer
									id="lineroute"
									style={{
										lineCap: 'round',
										lineWidth: 3,
										lineOpacity: 0.84,
										lineColor: ColorConstant.ORANGE,
									}}
								/>
							</Map.default.ShapeSource>
						: null}
					{isContainCoordinate &&
						<Map.default.PointAnnotation id={`1`} coordinate={coordinate} key={1} title={``}>
							<Map.default.Callout title={address} />
						</Map.default.PointAnnotation>}
				</Map.default.MapView>
			</View>
		);
	}

	return (
		<View onStartShouldSetResponder={() => setIsLineClick(false)} style={styles.container}>
			{isAndroid ? renderMapBox() : renderAppleMap()}
			{/* {renderAppleMap()} */}
			{selectedDeviceRef.current && renderDeviceSelectionView()}
			<View style={[styles.subContainer,{marginTop:selectedDeviceRef.current ? hp(11) : hp(5)}]}>
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

const data = ['Geo Fence', 'Asset Information', 'Alarms',"Trip History"]

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
	}
});

export default LiveTracking
