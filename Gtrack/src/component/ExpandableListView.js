import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, Dimensions, TimePickerAndroid, ScrollView, TextInput} from 'react-native';
import images from '../constants/images'
import { ColorConstant } from '../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from './FontSize'


  const ExapandableListView = props => {

   const { data } = props; 
   console.log("Expandable Props", props)
  
    const [selectedKey, setSelectedKey] = useState();
    const [subContainerHeight, setSubContainerHeight] = useState();

      return(
          
        data.map((item,key)=>{    

          return(
        <View key={key} style={[styles.card, { height:(key==selectedKey)? subContainerHeight : hp(5) , borderColor: (key==selectedKey)?ColorConstant.ORANGE:ColorConstant.WHITE}]} >

            {/* Arrow Left Side */}
            <TouchableOpacity onPress={()=>(key==selectedKey)?setSelectedKey(-1):setSelectedKey(key)} style={[styles.arrow,{backgroundColor: (key==selectedKey)?ColorConstant.ORANGE:ColorConstant.BLUE}]}>
                <Image source={(key==selectedKey)? images.image.upArrow:images.image.downarrow}/>
            </TouchableOpacity> 
            
            <View style={{flex:1,padding:10}} onLayout={({nativeEvent}) => {
                          console.log("Sub container ",nativeEvent.layout)
                          setSubContainerHeight(nativeEvent.layout.height)
                      }}>     
              {/* heading */}
                <View style={{flexDirection:'row', width:'100%',paddingHorizontal:10}}>
                  <Text style={{flex:1,color:(key==selectedKey)?ColorConstant.ORANGE:ColorConstant.BLACK}}>{item.categoryName}</Text>  
                      <Image style={styles.icon} source={images.image.trashBlack}/>
                      <Image style={styles.icon} source={images.image.add} />  
                </View>

                {/* Expanded data View */}
                
                {(key==selectedKey)?
                <View style={{marginTop:hp(2)}} >
                  {item.subCategory.map((subitem,subkey)=>{
                    return(
                   <View key={subkey} style={styles.subCategory}>
                     <View style={{width:2,backgroundColor:ColorConstant.BLUE, marginRight:hp(1), marginLeft:4, borderRadius:10}} />
                      <Text style={{flex:1,color:ColorConstant.BLUE}}>{subitem.name}</Text>  
                          <Image style={styles.icon} source={images.image.trash}/>
                  </View>  
                  )}) }
                  </View>      
                :null}
                

            </View>     

        </View>)
        })
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
        backgroundColor:ColorConstant.BLUE,             
        width:wp(6),
        height:'100%',
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
        minHeight:hp(6),
        //paddingHorizontal:hp(2),
        //marginVertical:hp(1),
        borderRadius:12,
        borderWidth:0.5,
        marginTop:hp(5),
        elevation:3,
        shadowColor: ColorConstant.GREY,
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowRadius: 3,
        shadowOpacity: 1,
        backgroundColor:ColorConstant.WHITE
    },	
    icon:{
        margin:4,
        alignSelf:'center'
    },
    subCategory:{
      flexDirection:'row',
      width:'90%',
      paddingVertical:5,
      paddingRight:10,
      alignSelf:'center',
      margin:4,
      elevation: 7,
      borderRadius:8,
      backgroundColor:ColorConstant.WHITE
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

  