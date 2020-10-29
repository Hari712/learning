import React, { useState ,Component} from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, Dimensions, ScrollView, TextInput} from 'react-native';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize';
import NavigationService from '../../navigation/NavigationService';
import TextField from '../../component/TextField';
import DropDown from '../../component/DropDown';
import MultiSelect, { MultiSelectGroup } from '../../component/MultiSelect'
import { AppConstants } from '../../constants/AppConstants';
import * as UsersActions from './Users.Action'
import { getLoginState, getSubuserState } from '../Selector'
import { useDispatch, useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty'
import AppManager from '../../constants/AppManager'

const AddUser = ({navigation,route}) => {

  const { loginData, subUserData } = useSelector(state => ({
    loginData: getLoginState(state),
    subUserData: getSubuserState(state)
  }))


  const dispatch = useDispatch()

  const [firstName, setFirstName]= useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [infoClick, setInfoClick] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [role, setRole] = useState();

  React.useEffect(() => {
    dispatch(UsersActions.requestGetGroup(loginData.id, onGroupSuccess, onGroupError));
    if(route){
      const editData = route.params;
      if(editData){
        setFirstName(editData.editData.firstName)
        setLastName(editData.editData.lastName)
        setEmail(editData.editData.email)
        setRole(editData.editData.roles[0].id==1?"Owner":"Regular")
        setSelectedGroup(editData.editData.groups)
    }}
  },[])

  function onGroupSuccess(data){
    console.log("Success group",data)
  }

  function onGroupError(error){
    console.log("Error group",error)
  }

  function addUser() {
        AppManager.showLoader()
        if(route && route.params){
          const requestBody = {
            "id" : route.params.editData.id,
            "firstName" : firstName ,
            "lastName" : lastName,
            "email" : email,
            "roles" : [ {
              "id" : role=="Owner" ? 1 : 2
            } ],
            "groups" : selectedGroup
          }
          dispatch(UsersActions.requestUpdateSubuserDetail(requestBody, loginData.id, onSuccess, onError)) 
        } else {
          const requestBody = {
            "userDTOS" : [ {
              "id" : null,
              "email" : email,
              "firstName" :firstName,
              "lastName" : lastName,
              "markAsOwner" : null,
              "roles" : [{
                "id" : role=="Owner" ? 1 : 2
              }],
              "groups" : selectedGroup
            } ]
          }
          dispatch(UsersActions.requestAddSubuser(requestBody, loginData.id, onSuccess, onError)) 
        }

    }


function onSuccess(data) {    
  console.log("Success",data)
  AppManager.hideLoader()
}

function onError(error) {
  AppManager.hideLoader()
  console.log("Error",error)   
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
      <View style={{width:'100%'}}>
        <TouchableOpacity style={styles.addButton}>
            <Text style={{fontFamily:'Nunito-Bold',fontSize:16,color:ColorConstant.WHITE}}>{route.params?'Edit User': 'Add User'}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{width:'100%'}}>
        <View style={styles.subContainer}>
          <TextField 
            label='First Name*' 
            valueSet={setFirstName} 
            defaultValue={firstName} 
            outerStyle={[styles.outerStyle]} 
          /> 

          <TextField 
            label='Last Name*' 
            valueSet={setLastName} 
            defaultValue={lastName} 
            outerStyle={[styles.outerStyle]} 
          /> 
          <TextField 
            label='Email Address*' 
            valueSet={setEmail} 
            defaultValue={email} 
            outerStyle={[styles.outerStyle]} 
          /> 
          <View style={styles.dropDown}>
            <View style={{flex: 1}}>
              <DropDown 
                label='Assign Role*'
                defaultValue={role}
                valueSet={setRole}
                dataList={['Regular','Owner']} 
                outerStyle={{marginTop:hp(3)}}
                // outerStyle={[styles.outerStyle]} 
                dropdownStyle={styles.dropdownStyle} 
                // dataRowStyle={styles.dataRowStyle}
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
          <MultiSelectGroup 
            label='Group Access' 
            dataList={subUserData.group} 
            allText='All' 
            hideSelectedDeviceLable={true}
            hideDeleteButton={true}
            rowStyle={styles.rowStyle}
            dropdownStyle={{height:hp(20)}}
            outerStyle={{marginTop:hp(2)}}
            valueSet={setSelectedGroup} 
            selectedData={selectedGroup}
            selectedItemContainerStyle={styles.selectedItemContainerStyle} 
            selectedItemRowStyle={styles.selectedItemRowStyle}
            deleteHandle={(item)=>setSelectedGroup(selectedGroup.filter((item1) => item1.id != item.id))}
            />

          <TouchableOpacity onPress={() => addUser()} disabled={!(firstName && lastName && email && role)} style={[styles.saveButtonConatiner,{backgroundColor:firstName && lastName && email && role ? ColorConstant.BLUE : ColorConstant.LIGHTGREY}]}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      
      )
    }



const styles = StyleSheet.create({

  container: {
    alignItems:'center',
    backgroundColor:ColorConstant.WHITE,
    flex:1
  },
  subContainer: {
    width:'85%',
    marginTop:hp(2),
    marginBottom: hp(4),
    alignSelf: 'center',
  },
  outerStyle:{
    elevation:4,
    marginTop:hp(3),
    borderBottomColor:ColorConstant.GREY,
    borderBottomWidth:1,
    backgroundColor:ColorConstant.WHITE,
    borderRadius:4,
    shadowColor: ColorConstant.GREY,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 3,
    shadowOpacity: 1,
  },
  dropDown:{
    flexDirection:'row', 
    marginTop:hp(0.5)
    
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
    borderRadius:10,
    //marginVertical:hp(1),
    marginBottom:hp(0.1),
    padding:hp(2)
  },
  infoTitle: {
    //fontSize:hp(1.3),
    fontSize:10,
    fontFamily:'Nunito-Regular',
    textAlign:'center',
    color:ColorConstant.GREY
  },
  infoSubContainer: {
    flexDirection:'row',
    padding:6
  },
  infoButton:{
    paddingHorizontal:hp(2), 
    paddingVertical:hp(5)
  },
  role: {
    //fontSize:FontSize.FontSize.small,
    fontSize:12,
    fontFamily:'Nunito-Regular',
    color:ColorConstant.BLACK,
    flex:0.7,
    flexWrap:'wrap'
  },
  roleSubText:{
    //fontSize:hp(1.3),
    color:ColorConstant.GREY,
    flex:1,
    fontSize:10,
    fontFamily:'Nunito-Regular',
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