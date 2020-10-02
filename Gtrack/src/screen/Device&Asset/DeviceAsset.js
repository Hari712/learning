import React, { useState ,Component} from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize';
import NavigationService from '../../navigation/NavigationService';
import Tooltip from 'rn-tooltip';

const DeviceAsset = ({navigation}) => {

  const [menuClick,setMenuClick] = useState(false)

  React.useLayoutEffect(() => {

    navigation.setOptions({
      headerLeft:()=>(null),
      headerRight:()=> (
          <TouchableOpacity activeOpacity={1} onPress={()=>setMenuClick(!menuClick)}>
            <Image source={menuClick?images.image.menuclick:images.image.menu} style={styles.headerRight} />
          </TouchableOpacity>
      )
    });
  });

  function menuHandle(item){
    if(item=='Create'){
      return NavigationService.navigate('CreateDeviceAsset')
    }else if(item=='Manage'){
      return NavigationService.navigate('Manage')
    }
    else
      return  
  }


return ( 
  <>
    <ScrollView contentContainerStyle={{flexGrow:1, backgroundColor:ColorConstant.WHITE, paddingBottom:hp(2)}} onTouchStart={()=>setMenuClick(false)}>
    {DATA.map((item,key) =>
      <TouchableOpacity onPress={()=>
      { 
      navigation.navigate('Details',{id:item.id, title:item.title, plan:item.plan,group:item.group})}
      } style={styles.cardContainer} key={key}>
        
      {/* Blue top head */}
      <View style={styles.blueConatiner}>
        <View style={styles.blueTopHead}>
          <Text style={styles.headerTitle}>{item.title}</Text>
          <Text style={styles.id}>{item.id}</Text>
        </View>
        <View style={styles.toolTip}>
          <Tooltip
            popover={<Text style={styles.toolTipText}>{item.desc}</Text>} 
            backgroundColor={ColorConstant.WHITE}
            overlayColor={ColorConstant.TRANSPARENT}
            pointerStyle={styles.pointerStyle}
            containerStyle={styles.toolTipContainer}
          >
            {item.image?<Image style={styles.image} source={item.image}/>:null}
          </Tooltip>
        </View>

        <View style={styles.editButton}>
        <TouchableOpacity onPress={()=> 
          {
            navigation.navigate('EditDeviceAsset',{id:item.id,title:item.title})}}>
          <Image source={images.image.edit}/>
        </TouchableOpacity>
          {/* <TouchableOpacity onPress={()=>
            { 
            navigation.navigate('Details',{id:item.id, title:item.title, plan:item.plan,group:item.group})}
            } >
            <Image source={images.image.cardExpand}/>
          </TouchableOpacity> */}
        </View>
      </View>

      {/* White Body container */}
      <View style={styles.whiteBodyContainer}>
        <View style={styles.column} >
          <Text style={styles.whiteBodyText}>Group</Text>
          <Text style={[styles.whiteBodyText,{color:ColorConstant.BLACK}]}>{item.group}</Text>              
        </View>
        <View style={[styles.column,{width:'40%'}]} >
          <Text style={styles.whiteBodyText}>Selected Plan</Text>
          <Text style={[styles.whiteBodyText,{color:ColorConstant.BLACK}]}>{item.plan} {item.duration?<Text style={{color:ColorConstant.GREY}}>({item.duration})</Text>:null}</Text>             
        </View>
        <View style={[styles.column,{width:'25%'}]}>
          <Text style={styles.whiteBodyText}>Plan Expiry</Text>
          <Text style={[styles.whiteBodyText,{color:ColorConstant.BLACK}]}>{item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
    
  )}

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

    </>
    
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
  blueConatiner: {
    backgroundColor:ColorConstant.BLUE,
    flexDirection:'row',
    width:"100%",
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    paddingHorizontal:hp(3)
  },
  blueTopHead: {
    alignContent:'space-between',
    marginVertical:hp(0.5)
  },
  editButton: {
    flexDirection:'row', 
    position:'absolute', 
    right:20,
    height:hp(5),
    width:wp(10),
    zIndex:10,  
    justifyContent:'space-evenly', 
    alignItems:'center'
  },
  headerTitle: {
    color:ColorConstant.WHITE,
    fontSize:FontSize.FontSize.small
  },
  toolTipText: {
    alignSelf:'flex-start', 
    fontSize:FontSize.FontSize.medium
  },
  pointerStyle: {
    elevation:0.1, 
    top:3, 
    borderBottomWidth:12,
  },
  toolTipContainer: {
    borderColor:ColorConstant.ORANGE, 
    borderWidth:1, 
    borderRadius:6
  },
  image: {
    height:hp(1.5), 
    resizeMode:'contain'
  },
  id:{
    color:ColorConstant.ORANGE,
    fontSize:FontSize.FontSize.extraSmall
  },
  headerRight: {
    marginRight:wp(5), 
    height:hp(3),
    width:wp(3), 
    resizeMode:'contain'
  },
  toolTip:{
    marginTop:hp(1),
    left:10
  },

menuPopup:{
  backgroundColor:'white',
  padding:5,
  paddingVertical:hp(1.5),
  right:wp(3),
  borderRadius:16,
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
whiteBodyContainer: {
  flexDirection:'row',
  marginTop:hp(1.5),
  paddingHorizontal:hp(2.5),
  paddingBottom:hp(1.5)
},
whiteBodyText: {
  color:ColorConstant.GREY,
  fontSize:FontSize.FontSize.small
},
column: {
  flexDirection:'column',width:'35%'
}

});


export default DeviceAsset;