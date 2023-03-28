import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Platform, Dimensions, Modal, FlatList,Linking } from 'react-native';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { lineString as makeLineString } from '@turf/helpers';
import { useSelector, useDispatch } from 'react-redux';
import { isRoleRegular, isUserLoggedIn, getAllUserDevicesList, getLiveTrackingDeviceList, getLivetrackingGroupDevicesListInfo, getLoginState, hasPanicAlarm, getLiveNotificationsInfo, getPanicAlarm, getLiveNotificationCountsInfo, getLivetrackingDevicesListInfo } from '../Selector';
import useSubscribeLocationUpdates from '../../utils/useSubscribeLocationUpdates';
import { MapView, FontSize, CustomDialog, PanicDialog } from '../../component';
import NavigationService from '../../navigation/NavigationService';
import { translate } from '../../../App';
import { AppConstants, MAP_BOX_STYLEURL, MAP_BOX_VIEW_STYLESHEET, rasterSourceProps, SCREEN_CONSTANTS } from '../../constants/AppConstants';
import { BellIcon, BluelineIcon, DownArrowOrangeIcon, GtrackIndiaLogoNew, LiveEndPointIcon, LiveStartPointIcon, LiveTrackingPlusIcon, LoginIcon, OrangelineIcon, PanicAlarmIcon, PanicIcon, PanicIconClick, UpArrowOrangeIcon } from '../../component/SvgComponent';
import { useIsFocused } from '@react-navigation/native';
import { FullScreenIcon, RefreshIcon, RightArrowIcon } from '../../component/SvgComponent';
import useStateRef from '../../utils/useStateRef';
import * as LivetrackingActions from './Livetracking.Action'
import isEmpty from 'lodash/isEmpty';
import mapKeys from 'lodash/mapKeys';
import KeepAwake from 'react-native-keep-awake';
import Dialog from '../../component/Dialog'
import { isNewNotification } from '../../utils/socketHelper';
import { sendEvent } from '../../provider/SocketProvider';
import url from 'socket.io-client/lib/url';
import RBSheet from "react-native-raw-bottom-sheet";
import IconConstant from '../../constants/iconConstant';
import { map } from 'lodash';
import FindMyDevice from '../../component/SvgComponent/FindMyDevice';
import AppManager from '../../constants/AppManager';
import { useFocusEffect } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');


const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.9;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };

const Map = Platform.select({
	ios: () => require('react-native-maps'),
	android: () => require('@rnmapbox/maps'),
})();

const isAndroid = Platform.OS === 'android';

