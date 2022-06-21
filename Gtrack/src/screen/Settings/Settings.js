import React, { useState, Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, SafeAreaView, FlatList, Linking, Platform } from 'react-native'
import images from '../../constants/images'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FontSize, LogoutConfirmationDialog, RateUsDialog } from '../../component'
import { useDispatch, useSelector } from 'react-redux';
import * as LoginActions from '../Login/Login.Action'
import { translate } from '../../../App';
import { FCM_TOKEN, SCREEN_CONSTANTS } from '../../constants/AppConstants';
import NavigationService from '../../navigation/NavigationService'
import { AboutIcon, AdvanceSettingsIcon, PermissionIcon, FeedbackIcon, NextArrowIcon, LogoutIcon, NotificationIcon, ProfileIcon, RateUsIcon } from '../../component/SvgComponent';
import InAppReview from 'react-native-in-app-review';
import { isRoleRegular, getLoginState } from '../Selector';
import { logoutReset } from '../../utils/socketHelper';
import { getValue } from '../../utils/storage';
import { isEmpty } from 'lodash';
import messaging from '@react-native-firebase/messaging';
const isAndroid = Platform.OS === 'android'

const Settings = ({ navigation }) => {

  const dispatch = useDispatch()
  const [rateusVisible, setRateusVisible] = useState(false)

  const [isLogoutConfirmationDialogVisible, setIsLogoutConfirmationDialogVisible] = useState(false)

  const { isRegular, loginData } = useSelector(state => ({
    isRegular: isRoleRegular(state),
    loginData: getLoginState(state),
  }))
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (null),
    });
  }, [navigation]);

  const SettingsItems = ({ item }) => {
    // const [listData, setListData] = useState(SETTINGS_MENU)    
    // if(item.title === 'Notifications') {
    //   if(isRegular) return; 
    // }

    let IconConstant;

    switch (item.title) {
      case 'Profile': IconConstant = ProfileIcon
        break;

      case 'Permission': IconConstant = PermissionIcon
        break;

      case 'About': IconConstant = AboutIcon
        break;

      case 'Notifications': IconConstant = NotificationIcon
        break;

      case 'Rate Us': IconConstant = RateUsIcon
        break;

      case 'Feedback': IconConstant = FeedbackIcon
        break;

      case 'Advance Settings': IconConstant = AdvanceSettingsIcon
        break;

      case 'Change Passcode': IconConstant = FeedbackIcon
        break;

      case 'Logout': IconConstant = LogoutIcon
        break;

      default:
        break;
    }

    const onPressHandle = ({ navigation, item }) => {
      switch (item.title) {
        case 'Profile':
          NavigationService.navigate((SCREEN_CONSTANTS.PROFILE))
          break;

        case 'Permission':
          navigateToAppSettings()
          break;

        case 'About':
          NavigationService.navigate((SCREEN_CONSTANTS.ABOUT))
          break;

        case 'Notifications':
          NavigationService.navigate((SCREEN_CONSTANTS.SETTINGS_NOTIFICATION))
          break;

        case 'Rate Us':
          invokeRateUsDialog()
          break;

        case 'Feedback':
          NavigationService.navigate((SCREEN_CONSTANTS.FEEDBACK))
          break;

        case 'Advance Settings':
          NavigationService.navigate(SCREEN_CONSTANTS.ADVANCE_SETTINGS)
          break;

        case 'Change Passcode':
          NavigationService.navigate(SCREEN_CONSTANTS.SETTINGS_CHANGE_PASSCODE)
          break;

        case 'Logout':
          setIsLogoutConfirmationDialogVisible(true)
          break;

        default:
          break;
      }
    }


    async function navigatToSettings() {
      try {
        await Linking.openSettings();
      } catch (error) {
        console.log(error)
      }
    }

    function navigateToAppSettings() {
      if (isAndroid) {
        navigatToSettings()
      } else {
        Linking.canOpenURL('app-settings:').then(supported => {
          if (!supported) {
            console.log('Can\'t handle settings url');
            navigatToSettings()
          } else {
            return Linking.openURL('app-settings:');
          }
        }).catch(err => console.error('An error occurred', err));
      }
   
    }

    function invokeRateUsDialog() {
      if (InAppReview.isAvailable()) {
        InAppReview.RequestInAppReview()
          .then((hasFlowFinishedSuccessfully) => {
            // when return true in android it means user finished or close review flow
            console.log('InAppReview in android', hasFlowFinishedSuccessfully);

            // when return true in ios it means review flow lanuched to user.
            console.log(
              'InAppReview in ios has lanuched successfully',
              hasFlowFinishedSuccessfully,
            );

            // 1- you have option to do something ex: (navigate Home page) (in android).
            // 2- you have option to do something,
            // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

            // 3- another option:
            if (hasFlowFinishedSuccessfully) {
              // do something for ios
              // do something for android
            }

            // for android:
            // The flow has finished. The API does not indicate whether the user
            // reviewed or not, or even whether the review dialog was shown. Thus, no
            // matter the result, we continue our app flow.

            // for ios
            // the flow lanuched successfully, The API does not indicate whether the user
            // reviewed or not, or he/she closed flow yet as android, Thus, no
            // matter the result, we continue our app flow.
          })
          .catch((error) => {
            //we continue our app flow.
            // we have some error could happen while lanuching InAppReview,
            // Check table for errors and code number that can return in catch.
            console.log('Error',error);
          });
      }
    }

    return (
      <TouchableOpacity
        style={styles.bodySubContainer}
        onPress={() => onPressHandle({ navigation, item })}
        activeOpacity={0.8}>

        <View style={styles.mainViewStyle}>

          <View style={styles.leftMainViewStyle}>
            <View style={{ width: hp(3) }}>
              <IconConstant style={styles.titleIconStyle} resizeMode='contain' />
            </View>
            {/* <Image source={item.icon} style={styles.titleIconStyle} resizeMode='contain' /> */}
            <Text style={styles.titleTextStyle}> {translate(item.title)}</Text>
          </View>

          <View style={styles.rightMainViewStyle}>
            <NextArrowIcon resizeMode='contain' />
          </View>

        </View>

        <View style={styles.lineStyle} />

      </TouchableOpacity>

    )
  }

  function onHideLogoutConfirmationDialog() {
    setIsLogoutConfirmationDialogVisible(false)
  }

  async function onTapConfirm() {
    // onHideLogoutConfirmationDialog()
    const fcmToken = await getValue(FCM_TOKEN)
    onRemoveDeviceToken()
  }
  console.log('loginData account', loginData)
  async function onRemoveDeviceToken() {
		let fcmToken = await getValue(FCM_TOKEN)
		if (!isEmpty(fcmToken)) {
			dispatch(LoginActions.requestRemoveDeviceToken(loginData.id, fcmToken, onRemoveDeviceTokenSuccess, onremoveDeviceTokenError))
		}
    else {
      console.log('fcmToken logout 1234')
      await messaging().registerDeviceForRemoteMessages();
      fcmToken = await messaging().getToken();
      console.log('fcmToken logout')
      if (fcmToken) {
        dispatch(LoginActions.requestRemoveDeviceToken(loginData.id, fcmToken, onRemoveDeviceTokenSuccess, onremoveDeviceTokenError))
      }
    }
	}

	function onRemoveDeviceTokenSuccess(data) {
    if(data) {
      logoutReset()
      dispatch(LoginActions.requestLogout())
    }
		console.log('Add Token Success', data)
	}

	function onremoveDeviceTokenError(error) {
		console.log('Add Token Error', error)
	}


  function renderLogoutConfirmationDialog() {
    return (
      <LogoutConfirmationDialog
        isVisible={isLogoutConfirmationDialogVisible}
        onTapConfirm={() => onTapConfirm()}
        onTapClose={() => onHideLogoutConfirmationDialog(false)}
        onSwipeComplete={() => onHideLogoutConfirmationDialog(false)}
      />
    )
  }

  function renderRateUsDialog() {
    return (
      <RateUsDialog visible={rateusVisible} setVisible={setRateusVisible} />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{}}
        contentContainerStyle={{}}
        data={SETTINGS_MENU}
        renderItem={SettingsItems}
        keyExtractor={(item, index) => index.toString()}
      />
      {renderLogoutConfirmationDialog()}
      {renderRateUsDialog()}
    </SafeAreaView>

  )
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorConstant.WHITE,
  },

  bodyContainer: {
    flex: 1,
    paddingVertical: hp(3)
  },

  bodySubContainer: {
    paddingHorizontal: wp(3),
    flexDirection: 'column',
    justifyContent: "space-between"
  },

  mainViewStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp(2)
  },
  leftMainViewStyle: {
    flexDirection: 'row',
    paddingHorizontal: wp(3),
    alignItems: 'center'
  },
  titleIconStyle: {
    height: hp(2),
    width: hp(2),
  },
  rightMainViewStyle: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
  },

  lineStyle: {
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: 1
  },

  titleTextStyle: {
    fontSize: FontSize.FontSize.medium,
    color: ColorConstant.BLUE,
    paddingLeft: wp(2)
  },

  rightTextStyle: {
    fontSize: FontSize.FontSize.small,
    color: ColorConstant.BLUE,
    paddingRight: hp(0.8),
    fontStyle: 'italic'
  },
});

