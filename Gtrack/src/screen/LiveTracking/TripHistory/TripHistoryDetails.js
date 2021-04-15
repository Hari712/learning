import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, ScrollView, TextInput, Platform, Button } from 'react-native';
import { ColorConstant } from '../../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import  { DropDown, TextField, FontSize }from '../../../component';
import { getLoginState, getTripHistoryListInfo } from '../../Selector'
import { useDispatch, useSelector } from 'react-redux';
import { translate } from '../../../../App';
import { BackIcon, CalenderIconBlue } from '../../../component/SvgComponent';
import DateTimePickerModal from "react-native-modal-datetime-picker"
import Moment from 'moment'
import RouteDetails from './RouteDetails'
import * as TripHistoryActions from './TripHistory.Action'
import AppManager from '../../../constants/AppManager';

const TripHistoryDetails = ({ navigation, route }) => {

    const { data } = route.params
    
    const { loginData, isConnected, routeDetails } = useSelector(state => ({
        loginData: getLoginState(state),
        isConnected: state.network.isConnected,
        routeDetails: getTripHistoryListInfo(state)
    }))


    console.log("khushi",routeDetails)

    const dispatch = useDispatch()

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [isStartDateVisible, setIsStartDateVisible] = useState(false);
    const [isEndDateVisible, setIsEndDateVisible] = useState(false);
    const [selectedDay, setSelectedDay] = useState()
    const [dropdownPosY, setDropdownPosY] = useState()
    // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={{
                    color: ColorConstant.GREY,
                    fontSize: FontSize.FontSize.medium,
                    fontWeight: '500',
                    textAlign: 'center'
                }}>
                    {translate("Trip History")}
                </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity style={{padding:hp(2)}} onPress={() => navigation.goBack()}>
                    <BackIcon />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    useEffect(() => {
        if(startDate && endDate){
            fetchTripHistory()
        }
    },[startDate, endDate])
    
    useEffect(() => {

        const todayDate = Moment().format('YYYY-MM-DD');
        const yesterdayDate = Moment().subtract(1, "days").format('YYYY-MM-DD')
        const lastWeekDate = Moment().subtract(1, "weeks").startOf('isoWeek').format('YYYY-MM-DD')
        const lastMonthDate = Moment().date(1).subtract(1,'months').format('YYYY-MM-DD')
        const tommorrowDate = Moment(todayDate).add(1, "days").format('YYYY-MM-DD')
        const lastWeek = Moment(lastWeekDate).add(7, "days").format('YYYY-MM-DD')
        const currentMonthDate = Moment().date(1).format('YYYY-MM-DD') 

        if(selectedDay){

            switch (selectedDay) {
                case 'Today':
                    setStartDate(todayDate)
                    setEndDate(tommorrowDate)
                    break;

                case 'Yesterday':
                    setStartDate(yesterdayDate)
                    setEndDate(tommorrowDate)
                    break;

                case 'Last Week':
                    setStartDate(lastWeekDate)
                    setEndDate(lastWeek)
                    break;

                case 'Last Month':
                    setStartDate(lastMonthDate)
                    setEndDate(currentMonthDate)
                    break;

                case 'Custom':
                    setIsStartDateVisible(true)
                    setEndDate('')
                    break;
            
                default:
                    break;
            }
        }
    },[selectedDay])

    const fetchTripHistory = () => {
        AppManager.showLoader()
        if (isConnected) {
            const requestBody =  {
                "pageNumber" : 0,
                "pageSize" : 5,
                "useMaxSearchAsLimit" : false,
                "searchColumnsList" : null,
                "sortHeader" : "id",
                "sortDirection" : "DESC"
            }
            dispatch(TripHistoryActions.getTripHistoryRequest(requestBody, loginData.id, data.id, Moment(startDate).format("YYYY-MM-DDTHH:mm:SS.000"), Moment(endDate).format("YYYY-MM-DDTHH:mm:SS.000"), onSuccess, onError))
        } else {                                                                                             
            AppManager.showNoInternetConnectivityError()
        }
    }

    function onSuccess(data) {    
        console.log("Success",data) 
        AppManager.hideLoader()
    }
    
    function onError(error) {
        AppManager.hideLoader()
        console.log("Error",error)  
    }

    const showDatePicker = (item) => {
        // setDatePickerVisibility(true);
        if(item == "From"){
            setIsStartDateVisible(true)
        }
        if(item == "To"){
            setIsEndDateVisible(true)
        }
    };

    const hideDatePicker = () => {
        // setDatePickerVisibility(false);
        setIsStartDateVisible(false)
        setIsEndDateVisible(false)
    };

    const handleConfirm = (date) => {
        console.log("A date has been picked: ", Moment(date).format("YYYY-MM-DDTHH:MM:SS"));
        const dt = Moment(date).format("YYYY-MM-DD")
        isStartDateVisible && setStartDate(dt)
        isEndDateVisible && setEndDate(dt)
        //isStartDateVisible ? setStartDate(dt) : setEndDate(dt)
        hideDatePicker();
    };

    return (
        <View style={styles.container}>
        
                <View style={styles.addButton}>
                    <Text style={{ fontFamily: 'Nunito-Bold', fontSize: 16, color: ColorConstant.WHITE }}>{data.name}</Text>
                </View>
                
                <View style={{flex:1}}>
                    <ScrollView> 
                        <View style={{padding:hp(3)}}>
                            <Text style={{color:ColorConstant.BLUE,fontFamily:"Nunito-Regular"}}>Data Range</Text>  
                            <View style={{flexDirection:'row',justifyContent:"space-between",marginVertical:hp(2)}}>
                                <View style={styles.dateCardView}>
                                    <Text>{startDate ? startDate : "From"}</Text>
                                    <TouchableOpacity onPress={()=>showDatePicker("From")}>
                                        <CalenderIconBlue/>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.dateCardView} >
                                    <Text>{endDate ? endDate : "To"}</Text>
                                    <TouchableOpacity onPress={()=>showDatePicker("To")}>
                                        <CalenderIconBlue/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            
                            <View onLayout={({nativeEvent}) => setDropdownPosY(nativeEvent.layout.y)} style={{height:hp(7),marginVertical:hp(1)}} />
                        </View>

                        { routeDetails.length > 0 && <RouteDetails routeDetails={routeDetails} /> }

                        {/* <View style={{top:dropdownPosY,position:'absolute',width:"100%",alignSelf:'center',paddingHorizontal:hp(3)}}>
                            <DropDown  label="Select Day" defaultValue={selectedDay} valueSet={setSelectedDay} dataList={daysList} />  
                        </View> */}

                        <DateTimePickerModal
                            isVisible={isStartDateVisible || isEndDateVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                        
                    </ScrollView> 
                    
                        <View style={{top:dropdownPosY,position:'absolute',width:"100%",alignSelf:'center',paddingHorizontal:hp(3)}}>
                            <DropDown  label="Select Day" defaultValue={selectedDay} valueSet={setSelectedDay} dataList={daysList} />  
                        </View>
                </View>
        </View>

    )
}

