import React, { useState, Component, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform, FlatList, Dimensions } from 'react-native';
import { ColorConstant } from '../../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FontSize } from '../../../component';
import { dist, getAdvanceSettingsInfo, getLoginState } from '../../Selector'
import { useDispatch, useSelector } from 'react-redux';
import { CalenderIconWhite, LocationIcon, NoRecordFoundImage } from '../../../component/SvgComponent';
import { MAP_BOX_STYLEURL, rasterSourceProps, SCREEN_CONSTANTS } from '../../../constants/AppConstants';
import NavigationService from '../../../navigation/NavigationService'
import Moment from 'moment'
import { convertDist, convertSpeed, convertTime } from '../../../utils/helper';
import { ClockIcon } from '../../../component/SvgComponent';
const Map = Platform.select({
	ios: () => require('react-native-maps'),
	android: () => require('@react-native-mapbox-gl/maps'),
})();
const RouteDetails = (props) => {

    const { loginData, distUnit, advSettingsData } = useSelector(state => ({
        loginData: getLoginState(state),
        distUnit: dist(state),
        advSettingsData: getAdvanceSettingsInfo(state)
    }))
    const mapRef = useRef();
    var moment = require('moment-timezone');
    const { routeDetails, loadMoreData, renderFooter, setOnEndReachedCalledDuringMomentum, onEndReachedCalledDuringMomentum,isMobileTracker } = props
    const isAndroid = Platform.OS === 'android';
    const dispatch = useDispatch()

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const renderItem = ({ item, index }) => {

        let sDateArray = convertTime(item.tripStartTime, advSettingsData)
        var sdateComponent = sDateArray.format('YYYY-MM-DD');
        var stimeComponent = sDateArray.format('HH:mm');

        let eDateArray = convertTime(item.tripEndTime, advSettingsData)
        var edateComponent = eDateArray.format('YYYY-MM-DD');
        var etimeComponent = eDateArray.format('HH:mm');

        let duration = moment.duration(eDateArray.diff(sDateArray))
        let durationFormat = parseInt(duration.asHours()) + 'h ' + parseInt(duration.asMinutes() % 60) + 'm ' + parseInt(duration.asSeconds() % 60) + 's'
        console.log('routeDetailsrouteDetailsrouteDetailsrouteDetails',props)
        return (
            <TouchableOpacity onPress={() => NavigationService.navigate(SCREEN_CONSTANTS.DISPATCH_ROUTE, { item: item })} style={styles.cardContainer}>

                {/* Blue top head */}
                <View style={styles.blueConatiner}>
                    <View style={{ padding: hp(1.5), alignSelf: 'center' }}>
                        <CalenderIconWhite width={14.947} height={14.947} />
                    </View>

                    <View style={styles.blueTopHead}>
                        <Text style={styles.headerTitle}>{sdateComponent}  to  {edateComponent}</Text>
                    </View>

                    <TouchableOpacity onPress={() => NavigationService.navigate(SCREEN_CONSTANTS.DISPATCH_ROUTE, { item: item })} style={styles.editButton}>
                        <LocationIcon />
                    </TouchableOpacity>
                </View>
                {/* White Body container */}
                <View style={styles.whiteBodyContainer}>
                    <View style={styles.column} >
                        <View style={{ height: (item.tripStartAddress || item.tripEndAddress) ? hp(10) : hp(8) }}>
                            <Text style={styles.whiteBodyText}>Start</Text>
                            <Text numberOfLines={2} style={[styles.whiteBodyText, { color: ColorConstant.BLACK, width: '90%', height: (item.tripStartAddress || item.tripEndAddress) ? hp(5) : hp(3) }]}>{item.tripStartAddress ? item.tripStartAddress : '-'}</Text>
                            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                <ClockIcon width={20} height={20} />
                                <Text style={[styles.whiteBodyText, { color: ColorConstant.BLACK, marginLeft: hp(0.5) }]}>{stimeComponent}</Text>
                            </View>
                        </View>
                        <View style={{ height: hp(2) }} />

                        <Text style={styles.whiteBodyText}>Drive Duration</Text>
                        <Text style={[styles.whiteBodyText, { color: ColorConstant.BLACK }]}>{durationFormat}</Text>
                        <View style={{ height: hp(2) }} />
                    </View>
                    <View style={[styles.column, { width: '40%' }]} >
                        <View style={{ height: (item.tripStartAddress || item.tripEndAddress) ? hp(10) : hp(8) }}>
                            <Text style={styles.whiteBodyText}>End</Text>
                            <Text numberOfLines={2} style={[styles.whiteBodyText, { color: ColorConstant.BLACK, width: '90%', height: (item.tripStartAddress || item.tripEndAddress) ? hp(5) : hp(3) }]}>{item.tripEndAddress ? item.tripEndAddress : '-'}</Text>
                            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                <ClockIcon width={20} height={20} />
                                <Text style={[styles.whiteBodyText, { color: ColorConstant.BLACK, marginLeft: hp(0.5) }]}>{etimeComponent}</Text>
                            </View>
                        </View>
                        <View style={{ height: hp(2) }} />

                        <Text style={styles.whiteBodyText}>Avg Speed</Text>
                        <Text style={[styles.whiteBodyText, { color: ColorConstant.BLACK }]}>{convertSpeed(item.tripAverageSpeed, distUnit)}</Text>
                        <View style={{ height: hp(2) }} />
                    </View>
                    <View style={[styles.column, { width: '25%' }]}>
                        <View style={{ height: (item.tripStartAddress || item.tripEndAddress) ? hp(10) : hp(8) }}>
                            <Text style={styles.whiteBodyText}>Distance</Text>
                            <Text style={[styles.whiteBodyText, { color: ColorConstant.BLACK }]}>{convertDist(item.tripDistance, distUnit)}</Text>
                        </View>
                        <View style={{ height: hp(2) }} />

                        <Text style={styles.whiteBodyText}>Top Speed</Text>
                        <Text style={[styles.whiteBodyText, { color: ColorConstant.BLACK }]}>{convertSpeed(item.tripMaxSpeed, distUnit)}</Text>
                        <View style={{ height: hp(2) }} />
                    </View>
                </View>

            </TouchableOpacity>
        )
    }
   
    const renderLocationItem =({ item, index })=>{
        let sDateArray = convertTime(item.tripTime, advSettingsData)
        var sdateComponent = sDateArray.format('YYYY-MM-DD');
        var stimeComponent = sDateArray.format('HH:mm');
        function renderAppleMap() {

            const { width, height } = Dimensions.get('window');
            const ASPECT_RATIO = width / height;
            const LATITUDE_DELTA = 0.01;
            const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
            let deviceRegion = {
                latitude:item.tripLatitude, 
                longitude: item.tripLongitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            };
            const coordinate =  { latitude: item.tripLatitude, longitude: item.tripLongitude } 
            return (
        
                <Map.default style={[StyleSheet.absoluteFillObject,]}  region={deviceRegion} ref={mapRef} showsUserLocation={false} scrollEnabled={false}>
                <Map.Marker
                        coordinate={coordinate}
                        // zoomEnabled={false}
                        // pitchEnabled={false}
                        // description={item.address}
                    />
                
                </Map.default>
            )
        }
        function renderMapBox() {
            let coordinate = [item.tripLongitude,item.tripLatitude];
            return (
                <View style={{ flex: 1, }}>
                <Map.default.MapView style={{ flex: 1 ,}} attributionEnabled={false} logoEnabled={false} rotateEnabled={false} styleURL={MAP_BOX_STYLEURL}  >
                    {/* <Map.default.UserLocation
                                renderMode="normal"
                                visible={true}
                                showsUserHeadingIndicator={true}
                                animated={true}
                            /> */}
                        {coordinate ?
                            <Map.default.Camera
                                zoomLevel={15}
                                centerCoordinate={coordinate}
                                animated={true}
                                minZoomLevel={4}
                                maxZoomLevel={15}
                            /> :
                            <Map.default.Camera
                                zoomLevel={4}
                                minZoomLevel={4}
                                maxZoomLevel={15}
                                centerCoordinate={[79.570507, 22.385092]}
                            />}
                       		{coordinate &&
						<Map.default.PointAnnotation id={`1`} coordinate={coordinate} key={1} title={``}/>
						}
                        <Map.default.RasterSource {...rasterSourceProps}>
                            <Map.default.RasterLayer
                                id="googleMapLayer"
                                sourceID="googleMapSource"
                                // style={{rasterOpacity: 0.5}}
    
                                layerIndex={0}
                            />
                        </Map.default.RasterSource>
                    </Map.default.MapView>
                </View>
            );
        }
    
        return (
            <TouchableOpacity onPress={() => NavigationService.navigate(SCREEN_CONSTANTS.DISPATCH_LOCATION_ROUTE, { item: item })} style={styles.cardContainer}>
 {/* onPress={() => NavigationService.navigate(SCREEN_CONSTANTS.DISPATCH_LOCATION_ROUTE, { item: item })}  */}
                {/* Blue top head */}
                <View style={styles.blueConatiner}>
                    <View style={{ padding: hp(1.5), alignSelf: 'center' }}>
                        <CalenderIconWhite width={14.947} height={14.947} />
                    </View>

                    <View style={styles.blueTopHead}>
                        <Text style={styles.headerTitle}>{sdateComponent}  {stimeComponent}</Text>
                    </View>

                    <TouchableOpacity onPress={() => NavigationService.navigate(SCREEN_CONSTANTS.DISPATCH_LOCATION_ROUTE, { item: item })} style={styles.editButton}>
                        <LocationIcon />
                    </TouchableOpacity>
                </View>
                {/* <View style={styles.whiteBodyContainerMap}> */}
                {/* <View style={styles.column2} > */}
                        {/* <View style={{ height: hp(16), width: '100%'}}>
                        {isAndroid ? renderMapBox() : renderAppleMap()}
                        </View> */}
                        {/* <View style={{ height: hp(1) }} />

                        <Text style={styles.whiteBodyText}>Address</Text>
                        <Text style={[styles.whiteBodyText, { color: ColorConstant.BLACK }]}>{item.tripAddress}</Text> */}
                      {/* <View style={{ height: hp(2) }} /> */}
                      {/* </View> */}
                    {/* </View> */}
                {/* White Body container */}
                <View style={[styles.whiteBodyContainer,{paddingTop: hp(0.5),paddingBottom:item.tripAddress ? hp(1.5): hp(0.2)}]}>
                <View style={styles.column2} >
                        <View style={{ height: item.tripAddress? hp(6) : hp(5)}}>
                            <Text style={styles.whiteBodyText}>Address</Text>
                            <Text numberOfLines={2} style={[styles.whiteBodyText, {color: ColorConstant.BLACK, width: '90%', height: item.tripAddress ? hp(8) : hp(3) }]}>{item.tripAddress ? item.tripAddress : '-'}</Text>
                        </View>
                        {/* <View style={{ height: hp(16), width: '100%'}}>
                        {isAndroid ? renderMapBox() : renderAppleMap()}
                        </View> */}
                        {/* <View style={{ height: hp(1) }} />

                        <Text style={styles.whiteBodyText}>Address</Text>
                        <Text style={[styles.whiteBodyText, { color: ColorConstant.BLACK }]}>{item.tripAddress}</Text> */}
                        {/* <View style={{ height: hp(2) }} /> */}
                    </View>
                    
                    {/* <View style={styles.column1} >
                    <View style={{ height: hp(15), width: '100%'  }}>

                        {isAndroid ? renderMapBox() : renderAppleMap()}

                        </View>
                        {/* <View style={{ height: (item.tripStartAddress || item.tripEndAddress) ? hp(10) : hp(8) }}>
                            <Text style={styles.whiteBodyText}>Start</Text>
                            <Text numberOfLines={2} style={[styles.whiteBodyText, { color: ColorConstant.BLACK, width: '90%', height: item.tripAddress ? hp(5) : hp(3) }]}>{item.tripAddress ? item.tripAddress : '-'}</Text>
                            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                <ClockIcon width={20} height={20} />
                                <Text style={[styles.whiteBodyText, { color: ColorConstant.BLACK, marginLeft: hp(0.5) }]}>{item.tripAddress}</Text>
                            </View>
                        </View> */}
                        {/* <View style={{ height: hp(1) }} />

                        <Text style={styles.whiteBodyText}>Address</Text>
                        <Text style={[styles.whiteBodyText, { color: ColorConstant.BLACK }]}>{item.tripAddress}</Text>
                        <View style={{ height: hp(3) }} /> */}
                           {/* <View style={{ height: hp(1) }} />
                    </View> */} 
                   
                </View>
               

            </TouchableOpacity>
        )
    }

    return (
        <View>

            <View style={{ paddingHorizontal: hp(3) }} >
                <Text style={{ color: ColorConstant.BLUE, fontFamily: 'Nunito-Regular', fontSize: FontSize.FontSize.small }}>{routeDetails.length > 0 ? "Route Details" : ''}</Text>
            </View>
            {routeDetails.length > 0 ?
                <FlatList
                    style={{ paddingBottom: hp(2) }}
                    nestedScrollEnabled={true}
                    keyboardShouldPersistTaps='handled'
                    data={routeDetails}
                    renderItem={!isMobileTracker ?renderItem :renderLocationItem}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={renderFooter}
                    onEndReached={() => loadMoreData()}
                    onEndReachedThreshold={0.1}
                    onMomentumScrollBegin={() => { setOnEndReachedCalledDuringMomentum(false) }}
                /> :
                <View style={styles.noRecords}>
                    <NoRecordFoundImage />
                    <Text style={styles.noRecordsText}>No Records Found</Text>
                </View>}
        </View>

    )
}