const SETTINGS_MENU = [
  {
    title: 'Profile',
    icon: images.image.settings.profile,
    nextArrow: images.image.settings.nextArrow,
    next: images.image.settings.next
  },
  {
    title: 'Permission',
    icon: images.image.settings.permission,
    nextArrow: images.image.settings.nextArrow,
    next: images.image.settings.next
  },
  {
    title: 'About',
    icon: images.image.settings.about,
    nextArrow: images.image.settings.nextArrow,
    next: images.image.settings.next
  },
  {
    title: 'Notifications',
    icon: images.image.settings.notification,
    nextArrow: images.image.settings.nextArrow,
    next: images.image.settings.next
  },

  {
    title: 'Rate Us',
    icon: images.image.settings.rateUs,
    nextArrow: images.image.settings.nextArrow,
    next: images.image.settings.next
  },
  {
    title: 'Feedback',
    icon: images.image.settings.feedback,
    nextArrow: images.image.settings.nextArrow,
    next: images.image.settings.next
  },
  {
    title: 'Advance Settings',
    icon: images.image.settings.advanceSetting,
    nextArrow: images.image.settings.nextArrow,
    next: images.image.settings.next
  },
  {
    title: 'Change Passcode',
    icon: images.image.changePasscode.changePasscodeIcon,
    nextArrow: images.image.settings.nextArrow,
    next: images.image.settings.next
  },
  {
    title: 'Logout',
    icon: images.image.settings.logout,
    nextArrow: images.image.settings.nextArrow,
    next: images.image.settings.next
  }
]