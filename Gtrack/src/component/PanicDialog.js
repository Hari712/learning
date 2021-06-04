import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions, ScrollView, TextInput } from 'react-native';
import { ColorConstant } from '../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from './FontSize';
import { Dialog } from 'react-native-simple-dialogs';
import TimerWithoutNumIcon from './SvgComponent/TimerWithoutNumIcon';


const PanicDialog = (props) => {

    const { heading, message, stopHandle, afterTimeoutHandle, timeoutValue, ...otherProps } = props;

    const [timer, setTimer] = useState(10)
    
    useEffect(() => {
        setTimer(timeoutValue)
        let interval = setInterval(() => {
            setTimer(timer => {
                if (timer <= 1) {
                    clearInterval(interval)
                    afterTimeoutHandle()
                    stopHandle()
                } else {
                    return timer - 1
                }
            })
        }, 2000) //each count lasts for a second
        //cleanup the interval on complete
        return () => clearInterval(interval)
    }, [timeoutValue]);
    

    return (
        <Dialog
            title={"PANIC ALERT"}
            titleStyle={styles.titleStyle}
            animationType='slide'
            dialogStyle={{ borderRadius: hp(2), backgroundColor: ColorConstant.WHITE, overflow:'hidden' }}
            {...otherProps}
        >
            <View>
                <View style={styles.timerContainer}>
                    <TimerWithoutNumIcon />
                    <Text style={styles.messageStyle}>{timer}</Text>
                </View>

                <View style={{ flexDirection: 'row', height: hp(5), alignItems: 'center', justifyContent:'center' }}>
                    <TouchableOpacity style={{ width: wp(30), margin: hp(2), backgroundColor: ColorConstant.BLUE, borderRadius: 4, color: ColorConstant.WHITE }} onPress={stopHandle} >
                        <Text style={{ color: ColorConstant.WHITE, textAlign: 'center', fontFamily: 'Nunito-Bold', paddingVertical: hp(1), height: hp(5), textTransform: 'uppercase', fontSize: FontSize.FontSize.medium }}>
                            Stop
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </Dialog>
    )
}

const styles = StyleSheet.create({

    titleStyle: {
        color: ColorConstant.ORANGE,
        textAlign: 'center',
        fontSize: FontSize.FontSize.tow,
        fontWeight: 'bold',
        backgroundColor:ColorConstant.LIGHTENBLUE,
        margin:0,
        textAlignVertical:'center',
        borderTopLeftRadius:14,
        borderTopRightRadius:14,
        height:hp(5)
    },
    timerContainer: { 
        marginBottom: hp(6), 
        marginTop: hp(5),
        justifyContent:'center', 
        alignItems:'center' 
    },
    messageStyle: {
        color: ColorConstant.ORANGE,
        textAlign: 'center',
        fontFamily:'Nunito-Bold',
        fontSize: FontSize.FontSize.large,
        position:'absolute'
    },
    buttonsStyle: {
        alignItems: 'center',
        marginBottom: hp(3)
    },
})
export default PanicDialog