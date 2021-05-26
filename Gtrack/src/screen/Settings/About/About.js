import React, { useState, Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../../component/FontSize'

const aboutUs = `GTrack is a full-fledged GPS tracking solution. With the leverage of IoT devices, it tracks the asset's location and brings you various insights via an interactive dashboard. Depending on various customer needs, GTrack is flexible to be used as a personal and a corporate solution.

With the seamless integration of various industry-leading softwares, GTrack takes down the stress of regular tracking and brings peace of mind. Whether it’s your business or your little one going to school, you can reply on GTrack for their security and safety anytime.`

const About = ({ navigation }) => {
    return(
        <View style={styles.container}>
            <Text style={{ fontSize: FontSize.FontSize.small, lineHeight: 24 }}>{aboutUs}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: hp(1),
        paddingVertical: hp(1)
    }
})

export default About;