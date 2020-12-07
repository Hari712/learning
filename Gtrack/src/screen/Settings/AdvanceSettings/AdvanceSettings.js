import React, { useState ,Component} from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, Dimensions, ScrollView, TextInput, I18nManager} from 'react-native';
import images from '../../../constants/images';
import { ColorConstant } from '../../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../../component/FontSize';
import { translate } from '../../../../App';
import * as RNLocalize from "react-native-localize";


const AdvanceSettings = ({navigation,route}) => {

  const [isToggleClick,setIsToggleClick] = useState(false)
  const [isLanguageClick,setIsLanguageClick] = useState(false)
  const [isUnitClick,setIsUnitClick] = useState(false)


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
        headerLeft:() => (
            <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Image style={{marginLeft:hp(2)}} source={images.image.back}/>
            </TouchableOpacity>
        )  
    });
  },[navigation]);


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
                    <Text style={styles.subText}>English</Text>
                </View>
                <TouchableOpacity style={{alignSelf:'center'}} onPress={()=>setIsLanguageClick(!isLanguageClick)}>
                  <Image source={isLanguageClick?images.image.settings.down :images.image.settings.arrow} />
                </TouchableOpacity>
            </View>

            {isLanguageClick?
                <View style={{flexDirection:'row'}}>
                    <View style={{flexDirection:'row',flex:1}}>
                        <Image source={images.image.settings.ellipseClick} />
                        <Text style={styles.language}> English</Text>
                    </View>
                    <View style={{flexDirection:'row',flex:2}}>
                        <Image source={images.image.settings.ellipse} />
                        <Text style={styles.language}> French</Text>
                    </View>
                </View>
                
                :null}

            <View style={[styles.unitContainer,{alignItems:'center'}]}>
                <View style={{height:hp(6)}}>
                    <Text style={styles.textStyle}>{translate("Automatic_time_zone")}</Text>
                    <Text style={styles.subText}>Use network provided time</Text> 
                </View>
                <TouchableOpacity onPress={() => setIsToggleClick(!isToggleClick)} style={{alignSelf:'center'}}>
                <Image source={isToggleClick? images.image.settings.toggleOff : images.image.settings.toggleOn} />
                </TouchableOpacity>
            </View>

            {isToggleClick?
                <View style={{justifyContent:'space-between',marginVertical:hp(2)}}>
                    <Text style={styles.textStyle}>{translate("Select_time_zone")}</Text>
                    <Text style={styles.subText}>(GMT-07:00)Vancouver</Text>
                </View>:null}
          
            <View style={styles.unitContainer}>
                <Text style={styles.unit}>{translate("Units")}</Text>
                <TouchableOpacity onPress={()=>setIsUnitClick(!isUnitClick)}>
                    <Image  source={isUnitClick?images.image.settings.down : images.image.settings.arrow} />
                </TouchableOpacity>
            </View>

            {isUnitClick?
                <View style={{marginTop:hp(2)}}>
                    <View>
                        <Text style={[styles.language,{color:ColorConstant.BLUE}]}>{translate("Distance")}</Text>
                        <View style={{flexDirection:'row',marginTop:hp(1),alignItems:'center'}}>
                            <Image source={images.image.settings.ellipseClick} />
                            <Text style={styles.unitText}>{translate("Miles")}</Text>
                            <Image source={images.image.settings.ellipse} />
                            <Text style={[styles.unitText,{flex:2}]}>{translate("Kilometer")}</Text>
                        </View>  
                    </View>

                    <View style={{marginTop:hp(3)}}>
                        <Text style={[styles.language,{color:ColorConstant.BLUE}]}>{translate("Temperature")}</Text>
                        <View style={{flexDirection:'row',marginTop:hp(1),alignItems:'center'}}>
                            <Image source={images.image.settings.ellipseClick} />
                            <Text style={styles.unitText}>{translate("Celsius")} </Text>
                            <Image source={images.image.settings.ellipse} />
                            <Text style={[styles.unitText,{flex:2}]}>{translate("Fahrenheit")}</Text>
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