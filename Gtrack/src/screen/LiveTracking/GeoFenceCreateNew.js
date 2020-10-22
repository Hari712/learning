import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, Dimensions, ScrollView, LayoutAnimation } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants';
import FontSize from '../../component/FontSize';
import MultiSelectDropdown from '../../component/MultiSelectDropdown';
import DropDown from '../../component/DropDown';

const GeoFenceCreateNew = ({ navigation }) => {

    const [cancel, setCancel] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState([]);
    const [role, setRole] = useState();
    const DATA =['Circle','Polygon']

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={styles.headerTitle}>
                    Geo Fence
                </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={styles.headerLeftStyle} source={images.image.back} />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.mainView}>
                <Text style={styles.textViewStyle}>Create New</Text>
            </View>
            <View style={styles.multiselectMainView}>
                <MultiSelectDropdown
                    label='Group Access'
                    //  dataList={Data} 
                    allText='Select All'
                    hideSelectedDeviceLable={true}
                    hideDeleteButton={true}
                    rowStyle={styles.rowStyle}
                    dropdownStyle={{ height: hp(20) }}
                    outerStyle={[styles.outerStyle, { marginTop: hp(4) }]}
                    valueSet={setSelectedGroup}
                    selectedData={selectedGroup}
                    selectedItemContainerStyle={styles.selectedItemContainerStyle}
                    selectedItemRowStyle={styles.selectedItemRowStyle}
                    deleteHandle={(item, key) => setSelectedGroup(selectedGroup.filter((item1, key1) => key1 != key))}
                />
            </View>

            <View style={styles.dropDown}>
                <View style={styles.dropDownSubView}>
                    <DropDown
                        label='GeoFence Type*'
                        defaultValue={role}
                        valueSet={setRole}
                        dataList={DATA}
                        outerStyle={[styles.outerViewStyle]}
                        dropdownStyle={styles.dropdownStyle}
                        dataRowStyle={styles.dataRowStyle}
                        dataTextStyle={{ color: ColorConstant.BLUE, marginTop: hp(1), marginBottom: hp(1) }}
                        labelFontSize={hp(1.4)}
                        labelTextStyle={{ top: hp(0.5) }}
                    />
                </View>
            </View>
            {/* {DATA.map((item,index) => */}
                <View style={styles.buttonMainContainer}>
                    <TouchableOpacity onPress={() => { cancel ? setCancel(false) : setCancel(true), navigation.goBack() }} style={[styles.cancelButton]}>
                        <Text style={styles.buttonTextColor}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('GeoFenceType', { type: role }) }}  style={styles.nextButton}>
                        <Text style={styles.nextButtonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            {/* )} */}

        </ScrollView>
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
        marginLeft: hp(2)
    },
    container: {
        flex: 1,
        backgroundColor: ColorConstant.WHITE,
    },
    mainView: {
        width: '95%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: ColorConstant.ORANGE,
        height: hp(5)
    },
    textViewStyle: {
        fontSize: FontSize.FontSize.small,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    multiselectMainView: {
        width: '85%', 
        alignSelf: 'center'
    },
    rowStyle: {
        borderBottomColor: ColorConstant.LIGHTGREY,
        borderBottomWidth: 1,
    },
    outerStyle: {
        elevation: 4,
        backgroundColor: ColorConstant.WHITE,
        borderRadius: 7,
        shadowColor: ColorConstant.GREY,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 1,
        shadowOpacity: 1,
    },
    selectedItemContainerStyle: {
        backgroundColor: ColorConstant.PINK,
        borderRadius: 8,
        marginTop: hp(2),
        elevation: 0,
        padding: hp(1)
    },
    selectedItemRowStyle: {
        flexDirection: 'row',
        elevation: 4,
        shadowColor: ColorConstant.GREY,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 3,
        shadowOpacity: 1,
        backgroundColor: ColorConstant.LIGHTPINK,
        borderRadius: 5,
        alignItems: 'center',
        paddingHorizontal: hp(1),
        //flexWrap:'wrap',
        margin: 4,
        height: hp(4),
    },
    dropDown:{
        marginTop:hp(2),
        width: '85%', 
        alignSelf: 'center'
    },
    dropDownSubView: {
        flex: 1
    },
    outerViewStyle:{
        elevation:4,
        backgroundColor:ColorConstant.WHITE,
        borderRadius:7,
        shadowColor: ColorConstant.GREY,
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowRadius: 1,
        shadowOpacity: 1,
      },
      dropdownStyle: {
        position:'relative', 
        top:hp(0.1), 
        width:'100%',
        borderRadius: 13
      },
      dataRowStyle: {
        borderBottomWidth:1,
        borderBottomColor:ColorConstant.LIGHTGREY, 
      },
    buttonMainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp(75),
        marginTop: hp(6),
        alignSelf: 'center',
        paddingBottom: hp(6)
    },
    cancelButton: {
        borderRadius: 6,
        width: '40%',
        height: hp(5),
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: ColorConstant.BLUE,
    },
    buttonTextColor: {
        textAlign: 'center',
        color: ColorConstant.BLUE
    },
    nextButton: {
        borderRadius: 6,
        width: '40%',
        height: hp(5),
        justifyContent: 'center',
        backgroundColor: ColorConstant.BLUE,
    },
    nextButtonText: {
        textAlign: 'center',
        color: ColorConstant.WHITE,
        fontWeight: 'bold'
    }
})

export default GeoFenceCreateNew;