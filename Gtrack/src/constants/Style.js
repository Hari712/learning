import React from 'react'
import { StyleSheet } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FontSize } from '../component'
import { ColorConstant } from '../constants/ColorConstants'

const GlobalStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonText: {
        fontSize: 19,
        textAlign: 'center',
        color: 'white',
        paddingHorizontal: 16,
        fontWeight: '500'
    },
    textKey: {
        fontSize: FontSize.FontSize.tow,
        fontWeight: '500'
    },

    cardHeader: {
        backgroundColor: ColorConstant.orange,
        position: 'absolute',
        width: '100%',
        height: hp(23),
        borderBottomRightRadius: hp(3),
        borderBottomLeftRadius: hp(3)
    },

    ackContainer: {
        width: '100%',
        backgroundColor: 'transparent',
        height: '22%',
        alignItems: 'center'
    },
    ackButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: '10%',
        marginTop: '4%'
    },
    ackButton: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        height: hp(5),
        width: '40%',
        padding: 5,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: 'white',
        elevation: 5,
    },
    ackTextHighlight: {
        color: ColorConstant.orange
    },

    headerBarContainer: {
        height: hp(9),
        backgroundColor: ColorConstant.orange,
        borderBottomRightRadius: hp(3),
        borderBottomLeftRadius: hp(3)
    },

    searchBarContent: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        width: wp(85),
        height: hp(5),
        borderRadius: hp(1.5),
        marginBottom: hp(1.25)
    },
    searchInput: {
        flex: 1,
        paddingLeft: hp(2),
        fontFamily: 'Nunito-Regular',
        color: ColorConstant.gray,
        fontSize: FontSize.FontSize.tow,
        height: hp(6),
        textAlignVertical: 'center'
    },
    searchImage: {
        height: hp(2.3),
        width: hp(2.3),
        marginRight: hp(2),
        marginLeft: hp(1)
    }

})

export default GlobalStyles