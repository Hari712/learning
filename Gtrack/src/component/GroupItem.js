import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions, ScrollView, TextInput } from 'react-native';
import images from '../constants/images'
import { ColorConstant } from '../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from './FontSize'
import MultiSelect from './MultiSelect';
import Dialog from './Dialog';
import isEmpty from 'lodash/isEmpty'

const GroupItem = props => {

    const { item } = props;

    const { groupName, devices, index } = item

    const arrDevices = isEmpty(devices) ? [] : devices

    const [selectedKey, setSelectedKey] = useState(-1);
    const [subContainerHeight, setSubContainerHeight] = useState();
    const [addClick, setAddClick] = useState();
    const [selectedDevices, setSelectedDevices] = useState([]);
    const [deleteDeviceKey, setDeleteDeviceKey] = useState();
    const [dialogVisible, setDialogVisible] = useState(false)
    const [devicesList, setDevicesList] = useState(['Car'])

    const deleteFunction = (item, key) => {
        console.log('Testing Success', item, key)
        setDeleteDeviceKey(key)
        setDialogVisible(true)
    }

    const deleteConfirm = () => {
        setSelectedDevices(selectedDevices.filter((item, key) => key != deleteDeviceKey))
        setDialogVisible(false)
    }

    return (
        <View style={{ width: '100%', alignItems: 'center' }}>
        <View style={[styles.card, { height: (index == selectedKey) ? subContainerHeight : hp(5), borderColor: (index == selectedKey) ? ColorConstant.ORANGE : ColorConstant.WHITE }]} >

            {/* Arrow Left Side */}
            <TouchableOpacity onPress={() => (index == selectedKey) ? setSelectedKey(-1) : setSelectedKey(index)} style={[styles.arrow, { backgroundColor: (index == selectedKey) ? ColorConstant.ORANGE : ColorConstant.BLUE }]}>
                <Image source={(index == selectedKey) ? images.image.upArrow : images.image.downarrow} />
            </TouchableOpacity>

            <View style={{ flex: 1, padding: 10 }} onLayout={({ nativeEvent }) => {
                console.log("Sub container ", nativeEvent.layout)
                setSubContainerHeight(nativeEvent.layout.height)
            }}>
                {/* heading */}
                <View style={{ flexDirection: 'row', width: '100%', paddingHorizontal: 10 }}>
                    <Text style={{ flex: 1, color: (index == selectedKey) ? ColorConstant.ORANGE : ColorConstant.BLACK }}>{groupName}</Text>
                    <Image style={styles.icon} source={images.image.trashBlack} />
                    <TouchableOpacity style={{ alignSelf: 'center' }} key={index}

                        onPress={() => {
                            (key == addClick) ?
                                setAddClick(-1) :
                                setAddClick(index)
                        }}
                    >
                        <Image style={styles.icon} source={images.image.add} />
                    </TouchableOpacity>
                </View>

                {/* Expanded data View */}

                {(index == selectedKey) ?
                    <View style={{ marginTop: hp(2) }} >
                        {arrDevices.map((subitem, subkey) => {
                            return (
                                <View key={subkey} style={styles.subCategory}>
                                    <View style={{ width: 2, backgroundColor: ColorConstant.BLUE, marginRight: hp(1), marginLeft: 4, borderRadius: 10 }} />
                                    <Text style={{ flex: 1, color: ColorConstant.BLUE }}>{subitem.deviceName}</Text>
                                    <Image style={styles.icon} source={images.image.trash} />
                                </View>
                            )
                        })}
                    </View>
                : null}


            </View>

            {/* Popup View */}

            {/* {(index == addClick) ?
                <View style={styles.popup}>
                    <View style={{ flexDirection: 'row', margin: hp(2) }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={{ color: ColorConstant.ORANGE, fontSize: FontSize.FontSize.medium, fontWeight: 'bold' }}>Add Device</Text>
                        </View>
                        <TouchableOpacity onPress={() => setAddClick(-1)} style={{ alignSelf: 'center', height: hp(2) }}>
                            <Image source={images.manage.close} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '85%', alignSelf: 'center' }}>
                        <MultiSelect
                            label='Select Device'
                            //dataList={devicesList} 
                            valueSet={setSelectedDevices}
                            selectedData={selectedDevices}
                            selectedItemContainerStyle={styles.selectedItemContainerStyle}
                            hideDeleteButton={true}
                            hideSelectedDeviceLable={true}
                            deleteHandle={deleteFunction}
                            selectedItemRowStyle={styles.selectedItemRowStyle}
                            outerStyle={{ width: '100%', alignSelf: 'center' }} />
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={{ borderRadius: 6, borderWidth: 1, borderColor: ColorConstant.BLUE, backgroundColor: ColorConstant.WHITE, width: '42.5%', height: hp(6), justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center', color: ColorConstant.BLUE }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ borderRadius: 6, backgroundColor: ColorConstant.BLUE, width: '42.5%', height: hp(6), justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center', color: ColorConstant.WHITE }}>Okay</Text>
                        </TouchableOpacity>
                    </View>

                    <Dialog
                        heading="Are you sure ?"
                        message={"Do you really want to remove device from the group?" + "\n \n" + "This process can be undone."}
                        visible={dialogVisible}
                        onTouchOutside={() => setDialogVisible(false)}
                        negativeHandle={() => setDialogVisible(false)}
                        positiveHandle={deleteConfirm}
                    />

                </View> : null} */}
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    scene: {
        //flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        //alignContent:'center',
        width: '85%',
        //paddingHorizontal:hp(2),
        //marginVertical:hp(1),
        borderRadius: 12,
        borderWidth: 0.5,
        marginTop: hp(5)
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
    card: {
        //flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        //alignContent:'center',
        width: '85%',
        minHeight: hp(6),
        //paddingHorizontal:hp(2),
        //marginVertical:hp(1),
        borderRadius: 12,
        borderWidth: 0.5,
        marginTop: hp(5),
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
    popup: {
        borderRadius: 12,
        marginTop: hp(5),
        //alignItems:'center',
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
    icon: {
        margin: 4,
        alignSelf: 'center'
    },
    subCategory: {
        flexDirection: 'row',
        width: '90%',
        paddingVertical: 5,
        paddingRight: 10,
        alignSelf: 'center',
        margin: 4,
        elevation: 7,
        borderRadius: 8,
        backgroundColor: ColorConstant.WHITE
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '85%',
        //margin:hp(3),
        marginTop: hp(3),
        marginBottom: hp(3),
        alignSelf: 'center'
    },
    selectedItemRowStyle: {
        flexDirection: 'row',
        elevation: 4,
        backgroundColor: ColorConstant.LIGHTPINK,
        borderRadius: 5,
        alignItems: 'center',
        paddingHorizontal: hp(1),
        //flexWrap:'wrap',
        margin: 4,
        height: hp(4),
    },
    selectedItemContainerStyle: {
        backgroundColor: ColorConstant.PINK,
        borderRadius: 8,
        marginTop: hp(2),
        elevation: 0,
        padding: hp(1)
    }
});

export default GroupItem

