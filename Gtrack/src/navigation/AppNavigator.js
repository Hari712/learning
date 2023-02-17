import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Splash, NoInternet } from '../screen';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './NavigationService';
import { TabStackNavigator } from './TabStack';
import { getLoginState, isUserLoggedIn } from '../screen/Selector';
//import TrackingDetails from '../component/TrackingDetails';
import { getItem, getValue } from '../utils/storage';
import { USER_DATA, TRACCAR_SESSION_DATA, FCM_TOKEN } from '../constants/AppConstants';
import { useDispatch, useSelector } from 'react-redux';
import * as LoginActions from '../screen/Login/Login.Action';
import AuthStackNavigator from './AuthNavigator';
import { setToken, getToken } from '../api';
import * as SettingsActions from '../screen/Settings/Settings.Action';
import DeviceInfo from 'react-native-device-info';
import * as DeviceActions from '../screen/DeviceSetup/Device.Action';
import * as LivetrackingActions from '../screen/LiveTracking/Livetracking.Action'
import { showOfflineStatusBar, hideOfflineStatusBar } from '../component/OfflineBar';
import isEmpty from 'lodash/isEmpty'

const ConnectivityStack = createStackNavigator();

export const ConnectivityStackNavigator = () =>
	<ConnectivityStack.Navigator headerMode="none" mode="modal">
		<ConnectivityStack.Screen name="Connection" component={NoInternet} />
	</ConnectivityStack.Navigator>;

const Stack = createStackNavigator();

function AppNavigator() {
	const dispatch = useDispatch();
	const [isReady, setIsReady] = React.useState(false);
	const { login, isConnected, isLoggedIn } = useSelector(state => ({
		login: getLoginState(state),
		isConnected: state.network.isConnected,
		isLoggedIn: isUserLoggedIn(state),
	}));

	useEffect(() => {
		async function getLoggedInData() {
			const response = await getItem(USER_DATA);
			console.log('Response', response);
			if (response) {
				const traccarSessionData = await getItem(TRACCAR_SESSION_DATA);
				setToken(response.accessToken);
				dispatch(LoginActions.setLoginResponse(response));
				console.log('Access Token: ', getToken());

				let deviceType = DeviceInfo.getSystemName();
				let version = DeviceInfo.getVersion();
				const traccarPassword = `g-track${response.userDTO.userKey}`;
				
				// if (traccarSessionData) {
				// 	console.log("traccar", response, traccarSessionData)
				// 	LoginActions.setTraccarSessionData(traccarSessionData)
				// }
				// else {
					dispatch(
						LoginActions.requestTraccarSession(response.userDTO.id, onTraccarSessionSuccess, onTraccarSessionError)
					);
				// }
			
				dispatch(
					SettingsActions.requestGetFeedBack(
						response.userDTO.id,
						version,
						deviceType,
						onFeedbackSuccess,
						onFeedbackError
					)
				);
				dispatch(
					DeviceActions.requestGetAllAssetsType(
						response.userDTO.id,
						onAssetTypeLoadedSuccess,
						onAssetTypeLoadedErrror
					)
				);
				dispatch(
					DeviceActions.requestGetAllUserAssets(
						response.userDTO.id,
						onUserAssetListLoadedSuccess,
						onUserAssetListLoadedError
					)
				);
				dispatch(
					DeviceActions.requestGetAllUserGroups(
						response.userDTO.id,
						onGetAllUserGroupsSuccess,
						onGetAllUserGroupError
					)
				);
				dispatch(
					LoginActions.requestGetLastKnownDevicePosition(
						response.userDTO.id,
						onGettingLastKnownPositionSuccess,
						onGettingLastKnownPositionError
					)
				);
				dispatch(LivetrackingActions.requestGetGroupDevices(response.userDTO.id,null, onGetAllUserDeviceSuccess, onGetAllUserDeviceError))
				dispatch(DeviceActions.requestGetAllUserDevice(response.userDTO.id, {}, onGetAllUserDeviceSuccess, onGetAllUserDeviceError))
				dispatch(SettingsActions.requestGetAdvanceSettings(response.userDTO.id, onFeedbackSuccess, onFeedbackError))
				dispatch(LivetrackingActions.requestGetDevicesByUserId(response.userDTO.id, onFeedbackSuccess, onFeedbackError))
				onAddDeviceToken(response)
			}
			setIsReady(true);
		}

		const timer = setTimeout(() => {
			getLoggedInData();
		}, 3000);

		return () => clearTimeout(timer);
	}, []);
	function onTraccarSessionSuccess(data) {
		console.log('Traccar Session Success', data);
		storeItem(TRACCAR_SESSION_DATA, data);
	}

	function onTraccarSessionError(error) {
		console.log('Traccar Session Error', error);
	}
	async function onAddDeviceToken(data) {
		const fcmToken = await getValue(FCM_TOKEN)
		if (!isEmpty(fcmToken)) {
			dispatch(LoginActions.requestAddDeviceToken(data.userDTO.id, fcmToken, onAddDeviceTokenSuccess, onAddDeviceTokenError))
		}
	}

	function onAddDeviceTokenSuccess(data) {
		console.log('Add Token Success', data)
	}

	function onAddDeviceTokenError(error) {
		console.log('Add Token Error', error)
	}

	useEffect(
		() => {
			if (isConnected) {
				hideOfflineStatusBar();
			} else {
				showOfflineStatusBar();
			}
		},
		[isConnected]
	);

	function onGetAllUserDeviceSuccess(data) {
    console.log('Device List Success', data);
  }

	function onGetAllUserDeviceError(error) {
    console.log('Device List Fail', error);
  }

	function onGettingLastKnownPositionSuccess(data) {
		console.log('Position Data', data);
	}

	function onGettingLastKnownPositionError(error) {
		console.log('Position Error', error);
	}

	function onGetAllUserGroupsSuccess(data) {
		console.log('Group List Loaded Success');
	}

	function onGetAllUserGroupError(error) {
		console.log('Group List Loaded Error');
	}

	function onUserAssetListLoadedSuccess(data) {
		console.log('Asset List Loaded Success');
	}

	function onUserAssetListLoadedError(error) {
		console.log('Asset List Loaded Error');
	}

	function onAssetTypeLoadedSuccess(data) {
		console.log('Asset Type Loaded Success');
	}

	function onAssetTypeLoadedErrror(error) {
		console.log('Asset Type Loaded error', error);
	}

	function onFeedbackSuccess(data) {
		console.log('Success Feedback', data);
	}

	function onFeedbackError(error) {
		console.log('Error Feedback', error);
	}

	if (!isReady) {
		return <Splash />;
	} else {
		return (
			<NavigationContainer ref={navigationRef}>
				<Stack.Navigator
					headerMode="none"
					screenOptions={{
						animationEnabled: false,
						headerShown: false,
						gestureEnabled: true,
						cardOverlayEnabled: true,
						...TransitionPresets.ScaleFromCenterAndroid,
					}}
				>
					{isLoggedIn
						? <Stack.Screen name="LiveTracking" component={TabStackNavigator} />
						: <Stack.Screen name="Auth" component={AuthStackNavigator} />}
					<Stack.Screen name="Connection" component={ConnectivityStackNavigator} />
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}
export default AppNavigator;
