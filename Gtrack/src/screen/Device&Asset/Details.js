import React, { useState ,Component} from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, Dimensions, TimePickerAndroid} from 'react-native';
import Mapbox from '@react-native-mapbox-gl/maps'
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize';
import Header from '../../component/Header'

const Details = ({route, navigation}) => {
    const { id, title } = route.params;
  
  return (
<View style={{width:'100%',height:Dimensions.get('window').height,backgroundColor:'red'}}>
    <View style={styles.cardContainer}>     
        <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:hp(2),alignItems:'center'}}>
            <Text>Device Details</Text>
            <Image source={images.image.usb}/>
        </View>
        <View style={{borderBottomColor:ColorConstant.GREY,borderBottomWidth:1,marginHorizontal:hp(2)}}/>

        {/* white view */}

        <View style={{flexDirection:'row',marginTop:hp(1.5),marginHorizontal:hp(2),paddingBottom:hp(1.5)}}>
        <View style={{flexDirection:'column',width:'40%'}} >
          <Text style={{color:ColorConstant.GREY,fontSize:FontSize.FontSize.small}}>ID</Text>
          <Text style={{color:ColorConstant.BLACK,fontSize:FontSize.FontSize.small}}>{id}</Text>              
        </View>
        <View style={{flexDirection:'column',width:'50%'}} >
          <Text style={{color:ColorConstant.GREY,fontSize:FontSize.FontSize.small}}>Name</Text>
          <Text style={{color:ColorConstant.BLACK,fontSize:FontSize.FontSize.small}}>{title}</Text>         
        </View>
        <View style={{flexDirection:'column',width:'10%'}}>
          <Text style={{color:ColorConstant.GREY,fontSize:FontSize.FontSize.small}}>Group</Text>
          <Text style={{color:ColorConstant.BLACK,fontSize:FontSize.FontSize.small}}>xjnkd</Text>
        </View>
      </View>
    </View>   
</View>      
   


/* <View>
  <Header title='' />
  {DATA.map((item,key) =>
    <View style={styles.cardContainer} key={key}>
        <View style={{ alignContent:'space-between',marginVertical:hp(0.5)}}>
          <Text style={{color:ColorConstant.ORANGE,fontSize:FontSize.FontSize.extraSmall}}>Device details</Text>
        </View>
        <View style={{marginTop:hp(1),left:10}}>
          {item.image?<Image style={{height:hp(1.5), resizeMode:'contain' }} source={item.image}/>:null}
        </View>
        <View style={{flexDirection:'row', position:'absolute', right:20,height:hp(5),width:wp(10),justifyContent:'space-between', alignItems:'center'}}>
          <Image source={images.image.edit}/>
          <Image source={images.image.cardExpand}/>
        </View>

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
     </View> */
  )
}

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
    marginTop: hp(2),
    // height:hp(18),
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
	
});

export default Details;