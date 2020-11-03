import React, { useState ,Component, useEffect} from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, Dimensions, ScrollView, TextInput, RefreshControl, FlatList} from 'react-native';
import images from '../../../constants/images';
import { ColorConstant } from '../../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../../component/FontSize';
import { useDispatch, useSelector } from 'react-redux';
import AppManager from '../../../constants/AppManager';


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
                Alarms
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
      <View style={styles.cardContainer}> 

        <View style={styles.detail}>
            <Text style={styles.detailText}>Details</Text>  
            <Image style={{marginBottom:hp(1)}} source={images.liveTracking.list} /> 
        </View>
       
        <View style={{flexDirection:'row',marginVertical:hp(2)}}>
            <View style={{flexDirection:'column',flex:2}}>
                <Text style={styles.textStyle}>Name</Text>
                <Text style={[styles.textStyle,{marginTop:hp(1),color:ColorConstant.BLACK}]}>{data.title}</Text>
            </View> 

            <View style={{flexDirection:'column',flex:2}}>
                <Text style={styles.textStyle}>Type</Text>
                <Text style={[styles.textStyle,{marginTop:hp(1),color:ColorConstant.BLACK}]}>{data.type}</Text>
            </View>
        </View>

        <View>
            <Text style={styles.textStyle}>Selected Device</Text>
            {data.asset.map((entry,key) =>
                <View key={key} style={styles.devices}>
                <Text style={styles.deviceText}>{entry}</Text>
                </View>
            )}
        </View>

        <View style={{marginTop:hp(2),flexWrap:'wrap'}}>
           <Text style={styles.textStyle}>Selected Users</Text>
           <View style={styles.user}>
            <Text style={styles.deviceText}>John Smith</Text>
           </View>
        </View>

        <View style={{flexDirection:'row',marginVertical:hp(2)}}>
            <View style={{flexDirection:'column',flex:2}}>
                <Text style={styles.textStyle}>Time</Text>
                <Text style={[styles.textStyle,{marginTop:hp(1),color:ColorConstant.BLACK}]}>{data.duration}</Text>
            </View> 

            <View style={{flexDirection:'column',flex:1.5}}>
                <Text style={styles.textStyle}>Web Notification</Text>
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
    marginTop:hp(3),
    padding:hp(2),
    marginHorizontal:hp(4),
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
    borderRadius:10,
    marginVertical:hp(1),
  },
  devices: {
    backgroundColor:ColorConstant.PINK,
    borderRadius:10,
    marginVertical:hp(1)
  },
  deviceText: {
    fontSize:12,
    fontFamily:'Nunito-Regular',
    paddingHorizontal:hp(2)
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