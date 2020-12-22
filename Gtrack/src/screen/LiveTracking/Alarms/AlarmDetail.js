import React, { useState ,Component, useEffect} from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, Dimensions, ScrollView, TextInput, RefreshControl, FlatList} from 'react-native';
import images from '../../../constants/images';
import { ColorConstant } from '../../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FontSize }from '../../../component';
import { useDispatch, useSelector } from 'react-redux';
import AppManager from '../../../constants/AppManager';
import { translate } from '../../../../App'
import { ListIcon } from '../../../component/SvgComponent';


const AlarmDetail = ({navigation,route}) => {

  const { data } = route.params
  const dispatch = useDispatch()

  const [isRefreshing, setIsRefreshing] = useState(false)

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
      <View style={styles.cardContainer}> 

        <View style={styles.detail}>
            <Text style={styles.detailText}>{translate("Details")}</Text>  
            <ListIcon width={13.284} height={17.379} style={{marginBottom:hp(1)}}/>
        </View>
       
        <View style={{flexDirection:'row',marginVertical:hp(2)}}>
            <View style={{flexDirection:'column',flex:2}}>
                <Text style={styles.textStyle}>{translate("Name")}</Text>
                <Text style={[styles.textStyle,{marginTop:hp(1),color:ColorConstant.BLACK}]}>{data.title}</Text>
            </View> 

            <View style={{flexDirection:'column',flex:2}}>
                <Text style={styles.textStyle}>{translate("Type")}</Text>
                <Text style={[styles.textStyle,{marginTop:hp(1),color:ColorConstant.BLACK}]}>{data.type}</Text>
            </View>
        </View>

        <View>
            <Text style={styles.textStyle}>{translate("Geofence_string14")}</Text>
            {data.asset.map((entry,key) =>
                <View key={key} style={styles.devices}>
                  <Text style={styles.deviceText}>{entry}</Text>
                </View>
            )}
        </View>

        <View style={{marginTop:hp(2)}}>
          <Text style={styles.textStyle}>{translate("Selected Users")}</Text>
          <View style={{flexGrow:1, flexDirection:'row'}}>
            {Name.map((name,key) =>
              <View key={key} style={styles.user}>
                <Text style={styles.deviceText}>{name}</Text>
              </View>)}
          </View>
        </View>

        <View style={{flexDirection:'row',marginVertical:hp(2)}}>
            <View style={{flexDirection:'column',flex:2}}>
                <Text style={styles.textStyle}>{translate("Time")}</Text>
                <Text style={[styles.textStyle,{marginTop:hp(1),color:ColorConstant.BLACK}]}>{data.duration}</Text>
            </View> 

            <View style={{flexDirection:'column',flex:1.5}}>
                <Text style={styles.textStyle}>{translate("Web Notification")}</Text>
                <Text style={[styles.textStyle,{marginTop:hp(1),color:ColorConstant.BLACK}]}>No</Text>
            </View>
        </View>

      </View>
  </View>
      )
    }
const DATA = [
    {
        title: 'Speed',
        type: 'Overspeed Alarm',
        asset: ['TrackPort International'],
        duration: 'Weekdays(Monday-Friday, All hours)'
    },
    {
        title: 'Emergency',
        type: 'Panic Alarm',
        asset: ['Spark Nano 7 GPS Tracker', 'TrackPort International', 'TrackPort 4G Vehicle GPS Tracker'],
        duration: 'Everyday(All hours)'
    },
    
];

const Name = ['John Smith','Johnny clark']

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