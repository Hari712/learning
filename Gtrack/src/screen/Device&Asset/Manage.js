import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, Dimensions, ScrollView, TextInput} from 'react-native';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize';
import { SceneMap, TabView, TabBar } from 'react-native-tab-view'
import ExapandableListView from '../../component/ExpandableListView';
import TextField from '../../component/TextField';
import DropDown from '../../component/DropDown';
import { ConfirmDialog } from 'react-native-simple-dialogs';


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
      subCategory: [{id: 22, name: '4G Magnetic GPS Tracker'}],
    },
  ];

   
const Data = ['Trackport International','Trackport International1','Trackport International2']
let asset = ['Chevrolet Captiva','My Dad\'s car','Ford','Tesla','Ford','Tesla']
let assetData = asset

const Manage = ({route, navigation}) => {

    const [downArrow, setDownArrowClick] = useState(false);
    const [group, setGroup]= useState(); 
    const [detailsToggle, setDetailsToggle] = useState(false);
    const [type, setType] = useState();
    const [device, setDevice] = useState();
    const [description, setDescrption] = useState();
    const [selectedDevices, setSelectedDevices] = useState();

    const [toggle,setToggle] = useState(false);

    const [dialogVisible,setDialogVisible] = useState(false)
    const [editClick, setEditClick] = useState();
    const [deleteVariable, setDeleteVariable] = useState();


   
    //const [searchValue, setSearchValue] = useState()
   
    useEffect(()=>{
        group? null : setDetailsToggle(false)
    }, [group])
 
    const Group = () => (
        <View style={{flex:1, marginBottom:hp(3), maxHeight:Dimensions.get('window').height}}>
            <ScrollView contentContainerStyle={[styles.container]}>
                <ExapandableListView data={CONTENT} />
            </ScrollView>
        
        </View>
       
    );
    
    

    const searchBar = () => {
        const [search, setSearch] = useState()

        const searchFilter = (text) => {
            assetData = asset.filter(item=>item.toLowerCase().includes(text.toLowerCase())) 
            setSearch(text)
        }

        return (
            <View style={styles.search}>
                <TextInput 
                    placeholder='Search Here'
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
            <ConfirmDialog
                title="Are you sure ?"
                titleStyle={{color:ColorConstant.ORANGE, textAlign:'center',fontSize:FontSize.FontSize.regular,fontWeight:'bold'}}
                message={"Do you really want to remove device from the group?" + "\n \n" + "This process can be undone."}
                messageStyle={{color:ColorConstant.BLACK, textAlign:'center',fontSize:FontSize.FontSize.small}}
                visible={dialogVisible}
                //overlayStyle={{backgroundColor:'transparent'}}
                buttonsStyle={{alignItems:'center',marginBottom:hp(3)}}
                dialogStyle={{borderRadius:hp(2)}}
                onTouchOutside={() => setDialogVisible(false)}
                negativeButton={{
                    title: "Cancel",
                    onPress: () => setDialogVisible(false),
                    titleStyle:{backgroundColor:ColorConstant.WHITE,borderRadius:4,borderWidth:1,borderColor:ColorConstant.BLUE, color:ColorConstant.BLUE,width:wp(30),marginRight:hp(2)}
                }}
                positiveButton={{
                    title: "Okay",
                    onPress: () => {
                        setDialogVisible(false)
                        asset = asset.filter( (item,key) => key != deleteVariable)
                        assetData = asset;
                    },
                    titleStyle:{backgroundColor:ColorConstant.BLUE,borderRadius:4, color:ColorConstant.WHITE,width:wp(30),marginRight:hp(2)}
                }} >
                
            </ConfirmDialog>
        )
    }

    
    const Asset = () => (
        <View style={{flex:1}}>
        <ScrollView> 
        <View style={styles.container}> 

        {searchBar()}
            
            {assetData.map((item,key)=>
            <View style={styles.container}>
                <View key={key} style={styles.card}>
                    <View style={{backgroundColor:(key==editClick)?ColorConstant.ORANGE:ColorConstant.BLUE,height:hp(6),width:wp(6),borderTopLeftRadius:12,borderBottomLeftRadius:12}} />
                    <View key={key} style={{flexDirection:'row',paddingHorizontal:hp(2),alignItems:'center',width:'90%'}}>
                        <Text style={{flex:1,color:(key==editClick)?ColorConstant.BLUE:ColorConstant.BLACK}}>{item}</Text> 
                        <TouchableOpacity onPress={()=>(key==editClick)?setEditClick(-1):setEditClick(key)} style={{marginRight:hp(2)}}>         
                            <Image source={(key==editClick)?images.manage.editClick:images.manage.edit}/>
                        </TouchableOpacity>  
                        <TouchableOpacity onPress={()=>deleteAssetItem(item,key)} >   
                            <Image source={images.manage.trashBlack}/>
                        </TouchableOpacity> 
                    </View>
                </View> 
                {(key==editClick)?  
                    <View style={{backgroundColor:ColorConstant.PINK,paddingVertical:10,width:'100%',marginTop:hp(2)}}>
                       <TextField label='Name*' outerStyle={{width:'85%',backgroundColor:ColorConstant.WHITE}} /> 
                       <DropDown label='Type*' outerStyle={{width:'85%',alignSelf:'center',backgroundColor:ColorConstant.WHITE}} dropdownStyle={{width:'85%',alignSelf:'center'}} />
                       <TextField multiline={true} label='Description' outerStyle={{width:'85%',backgroundColor:ColorConstant.WHITE}} /> 
                       <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={()=>setEditClick(-1)} style={{borderRadius:6,borderColor:ColorConstant.BLUE,borderWidth:1,backgroundColor:ColorConstant.WHITE,width:'30%',height:hp(6),justifyContent:'center'}}>
                                <Text style={{textAlign:'center',color:ColorConstant.BLUE}}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{borderRadius:6,backgroundColor:ColorConstant.BLUE,width:'30%',height:hp(6),justifyContent:'center'}}>
                                <Text style={{textAlign:'center',color:ColorConstant.WHITE}}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View> :null}
                   
            </View>
            )}

            {deleteConfirmDialog()}

        </View>
        </ScrollView>
        </View>
       
    );
   
    const initialLayout = { width: Dimensions.get('window').width, height: Dimensions.get('window').height };
    
    const [index, setIndex] = useState(0);
  
    //const [value,setValue]= useState()  

    
    const [routes] = React.useState([
        { key: 'group', title: 'Group' },
        { key: 'asset', title: 'Asset' }
    ]);
    
    const renderScene = SceneMap({
        group: Group,
        asset: Asset
    });


    React.useLayoutEffect(() => {
    
        navigation.setOptions({
            headerTitle: () => (
                <Text style={{
                    color:ColorConstant.GREY,
                    fontSize: FontSize.FontSize.medium,
                    fontWeight: '500',
                    //letterSpacing: 0,
                    textAlign:'center' }}>
                    Device & Assest
                </Text>          
            ),
            headerLeft:() => (
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Image style={{marginLeft:hp(2)}} source={images.image.back}/>
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
                    indicatorStyle={{ backgroundColor: ColorConstant.ORANGE, height: hp(7) }}
                    //labelStyle={{ color: ColorConstant.GREY, fontSize: hp(2.2), fontWeight: '600', textTransform: 'capitalize' }}
                    style={{ backgroundColor: ColorConstant.WHITE, height: hp(7), justifyContent: 'flex-end', }}
                    renderLabel={({ route, focused, color }) => (
                        <Text style={{ color: focused ? ColorConstant.WHITE : ColorConstant.BLUE, fontSize:FontSize.FontSize.medium, fontWeight: '900', }}>
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
    container:{
        width:Dimensions.get('window').width,
        alignItems:'center'        
    },
    scene: {
        //flex: 1,
        flexDirection:'row',
        alignItems:'center',
        //alignContent:'center',
        width:'85%',
        //paddingHorizontal:hp(2),
        //marginVertical:hp(0.5),
        borderRadius:12,
        borderWidth:0.5,
        marginTop:hp(5),
        height:hp(6)
      },
      search: {
        paddingHorizontal:hp(2),
        flexDirection:'row',
        alignItems:'center',
        width:'85%',
        height:hp(6),
        borderRadius:12,
        marginTop:hp(4),
        marginBottom:hp(2),
        elevation:4,
        shadowColor: ColorConstant.GREY,
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowRadius: 3,
        shadowOpacity: 1,
        backgroundColor:ColorConstant.WHITE
      },
      card: {
        //paddingHorizontal:hp(2),
        flexDirection:'row',
        alignItems:'center',
        //justifyContent:'space-between',
        width:'85%',
        height:hp(6),
        borderRadius:12,
        marginVertical:hp(2),
        elevation:4,
        shadowColor: ColorConstant.GREY,
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowRadius: 3,
        shadowOpacity: 1,
        backgroundColor:ColorConstant.WHITE
      }	,
      buttonContainer: {
        flexDirection:'row',
        justifyContent:'space-evenly',
        //width:'75%',
        //margin:hp(3),
        marginTop:hp(3),
        alignItems:'center'
    },
});

export default Manage