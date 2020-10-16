import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, Dimensions, ScrollView, FlatList } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants';
import FontSize from '../../component/FontSize';
import Dialog, { DialogContent } from 'react-native-popup-dialog';

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
        return(
            <Dialog visible={viewDialogBox} onTouchOutside={() => hideDialog()}>
                <DialogContent>
                    <Text>kk</Text>
                </DialogContent>
            </Dialog>
        )
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
