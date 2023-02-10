import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,} from 'react-native-indicators';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ColorConstant } from '../constants/ColorConstants'


const Loader = () => {
    return (
        <View style={styles.container}>
            <DotIndicator color={ColorConstant.ORANGE} size={hp(2)} />
        </View>
    )
}


const styles = StyleSheet.create({




    container: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignSelf: 'stretch' }
});

export default Loader