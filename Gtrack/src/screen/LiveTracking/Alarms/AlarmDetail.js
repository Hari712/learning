import React, { useState ,Component, useEffect} from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, Dimensions, ScrollView, TextInput, RefreshControl, FlatList} from 'react-native';
import images from '../../../constants/images';
import { ColorConstant } from '../../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FontSize }from '../../../component';
import { useDispatch, useSelector } from 'react-redux';
import AppManager from '../../../constants/AppManager';
import { translate } from '../../../../App'
import { BackIcon, ListIcon } from '../../../component/SvgComponent';


const AlarmDetail = ({navigation,route}) => {

  const { data } = route.params

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
          <TouchableOpacity style={{padding:hp(2)}} onPress={() => navigation.goBack()}>
            <BackIcon />
          </TouchableOpacity>
        )  
    });
  },[navigation]);

return ( 
  <View style={styles.container}>
      <View style={styles.cardContainer}> 

        <View style={styles.detail}>
            <Text style={styles.detailText}>{translate("Details")}</Text>  
            <ListIcon width={13.284} height={17.379} style={{marginBottom:hp(1)}}/>
        </View>
       
        <View style={{flexDirection:'row',marginVertical:hp(2)}}>
            <View style={{flexDirection:'column',flex:2}}>
                <Text style={styles.textStyle}>{translate("Name")}</Text>
                <Text style={[styles.textStyle,{marginTop:hp(1),color:ColorConstant.BLACK}]}>{data.notification.attributes.name}</Text>
            </View> 

            <View style={{flexDirection:'column',flex:2}}>
                <Text style={styles.textStyle}>{translate("Type")}</Text>
                <Text style={[styles.textStyle,{marginTop:hp(1),color:ColorConstant.BLACK}]}>{data.notification.type}</Text>
            </View>
        </View>

        <View>
            <Text style={styles.textStyle}>{translate("Selected Devices")}</Text> 
            {data.devices.map((entry,key) =>
                <View key={key} style={styles.devices}>
                  <Text style={styles.deviceText}>{entry.deviceName}</Text>
                </View>
            )}
        </View>

        <View style={{marginTop:hp(2)}}>
          <Text style={styles.textStyle}>{translate("Selected Users")}</Text>
          <View style={{flexGrow:1, flexWrap:'wrap', flexDirection:'row'}}>      
            {Object.values(data.users).map((name,key) =>
              <View key={key} style={styles.user}>
                <Text style={styles.deviceText}>{name.firstName} {name.lastName}</Text>
              </View>)}
          </View>
        </View>

        <View style={{flexDirection:'row',marginVertical:hp(2)}}>
            <View style={{flexDirection:'column',flex:2}}>
                <Text style={styles.textStyle}>{translate("Time")}</Text>
                <Text style={[styles.textStyle,{marginTop:hp(1),color:ColorConstant.BLACK}]}>
                {data.notification.attributes.everyday ? 
                    "Everyday (All hours)" : 
                     data.notification.attributes.weekdays ? "Weekdays(Monday-Friday, All hours)" : "Weekends(Saturday-Sunday, All hours)" }                
                </Text>
            </View> 

            <View style={{flexDirection:'column',flex:1.5}}>
                <Text style={styles.textStyle}>{translate("Web Notification")}</Text>
                <Text style={[styles.textStyle,{marginTop:hp(1),color:ColorConstant.BLACK}]}>{data.notification.attributes.notificators ? "On" : "Off"}</Text>
            </View>
        </View>

      </View>
  </View>
      )
    }

const styles = StyleSheet.create({

  container: {
    flex:1,
    backgroundColor:ColorConstant.WHITE,
  },
  cardContainer: {
    borderRadius:7,
    borderColor:ColorConstant.GREY,
    backgroundColor:ColorConstant.WHITE,
    borderWidth:0.4,
    marginTop:hp(4),
    padding:hp(2),
    marginHorizontal:hp(3),
  },
  detail: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderBottomWidth:0.5,
    borderBottomColor:ColorConstant.GREY
  },
  textStyle: {
    color:ColorConstant.GREY,
    fontSize:12,
    fontFamily:'Nunito-Regular' 
  },
  user: {
    backgroundColor:ColorConstant.LIGHTBLUE,
    borderRadius:5,
    marginVertical:hp(1),
    alignSelf: 'flex-start',
    marginEnd:hp(2)
  },
  devices: {
    backgroundColor:ColorConstant.PINK,
    borderRadius:5,
    marginVertical:hp(1),
    alignSelf: 'flex-start'
  },
  deviceText: {
    fontSize:12,
    fontFamily:'Nunito-Regular',
    paddingHorizontal:hp(2),
    paddingVertical: hp(0.1)
  },
  detailText: {
    color:ColorConstant.GREY,
    fontSize:13,
    fontFamily:'Nunito-Regular',
    marginBottom:hp(1),
    color:ColorConstant.BLUE
  }
});


export default AlarmDetail;