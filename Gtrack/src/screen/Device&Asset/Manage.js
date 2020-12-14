import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions, ScrollView, TextInput } from 'react-native';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { SceneMap, TabView, TabBar } from 'react-native-tab-view'
import { Dialog, ExapandableListView, TextField, DropDown, FontSize } from '../../component';
import GroupList from './GroupList'
import AssetList from './AssetList'
import { translate } from '../../../App';


const CONTENT = [
    {
        id: 1, // required, id of item
        categoryName: 'Home', // label of item expandable item
        subCategory: [
            // required, array containing inner objects
            {
                id: 3, // required, of inner object
                name: 'TrackPort International 1', // required, label of inner object
            },
            {
                id: 4,
                name: 'TrackPort International 2',
            },
            {
                id: 6,
                name: 'TrackPort International 3',
            },
        ],
    },
    {
        id: 2,
        categoryName: 'Fedex Ground',
        subCategory: [{ id: 22, name: '4G Magnetic GPS Tracker' }],
    },
];

const Data = ['Trackport International', 'Trackport International1', 'Trackport International2']
let asset = ['Chevrolet Captiva', 'My Dad\'s car', 'Ford', 'Tesla', 'Ford', 'Tesla']
let assetData = asset

const Manage = ({ route, navigation }) => {

    const [group, setGroup] = useState();
    const [detailsToggle, setDetailsToggle] = useState(false);
    const [selectedDevices, setSelectedDevices] = useState();
    const [dialogVisible, setDialogVisible] = useState(false)
    const [editClick, setEditClick] = useState();
    const [deleteVariable, setDeleteVariable] = useState();
    const [type, setType] = useState();
    const [value, setValue] = useState();
    const [tempName, setTempName] = useState();
    const [description, setDescrption] = useState();


    useEffect(() => {
        group ? null : setDetailsToggle(false)
    }, [group])


    const updateData = () => {
        console.log("hello")
        // Location = editClick
        // Array = assetData, asset
        assetData[editClick] = tempName;
        asset = assetData;
        setEditClick(-1)
        setTempName()
    }

    const popUp = (item, key) => {
        return (
            <View style={styles.popUp}>
                        
                <TextField valueSet={setTempName} value={tempName} label={translate("Name_Star")} outerStyle={styles.outerStyle} /> 
                
                <DropDown label={translate("Type_star")} defaultValue={type} valueSet={setType}  outerStyle={[styles.outerStyle,{alignSelf:'center'}]} dropdownStyle={styles.dropdownStyle} />
                
                <TextField multiline={true} valueSet={setDescrption} defaultValue={description} label={translate("Description")} outerStyle={styles.outerStyle} /> 
                
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={()=>setEditClick(-1)} style={styles.cancelButton}>
                        <Text style={{textAlign:'center',color:ColorConstant.BLUE}}>{translate("Cancel")}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={updateData} style={styles.saveButton}>
                        <Text style={{textAlign:'center',color:ColorConstant.WHITE}}>{translate("Save")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    const searchBar = () => {
        const [search, setSearch] = useState()

        const searchFilter = (text) => {
            assetData = asset.filter(item => item.toLowerCase().includes(text.toLowerCase()))
            setSearch(text)
        }

        return (
            <View style={styles.search}>
                <TextInput 
                    placeholder={translate("Search_here")}
                    onChangeText={text => searchFilter(text) }                    
                    value={search}

                />
            </View>
        )
    }

    const deleteAssetItem = (item, key) => {
        setDialogVisible(!dialogVisible)
        setDeleteVariable(key)
        console.log(deleteVariable)
    }


    const deleteConfirmDialog = () => {
        return(
            <Dialog 
                heading={translate("Dailog_string")}
                message={"Do you really want to delete asset?" + "\n \n" + "It will get detach from the current device."}
                visible={dialogVisible}
                onTouchOutside={() => setDialogVisible(false)}
                negativeHandle={() => setDialogVisible(false)}
                positiveHandle={() => {
                    setDialogVisible(false)
                    asset = asset.filter((item, key) => key != deleteVariable)
                    assetData = asset;
                }
                }
            />
        )
    }


    const Asset = () => (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <View style={styles.container}>

                    {searchBar()}

                    {assetData.map((item, key) =>
                        <View key={key} style={styles.container}>
                            <View style={styles.card}>
                                <View style={[styles.blueCard, { backgroundColor: (key == editClick) ? ColorConstant.ORANGE : ColorConstant.BLUE }]} />
                                <View key={key} style={styles.whiteCard}>
                                    <Text style={{ flex: 1, color: (key == editClick) ? ColorConstant.BLUE : ColorConstant.BLACK }}>{item}</Text>
                                    <TouchableOpacity onPress={() => {
                                        (key == editClick) ? setEditClick(-1) :
                                            setEditClick(key)
                                        setTempName(item)
                                    }} style={{ marginRight: hp(2) }}>
                                        <Image source={(key == editClick) ? images.manage.editClick : images.manage.edit} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => deleteAssetItem(item, key)} >
                                        <Image source={images.manage.trashBlack} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {(key == editClick) ?
                                popUp(item, key)
                                : null}
                        </View>
                    )}

                    {deleteConfirmDialog()}

                </View>
            </ScrollView>
        </View>

    );

    const initialLayout = { width: Dimensions.get('window').width, height: Dimensions.get('window').height };

    const [index, setIndex] = useState(0);

    const [routes] = React.useState([
        { key: 'group', title: 'Group' },
        { key: 'asset', title: 'Asset' }
    ]);

    const renderScene = SceneMap({
        group: GroupList,
        asset: AssetList
    });


    React.useLayoutEffect(() => {

        navigation.setOptions({
            headerTitle: () => (
                <Text style={{
                    color: ColorConstant.GREY,
                    fontSize: FontSize.FontSize.medium,
                    fontWeight: '500',
                    //letterSpacing: 0,
                    textAlign:'center' }}>
                    {translate("Device_Asset")}
                </Text>          
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={{ marginLeft: hp(2) }} source={images.image.back} />
                </TouchableOpacity>
            )
        });
      }, [navigation]);

return(
<View style={{flex:1}}>
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
                        <Text style={{ color: focused ? ColorConstant.WHITE : ColorConstant.BLUE, fontSize:FontSize.FontSize.medium, fontWeight: '300', }}>
                            {translate(route.title)}
                        </Text>
                    )}
                />)
        }}
        initialLayout={initialLayout} />
