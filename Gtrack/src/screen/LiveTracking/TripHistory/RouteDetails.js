import React, { useState, Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, ScrollView, TextInput, Platform, Button, FlatList } from 'react-native';
import { ColorConstant } from '../../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import  { FontSize }from '../../../component';
import { getLoginState } from '../../Selector'
import { useDispatch, useSelector } from 'react-redux';
import {  CalenderIconWhite, EditIcon, ListIcon, LocationIcon } from '../../../component/SvgComponent';
import { SCREEN_CONSTANTS } from '../../../constants/AppConstants';
import NavigationService from '../../../navigation/NavigationService'
import Moment from 'moment'
import { round } from 'lodash';

const RouteDetails = (props) => {

    const { loginData } = useSelector(state => ({
        loginData: getLoginState(state)
    }))

    const { routeDetails } = props

    console.log("routeDetails",routeDetails)

    const dispatch = useDispatch()

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const renderItem = ({ item,index }) => {

        console.log("item",item)
        
        let sDateArray = Moment(item.tripStartTime)
        var sdateComponent = sDateArray.utc().format('YYYY-MM-DD');
        var stimeComponent = sDateArray.utc().format('HH:mm:ss');
        
        let eDateArray = Moment(item.tripEndTime)
        var edateComponent = eDateArray.utc().format('YYYY-MM-DD');
        var etimeComponent = eDateArray.utc().format('HH:mm:ss');

        let dformat = Moment(eDateArray-sDateArray).utc().format('H:m:s').split(':')
        let durationFormat = (dformat[0] > 0 ? dformat[0]+"h ":"") + (dformat[1] > 0 ? dformat[1]+"m ":'') + (dformat[2] > 0 ? dformat[2]+"s ":'')
        console.log("Duration",durationFormat)

        return (
            <TouchableOpacity onPress={()=> NavigationService.navigate(SCREEN_CONSTANTS.DISPATCH_ROUTE,{coords:[]})} style={styles.cardContainer}>
    
                {/* Blue top head */}
                <View style={styles.blueConatiner}>
                    <View style={{padding:hp(1.5),alignSelf:'center'}}>
                        <CalenderIconWhite width={14.947} height={14.947}/>
                    </View>
                    
                    <View style={styles.blueTopHead}>
                        <Text style={styles.headerTitle}>{sdateComponent}  to  {edateComponent}</Text>
                    </View>
    
                    <TouchableOpacity style={styles.editButton}>
                        <LocationIcon/>
                    </TouchableOpacity>
                </View>
    
                {/* White Body container */}
                <View style={styles.whiteBodyContainer}>
                    <View style={styles.column} >
                        <Text style={styles.whiteBodyText}>Start</Text>
                        <Text style={[styles.whiteBodyText, { color: ColorConstant.BLACK }]}>{stimeComponent}</Text>
                        <View style={{height:hp(2)}} />

                        <Text style={styles.whiteBodyText}>Drive Duration</Text>
                        <Text style={[styles.whiteBodyText, { color: ColorConstant.BLACK }]}>{durationFormat}</Text>
                        <View style={{height:hp(2)}} />
                    </View>
                    <View style={[styles.column, { width: '40%' }]} >
                        <Text style={styles.whiteBodyText}>End</Text>
                        <Text style={[styles.whiteBodyText, { color: ColorConstant.BLACK }]}>{etimeComponent}</Text>
                        <View style={{height:hp(2)}} />
                        
                        <Text style={styles.whiteBodyText}>Avg Speed</Text>
                        <Text style={[styles.whiteBodyText, { color: ColorConstant.BLACK }]}>{item.tripAverageSpeed} mph</Text>
                        <View style={{height:hp(2)}} />
                    </View>
                    <View style={[styles.column, { width: '25%' }]}>
                        <Text style={styles.whiteBodyText}>Distance</Text>
                        <Text style={[styles.whiteBodyText, { color: ColorConstant.BLACK }]}>{round(item.tripDistance,2)} mi</Text>
                        <View style={{height:hp(2)}} />
                        
                        <Text style={styles.whiteBodyText}>Top Speed</Text>
                        <Text style={[styles.whiteBodyText, { color: ColorConstant.BLACK }]}>{item.tripMaxSpeed} mph</Text>
                        <View style={{height:hp(2)}} />
                    </View>          
                </View>
    
            </TouchableOpacity>
        )
    }


    return (
        <View>

            <View style={{paddingHorizontal:hp(3)}} >
                <Text style={{color:ColorConstant.BLUE, fontFamily:'Nunito-Regular', fontSize:FontSize.FontSize.small}}>Route Details</Text>
            </View>

            <FlatList
                nestedScrollEnabled={true}
                keyboardShouldPersistTaps='handled'                
                data={routeDetails}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>

    )
}

