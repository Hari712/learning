import React, { useState ,Component} from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, Dimensions, TimePickerAndroid, ScrollView} from 'react-native';
import Mapbox from '@react-native-mapbox-gl/maps'
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize';
import { ConfirmDialog  } from 'react-native-simple-dialogs';
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
  } from '@ubaids/react-native-material-textfield'
import { color } from 'react-native-reanimated';
  

const EditDeviceAsset = ({route, navigation}) => {
    const {id,title} = route.params;
    console.log('Khushi',route.params)

    const [value,setValue] = useState();
    const [dialogVisible,setDialogVisible] = useState(false)
   

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

    const handleInput = text => {
        setValue(text)
        return text
    }  
    
    function handleRightAccessory() {
        return <Image source={images.image.next} resizemode='contain'style={styles.downArrow} />
    }   

  return (
    <View style={{height:Dimensions.get('window').height,backgroundColor:ColorConstant.WHITE,alignItems:'center'}}>
        <View style={{marginHorizontal:hp(3),marginVertical:hp(5),width:Dimensions.get('window').width-40}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image  style={{resizeMode:'stretch'}} source={images.image.usb}/>
                <Text style={{marginLeft:hp(2),color:ColorConstant.BLUE,fontSize:FontSize.FontSize.small,fontWeight:'600'}}>Device</Text>
            </View>
            <View style={{flexDirection:'row',marginTop:hp(2)}}>
                <Text style={{color:ColorConstant.BLUE,fontSize:FontSize.FontSize.small,fontWeight:'600',flex:1}}>Id</Text>
                <Text style={{marginLeft:hp(1.5),color:ColorConstant.BLACK,fontSize:FontSize.FontSize.small,fontWeight:'600',flex:20}}>{id}</Text>
            </View>

            <View style={{width:'100%',alignSelf:'center',margin:hp(3)}}>
                <OutlinedTextField
                    label='Name*'
                    tintColor={ColorConstant.GREY}
                    fontSize={FontSize.FontSize.small}
                    labelTextStyle={{ fontFamily: 'Montserrat-Regular' }}
                    labelFontSize={FontSize.FontSize.small}
                    contentInset={{ input: 10.45, label: 1.4 }}
                    formatText={handleInput}
                    //editable={false}
                    //renderRightAccessory={() => handleRightAccessory()}
                    //inputContainerStyle={styles.inputContainer}
                    activeLineWidth={1}
                    //containerStyle={styles.inputButton}
                    //formatText={this.formatText}
                    //onSubmitEditing={this.onSubmit}
                    //ref={this.fieldRef}
                />
             </View>
             <View style={{borderBottomColor:ColorConstant.GREY,borderBottomWidth:0.3,marginHorizontal:hp(2),width:wp(95),alignSelf:'center'}}/>

             <View style={{flexDirection:'row',alignItems:'center',marginTop:hp(2)}}>
                <Image  style={{resizeMode:'stretch'}} source={images.image.pickupcar}/>
                <Text style={{marginLeft:hp(2),color:ColorConstant.BLUE,fontSize:FontSize.FontSize.small,fontWeight:'600'}}>Asset</Text>
            </View>

            <TouchableOpacity onPress={()=>setAssetDropdown(true)}>
                <OutlinedTextField
                    label='Type'
                    tintColor={ColorConstant.GREY}
                    fontSize={FontSize.FontSize.small}
                    labelTextStyle={{ fontFamily: 'Montserrat-Regular' }}
                    labelFontSize={FontSize.FontSize.small}
                    contentInset={{ input: 10.45, label: 1.4 }}
                    formatText={handleInput}
                    renderRightAccessory={() => handleRightAccessory()}
                    //editable={false}
                    //inputContainerStyle={styles.inputContainer}
                    activeLineWidth={1}
                    containerStyle={styles.inputButton}
                    //formatText={this.formatText}
                    //onSubmitEditing={this.onSubmit}
                    //ref={this.fieldRef}
                />
            </TouchableOpacity>

                <View style={{flexDirection:'row',marginTop:hp(2),marginBottom:hp(3)}}>
                    <View style={{flexDirection:'column',flex:1}} >
                        <Text style={{color:ColorConstant.BLUE,fontSize:FontSize.FontSize.small}}>Name</Text>
                        <Text style={{color:ColorConstant.BLACK,fontSize:FontSize.FontSize.small,marginTop:hp(1)}}>xyz</Text>              
                    </View>
                    <View style={{flexDirection:'column',flex:1}} >
                        <Text style={{color:ColorConstant.BLUE,fontSize:FontSize.FontSize.small}}>Description (Optional)</Text>
                        <Text style={{color:ColorConstant.BLACK,fontSize:FontSize.FontSize.small,marginTop:hp(1)}}>xyz</Text>         
                    </View>
                </View>
                <View style={{borderBottomColor:ColorConstant.GREY,borderBottomWidth:0.3,marginHorizontal:hp(2),width:wp(95),alignSelf:'center'}}/>

                <View style={{flexDirection:'row',alignItems:'center',marginTop:hp(2)}}>
                    <Image  style={{resizeMode:'stretch'}} source={images.image.list}/>
                    <Text style={{marginLeft:hp(2),color:ColorConstant.BLUE,fontSize:FontSize.FontSize.small,fontWeight:'600'}}>Select Group</Text>
                </View>

                <OutlinedTextField
                    label='Select Group'
                    tintColor={ColorConstant.GREY}
                    fontSize={FontSize.FontSize.small}
                    labelTextStyle={{ fontFamily: 'Montserrat-Regular' }}
                    labelFontSize={FontSize.FontSize.small}
                    contentInset={{ input: 10.45, label: 1.4 }}
                    formatText={handleInput}
                    renderRightAccessory={() => handleRightAccessory()}
                    //editable={false}
                    //inputContainerStyle={styles.inputContainer}
                    activeLineWidth={1}
                    containerStyle={styles.inputButton}
                    //formatText={this.formatText}
                    //onSubmitEditing={this.onSubmit}
                    //ref={this.fieldRef}
                />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={{borderRadius:6,backgroundColor:ColorConstant.BLUE,width:'42%',height:hp(6),justifyContent:'center'}}>
                        <Text style={{textAlign:'center',color:ColorConstant.WHITE}}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>setDialogVisible(!dialogVisible)} style={{borderRadius:6,backgroundColor:ColorConstant.BLUE,width:'42%',height:hp(6),justifyContent:'center'}}>
                        <Text style={{textAlign:'center',color:ColorConstant.WHITE}}>Save</Text>
                    </TouchableOpacity>
                </View>

                <ConfirmDialog
                    title="Are you sure ?"
                    titleStyle={{color:ColorConstant.ORANGE, textAlign:'center',fontSize:FontSize.FontSize.regular,fontWeight:'bold'}}
                    message={"Do you really want to attach asset ?" + "\n \n" + "It will get detach from the current device."}
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
                        title: "Save",
                        onPress: () => setDialogVisible(false),
                        titleStyle:{backgroundColor:ColorConstant.BLUE,borderRadius:4, color:ColorConstant.WHITE,width:wp(30),marginRight:hp(2)}
                    }} >
                        
                </ConfirmDialog>
        
        </View>     

    </View>
    
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
buttonContainer: {
    flexDirection:'row',
    justifyContent:'space-evenly',
    //width:'75%',
    //margin:hp(3),
    marginTop:hp(5),
    alignItems:'center'
},
downArrow: {
    height: hp(1),
    width: hp(2),
    marginBottom: hp(0.25),
},
inputContainer: {
    height: hp(6),
},
inputButton: {
    alignSelf: 'center',
    width: wp(90),
    marginTop: hp(3)
},
	
});

export default EditDeviceAsset;