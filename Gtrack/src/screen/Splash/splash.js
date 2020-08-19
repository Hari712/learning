import React, {Component} from 'react'
import { View, Image, StyleSheet, Text, ImageBackground, Dimensions, TouchableOpacity } from 'react-native'
import images from '../../constants/images'

const Splash = () => {
    return (
        <View style={styles.container}>            
            <ImageBackground style={styles.backgroundImage} source={images.image.splash} resizeMode={'stretch'}>
            <Text style={{color:'white'}}>khushbu's</Text>
            <Image source={images.image.logo}></Image>
            <Text style={styles.textStyle}>Already have an account?</Text>
                    <TouchableOpacity style={styles.subContainer} onPress={() => navigation.navigate('Login')}>
                        
                        <Image source={images.image.arrow} style={{ marginTop: 5, }} resizeMode={'stretch'} />
                    </TouchableOpacity>
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
//     subContainer: {
//         marginTop: '5%',
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     textStyle: {
//         //fontSize: FontSize.FontSize.regular,
//         paddingRight: 15,
//         color: Color.BLUE
//     },
})

export default Splash;