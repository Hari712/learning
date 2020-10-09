import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants';
import FontSize from '../../component/FontSize';


const DeviceInfo = ({ navigation, route }) => {
    const { deviceInfo } = route.params;

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

    return (
        <ScrollView style={styles.DeviceInfoMainView}>
            <View style={styles.mainView}>
                <Text style={styles.textViewStyle}>{deviceInfo.title}</Text>
            </View>

            <View style={styles.cardContainer}>
                <View style={styles.titleViewStyle}>
                    <Text style={styles.titleTextStyle}>Information</Text>
                    <Image source={images.sensorInfo.list} resizeMode='contain' />
                </View>

                <View style={styles.lineStyle} />

                <View style={styles.infoDataMainView}>
                    <View style={{ flexDirection: 'column', width: '35%' }}>
                        <Text style={styles.mainTextStyle}>State</Text>
                        <Text style={styles.textStyle}>Moving</Text>
                        <Text style={styles.textStyle}>1h 45m 25s</Text>
                    </View>

                    <View style={{ flexDirection: 'column', width: '40%' }}>
                        <Text style={styles.mainTextStyle}>Time(Position)</Text>
                        <Text style={styles.textStyle}>2020-09-17</Text>
                        <Text style={styles.textStyle}>06:58:06</Text>
                    </View>

                    <View style={{ flexDirection: 'column', width: '25%' }}>
                        <Text style={styles.mainTextStyle}>Time(Server)</Text>
                        <Text style={styles.textStyle}>2020-09-17</Text>
                        <Text style={styles.textStyle}>06:58:06</Text>
                    </View>
                </View>

                <View style={styles.addressMainView}>
                    <Text style={styles.mainTextStyle}>Address</Text>
                    <Text style={styles.textStyle}>M62, Bradle, Kirklees,</Text>
                    <Text style={styles.textStyle}>West Yorkshire, HD6 4JX, GB</Text>
                </View>

                <View style={styles.infoDataMainView}>
                    <View style={{ flexDirection: 'column', width: '35%' }}>
                        <Text style={styles.mainTextStyle}>Angle</Text>
                        <Text style={styles.textStyle}>54{`\u02DA`} </Text>
                    </View>

                    <View style={{ flexDirection: 'column', width: '40%' }}>
                        <Text style={styles.mainTextStyle}>Engine state & hours</Text>
                        <Text style={styles.textStyle}>On</Text>
                        <Text style={styles.textStyle}>546h</Text>
                    </View>

                    <View style={{ flexDirection: 'column', width: '25%' }}>
                        <Text style={styles.mainTextStyle}>Altitude</Text>
                        <Text style={styles.textStyle}>502 ft</Text>
                    </View>
                </View>
            </View>

            <View style={styles.cardContainer}>
                <View style={styles.titleViewStyle}>
                    <Text style={styles.titleTextStyle}>Sensor</Text>
                    <Image source={images.sensorInfo.sensor} resizeMode='contain' />
                </View>

                <View style={styles.lineStyle} />

                <View style={styles.infoDataMainView}>
                    <View style={{ flexDirection: 'column', width: '35%' }}>
                        <Text style={styles.mainTextStyle}>Odometer</Text>
                        <Text style={styles.textStyle}>1965631 mi</Text>
                    </View>

                    <View style={{ flexDirection: 'column', width: '40%' }}>
                        <Text style={styles.mainTextStyle}>State</Text>
                        <Text style={styles.textStyle}>Moving</Text>
                    </View>

                    <View style={{ flexDirection: 'column', width: '25%' }}>
                        <Text style={styles.mainTextStyle}>Vehicle Power</Text>
                        <Text style={styles.textStyle}>OV</Text>
                    </View>
                </View>

                <View style={styles.infoDataMainView}>
                    <View style={{ flexDirection: 'column', width: '35%' }}>
                        <Text style={styles.mainTextStyle}>Battery</Text>
                        <Text style={styles.textStyle}>0%</Text>
                    </View>

                    <View style={{ flexDirection: 'column', width: '40%' }}>
                        <Text style={styles.mainTextStyle}>Ignition</Text>
                        <Text style={styles.textStyle}>On</Text>
                    </View>

                    <View style={{ flexDirection: 'column', width: '25%' }}>
                        <Text style={styles.mainTextStyle}>Digital Input</Text>
                        <Text style={styles.textStyle}>Off</Text>
                    </View>
                </View>

                <View style={styles.sensorMainView}>
                    <View style={{ flexDirection: 'column', width: '35%' }}>
                        <Text style={styles.mainTextStyle}>Fuel Levellll</Text>
                        <Text style={styles.textStyle}>75%</Text>
                    </View>

                    <View style={{ flexDirection: 'column', width: '40%' }}>
                        <Text style={styles.mainTextStyle}>Temperature</Text>
                        <Text style={styles.textStyle}>20.6{`\u02DA`}</Text>
                    </View>
                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    DeviceInfoMainView: {
        flex: 1,
        backgroundColor: ColorConstant.WHITE,
    },

    mainView: {
        width: '95%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: ColorConstant.ORANGE,
        height: hp(5)
    },

    textViewStyle: {
        color: ColorConstant.WHITE,
        fontWeight: 'bold',
        fontSize: FontSize.FontSize.medium
    },

    cardContainer: {
        //width:'100%',
        width: Dimensions.get('screen').width - 30,
        marginTop: hp(2),
        // height:hp(18),
        elevation: 3,
        alignSelf: 'center',
        backgroundColor: ColorConstant.WHITE,
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: ColorConstant.GREY,
        shadowColor: ColorConstant.GREY,
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 0 },
        paddingBottom: hp(1),
        marginBottom: hp(3)
    },

    titleViewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: hp(2),
        alignItems: 'center',
        marginVertical: hp(1),
    },

    titleTextStyle: {
        color: ColorConstant.BLUE,
        fontSize: FontSize.FontSize.small,
    },

    lineStyle: {
        borderBottomColor: ColorConstant.GREY,
        borderBottomWidth: 0.5,
        marginHorizontal: hp(2)
    },

    infoDataMainView: {
        flexDirection:'row',
        marginTop:hp(1.5),
        paddingHorizontal:hp(2.5),
        paddingBottom:hp(1.5)
    },

    sensorMainView: {
        flexDirection: 'row',
        marginHorizontal: hp(2),
        paddingBottom: hp(1.5),
    },

    addressMainView: {
        marginHorizontal: hp(2),
        paddingBottom: hp(1.5),
    },

    mainTextStyle: {
        color: ColorConstant.GREY,
        fontSize: hp(1.4),
        marginTop: hp(1.5),
    },

    textStyle: {
        color: ColorConstant.BLACK,
        fontSize: hp(1.4),
        marginTop: hp(1),
    }

});

export default DeviceInfo;