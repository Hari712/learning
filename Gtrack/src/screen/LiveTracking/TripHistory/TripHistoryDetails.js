import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    TextInput,
    Platform,
    Button,
    ActivityIndicator,
} from 'react-native';
import { ColorConstant } from '../../../constants/ColorConstants';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { DropDown, TextField, FontSize } from '../../../component';
import { getLoginState, getTripHistoryListInfo } from '../../Selector';
import { useDispatch, useSelector } from 'react-redux';
import { translate } from '../../../../App';
import { BackIcon, CalenderIconBlue, NoRecordFoundImage } from '../../../component/SvgComponent';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import RouteDetails from './RouteDetails';
import * as TripHistoryActions from './TripHistory.Action';
import AppManager from '../../../constants/AppManager';
import isEmpty from 'lodash/isEmpty'

const TripHistoryDetails = ({ navigation, route }) => {

    const { data } = route.params

    const { loginData, isConnected, routeDetails } = useSelector(state => ({
        loginData: getLoginState(state),
        isConnected: state.network.isConnected,
        routeDetails: getTripHistoryListInfo(state)
    }))

    const dispatch = useDispatch()

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [isStartDateVisible, setIsStartDateVisible] = useState(false);
    const [isEndDateVisible, setIsEndDateVisible] = useState(false);
    const [selectedDay, setSelectedDay] = useState("Today")
    const [dropdownPosY, setDropdownPosY] = useState()
    const [routeData, setRouteData] = useState([])
    const [pageIndex, setPageIndex] = useState(0)
    const [pageCount, setPageCount] = useState(5)
    const [totalCount, setTotalCount] = useState(0)
    const [isLoadMoreData, setIsLoadMoreData] = useState(false)
    const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(false)
    const [isFirstSearch, setIsFirstSearch] = useState(false);

    useEffect(() => {
        if (isFirstSearch)
            setRouteData(routeDetails)
        else
            setRouteData([...routeData, ...routeDetails])

    }, [routeDetails])

    useEffect(() => {
        setRouteData([])
    }, [])

    useEffect(() => {
        if (startDate && endDate) {
            fetchFirstTripHistory()
        }
    }, [startDate, endDate])

    useEffect(() => {
        if (isLoadMoreData) {
            fetchTripHistory()
        }
    }, [pageIndex, isLoadMoreData])


    useEffect(() => {

        let todayDate = Moment().format('YYYY-MM-DD');
        let yesterdayDate = Moment().subtract(1, "days").format('YYYY-MM-DD')
        let lastWeekDate = Moment().subtract(1, "weeks").startOf('isoWeek').format('YYYY-MM-DD')
        let lastWeek = Moment(lastWeekDate).endOf('isoWeek').format('YYYY-MM-DD')
        let lastMonthDate = Moment().date(1).subtract(1, 'months').format('YYYY-MM-DD')
        let lastMonthLastDate = Moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD')
        let currentMonthDate = Moment().date(1).format('YYYY-MM-DD')
        setOnEndReachedCalledDuringMomentum(false)
        if (selectedDay) {

            switch (selectedDay) {
                case 'Today':
                    setStartDate(todayDate)
                    setEndDate(todayDate)
                    break;

                case 'Yesterday':
                    setStartDate(yesterdayDate)
                    setEndDate(yesterdayDate)
                    break;

                case 'Last Week':
                    setStartDate(lastWeekDate)
                    setEndDate(lastWeek)
                    break;

                case 'Last Month':
                    setStartDate(lastMonthDate)
                    setEndDate(lastMonthLastDate)
                    break;

                case 'Custom':
                    setIsStartDateVisible(true)
                    setEndDate('')
                    break;

                default:
                    break;
            }
        }
    }, [selectedDay])

    const fetchTripHistory = () => {
        if (pageIndex === 0)
            AppManager.showLoader()
        if (isConnected) {
            const start = Moment(startDate).format("YYYY-MM-DDTHH:mm:SS.000");
            const end = Moment(endDate).format("YYYY-MM-DDT23:59:59.000")
            const requestBody = {
                "pageNumber": pageIndex,
                "pageSize": pageCount,
                "useMaxSearchAsLimit": false,
                "searchColumnsList": null,
                "sortHeader": "id",
                "sortDirection": "DESC"
            }
            setIsFirstSearch(false)
            dispatch(TripHistoryActions.getTripHistoryRequest(requestBody, loginData.id, data.id, start, end, onSuccess, onError))
        } else {
            AppManager.showNoInternetConnectivityError()
        }
    }

    const fetchFirstTripHistory = () => {
        AppManager.showLoader()
        setTotalCount(0)
        setPageIndex(0)
        if (isConnected) {
            const start = Moment(startDate).format("YYYY-MM-DDTHH:mm:SS.000");
            const end = Moment(endDate).format("YYYY-MM-DDT23:59:59.000")
            const requestBody = {
                "pageNumber": 0,
                "pageSize": pageCount,
                "useMaxSearchAsLimit": false,
                "searchColumnsList": null,
                "sortHeader": "id",
                "sortDirection": "DESC"
            }
            setIsFirstSearch(true)
            dispatch(TripHistoryActions.getTripHistoryRequest(requestBody, loginData.id, data.id, start, end, onSuccess, onError))
        } else {
            AppManager.showNoInternetConnectivityError()
        }
    }

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
                <TouchableOpacity style={{ padding: hp(2) }} onPress={() => navigation.goBack()}>
                    <BackIcon />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    function onSuccess(data) {
        console.log("Success", data)

        const arrList = data.result.data ? data.result.data : []
        const totalCountLocal = data.result.totalCount ? data.result.totalCount : 0
        if (isEmpty(arrList)) {
            let pagenumber = pageIndex - 1 < 0 ? 0 : pageIndex - 1
            setPageIndex(pagenumber)
        }
        setTotalCount(totalCountLocal)
        // setIsRefreshing(false)
        setIsLoadMoreData(false)
        AppManager.hideLoader()
    }

    function onError(error) {
        AppManager.hideLoader()
        console.log("Error", error)

        setIsLoadMoreData(false)
        let pagenumber = pageIndex - 1 < 0 ? 0 : pageIndex - 1
        setPageIndex(pagenumber)
        AppManager.showSimpleMessage('danger', { message: error, description: '', floating: true })
    }

    const showDatePicker = (item) => {
        // setDatePickerVisibility(true);
        if (item == "From") {
            setIsStartDateVisible(true)
        }
        if (item == "To") {
            setIsEndDateVisible(true)
        }
    };

    const hideDatePicker = () => {
        // setDatePickerVisibility(false);
        setIsStartDateVisible(false)
        setIsEndDateVisible(false)
    };

    const handleConfirm = (date) => {
        const dt = Moment(date).format("YYYY-MM-DD")
        // isStartDateVisible &&
        // isEndDateVisible && setEndDate(dt)
        if (isStartDateVisible) {
            setStartDate(dt)
            setIsStartDateVisible(false)
            setIsEndDateVisible(true)
        } else if (isEndDateVisible) {
            setEndDate(dt)
            hideDatePicker();
        }
        //isStartDateVisible ? setStartDate(dt) : setEndDate(dt)
        // hideDatePicker();
    };

    const renderFooter = () => {
        //it will show indicator at the bottom of the list when data is loading otherwise it returns null
        if (isLoadMoreData)
            return <View><ActivityIndicator size="large" color="#000000" /></View>;
        else
            return null;
    }

    const loadMoreData = () => {
        console.log('isLoadMoreData', isLoadMoreData, onEndReachedCalledDuringMomentum, routeData, totalCount)
        if (!onEndReachedCalledDuringMomentum && !isLoadMoreData) {
            if (routeData.length < totalCount) {
                // setIsRefreshing(false)
                setIsLoadMoreData(true)
                // setToMerge(true)
                setPageIndex(pageIndex + 1)
            }
            else {
                setIsLoadMoreData(false)
                setOnEndReachedCalledDuringMomentum(true)
            }
        }
    }

    function renderNoRecordsFoundLabel() {
        return (
            <View style={styles.noRecords}>
                <NoRecordFoundImage />
                <Text style={styles.noRecordsText}>No Records Found</Text>
            </View>
        );
    }
    console.log('setSelectedDay', selectedDay)
    return (
        <View style={styles.container}>

            <View style={styles.addButton}>
                <Text style={{ fontFamily: 'Nunito-Bold', fontSize: 16, color: ColorConstant.WHITE }}>{data.name}</Text>
            </View>

            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ padding: hp(3) }}>
                        <Text style={{ color: ColorConstant.BLUE, fontFamily: "Nunito-Regular", marginBottom: hp(2) }}>Data Range</Text>
                        <View
                            onLayout={({ nativeEvent }) => setDropdownPosY(nativeEvent.layout.y)}
                            style={{ height: hp(7), marginVertical: hp(1) }}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: "space-between", marginVertical: hp(2) }}>
                            <TouchableOpacity style={[styles.dateCardView, (selectedDay != 'Custom') && { backgroundColor: ColorConstant.LIGHTGREY }]} onPress={() => (selectedDay === 'Custom') && showDatePicker("From")}>
                                <Text>
                                    {startDate ? startDate : "From"}
                                </Text>

                                <CalenderIconBlue />

                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.dateCardView, (selectedDay != 'Custom') && { backgroundColor: ColorConstant.LIGHTGREY }]} onPress={() => (selectedDay === 'Custom') && showDatePicker("To")}>
                                <Text>{endDate ? endDate : "To"}</Text>
                                <CalenderIconBlue />

                            </TouchableOpacity>
                        </View>


                    </View>

                    {routeData.length > 0 ?
                        <RouteDetails
                            routeDetails={routeData}
                            loadMoreData={loadMoreData}
                            setOnEndReachedCalledDuringMomentum={setOnEndReachedCalledDuringMomentum}
                            onEndReachedCalledDuringMomentum={onEndReachedCalledDuringMomentum}
                            renderFooter={renderFooter}
                        />
                        : renderNoRecordsFoundLabel()}

                    <View
                        style={{
                            top: dropdownPosY,
                            position: 'absolute',
                            width: "100%",
                            alignSelf: 'center',
                            paddingHorizontal: hp(3)
                        }}
                    >
                        <DropDown
                            label="Select Day"
                            defaultValue={selectedDay}
                            valueSet={setSelectedDay}
                            dataList={daysList}
                        />
                    </View>

                    <DateTimePickerModal
                        isVisible={isStartDateVisible || isEndDateVisible}
                        mode="date"
                        headerTextIOS={isStartDateVisible ? "Pick From date" : "Pick To date"}
                        minimumDate={isEndDateVisible ? new Date(startDate) : null}
                        maximumDate={new Date()}
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />

                </ScrollView>

                {/* <View style={{top:dropdownPosY,position:'absolute',width:"100%",alignSelf:'center',paddingHorizontal:hp(3)}}> 
                            <DropDown  label="Select Day" defaultValue={selectedDay} valueSet={setSelectedDay} dataList={daysList} />  
                        </View> */}
            </View>
        </View>
    );
};