const LiveTracking = ({ navigation }) => {
	const [isLineClick, setIsLineClick] = useState(false);
	const [currentPosition, setCurrentPosition] = useState(); //by default
	const [isPlusClick, setIsPlusClick] = useState(false);
	const { isLoggedIn, isRegular, devicePositions, groupDevices, liveTrakingDeviceList, loginData, hasPanic, notiEvents, getPanicDetail, isNewEvent } = useSelector(state => ({
		isLoggedIn: isUserLoggedIn(state),
		isRegular: isRoleRegular(state),
		devicePositions: getLiveTrackingDeviceList(state),
		groupDevices: getLivetrackingGroupDevicesListInfo(state),
		liveTrakingDeviceList: getLivetrackingDevicesListInfo(state),
		hasPanic: hasPanicAlarm(state),
		loginData: getLoginState(state),
		notiEvents: getLiveNotificationsInfo(state),
		getPanicDetail: getPanicAlarm(state),
		isNewEvent: getLiveNotificationCountsInfo(state),
	}));
	// console.log('groupdevices-----------', groupDevices,)

	const dispatch = useDispatch()
	const [deviceList, setDeviceList] = useState(groupDevices);
	const [selectedDevice, setSelectedDevice] = useState();
	const [selectedDeviceIndex, setSelectedDeviceIndex] = useState(0);
	const [devicePositionArray, setDevicePositionArray] = useState([]);
	const [coordList, setCoordList] = useState([]);
	const [lineString, setLineString] = useState(null);
	const [region, setRegion] = useState();
	const [isPanicAlarmClick, setIsPanicAlarmClick] = useState(false);
	const [isPanicTimerVisible, setIsPanicTimerVisible] = useState(false);
	const [isPanicAlarmCreateDialog, setIsPanicAlarmCreateDialog] = useState(false);
	const [isVisible, setIsVisible] = useState(false)
	const [bottomSheetVisible, setBottomSheetVisible] = useState(false)
	const[showStartLocation,setShowStartLocation]=useState(false)
	const [flatListData,setFlatlistData] = useState()
	const isFocused = useIsFocused()

	const sheetRef = useRef(null);


  useEffect(() => {
		setDeviceList(groupDevices);
	}, [groupDevices])

	useEffect(() => {
		if (!isEmpty(deviceList)) {
			const device = deviceList[selectedDeviceIndex];
			setSelectedDevice(device);
		}
	}, [deviceList])

	useEffect(() => {
		AppManager.showLoader()
		dispatch(LivetrackingActions.requestGetAlarmsList(loginData.id, onSuccess, onError))
	
	}, [])
	
	// React.useFocusEffect(
	// 	React.useEffect(()=>{
		
	// 	},[])
			
	// 		// Expensive task
		  
	//   );
	useFocusEffect(
		React.useCallback(() => {
			AppManager.showLoader()
			dispatch(LivetrackingActions.requestGetGroupDevices(loginData.id,null, onSuccess, onError))
	
		  return () => {
	
			// alert('Screen was unfocused');
			// Useful for cleanup functions
	
		  };
		}, [])
	);
	useEffect(()=>{
		if(bottomSheetVisible === false){
			setFlatlistData(liveTrakingDeviceList)
		}
	},[liveTrakingDeviceList])

	function onSuccess(data) {
		AppManager.hideLoader()
		console.log("Success", data)
	}

	function onError(error) {
		AppManager.hideLoader()
		console.log("Error", error)
	}

	const mapRef = useRef();

	React.useEffect(
		() => {
			if (isFocused) {
				console.log('devicePositionArray', devicePositionArray, devicePositionArray[devicePositionArray.length - 1])
				setLineString(null)
				setCoordList([])
				!isEmpty(devicePositionArray) && setDevicePositionArray([devicePositionArray[devicePositionArray.length - 1]])
				KeepAwake.activate()
			} else {
				setIsLineClick(false);
				setIsPlusClick(false);
				KeepAwake.deactivate();
			}
			return () => { console.log('deactivate'); KeepAwake.deactivate(); }
		},
		[isFocused]
	);

	function sendTraccarApi() {
		dispatch(LivetrackingActions.requestSendPanicData(selectedDevice.uniqueId, onSuccess, onError))
	}

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
			if (!isEmpty(devicePositions) && selectedDevice) {
				const deviceInfo = selectedDevice;
				const arr = devicePositions.filter(item => item.deviceId === deviceInfo.id)
				if (!isEmpty(arr)) {
					let arrList = devicePositionArray;
					const devicePositionObject = mapKeys(arrList, 'id');
					const device = arr[0];
					const updatedDevicePositionObject = {
						...devicePositionObject,
						...{ [device.id]: device }
					};
					const arrLogs = Object.values(updatedDevicePositionObject)
					console.log('arraylog updatedDevicePositionObject', arrLogs, updatedDevicePositionObject)
					arrLogs.sort((a, b) => a.id - b.id);
					setDevicePositionArray(arrLogs);
					console.log("arraylog", arrLogs)
				}
			}
		},
		[devicePositions]
	);
	useEffect(() => {
		console.log('devicePositionArray', devicePositionArray)
		if (!isEmpty(devicePositionArray) && devicePositionArray.length > 1) {
			if (isAndroid) {
				const arrCoords = devicePositionArray.map(item => {
					let arr = [];
					arr.push(item.longitude);
					arr.push(item.latitude);
					return arr;
				});
				let line = makeLineString(arrCoords);
				console.log('devicePositionArray 123', devicePositionArray)
				setLineString(line);
				console.log("line", line)
			} else {
				let arrCoords = [];
				devicePositionArray.map((item) => {
					arrCoords.push({
						'latitude': item.latitude,
						'longitude': item.longitude
					})
				})
				setCoordList(arrCoords)
				// mapRef && mapRef.current && mapRef.current.fitToCoordinates(arrCoords, {
				// 	edgePadding: DEFAULT_PADDING,
				// 	//animated: true,
				// });
			}
		}
	}, [devicePositionArray]);

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
				}
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
		} else if (item == 'Trip History') {
			navigation.navigate(SCREEN_CONSTANTS.TRIP_HISTORY);
		}
		else if (item == 'Location History') {
			navigation.navigate(SCREEN_CONSTANTS.LOCATION_HISTORY);
		}
		else if (item === 'Asset Information') {
			setIsLineClick(false)
			navigation.navigate(SCREEN_CONSTANTS.SENSOR_INFO)
		}
	};

	const onItemPress = ({ navigation, item, color, setColor }) => {
		if (item == 'Tracker Device') {
			setIsPlusClick(false);
			setIsLineClick(false);
			navigateToDeviceSetup()
		} else if (item == 'Mobile as Tracker') {
			setIsPlusClick(false);
			setIsLineClick(false);
			navigation.navigate(SCREEN_CONSTANTS.ADD_MOBILE_TRACKER);
		}
	};

	function navigateToDeviceSetup() {
		setIsLineClick(false);
		setIsPlusClick(false);
		NavigationService.navigate(SCREEN_CONSTANTS.ACTIVATE_DEVICE);
	}

	function onPressNext() {
		let i = selectedDeviceIndex;
		const arr = deviceList ? deviceList : [];
		i = i + 1; // increase i by one
		i = i % arr.length; // if we've gone too high, start from `0` again
		const device = arr[i];
		setSelectedDevice(device);
		setSelectedDeviceIndex(i);
		setDevicePositionArray([]);
		setLineString(null)
	}

	function onPressPrevious() {
		let i = selectedDeviceIndex;
		const arr = deviceList ? deviceList : [];
		if (i === 0) {
			// i would become 0
			i = arr.length; // so put it at the other end of the array
		}
		i = i - 1; // decrease by one
		const device = arr[i];
		setSelectedDevice(device);
		setSelectedDeviceIndex(i);
		setDevicePositionArray([]);
		setLineString(null)
	}

	function renderDeviceSelectionView() {
		const deviceInfo = selectedDevice;
		const VisibleArrow = deviceList && deviceList.length > 1 ? true : false
		return (
			<TouchableOpacity
				style={{
					height: hp(5),
					backgroundColor: ColorConstant.WHITE,
					position: 'absolute',
					marginTop: Platform.OS === 'ios' ? hp(6) : hp(4),
					borderRadius: 9,
					alignSelf: 'center',
					justifyContent: 'center',
					marginHorizontal: hp(3),
					width: wp(88)
				}}
				onPress={() => { sheetRef.current.open() }}
			>
				<View
					style={{
						justifyContent: 'center',
						flexDirection: 'row',
						alignItems: 'center',
						paddingHorizontal: wp(3),
					}}

				>
					{/* {VisibleArrow && <TouchableOpacity style={{ padding: hp(1) }} onPress={() => onPressPrevious()}>
						<Image
							source={images.dashBoard.leftIcon}
							resizeMode="contain"
							style={{ width: wp(2), height: hp(2) }}
						/>
					</TouchableOpacity>} */}
					<TouchableOpacity style={{ alignItems: 'center', }} onPress={() => NavigationService.navigate(SCREEN_CONSTANTS.LIVETRACKINGDETAILS, { selectedDevice: selectedDevice, deviceName: deviceInfo.name, selectedDeviceIndex: selectedDeviceIndex })}>
						<Text style={{ color: ColorConstant.BROWN, fontSize: FontSize.FontSize.tow, marginHorizontal: hp(1), fontFamily: "Nunito-Bold" }}>
							{` ${deviceInfo.name} `}
						</Text>
					</TouchableOpacity>
					{/* {sheetRef.current.open() ? */}

					{/* <UpArrowOrangeIcon width={wp(4)} height={hp(1.7)} />
						: */}
					<View style={{ position: 'absolute', right: hp(1.5), padding: hp(1) }}
						onPress={() => { sheetRef.current.open() }}>
						{bottomSheetVisible ? <UpArrowOrangeIcon width={wp(4)} height={hp(1.7)} />
							:
							<DownArrowOrangeIcon width={wp(4)} height={hp(1.7)} />
						}
					</View>
					{/* } */}
					{/* {VisibleArrow && <TouchableOpacity style={{ padding: hp(1) }} onPress={() => onPressNext()}>
						<RightArrowIcon resizeMode="contain" width={9.779} height={13.351} />
					</TouchableOpacity>} */}
				</View>
			</TouchableOpacity>
		);
	}

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
		// const regionpoint = isContainCoordinate ? {
		// 	latitude: endDestination.latitude,
		// 	longitude: endDestination.longitude,
		// 	// latitudeDelta: LATITUDE_DELTA,
		// 	// longitudeDelta: LONGITUDE_DELTA,
		// } : null;
		const isOnline = !isEmpty(liveTrakingDeviceList) && liveTrakingDeviceList[selectedDeviceIndex].status == "online" ? true : false;
		return (
			<Map.default
				style={StyleSheet.absoluteFillObject}
				// region={regionpoint}
				initialRegion={region} ref={mapRef} rotateEnabled={false}
				showsUserLocation={false}>

				{isContainCoordinate &&
					<Map.Marker
						coordinate={startCoordinate}
						description={startAddress} >
						{/* <LiveStartPointIcon /> */}
						<LiveStartPointIcon width={isOnline ? 10 : 7} isDeviceOnline={isOnline} />
					</Map.Marker>}

				{isContainCoordinate &&
					<Map.Marker
						coordinate={endCoordinate}
						description={endAddress} >
						<LiveEndPointIcon width={isOnline ? 60 : 54} isDeviceOnline={isOnline} />
						{/* <LiveEndPointIcon/> */}
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
		const liveEndPoint = isContainCoordinate ? devicePositionArray[devicePositionArray.length - 1] : null;
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
				<Map.default.MapView style={{ flex: 1 }} attributionEnabled={false} logoEnabled={false} rotateEnabled={false} styleURL={MAP_BOX_STYLEURL}    onPress={()=>setShowStartLocation(false)}>
					<Map.default.UserLocation
						renderMode="normal"
						visible={true}
						showsUserHeadingIndicator={false}
						animated={true}
					><View /></Map.default.UserLocation>
					{isContainCoordinate ?
						<Map.default.Camera
							animationMode='flyTo'
							animationDuration={10000}
							zoomLevel={15}
							minZoomLevel={4}
							maxZoomLevel={15}
							centerCoordinate={endCoordinate}
						// bounds={{
						// 	ne: endCoordinate,
						// 	sw: endCoordinate,
						// }}
						/> :
						<Map.default.Camera
						minZoomLevel={4}
						maxZoomLevel={15}
							zoomLevel={4}
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
						<Map.default.PointAnnotation id={`1`} coordinate={startCoordinate} key={1} title={``}  onSelected={(data)=>setShowStartLocation(!showStartLocation)} onDeselected={(data)=>setShowStartLocation(!showStartLocation)}>
							<LiveStartPointIcon width={isOnline ? 10 : 7} isDeviceOnline={isOnline} />
							{/* <LiveStartPointIcon /> */}
							{/* <Map.default.Callout title={startAddress} /> */}
						</Map.default.PointAnnotation>}
						{showStartLocation &&
         						 <Map.default.MarkerView
									id="annotaton-start"
									anchor={{ x: 0.5, y: 1.3 }}
									coordinate={startCoordinate}>
												<Map.default.Callout title={startAddress} />
							
								</Map.default.MarkerView>
          }
					{isContainCoordinate &&
						<Map.default.PointAnnotation id={`2`} coordinate={endCoordinate} key={2} title={``}>
							{/* <LiveEndPointIcon/>  */}
							<LiveEndPointIcon width={isOnline ? 60 : 54} isDeviceOnline={isOnline} />
							{/* <Map.default.Callout title={endAddress} /> */}
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

	function onLongPress() {
		setIsPanicAlarmClick(!isPanicAlarmClick)
		//Verify if there is any panic alarm created
		let alreadyPanicCreated = hasPanic
		if (alreadyPanicCreated)
			setIsPanicTimerVisible(true)
		else
			setIsPanicAlarmCreateDialog(true)
	}

	function onOkay() {
		setIsPanicAlarmClick(false)
		setIsPanicAlarmCreateDialog(false)
		NavigationService.navigate(SCREEN_CONSTANTS.CREATE_NEW, { isPanic: true })
	}

	function onNo() {
		setIsPanicAlarmCreateDialog(false)
		setIsPanicAlarmClick(false)
		setIsPanicAlarmClick(!isPanicAlarmClick)
	}

	function stopHandleforPanic() {
		setIsPanicTimerVisible(false)
		setIsPanicAlarmClick(false)
	}
	console.log('isNewEvent', isNewEvent, selectedDevice)

	function onPressDevice(index) {
		const arr = deviceList ? deviceList : [];
		const device = arr[index];

		console.log('setSelectedDeviceIndex(index);', index)
		if (selectedDeviceIndex != index) {
			setSelectedDevice(device);
			setSelectedDeviceIndex(index);
			setDevicePositionArray([]);
			setLineString(null)
			// setShowStartLocation(false)
		}
		sheetRef.current.close()
	}

	const renderItems = ({ item, index }) => {
		console.log('bottom sheet-------', item, index)
		return (
			<View style={[styles.cardContainer, { borderBottomWidth: index == deviceList.length - 1 ? 0 : 0.8, }]}>
				<TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }}
					onPress={() => onPressDevice(index)}>
					{/* <View style={styles.notificationLeftView}>
                            <View style={styles.notificationDetailView}> */}


					{/* </View>
                        </View> */}
					<Text style={[styles.bottomSheetTextStyle, { color: selectedDevice.id == item.id ? ColorConstant.ORANGE : ColorConstant.GREY }]}>{item.name}</Text>
					<IconConstant type={item.status == 'online' ? 'deviceonline' : 'deviceoffline'} />
				</TouchableOpacity>
			</View>
		)
	}
	const flatListRef = useRef();
	const scrollPositionRef = useRef();
	const RenderContent = () => (
		<View style={styles.subView}>
			<Text style={styles.mainTitle}>Select Device</Text>
			<FlatList
			     ref={flatListRef}
			  scrollsToTop={false}
			  maintainVisibleContentPosition={{
				minIndexForVisible: 0,
			  }}
			  onContentSizeChange={() =>{flatListRef.current.scrollToOffset({offset: scrollPositionRef.current, animated: false});}}
            // onViewableItemsChanged={() => {
			// 	flatListRef.current.scrollToOffset({offset: scrollPositionRef.current, animated: false});
			//   }}
			  onScroll={(event) => scrollPositionRef.current = event.nativeEvent.contentOffset.y}
				showsVerticalScrollIndicator={true}
				style={{ width: '90%', marginHorizontal: hp(2), marginVertical: hp(2), }}
				contentContainerStyle={{ paddingBottom: '5%' }}
				data={deviceList}
				renderItem={renderItems}
				keyExtractor={(item, index) => index.toString()}
			/>
		</View>
	);

	function renderDevicesSheet() {
		return (
			<>
				<RBSheet
					ref={sheetRef}
					closeOnDragDown={true}
					height={deviceList?.length > 3 ? hp(45) : hp(30)}
					customStyles={{
						wrapper: {
							backgroundColor: 'rgba(0,0,0,0.5)'
						},
						container: {
							borderTopLeftRadius: 30,
							borderTopRightRadius: 30
						},
						draggableIcon: {
							width: hp(10),
							backgroundColor: ColorConstant.ORANGE
						}
					}}
					onOpen={() => setBottomSheetVisible(true)}
					onClose={() => setBottomSheetVisible(false)}
				>
					{/* <RenderContent /> */}
					<View style={styles.subView}>
						<Text style={styles.mainTitle}>Select Device</Text>
						<FlatList
							showsVerticalScrollIndicator={true}
							style={{ width: '90%', marginHorizontal: hp(2), marginVertical: hp(2), }}
							contentContainerStyle={{ paddingBottom: '5%' }}	
							data={flatListData}
							renderItem={renderItems}
							keyExtractor={(item, index) => index.toString()}
						/>
					</View>
				</RBSheet>
			</>
		)
	}
	function OpenMapForLocation(){
	
	const currentPosition =	devicePositionArray.length == 1 ? 0 :devicePositionArray.length - 1
	console.log('devicePositionArray[currentPosition]',devicePositionArray[currentPosition])
	if(devicePositionArray[currentPosition]){
		const latitude = devicePositionArray[currentPosition].latitude
		const longitude = devicePositionArray[currentPosition].longitude
		console.log('currentPositioncurrentPositioncurrentPositioncurrentPositioncurrentPosition',devicePositionArray[currentPosition])
			if(Platform.OS == 'ios'){
				console.log('ios called',latitude,longitude)
				Linking.openURL(`http://maps.apple.com/?daddr=${latitude},${longitude}`);
				
			}
			if(Platform.OS == 'android'){
				Linking.openURL(`http://maps.google.com/?daddr=${latitude},${longitude}`);
			}
	}
	else{
		AppManager.showSimpleMessage('warning', { message: 'Device Location Not Found', description: '', floating: true })
	}
	
	}

	return (
		<View onStartShouldSetResponder={() => { setIsLineClick(false), setIsPlusClick(false) }} style={styles.container}>
			{isAndroid ? renderMapBox() : renderAppleMap()}
			{isAndroid && <Text style={{ position: 'absolute', left: 0, bottom: 0 }}> <GtrackIndiaLogoNew width={wp(20)} height={hp(5)} /> </Text>}
			{/* {renderAppleMap()} */}
			{selectedDevice && renderDeviceSelectionView()}
			<View style={[styles.subContainer, { marginTop: selectedDevice ? Platform.OS === 'ios' ? hp(13) : hp(11) : hp(5) }]}>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(SCREEN_CONSTANTS.NOTIFICATION), setIsLineClick(false), setIsPlusClick(false), setIsVisible(true);
					}}
					style={styles.bellIconStyle}
				>
					<BellIcon />
					{isNewEvent ?
						<View style={{ position: 'absolute', backgroundColor: ColorConstant.ORANGE, borderRadius: 5, width: 10, height: 10, elevation: 4, top: 16, right: 16 }} />
						: null}
				</TouchableOpacity>

				<TouchableOpacity
					activeOpacity={1}
					onPress={() => { setIsLineClick(!isLineClick), setIsPlusClick(false) }}
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
				<TouchableOpacity
					activeOpacity={1}
					onPress={() => OpenMapForLocation()}
					style={styles.lineIconStyle}>
					<FindMyDevice height={hp(8.5)} width={hp(8.5)}/>
				</TouchableOpacity>
				{!isRegular
					? <TouchableOpacity
						onPress={() => { setIsPlusClick(!isPlusClick), setIsLineClick(false) }}
						style={[styles.lineIconStyle, { backgroundColor: ColorConstant.BLUE }]}
					>
						<LiveTrackingPlusIcon />
					</TouchableOpacity>
					: null}

				{isPlusClick
					? <View style={[styles.lineContainer, { top: hp(25) }]}>
						{deviceData.map((item, key) =>
							<TouchableOpacity key={key} onPress={() => onItemPress({ navigation, item })}>
								<Text style={styles.textStyle}>
									{translate(item)}
								</Text>
								{key != deviceData.length - 1 ? <View style={styles.horizontalLine} /> : null}
							</TouchableOpacity>
						)}
					</View>
					: null}

				{(!isRegular || !isEmpty(getPanicDetail)) && <TouchableOpacity
					style={[styles.lineIconStyle, { backgroundColor: ColorConstant.RED }]}
					onLongPress={() => onLongPress()}
					delayLongPress={2000}
				>

					{isPanicAlarmClick ? <PanicIconClick height={hp(6)} width={hp(6)} /> : <PanicAlarmIcon height={hp(6)} width={hp(6)} />}
				</TouchableOpacity>
				}
				<CustomDialog
					visible={isPanicAlarmCreateDialog}
					titleStyle={styles.titleStyle}
					heading={"There is no panic alarm created"}
					message={"Do you want to create one ?"}
					negativeHandle={() => onNo()}
					positiveHandle={() => onOkay()}
					negativeButtonName={"No"}
					positiveButtonName={"Yes"}
				/>

				{isPanicTimerVisible && <PanicDialog
					visible={isPanicTimerVisible}
					timeoutValue={5}
					stopHandle={stopHandleforPanic}
					afterTimeoutHandle={sendTraccarApi}
				/>}
			</View>

			{renderDevicesSheet()}
		</View>
	);
};

