import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, Dimensions, TimePickerAndroid, ScrollView, TextInput} from 'react-native';
import images from '../constants/images'
import { ColorConstant } from '../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from './FontSize'


const CONTENT = [
    {
      id: 1, // required, id of item
      categoryName: 'Item 1', // label of item expandable item
      subCategory: [
        // required, array containing inner objects
        {
          id: 3, // required, of inner object
          name: 'Sub Cat 1', // required, label of inner object
        },
        {
          id: 4,
          name: 'Sub Cat 3',
        },
      ],
    },
    {
      id: 2,
      categoryName: 'Item 8',
      subCategory: [{id: 22, name: 'Sub Cat 22'}],
    },
  ];

  const ExapandableListView = () => {

    const [toggle,setToggle] = useState(false);

      return(
          
        <View style={[styles.card]} >       
            <TouchableOpacity onPress={()=>setToggle(!toggle)} style={[styles.arrow]}>
                <Image source={toggle? images.image.upArrow:images.image.downarrow}/>
            </TouchableOpacity> 

            {/* heading */}
            <View >     
                <Text style={{flex:1}}>Home</Text>  
                <View style={{flexDirection:'row',justifyContent:'space-evenly',width:'20%',alignItems:'center'}}>             
                    <Image style={{}} source={images.image.trashBlack}/>
                    <Image style={{}} source={images.image.add} />  
                </View>

                {/* Expanded data View */}
                {toggle
                            
                }

            </View>  

    

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
        
    },
    arrow:{
        //backgroundColor:ColorConstant.BLUE,             
        width:wp(6),
        alignItems:'center',
        justifyContent:'center',
        borderTopLeftRadius:12,
        borderBottomLeftRadius:12
    },
    card: {
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
    },	
    buttonContainer: {
        flexDirection:'row',
        justifyContent:'space-evenly',
        //width:'75%',
        //margin:hp(3),
        marginTop:hp(3),
        alignItems:'center'
    },
});

  export default ExapandableListView;

  