const daysList = ['Today', 'Yesterday', 'Last Week', 'Last Month', 'Custom'];

const styles = StyleSheet.create({
    container: {
        //alignItems: 'center',
        backgroundColor: ColorConstant.WHITE,
        flex: 1,
    },
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subContainer: {
        width: '85%',
        marginTop: hp(2),
        marginBottom: hp(4),
        alignSelf: 'center',
    },
    shadowContainer:
        Platform.OS == 'ios'
            ? {
                width: '100%',
                shadowColor: ColorConstant.GREY,
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.3,
                marginTop: hp(2),
                shadowRadius: 3,
            }
            : {
                width: '100%',
                marginTop: hp(2),
            },

    outerStyle: {
        backgroundColor: ColorConstant.WHITE,
        borderRadius: 4,
        borderBottomWidth: Platform.OS == 'android' ? 1 : 0,
        borderColor: ColorConstant.GREY,
        elevation: 2,
    },
    dropDown: {
        flexDirection: 'row',
        marginTop: hp(0.5),
    },
    dropdownStyle: {
        position: 'relative',
        top: hp(0.1),
        width: '116%',
        left: wp(5.5),
        marginBottom: hp(3),
    },
    dataRowStyle: {
        borderBottomWidth: 1,
        borderBottomColor: ColorConstant.GREY,
    },
    infoContainer: {
        backgroundColor: ColorConstant.PINK,
        borderRadius: 10,
        //marginVertical:hp(1),
        marginBottom: hp(0.1),
        padding: hp(2),
    },
    infoTitle: {
        //fontSize:hp(1.3),
        fontSize: 10,
        fontFamily: 'Nunito-Regular',
        textAlign: 'center',
        color: ColorConstant.GREY,
    },
    infoSubContainer: {
        flexDirection: 'row',
        padding: 6,
    },
    infoButton: {
        paddingHorizontal: hp(2),
        paddingVertical: hp(4),
    },
    role: {
        //fontSize:FontSize.FontSize.small,
        fontSize: 12,
        fontFamily: 'Nunito-Regular',
        color: ColorConstant.BLACK,
        flex: 0.7,
        flexWrap: 'wrap',
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
        fontWeight: 'bold',
    },
    saveButtonConatiner: {
        marginTop: hp(4),
        height: hp(6),
        width: '85%',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 5,
    },
    addButton: {
        backgroundColor: ColorConstant.ORANGE,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: hp(5),
    },
    dateCardView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        backgroundColor: ColorConstant.WHITE,
        paddingHorizontal: hp(2),
        width: '45%',
        borderRadius: 10,
        height: hp(6),
        borderWidth: 1,
        borderColor: ColorConstant.GREY,
    },
    noRecords: {
        height: hp(40),
        justifyContent: 'center',
        alignItems: 'center',
    },
    noRecordsText: {
        fontFamily: "Nunito-Regular",
        fontSize: hp(2),
        color: ColorConstant.DARK_GREY,
        marginTop: hp(1),
    }
});

export default TripHistoryDetails;