const data = ['Geo Fence', 'Asset Information', 'Alarms', "Trip History","Location History"]
const deviceData = ['Tracker Device', 'Mobile as Tracker']

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	titleStyle: {
		color: ColorConstant.ORANGE,
		textAlign: 'center',
		fontSize: FontSize.FontSize.tow,
		fontWeight: 'bold'
	},
	subContainer: {
		position: 'absolute',
		flex: 1,
		right: 10,
		marginTop: hp(5),
		width: hp(7.5),
	},
	bellIconStyle: {
		borderRadius: 13,
		height: hp(6),
		justifyContent: 'center',
		alignItems: 'center',
		width: '80%',
		backgroundColor: ColorConstant.WHITE,
	},
	lineIconStyle: {
		borderRadius: 13,
		height: hp(6),
		width: '80%',
		marginTop: hp(2),
		justifyContent: 'center',
		alignItems: 'center',

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
	bottomSheetTextStyle: {
		margin: hp(0.5),
		color: ColorConstant.GREY,
		textAlignVertical: 'center',
		paddingLeft: hp(0.5),
		fontSize: FontSize.FontSize.small,
		fontWeight: '600',
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
	subView: {
		width: '100%',
		alignItems: 'center',
		// height: height / 2,
		paddingBottom: hp(5),
		backgroundColor: ColorConstant.WHITE,
	},
	mainTitle: {
		color: ColorConstant.ORANGE,
		fontWeight: 'bold',
		fontSize: FontSize.FontSize.medium,
		fontFamily: 'Nunito-Bold'
	},
	cardContainer: {
		// alignItems: 'center',
		paddingVertical: hp(1.5),
		paddingHorizontal: hp(1),
		borderColor: ColorConstant.LIGTH_GREY,
	},
});

export default LiveTracking