const styles = StyleSheet.create({

    container: {
        backgroundColor: ColorConstant.WHITE,
        marginHorizontal: hp(3),
        // marginTop:hp(2),
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Platform.OS == 'ios' ? ColorConstant.GREY : ColorConstant.WHITE,
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
    },
    summaryCardView: {
        paddingHorizontal: hp(2)
    },
    summaryTextStyle: {
        fontFamily: "Nunito-Regular", color: ColorConstant.GREY, fontSize: hp(1.5)
    },
    cardContainer: {
        //width:"100%",
        marginVertical: hp(1.5),
        // height:hp(18),
        alignSelf: 'center',
        marginHorizontal: hp(3),
        backgroundColor: ColorConstant.WHITE,
        borderRadius: 10,
        borderWidth: Platform.OS == 'ios' ? 0.3 : 0,
        borderColor: ColorConstant.GREY,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
    },
    noRecords: {
        marginVertical: hp(20),
        alignItems: 'center',
        justifyContent: 'center'
    },
    noRecordsText: {
        fontFamily: "Nunito-Regular",
        fontSize: hp(2),
        color: ColorConstant.DARK_GREY,
        marginTop: hp(1),
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
        textAlignVertical: 'center',
        //backgroundColor:'red',
        flex: 1,
        fontFamily: 'Nunito-Bold',
        fontSize: FontSize.FontSize.small
    },
    whiteBodyContainer: {
        flexDirection: 'row',
        paddingTop: hp(1.5),
        paddingHorizontal: hp(2.5),
        //backgroundColor:ColorConstant.WHITE,
        //paddingBottom: hp(1.5)
    },
    whiteBodyContainerMap: {
        flexDirection: 'row',
        // paddingTop: hp(1.5),
        // paddingBottom: hp(2),
        //backgroundColor:ColorConstant.WHITE,
        //paddingBottom: hp(1.5)
    },
    whiteBodyText: {
        color: ColorConstant.GREY,
        fontSize: FontSize.FontSize.small
    },
    column: {
        flexDirection: 'column', width: '35%'
    },
    column1: {
        flexDirection: 'column', width: '65%'
    },
    column2: {
        flexDirection: 'column', width: '100%'
    },
    row:{
        flexDirection:'row', width: '80%'
    }
});


export default RouteDetails;