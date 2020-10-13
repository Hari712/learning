import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants';
import FontSize from '../../component/FontSize';

const GeoFence = ({ navigation }) => {

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

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <TouchableOpacity style={styles.createNewMainView} onPress={() => navigation.navigate('GeoFenceCreateNew')} >
                    <Text style = {styles.createNewText}>Create New</Text>
                </TouchableOpacity>

                <View style={styles.cardContainer}>
                    <View style={styles.blueBox}>
                        <Text style={styles.blueBoxTitle}> Gas Station </Text>
                        <TouchableOpacity onPress={() => { }}>
                            <Image source={images.geoFence.deleteIcon} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.whiteContainer}>
                        <View style={{ flexDirection: 'column', flex: 1 }} >
                            <Text style={styles.whiteContainerText}>Group</Text>
                            <Text style={styles.whiteContainerSubText}>Home</Text>
                        </View>

                        <View style = {{flex: 1 }}>
                            <Text style={styles.whiteContainerText}>Device Name</Text>
                            <Text style={styles.whiteContainerSubText}>Track port International</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.cardContainer}>
                    <View style={styles.blueBox}>
                        <Text style={styles.blueBoxTitle}> Oil Refinery </Text>
                        <TouchableOpacity onPress={() => { }}>
                            <Image source={images.geoFence.deleteIcon} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.whiteContainer}>
                        <View style={{ flexDirection: 'column', flex: 1 }} >
                            <Text style={styles.whiteContainerText}>Group</Text>
                            <Text style={styles.whiteContainerSubText}>Home</Text>
                        </View>

                        <View style = {{flex: 1}}>
                            <Text style={styles.whiteContainerText}>Device Name</Text>
                            <Text style={styles.whiteContainerSubText}>Spark Nano 7 GPS Tracker</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>
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
        fontFamily:'Nunito-Bold',
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
        fontFamily:'Nunito-Regular'
    },
    whiteContainerSubText: {
        color: ColorConstant.BLACK,
        fontSize: FontSize.FontSize.small,
        fontFamily:'Nunito-Regular'
    },
})

export default GeoFence;
