import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, Platform, TouchableOpacity } from 'react-native';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import BottomSheet from 'reanimated-bottom-sheet';
import FontSize from '../../component/FontSize';
import { getAdvanceSettingsInfo, getLiveTrackingDeviceList, getLivetrackingGroupDevicesListInfo, dist, getLivetrackingDevicesListInfo } from './../Selector';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import mapKeys from 'lodash/mapKeys';
import Moment from 'moment'
import { lineString as makeLineString } from '@turf/helpers';
import useStateRef from '../../utils/useStateRef';
import _ from 'lodash';
import { BackIcon, LiveEndPointIcon, LiveStartPointIcon } from '../../component/SvgComponent';
import { convertDist, convertSpeed, convertTime } from '../../utils/helper';
import { MAP_BOX_STYLEURL, rasterSourceProps } from '../../constants/AppConstants';

const Map = Platform.select({
	ios: () => require('react-native-maps'),
	android: () => require('@rnmapbox/maps'),
})();

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.9;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };

const isAndroid = Platform.OS === 'android';

// const {height} = Dimensions.get('window')

const LiveTrackingDetails = ({navigation, route}) => {

	console.log("props",route.params)

	const { selectedDevice, deviceName, selectedDeviceIndex }  = route.params

	const sheetRef = useRef(null);

	const mapRef = useRef();

	const { isConnected, devicePositions, groupDevices, liveTrakingDeviceList, advSettings, distUnit } = useSelector(state => ({
		isConnected: state.network.isConnected,
		devicePositions: getLiveTrackingDeviceList(state),
		groupDevices: getLivetrackingGroupDevicesListInfo(state),
		liveTrakingDeviceList: getLivetrackingDevicesListInfo(state),
		advSettings: getAdvanceSettingsInfo(state),
		distUnit: dist(state)
	}));

	const [singleSelectedDevice, setSingleSelectedDevice] = useState()
	const [lineString, setLineString] = useState(null)
	const [devicePositionArray, setDevicePositionArray] = useState([]);
	const [region, setRegion] = useState();
	const [coordList, setCoordList] 	= useState([]);
    const [bottomToggle, setBottomToggle] = useState(false)
    const [address, setAddress] = useState()

    React.useLayoutEffect(() => {

        navigation.setOptions({
            headerTitle: () => (
                <Text style={{
                    color: ColorConstant.GREY,
                    fontSize: FontSize.FontSize.medium,
                    fontWeight: '500',
                    //letterSpacing: 0,
                    textAlign:'center' }}>
                    {deviceName}
                </Text>          
            ),
            headerLeft: () => (
                <TouchableOpacity style={{padding:hp(2)}} onPress={() => navigation.goBack()}>
                    <BackIcon />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

	useEffect(
		() => {
			if (selectedDevice) {
				const deviceInfo = selectedDevice;
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
					console.log("deviceRegion",deviceRegion);
				}
			}
		},
		[selectedDevice]
	);
	
	useEffect(
		() => {
			if (!isEmpty(devicePositions) && selectedDevice) {
				const deviceInfo = selectedDevice;
				const arr = devicePositions.filter(item => item.deviceId === deviceInfo.id)
				if (!isEmpty(arr)) {
					setSingleSelectedDevice(arr[0])
					let arrList = devicePositionArray;
					const devicePositionObject = mapKeys(arrList,'id');
					const device = arr[0];
					const updatedDevicePositionObject = {
						...devicePositionObject,
						...{[device.id]: device}
					};
					const arrLogs = Object.values(updatedDevicePositionObject)
					arrLogs.sort((a, b) => a.id - b.id);
					setDevicePositionArray(arrLogs);
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
			} else {
				const arrCoords = devicePositionArray.map((item) => {
					return {
						'latitude': item.latitude,
						'longitude': item.longitude
					}
				})
				setCoordList(arrCoords)
				// mapRef && mapRef.current && mapRef.current.fitToCoordinates(arrCoords, {
				// 	edgePadding: DEFAULT_PADDING,
				// 	animated: true,
				// });
			}
		}
	},[devicePositionArray])

	console.log("deviceSingle",devicePositionArray)
    
    React.useEffect(()=>{

		sheetRef.current.snapTo(0)
        // sheetRef.current.collapse()
    
    },[])

    useEffect(()=>{
        if(bottomToggle)
            sheetRef.current.snapTo(2)
        else
            sheetRef.current.snapTo(0)
    },[bottomToggle])

	const renderContent = () => (
		<View style={styles.subView}>
			<Text style={styles.mainTitle}>Tracking Details</Text>
			<View style={styles.subContainerView}>
				<Text style={styles.title}>Address</Text>
				<Image style={styles.icon} source={images.dashBoard.pin}/>
			</View> 
			<View style={styles.address}>
				{/* <Text style={{fontSize:FontSize.FontSize.small}}>900 Dufferian Street,{'\n'}Toronto MG L40 1V6 {'\n'}Canada</Text> */}
				<Text style={{fontSize:FontSize.FontSize.small}}>{address ? address : singleSelectedDevice ? singleSelectedDevice.address : '-'}</Text>
			</View>
			<View style={styles.subContainerView}>
				<Text style={styles.title}>Date & Time</Text>
				<Image style={styles.icon} source={images.dashBoard.calender}/>
			</View> 
			<View style={styles.otherDetails}>
				<Text style={styles.date}>{singleSelectedDevice ? convertTime(singleSelectedDevice.deviceTime,advSettings).format("DD-MM-YYYY") : '-'}</Text>
				<Text style={[styles.date,{flex:1}]}>{singleSelectedDevice ? convertTime(singleSelectedDevice.deviceTime,advSettings).format("h:mm:ss") : '-'}</Text>
			</View> 
			<View style={styles.subContainerView}>
				<Text style={styles.title}>Other details</Text>
				<Image style={styles.icon} source={images.dashBoard.list}/>
			</View> 
			<View style={styles.otherDetails}>
				<View style={{flex:1}}>
					<Text style={styles.otherDetailText}>Duration</Text>
					<Text style={[styles.otherDetailText,{color:ColorConstant.BLACK}]}>Not available</Text>
				</View>
				<View style={{flex:1}}>
					<Text style={styles.otherDetailText}>Distance</Text>
					<Text style={[styles.otherDetailText,{color:ColorConstant.BLACK}]}>{convertDist(singleSelectedDevice && singleSelectedDevice.attributes && singleSelectedDevice.attributes.distance, distUnit)}</Text>
				</View>
				<View style={{flex:0.3}}>
					<Text style={styles.otherDetailText}>Speed</Text>
					<Text style={[styles.otherDetailText,{color:ColorConstant.BLACK}]}>{convertSpeed(singleSelectedDevice && singleSelectedDevice.speed, distUnit)}</Text>
				</View>    
			</View>         
		</View>
	);

	function renderAppleMap() {
		const isContainCoordinate = !isEmpty(devicePositionArray);
		const isPolyLine = isEmpty(devicePositionArray) ? false : devicePositionArray.length > 1;
		const startingDestination = isContainCoordinate ? devicePositionArray[0] : null;
		const endDestination = isContainCoordinate ? devicePositionArray[devicePositionArray.length - 1] : null;
		const startAddress = isContainCoordinate ? startingDestination.address : '';
		const endAddress = isContainCoordinate ? endDestination.address : '';
		const startCoordinate = isContainCoordinate
			? { latitude: startingDestination.latitude, longitude: startingDestination.longitude }
			: null;

		const endCoordinate = isContainCoordinate
		? { latitude: endDestination.latitude, longitude: endDestination.longitude }
		: null;
		const isOnline = !isEmpty(liveTrakingDeviceList) && liveTrakingDeviceList[selectedDeviceIndex].status == "online" ? true : false;
		return (
			<Map.default 
				style={StyleSheet.absoluteFillObject} 
				initialRegion={region} ref={mapRef} 
				showsUserLocation={false}>
                    
				{isContainCoordinate && 
					<Map.Marker 
                        onPress={()=>{
                            setBottomToggle(!bottomToggle)
                            setAddress(startAddress)
                        }}
						coordinate={startCoordinate} >                        
                            {/* <LiveStartPointIcon /> */}
							<LiveStartPointIcon width={isOnline ? 10 : 7} isDeviceOnline={isOnline} /> 
					</Map.Marker>}

				{isContainCoordinate && 
					<Map.Marker 
                        onPress={()=>{
                            setBottomToggle(!bottomToggle)
                            setAddress(endAddress)
                        }}
						coordinate={endCoordinate} >						
                            {/* <LiveEndPointIcon /> */}
							<LiveEndPointIcon width={isOnline ? 60 : 54} isDeviceOnline={isOnline}  />
					</Map.Marker>}

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
		const isContainCoordinate = !isEmpty(devicePositionArray);
		const isPolyLine = isEmpty(devicePositionArray) ? false : devicePositionArray.length > 1;
		const startingDestination = isContainCoordinate ? devicePositionArray[0] : null;
		const liveEndPoint = isContainCoordinate ? devicePositionArray[devicePositionArray.length-1] : null;
		const startAddress = isContainCoordinate ? startingDestination.address : '';
		const endAddress = isContainCoordinate ? liveEndPoint.address : '';
		const isOnline = !isEmpty(liveTrakingDeviceList) && liveTrakingDeviceList[selectedDeviceIndex].status == "online" ? true : false;
		let startCoordinate = [];
		if (isContainCoordinate) {
			startCoordinate.push(startingDestination.longitude);
			startCoordinate.push(startingDestination.latitude);
		}
		let endCoordinate = [];
		if (isContainCoordinate) {
			endCoordinate.push(liveEndPoint.longitude);
			endCoordinate.push(liveEndPoint.latitude);
		}

		return (
			<View style={{ flex: 1 }}>
				<Map.default.MapView  style={{ flex: 1 }} attributionEnabled={false} logoEnabled={false} rotateEnabled={false} styleURL={MAP_BOX_STYLEURL}>
					{/* <Map.default.UserLocation
						renderMode="normal"
						visible={true}
						showsUserHeadingIndicator={true}
						animated={true}
					/> */}
					{isContainCoordinate ?
						<Map.default.Camera
						zoomLevel={15}
						minZoomLevel={4}
						maxZoomLevel={15}
							bounds={{
								ne: endCoordinate,
								sw: endCoordinate,
							}}
						/>:
						<Map.default.Camera
						minZoomLevel={4}
						maxZoomLevel={15}
							zoomLevel={3}
							centerCoordinate={[79.570507, 22.385092]}
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
						<Map.default.PointAnnotation id={`1`} 
                            onSelected={()=>{
                                setBottomToggle(!bottomToggle)
                                setAddress(startAddress)
                            }}
                            coordinate={startCoordinate} key={1} title={``}>
								<LiveStartPointIcon width={isOnline ? 10 : 7} isDeviceOnline={isOnline} /> 
							{/* <LiveStartPointIcon />  */}
						</Map.default.PointAnnotation>}

					{isContainCoordinate &&
						<Map.default.PointAnnotation id={`2`} 
                            onSelected={()=>{
                                setBottomToggle(!bottomToggle)
                                setAddress(endAddress)
                            }}
                            coordinate={endCoordinate} key={2} title={``}>
								 <LiveEndPointIcon width={isOnline ? 60 : 54} isDeviceOnline={isOnline}  />
							{/* <LiveEndPointIcon/> */}
						</Map.default.PointAnnotation>}
					<Map.default.RasterSource {...rasterSourceProps}>
						<Map.default.RasterLayer
							id="googleMapLayer"
							sourceID="googleMapSource"
							// style={{rasterOpacity: 0.5}}
					
							layerIndex={0}
						/>
					</Map.default.RasterSource>	
				</Map.default.MapView>
			</View>
		);
	}


	return (
		<View style={styles.container}>

			{isAndroid ? renderMapBox() : renderAppleMap()}

			<BottomSheet
				ref={sheetRef}
				snapPoints={[hp(7), height/4, height/2.3 ]}
				borderRadius={30}
				renderContent={renderContent}
			/>

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

export default LiveTrackingDetails;