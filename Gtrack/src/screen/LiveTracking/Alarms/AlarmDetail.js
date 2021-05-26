import React, { useState , useEffect} from 'react';
import { View, StyleSheet,Text,TouchableOpacity} from 'react-native';
import { ColorConstant } from '../../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FontSize }from '../../../component';
import { translate } from '../../../../App'
import { BackIcon, ListIcon } from '../../../component/SvgComponent';


const AlarmDetail = ({navigation,route}) => {

  const { data } = route.params

  const [webNotification, setWebNotification] = useState(false)
  const [emailNotification, setEmailNotification] = useState(false)

  useEffect(() => {
    switch (data.notification.notificators) {
      case "mail,web":
        setWebNotification(true)
        setEmailNotification(true)
        break;

      case "mail":
        setEmailNotification(true)
        break;

      case "web":
        setWebNotification(true)
        break;
    
      default:
        break;
    }
  },[data.notification.notificators])

  const user = Object.values(data.users).map((name,key) =>name.firstName+ ' ' +name.lastName )

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
            <View style={{flexWrap:'wrap',flexDirection:'row'}}>
            {data.devices.map((entry,key) =>
                <View key={key} style={styles.devices}>
                  <Text style={styles.deviceText}>{entry.deviceName}</Text>
                </View>
            )}
            </View>
        </View>
            
        <View style={{marginTop:hp(2)}}>
          <Text style={styles.textStyle}>{translate("Selected Users")}</Text>
          <View style={{flexGrow:1, flexWrap:'wrap', flexDirection:'row'}}>
            {user.length > 0 ? user.map((name)=>     
              <View style={styles.user}>
                <Text style={styles.deviceText}>{name}</Text>
              </View>) :
                <Text style={styles.deviceText}>-</Text>
            } 
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
                <Text style={[styles.textStyle,{marginTop:hp(1),color:ColorConstant.BLACK}]}>{webNotification && emailNotification ? "On" : webNotification ? "On" : "Off"}</Text>
            </View>
        </View>

            <View style={{marginTop:hp(1)}}>
                <Text style={styles.textStyle}>{translate("Email Notification")}</Text>
                <Text style={[styles.textStyle,{marginTop:hp(1),color:ColorConstant.BLACK}]}>{webNotification && emailNotification ? "On" : emailNotification ? "On" : "Off"}</Text>
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
    marginRight:hp(0.8),
    alignSelf: 'flex-start',
  },
  deviceText: {
    fontSize:12,
    fontFamily:'Nunito-Regular',
    paddingHorizontal:hp(2),
    paddingVertical: hp(0.1),
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