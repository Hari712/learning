import React, { useState ,Component, useEffect} from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, Dimensions, ScrollView, TextInput, RefreshControl, FlatList} from 'react-native';
import images from '../../../constants/images';
import { ColorConstant } from '../../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useDispatch, useSelector } from 'react-redux';
import AppManager from '../../../constants/AppManager';
import MultiSelectDevice, { MultiSelectGroup } from '../../../component/MultiSelect';
import { translate } from '../../../../App'
import { DropDown, MultiSelect, FontSize} from '../../../component';
import { SCREEN_CONSTANTS } from '../../../constants/AppConstants';


const CreateNew = ({navigation,route}) => {

  const dispatch = useDispatch()

  const [selectedDevice, setSelectedDevice] = useState([]);
  const [selectedAlarm, setSelectedAlarm] = useState()
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {    
    if(route){
      const editData = route.params;
      console.log("khushi",editData)
      if(editData){
        setSelectedDevice(editData.editData.asset)
        setSelectedAlarm(editData.editData.title)
    }}
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
<>
  <ScrollView contentContainerStyle={styles.container}>
    
      <TouchableOpacity style={styles.header}>
        <Text  style={{fontFamily:'Nunito-Bold',fontSize:16,color:ColorConstant.WHITE}}>{route.params?'Edit': 'Create New'}</Text>
      </TouchableOpacity>
      <View style={{paddingHorizontal:hp(4),marginTop:hp(3)}}>
        <MultiSelect 
                label={translate("Select_Device")}
                dataList={devicesList} 
                allText={translate("All_string")}
                hideSelectedDeviceLable={true}
                hideDeleteButton={true}
                rowStyle={styles.rowStyle}
                dropdownStyle={{height:hp(20)}}
                outerStyle={{marginTop:hp(2)}}
                valueSet={setSelectedDevice} 
                selectedData={selectedDevice}
                selectedItemContainerStyle={styles.selectedItemContainerStyle} 
                selectedItemRowStyle={styles.selectedItemRowStyle}
                deleteHandle={(item)=>setSelectedDevice(selectedDevice.filter((item1) => item1 != item))}
                />  
        <View style={{marginTop:hp(3), marginBottom:hp(12)}}>       
            <DropDown label={translate("Select Alarm")} defaultValue={selectedAlarm} valueSet={setSelectedAlarm} dataList={alarmList} />   
        </View>   
     </View>  

     {selectedDevice.length>0 && selectedAlarm ?
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton}>
                <Text style={{textAlign:'center',color:ColorConstant.BLUE}}>{translate("Cancel")}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate(SCREEN_CONSTANTS.ALARMS_TYPE,{alarmType:selectedAlarm, selectedDeviceList:selectedDevice})} style={styles.nextButton}>
                <Text style={{textAlign:'center',color:ColorConstant.WHITE}}>{translate("Next")}</Text>
            </TouchableOpacity>
        </View> : null }
  </ScrollView>
  </>
      )
    }

const devicesList = [
    'TrackPort International', 
    'TrackPort International1', 
    'TrackPort International2', 
    'TrackPort International3', 
    'TrackPort International4'
    ]

const alarmList = ['Overspeed','Movement','Ignition','Fuel'] ;

const styles = StyleSheet.create({

  container: {
    backgroundColor:ColorConstant.WHITE,
    flexGrow:1
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
    width:'100%',
    backgroundColor: ColorConstant.ORANGE,
    height:hp(7),
    borderColor: ColorConstant.GREY,
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center'
},
buttonContainer: {
    flexDirection:'row',
    justifyContent:'space-evenly',
    //width:'75%',
    //margin:hp(3),
    
    bottom:10,
    flex:1,
    alignItems:'flex-end'
},
cancelButton: {
    borderRadius:6,
    borderColor:ColorConstant.BLUE,
    borderWidth:1,
    backgroundColor:ColorConstant.WHITE,
    width:'30%',
    height:hp(6),
    justifyContent:'center'
},
nextButton: {
    borderRadius:6,
    backgroundColor:ColorConstant.BLUE,
    width:'30%',
    height:hp(6),
    justifyContent:'center'
},
selectedItemContainerStyle:{
    backgroundColor:ColorConstant.PINK,
    borderRadius:8,
    marginTop:hp(2),
    elevation:0,
    padding:hp(1)
  },
selectedItemRowStyle: {
flexDirection:'row',
elevation:4,
shadowColor: ColorConstant.GREY,
shadowOffset: {
    width: 0,
    height: 0
},
shadowRadius: 3,
shadowOpacity: 1,
backgroundColor:ColorConstant.LIGHTPINK,
borderRadius:5,
alignItems:'center',
paddingHorizontal:hp(1),
//flexWrap:'wrap',
margin:4,
height:hp(4),
},
  rowStyle: {
    borderBottomColor:ColorConstant.LIGHTGREY, 
    borderBottomWidth:1
  }
});


export default CreateNew;