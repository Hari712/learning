import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import  { DropDown, TextField, FontSize }from '../../component';
import { MultiSelectGroup } from '../../component/MultiSelect'
import { AppConstants } from '../../constants/AppConstants';
import * as UsersActions from './Users.Action'
import { getGroupListInfo, getLoginState } from '../Selector'
import { useDispatch, useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty'
import AppManager from '../../constants/AppManager'
import ShadowView from 'react-native-simple-shadow-view'
import { translate } from '../../../App';
import { BackIcon, UsersInfoIcon, UsersInfoIconClicked } from '../../component/SvgComponent';
import { validateEmailorPhoneNumber } from '../../utils/helper';

const AddUser = ({ navigation, route }) => {

  const { loginData, groupList, isConnected } = useSelector(state => ({
    loginData: getLoginState(state),
    groupList: getGroupListInfo(state),
    isConnected: state.network.isConnected,
  }))

  const dispatch = useDispatch()

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [infoClick, setInfoClick] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [role, setRole] = useState();
  const [isAddNew, setIsAddNew] = useState(true);

  React.useEffect(() => {
    dispatch(UsersActions.requestGetGroup(loginData.id, onGroupSuccess, onGroupError));
    if (route) {
      const editData = route.params;
      if (editData) {
        setIsAddNew(false)
        setFirstName(editData.editData.firstName)
        setLastName(editData.editData.lastName)
        setEmail(editData.editData.email)
        setRole(editData.editData.roles[0].id == 1 ? "Admin" : "Regular")
        setSelectedGroup(editData.editData.groups)
      }
    }
  }, [])

  function onGroupSuccess(data) {
    console.log("Success group", data)
  }

  function onGroupError(error) {
    console.log("Error group", error)
  }

  function addUser() {
    if (isConnected) {
      let message = ''
      let emailStr = String(email).trim().toLowerCase()
      if (!validateEmailorPhoneNumber(emailStr)) {    
          message = translate(AppConstants.INVALID_EMAIL)
      } 
      if (!isEmpty(message)) {
        AppManager.showSimpleMessage('warning', { message: message, description: '', floating: true }) }
      else {
      AppManager.showLoader()
      if (route && route.params) {
        const requestBody = {
          "id": route.params.editData.id,
          "firstName": firstName,
          "lastName": lastName,
          "email": emailStr,
          "roles": [{
            "id": role == "Admin" ? 1 : 2
          }],
          "groups": selectedGroup
        }
        dispatch(UsersActions.requestUpdateSubuserDetail(requestBody, loginData.id, onSuccess, onError))
      } else {
        const requestBody = {
          "userDTOS": [{
            "id": null,
            "email": emailStr,
            "firstName": firstName,
            "lastName": lastName,
            "markAsOwner": null,
            "roles": [{
              "id": role == "Admin" ? 1 : 2
            }],
            "groups": selectedGroup
          }]
        }
        dispatch(UsersActions.requestAddSubuser(requestBody, loginData.id, onSuccess, onError))
      }

    }
    } else {
      AppManager.showNoInternetConnectivityError()
  }
}


  function onSuccess(data) {
    console.log("Success", data)
    if (route && route.params){
      AppManager.showSimpleMessage('success', { message: data.message, description: '' })
    } else {
      AppManager.showSimpleMessage('success', { message: 'A new user added successfully', description: '' })
    }
    AppManager.hideLoader()
    navigation.pop()
  }

  function onError(error) {
    AppManager.hideLoader()
    console.log("Error", error)
    AppManager.showSimpleMessage('danger', { message: error, description: '' })
  }

  React.useLayoutEffect(() => {

    navigation.setOptions({
      headerTitle: () => (
        <Text style={{
          color: ColorConstant.GREY,
          fontSize: FontSize.FontSize.medium,
          fontWeight: '500',
          //letterSpacing: 0,
          textAlign: 'center'
        }}>
          Users
        </Text>
      ),
      headerLeft: () => (
        <TouchableOpacity style={{padding:hp(2)}} onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
      )
    });
  }, [navigation]);



  const info = () => {
    return (
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
      <View style={{ width: '100%' }}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={{ fontFamily: 'Nunito-Bold', fontSize: 16, color: ColorConstant.WHITE }}>{route.params ? 'Edit User' : 'Add User'}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView keyboardShouldPersistTaps={'handled'} style={{ width: '100%' }}>
        <View style={styles.subContainer}>
          <ShadowView style={styles.shadowContainer}>
            <TextField
              editable={isAddNew}
              label={translate("User_First_Name")}
              valueSet={setFirstName}
              defaultValue={firstName}
              outerStyle={[styles.outerStyle, !isAddNew && {backgroundColor:ColorConstant.PINK}]}
            />
          </ShadowView>
          <ShadowView style={styles.shadowContainer}>
            <TextField
              editable={isAddNew}
              label={translate("User_Last_Name")}
              valueSet={setLastName}
              defaultValue={lastName}
              outerStyle={[styles.outerStyle, !isAddNew && {backgroundColor:ColorConstant.PINK}]}
            />
          </ShadowView>
          <ShadowView style={styles.shadowContainer}>
            <TextField
              editable={isAddNew}
              label={translate("User_Email_Address")}
              valueSet={setEmail}
              defaultValue={email}
              outerStyle={[styles.outerStyle, !isAddNew && {backgroundColor:ColorConstant.PINK}]}
            />
          </ShadowView>
          <View style={styles.dropDown}>
            <View style={{ flex: 1 }}>
              <DropDown
                label={translate("Assign Role")}
                defaultValue={role}
                valueSet={setRole}
                dataList={['Regular', 'Admin']}
                outerStyle={{ marginTop: hp(2) }}
                inputContainerStyle={{height: hp(6)}}
                contentInset={{ input: 16, label: 1.4 }}
                //outerStyle={[styles.outerStyle]} 
                dropdownStyle={styles.dropdownStyle}
                // dataRowStyle={styles.dataRowStyle}
                dataTextStyle={{ padding: 3 }}
              />
            </View>
            <TouchableOpacity onPress={() => setInfoClick(!infoClick)} style={styles.infoButton}>
              {infoClick ? <UsersInfoIconClicked/> : <UsersInfoIcon/> } 
            </TouchableOpacity>

          </View>

          {infoClick ?
            info()
            : null}

          <ShadowView style={styles.shadowContainer}>
            <MultiSelectGroup
              label={translate("Group Access")}
              dataList={groupList}
              allText={translate("All_string")}
              hideSelectedDeviceLable={true}
              hideDeleteButton={true}
              rowStyle={styles.rowStyle}
              dropdownStyle={{ height: hp(20) }}
              valueSet={setSelectedGroup}
              selectedData={selectedGroup}
              selectedItemContainerStyle={styles.selectedItemContainerStyle}
              selectedItemRowStyle={styles.selectedItemRowStyle}
              deleteHandle={(item) => setSelectedGroup(selectedGroup.filter((item1) => item1.id != item.id))}
            />
          </ShadowView>
          <TouchableOpacity onPress={() => addUser()} disabled={!(firstName && lastName && email && role)} style={[styles.saveButtonConatiner, { backgroundColor: firstName && lastName && email && role ? ColorConstant.BLUE : ColorConstant.LIGHTGREY }]}>
            <Text style={styles.saveText}>{translate("Save")}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>

  )
}



const styles = StyleSheet.create({

  container: {
    alignItems: 'center',
    backgroundColor: ColorConstant.WHITE,
    flex: 1
  },
  subContainer: {
    width: '85%',
    marginTop: hp(2),
    marginBottom: hp(4),
    alignSelf: 'center',
  },
  shadowContainer: Platform.OS=='ios'?
  { 
    width: '100%',
    shadowColor: ColorConstant.GREY,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.3,
    marginTop: hp(2),
    shadowRadius: 3 
  }: {
    width: '100%',
    marginTop: hp(2),
  }, 

  outerStyle: {
    backgroundColor: ColorConstant.WHITE,
    borderRadius: 4,
    borderBottomWidth: Platform.OS=='android'? 1:0,
    borderColor: ColorConstant.GREY,
    elevation:2,
  },
  dropDown: {
    flexDirection: 'row',
    marginTop: hp(0.5)
  },
  dropdownStyle: {
    position: 'relative',
    top: hp(0.1),
    width: '116%',
    left: wp(5.5),
    marginBottom: hp(3)
  },
  dataRowStyle: {
    borderBottomWidth: 1, borderBottomColor: ColorConstant.GREY
  },
  infoContainer: {
    backgroundColor: ColorConstant.PINK,
    borderRadius: 10,
    //marginVertical:hp(1),
    marginBottom: hp(0.1),
    padding: hp(2)
  },
  infoTitle: {
    //fontSize:hp(1.3),
    fontSize: 10,
    fontFamily: 'Nunito-Regular',
    textAlign: 'center',
    color: ColorConstant.GREY
  },
  infoSubContainer: {
    flexDirection: 'row',
    padding: 6
  },
  infoButton: {
    paddingHorizontal: hp(2),
    paddingVertical: hp(4)
  },
  role: {
    //fontSize:FontSize.FontSize.small,
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    color: ColorConstant.BLACK,
    flex: 0.7,
    flexWrap: 'wrap'
  },
  roleSubText: {
    //fontSize:hp(1.3),
    color: ColorConstant.GREY,
    flex: 1,
    fontSize: 10,
    fontFamily: 'Nunito-Regular',
  },
  saveText: {
    textAlign: 'center',
    color: ColorConstant.WHITE,
    fontWeight: 'bold'
  },
  saveButtonConatiner: {
    marginTop: hp(4),
    height: hp(6),
    width: '85%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 5
  },
  addButton: {
    backgroundColor: ColorConstant.ORANGE,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: hp(5),
  },
  selectedItemRowStyle: {
    flexDirection: 'row',
    elevation: 4,
    shadowColor: ColorConstant.GREY,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 3,
    shadowOpacity: 1,
    backgroundColor: ColorConstant.LIGHTPINK,
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: hp(1),
    //flexWrap:'wrap',
    margin: 4,
    height: hp(4),
  },
  selectedItemContainerStyle: {
    backgroundColor: ColorConstant.PINK,
    borderRadius: 8,
    marginTop: hp(2),
    elevation: 0,
    padding: hp(1)
  },
  rowStyle: {
    borderBottomColor: ColorConstant.LIGHTGREY,
    borderBottomWidth: 1
  }
});


export default AddUser;