</View>
    )

}
const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        alignItems: 'center'
    },
    groupConatiner: {
        flex: 1,
        marginBottom: hp(3),
        maxHeight: Dimensions.get('window').height
    },
    popUp: {
        backgroundColor: ColorConstant.PINK,
        paddingVertical: 10,
        width: '100%',
        marginTop: hp(2)
    },
    outerStyle: {
        width: '85%',
        backgroundColor: ColorConstant.WHITE
    },
    dropdownStyle: {
        width: '85%',
        alignSelf: 'center'
    },
    titleStyle: {
        color: ColorConstant.ORANGE,
        textAlign: 'center',
        fontSize: FontSize.FontSize.regular,
        fontWeight: 'bold'
    },
    messageStyle: {
        color: ColorConstant.BLACK,
        textAlign: 'center',
        fontSize: FontSize.FontSize.small
    },
    buttonsStyle: {
        alignItems: 'center',
        marginBottom: hp(3)
    },
    search: {
        paddingHorizontal: hp(2),
        flexDirection: 'row',
        alignItems: 'center',
        width: '85%',
        height: hp(6),
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
    card: {
        //paddingHorizontal:hp(2),
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent:'space-between',
        width: '85%',
        height: hp(6),
        borderRadius: 12,
        marginVertical: hp(2),
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
    blueCard: {
        height: hp(6),
        width: wp(6),
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12
    },
    whiteCard: {
        flexDirection: 'row',
        paddingHorizontal: hp(2),
        alignItems: 'center',
        width: '90%'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        //width:'75%',
        //margin:hp(3),
        marginTop: hp(3),
        alignItems: 'center'
    },
    cancelButton: {
        borderRadius: 6,
        borderColor: ColorConstant.BLUE,
        borderWidth: 1,
        backgroundColor: ColorConstant.WHITE,
        width: '30%',
        height: hp(6),
        justifyContent: 'center'
    },
    saveButton: {
        borderRadius: 6,
        backgroundColor: ColorConstant.BLUE,
        width: '30%',
        height: hp(6),
        justifyContent: 'center'
    },
});

export default Manage