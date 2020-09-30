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

const AddUser = ({navigation,route}) => {
 
  const [firstName, setFirstName]= useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [infoClick, setInfoClick] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [role, setRole] = useState();

  const Data =['Home','Fedex Ground']

  React.useEffect(() => {
    if(route){
      const editData = route.params;
      console.log("Editdata",editData)
      if(editData){
        setFirstName(editData.editData.firstName)
        setLastName(editData.editData.lastName)
        setEmail(editData.editData.email)
        setRole(editData.editData.role)
        setSelectedGroup(editData.editData.group)
    }}
  },[])

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
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>As per the selected role, access rights will be assign as :</Text>
        <View style={styles.infoSubContainer}>
          <Text style={styles.role}>Regular Role</Text>
          <Text style={styles.roleSubText}>Can only view the movement of the object</Text>
        </View>
        <View style={styles.infoSubContainer}>
          <Text style={styles.role}>Owner Role</Text>
          <Text style={styles.roleSubText}>Can change the subscription plan,assets and can add users </Text>
        </View>
      </View>
    )
  }

return ( 
    <View style={styles.container}>
        <TouchableOpacity style={styles.addButton}>
            <Text>{route.params?'Edit User': 'Add User'}</Text>
        </TouchableOpacity>

        <View style={styles.subContainer}>
          <ScrollView>
          <TextField 
            label='Name*' 
            valueSet={setFirstName} 
            defaultValue={firstName} 
            outerStyle={styles.outerStyle} 
          /> 

          <TextField 
            label='Last Name*' 
            valueSet={setLastName} 
            defaultValue={lastName} 
            outerStyle={[styles.outerStyle,{marginTop:hp(4)}]} 
          /> 
          <TextField 
            label='Email Address*' 
            valueSet={setEmail} 
            defaultValue={email} 
            outerStyle={[styles.outerStyle,{marginTop:hp(4)}]} 
          /> 
          <View style={styles.dropDown}>
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
            <TouchableOpacity onPress={()=>setInfoClick(!infoClick)} style={styles.infoButton}>
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
            rowStyle={styles.rowStyle}
            dropdownStyle={{height:'20%'}}
            outerStyle={[styles.outerStyle,{marginTop:hp(4)}]}
            valueSet={setSelectedGroup} 
            selectedData={selectedGroup}
            selectedItemContainerStyle={styles.selectedItemContainerStyle} 
            selectedItemRowStyle={styles.selectedItemRowStyle}
            deleteHandle={(item,key)=>setSelectedGroup(selectedGroup.filter((item1,key1) => key1 != key))}
            />

          <TouchableOpacity disabled={!(firstName && lastName && email && role)} style={[styles.saveButtonConatiner,{backgroundColor:firstName && lastName && email && role ? ColorConstant.BLUE : ColorConstant.LIGHTGREY}]}>
            <Text style={styles.saveText}>Save</Text>
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
  marginVertical: hp(4),
  alignSelf: 'center',
},
outerStyle:{
  elevation:4,
  backgroundColor:ColorConstant.WHITE,
  borderRadius:7,
  shadowColor: ColorConstant.GREY,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 3,
    shadowOpacity: 1,
},
dropDown:{
  flexDirection:'row', marginTop:hp(3)
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
infoContainer:{
  backgroundColor:ColorConstant.PINK,
  borderRadius:2,
  marginVertical:hp(2),
  padding:hp(2)
},
infoTitle: {
  fontSize:hp(1.3),
  textAlign:'center',
  color:ColorConstant.GREY
},
infoSubContainer: {
  flexDirection:'row',
  padding:6
},
infoButton:{
  paddingHorizontal:hp(2), 
  paddingVertical:hp(2.5)
},
role: {
  fontSize:FontSize.FontSize.small,
  color:ColorConstant.BLACK,
  flex:0.5,
  flexWrap:'wrap'
},
roleSubText:{
  fontSize:hp(1.3),
  color:ColorConstant.
  GREY,flex:1
},
saveText :{
  textAlign:'center',
  color:ColorConstant.WHITE,
  fontWeight:'bold'
},
saveButtonConatiner :{
  marginTop:hp(4),
  height:hp(6),
  width:'85%',
  justifyContent:'center',
  alignSelf:'center',
  borderRadius:5
},
addButton : {
    backgroundColor:ColorConstant.ORANGE,
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    height:hp(8),
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
selectedItemContainerStyle:{
  backgroundColor:ColorConstant.PINK,
  borderRadius:8,
  marginTop:hp(2),
  elevation:0,
  padding:hp(1)
},
rowStyle: {
  borderBottomColor:ColorConstant.LIGHTGREY, 
  borderBottomWidth:1
}
});


export default AddUser;