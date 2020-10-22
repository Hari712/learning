import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, Dimensions, ScrollView, FlatList } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants';
import FontSize from '../../component/FontSize';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import MapView from '../../component/MapView';

const GeoFence = ({ navigation }) => {
    const [viewDialogBox, setViewDialogBox] = useState(false);
    const [deleteDialogBox, setDeleteDialogBox] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [dlete, setDelete] = useState(false);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={styles.headerTitle}>                 
                    Geo Fence
                </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={styles.headerLeftStyle} source={images.image.back} />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    useEffect(() => {
        console.log('Dialog Visibility', viewDialogBox)
        console.log('Dialog Visibility', deleteDialogBox)
    }, [viewDialogBox], [deleteDialogBox])

    function RenderViewDetailsDialog(item, index) {
        return (
            <Dialog visible={viewDialogBox} onTouchOutside={() => hideDialog()} dialogStyle={styles.dialogStyle}>
                <DialogContent>
                    <View style={styles.mainViewHeading}>
                        <View style={styles.subHeadingView}>
                            <Text style={styles.headingText}>View</Text>
                            <TouchableOpacity onPress={() => { hideDialog() }}>
                                <Image source={images.geoFence.CrossBlack} resizeMode="contain" style={styles.crossImageStyle} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.popUpCardContainer}>
                            <View style={styles.titleViewStyle}>
                                <Text style={styles.titleTextStyle}>Details</Text>
                                <Image source={images.geoFence.listIcon} resizeMode='contain' />
                            </View>

                            <View style={styles.lineStyle} />

                            <View style={styles.infoDataMainView}>
                                <View style={styles.infoDataSubView}>
                                    <Text style={styles.mainTextStyle}>Name</Text>
                                    <Text style={styles.textStyle}>Gas Station</Text>
                                </View>

                                <View style={styles.descriptionMainStyle}>
                                    <Text style={styles.mainTextStyle}>Description</Text>
                                    <Text style={styles.textStyle}>Description of card</Text>
                                </View>
                            </View>

                            <View style={styles.geoFenceDetailMainView}>
                                <View style={styles.detailsMainView}>
                                    <View style={styles.secondRowMainView}>
                                        <View style={styles.secondRowSubView}>
                                            <Text style={styles.mainTextStyle}>Colour</Text>
                                            <View style={styles.deviceSummaryDetailView}></View>
                                        </View>

                                        <View style={styles.fontSizeMainView}>
                                            <Text style={styles.mainTextStyle}>Font Size</Text>
                                            <Text style={styles.fontSizeStyle}>08</Text>
                                        </View>

                                        <View style={styles.typeMainViewStyle}>
                                            <Text style={styles.mainTextStyle}>Type</Text>
                                            <Text style={styles.fontSizeStyle}>Polygon</Text>
                                        </View>
                                    </View>

                                    <View style={styles.secondRowMainView}>
                                        <View style={styles.visibilityMainView}>
                                            <Text style={styles.mainTextStyle}>Visibility</Text>
                                            <Text style={styles.fontSizeStyle}>02 to 20</Text>
                                        </View>

                                        <View style={styles.areaMainView}>
                                            <Text style={styles.mainTextStyle}>Area</Text>
                                            <Text style={styles.fontSizeStyle}>100m2</Text>
                                        </View>

                                        <View style={styles.perimeterMainView}>
                                            <Text style={styles.mainTextStyle}>Perimeter</Text>
                                            <Text style={styles.fontSizeStyle}>75m</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.secondRowMainView}>
                                    <View style={styles.descriptionMainStyle}>
                                        <Text style={styles.mainTextStyle}>Image</Text>
                                        <Image source={images.geoFence.Intersection} resizeMode='stretch' style={styles.intersectionImageStyle} />
                                    </View>
                                </View>
                            </View>

                            <View style={styles.secondRowMainView}>
                                <View style={styles.descriptionMainStyle}>
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

                            <View style={styles.mapViewMainView}>
                                <MapView />
                            </View>
                        </View>

                        <View style={styles.buttonMainContainer}>
                            <TouchableOpacity onPress={() => { navigation.navigate('GeoFenceType') }} style={styles.nextButton}>
                                <Text style={styles.nextButtonText}>Edit</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </DialogContent>
            </Dialog>
        )
    }

    function hideDialog() {
        setViewDialogBox(false)
        setDeleteDialogBox(false)
    }

    function RenderViewDeleteDialog(item, index) {
        return (
            <Dialog visible={deleteDialogBox} onTouchOutside={() => hideDialog()} dialogStyle={styles.dialogStyle}>
                <DialogContent>
                    <View style={styles.deleteDialogMainView}>

                        <View style={styles.subHeadingView}>
                            <Text style={styles.deleteText}>Are you sure ?</Text>
                            <TouchableOpacity onPress={() => { hideDialog() }}>
                                <Image source={images.geoFence.CrossBlack} resizeMode="contain" style={styles.crossImageStyle} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.textMainView}>
                            <Text style={styles.textViewStyle}>Do you really want to delete Gas Station ?</Text>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => { cancel ? setCancel(false) : setCancel(true), navigation.goBack() }} style={[styles.cancelButton]}>
                                <Text style={styles.buttonTextColor}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { hideDialog() }} style={styles.nextButton}>
                                <Text style={styles.nextButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </DialogContent>
            </Dialog>
        )
    }

    const GeoFenceInfoItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.cardContainer} onPress={() => { setViewDialogBox(!viewDialogBox) }}>
                <View style={styles.blueBox}>
                    <Text style={styles.blueBoxTitle}> {item.title} </Text>
                    <TouchableOpacity onPress={() => { setDeleteDialogBox(!deleteDialogBox) }}>
                        <Image source={item.deleteIcon} resizeMode="contain" />
                    </TouchableOpacity>
                </View>

                <View style={styles.whiteContainer}>
                    <View style={styles.GroupMainView}>
                        <Text style={styles.whiteContainerText}>{item.Group}</Text>
                        <Text style={styles.whiteContainerSubText}>{item.GroupData}</Text>
                    </View>

                    <View style={styles.deviceNameMainView}>
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
            {RenderViewDeleteDialog()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerTitle: {
        color: ColorConstant.GREY,
        fontSize: FontSize.FontSize.medium,
        fontWeight: '500',
        textAlign: 'center'
    },
    headerLeftStyle: {
        marginLeft: hp(2)
    },
    dialogStyle: {
        borderRadius: 15
    },
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
    GroupMainView: {
        flexDirection: 'column', 
        flex: 1
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
    deviceNameMainView: {
        flex: 1 
    },
    mainViewHeading: {
        height: hp(80),
        width: wp(80)
    },
    deleteDialogMainView: {
        height: hp(23),
        width: wp(80)
    },
    subHeadingView: {
        flexDirection: 'row',
        marginTop: hp(2),
        justifyContent: 'space-between'
    },
    deleteText: {
        fontSize: FontSize.FontSize.medium,
        color: ColorConstant.ORANGE,
        fontWeight: 'bold',
        marginLeft: wp(25),
    },
    textMainView: {
        marginTop: hp(5),
        alignSelf: 'center'
    },
    textViewStyle: {
        fontSize: FontSize.FontSize.small,
        color: ColorConstant.BLACK
    },
    headingText: {
        fontSize: FontSize.FontSize.medium,
        color: ColorConstant.ORANGE,
        fontWeight: 'bold',
        marginLeft: wp(35)
    },
    crossImageStyle: {
        marginTop: hp(0.5)
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
    mapViewMainView: {
        height: hp(20), 
        width: '100%', 
        paddingHorizontal: wp(5), 
        padding: hp(2)
    },
    buttonMainContainer: {
        width: wp(70),
        marginTop: hp(3),
        marginLeft: wp(28)
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp(75),
        marginTop: hp(7),
        alignSelf: 'center',
        // paddingBottom: hp(6)
    },
    cancelButton: {
        borderRadius: 6,
        width: '40%',
        height: hp(4),
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: ColorConstant.BLUE,
    },
    buttonTextColor: {
        textAlign: 'center',
        color: ColorConstant.BLUE
    },
    nextButton: {
        borderRadius: 6,
        width: '40%',
        height: hp(4),
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
    infoDataSubView: {
        flexDirection: 'column', 
        width: '50%'
    },
    secondRowMainView: {
        flexDirection: 'row',
        // marginTop: hp(1.5),
        paddingHorizontal: hp(1.5),
        paddingBottom: hp(1)
    },
    visibilityMainView: {
        flexDirection: 'column', 
        width: '36%'
    },
    secondRowSubView: {
        flexDirection: 'column', 
        width: '35%'
    },
    mainTextStyle: {
        color: ColorConstant.GREY,
        fontSize: hp(1.4),
        marginTop: hp(1.5),
    },
    intersectionImageStyle: {
        marginTop: hp(1), 
        height: hp(10), 
        width: wp(20)
    },
    fontSizeStyle: {
        fontSize: hp(1.4),
        color: ColorConstant.BLACK,
        marginTop: hp(1)
    },
    perimeterMainView: {
        flexDirection: 'column', 
        width: '35%'
    },
    areaMainView: {
        flexDirection: 'column', 
        width: '40%'
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
    fontSizeMainView: {
        flexDirection: 'column', 
        width: '40%'
    },
    typeMainViewStyle: {
        flexDirection: 'column', 
        width: '35%'
    },
    textStyle: {
        color: ColorConstant.BLACK,
        fontSize: hp(1.4),
        marginTop: hp(1),
    },
    geoFenceDetailMainView: {
        flexDirection: 'row'
    },
    detailsMainView: {
        width: '68%'
    },
    descriptionMainStyle:{
        flexDirection: 'column'
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