const daysList = ["Today", "Yesterday", "Last Week", "Last Month", "Custom"]


const styles = StyleSheet.create({

    container: {
        //alignItems: 'center',
        backgroundColor: ColorConstant.WHITE,
        flex: 1
    },
    root: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    subContainer: {
        width: '85%',
        marginTop: hp(2),
        marginBottom: hp(4),
        alignSelf: 'center',
    },
    shadowContainer: Platform.OS=='ios'?
    { 
        width: '100%',
        shadowColor: ColorConstant.GREY,
        shadowOffset: {
        width: 0,
        height: 3
        },
        shadowOpacity: 0.3,
        marginTop: hp(2),
        shadowRadius: 3 
    }: {
        width: '100%',
        marginTop: hp(2),
    }, 

    outerStyle: {
        backgroundColor: ColorConstant.WHITE,
        borderRadius: 4,
        borderBottomWidth: Platform.OS=='android'? 1:0,
        borderColor: ColorConstant.GREY,
        elevation:2,
    },
    dropDown: {
        flexDirection: 'row',
        marginTop: hp(0.5)
    },
    dropdownStyle: {
        position: 'relative',
        top: hp(0.1),
        width: '116%',
        left: wp(5.5),
        marginBottom: hp(3)
    },
    dataRowStyle: {
        borderBottomWidth: 1, borderBottomColor: ColorConstant.GREY
    },
    infoContainer: {
        backgroundColor: ColorConstant.PINK,
        borderRadius: 10,
        //marginVertical:hp(1),
        marginBottom: hp(0.1),
        padding: hp(2)
    },
    infoTitle: {
        //fontSize:hp(1.3),
        fontSize: 10,
        fontFamily: 'Nunito-Regular',
        textAlign: 'center',
        color: ColorConstant.GREY
    },
    infoSubContainer: {
        flexDirection: 'row',
        padding: 6
    },
    infoButton: {
        paddingHorizontal: hp(2),
        paddingVertical: hp(4)
    },
    role: {
        //fontSize:FontSize.FontSize.small,
        fontSize: 12,
        fontFamily: 'Nunito-Regular',
        color: ColorConstant.BLACK,
        flex: 0.7,
        flexWrap: 'wrap'
    },
    roleSubText: {
        //fontSize:hp(1.3),
        color: ColorConstant.GREY,
        flex: 1,
        fontSize: 10,
        fontFamily: 'Nunito-Regular',
    },
    saveText: {
        textAlign: 'center',
        color: ColorConstant.WHITE,
        fontWeight: 'bold'
    },
    saveButtonConatiner: {
        marginTop: hp(4),
        height: hp(6),
        width: '85%',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 5
    },
    addButton: {
        backgroundColor: ColorConstant.ORANGE,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: hp(5),
    },
    dateCardView: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"space-between",
        elevation:6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        backgroundColor:ColorConstant.WHITE,
        paddingHorizontal:hp(2),
        width:"45%",
        borderRadius:10,
        height:hp(6),
        borderWidth:1,
        borderColor:ColorConstant.GREY
    }
});


export default TripHistoryDetails;