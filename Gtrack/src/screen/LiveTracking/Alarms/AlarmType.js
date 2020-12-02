import React, { useState ,Component, useEffect} from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, Dimensions, ScrollView, TextInput, RefreshControl, FlatList} from 'react-native';
import images from '../../../constants/images';
import { ColorConstant } from '../../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../../component/FontSize';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '../../../component/TextField';
import { translate } from '../../../../App'


const AlarmType = ({navigation,route}) => {
    
  const { alarmType, selectedDeviceList} = route.params
  
  const dispatch = useDispatch()

  const [alarmName, setAlarmName] = useState()
  const [speed, setSpeed] = useState()
  const [selectedCheckbox, setSelectedCheckbox] = useState()

  useEffect(() => {    
   
  }, [])

  React.useLayoutEffect(() => {

    navigation.setOptions({
        headerTitle: () => (
            <Text style={{
                color:ColorConstant.GREY,
                fontSize: FontSize.FontSize.medium,
                fontWeight: '500',
                //letterSpacing: 0,
                textAlign:'center' }}>
               {translate("Alarms")}
            </Text>          
        ),  
        headerLeft:() => (
            <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Image style={{marginLeft:hp(2)}} source={images.image.back}/>
            </TouchableOpacity>
        )  
    });
  },[navigation]);

return ( 
  <View style={styles.container}>
    
      <View style={styles.header}>
        <Text  style={{fontFamily:'Nunito-Bold',fontSize:16,color:ColorConstant.WHITE}}>{alarmType}</Text>
      </View>

      <View style={{paddingHorizontal:hp(5)}}>
        <View style={{marginVertical:hp(3)}}>
          <Text style={styles.textStyle}>{translate("Assign_asset_string3")}</Text>
          {selectedDeviceList.map((device,key) =>
          <Text key={key} style={[styles.textStyle,{marginVertical:hp(1),color:ColorConstant.BLACK}]}>{device}</Text> )}
        </View>

        <TextField 
          valueSet={setAlarmName} 
          label={translate("Alarms_name")}
          defaultValue={alarmName}
          outerStyle={styles.outerStyle} 
          />

        <View style={styles.inputTextStyle}>
          <TextInput 
            placeholder={translate("Alarms_string1")}
            style={styles.speedText}
            onChangeText={text => setSpeed(text) }                    
            value={speed}                    
          />
        </View>

        <View style={{marginVertical:hp(3)}}>
          <Text style={styles.textStyle}>{translate("Time")}</Text>
          {time.map((item,key) =>
            <View key={key} style={{flexDirection:'row',alignItems:'center'}}>
              <TouchableOpacity onPress={() =>key==selectedCheckbox? setSelectedCheckbox(-1):setSelectedCheckbox(key)}>
              <Image source={key==selectedCheckbox? images.liveTracking.ellipseClick : images.liveTracking.ellipse} />
              </TouchableOpacity>
              <Text style={[styles.textStyle,{marginVertical:hp(1),color:ColorConstant.BLACK}]}> {item}</Text>
            </View> )}
        </View>
          
      </View>

      <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:hp(4)}}>
          <Image style={{alignSelf:'flex-start'}} source={images.liveTracking.checkboxClick}></Image>
          <Text style={styles.notificationStyle}> {translate("Setting_Notification_string1")}</Text>
      </View>

      <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton}>
                <Text style={{textAlign:'center',color:ColorConstant.BLUE}}>{translate("Cancel")}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Alarms')} style={styles.nextButton}>
                <Text style={{textAlign:'center',color:ColorConstant.WHITE}}>{translate("Save")}</Text>
            </TouchableOpacity>
        </View> 
  </View>
      )
    }

const time = ['Every day(All hours)', 'Weekdays only(Monday-Friday,All hours)','Weekends only(Saturday-Sunday,All hours)' ]

const styles = StyleSheet.create({

container: {
  height:'100%',
  backgroundColor:ColorConstant.WHITE
},
header : {
  width:'100%',
  backgroundColor: ColorConstant.ORANGE,
  height:hp(7),
  borderColor: ColorConstant.GREY,
  alignItems:'center',
  alignSelf:'center',
  justifyContent:'center'
},
textStyle: {
  fontFamily:'Nunito-Regular',
  fontSize:FontSize.FontSize.small,
  color:ColorConstant.GREY
},
notificationStyle: {
  fontFamily:'Nunito-Regular',
  fontSize:12,
  color:ColorConstant.BLUE
},
outerStyle:{
  elevation:4,
  marginTop:hp(0.5),
  borderBottomColor:ColorConstant.GREY,
  borderBottomWidth:1,
  backgroundColor:ColorConstant.WHITE,
  borderRadius:4,
  shadowColor: ColorConstant.GREY,
  shadowOffset: {
    width: 0,
    height: 0
  },
  shadowRadius: 3,
  shadowOpacity: 1,
},
inputTextStyle: {
  borderRadius:4,
  elevation:4,
  borderColor:ColorConstant.GREY,
  borderWidth:1,
  paddingHorizontal:hp(1),
  backgroundColor:ColorConstant.WHITE,
  height:hp(6),
  marginTop:hp(2)
},
speedText: {
  fontSize: 12, 
  flex:1,
  color:ColorConstant.BLACK,
  fontFamily:'Nunito-Regular'
},
buttonContainer: {
    flexDirection:'row',
    justifyContent:'space-evenly',
    marginTop:hp(5),
    paddingHorizontal:hp(5),
    alignItems:'center'
},
cancelButton: {
    borderRadius:6,
    borderColor:ColorConstant.BLUE,
    borderWidth:1,
    backgroundColor:ColorConstant.WHITE,
    width:'35%',
    height:hp(6),
    justifyContent:'center'
},
nextButton: {
    borderRadius:6,
    backgroundColor:ColorConstant.BLUE,
    width:'35%',
    height:hp(6),
    justifyContent:'center'
},
});


export default AlarmType;