import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import DropDown from '../../component/DropDown'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import images from '../../constants/images'
import { ColorConstant } from '../../constants/ColorConstants'
import FontSize from '../../component/FontSize'
import ShadowView from 'react-native-simple-shadow-view'

const AssignGroup = () => {

    const [group, setGroup] = useState('')

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', paddingTop: hp(1), paddingHorizontal: hp(3), }}>
                <Image style={{ width: hp(16), height: hp(16) }} source={images.image.deviceSetup.step3} resizeMode="contain" />
                <Text style={styles.title}>Assign Group</Text>
            </View>
            <View style={{ paddingHorizontal: hp(3), paddingTop: hp(2) }}>
                <DropDown
                    defaultValue={group}
                    label='Select Group'
                    valueSet={setGroup}
                    dataList={['abc', 'cde', 'def', 'rock']}
                    contentInset={{ label: hp(-0.2) }}
                    inputContainerStyle={styles.inputContainer}
                    accessoryStyle={{ top: hp(0.7) }}
                    outerStyle={{ marginBottom: hp(0) }}
                />
            </View>
            <View style={styles.buttonMainContainer}>
                <ShadowView style={[styles.shadowContainer, { width: '40%' }]}>
                    <TouchableOpacity style={[styles.cancelButton]}>
                        <Text style={styles.buttonTextColor}>Not Now</Text>
                    </TouchableOpacity>
                </ShadowView>
                <ShadowView style={[styles.shadowContainer, { width: '40%' }]}>
                    <TouchableOpacity style={styles.nextButton}>
                        <Text style={styles.nextButtonText}>Next</Text>
                    </TouchableOpacity>
                </ShadowView>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorConstant.WHITE
    },
    title: {
        marginTop: hp(1),
        color: ColorConstant.BLUE,
        fontSize: FontSize.FontSize.small,
        fontWeight: '600'
    },
    textNameStyle: {
        color: ColorConstant.BLACK,
        fontSize: FontSize.FontSize.small,
        fontWeight: '500'
    },
    shadowContainer: {
        width: '100%',
        shadowColor: ColorConstant.GREY,
        marginTop: hp(1),
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 3,
        shadowOpacity: 0.3
    },
    inputContainer: {
        height: hp(5),
        borderRadius: hp(5),
    },
    buttonMainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp(75),
        marginTop: hp(3),
        alignSelf: 'center'
    },
    cancelButton: {
        borderRadius: hp(1),
        height: hp(5),
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: ColorConstant.BLUE,
    },
    buttonTextColor: {
        textAlign: 'center',
        color: ColorConstant.BLUE
    },
    nextButton: {
        borderRadius: hp(1),
        height: hp(5),
        justifyContent: 'center',
        backgroundColor: ColorConstant.BLUE,
    },
    nextButtonText: {
        textAlign: 'center',
        color: ColorConstant.WHITE,
        fontWeight: 'bold'
    }
})

export default AssignGroup