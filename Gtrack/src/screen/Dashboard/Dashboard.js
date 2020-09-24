import React, { Component } from 'react'
import { View, Image, StyleSheet, Text, ImageBackground, Dimensions, TouchableOpacity, TextInput, SafeAreaView } from 'react-native'
import images from '../../constants/images'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize'
import NavigationService from '../../navigation/NavigationService'
import { EditText } from '../../component'
import ShadowView from 'react-native-simple-shadow-view'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { ScrollView } from 'react-native-gesture-handler'

const Dashboard = ({ navigation }) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (null),
    });
  });

  // Active user component
  const ActiveUser = () => {
    return (
      <View style={styles.activeUserMainView}>

        {/* Regular active user view */}
        <ShadowView style={styles.cardContainer}>

          <Text style={styles.activeUserTextStyle}>REGULAR</Text>

          <View style={styles.activeUserView}>

            <ShadowView style={styles.shadowContainer}>

              <AnimatedCircularProgress
                size={hp(13)}
                backgroundWidth={hp(1)}
                width={9}
                fill={40}
                rotation={200}
                lineCap="round"
                style={{ borderRadius: hp(6.5) }}
                tintTransparency={false}
                tintColor={ColorConstant.LIGHTGREEN}
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor={ColorConstant.WHITE}
              >
                {
                  (fill) => (
                    <View style={{ alignItems: 'center' }} >
                      <Text style={{ fontSize: FontSize.FontSize.regular, fontWeight: 'bold' }}> 40% </Text>
                      <Text style={{ fontSize: hp(1.4), color: ColorConstant.GREY, marginTop: hp(0.5) }}>Active</Text>
                    </View>

                  )
                }
              </AnimatedCircularProgress>

            </ShadowView>

          </View>

        </ShadowView>

        {/* Owner active user view */}
        <ShadowView style={styles.cardContainer}>

          <Text style={styles.activeUserTextStyle}>OWNER</Text>

          <View style={styles.activeUserView}>

            <ShadowView style={styles.shadowContainer}>

              <AnimatedCircularProgress
                size={hp(13)}
                backgroundWidth={hp(1)}
                width={9}
                fill={80}
                rotation={150}
                lineCap="round"
                style={{ borderRadius: hp(6.5) }}
                tintTransparency={false}
                tintColor= {ColorConstant.LIGHTGREEN}
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor={ColorConstant.WHITE}
              >
                {
                  (fill) => (
                    <View style={{ alignItems: 'center' }} >
                      <Text style={{ fontSize: FontSize.FontSize.regular, fontWeight: 'bold' }}> 75% </Text>
                      <Text style={{ fontSize: hp(1.4), color: ColorConstant.GREY, marginTop: hp(0.5) }}>Active</Text>
                    </View>

                  )
                }
              </AnimatedCircularProgress>

            </ShadowView>

          </View>

        </ShadowView>

      </View>
    )
  }


  // Device summary component
  const DeviceSummary = () => {
    return (
      <ShadowView style={styles.deviceSummaryContainer}>

        <View style={styles.deviceSummaryMainViewStyle}>

          <View style={styles.leftMainViewStyle}>
            <Text style={{ fontSize: hp(1.4), fontWeight: 'bold', color: ColorConstant.BLACK }}>Device Summary</Text>
          </View>

          <View style={styles.rightMainViewStyle}>
            <Text style={styles.allUsersTextStyle}>No. of devices: 10</Text>
            <Image source={images.image.dashboard.SettingIcon} style={styles.refreshImageStyle} resizeMode='contain' />
          </View>

        </View>

        <ShadowView style={styles.summaryContainer}>
          <View style={styles.deviceSummaryDetailView}>
            <Text>kinnari</Text>
          </View>
        </ShadowView>

      </ShadowView>
    )
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.mainViewStyle}>

          <View style={styles.leftMainViewStyle}>
            <Text style={{ fontSize: FontSize.FontSize.small, fontWeight: 'bold', color: ColorConstant.BLACK }} >Users View</Text>
          </View>

          <View style={styles.rightMainViewStyle}>
            <Text style={styles.allUsersTextStyle}>All Users</Text>
            <Image source={images.image.dashboard.next} style={styles.nextImageStyle} resizeMode='contain' />
            <Image source={images.image.dashboard.refresh} style={styles.refreshImageStyle} resizeMode='contain' />
          </View>

        </View>

        <ActiveUser />

        <DeviceSummary />

      </SafeAreaView>
    </ScrollView>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorConstant.WHITE,
  },

  mainViewStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(3),
  },

  leftMainViewStyle: {
    paddingHorizontal: wp(5),
    paddingBottom: hp(3)
  },

  rightMainViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(6),
    paddingBottom: hp(3)
  },

  allUsersTextStyle: {
    marginRight: wp(3),
    color: ColorConstant.BLUE,
    fontSize: FontSize.FontSize.small,
    fontWeight: '500'
  },

  nextImageStyle: {
    height: hp(1.2),
    width: hp(1.2),
    top: 5,
    marginRight: wp(3)
  },

  refreshImageStyle: {
    height: hp(2),
    width: hp(2)
  },

  activeUserMainView: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },

  cardContainer: {
    backgroundColor: ColorConstant.WHITE,
    width: '45%',
    height: hp(23),
    borderRadius: hp(5.5 / 2),
    borderWidth: 0.5,
    borderColor: ColorConstant.WHITE,
    shadowColor: ColorConstant.BLACK,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    alignItems: 'center'
  },

  activeUserTextStyle: {
    color: ColorConstant.BLUE,
    fontSize: FontSize.FontSize.small,
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 15
  },

  activeUserView: {
    width: hp(16),
    height: hp(16),
    backgroundColor: '#E6EAF3',
    borderRadius: hp(8),
    justifyContent: 'center',
    alignItems: 'center'
  },

  shadowContainer: {
    backgroundColor: ColorConstant.WHITE,
    shadowColor: ColorConstant.BLACK,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
    borderRadius: hp(6.5), width: hp(13), height: hp(13),
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

  summaryContainer: {
    width: '87%',
    marginVertical: hp(2),
    alignSelf: 'center',
    backgroundColor: ColorConstant.WHITE,
    borderRadius: hp(5.5 / 2),
    borderWidth: 0.5,
    borderColor: ColorConstant.WHITE,
    shadowColor: ColorConstant.BLACK,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 5 },
    padding: 10
  },

  deviceSummaryDetailView: {
    width: hp(8),
    height: hp(8),
    backgroundColor: ColorConstant.LIGHTBLUE,
    borderRadius: hp(8),
    justifyContent: 'center',
    alignItems: 'center'
  }

})

export default Dashboard;