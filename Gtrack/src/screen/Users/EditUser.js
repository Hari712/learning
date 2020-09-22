import React, { useState ,Component} from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, Dimensions, ScrollView, TextInput} from 'react-native';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize';
import NavigationService from '../../navigation/NavigationService';
import TextField from '../../component/TextField';
import DropDown from '../../component/DropDown';
import MultiSelect from '../../component/MultiSelect'

const EditUser = ({navigation}) => {
 
  const [name, setName]= useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [infoClick, setInfoClick] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [role, setRole] = useState();

  const Data =['Home','Fedex Ground']

  React.useLayoutEffect(() => {

    navigation.setOptions({
        headerTitle: () => (
            <Text style={{
                color:ColorConstant.GREY,
                fontSize: FontSize.FontSize.medium,
                fontWeight: '500',
                //letterSpacing: 0,
                textAlign:'center' }}>
                Users
            </Text>          
        ),  
        headerLeft:() => (
            <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Image style={{marginLeft:hp(2)}} source={images.image.back}/>
            </TouchableOpacity>
        )  
    });
  });

  const info = () => {
    return(
      <View style={{backgroundColor:ColorConstant.PINK,borderRadius:2,marginVertical:hp(2),padding:hp(2)}}>
        <Text style={{fontSize:hp(1.3),textAlign:'center',color:ColorConstant.GREY}}>As per the selected role, access rights will be assign as :</Text>
        <View style={{flexDirection:'row',padding:6}}>
          <Text style={{fontSize:FontSize.FontSize.small,color:ColorConstant.BLACK,flex:0.5,flexWrap:'wrap'}}>Regular Role</Text>
          <Text style={{fontSize:hp(1.3),color:ColorConstant.GREY,flex:1}}>Can only view the movement of the object</Text>
        </View>
        <View style={{flexDirection:'row',padding:6}}>
          <Text style={{fontSize:FontSize.FontSize.small,color:ColorConstant.BLACK,flex:0.5,flexWrap:'wrap'}}>Owner Role</Text>
          <Text style={{fontSize:hp(1.3),color:ColorConstant.GREY,flex:1}}>Can change the subscription plan,assets and can add users </Text>
        </View>
      </View>
    )
  }

  // const deleteFunction = (item, key) => {
  //   console.log('Testing Success', item, key)
  //   setDeleteDeviceKey(key)
  //   setDialogVisible(true)
  // }

return ( 
    <View style={styles.container}>
        <TouchableOpacity style={styles.addButton}>
            <Text>Add User</Text>
        </TouchableOpacity>

        <View style={styles.subContainer}>
          <ScrollView>
          <TextField 
            label='Name*' 
            valueSet={setName} 
            defaultValue={name} 
            outerStyle={styles.outerStyle} 
          /> 

          <TextField 
            label='Last Name*' 
            valueSet={setLastName} 
            defaultValue={lastName} 
            outerStyle={[styles.outerStyle,{marginTop:hp(2)}]} 
          /> 
          <TextField 
            label='Email Address*' 
            valueSet={setEmail} 
            defaultValue={email} 
            outerStyle={[styles.outerStyle,{marginTop:hp(2)}]} 
          /> 
          <View style={{flexDirection:'row', marginTop:hp(2)}}>
            <View style={{flex: 1}}>
              <DropDown 
                label='Assign Role*'
                defaultValue={role}
                valueSet={setRole}
                dataList={['Regular','Owner']} 
                outerStyle={[styles.outerStyle]} 
                dropdownStyle={styles.dropdownStyle} 
                dataRowStyle={styles.dataRowStyle}
                dataTextStyle={{padding:3}}
                />
            </View>
            <TouchableOpacity onPress={()=>setInfoClick(!infoClick)} style={{paddingHorizontal:hp(2), paddingVertical:hp(2.5)}}>
              <Image source={infoClick?images.user.infoClick: images.user.info}/>
            </TouchableOpacity>
              
          </View>

          {infoClick?
                info()
              :null}

          <MultiSelect 
            label='Group Access' 
            dataList={Data} 
            allText='All' 
            hideSelectedDeviceLable={true}
            hideDeleteButton={true}
            rowStyle={{borderBottomColor:ColorConstant.LIGHTGREY, borderBottomWidth:1}}
            dropdownStyle={{height:'20%'}}
            outerStyle={[styles.outerStyle,{marginTop:hp(2)}]}
            valueSet={setSelectedGroup} 
            selectedData={selectedGroup}
            selectedItemContainerStyle={styles.selectedItemContainerStyle} 
            selectedItemRowStyle={styles.selectedItemRowStyle}
            //deleteHandle={deleteFunction}
            />

          <TouchableOpacity disabled={!(name && lastName && email && role)} style={{backgroundColor:name && email ? ColorConstant.BLUE : ColorConstant.LIGHTGREY ,marginTop:hp(2),height:hp(6),width:'85%',justifyContent:'center',alignSelf:'center',borderRadius:5}}>
            <Text style={{textAlign:'center',color:ColorConstant.WHITE,fontWeight:'bold'}}>Save</Text>
          </TouchableOpacity>
          </ScrollView>
        </View>
    </View>
      
        
      )
    }



const styles = StyleSheet.create({

container: {
  height:"100%",
  alignItems:'center',
  backgroundColor:ColorConstant.WHITE
},
subContainer: {
  width:'85%',
  marginVertical: hp(2),
  alignSelf: 'center',
},
outerStyle:{
  elevation:4,
  backgroundColor:ColorConstant.WHITE,
  borderRadius:7
},
dropdownStyle: {
  position:'relative', 
  top:hp(0.1), 
  width:'116%', 
  left:wp(5.5),
  marginBottom:hp(3)
},
dataRowStyle: {
  borderBottomWidth:1,borderBottomColor:ColorConstant.GREY
},
activeText : {
  fontSize:FontSize.FontSize.small,
  color:ColorConstant.WHITE,
  paddingHorizontal:hp(1)
},
horizontalLine:{
  borderBottomWidth:0.5,
  width:'90%',
  alignSelf:'center',
  borderBottomColor:ColorConstant.GREY
},
addButton : {
    backgroundColor:ColorConstant.ORANGE,
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    height:hp(8),
},
textStyle:{
  margin:hp(0.5),
  color:ColorConstant.BLUE,
  textAlignVertical:'center',
  paddingLeft:hp(0.5)
},
selectedItemRowStyle: {
  flexDirection:'row',
  elevation:4,
  backgroundColor:ColorConstant.LIGHTPINK,
  borderRadius:5,
  alignItems:'center',
  paddingHorizontal:hp(1),
  //flexWrap:'wrap',
  margin:4,
  height:hp(4),
},
selectedItemContainerStyle:{
  backgroundColor:ColorConstant.PINK,
  borderRadius:8,
  marginTop:hp(2),
  elevation:0,
  padding:hp(1)
}
});


export default EditUser;