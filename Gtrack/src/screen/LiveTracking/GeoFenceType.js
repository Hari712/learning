import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, TextInput, Dimensions } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants';
import { FontSize, MapView} from '../../component'
import Slider from "react-native-slider";
import { translate } from '../../../App'
import { SCREEN_CONSTANTS } from '../../constants/AppConstants';
import { BackIcon } from '../../component/SvgComponent';

const GeoFenceType = ({ navigation, route }) => {
    const { type } = route.params;
    console.log("type.", type)
    const [value, setValue] = useState(0.3);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={styles.headerTitle}>
                    {translate("Geo Fence")}
                </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity style={{padding:hp(2)}} onPress={() => navigation.goBack()}>
                    <BackIcon />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate(SCREEN_CONSTANTS.GEOFENCE_DETAILS)}>
                    <Text style={styles.headerRightStyle}>{translate("Next")}</Text>
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    return (
        <View style={styles.container}>

            <MapView type={type} radius={value*200} />

            <View style={styles.subContainer}>
                <View style={styles.search}>
                    <TextInput
                        placeholder={translate("Search_here")}
                    // onChangeText={text => searchFilter(text)}
                    // value={search}
                    />
                </View>
                {type == 'Circle' ?
                    <View style={styles.sliderMainView}>
                        <View style={styles.sliderSubView}>
                            <Text style={styles.radiusTextSize}>{translate("Geofence_CreateNew_string3")}</Text>

                            <View style={styles.radiusMainView}>
                                <Text style={styles.textStyleInfo}>400m</Text>
                                <Text style={styles.otherTextStyle}>2</Text>
                            </View>
                        </View>

                        <View style={styles.sliderContainer}>
                            <Slider
                                value={value}
                                onValueChange={(value) => { setValue(value)}}
                                minimumValue={0.3}
                                maximumValue={1}
                                minimumTrackTintColor={ColorConstant.BLUE}
                                maximumTrackTintColor={ColorConstant.BLUE}
                                thumbTintColor={ColorConstant.ORANGE}
                                trackStyle={{height: '16%', borderRadius: 3 }}
                            />
                            <Text>
                                {/* Value: {value} */}
                            </Text>
                        </View>
                        {/* 
                        <Slider
                            style={{ width: 350, height: 40, justifyContent: 'center', alignSelf: 'center' }}
                            minimumValue={0}
                            maximumValue={1}
                            minimumTrackTintColor={ColorConstant.BLUE}
                            maximumTrackTintColor={ColorConstant.BLUE}
                            thumbTintColor={ColorConstant.ORANGE}
                        /> */}
                    </View>
                    :
                    null}


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerTitle: {
        color: ColorConstant.GREY,
        fontSize: FontSize.FontSize.medium,
        fontWeight: '500',
        textAlign: 'center'
    },
    headerLeftStyle: {
        marginLeft: wp(4)
    },
    headerRightStyle: {
        color: ColorConstant.BLUE, 
        marginRight: wp(4)
    },
    container: {
        flex: 1,
    },
    subContainer: {
        width: Dimensions.get('window').width,
        alignItems: 'center',
        position: 'absolute'
    },
    search: {
        paddingHorizontal: hp(2),
        flexDirection: 'row',
        alignItems: 'center',
        width: '85%',
        height: hp(5.5),
        borderRadius: 12,
        marginTop: hp(4),
        marginBottom: hp(2),
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
    sliderMainView: {
        width: wp(90),
        height: '40%',
        backgroundColor: ColorConstant.WHITE,
        borderRadius: 15,
        top: hp(60),
        // alignItems: 'center'
    },
    sliderSubView: {
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    radiusTextSize: {
        color: '#B5B5B5', 
        fontSize: hp(1.4), 
        paddingTop: hp(1), 
        marginLeft: wp(3)
    },
    radiusMainView: {
        flexDirection: 'row', 
        paddingTop: hp(1), 
        marginRight: wp(3)
    },
    textStyleInfo: {
        fontSize: hp(1.4),
        lineHeight: 20, 
        color: ColorConstant.ORANGE
    },
    otherTextStyle: {
        fontSize: hp(1.4), 
        lineHeight: 15, 
        color: ColorConstant.ORANGE
    },
    sliderContainer: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        alignItems: "stretch",
        justifyContent: "center"
    }
})

export default GeoFenceType;