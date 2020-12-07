import React, { useState, Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, LayoutAnimation } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import images from '../../../constants/images';
import { ColorConstant } from '../../../constants/ColorConstants';
import FontSize from '../../../component/FontSize';
import { translate } from '../../../../App'

const NOTIFICATIONS = [
    {
        title: 'Push Notification',
        nextArrow: images.image.settings.nextArrow,
        downArrow: images.image.settings.downArrowOrange,
    },
    {
        title: 'Email Notification',
        nextArrow: images.image.settings.nextArrow,
        downArrow: images.image.settings.downArrowOrange
    },
    {
        title: 'SMS Notification',
        nextArrow: images.image.settings.nextArrow,
        downArrow: images.image.settings.downArrowOrange
    },
]

const PUSHNOTIFICATION = [
    {
        heading: 'Ignition On',
        description: 'Setting_Notification_string10',
        onOffIcon: images.image.settings.onIcon 
    }, 
    {
        heading: 'Ignition Off',
        description: 'Setting_Notification_string11',
        onOffIcon: images.image.settings.IconOff
    },
    {
        heading: 'Overspeed',
        description: 'Setting_Notification_string12',
        onOffIcon: images.image.settings.onIcon
    },
    {
        heading: 'Underspeed',
        description: 'Setting_Notification_string13',
        onOffIcon: images.image.settings.IconOff
    },
    {
        heading: 'Movement',
        description: 'Setting_Notification_string14',
        onOffIcon: images.image.settings.onIcon
    },
    {
        heading: 'Stationary',
        description: 'Setting_Notification_string15',
        onOffIcon: images.image.settings.IconOff
    },
    {
        heading: 'Engine Idle',
        description: 'Setting_Notification_string16',
        onOffIcon: images.image.settings.onIcon
    },
    {
        heading: 'Battery Level',
        description: 'Setting_Notification_string17',
        onOffIcon: images.image.settings.IconOff
    },
    {
        heading: 'Fuel Level',
        description: 'Setting_Notification_string18',
        onOffIcon: images.image.settings.IconOff
    },
    {
        heading: 'Panic',
        description: 'Setting_Notification_string19',
        onOffIcon: images.image.settings.onIcon
    },
    {
        heading: 'Geofence',
        description: 'Setting_Notification_string20',
        onOffIcon: images.image.settings.IconOff
    }
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
                    {translate("Settings")}
                </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={{ marginLeft: hp(2) }} source={images.image.back} />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    const NotificationsItem = ({ data }) => {
        const [isCollapsed, setIsCollapsed] = useState(false)

        const updateLayout = () => {
            setIsCollapsed(!isCollapsed)
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        }

        const ExpandableReportItem = ({ }) => {
            return (
                PUSHNOTIFICATION.map((item, index) => {
                    return(
                    <View style={{ height: isCollapsed ? null : 0, overflow: 'hidden' }}>
                        <View style={styles.headingViewStyle}>
                            <Text style = {styles.headingTextStyle}>{translate(item.heading)}</Text>
                            <Image source={item.onOffIcon} resizeMode='contain'/>
                        </View>
                        <View style = {{paddingHorizontal: wp(5)}}>
                            <Text style = {styles.descriptionText}>{translate(item.description)}</Text>
                        </View>
                    </View>
                )})
            )
        }

        return (
            <View>
                <TouchableOpacity style={styles.bodySubContainer} onPress={updateLayout} activeOpacity={0.8}>
                    <View style={styles.mainViewStyle}>
                        <Text style={[styles.titleTextStyle, {color: isCollapsed ? ColorConstant.ORANGE : ColorConstant.BLUE } ]}>{translate(data.title)}</Text>

                        <View style={{marginTop: hp(0.5)}}>
                            <Image source={isCollapsed ? data.downArrow : data.nextArrow} style={{}} resizeMode='contain' />
                        </View>
                    </View>

                    <View style={styles.lineStyle} />

                </TouchableOpacity>

                <ExpandableReportItem />

            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.mainView}>
                <Text style={styles.textViewStyle}>{translate("Notifications")}</Text>
            </View>


            <ScrollView style={{ }}
                contentContainerStyle={{ paddingHorizontal: hp(1) }}
                showsVerticalScrollIndicator={false}>
                {
                    NOTIFICATIONS.map((item, index) => {
                        return (
                            <NotificationsItem
                                data={item}
                            />
                        )
                    })}
            </ScrollView>


            {/* <FlatList
                style={{}}
                contentContainerStyle={{}}
                data={NOTIFICATIONS}
                renderItem={NotificationsItem}
                keyExtractor={(item, index) => index.toString()}
            /> */}
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
        flexDirection: 'column',
        justifyContent: "space-between",
    },
    mainViewStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(5)
    },
    headingViewStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: hp(1),
        paddingHorizontal: wp(5)
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
    },
    headingTextStyle: {
        fontSize: FontSize.FontSize.small,
        color: ColorConstant.BLACK
    },
    descriptionText: {
        fontSize: hp(1.4),
        fontStyle: 'italic',
        color: ColorConstant.GREY
    },
    lineStyle: {
        borderBottomColor: '#e3e3e3',
        borderBottomWidth: 1
    },

})

export default SettingNotification;