import React, { Component } from 'react'
import { View, Image, StyleSheet, Text, ImageBackground, Dimensions, TouchableOpacity, TextInput, Platform } from 'react-native'
import images from '../../constants/images'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize'
import NavigationService from '../../navigation/NavigationService'
import { EditText } from '../../component'
import ShadowView from 'react-native-simple-shadow-view'

const LiveTrackinDashboard = ({ navigation }) => {

    const isAndroid = Platform.OS === 'android'

    const Map = Platform.select({
        ios: () => require('react-native-maps'),
        android: () => require('@react-native-mapbox-gl/maps')
    })();

    function renderMapBox() {
        console.log("android")
        return (
            <View style={{flex: 1}}>
                <Map.default.MapView style={{flex: 1}}>
                    <Map.default.UserLocation
                        renderMode='normal'
                        visible={true}
                        showsUserHeadingIndicator={true}
                    />
                </Map.default.MapView>
            </View>
        )
    };

    function renderAppleMap() {
        console.log(".....apple")
        return (
            <View style={{ flex: 1 }}>
                <View style={StyleSheet.absoluteFillObject}>

                    <Map.default style={StyleSheet.absoluteFillObject} showsUserLocation={true}>

                    </Map.default>
                    <View style={{ position: 'absolute', top: 100, left: 50 }} />

                </View>
            </View>
        )
    }

    return (
        <ShadowView style={styles.deviceSummaryContainer}>

            <View style={styles.deviceSummaryMainViewStyle}>
                <View style={styles.leftMainViewStyle}>
                    <Text style={{ fontSize: hp(1.4), fontWeight: 'bold', color: ColorConstant.BLACK }}>Live Tracking</Text>
                </View>

                <View style={styles.rightMainViewStyle}>

                    <TouchableOpacity onPress={() =>  NavigationService.navigate("LiveTracking") } >
                        <Image source={images.dashBoard.fullScreen} style={styles.ViewallStyle} resizeMode='contain' />
                    </TouchableOpacity>

                    <Image source={images.dashBoard.refresh} style={styles.refreshImageStyle} resizeMode='contain' />
                </View>

            </View>

            <View style={{ height: hp(30), width: '100%', paddingHorizontal: wp(5), paddingBottom: hp(2) }}>
                {isAndroid ? renderMapBox() : renderAppleMap()}

                <View style={styles.subContainer}>
                    
                    <View style={{ height: hp(3), backgroundColor: ColorConstant.WHITE, marginTop: hp(3), borderRadius: 13, justifyContent: 'center' }}>
                        
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingHorizontal: wp(3)  }}>
                            <Image source={images.dashBoard.leftIcon} resizeMode='contain' style={{ width: wp(1.5), height: hp(1.5)}} />
                                <Text style={{color: ColorConstant.BROWN, fontSize: hp(1.4)}}> TrackPort International </Text>
                            <Image source={images.dashBoard.rightIcon} resizeMode='contain' style={{ width: wp(1.5), height: hp(1.5)}} />
                        </View>

                    </View>

                </View>
            </View>
        </ShadowView>
    )
}

export default LiveTrackinDashboard;

const styles = StyleSheet.create({
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
        paddingBottom: hp(3)
    },
   
    rightMainViewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp(6),
        paddingBottom: hp(3)
    },

    ViewallStyle: {
        height: hp(2),
        width: hp(2),
        marginRight: wp(3),
    },

    refreshImageStyle: {
        height: hp(2),
        width: hp(2)
    },

    subContainer: {
        position: 'absolute', width: '80%', alignSelf: 'center'
    },

    bellIconStyle: {
        borderRadius: 13,
        height: hp(7.3),
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', backgroundColor: ColorConstant.WHITE
    },

});