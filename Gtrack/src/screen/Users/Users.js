import React, { useState ,Component} from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, Dimensions, ScrollView, TextInput} from 'react-native';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize';
import NavigationService from '../../navigation/NavigationService';
import Tooltip from 'rn-tooltip';

const Users = ({navigation}) => {

  const [menuClick,setMenuClick] = useState(false)
  const [carClick, setCarClick] = useState(false)

  React.useLayoutEffect(() => {

    navigation.setOptions({
      headerLeft:()=>(null)     
    });
  });

  const searchBar = () => {
    const [search, setSearch] = useState()

    const searchFilter = (text) => {
        assetData = asset.filter(item=>item.toLowerCase().includes(text.toLowerCase())) 
        setSearch(text)
    }

    return (
      <View style={{width:'100%'}}>
        <View style={{width:Dimensions.get('window').width-40,flexDirection:'row'}}>
        <View style={styles.search}>
            <TextInput 
                placeholder='Search Here'
                onChangeText={text => searchFilter(text) }                    
                value={search}                
            />
            <TouchableOpacity>
              <Image source={images.user.filter} />
            </TouchableOpacity>

        </View>
        
        <TouchableOpacity style={styles.addButton}>
              <Image source={images.user.add} />
            </TouchableOpacity>
           
      </View>
      </View>
    )
}


return ( 
<View>
<ScrollView contentContainerStyle={{height:"100%",alignItems:'center'}}>

  {searchBar()} 

  {DATA.map((item,key) =>
    <View style={styles.cardContainer} key={key}>
      {/* Blue top head */}
      <View style={{backgroundColor:ColorConstant.BLUE,flexDirection:'row',width:"100%",borderTopLeftRadius:12,borderTopRightRadius:12,paddingHorizontal:hp(3)}}>
        <View style={{ alignContent:'space-between',marginVertical:hp(0.5),}}>
          <Text style={{color:ColorConstant.WHITE,fontSize:FontSize.FontSize.small}}>{item.title}</Text>
        </View>
        <View style={{marginTop:hp(1),left:10}}>

        </View>

        <View style={{flexDirection:'row', position:'absolute', right:20,height:hp(5),width:wp(10),justifyContent:'space-between', alignItems:'center'}}>
         <TouchableOpacity>
          <Image source={images.image.edit}/>
        </TouchableOpacity>

        </View>
      </View>

      {/* White Body container */}
      <View style={{flexDirection:'row',marginTop:hp(1.5),paddingHorizontal:hp(2.5),paddingBottom:hp(1.5)}}>
        <View style={{flexDirection:'column',width:'33%'}} >
          <Text style={{color:ColorConstant.GREY,fontSize:FontSize.FontSize.small}}>Group</Text>
          <Text style={{color:ColorConstant.BLACK,fontSize:FontSize.FontSize.small}}>{item.group}</Text>              
        </View>
        <View style={{flexDirection:'column',width:'39%'}} >
          <Text style={{color:ColorConstant.GREY,fontSize:FontSize.FontSize.small}}>Selected Plan</Text>
          <Text style={{color:ColorConstant.BLACK,fontSize:FontSize.FontSize.small}}>{item.plan} {item.duration?<Text style={{color:ColorConstant.GREY}}>({item.duration})</Text>:null}</Text>             
        </View>
        <View style={{flexDirection:'column',width:'27%'}}>
          <Text style={{color:ColorConstant.GREY,fontSize:FontSize.FontSize.small}}>Plan Expiry</Text>
          <Text style={{color:ColorConstant.BLACK,fontSize:FontSize.FontSize.small}}>{item.date}</Text>
        </View>
      </View>
    </View>
    
  )}


      {/* <View >
        {Menu.map((item,key) =>
            <TouchableOpacity key={key} style={{borderBottomColor:ColorConstant.GREY, borderBottomWidth:key!=Menu.length-1 ?1:0}} onPress={()=> console.log("Khushi",item) }>
              <Text style={styles.textStyle}>{item}</Text>
            </TouchableOpacity>
          )
        }
      </View> */}

     </ScrollView>

     {menuClick?
        <View style={styles.menuPopup}>
          {Menu.map((item,key) =>
              <TouchableOpacity key={key}  style={{borderBottomColor:ColorConstant.GREY, borderBottomWidth:key!=Menu.length-1 ?1:0}} onPress={()=>menuHandle(item) }>
                <Text style={styles.textStyle}>{item}</Text>
              </TouchableOpacity>
            )
          }
        </View>:
      null} 

     </View>
    
  )
}

    const Menu= ['Create', 'Manage', 'Export Devices']

    const DATA = [
        {
            id: '123456789456123',
            title: 'TrackPort International',
            date: "12/05/2020",
            group:'Home',
            plan: 'Basic',
            duration:'Monthly',
            type: 'Car',
            desc: 'My Dad\'s Car',
            image: require('../../../assets/images/Vehicles/car.png')
        },
        {
            id: '123456789456123',
            title: 'TrackPort 4G Vehicle GPS Tracker',
            date: "12/05/2020",
            group:'Fedex Ground',
            plan: 'Standard',
            duration:'Yearly',
            type:'Truck',
            desc: 'My Dad\'s Truck',
            image: require('../../../assets/images/Vehicles/Truck.png')
        },
        {
            id: '123456789456123',
            title: 'Spark Nano GPS Tracker',
            date: "10/05/2020",
            group:'Default',
            plan: 'None',
            type: '',
            duration:'',
            desc: '',
            image: ''
        },

    ];

const styles = StyleSheet.create({

  cardContainer: {
    //width:'100%',
    width: Dimensions.get('screen').width-40,
    marginTop: hp(2),
    // height:hp(18),
    alignSelf: 'center',
    backgroundColor: ColorConstant.WHITE,
    borderRadius: 12,
    elevation:3,
    borderWidth: 0.3,
    borderColor: ColorConstant.GREY,
    shadowColor:ColorConstant.GREY,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
},
menuPopup:{
  backgroundColor:'white',
  padding:5,
  paddingVertical:hp(1.5),
  right:wp(3),
  borderRadius:12,
  width:hp(20),
  top:hp(0.5),
  justifyContent:'space-between',
  position:'absolute',
  shadowColor:ColorConstant.GREY,		
  shadowOffset:{height:0,width:0},
  shadowOpacity:1,
  elevation:10,
  shadowRadius:3
},
textStyle:{
  margin:hp(0.5),
  color:ColorConstant.BLUE,
  textAlignVertical:'center',
  paddingLeft:hp(0.5)
},
horizontalLine:{
  borderBottomWidth:0.5,borderBottomColor:ColorConstant.GREY,margin:hp(0.7)
},
search: {
  paddingHorizontal:hp(2),
  marginHorizontal:hp(2),
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'space-between',
  width: '80%',
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
addButton : {
    //paddingHorizontal:hp(2),
    //marginHorizontal:hp(2),
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    width:'15%',
    height:hp(6),
    borderRadius:12,
    marginTop:hp(4),
    //marginBottom:hp(2),
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
});


export default Users;