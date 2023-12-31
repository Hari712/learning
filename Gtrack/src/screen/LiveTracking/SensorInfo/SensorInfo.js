import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, Dimensions, TextInput, LayoutAnimation } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ColorConstant } from '../../../constants/ColorConstants';
import { FontSize } from '../../../component';
import { FlatList } from 'react-native-gesture-handler';
import { translate } from '../../../../App'
import { SCREEN_CONSTANTS } from '../../../constants/AppConstants';
import { BackIcon, DownArrowIcon, NextArrowOrangeIcon, NoRecordFoundImage, UpArrowIcon } from '../../../component/SvgComponent';
import AppManager from '../../../constants/AppManager';
import { getGroupDevicesListInfo, getLoginState } from '../../Selector';
import { useSelector, useDispatch } from 'react-redux';
import * as LivetrackingActions from '../Livetracking.Action'
import isEmpty from 'lodash/isEmpty'
import { useIsFocused } from '@react-navigation/native';


const SensorInfo = ({ navigation }) => {

    const { loginData, isConnected, groupDevices } = useSelector(state => ({
        loginData: getLoginState(state),
        isConnected: state.network.isConnected,
        groupDevices: getGroupDevicesListInfo(state)
    }))

    const [selectedKey, setSelectedKey] = useState(-1)
    const [subContainerHeight, setSubContainerHeight] = useState()
    const [searchKeyword, setSearchKeyword] = useState("")

    const dispatch = useDispatch()

    const isFocused = useIsFocused();

    React.useEffect(() => {
        isFocused ? null : setSearchKeyword("")
    }, [isFocused]);


    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={{
                    color: ColorConstant.GREY,
                    fontSize: FontSize.FontSize.medium,
                    fontWeight: '500',
                    textAlign: 'center'
                }}>
                    {translate("Asset Information")}
                </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity style={{ padding: hp(2) }} onPress={() => navigation.goBack()}>
                    <BackIcon />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    useEffect(() => {
        AppManager.showLoader()
        dispatch(LivetrackingActions.requestGetGroupDevices(loginData.id,null,onSuccess, onError))
    }, [])

    function onSuccess(data) {
        console.log("Sucess", data)
        AppManager.hideLoader()
    }

    function onError(data) {
        console.log("Error", data)
        AppManager.hideLoader()
    }

    function renderDevices(devices) {
        return (
            <View>
                {devices.map((subitem, subkey) => {
                    return (
                        <TouchableOpacity key={subkey} style={styles.subCategory} onPress={() => navigation.navigate(SCREEN_CONSTANTS.DEVICE_INFO, { data: subitem })}>
                            <View style={{ width: 2, backgroundColor: ColorConstant.BLUE, marginRight: hp(1), marginLeft: 4, borderRadius: 10 }} />
                            <Text style={{ flex: 1, color: ColorConstant.BLUE }}>{subitem.name}</Text>
                            <TouchableOpacity onPress={() => navigation.navigate(SCREEN_CONSTANTS.DEVICE_INFO, { data: subitem })} >
                                <NextArrowOrangeIcon style={styles.icon} />
                            </TouchableOpacity>

                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }
    const toggleExpand=(index)=>{
        // (index == selectedKey) ? setSelectedKey(-1) : setSelectedKey(index)]
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if(index == selectedKey){
            setSelectedKey(-1) 
          
        }
        else{
            setSelectedKey(index)
        }
     
        // this.setState({expanded : !this.state.expanded})
      }
    const SensorInfoItem = ({ item, index }) => {
        return (
            <View style={{ paddingVertical: hp(2), paddingHorizontal: hp(3), width: '100%' }}>
                <View style={[styles.card, { height: (index == selectedKey) ? subContainerHeight : hp(5), borderColor: (index == selectedKey) ? ColorConstant.ORANGE : ColorConstant.WHITE }]} >

                    {/* Arrow Left Side */}
                    <TouchableOpacity onPress={() =>toggleExpand(index)} style={[styles.arrow, { backgroundColor: (index == selectedKey) ? ColorConstant.ORANGE : ColorConstant.BLUE }]}>
                        {(index == selectedKey) ? <UpArrowIcon /> : <DownArrowIcon />}
                    </TouchableOpacity>

                    <View style={{ flex: 1, padding: 10 }} onLayout={({ nativeEvent }) => { setSubContainerHeight(nativeEvent.layout.height) }}>
                        {/* heading */}
                        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', paddingHorizontal: 10 }} onPress={() =>toggleExpand(index)}>
                            <Text style={{ flex: 1, color: (index == selectedKey) ? ColorConstant.ORANGE : ColorConstant.BLACK }}>{item.groupName}</Text>
                            {(index !== selectedKey) ?
                                <View style={{ backgroundColor: ColorConstant.LIGHTENBLUE, width: wp(8), alignItems: 'center' }}>
                                    <Text style={{ color: ColorConstant.BLUE, fontFamily: 'Nunito-Bold' }}>{item.devices.length}</Text>
                                </View> : null
                            }
                        </TouchableOpacity>

                        {/* Expanded data View */}

                        {(index == selectedKey) ?
                            <View style={{ marginTop: hp(1) }} >
                                {!isEmpty(item.devices) ? renderDevices(item.devices) : <Text style={styles.noDevicesText}>No Devices</Text>}
                            </View>
                            : null}
                    </View>
                </View>
            </View>
        )
    }

    const searchHandle = (keyword) => {
        setSearchKeyword(keyword)
        dispatch(LivetrackingActions.requestSearchGroup(loginData.id, keyword, onSuccess, onError))
    }

    const searchBar = () => {
        return (
            <View style={styles.search}>
                <TextInput
                    placeholder={translate("Search_here")}
                    style={styles.searchText}
                    onChangeText={text => searchHandle(text)}
                    value={searchKeyword}
                    placeholderTextColor={ColorConstant.GREY}
                />
            </View>
        )
    }

    const renderItemData = () => {
        return (
            <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: 'Nunito-Regular', color: ColorConstant.BLUE, paddingHorizontal: hp(3), marginTop: hp(2) }}>Select device</Text>
                <FlatList
                    style={{}}
                    contentContainerStyle={{}}
                    data={groupDevices}
                    renderItem={SensorInfoItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }

    const noRecords = () => {
        return (
            <View style={styles.noRecords}>
                <NoRecordFoundImage />
                <Text style={styles.noRecordsText}>No Records Found</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {searchBar()}

            {groupDevices.length > 0 ? renderItemData() : noRecords()}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorConstant.WHITE,
    },

    sensorInfoMainView: {
        width: Dimensions.get('screen').width - 30,
        marginTop: hp(2),
        alignSelf: 'center',
        backgroundColor: ColorConstant.WHITE,
        borderRadius: 15,
        borderWidth: 0.3,
        borderColor: ColorConstant.GREY,
        shadowColor: ColorConstant.GREY,
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 0 },
    },

    deviceinfoView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: hp(2),
        paddingHorizontal: wp(2),
        alignItems: 'center'
    },
    footerIconStyle: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor: ColorConstant.BLUE,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderWidth: 0.3,
        borderColor: ColorConstant.BLUE,
        padding: 5
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        //alignContent:'center',
        //width: '85%',
        minHeight: hp(6),
        //paddingHorizontal:hp(2),
        //marginVertical:hp(1),
        borderRadius: 12,
        borderWidth: 0.5,
        // marginTop: hp(5),
        elevation: 3,
        shadowColor: ColorConstant.GREY,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 3,
        shadowOpacity: 1,
        backgroundColor: ColorConstant.WHITE
    },
    subCategory: {
        flexDirection: 'row',
        width: '95%',
        paddingVertical: 5,
        paddingRight: 10,
        alignSelf: 'center',
        margin: 4,
        elevation: 7,
        borderRadius: 8,
        backgroundColor: ColorConstant.WHITE
    },
    icon: {
        margin: 4,
        alignSelf: 'center'
    },
    noDevicesText: {
        fontWeight: '400',
        fontSize: FontSize.FontSize.small,
        color: ColorConstant.BLACK,
        marginLeft: hp(1.5)
    },
    arrow: {
        backgroundColor: ColorConstant.BLUE,
        width: wp(6),
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12
    },
    searchText: {
        //fontSize:FontSize.FontSize.small,
        fontSize: 14,
        color: ColorConstant.BLACK,
        //fontFamily:'Nunito-Italic'
    },
    noRecords: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    noRecordsText: {
        fontFamily: "Nunito-Regular",
        fontSize: hp(2),
        color: ColorConstant.DARK_GREY,
        marginTop: hp(1),
    },
    search: {
        paddingHorizontal: hp(2),
        height: hp(5),
        marginHorizontal: hp(2.5),
        borderRadius: 12,
        marginTop: hp(4),
        // marginBottom:hp(2),
        elevation: 4,
        shadowColor: ColorConstant.BLACK,
        shadowOffset: {
            width: 0,
            height: 0
        },
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.2,
        backgroundColor: ColorConstant.WHITE
    },
})

export default SensorInfo