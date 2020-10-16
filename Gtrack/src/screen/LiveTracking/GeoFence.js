import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, Dimensions, ScrollView, FlatList } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants';
import FontSize from '../../component/FontSize';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import MapView from '../../component/MapView'

const GeoFence = ({ navigation }) => {
    const [viewDialogBox, setViewDialogBox] = useState(false)

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={{
                    color: ColorConstant.GREY,
                    fontSize: FontSize.FontSize.medium,
                    fontWeight: '500',
                    textAlign: 'center'
                }}>
                    Geo Fence
                </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={{ marginLeft: hp(2) }} source={images.image.back} />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    useEffect(() => {
        console.log('Dialog Visibility', viewDialogBox)
    }, [viewDialogBox])

    function RenderViewDetailsDialog(item, index) {
        return (
            <Dialog visible={viewDialogBox} onTouchOutside={() => hideDialog()}>
                <DialogContent>
                    <View style={styles.mainViewHeading}>
                        <View style={styles.subHeadingView}>
                            <Text style={styles.headingText}>View</Text>
                            <Image source={images.geoFence.CrossBlack} resizeMode="contain" style={{ marginTop: hp(0.5) }} />
                        </View>

                        <View style={styles.popUpCardContainer}>
                            <View style={styles.titleViewStyle}>
                                <Text style={styles.titleTextStyle}>Details</Text>
                                <Image source={images.geoFence.listIcon} resizeMode='contain' />
                            </View>

                            <View style={styles.lineStyle} />

                            <View style={styles.infoDataMainView}>
                                <View style={{ flexDirection: 'column', width: '50%' }}>
                                    <Text style={styles.mainTextStyle}>Name</Text>
                                    <Text style={styles.textStyle}>Gas Station</Text>
                                </View>

                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={styles.mainTextStyle}>Description</Text>
                                    <Text style={styles.textStyle}>Description of card</Text>
                                </View>
                            </View>

                            <View style={styles.secondRowMainView}>
                                <View style={{ flexDirection: 'column', width: '25%' }}>
                                    <Text style={styles.mainTextStyle}>Colour</Text>
                                    <View style={styles.deviceSummaryDetailView}></View>
                                </View>

                                <View style={{ flexDirection: 'column', width: '25%' }}>
                                    <Text style={styles.mainTextStyle}>Font Size</Text>
                                    <Text style={styles.fontSizeStyle}>08</Text>
                                </View>

                                <View style={{ flexDirection: 'column', width: '30%' }}>
                                    <Text style={styles.mainTextStyle}>Type</Text>
                                    <Text style={styles.fontSizeStyle}>Polygon</Text>
                                </View>

                                <View style={{ flexDirection: 'column', width: '50%', }}>
                                    <Text style={styles.mainTextStyle}>Image</Text>
                                    <View style={styles.deviceSummaryDetailView}></View>
                                </View>
                            </View>

                            <View style={styles.secondRowMainView}>
                                <View style={{ flexDirection: 'column', width: '25%' }}>
                                    <Text style={styles.mainTextStyle}>Visibility</Text>
                                    <Text style={styles.fontSizeStyle}>02 to 20</Text>
                                </View>

                                <View style={{ flexDirection: 'column', width: '25%' }}>
                                    <Text style={styles.mainTextStyle}>Area</Text>
                                    <Text style={styles.fontSizeStyle}>100m2</Text>
                                </View>

                                <View style={{ flexDirection: 'column', width: '30%' }}>
                                    <Text style={styles.mainTextStyle}>Perimeter</Text>
                                    <Text style={styles.fontSizeStyle}>75m</Text>
                                </View>
                            </View>

                            <View style={styles.secondRowMainView}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={styles.mainTextStyle}>Selected Devices</Text>
                                    <Text style={styles.fontSizeStyle}>TrackPort International</Text>
                                    <Text style={styles.fontSizeStyle}>Spark Nano 7 GPS Tracker</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.popUpCardContainer}>
                            <View style={styles.titleViewStyle}>
                                <Text style={styles.titleTextStyle}>Location</Text>
                                <Image source={images.geoFence.pin} resizeMode='contain' />
                            </View>

                            <View style={styles.lineStyle} />

                            <View style={{ height: hp(20), width: '100%', paddingHorizontal: wp(5), padding: hp(2) }}>
                                <MapView />
                            </View>
                        </View>

                        <View style={styles.buttonMainContainer}>
                            <TouchableOpacity onPress={() => { navigation.navigate('GeoFenceType') }} style={styles.nextButton}>
                                <Text style={styles.nextButtonText}>Next</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </DialogContent>
            </Dialog>
        )
    }

    function hideDialog() {
        setViewDialogBox(false)
    }

    const GeoFenceInfoItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.cardContainer} onPress={() => { setViewDialogBox(!viewDialogBox) }}>
                <View style={styles.blueBox}>
                    <Text style={styles.blueBoxTitle}> {item.title} </Text>
                    <TouchableOpacity onPress={() => { }}>
                        <Image source={item.deleteIcon} resizeMode="contain" />
                    </TouchableOpacity>
                </View>

                <View style={styles.whiteContainer}>
                    <View style={{ flexDirection: 'column', flex: 1 }} >
                        <Text style={styles.whiteContainerText}>{item.Group}</Text>
                        <Text style={styles.whiteContainerSubText}>{item.GroupData}</Text>
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.whiteContainerText}>{item.DeviceName}</Text>
                        <Text style={styles.whiteContainerSubText}>{item.DeviceNameData}</Text>
                    </View>
                </View>
            </TouchableOpacity>

        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.createNewMainView} onPress={() => navigation.navigate('GeoFenceCreateNew')} >
                <Text style={styles.createNewText}>Create New</Text>
            </TouchableOpacity>
            <FlatList
                style={{}}
                contentContainerStyle={{}}
                data={GEOFENCEINFO}
                renderItem={GeoFenceInfoItem}
                keyExtractor={(item, index) => index.toString()}
            />

            {RenderViewDetailsDialog()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorConstant.WHITE,
    },
    createNewMainView: {
        width: '95%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: ColorConstant.ORANGE,
        height: hp(5),
        borderRadius: 14,
        marginTop: hp(3)
    },
    createNewText: {
        fontSize: FontSize.FontSize.small,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    cardContainer: {
        width: '95%',
        marginVertical: hp(1.5),
        alignSelf: 'center',
        backgroundColor: ColorConstant.WHITE,
        borderRadius: 12,
        // elevation:3,
        borderWidth: 0.3,
        borderColor: ColorConstant.GREY,
        shadowColor: ColorConstant.GREY,
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 0 },
    },
    blueBox: {
        backgroundColor: ColorConstant.BLUE,
        alignItems: 'center',
        height: hp(5),
        flexDirection: 'row',
        width: "100%",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        paddingHorizontal: hp(2),

    },
    blueBoxTitle: {
        color: ColorConstant.WHITE,
        fontSize: hp(1.4),
        fontWeight: 'bold',
        flex: 1,
        fontFamily: 'Nunito-Bold',
    },
    whiteContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: hp(1.5),
        paddingHorizontal: wp(3.5),
        paddingBottom: hp(1.5)
    },
    whiteContainerText: {
        color: ColorConstant.GREY,
        fontSize: hp(1.4),
        fontFamily: 'Nunito-Regular'
    },
    whiteContainerSubText: {
        color: ColorConstant.BLACK,
        fontSize: FontSize.FontSize.small,
        fontFamily: 'Nunito-Regular'
    },
    mainViewHeading: {
        height: hp(80),
        width: wp(80)
    },
    subHeadingView: {
        flexDirection: 'row',
        marginTop: hp(2),
        justifyContent: 'space-between'
    },
    headingText: {
        fontSize: FontSize.FontSize.medium,
        color: ColorConstant.ORANGE,
        fontWeight: 'bold',
        marginLeft: wp(35)
    },
    popUpCardContainer: {
        width: '100%',
        // width: Dimensions.get('screen').width - 30,
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
        // paddingBottom: hp(1),
        // marginBottom: hp(3)
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
    buttonMainContainer: {
        width: wp(70),
        marginTop: hp(3),
        alignSelf: 'center'
    },
    nextButton: {
        borderRadius: 6,
        width: '40%',
        height: hp(5),
        justifyContent: 'center',
        backgroundColor: ColorConstant.BLUE,
    },
    nextButtonText: {
        textAlign: 'center',
        color: ColorConstant.WHITE,
        fontWeight: 'bold'
    },
    infoDataMainView: {
        flexDirection: 'row',
        marginTop: hp(1.5),
        paddingHorizontal: hp(2.5),
        paddingBottom: hp(1.5)
    },
    secondRowMainView: {
        flexDirection: 'row',
        // marginTop: hp(1.5),
        paddingHorizontal: hp(2.5),
        paddingBottom: hp(1.5)
    },
    mainTextStyle: {
        color: ColorConstant.GREY,
        fontSize: hp(1.4),
        marginTop: hp(1.5),
    },
    fontSizeStyle: {
        fontSize: hp(1.4),
        color: ColorConstant.BLACK,
        marginTop: hp(1.5)
    },
    deviceSummaryDetailView: {
        width: hp(2.5),
        height: hp(2.5),
        backgroundColor: '#E77575',
        borderRadius: hp(0.5),
        marginTop: hp(1)
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    textStyle: {
        color: ColorConstant.BLACK,
        fontSize: hp(1.4),
        marginTop: hp(1),
    }
})

export default GeoFence;

const GEOFENCEINFO = [
    {
        title: 'Gas Station',
        deleteIcon: images.geoFence.deleteIcon,
        Group: 'Group',
        DeviceName: 'Device Name',
        GroupData: 'Home',
        DeviceNameData: 'Track Port International'
    },
    {
        title: 'Oil Refinery',
        deleteIcon: images.geoFence.deleteIcon,
        Group: 'Group',
        DeviceName: 'Device Name',
        GroupData: 'Home',
        DeviceNameData: 'Spark Nano 7 GPS Tracker'
    }
]
