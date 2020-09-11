import React, { useState, Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { EditText } from '../../../../src/component'
import { ColorConstant } from '../../../constants/ColorConstants';
import images from '../../../constants/images';
import FontSize from '../../../component/FontSize';

const Feedback = ({ navigation }) => {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={{
                    color: ColorConstant.GREY,
                    fontSize: FontSize.FontSize.medium,
                    fontWeight: '500',
                    textAlign: 'center'
                }}>
                    Settings
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
        <View style={styles.container}>
            <View style={styles.mainView}>
                <Text style={styles.textViewStyle}>Feedback</Text>
            </View>

            <EditText
                placeholder="Type here"
                style={styles.descStyle}
                multiline={true}
                numberOfLines={4}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.cancelButton]}>
                    <Text style={styles.buttonTextColor}>Reset</Text>
                </TouchableOpacity>

                <Text style={styles.textStyle}>Maximum 250 characters</Text>
            </View>

            <TouchableOpacity style={styles.submitButtonStyle}>
                <Text style={styles.submitTextStyle}>Submit</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorConstant.WHITE,
    },
    mainView: {
        width: '95%', 
        alignSelf: 'center', 
        alignItems: 'center', 
        justifyContent: 'space-evenly', 
        backgroundColor: ColorConstant.ORANGE, 
        height: hp(5)
    },
    textViewStyle: {
        color: ColorConstant.WHITE, 
        fontWeight: 'bold', 
        fontSize: FontSize.FontSize.medium
    },
    descStyle: {
        minHeight: hp(40),
        textAlignVertical: 'top',
        borderColor: ColorConstant.GREY,
        borderWidth: 1,
        width: '85%',
        alignSelf: 'center',
        marginTop: hp(4),
        fontSize: FontSize.FontSize.small
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '85%',
    },
    cancelButton: {
        borderRadius: 6,
        width: '30%',
        height: hp(5),
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: ColorConstant.ORANGE,
        marginLeft: wp(8)
    },
    buttonTextColor: {
        textAlign: 'center',
        color: ColorConstant.ORANGE,
        fontSize: hp(2.2)
    },

    textStyle: {
        color: ColorConstant.GREY,
        fontSize: FontSize.FontSize.small,
        fontStyle: 'italic',
        marginLeft: wp(15)
    },
    submitButtonStyle: {
        borderRadius: 6, 
        marginTop: hp(5), 
        width: '85%', 
        alignSelf: 'center', 
        alignItems: 'center', 
        justifyContent: 'space-evenly', 
        backgroundColor: ColorConstant.BLUE, 
        height: hp(5)
    },
    submitTextStyle: {
        color: ColorConstant.WHITE, 
        fontWeight: 'bold', 
        fontSize: FontSize.FontSize.medium
    }
})

export default Feedback;
