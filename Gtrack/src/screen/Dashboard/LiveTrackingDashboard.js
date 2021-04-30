import React, { useRef, useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Platform, Dimensions } from 'react-native';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import NavigationService from '../../navigation/NavigationService';
import ShadowView from 'react-native-simple-shadow-view';
import { MapView } from '../../component';
import { FullScreenIcon, RefreshIcon, RightArrowIcon } from '../../component/SvgComponent';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUserDevicesList, getLiveTrackingDeviceList } from '../Selector';
import mapKeys from 'lodash/mapKeys';
import useStateRef from '../../utils/useStateRef';
import isEmpty from 'lodash/isEmpty';
import { lineString as makeLineString } from '@turf/helpers';
	
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.9;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };


const isAndroid = Platform.OS === 'android';

const Map = Platform.select({
	ios: () => require('react-native-maps'),
	android: () => require('@react-native-mapbox-gl/maps'),
})();

const LiveTrackinDashboard = ({ navigation, route }) => {
	const dispatch = useDispatch();

	const { isConnected, devicePositions, deviceListInfo } = useSelector(state => ({
		isConnected: state.network.isConnected,
		devicePositions: getLiveTrackingDeviceList(state),
		deviceListInfo: getAllUserDevicesList(state),
	}));

	const [deviceList, setDeviceList, deviceListRef] = useStateRef(deviceList);
	const [selectedDevice, setSelectedDevice, selectedDeviceRef] = useStateRef();
	const [selectedDeviceIndex, setSelectedDeviceIndex, selectedDeviceIndexRef] = useStateRef();
	const [devicePositionArray, setDevicePositionArray, devicePositionArrayRef] = useStateRef([]);
	const [coordList, setCoordList] = useState([])
    const [lineString, setLineString] = useState(null)
	const [region, setRegion] = useStateRef()


	const mapRef = useRef();

	useEffect(
				() => {
					setDeviceList(deviceListInfo);
					if (!isEmpty(deviceListInfo)) {
						const device = deviceListInfo[0];
						setSelectedDevice(device.deviceDTO);
						setSelectedDeviceIndex(0);
					}
				},
				[deviceListInfo]
			);

		useEffect(
			() => {
				if (!isEmpty(devicePositions) && selectedDeviceRef.current) {
					const deviceInfo = selectedDeviceRef.current;
					const arr = devicePositions.filter(item => item.deviceId === deviceInfo.traccarDeviceId);
					if (!isEmpty(arr)) {
						let arrList = devicePositions;
						const devicePositionObject = mapKeys('id', arrList);
						const device = arr[0];
						// const updatedDevicePositionObject = { ...devicePositionObject, ...{ [device.traccarDeviceId]: device } };
						const updatedDevicePositionObject = {
													...devicePositionObject,
													...{ [device.traccarDeviceId]: device },
						};
						const arrLogs = Object.values(updatedDevicePositionObject);
						arrLogs.sort((a, b) => new Date(a.deviceTime).getTime() - new Date(b.deviceTime).getTime());
						setDevicePositionArray(arrLogs);
					}
				}
			},
			[devicePositions]
		);

		useEffect(
			() => {
				if (selectedDeviceRef.current) {
					const deviceInfo = selectedDeviceRef.current;
					const arr = devicePositions.filter(item => item.deviceId === deviceInfo.traccarDeviceId);
					if (!isEmpty(arr)) {
						const device = arr[0];
						// let deviceRegion = { latitude: device.latitude, longitude: device.longitude, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA }
						let deviceRegion = {
							latitude: device.latitude,
							longitude: device.longitude,
							latitudeDelta: LATITUDE_DELTA,
							longitudeDelta: LONGITUDE_DELTA,
						};
						setDevicePositionArray([device]);
						setRegion(deviceRegion)
					}
					console.log(deviceInfo);
				}
			},
			[selectedDevice]
		);

		useEffect(() => {
			if (!isEmpty(devicePositionArray) && devicePositionArray.length > 1) {
				if (isAndroid) {
	
				} else {
					const arrCoords = devicePositionArray.map((item) => {
						return {
							'latitude': item.latitude,
							'longitude': item.longitude
						}
					})
					setCoordList(arrCoords)
					mapRef && mapRef.current && mapRef.current.fitToCoordinates(arrCoords, {
						edgePadding: DEFAULT_PADDING,
						animated: true,
					});
				}
			}
		},[devicePositionArray])

		function renderAppleMap() {
			const isContainCoordinate = !isEmpty(devicePositionArrayRef.current)
			const isPolyLine = isEmpty(devicePositionArrayRef.current) ? false : devicePositionArrayRef.current.length > 1
			const startingDestination = isContainCoordinate ? devicePositionArrayRef.current[0] : null
			const address = isContainCoordinate ? startingDestination.address : ''
			const coordinate = isContainCoordinate ? { latitude: startingDestination.latitude, longitude: startingDestination.longitude } : null
			return (
				<Map.default style={StyleSheet.absoluteFillObject} region={region} ref={mapRef} showsUserLocation={true}>
					{isContainCoordinate && <Map.Marker
								coordinate={coordinate}
								description={address}
							/>}
					{isPolyLine && <Map.Polyline
						coordinates={coordList}
						
						strokeColor={ColorConstant.ORANGE} // fallback for when `strokeColors` is not supported by the map-provider
						strokeWidth={3}
					/>}
				</Map.default>			
			)
		}

			function onPressNext() {
				let i = selectedDeviceIndexRef.current;
				const arr = deviceListRef.current ? deviceListRef.current : [];
				i = i + 1; // increase i by one
				i = i % arr.length; // if we've gone too high, start from `0` again
				const device = arr[i];
				setSelectedDevice(device.deviceDTO);
				setSelectedDeviceIndex(i);
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
				setSelectedDevice(device.deviceDTO);
				setSelectedDeviceIndex(i);
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
									zoomLevel={3}
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

	function renderRightPanel() {
		return (
			<View style={styles.rightMainViewStyle}>
				<TouchableOpacity onPress={() => NavigationService.navigate('TrackingDetails')}>
					<FullScreenIcon style={styles.ViewallStyle} resizeMode="contain" />
				</TouchableOpacity>

				<TouchableOpacity>
					<RefreshIcon style={styles.refreshImageStyle} resizeMode="contain" />
				</TouchableOpacity>
			</View>
		);
	}

	function renderDeviceSelectionView() {
		const deviceInfo = selectedDeviceRef.current;

		return (
			<View
				style={{
					height: hp(3),
					backgroundColor: ColorConstant.WHITE,
					position: 'absolute',
					marginTop: hp(3),
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
					<TouchableOpacity onPress={() => onPressPrevious()}>
						<Image
							source={images.dashBoard.leftIcon}
							resizeMode="contain"
							style={{ width: wp(1.5), height: hp(1.5) }}
						/>
					</TouchableOpacity>
					<Text style={{ color: ColorConstant.BROWN, fontSize: hp(1.4), marginHorizontal: hp(1) }}>
						{` ${deviceInfo.deviceName} `}
					</Text>
					<TouchableOpacity onPress={() => onPressNext()}>
						<RightArrowIcon resizeMode="contain" width={6.779} height={10.351} />
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	return (
		<ShadowView style={styles.deviceSummaryContainer}>
			<View style={styles.deviceSummaryMainViewStyle}>
				<View style={styles.leftMainViewStyle}>
					<Text style={{ fontSize: hp(1.4), fontWeight: 'bold', color: ColorConstant.BLACK }}>
						Live Tracking
					</Text>
				</View>

				{renderRightPanel()}
			</View>

			<View style={{ height: hp(30), width: '100%', paddingHorizontal: wp(5), paddingBottom: hp(2) }}>
				{/* <MapView /> */}
				{isAndroid ? renderMapBox() : renderAppleMap()}

				<View style={styles.subContainer}>
				{selectedDeviceRef.current && renderDeviceSelectionView()}
				</View>
			</View>
		</ShadowView>
	);
};

export default LiveTrackinDashboard;

const styles = StyleSheet.create({
	conatiner: {
		flex: 1,
	},
	deviceSummaryContainer: {
		backgroundColor: ColorConstant.WHITE,
		width: '93%',
		marginVertical: hp(2),
		// height: hp(40),
		borderRadius: hp(5.5 / 2),
		borderWidth: 0.5,
		borderColor: ColorConstant.WHITE,
		shadowColor: ColorConstant.BLACK,
		shadowOpacity: 0.3,
		shadowRadius: 6,
		shadowOffset: { width: 0, height: 0 },
		alignSelf: 'center',
		marginTop: hp(2),
	},
	deviceSummaryMainViewStyle: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: hp(2.5),
	},
	leftMainViewStyle: {
		paddingHorizontal: wp(5),
		paddingBottom: hp(3),
	},
	rightMainViewStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: wp(6),
		paddingBottom: hp(3),
	},
	ViewallStyle: {
		height: hp(2),
		width: hp(2),
		marginRight: wp(3),
	},
	refreshImageStyle: {
		height: hp(2),
		width: hp(2),
	},
	subContainer: {
		position: 'absolute',
		width: '80%',
		alignSelf: 'center',
	},
	bellIconStyle: {
		borderRadius: 13,
		height: hp(7.3),
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		backgroundColor: ColorConstant.WHITE,
	},
});
