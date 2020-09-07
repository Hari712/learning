import React, { useState ,Component} from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import Mapbox from '@react-native-mapbox-gl/maps'
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize';
import NavigationService from '../../navigation/NavigationService';

const DeviceAsset = ({navigation}) => {

  var [menuClick,setMenuClick] = useState(false)

  React.useLayoutEffect(() => {

    // function menuHandle(item){
    //   console.log("khushi",item)
    //   if(item=='Create'){
    //     return NavigationService.navigate('CreateDeviceAsset')
    //   }else if(item=='Manage'){
    //     return NavigationService.navigate('CreateDeviceAsset')
    //   }
    //   else
    //     return 
    // }

    navigation.setOptions({
      headerLeft:()=>(null),
      headerRight:()=> (
          <TouchableOpacity activeOpacity={1} onPress={()=>setMenuClick(!menuClick)}>
            <Image source={menuClick?images.image.menuclick:images.image.menu} style={{marginRight:wp(5), height:hp(3),width:wp(3), resizeMode:'contain'}} />
          </TouchableOpacity>
      )
    });
  });

  function menuHandle(item){
    console.log("khushi",item)
    if(item=='Create'){
      return NavigationService.navigate('CreateDeviceAsset')
    }else if(item=='Manage'){
      return NavigationService.navigate('CreateDeviceAsset')
    }
    else
      return 
  }


return ( 
<View>
<ScrollView style={{height:"100%"}} onTouchStart={()=>setMenuClick(false)}>
  {DATA.map((item,key) =>
    <View style={styles.cardContainer} key={key}>
      {/* Blue top head */}
      <View style={{backgroundColor:ColorConstant.BLUE,flexDirection:'row',width:"100%",borderTopLeftRadius:15,borderTopRightRadius:15,paddingHorizontal:hp(3)}}>
        <View style={{ alignContent:'space-between',marginVertical:hp(0.5),}}>
          <Text style={{color:ColorConstant.WHITE,fontSize:FontSize.FontSize.small}}>{item.title}</Text>
          <Text style={{color:ColorConstant.ORANGE,fontSize:FontSize.FontSize.extraSmall}}>{item.id}</Text>
        </View>
        <View style={{marginTop:hp(1),left:10}}>
          {item.image?<Image style={{height:hp(1.5), resizeMode:'contain' }} source={item.image}/>:null}
        </View>
        <View style={{flexDirection:'row', position:'absolute', right:20,height:hp(5),width:wp(10),justifyContent:'space-between', alignItems:'center'}}>
         <TouchableOpacity onPress={()=> 
          {
            navigation.navigate('EditDeviceAsset',{id:item.id,title:item.title})}}>
          <Image source={images.image.edit}/>
        </TouchableOpacity>
          <TouchableOpacity onPress={()=>
            { 
            navigation.navigate('Details',{id:item.id, title:item.title, plan:item.plan,group:item.group})}
            } >
            <Image style={{height:hp(2)}} source={images.image.cardExpand}/>
          </TouchableOpacity>
        </View>
      </View>

      {/* White Body container */}
      <View style={{flexDirection:'row',marginTop:hp(1.5),paddingHorizontal:hp(2.5),paddingBottom:hp(1.5)}}>
        <View style={{flexDirection:'column',width:'35%'}} >
          <Text style={{color:ColorConstant.GREY,fontSize:FontSize.FontSize.small}}>Group</Text>
          <Text style={{color:ColorConstant.BLACK,fontSize:FontSize.FontSize.small}}>{item.group}</Text>              
        </View>
        <View style={{flexDirection:'column',width:'40%'}} >
          <Text style={{color:ColorConstant.GREY,fontSize:FontSize.FontSize.small}}>Selected Plan</Text>
          <Text style={{color:ColorConstant.BLACK,fontSize:FontSize.FontSize.small}}>{item.plan} {item.duration?<Text style={{color:ColorConstant.GREY}}>({item.duration})</Text>:null}</Text>             
        </View>
        <View style={{flexDirection:'column',width:'25%'}}>
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
            image: require('../../../assets/images/Vehicles/car.png')
        },
        {
            id: '123456789456123',
            title: 'TrackPort 4G Vehicle GPS Tracker',
            date: "12/05/2020",
            group:'Fedex Ground',
            plan: 'Standard',
            duration:'Yearly',
            image: require('../../../assets/images/Vehicles/Truck.png')
        },
        {
            id: '123456789456123',
            title: 'Spark Nano GPS Tracker',
            date: "10/05/2020",
            group:'Default',
            plan: 'None',
            duration:'',
            image: ''
        },

    ];

const styles = StyleSheet.create({

  cardContainer: {
    //width:'100%',
    width: Dimensions.get('screen').width-30,
    marginTop: hp(2),
    // height:hp(18),
    alignSelf: 'center',
    backgroundColor: ColorConstant.WHITE,
    borderRadius: 15,
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
  borderRadius:16,
  width:hp(20),
  top:hp(-1),
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
});


export default DeviceAsset;