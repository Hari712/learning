import React, { useState, Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, SafeAreaView, FlatList } from 'react-native'
import images from '../../constants/images'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize'
import { useDispatch } from 'react-redux';
import * as LoginActions from '../Login/Login.Action'

const Settings = ({ navigation }) => {

  const dispatch = useDispatch()

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (null),
    });
  });

  const SettingsItems = ({ item }) => {
    // const [listData, setListData] = useState(SETTINGS_MENU)

    const onPressHandle = ({ navigation, item }) => {
      if (item.title == 'Profile') {
        navigation.navigate('Profile')
      }

      else if (item.title == 'Permission') {
        navigation.navigate('Permission')
      }

      else if (item.title == 'About') {
        navigation.navigate('About')
      }

      else if (item.title == 'Notifications') {
        navigation.navigate('SettingNotification')
      }

      else if (item.title == 'Rate Us') {
        navigation.navigate('RateUs')
      }

      else if (item.title == 'Feedback') {
        navigation.navigate('Feedback')
      }

      else if (item.title == 'Advance Settings') {
        navigation.navigate('AdvanceSettings')
      }

      else if (item.title == 'Logout') {
        dispatch(LoginActions.requestLogout())
      }

      else {
        dispatch(LoginActions.requestLogout())
      }

    }

    return (
      <TouchableOpacity
        style={styles.bodySubContainer}
        onPress={() => onPressHandle({ navigation, item })}
        activeOpacity={0.8}>

        <View style={styles.mainViewStyle}>

          <View style={styles.leftMainViewStyle}>
            <Image source={item.icon} style={styles.titleIconStyle} resizeMode='contain' />
            <Text style={styles.titleTextStyle}>{item.title}</Text>
          </View>

          <View style={styles.rightMainViewStyle}>
            <Image source={item.nextArrow} style={{}} resizeMode='contain' />
          </View>

        </View>

        <View style={styles.lineStyle} />

      </TouchableOpacity>

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
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
    paddingBottom: hp(3),
    alignItems: 'center'
  },
  titleIconStyle: {
    height: hp(2),
    width: hp(2),
  },
  rightMainViewStyle: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    title: 'Logout',
    icon: images.image.settings.logout,
    nextArrow: images.image.settings.nextArrow,
    next: images.image.settings.next
  }
]