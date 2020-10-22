import React, { useState, Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import images from '../../../constants/images';
import { ColorConstant } from '../../../constants/ColorConstants';
import FontSize from '../../../component/FontSize';

const NOTIFICATIONS = [
    {
        title: 'Push Notification'
    },
    {
        title: 'Email Notification'
    },
    {
        title: 'SMS Notification'
    },
]

const SettingNotification = ({ navigation }) => {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={{
                    color: ColorConstant.GREY,
                    fontSize: FontSize.FontSize.medium,
                    fontWeight: '500',
                    textAlign: 'center'
                }}>
                    Settings
                </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={{ marginLeft: hp(2) }} source={images.image.back} />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    const NotificationsItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.bodySubContainer} onPress={() => onPressHandle({ navigation, item })} activeOpacity={0.8}>
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
        <View style={styles.container}>
            <View style={styles.mainView}>
                <Text style={styles.textViewStyle}>Notifications</Text>
            </View>

            <FlatList
                style={{}}
                contentContainerStyle={{}}
                data={NOTIFICATIONS}
                renderItem={NotificationsItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
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
    },
    titleIconStyle: {
        height: hp(2),
        width: hp(2),
    },
    textViewStyle: {
        color: ColorConstant.WHITE,
        fontWeight: 'bold',
        fontSize: FontSize.FontSize.medium
    },
    titleTextStyle: {
        fontSize: FontSize.FontSize.medium,
        color: ColorConstant.BLUE,
        paddingLeft: wp(3)
    },
    rightMainViewStyle: {
        paddingHorizontal: wp(3),
        paddingBottom: hp(3)
    },
    lineStyle: {
        borderBottomColor: '#e3e3e3',
        borderBottomWidth: 1
    },

})

export default SettingNotification;