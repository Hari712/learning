import React, { useState, Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, ScrollView, TextInput, Platform, Button } from 'react-native';
import { ColorConstant } from '../../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import  { DropDown, TextField, FontSize }from '../../../component';
import { getLoginState, getSubuserState } from '../../Selector'
import { useDispatch, useSelector } from 'react-redux';
import { translate } from '../../../../App';
import { BackIcon, CalenderIcon, CalenderIconBlue, ListIcon } from '../../../component/SvgComponent';
import DateTimePickerModal from "react-native-modal-datetime-picker"
import Moment from 'moment'

const SummaryDetails = ({ navigation }) => {

    const { loginData, subUserData } = useSelector(state => ({
        loginData: getLoginState(state),
        subUserData: getSubuserState(state)
    }))

    const dispatch = useDispatch()

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    return (
        <View>
        <View style={styles.container}>
            <View style={styles.summaryCardView}>
                <View style={{flexDirection:'row',alignItems:"center",paddingVertical:hp(1),justifyContent:"space-between",borderBottomWidth:0.3,borderBottomColor:ColorConstant.GREY}}>
                    <Text style={{fontFamily:"Nunito-Regular",color:ColorConstant.BLUE,fontSize:FontSize.FontSize.small}}>Summary</Text>
                    <ListIcon />
                </View>
                <View style={{flexDirection:'row',marginVertical:hp(2)}}>
                    <View style={{flex:1.5}}>
                        <Text style={styles.summaryTextStyle}>Total Distance</Text>
                        <Text style={[styles.summaryTextStyle,{color:ColorConstant.BLACK}]}>922.87 mi</Text>
                    </View>
                    <View style={{flex:1.5}}>
                        <Text style={styles.summaryTextStyle}>Drive Duration</Text>
                        <Text style={[styles.summaryTextStyle,{color:ColorConstant.BLACK}]}>7h 26m 21s</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',marginBottom:hp(2)}}>
                    <View style={{flex:1.5}}>
                        <Text style={styles.summaryTextStyle}>Top Speed</Text>
                        <Text style={[styles.summaryTextStyle,{color:ColorConstant.BLACK}]}>80 mph</Text>
                    </View>
                    <View style={{flex:1.5}}>
                        <Text style={styles.summaryTextStyle}>Avg Speed</Text>
                        <Text style={[styles.summaryTextStyle,{color:ColorConstant.BLACK}]}>56 mph</Text>
                    </View>
                </View>
            </View> 
        </View>
        </View>

    )
}

const daysList = ["Today", "Yesterday", "Last Week", "Last Month", "Custom"]


const styles = StyleSheet.create({

    container: {
        backgroundColor: ColorConstant.WHITE,
        marginTop:hp(2),
        borderWidth:1,
        borderRadius:10,
        borderColor:Platform.OS == 'ios'? ColorConstant.GREY : ColorConstant.WHITE,
        elevation:6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
    },
    summaryCardView: {
        paddingHorizontal:hp(2)
    },
    summaryTextStyle: {
        fontFamily:"Nunito-Regular",color:ColorConstant.GREY,fontSize:hp(1.5)
    }
});


export default SummaryDetails;