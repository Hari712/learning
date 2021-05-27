import React, { useState, useLayoutEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { getAppLogs } from '../screen/Selector'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FontSize from '../component/FontSize'
import { ColorConstant } from '../constants/ColorConstants'
import { BackIcon } from '../component/SvgComponent';

// { id, module, message, payload } // format
const AppLogs = ({ navigation }) => {

    const { arrLogs } = useSelector(state => ({
        arrLogs: getAppLogs(state)
    }))

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'App Logs',
            headerTitleAlign: 'center',
            headerRight: () => null,
            headerTitleStyle: styles.headerTitleStyle,
            headerLeft: () => (
                <View style={styles.leftHeaderContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <BackIcon {...styles.backButton} />
                    </TouchableOpacity>
                </View>
            ),
        });
        return () => {

        };
    }, [navigation])
    
    return (
        <View style={styles.container}>
            <ScrollView>
                {arrLogs.map((item, index) => {
                    const log = JSON.stringify(item)
                    return (
                        <View key={index} style={{ width: '100%', paddingHorizontal: hp(1), paddingVertical: hp(1) }}> 
                            <Text style={{ fontSize: FontSize.FontSize.small, color: ColorConstant.dark }}>{log}</Text>
                        </View>    
                    )
                })}
            </ScrollView>   
        </View>    
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerTitleStyle: {
        fontFamily: 'Montserrat-SemiBold', 
        fontSize: FontSize.FontSize.regular, 
        marginTop: hp(-5.5)
    },
    leftHeaderContainer: {
        flexDirection: 'row', 
        paddingLeft: wp(3), 
        marginTop: hp(-6.9)
    },
    backButton: {
        marginRight: hp(3), 
        width: hp(3.5), 
        height: hp(3.5)
    },
})

export default AppLogs