import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet } from 'react-native';
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

    const SensorInfoItem = ({ navigation }) => {
        return(
            <View>
                <Text>kk</Text>
            </View>
        )
    }

    return(
        <SafeAreaView style={styles.container}>
            <FlatList 
                style={{ }}
                contentContainerStyle={{ }}
                data = { SENSORINFOITEMS }
                renderItem= { SensorInfoItem }
                keyExtractor={(item,index) => index.toString()}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorConstant.WHITE,
      },
})

export default SensorInfo;

const SENSORINFOITEMS = [
    {
        title: 'kinnari'
    }
]