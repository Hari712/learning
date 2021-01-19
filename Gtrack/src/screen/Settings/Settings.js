import React, { useState, Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, SafeAreaView, FlatList } from 'react-native'
import images from '../../constants/images'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FontSize, LogoutConfirmationDialog } from '../../component'
import { useDispatch } from 'react-redux';
import * as LoginActions from '../Login/Login.Action'
import { translate } from '../../../App';
import { SCREEN_CONSTANTS } from '../../constants/AppConstants';
import NavigationService from '../../navigation/NavigationService'
import { AboutIcon, AdvanceSettingsIcon, PermissionIcon, FeedbackIcon, NextArrowIcon, LogoutIcon, NotificationIcon, ProfileIcon, RateUsIcon } from '../../component/SvgComponent';

const Settings = ({ navigation }) => {

  const dispatch = useDispatch()

  const [isLogoutConfirmationDialogVisible, setIsLogoutConfirmationDialogVisible] = useState(false)

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (null),
    });
  }, [navigation]);

  const SettingsItems = ({ item }) => {
    // const [listData, setListData] = useState(SETTINGS_MENU)

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
          NavigationService.push((SCREEN_CONSTANTS.PROFILE))
          break;

        case 'Permission':
          NavigationService.push((SCREEN_CONSTANTS.PERMISSION))
          break;

        case 'About':
          NavigationService.push((SCREEN_CONSTANTS.ABOUT))
          break;

        case 'Notifications':
          NavigationService.push((SCREEN_CONSTANTS.SETTINGS_NOTIFICATION))
          break;

        case 'Rate Us':
          NavigationService.push((SCREEN_CONSTANTS.RATE_US))
          break;

        case 'Feedback':
          NavigationService.push((SCREEN_CONSTANTS.FEEDBACK))
          break;

        case 'Advance Settings':
          NavigationService.push(SCREEN_CONSTANTS.ADVANCE_SETTINGS)
          break;

        case 'Change Passcode':
          NavigationService.push(SCREEN_CONSTANTS.SETTINGS_CHANGE_PASSCODE)
          break;

        case 'Logout':
          setIsLogoutConfirmationDialogVisible(true)
          break;

        default:
          break;
      }
    }

    return (
      <TouchableOpacity
        style={styles.bodySubContainer}
        onPress={() => onPressHandle({ navigation, item })}
        activeOpacity={0.8}>

        <View style={styles.mainViewStyle}>

          <View style={styles.leftMainViewStyle}>
            <IconConstant style={styles.titleIconStyle} resizeMode='contain' />
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

  function onTapConfirm() {
    onHideLogoutConfirmationDialog()
    dispatch(LoginActions.requestLogout())
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
    justifyContent: "space-between",
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
    paddingLeft: wp(3)
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