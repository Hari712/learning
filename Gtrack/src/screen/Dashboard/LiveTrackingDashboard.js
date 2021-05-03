import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import NavigationService from '../../navigation/NavigationService';
import ShadowView from 'react-native-simple-shadow-view';
import { MapView } from '../../component';
import { FullScreenIcon, RefreshIcon, RightArrowIcon } from '../../component/SvgComponent';
import { useSelector, useDispatch } from 'react-redux';
import { getLiveTrackingDeviceList } from '../Selector';

const isAndroid = Platform.OS === 'android';

const Map = Platform.select({
	ios: () => require('react-native-maps'),
	android: () => require('@react-native-mapbox-gl/maps'),
})();

const LiveTrackinDashboard = ({ navigation, route }) => {
	const dispatch = useDispatch();

	const { deviceList, isConnected } = useSelector(state => ({
		deviceList: getLiveTrackingDeviceList(state),
		isConnected: state.network.isConnected,
	}));

	function renderAppleMap() {
		return (
			<View style={styles.container}>
				<View style={StyleSheet.absoluteFillObject}>
					<Map.default.MapView style={{ flex: 1 }}>
						<Map.default.UserLocation renderMode="normal" visible={true} showsUserHeadingIndicator={true} />
					</Map.default.MapView>
				</View>
			</View>
		);
	}

	function renderMapBox() {
		return (
			<View style={styles.container}>
				<Map.default.MapView style={{ flex: 1 }}>
					<Map.default.UserLocation
						renderMode="normal"
						visible={true}
						showsUserHeadingIndicator={true}
						animated={true}
					/>
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
		return (
			<View
				style={{
					height: hp(3),
					backgroundColor: ColorConstant.WHITE,
					marginTop: hp(3),
					borderRadius: 13,
					justifyContent: 'center',
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
					<Image
						source={images.dashBoard.leftIcon}
						resizeMode="contain"
						style={{ width: wp(1.5), height: hp(1.5) }}
					/>
					<Text style={{ color: ColorConstant.BROWN, fontSize: hp(1.4) }}> TrackPort International </Text>
					<RightArrowIcon resizeMode="contain" width={6.779} height={10.351} />
					{/* <Image source={images.dashBoard.rightIcon} resizeMode='contain' style={{ width: wp(1.5), height: hp(1.5)}} /> */}
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
				<MapView />

				<View style={styles.subContainer}>
					{renderDeviceSelectionView()}
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
