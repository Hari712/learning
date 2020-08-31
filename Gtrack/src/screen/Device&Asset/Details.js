import React, { useState ,Component} from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, Dimensions, TimePickerAndroid} from 'react-native';
import Mapbox from '@react-native-mapbox-gl/maps'
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize';

const Details = ({route, navigation}) => {
    const { id, title, plan, group } = route.params;
    console.log('Khushi',route.params)

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={{
                    color:ColorConstant.GREY,
                    fontSize: FontSize.FontSize.medium,
                    fontWeight: '500',
                    //letterSpacing: 0,
                    textAlign:'center' }}>
                    Details of {title}
                </Text>          
            ),
            headerLeft:() => (
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Image style={{marginLeft:hp(2)}} source={images.image.back}/>
                </TouchableOpacity>
            )
        });
      }, [navigation]);

  return (
<View style={{width:'100%',height:Dimensions.get('window').height}}>
    <View style={styles.cardContainer}>     
        <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:hp(2),alignItems:'center'}}>
            <Text>Device Details</Text>
            <Image source={images.image.usb}/>
        </View>
        <View style={{borderBottomColor:ColorConstant.GREY,borderBottomWidth:0.5,marginHorizontal:hp(2)}}/>

        <View style={{flexDirection:'row',marginTop:hp(1.5),marginHorizontal:hp(2),paddingBottom:hp(1.5)}}>
            <View style={{flexDirection:'column',flex:3}} >
                <Text style={{color:ColorConstant.GREY,fontSize:FontSize.FontSize.small}}>ID</Text>
                <Text style={{color:ColorConstant.BLACK,fontSize:FontSize.FontSize.small}}>{id}</Text>              
            </View>
            <View style={{flexDirection:'column',flex:3}} >
                <Text style={{color:ColorConstant.GREY,fontSize:FontSize.FontSize.small}}>Name</Text>
                <Text style={{color:ColorConstant.BLACK,fontSize:FontSize.FontSize.small}}>{title}</Text>         
            </View>
            <View style={{flexDirection:'column',flex:1}}>
                <Text style={{color:ColorConstant.GREY,fontSize:FontSize.FontSize.small}}>Group</Text>
                <Text style={{color:ColorConstant.BLACK,fontSize:FontSize.FontSize.small}}>{group}</Text>
            </View>
        </View>
    </View> 

    <View style={styles.cardContainer}>     
        <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:hp(2),alignItems:'center'}}>
            <Text>Plan Details</Text>
            <Image source={images.image.list}/>
        </View>
        <View style={{borderBottomColor:ColorConstant.GREY,borderBottomWidth:0.5,marginHorizontal:hp(2)}}/>

        <View style={{flexDirection:'row',marginTop:hp(1.5),marginHorizontal:hp(2)}}>
            <View style={{flexDirection:'column',flex:1.5}} >
                <Text style={{color:ColorConstant.GREY,fontSize:FontSize.FontSize.small}}>Plan</Text>
                <Text style={{color:ColorConstant.BLACK,fontSize:FontSize.FontSize.small}}>{plan}</Text>              
            </View>
            <View style={{flexDirection:'column',flex:0.8}} >
                <Text style={{color:ColorConstant.GREY,fontSize:FontSize.FontSize.small}}>Price</Text>
                <Text style={{color:ColorConstant.BLACK,fontSize:FontSize.FontSize.small}}>$60</Text>         
            </View>
            <View style={{flexDirection:'column',flex:1.2}}>
                <Text style={{color:ColorConstant.GREY,fontSize:FontSize.FontSize.small}}>Start Date</Text>
                <Text style={{color:ColorConstant.BLACK,fontSize:FontSize.FontSize.small}}>25/11/2020</Text>
            </View>
            <View style={{flexDirection:'column',flex:1.2}}>
                <Text style={{color:ColorConstant.GREY,fontSize:FontSize.FontSize.small}}>End Date</Text>
                <Text style={{color:ColorConstant.BLACK,fontSize:FontSize.FontSize.small}}>25/12/2020</Text>
            </View>
        </View>  
        <View style={{marginHorizontal:hp(2),paddingBottom:hp(2),marginTop:hp(1)}}>
            <Text style={{color:ColorConstant.GREY,fontSize:FontSize.FontSize.small,marginTop:hp(1)}}>Features</Text> 
            <Text style={{color:ColorConstant.GREY,fontSize:FontSize.FontSize.small,marginTop:hp(1)}}>{'\u2B24'} <Text style={{color:ColorConstant.BLACK}}>    6 month Data Retention</Text></Text> 
            <Text style={{color:ColorConstant.GREY,fontSize:FontSize.FontSize.small,marginTop:hp(1)}}>{'\u2B24'} <Text style={{color:ColorConstant.BLACK}}>    Phone,Text,Chat and Email Support</Text></Text> 
            <Text style={{color:ColorConstant.GREY,fontSize:FontSize.FontSize.small,marginTop:hp(1)}}>{'\u2B24'} <Text style={{color:ColorConstant.BLACK}}>    Optional Protection Plan(2.99/mo)</Text></Text>
            <Text style={{color:ColorConstant.GREY,fontSize:FontSize.FontSize.small,marginTop:hp(1)}}>{'\u2B24'} <Text style={{color:ColorConstant.BLACK}}>    5% off future BHS Hardware purchase</Text></Text>  
        </View>

            
      </View> 


</View>  
  )}
   

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
    elevation:3,
    alignSelf: 'center',
    backgroundColor: ColorConstant.WHITE,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: ColorConstant.GREY,
    shadowColor:ColorConstant.GREY,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
},
	
});

export default Details;