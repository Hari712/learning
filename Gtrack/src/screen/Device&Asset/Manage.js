import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, Dimensions, TimePickerAndroid, ScrollView, TextInput} from 'react-native';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize';
import { SceneMap, TabView, TabBar } from 'react-native-tab-view'
import ExapandableListView from '../../component/ExpandableListView';


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
const asset = ['Chevrolet Captiva','My Dad\'s car','Ford','Tesla']

const Manage = ({route, navigation}) => {

    const [downArrow, setDownArrowClick] = useState(false);
    const [group, setGroup]= useState(); 
    const [detailsToggle, setDetailsToggle] = useState(false);
    const [type, setType] = useState();
    const [device, setDevice] = useState();
    const [description, setDescrption] = useState();
    const [selectedDevices, setSelectedDevices] = useState();

    const [toggle,setToggle] = useState(false);

    const [editClick, setEditClick] = useState();
    //const [searchValue, setSearchValue] = useState()
   
    useEffect(()=>{
        group? null : setDetailsToggle(false)
    }, [group])
 
    const Group = () => (
        <View style={styles.container}>

            <ExapandableListView data={CONTENT} />
            
        
        </View>
       
    );
    
    const Asset = () => (
        <View style={styles.container}> 

            <View style={styles.search}>
                <TextInput 
                    placeholder='Search Here'
                    //onChangeText={this.updateSearch}
                    //value={search}
                />
            </View>
            {asset.map((item,key)=>
                <View key={key} style={styles.card}>
                    <View style={{backgroundColor:(key==editClick)?ColorConstant.ORANGE:ColorConstant.BLUE,height:hp(6),width:wp(6),borderTopLeftRadius:12,borderBottomLeftRadius:12}} />
                    <View style={{flexDirection:'row',paddingHorizontal:hp(2),alignItems:'center',width:'90%'}}>
                        <Text style={{flex:1,color:(key==editClick)?ColorConstant.BLUE:ColorConstant.BLACK}}>{item}</Text> 
                        <TouchableOpacity onPress={()=>(key==editClick)?setEditClick(-1):setEditClick(key)} style={{marginRight:hp(2)}}>         
                            <Image source={(key==editClick)?images.manage.editClick:images.manage.edit}/>
                        </TouchableOpacity>  
                        <TouchableOpacity>   
                            <Image source={images.manage.trashBlack}/>
                        </TouchableOpacity> 
                    </View>    
                </View>

            )}           

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
        //marginVertical:hp(1),
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
        marginTop:hp(5),
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
        marginTop:hp(5),
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