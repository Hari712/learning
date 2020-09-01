import React, { useState ,Component} from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, Dimensions, TimePickerAndroid, ScrollView} from 'react-native';
import Mapbox from '@react-native-mapbox-gl/maps'
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize';
import CustomButton from '../../component/Button';
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
  } from '@ubaids/react-native-material-textfield'
  

const EditDeviceAsset = ({route, navigation}) => {
    const {id,title} = route.params;
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
                    Edit Device & Asset
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
    <ScrollView>  
    <View style={{width:'100%',height:Dimensions.get('window').height,backgroundColor:ColorConstant.WHITE}}>
        <View style={{marginHorizontal:hp(3),marginVertical:hp(6)}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image  style={{resizeMode:'stretch'}} source={images.image.usb}/>
                <Text style={{marginLeft:hp(2),color:ColorConstant.BLUE,fontSize:FontSize.FontSize.medium,fontWeight:'600'}}>Device</Text>
            </View>
            <View style={{flexDirection:'row',marginTop:hp(2)}}>
                <Text style={{color:ColorConstant.BLUE,fontSize:FontSize.FontSize.medium,fontWeight:'600'}}>Id</Text>
                <Text style={{marginLeft:hp(1.5),color:ColorConstant.BLACK,fontSize:FontSize.FontSize.medium,fontWeight:'600'}}>{id}</Text>
            </View>

            <View style={{width:'100%',alignSelf:'center',marginTop:hp(3)}}>
                <OutlinedTextField
                    label='Name'
                    keyboardType='phone-pad'
                    tintColor={ColorConstant.GREY}
                    //editable={false}
                    //inputContainerStyle={styles.inputContainer}
                    activeLineWidth={1}
                    //containerStyle={styles.inputButton}
                    //formatText={this.formatText}
                    //onSubmitEditing={this.onSubmit}
                    //ref={this.fieldRef}
                />
             </View>
             <View style={{borderBottomColor:ColorConstant.GREY,borderBottomWidth:0.5,marginHorizontal:hp(2),width:wp(95),alignSelf:'center'}}/>

             <View style={{flexDirection:'row',alignItems:'center',marginTop:hp(2)}}>
                <Image  style={{resizeMode:'stretch'}} source={images.image.pickupcar}/>
                <Text style={{marginLeft:hp(2),color:ColorConstant.BLUE,fontSize:FontSize.FontSize.medium,fontWeight:'600'}}>Asset</Text>
            </View>

        </View>
        

    </View>
    </ScrollView>
    )}

const Data=[
  {
    name:'Tom Smith',
    role:'Owner'
  },
  {
  name:'David Smith',
  role:'Regular'
  }
]  

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
inputContainer: {
    height: hp(6),
},
inputButton: {
    alignSelf: 'center',
    width: wp(85),
    marginTop: hp(1.6)
},
	
});

export default EditDeviceAsset;