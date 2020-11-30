import React, { Component } from 'react'
import { View, Image, StyleSheet, Text, ImageBackground, Dimensions, TouchableOpacity } from 'react-native'
import images from '../../constants/images'

const Splash = (navigation) => {
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.backgroundImage} source={images.image.splash} resizeMode={'stretch'}>
                <Image style={styles.imageStyle} source={images.image.logo} />
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageStyle: {
        position: 'absolute',
        alignSelf: 'center'
    }
})

export default Splash;