import React, { useState ,Component, useEffect} from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, Dimensions, ScrollView, TextInput, I18nManager} from 'react-native';
import images from '../../../constants/images';
import { ColorConstant } from '../../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { translate } from '../../../../App';
import { FontSize } from '../../../component';
import { RadioButtonIcon,  RadioButtonIconClicked,
    ToggleButtonIcon,  ToggleButtonIconClicked,
    NextArrowIcon,  NextArrowIconClicked, BackIcon } from '../../../component/SvgComponent';
import AppManager from '../../../constants/AppManager';
import * as SettingsActions from '../Settings.Action'
import { getLoginState, getAdvanceSettingsInfo } from '../../Selector';
import { useDispatch, useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

const LanguagesArr = ["ENGLISH", "FRENCH"]
const TempArr = ["CELSIUS","FAHRENHEIT"]
const TimeZoneArr = ["IST","EST"]
const DistanceArr = ["MILES","KILOMETER"]

const AdvanceSettings = ({navigation,route}) => {

  const [isToggleClick,setIsToggleClick] = useState(false)
  const [isLanguageClick,setIsLanguageClick] = useState(false)
  const [isUnitClick,setIsUnitClick] = useState(false)
  const [language,setLanguage] = useState()
  const [timeZone,setTimeZone] = useState()
  const [distance,setDistance] = useState()
  const [settingsID,setSettingsID] = useState()
  const [temperature,setTemperature] = useState()

  const { loginData, settingsData, isConnected } = useSelector(state => ({
    loginData: getLoginState(state),
    isConnected: state.network.isConnected,
    settingsData: getAdvanceSettingsInfo(state)
  }))

  console.log("khushi",settingsData)

  const dispatch = useDispatch()

  useEffect(() => { 
    if(!isEmpty(settingsData)){
      setLanguage(settingsData.language)
      setTimeZone(settingsData.timeZone)
      setDistance(settingsData.distance)
      setSettingsID(settingsData.id)
      setTemperature(settingsData.temprature)
    }
    
  },[settingsData])

  const onTapSave = () => { 
    if(isConnected) {
      const requestBody = {
        distance: distance,
        id: settingsID,
        language: language,
        temprature: temperature,
        timeZone: timeZone,
      }
      AppManager.showLoader() 
      dispatch(SettingsActions.requestAdvanceSettings(loginData.id, requestBody, onSuccess, onError))
    } 
  }

  React.useLayoutEffect(() => {

    navigation.setOptions({
        headerTitle: () => (
            <Text style={{
                color:ColorConstant.GREY,
                fontSize: FontSize.FontSize.medium,
                fontWeight: '500',
                //letterSpacing: 0,
                textAlign:'center' }}>
                {translate("Settings")}
            </Text>          
        ),  
        headerRight: () => (
          <TouchableOpacity  style={{paddingRight:hp(2)}} onPress={() => onTapSave()}>
              <Text style={{color: ColorConstant.ORANGE }}>Save</Text>
          </TouchableOpacity>
      ),
        headerLeft:() => (
          <TouchableOpacity style={{padding:hp(2)}} onPress={() => navigation.goBack()}>
              <BackIcon />
          </TouchableOpacity>
        )  
    });
  },[navigation,onTapSave]);

  function onGetSuccess(data) {    
    console.log("Success",data) 
    const {result} = data

    setLanguage(result.language)
    setTimeZone(result.timeZone)
    setDistance(result.distance)
    setSettingsID(result.id)
    setTemperature(result.temprature)

    AppManager.hideLoader()
  }



  function onSuccess(data) {    
    console.log("Success",data) 
    AppManager.showSimpleMessage('success', { message: 'Settings Updated Successfully', description: '' })
    AppManager.hideLoader()
  }

  function onError(error) {
      AppManager.hideLoader()
      AppManager.showSimpleMessage('danger', { message: error, description: '' })
      console.log("Error",error)  
  }

return ( 
    <View style={styles.container}>
        <View style={{width:'100%'}}>
            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.headerTitle}> {translate("Advance Settings")} </Text>
            </TouchableOpacity>
        </View>

        <View style={{marginVertical:hp(2),paddingHorizontal:hp(3)}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{height:hp(6)}}>
                    <Text style={styles.textStyle}>{translate("Select_language")}</Text>
                    <Text style={styles.subText}>{language}</Text>
                </View>
                <TouchableOpacity style={{alignSelf:'center'}} onPress={()=>setIsLanguageClick(!isLanguageClick)}>
                  { 
                    isLanguageClick ?
                      <NextArrowIconClicked /> :
                      <NextArrowIcon />
                  }
                </TouchableOpacity>
            </View>

            {isLanguageClick?
                <View style={{flexDirection:'row'}}>

                  {LanguagesArr.map((item,key)=>{
                    return(
                      <TouchableOpacity key={key} onPress={()=>{setLanguage(item)}} style={{flexDirection:'row',flex:1}}>
                        {language == item?<RadioButtonIconClicked />:<RadioButtonIcon />}
                        <Text style={styles.language}> {item}</Text>
                      </TouchableOpacity>
                    )
                  })}

                </View>
                
                :null}

            <View style={[styles.unitContainer,{alignItems:'center'}]}>
                <View style={{height:hp(6)}}>
                    <Text style={styles.textStyle}>{translate("Automatic_time_zone")}</Text>
                    <Text style={styles.subText}>Use network provided time</Text> 
                </View>
                <TouchableOpacity onPress={() => setIsToggleClick(!isToggleClick)} style={{alignSelf:'center'}}>
                  {
                    isToggleClick ?
                    <ToggleButtonIcon /> :
                    <ToggleButtonIconClicked />
                  }
                </TouchableOpacity>
            </View>

            {isToggleClick?
                <View style={{justifyContent:'space-between',marginVertical:hp(2)}}>
                    <Text style={styles.textStyle}>{translate("Select_time_zone")}</Text>
                    
                    <View style={{flexDirection:'row',marginTop:hp(1),alignItems:'center'}}>
                      {
                        TimeZoneArr.map((item,key)=>{
                          return(
                            <TouchableOpacity key={key} onPress={()=>{setTimeZone(item)}} style={{flexDirection:'row',flex:0.6}}>
                              {item===timeZone ? <RadioButtonIconClicked /> : <RadioButtonIcon />}
                              <Text style={styles.unitText}>{item=="IST"?"India/Calcutta":"America/Toronto"}</Text>
                            </TouchableOpacity>                                  
                          )
                        })
                      }
                    </View>
                </View>:null}
          
            <View style={styles.unitContainer}>
                <Text style={styles.unit}>{translate("Units")}</Text>
                <TouchableOpacity onPress={()=>setIsUnitClick(!isUnitClick)}>
                  {
                    isUnitClick ? 
                      <NextArrowIconClicked />:
                      <NextArrowIcon />
                  }
                </TouchableOpacity>
            </View>

            {isUnitClick?
                <View style={{marginTop:hp(2)}}>
                    <View>
                        <Text style={[styles.language,{color:ColorConstant.BLUE}]}>{translate("Distance")}</Text>
                        <View style={{flexDirection:'row',marginTop:hp(1),alignItems:'center'}}>

                            {
                              DistanceArr.map((item,key)=>{
                                return(
                                  <TouchableOpacity key={key} onPress={()=>{setDistance(item)}} style={{flexDirection:'row',flex:0.3}}>
                                    {item===distance ? <RadioButtonIconClicked /> : <RadioButtonIcon />}
                                    <Text style={styles.unitText}>{item}</Text>
                                  </TouchableOpacity>                                  
                                )
                              })
                            }
                            
                        </View>  
                    </View>

                    <View style={{marginTop:hp(3)}}>
                        <Text style={[styles.language,{color:ColorConstant.BLUE}]}>{translate("Temperature")}</Text>
                        <View style={{flexDirection:'row',marginTop:hp(1),alignItems:'center'}}>

                          {
                            TempArr.map((item)=>{
                              return(
                                <TouchableOpacity onPress={()=>{setTemperature(item)}} style={{flexDirection:'row',flex:0.3}}>
                                  {item===temperature ? <RadioButtonIconClicked /> : <RadioButtonIcon />}
                                  <Text style={styles.unitText}>{item}</Text>
                                </TouchableOpacity>                                  
                              )
                            })
                          }
                            
                        </View>  
                    </View>
                </View>:null}

        </View>  
      
    </View>
      
      )
    }



const styles = StyleSheet.create({

  container: {
    backgroundColor:ColorConstant.WHITE,
    flex:1
  },
  textStyle: {
    fontSize:12,
    fontFamily:'Nunito-Regular',
    color:ColorConstant.BLACK
  },
  unitContainer: {
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:hp(2)
  },
  subText: {
    fontSize:10,
    fontFamily:'Nunito-Italic',
    color:ColorConstant.BLACK
  },
  unit: {
    fontSize:12,
    fontFamily:'Nunito-SemiBold',
    color:ColorConstant.BLACK
  },
  language: {
    fontSize:12,
    fontFamily:'Nunito-Regular',
    color:ColorConstant.ORANGE
  },
  unitText: {
    fontSize:10,
    flex:1,
    fontFamily:'Nunito-Regular',
    color:ColorConstant.ORANGE
  },
  headerTitle: {
    fontFamily:'Nunito-Bold',
    fontSize:16,
    color:ColorConstant.WHITE
  },
  addButton : {
    backgroundColor:ColorConstant.ORANGE,
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    height:hp(5),
  
  }
});


export default AdvanceSettings;