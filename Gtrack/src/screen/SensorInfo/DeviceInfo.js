import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ColorConstant } from '../../constants/ColorConstants';
import { translate } from '../../../App'
import { FontSize } from '../../component';
import { BackIcon, ListIcon, SensorIcon } from '../../component/SvgComponent';


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
                    {translate("Sensor Information")}
                </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity style={{padding:hp(2)}} onPress={() => navigation.goBack()}>
                    <BackIcon />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    return (
        <SafeAreaView style={styles.DeviceInfoMainView}>
            <ScrollView>
                <View style={styles.mainView}>
                    <Text style={styles.textViewStyle}>{deviceInfo.title}</Text>
                </View>

                <View style={styles.cardContainer}>
                    <View style={styles.titleViewStyle}>
                        <Text style={styles.titleTextStyle}>{translate("Sensor_Info_string2")}</Text>
                        <ListIcon/>
                    </View>

                    <View style={styles.lineStyle} />

                    <View style={styles.infoDataMainView}>
                        <View style={{ flexDirection: 'column', width: '35%' }}>
                            <Text style={styles.mainTextStyle}>{translate("Sensor_Info_string3")}</Text>
                            <Text style={styles.textStyle}>Moving</Text>
                            <Text style={styles.textStyle}>1h 45m 25s</Text>
                        </View>

                        <View style={{ flexDirection: 'column', width: '40%' }}>
                            <Text style={styles.mainTextStyle}>{translate("Sensor_Info_string4")}</Text>
                            <Text style={styles.textStyle}>2020-09-17</Text>
                            <Text style={styles.textStyle}>06:58:06</Text>
                        </View>

                        <View style={{ flexDirection: 'column', width: '25%' }}>
                            <Text style={styles.mainTextStyle}>{translate("Sensor_Info_string5")}</Text>
                            <Text style={styles.textStyle}>2020-09-17</Text>
                            <Text style={styles.textStyle}>06:58:06</Text>
                        </View>
                    </View>

                    <View style={styles.addressMainView}>
                        <Text style={styles.mainTextStyle}>{translate("Sensor_Info_string6")}</Text>
                        <Text style={styles.textStyle}>M62, Bradle, Kirklees,</Text>
                        <Text style={styles.textStyle}>West Yorkshire, HD6 4JX, GB</Text>
                    </View>

                    <View style={styles.infoDataMainView}>
                        <View style={{ flexDirection: 'column', width: '35%' }}>
                            <Text style={styles.mainTextStyle}>{translate("Sensor_Info_string7")}</Text>
                            <Text style={styles.textStyle}>54{`\u02DA`} </Text>
                        </View>

                        <View style={{ flexDirection: 'column', width: '40%' }}>
                            <Text style={styles.mainTextStyle}>{translate("Sensor_Info_string8")}</Text>
                            <Text style={styles.textStyle}>On</Text>
                            <Text style={styles.textStyle}>546h</Text>
                        </View>

                        <View style={{ flexDirection: 'column', width: '25%' }}>
                            <Text style={styles.mainTextStyle}>{translate("Sensor_Info_string9")}</Text>
                            <Text style={styles.textStyle}>502 ft</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.cardContainer}>
                    <View style={styles.titleViewStyle}>
                        <Text style={styles.titleTextStyle}>{translate("Sensor")}</Text>
                        <SensorIcon resizeMode='contain'/>
                    </View>

                    <View style={styles.lineStyle} />

                    <View style={styles.infoDataMainView}>
                        <View style={{ flexDirection: 'column', width: '35%' }}>
                            <Text style={styles.mainTextStyle}>{translate("Sensor_Info_string10")}</Text>
                            <Text style={styles.textStyle}>1965631 mi</Text>
                        </View>

                        <View style={{ flexDirection: 'column', width: '40%' }}>
                            <Text style={styles.mainTextStyle}>{translate("Sensor_Info_string3")}</Text>
                            <Text style={styles.textStyle}>Moving</Text>
                        </View>

                        <View style={{ flexDirection: 'column', width: '25%' }}>
                            <Text style={styles.mainTextStyle}>{translate("Sensor_Info_string11")}</Text>
                            <Text style={styles.textStyle}>OV</Text>
                        </View>
                    </View>

                    <View style={styles.infoDataMainView}>
                        <View style={{ flexDirection: 'column', width: '35%' }}>
                            <Text style={styles.mainTextStyle}>{translate("Sensor_Info_string12")}</Text>
                            <Text style={styles.textStyle}>0%</Text>
                        </View>

                        <View style={{ flexDirection: 'column', width: '40%' }}>
                            <Text style={styles.mainTextStyle}>{translate("Ignition")}</Text>
                            <Text style={styles.textStyle}>On</Text>
                        </View>

                        <View style={{ flexDirection: 'column', width: '25%' }}>
                            <Text style={styles.mainTextStyle}>{translate("Sensor_Info_string14")}</Text>
                            <Text style={styles.textStyle}>Off</Text>
                        </View>
                    </View>

                    <View style={styles.sensorMainView}>
                        <View style={{ flexDirection: 'column', width: '35%' }}>
                            <Text style={styles.mainTextStyle}>{translate("Sensor_Info_string15")}</Text>
                            <Text style={styles.textStyle}>75%</Text>
                        </View>

                        <View style={{ flexDirection: 'column', width: '40%' }}>
                            <Text style={styles.mainTextStyle}>{translate("Sensor_Info_string16")}</Text>
                            <Text style={styles.textStyle}>20.6{`\u02DA`}</Text>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
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
        flexDirection: 'row',
        marginTop: hp(1.5),
        paddingHorizontal: hp(2.5),
        paddingBottom: hp(1.5)
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