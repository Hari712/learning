import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants';
import FontSize from '../../component/FontSize';
import { FlatList } from 'react-native-gesture-handler';

const SensorInfo = ({ navigation }) => {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={{
                    color: ColorConstant.GREY,
                    fontSize: FontSize.FontSize.medium,
                    fontWeight: '500',
                    textAlign: 'center'
                }}>
                    Sensor Information
                </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={{ marginLeft: hp(2) }} source={images.image.back} />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    const SensorInfoItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.sensorInfoMainView} onPress={() => { navigation.navigate('DeviceInfo', { deviceInfo: item }) }} >
                <View style={styles.deviceinfoView}>
                    <Text style={{ fontSize: FontSize.FontSize.small, color: ColorConstant.BLACK }}>{item.title}</Text>
                    <Image source={images.sensorInfo.next} style={{ width: wp(2), height: hp(3), marginTop: 2 }} resizeMode="contain" />
                </View>
                <View style={styles.footerIconStyle} />
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                style={{}}
                contentContainerStyle={{}}
                data={SENSORINFOITEMS}
                renderItem={SensorInfoItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorConstant.WHITE,
    },

    sensorInfoMainView: {
        width: Dimensions.get('screen').width - 30,
        marginTop: hp(2),
        alignSelf: 'center',
        backgroundColor: ColorConstant.WHITE,
        borderRadius: 15,
        borderWidth: 0.3,
        borderColor: ColorConstant.GREY,
        shadowColor: ColorConstant.GREY,
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 0 },
    },

    deviceinfoView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: hp(2),
        paddingHorizontal: wp(2),
        alignItems: 'center'
    },

    footerIconStyle: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor: ColorConstant.BLUE,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderWidth: 0.3,
        borderColor: ColorConstant.BLUE,
        padding: 5
    },
})

export default SensorInfo;

const SENSORINFOITEMS = [
    {
        title: 'Trackport 4G Vehicle GPS Tracker'
    },
    {
        title: 'Trackport 4G Vehicle GPS Tracker'
    },
    {
        title: 'Trackport International'
    },
    {
        title: 'UK Van'
    }
]