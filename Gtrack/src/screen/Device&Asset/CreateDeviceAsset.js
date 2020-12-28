import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions, TimePickerAndroid, ScrollView, TextInput } from 'react-native';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FontSize, TextField, DropDown, MultiSelect } from '../../component';
import { SceneMap, TabView, TabBar } from 'react-native-tab-view'
import { useSelector, useDispatch } from 'react-redux'
import * as DeviceActions from '../DeviceSetup/Device.Action'
import { getLoginInfo } from '../Selector'
import isEmpty from 'lodash/isEmpty'
import Group from './CreateGroup'
import CreateAsset from './CreateAsset'
import { BackIcon } from '../../component/SvgComponent'

const CreateDeviceAsset = ({ route, navigation }) => {

    const initialLayout = { width: Dimensions.get('window').width, height: Dimensions.get('window').height };

    const [index, setIndex] = useState(0);


    const [routes] = React.useState([
        { key: 'group', title: 'Group' },
        { key: 'asset', title: 'Asset' }
    ]);

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'group':
                return <Group />;
            case 'asset':
                return <CreateAsset />;
            default:
                return null;
        }
    }


    useLayoutEffect(() => {

        navigation.setOptions({
            headerTitle: () => (
                <Text style={{
                    color: ColorConstant.GREY,
                    fontSize: FontSize.FontSize.medium,
                    fontWeight: '500',
                    //letterSpacing: 0,
                    textAlign: 'center'
                }}>
                    Device & Assest
                </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BackIcon style={{marginLeft:hp(2)}}/>
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    return (
        <View style={{ flex: 1 }}>
            <TabView
                //style={{marginTop:hp(5)}}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={props => {
                    console.log('props--------', props, index)
                    return (
                        <TabBar
                            {...props}
                            indicatorStyle={{ backgroundColor: ColorConstant.ORANGE, height: hp(5) }}
                            //labelStyle={{ color: ColorConstant.GREY, fontSize: hp(2.2), fontWeight: '600', textTransform: 'capitalize' }}
                            style={{ backgroundColor: ColorConstant.WHITE, height: hp(5), justifyContent: 'center', }}
                            renderLabel={({ route, focused, color }) => (
                                <Text style={{ color: focused ? ColorConstant.WHITE : ColorConstant.BLUE, fontSize: FontSize.FontSize.medium, fontWeight: '300', }}>
                                    {route.title}
                                </Text>
                            )}
                        />)
                }}
                initialLayout={initialLayout} />
        </View>
    )

}
const styles = StyleSheet.create({
    contentContainerStyle: {
        height: Dimensions.get('window').height,
        backgroundColor: ColorConstant.WHITE
    },
    container: {
        height: Dimensions.get('window').height,
        alignItems: 'center',
        backgroundColor: ColorConstant.WHITE
    },
    scene: {
        //flex: 1,
        //alignContent:'center',
        width: '85%',
        marginHorizontal: hp(5),
        //marginVertical:hp(1),
        marginTop: hp(5)
    },
    detailsToggle: {
        backgroundColor: ColorConstant.PINK,
        paddingVertical: 10,
        width: '100%',
        paddingHorizontal: '7.5%'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        //width:'75%',
        //margin:hp(3),
        marginTop: hp(3),
        alignItems: 'center'
    },
    buttonStyle: {
        borderRadius: 6,
        borderWidth: 1,
        borderColor: ColorConstant.BLUE,
        backgroundColor: ColorConstant.WHITE,
        width: '42%',
        height: hp(6),
        justifyContent: 'center'
    },
    nextButton: {
        borderRadius: 6,
        backgroundColor: ColorConstant.WHITE,
        width: '42%',
        height: hp(6),
        justifyContent: 'center'
    },
    cancelText: {
        textAlign: 'center',
        color: ColorConstant.BLUE
    },
    saveText: {
        textAlign: 'center',
        color: ColorConstant.WHITE
    },
    inputContainer: {
        height: hp(5),
        borderRadius: hp(5),
    }

});

export default CreateDeviceAsset