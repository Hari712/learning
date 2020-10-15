import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, TextInput, Dimensions } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants';
import FontSize from '../../component/FontSize';
import MapView from '../../component/MapView';

const GeoFenceType = ({ navigation }) => {

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
                    <Image style={{ marginLeft: wp(4) }} source={images.image.back} />
                </TouchableOpacity>
            ), 
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('GeoFenceDetails')}>
                    <Text style = {{color: ColorConstant.BLUE, marginRight: wp(4)}}>Next</Text>
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    return (
        <View style={styles.container}>

            <MapView />

            <View style={styles.subContainer}>
                <View style={styles.search}>
                    <TextInput
                        placeholder='Search Here..'
                        // onChangeText={text => searchFilter(text)}
                        // value={search}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subContainer: {
        width: Dimensions.get('window').width,
        alignItems: 'center',
        position: 'absolute'
    },
    search: {
        paddingHorizontal: hp(2),
        flexDirection: 'row',
        alignItems: 'center',
        width: '85%',
        height: hp(5.5),
        borderRadius: 12,
        marginTop: hp(4),
        marginBottom: hp(2),
        elevation: 4,
        shadowColor: ColorConstant.GREY,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 3,
        shadowOpacity: 1,
        backgroundColor: ColorConstant.WHITE
    },
})

export default GeoFenceType;