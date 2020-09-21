import React, { useState ,Component} from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, Dimensions, ScrollView, TextInput} from 'react-native';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize';
import NavigationService from '../../navigation/NavigationService';
import Tooltip from 'rn-tooltip';
import TextField from '../../component/TextField';

const AddUser = ({navigation}) => {
 

  React.useLayoutEffect(() => {

    navigation.setOptions({
        headerTitle: () => (
            <Text style={{
                color:ColorConstant.GREY,
                fontSize: FontSize.FontSize.medium,
                fontWeight: '500',
                //letterSpacing: 0,
                textAlign:'center' }}>
                Users
            </Text>          
        ),  
        headerLeft:() => (
            <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Image style={{marginLeft:hp(2)}} source={images.image.back}/>
            </TouchableOpacity>
        )  
    });
  });
return ( 
    <View style={styles.container}>
        <TouchableOpacity style={styles.addButton}>
            <Text>Add User</Text>
        </TouchableOpacity>

        <View style={styles.subContainer}>
            <TextField></TextField>
        </View>
    </View>
      
        
      )
    }



const styles = StyleSheet.create({

  container: {
    height:"100%",
    alignItems:'center'
  },
  subContainer: {
    width:'90%',
    //width: Dimensions.get('screen').width-40,
    marginVertical: hp(1.5),
    // height:hp(18),
    alignSelf: 'center',
    //backgroundColor: ColorConstant.WHITE,
    // borderRadius: 12,
    // elevation:3,
    // borderWidth: 0.3,
    // borderColor: ColorConstant.GREY,
    // shadowColor:ColorConstant.GREY,
    // shadowOpacity: 0.5,
    // shadowRadius: 3,
    // shadowOffset: { width: 0, height: 0 },
},
searchContainer : {
    width:'90%',
    alignItems:'center',
    //marginVertical:hp(0.1)
},
blueBox : {
  backgroundColor:ColorConstant.BLUE,
  alignItems:'center',
  height:hp(5),
  flexDirection:'row',
  width:"100%",
  borderTopLeftRadius:12,
  borderTopRightRadius:12,
  paddingHorizontal:hp(3)
},
blueBoxTitle :{
  color:ColorConstant.WHITE,
  fontSize:FontSize.FontSize.medium,
  fontWeight:'bold',
  flex:1
},
activeText : {
  fontSize:FontSize.FontSize.small,
  color:ColorConstant.WHITE,
  paddingHorizontal:hp(1)
},
whiteContainer : {
  flexDirection:'row',
  marginTop:hp(1.5),
  paddingHorizontal:hp(2.5),
  paddingBottom:hp(1.5)
},
whiteSubView : {
  flexDirection:'column',flex:1
},
whiteContainerText: {
  color:ColorConstant.GREY,
  fontSize:FontSize.FontSize.small
},
whiteContainerSubText : {
  color:ColorConstant.BLACK,
  fontSize:FontSize.FontSize.small,
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
  height:hp(1.5),
  resizeMode:'contain'
},
emailText : {
  color:ColorConstant.BLACK,
  fontSize:FontSize.FontSize.extraSmall,
  flex:1
},
phoneText : {
  color:ColorConstant.BLACK,
  fontSize:FontSize.FontSize.extraSmall
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
    backgroundColor:ColorConstant.ORANGE,
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    height:hp(8),
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
  paddingLeft:hp(0.5)
},
searchText: {
  fontSize:FontSize.FontSize.small,
  color:ColorConstant.LIGHTGREY
},
searchSubContainer: {
  flexDirection:'row',
  width:'100%',
  justifyContent:'space-between'
}
});


export default AddUser;