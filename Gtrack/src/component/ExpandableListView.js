import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, Dimensions, TimePickerAndroid, ScrollView, TextInput} from 'react-native';
import images from '../constants/images'
import { ColorConstant } from '../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from './FontSize'
import MultiSelect from './MultiSelect';
import DropDown from './DropDown';
import { ConfirmDialog } from 'react-native-simple-dialogs';


  const ExapandableListView = props => {

   const { data } = props; 
   console.log("Expandable Props", props)
  
    const [selectedKey, setSelectedKey] = useState();
    const [subContainerHeight, setSubContainerHeight] = useState();
    const [addClick, setAddClick] = useState();
    const [selectedDevices, setSelectedDevices] = useState([]);
    const [dialogVisible,setDialogVisible] = useState(false)
    const devicesList = [
      'TrackPort International', 
      'TrackPort International1', 
      'TrackPort International2', 
      'TrackPort International3', 
      'TrackPort International4'
   ]

      return(
      
        data.map((item,key)=>{    

          return(
        <View>   
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
                      <TouchableOpacity style={{alignSelf:'center'}} key={key} onPress={()=>(key==addClick)?setAddClick(-1):setAddClick(key)}>
                        <Image style={styles.icon} source={images.image.add} />  
                      </TouchableOpacity>
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

        </View>         
               
                
        {/* Popup View */}
                           
        {(key==addClick)?
            <View style={styles.popup}>
                <View style={{flexDirection:'row',margin:hp(2)}}>
                  <View style={{flex:1,alignItems:'center'}}>
                    <Text style={{color:ColorConstant.ORANGE,fontSize:FontSize.FontSize.medium,fontWeight:'bold'}}>Add Device</Text>
                  </View>
                  <TouchableOpacity onPress={()=>setAddClick(-1)} style={{alignSelf:'center',height:hp(2)}}>
                    <Image source={images.manage.close} />
                  </TouchableOpacity>
                </View>
               
                {/* <MultiSelect label='Select Device' dataList={devicesList} valueSet={setSelectedDevices}  selectedData={selectedDevices} outerStyle={{width:'85%',alignSelf:'center'}} /> */}

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={{borderRadius:6,borderWidth:1,borderColor:ColorConstant.BLUE,backgroundColor:ColorConstant.WHITE,width:'42.5%',height:hp(6),justifyContent:'center'}}>
                        <Text style={{textAlign:'center',color:ColorConstant.BLUE}}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>setDialogVisible(!dialogVisible)}  style={{borderRadius:6,backgroundColor:ColorConstant.BLUE,width:'42.5%',height:hp(6),justifyContent:'center'}}>
                        <Text style={{textAlign:'center',color:ColorConstant.WHITE}}>Okay</Text>
                    </TouchableOpacity>
                </View>

                
                <ConfirmDialog
                    title="Are you sure ?"
                    titleStyle={{color:ColorConstant.ORANGE, textAlign:'center',fontSize:FontSize.FontSize.regular,fontWeight:'bold'}}
                    message={"Do you really want to remove device from the group?" + "\n \n" + "This process can be undone."}
                    messageStyle={{color:ColorConstant.BLACK, textAlign:'center',fontSize:FontSize.FontSize.small}}
                    visible={dialogVisible}
                    buttonsStyle={{alignItems:'center',marginBottom:hp(3)}}
                    dialogStyle={{borderRadius:hp(2)}}
                    onTouchOutside={() => setDialogVisible(false)}
                    negativeButton={{
                        title: "Cancel",
                        onPress: () => setDialogVisible(false),
                        titleStyle:{backgroundColor:ColorConstant.WHITE,borderRadius:4,borderWidth:1,borderColor:ColorConstant.BLUE, color:ColorConstant.BLUE,width:wp(30),marginRight:hp(2)}
                    }}
                    positiveButton={{
                        title: "Okay",
                        onPress: () => setDialogVisible(false),
                        titleStyle:{backgroundColor:ColorConstant.BLUE,borderRadius:4, color:ColorConstant.WHITE,width:wp(30),marginRight:hp(2)}
                    }} >
                        
                </ConfirmDialog>
        
            </View>:null}


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
    popup: {
      borderRadius:12,
      marginTop:hp(5),
      //alignItems:'center',
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
        width:'85%',
        //margin:hp(3),
        marginTop:hp(3),
        marginBottom:hp(3),
        alignSelf:'center'
    },
});

export default ExapandableListView;

  