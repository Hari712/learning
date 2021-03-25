import React, { useState, useImperativeHandle, forwardRef } from 'react'
import { TouchableOpacity, Animated, StyleSheet, View, Easing, Dimensions } from 'react-native'
import { offlineBarRef } from './OfflineBarManager'
import { getStatusBarHeight } from '../../utils/helper'
import NoInternetConnectivityIcon from '../SvgComponent/NoInternetConnectivityIcon'
import { ColorConstant } from '../../constants/ColorConstants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from "prop-types"
import NavigationService from '../../navigation/NavigationService'


const statusBarHeight = getStatusBarHeight(true)

const OfflineBar = forwardRef((props, ref) => {
    const { backgroundColor, opacity} = props

    const [visibleValue] = useState(new Animated.Value(wp(100)))

    useImperativeHandle(ref, () => ({
        showBanner: (message) => showBanner(message),
        hideBannner: () => hideBannner()
    }))

    const transformStyle = {
        transform: [{
            translateX: visibleValue
        }]
    }

    function showBanner() {
        Animated.timing(visibleValue, {
            toValue: wp(82),
            duration: 200,
            useNativeDriver: true
        }).start(() => {
            visibleValue.setValue(wp(82))
        });
    }

    function hideBannner() {
        Animated.timing(visibleValue, {
            toValue: wp(100),
            duration: 200,
            useNativeDriver: true
        }).start(() => {
            visibleValue.setValue(wp(100))
        });
    }

    function showNoInternetScreen() {
        NavigationService.navigate('Connection')
    }


    return (
        <TouchableOpacity style={[styles.button, transformStyle]} onPress={() => showNoInternetScreen()}>
            <Animated.View style={[styles.container, { backgroundColor: backgroundColor, opacity: opacity }]}>
                <NoInternetConnectivityIcon width={hp(4)} height={hp(4)} preserveAspectRatio="none" />
            </Animated.View>
        </TouchableOpacity>
    )
})

const OfflineStatusBar = (props) => <OfflineBar ref={offlineBarRef} {...props} />

OfflineStatusBar.propTypes = {
    backgroundColor: PropTypes.string,
    opacity: PropTypes.number
}

OfflineStatusBar.defaultProps = {
    backgroundColor: '#ea4757',
    opacity: 0.95
}

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        justifyContent: 'center',
        alignItems: 'center',
     //   right: hp(-7),
        top: statusBarHeight + hp(15)
    },
    container: {
        width: hp(7),
        height: hp(7),
        borderRadius: hp(3.5),
        backgroundColor: ColorConstant.orange,

        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 99,
    },
    subContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flex: 1,
        paddingHorizontal: 15
    }
})

export default OfflineStatusBar