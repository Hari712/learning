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

const Dashboard = ({ navigation }) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (null),
    });
  });

  const ActiveUser = () => {
    return(
      <View style={{justifyContent: 'space-evenly', flexDirection: 'row'}}>
        <ShadowView style={styles.cardContainer}>
          <Text style={styles.regularTextStyle}>REGULAR</Text>
          <ShadowView style={styles.shadowContainer}>
            <AnimatedCircularProgress
                              size={hp(13)}
                              backgroundWidth={hp(1)}
                              width={9}
                              // fill={100}
                              rotation={180}
                              style={{ borderRadius: hp(6.5) }}
                              tintTransparency={false}
                              // childrenContainerStyle={{ borderWidth: 1, borderColor: 'rgba(77, 173, 225, 0.5)' }}
                              tintColor={ColorConstant.ORANGE}
                              onAnimationComplete={() => console.log('onAnimationComplete')}
                              backgroundColor={ColorConstant.DARKGREY}
                          >
                              {
                                  (fill) => (
                                      <Text style={styles.progressTextStyle}>
                                          {"40%"}
                                      </Text>
                                  )
                              }
                          </AnimatedCircularProgress>
            </ShadowView>

          
        </ShadowView>

        <ShadowView style={styles.cardContainer}>
          <Text style={styles.regularTextStyle}>OWNER</Text>
        </ShadowView>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainViewStyle}>

        <View style={styles.leftMainViewStyle}>
          <Text>Users View</Text>
        </View>

        <View style={styles.rightMainViewStyle}>
          <Text style={styles.allUsersTextStyle}>All Users</Text>
          <Image source={images.image.dashboard.next} style={styles.nextImageStyle} resizeMode='contain'  />
          <Image source={images.image.dashboard.refresh} style={styles.refreshImageStyle} resizeMode='contain' />
        </View>

      </View>

      <ActiveUser />

    </SafeAreaView>
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
    marginTop: hp(3)
  },

  leftMainViewStyle: {
    paddingHorizontal: wp(3),
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
    color: ColorConstant.BLUE
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

  cardContainer: {
    backgroundColor: ColorConstant.WHITE,
    width: '45%',
    height: hp(20),
    marginVertical: hp(3),
    alignSelf: 'center',
    borderRadius: hp(5.5 / 2),
    borderWidth: 0.5,
    borderColor: ColorConstant.WHITE,
    paddingHorizontal: 15,
    shadowColor: ColorConstant.BLUE,
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
},

regularTextStyle: {
  color: ColorConstant.BLUE,
  fontSize: FontSize.FontSize.small,
  fontWeight: 'bold',
  alignSelf : 'center',
  padding : 15
},

shadowContainer: {
  backgroundColor: ColorConstant.WHITE,
  shadowColor: ColorConstant.GREY,
  shadowOpacity: 3,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 0 },
  borderRadius: hp(6.5), width: hp(13), height: hp(13)
},

})

export default Dashboard;