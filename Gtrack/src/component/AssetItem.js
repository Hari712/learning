import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions, ScrollView, TextInput } from 'react-native';
import images from '../constants/images'
import { ColorConstant } from '../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'


const AssteItem = (props) => {

    const { item, index } = props

    const { assetName } = item

    const [editClick, setEditClick] = useState()


    function deleteAssetItem(item, key) {

    }


    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={[styles.blueCard, { backgroundColor: (index == editClick) ? ColorConstant.ORANGE : ColorConstant.BLUE }]} />
                <View style={styles.whiteCard}>
                    <Text style={{ flex: 1, color: (index == editClick) ? ColorConstant.BLUE : ColorConstant.BLACK }}>{assetName}</Text>
                    <TouchableOpacity onPress={() => {
                        (index == editClick) ? setEditClick(-1) :
                        setEditClick(index)
                    }} style={{ marginRight: hp(2) }}>
                        <Image source={(index == editClick) ? images.manage.editClick : images.manage.edit} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteAssetItem(item, index)} >
                        <Image source={images.manage.trashBlack} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    card: {
        //paddingHorizontal:hp(2),
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent:'space-between',
        width: '85%',
        height: hp(6),
        borderRadius: 12,
        marginVertical: hp(2),
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
    blueCard: {
        height: hp(6),
        width: wp(6),
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12
    },
    whiteCard: {
        flexDirection: 'row',
        paddingHorizontal: hp(2),
        alignItems: 'center',
        width: '90%'
    },
})

export default AssteItem