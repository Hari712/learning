import React, { useState ,Component} from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, Dimensions} from 'react-native';
import Mapbox from '@react-native-mapbox-gl/maps'
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize';

const DeviceAsset = () => {
    
   
	 return (
     
  
      // <View style={{backgroundColor:'red',height:Dimensions.get('window').height}}>
    DATA.map((item,key) =>
        <View style={styles.cardContainer}>
           {console.log("Khushi",item)}
          <View style={{backgroundColor:ColorConstant.BLUE,flexDirection:'row',width:'100%',height:hp(8),borderTopLeftRadius:15,borderTopRightRadius:15}}>
             <View>
                <Text style={{color:ColorConstant.WHITE,marginTop:hp(0.5),paddingLeft:hp(3)}}>{item.title}</Text>
                <Text style={{paddingLeft:hp(3),color:ColorConstant.ORANGE,fontSize:FontSize.FontSize.small,marginTop:hp(1)}}>{item.id}</Text>
             </View>
             <View style={{marginTop:hp(1.5),left:15}}>
               <Image source={images.image.car}/>
             </View>
             <View style={{flexDirection:'row',alignItems:'center',left:60}}>
               <Image style={{marginRight:hp(3)}} source={images.image.edit}/>
               <Image source={images.image.cardExpand}/>
             </View>
          </View>
          <View style={{flexDirection:'row',justifyContent:'center',marginTop:hp(1.5)}}>
            <View style={{flexDirection:'column',paddingHorizontal:hp(2)}} >
              <Text style={{color:ColorConstant.GREY,fontSize:FontSize.FontSize.medium}}>Group</Text>
              <Text style={{color:ColorConstant.BLACK,fontSize:FontSize.FontSize.medium}}>{item.group}</Text>              
            </View>
            <View style={{flexDirection:'column',paddingHorizontal:hp(2)}} >
              <Text style={{color:ColorConstant.GREY,fontSize:FontSize.FontSize.medium}}>Selected Plan</Text>
              <Text style={{color:ColorConstant.BLACK,fontSize:FontSize.FontSize.medium}}>{item.plan} <Text style={{color:ColorConstant.GREY}}>({item.duration})</Text></Text>             
            </View>
            <View style={{flexDirection:'column',paddingHorizontal:hp(2)}}>
            <Text style={{color:ColorConstant.GREY,fontSize:FontSize.FontSize.medium}}>Plan Expiry</Text>
            <Text style={{color:ColorConstant.BLACK,fontSize:FontSize.FontSize.medium}}>{item.date}</Text>
            </View>
          </View>
        </View>
    )
      // </View>

   
      )
  }

  
     


      const DATA = [
        {
            id: '123456789456123',
            title: 'TrackPort International',
            date: "12/05/2020",
            group:'Home',
            plan: 'Basic',
            duration:'Monthly'
        },
        {
            id: '123456789456123',
            title: 'TrackPort 4G Vehicle GPS Tracker',
            date: "12/05/2020",
            group:'Fedex Ground',
            plan: 'Selected',
            duration:'Yearly'
        },
        {
            id: '123456789456123',
            title: 'Spark Nano GPS Tracker',
            date: "10/05/2020",
            group:'Default',
            plan: 'None',
            duration:''
        },

    ];

const styles = StyleSheet.create({
//   cardSubContainer: {
//     width: '100%', overflow: "hidden", borderRadius: 23, borderWidth: 0.3,
//     borderColor: 'yellow',
//     marginTop:hp(2),
//     height:hp(20)
// },

  cardContainer: {
    //width:'100%',
    width: Dimensions.get('screen').width-30,
    marginVertical: hp(4),
    height:hp(18),
    alignSelf: 'center',
    backgroundColor: ColorConstant.WHITE,
    borderRadius: 15,
    borderWidth: 0.3,
    borderColor: ColorConstant.GREY,
    shadowColor:ColorConstant.GREY,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
},
	// container: {
	// 	flex: 1,
	// },
	// subContainer: {
	// 	position:'absolute', flex:1,right:20, top:20,width:'15%'
	// },
	// bellIconStyle: {
	// 	borderRadius:13,height:hp(7.3),justifyContent:'center',alignItems:'center',width:'100%',backgroundColor:ColorConstant.WHITE
	// },
	// lineIconStyle: {
	// 	borderRadius:13,height:hp(7.3),marginTop:hp(2) ,justifyContent:'center',alignItems:'center',width:'100%',backgroundColor:ColorConstant.WHITE
	// },
	// lineContainer:{
	// 	backgroundColor:'white',
	// 	padding:5,
	// 	paddingVertical:hp(1.5),
	// 	right:70,
	// 	borderRadius:16,
	// 	width:hp(20),
	// 	top:hp(9.5),
	// 	justifyContent:'space-between',
	// 	position:'absolute',
	// 	shadowColor:ColorConstant.GREY,		
	// 	shadowOffset:{height:0,width:0},
	// 	shadowOpacity:1,
	// 	elevation:10,
	// 	shadowRadius:3
	// },
	// textStyle:{
	// 	margin:hp(0.5),
	// 	color:ColorConstant.BLUE,
	// 	textAlignVertical:'center',
	// 	paddingLeft:hp(0.5)
	// },
	// horizontalLine:{
	// 	borderBottomWidth:0.5,borderBottomColor:ColorConstant.GREY,margin:hp(0.7)
	// },
	// map: {
	// 	height: 400,
	// 	marginTop: 80
	// },
	// annotationContainer: {
	// 	width: 30,
	// 	height: 30,
	// 	alignItems: 'center',
	// 	justifyContent: 'center',
	// 	backgroundColor: 'white',
	// 	borderRadius: 15
	// },
	// annotationFill: {
	// 	width: 30,
	// 	height: 30,
	// 	borderRadius: 15,
	// 	backgroundColor: 'blue',
	// 	transform: [{ scale: 0.6 }]
	// }
});

export default DeviceAsset;