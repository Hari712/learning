import React, { useState ,Component, useEffect} from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, Dimensions, ScrollView, TextInput, RefreshControl, FlatList} from 'react-native';
import images from '../../../constants/images';
import { ColorConstant } from '../../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../../component/FontSize';
import { useDispatch, useSelector } from 'react-redux';
import { translate } from '../../../../App'


const Alarms = ({navigation}) => {


  const dispatch = useDispatch()

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [list, setList] = useState(DATA);

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

  function handleRemove(id) {
    const newList = list.filter((item) => item.id !== id); 
    setList(newList);
  }

  const renderItem = ({item,key}) => {
    return(  
    <View style={styles.cardContainer} key={key}>
      <TouchableOpacity onPress={() => navigation.navigate('AlarmDetail',{data:item})}>
          {/* Blue top head */}
          <View style={styles.blueBox}>
              <View style={{flex:1}}>
                <Text style={styles.blueBoxTitle}>{item.title}</Text>
                <Text style={[styles.blueBoxTitle,{fontFamily:'Nunito-Regular'}]}>{item.type}</Text>
              </View>
              <TouchableOpacity style={{zIndex:5, padding: hp(1.5)}} onPress={()=>{navigation.navigate('CreateNew',{editData:item})}}>
                <Image source={images.liveTracking.edit} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleRemove(item.id)} style={{zIndex:5, padding:hp(1)}} >
                <Image source={images.liveTracking.trash} /> 
              </TouchableOpacity>       
          </View>
          

          {/* White Body container */}
          <View style={styles.whiteContainer}>
            {item.asset.map((entry,key) =>
              <View key={key} style={styles.whiteSubView}>
                <Text style={styles.assetText}>{entry}</Text>
              </View>
            )}
          </View>

          {/* Duration*/}
          <View style={styles.horizontalLine} />
            <View style={styles.duration}>
                <Text style={styles.durationText}>{item.duration}</Text>
          </View>
        </TouchableOpacity>
    </View>
    )   
  }

    const onRefresh = () => {
      setIsRefreshing(true) 
  }


return ( 
  <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('CreateNew')} style={styles.header}>
        <Text  style={{fontFamily:'Nunito-Bold',fontSize:16,color:ColorConstant.WHITE}}>{translate("Geofence_string")}</Text>
      </TouchableOpacity>

      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl 
            refreshing={isRefreshing}
            onRefresh={onRefresh}     
          />
        }
      />

  </View>
      )
    }
const DATA = [
    {
        id: 0,
        title: 'Speed',
        type: 'Overspeed Alarm',
        asset: ['TrackPort International'],
        duration: 'Weekdays(Monday-Friday, All hours)'
    },
    {
        id: 1,
        title: 'Emergency',
        type: 'Panic Alarm',
        asset: ['Spark Nano 7 GPS Tracker', 'TrackPort International', 'TrackPort 4G Vehicle GPS Tracker'],
        duration: 'Everyday(All hours)'
    },
    
];


const styles = StyleSheet.create({

  container: {
    height:'100%'
  },
  cardContainer: {
    width:'90%',
    marginVertical: hp(1.5),
    alignSelf: 'center',
    backgroundColor: ColorConstant.WHITE,
    borderRadius: 12,
    elevation:3,
    borderColor: ColorConstant.GREY,
    shadowColor:ColorConstant.GREY,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
},
header : {
    width:'90%',
    backgroundColor: ColorConstant.ORANGE,
    borderRadius: 12,
    height:hp(6),
    borderWidth: 0.3,
    borderColor: ColorConstant.GREY,
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
    marginVertical:hp(3)
},
blueBox : {
  backgroundColor:ColorConstant.BLUE,
  alignItems:'center',
  height:hp(6),
  flexDirection:'row',
  width:"100%",
  borderTopLeftRadius:12,
  borderTopRightRadius:12,
  paddingHorizontal:hp(3),
  paddingVertical:hp(0.3)
},
blueBoxTitle :{
  color:ColorConstant.WHITE,
  fontSize:12,
  //fontSize:FontSize.FontSize.small,
  flex:1,
  fontFamily:'Nunito-Bold'
},
whiteContainer : {
  flexDirection:'row',
  flexWrap:'wrap'
},
whiteSubView : {
  backgroundColor:ColorConstant.PINK,
  borderRadius:10, 
  marginLeft:hp(2),
  marginVertical:hp(0.8),
  alignItems:'center'
},
assetText: {
  fontSize:10,
  paddingVertical:hp(0.5),
  paddingHorizontal:hp(1),
  fontFamily:'Nunito-Regular',
  color:ColorConstant.ORANGE
},
horizontalLine:{
  borderBottomWidth:0.5,
  width:'90%',
  alignSelf:'center',
  borderBottomColor:ColorConstant.GREY
},
duration : {
  //flexDirection:'row',
  marginTop:hp(1.5),
  paddingHorizontal:hp(2.5),
  paddingBottom:hp(1.5),
  alignItems:'center'
},
durationText: {
  fontSize:10,
  fontFamily:'Nunito-Regular',
  color:ColorConstant.GREY
},
});


export default Alarms;