const daysList = ["Today", "Yesterday", "Last Week", "Last Month", "Custom"]

const routeDetails = [
    {
        startDate: "2020-09-21",
        endDate: "2020-09-22",
        sTime: "06:53:02",
        eTime: "08:53:02",
        distance: "16.47 mi",
        driveDuration: "2h 8m",
        avgSpeed: "48 mph",
        topSpeed: "66 mph"
    },
    {
        startDate: "2020-09-25",
        endDate: "2020-09-26",
        sTime: "09:53:02",
        eTime: "10:53:02",
        distance: "16.47 mi",
        driveDuration: "3h 8m",
        avgSpeed: "46 mph",
        topSpeed: "56 mph"
    },
    {
        startDate: "2020-09-21",
        endDate: "2020-09-22",
        sTime: "06:53:02",
        eTime: "08:53:02",
        distance: "16.47 mi",
        driveDuration: "2h 8m",
        avgSpeed: "48 mph",
        topSpeed: "66 mph"
    },
    {
        startDate: "2020-09-25",
        endDate: "2020-09-26",
        sTime: "09:53:02",
        eTime: "10:53:02",
        distance: "16.47 mi",
        driveDuration: "3h 8m",
        avgSpeed: "46 mph",
        topSpeed: "56 mph"
    }

]
      



const styles = StyleSheet.create({

    container: {
        backgroundColor: ColorConstant.WHITE,
        marginHorizontal:hp(3),
        // marginTop:hp(2),
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
    },
    cardContainer: {
        //width:"100%",
        marginVertical: hp(1.5),
        // height:hp(18),
        alignSelf: 'center',
        marginHorizontal:hp(3),
        backgroundColor: ColorConstant.WHITE,
        borderRadius: 10,
        borderWidth: Platform.OS == 'ios'? 0.3 : 0,
        borderColor:ColorConstant.GREY,
        elevation:3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
    },
    blueConatiner: {
        backgroundColor: ColorConstant.BLUE,
        flexDirection: 'row',
        width: "100%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: hp(1.5)
    },
    blueTopHead: {
        alignContent: 'space-between',
        marginVertical: Platform.OS == 'ios' ? hp(1.3) : hp(0.5),
    },
    editButton: {
        flexDirection: 'row',
        zIndex: 10,
        padding: hp(1.5),
        marginLeft: 'auto'
    },
    headerTitle: {
        color: ColorConstant.WHITE,
        textAlignVertical:'center',
        //backgroundColor:'red',
        flex:1,
        fontFamily:'Nunito-Bold',
        fontSize: FontSize.FontSize.small
    },
    whiteBodyContainer: {
        flexDirection: 'row',
        paddingTop: hp(1.5),
        paddingHorizontal: hp(2.5),
        //backgroundColor:ColorConstant.WHITE,
        //paddingBottom: hp(1.5)
    },
    whiteBodyText: {
        color: ColorConstant.GREY,
        fontSize: FontSize.FontSize.small
    },
    column: {
        flexDirection: 'column', width: '35%'
    }
});


export default RouteDetails;