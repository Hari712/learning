import React, { useState ,Component, useEffect} from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, Dimensions, ScrollView, TextInput, RefreshControl, FlatList} from 'react-native';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize';
import NavigationService from '../../navigation/NavigationService';
import Tooltip from 'rn-tooltip';
import { useDispatch, useSelector } from 'react-redux';
import AppManager from '../../constants/AppManager';


const Alarms = ({navigation}) => {


  const dispatch = useDispatch()

  useEffect(() => {    
   
  }, [])

  React.useLayoutEffect(() => {

    navigation.setOptions({
      headerLeft:()=>(null)     
    });
  });

  const renderItem = ({item,key}) => {
    return(  
    <View style={styles.cardContainer} key={key}>
          {/* Blue top head */}
          <View style={styles.blueBox}>
              <View style={{flex:1}}>
                <Text style={styles.blueBoxTitle}>{item.title}</Text>
                <Text style={styles.blueBoxTitle}>{item.type}</Text>
              </View>
              <Image source={images.liveTracking.edit} />
              <TouchableOpacity onPress={()=>{navigation.navigate('AddUser',{editData:item})}} style={{marginLeft:hp(2)}}>
                <Image source={images.liveTracking.trash} /> 
              </TouchableOpacity>       
          </View>
          

          {/* White Body container */}
          <View style={styles.whiteContainer}>
            {item.asset.map((entry,key) =>
            <View style={styles.whiteSubView} >
                <View style={{backgroundColor:'red',marginHorizontal:hp(2)}}>
                <Text>{entry}</Text>
                </View>
            </View>
            )}

          </View>

          {/* Email and Phone */}
          <View style={styles.horizontalLine} />
            <View style={styles.emailPhone}>
                <Text>{item.duration}</Text>
            </View>
    </View>
    )   
  }

    const onRefresh = () => {
      setIsRefreshing(true) 
  }


return ( 
  <View style={styles.container}>
    
      <View style={styles.header}>
        <Text  style={{fontFamily:'Nunito-Bold',fontSize:16,color:ColorConstant.WHITE}}>Create New</Text>
      </View>

      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        // refreshControl={
        //   <RefreshControl 
        //     refreshing={isRefreshing}
        //     onRefresh={onRefresh}     
        //   />
        // }
      />

  </View>
      )
    }
const DATA = [
    {
        title: 'Speed',
        type: 'Overspeed Alarm',
        asset: ['TrackPort International'],
        duration: 'Weekdays(Monday-Friday, All hours)'
    },
    {
        title: 'Emergency',
        type: 'Panic Alarm',
        asset: ['Spark Nano 7 GPS Tracker', 'TrackPort International', 'TrackPort International'],
        duration: 'Everyday(All hours)'
    },
    
];

const styles = StyleSheet.create({

  container: {
    height:'100%'
  },
  cardContainer: {
    width:'90%',
    marginVertical: hp(1.5),
    alignSelf: 'center',
    backgroundColor: ColorConstant.WHITE,
    borderRadius: 12,
    elevation:3,
    borderColor: ColorConstant.GREY,
    shadowColor:ColorConstant.GREY,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
},
header : {
    width:'90%',
    backgroundColor: ColorConstant.ORANGE,
    borderRadius: 12,
    height:hp(6),
    borderWidth: 0.3,
    borderColor: ColorConstant.GREY,
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
    marginVertical:hp(3)
},
blueBox : {
  backgroundColor:ColorConstant.BLUE,
  alignItems:'center',
  height:hp(6),
  flexDirection:'row',
  width:"100%",
  borderTopLeftRadius:12,
  borderTopRightRadius:12,
  paddingHorizontal:hp(3),
  paddingVertical:hp(0.3)
},
blueBoxTitle :{
  color:ColorConstant.WHITE,
  fontSize:12,
  //fontSize:FontSize.FontSize.small,
  flex:1,
  fontFamily:'Nunito-Bold'
},
activeText : {
  //fontSize:FontSize.FontSize.small,
  color:ColorConstant.WHITE,
  paddingHorizontal:hp(1),
  flex:0.3,
  fontSize:12,
  fontFamily:'Nunito-Regular'
},
whiteContainer : {
  flexDirection:'row',
  marginTop:hp(1.5),
  paddingHorizontal:hp(2.5),
  paddingBottom:hp(1.5)
},
whiteSubView : {
  flexDirection:'column',
  flex:1,
  //backgroundColor:'red'
},
whiteContainerText: {
  color:ColorConstant.GREY,
  //fontSize:FontSize.FontSize.small,
  fontSize:10,
  fontFamily:'Nunito-Regular'
},
whiteContainerSubText : {
  color:ColorConstant.BLACK,
  //fontSize:FontSize.FontSize.small,
  fontSize:12,
  fontFamily:'Nunito-Regular'

},
horizontalLine:{
  borderBottomWidth:0.5,
  width:'90%',
  alignSelf:'center',
  borderBottomColor:ColorConstant.GREY
},
emailPhone : {
  flexDirection:'row',
  marginTop:hp(1.5),
  paddingHorizontal:hp(2.5),
  paddingBottom:hp(1.5),
  alignItems:'center'
},
emailImage : {
  height:hp(2),
  alignSelf:'flex-end',
  resizeMode:'contain',
},
phoneImage : {
  height:hp(2),
  width:wp(4),
  resizeMode:'contain'
},
emailText : {
  color:ColorConstant.BLACK,
  //fontSize:FontSize.FontSize.extraSmall,
  flex:1,
  fontSize:10,
  fontFamily:'Nunito-Regular'
},
phoneText : {
  color:ColorConstant.BLACK,
  //fontSize:FontSize.FontSize.extraSmall,
  fontSize:10,
  fontFamily:'Nunito-Regular'
},
search: {
  paddingHorizontal:hp(2),
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'space-between',
  width:'84%',
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
    width:'14%',
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
menu:{
  backgroundColor:'white',
  padding:5,
  paddingVertical:hp(1.5),
  right:wp(19),
  borderRadius:16,
  width:hp(12),
  top:hp(11),
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
  paddingLeft:hp(0.5),
  fontFamily:'Nunito-Regular',
  fontSize:12
  
},
searchText: {
  //fontSize:FontSize.FontSize.small,
  fontSize:14,
  color:ColorConstant.LIGHTGREY,
  fontFamily:'Nunito-LightItalic'
},
searchSubContainer: {
  flexDirection:'row',
  width:'100%',
  justifyContent:'space-between'
}
});


export default Alarms;