import React, { useState ,Component, useEffect} from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, TextInput, RefreshControl, FlatList, ScrollView} from 'react-native';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { getLoginState, getSubuserState } from '../Selector'
import Tooltip from 'rn-tooltip';
import { useDispatch, useSelector } from 'react-redux';
import * as UsersActions from './Users.Action'
import AppManager from '../../constants/AppManager';
import Switches from 'react-native-switches'
import { translate } from '../../../App';
import { SCREEN_CONSTANTS } from '../../constants/AppConstants';
import { UsersEditIcon, EmailIcon, UserAddIcon, FilterIcon, FilterIconClicked, PhoneIcon, CloseIcon, RadioButtonIcon, RadioButtonIconClicked } from '../../component/SvgComponent';
import { Dialog } from 'react-native-simple-dialogs'
import NavigationService from '../../navigation/NavigationService';

let searchData;

const Status = ['Active','Inactive']

const Role  = ['Admin', 'Regular']


const Users = ({navigation}) => {

  const [filterClick, setFilterClick] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState("")
  const [filterKeyword, setFilterKeyword] = useState([])
  const [visible, setVisible] = useState(false)
  const [status, setStatus] = useState()
  const [IsRole, setIsRole] = useState()
  

  const { loginData, subUserData } = useSelector(state => ({
    loginData: getLoginState(state),
    subUserData: getSubuserState(state)
  }))

  searchData = subUserData.subUser
  const user_id = loginData.id ? loginData.id : null
  const dispatch = useDispatch()

  useEffect(() => {    
    AppManager.showLoader()
    dispatch(UsersActions.requestGetSubuser(loginData.id, onSuccess, onError))   
  }, [])

  function onSuccess(data) {    
    console.log("Success",data) 
    AppManager.hideLoader()
    setIsRefreshing(false)
  }

  function onFilterSuccess(data) {    
    console.log("Success",data) 
    AppManager.hideLoader()
    setVisible(false)
  }
  
  function onError(error) {
    AppManager.hideLoader()
    console.log("Error",error)  
    setIsRefreshing(false) 
    setVisible(false)
  }

  React.useLayoutEffect(() => {

    navigation.setOptions({
      headerLeft:()=>(null)     
    });
  },[navigation]);

  function onChangeSwitch(item) {
    AppManager.showLoader()
    dispatch(UsersActions.requestActivateDeactivateDevice(user_id, item.id, onChangeUserStatusSuccess, onChangeUserStatusError))
  }

  function onChangeUserStatusSuccess(data) {
    const { result } = data
    AppManager.hideLoader()
    AppManager.showSimpleMessage('success', { message: result, description: '' })
  }

  function onChangeUserStatusError(error) {
    AppManager.hideLoader()
    AppManager.showSimpleMessage('danger', { message: error, description: '' })
  }

  const renderItem = ({item,key}) => {
    return( 
    <View style={styles.cardContainer} key={key}>
          {/* Blue top head */}
          <View style={styles.blueBox}>
              <Text style={styles.blueBoxTitle}>{item.firstName} {item.lastName}</Text>
              {/* <Image source={item.isActive?images.user.active:images.user.inactive} /> */}
              <Switches shape={'line'} buttonColor={item.isActive? ColorConstant.DARKENGREEN : ColorConstant.RED } showText={false} value={item.isActive}  buttonSize={15} onChange={() => onChangeSwitch(item)}/>
              <Text style={styles.activeText}>{item.isActive?"Active":"Inactive"}</Text>
              <TouchableOpacity onPress={()=>{navigation.navigate(SCREEN_CONSTANTS.ADD_USER,{editData:item})}} style={{marginLeft:hp(2)}}>
                <UsersEditIcon/>
              </TouchableOpacity>       
          </View>

          {/* White Body container */}
          <View style={styles.whiteContainer}>
            <View style={styles.whiteSubView} >
              <Text style={styles.whiteContainerText}>{translate("Role")}</Text>
              {item.roles.map((role,key) =>
                <Text key={key} style={styles.whiteContainerSubText}>{role.name == "ROLE_REGULAR" ? "Regular" : "Owner"}</Text> )}       
            </View>
            <View style={{flexDirection:'column',flex:1}} >
              <Text style={styles.whiteContainerText}>{translate("Rights")}</Text>
              {item.roles.map((role,key) =>
              <Text key={key} style={styles.whiteContainerSubText}>{role.name == "ROLE_REGULAR" ? "Regular User" : "Admin"}</Text> )}      
            </View>
            <View style={{flexDirection:'column'}}>
              <Text style={styles.whiteContainerText}>{translate("Group")}</Text>
              <View style={{justifyContent:'flex-start',flexDirection:'row'}}>              
                  <Text style={styles.whiteContainerSubText}>{item && item.groups && item.groups[0]?item.groups[0].groupName :"No Group Assigned"} </Text>  
                  <Tooltip
                    popover={
                      <View>
                        {item.groups && item.groups.map((element, index) => {
                          if(index>0)
                            return(
                              <Text key={index} style={{ fontSize:10,fontFamily:'Nunito-Regular'}}>
                                {element.groupName}
                              </Text>
                            )
                          })}
                      </View>
                    } 
                    backgroundColor={ColorConstant.WHITE}
                    overlayColor={ColorConstant.TRANSPARENT}
                    pointerStyle={{elevation:0.1,borderRightWidth:4,borderLeftWidth:4}}
                    containerStyle={{borderColor:ColorConstant.ORANGE, borderWidth:1, borderRadius:6}}
                  >           
                    {item.groups && item.groups.length>1?
                      <Text style={{fontSize:10,fontFamily:'Nunito-SemiBold',backgroundColor:ColorConstant.LIGHTGREY,marginLeft:2,padding:2,borderColor:ColorConstant.GREY,borderRadius:4,borderWidth:1}}>
                        +{item.groups.length-1}
                      </Text>
                      :null
                    }
                  </Tooltip>               
              </View>              
              
            </View> 

          </View>

          {/* Email and Phone */}
          <View style={styles.horizontalLine} />
            <View style={styles.emailPhone}>
              <EmailIcon />
              <Text style={styles.emailText}>    {item.email}</Text>
              <PhoneIcon/>
              <Text style={styles.phoneText}>  {item.phoneNo}</Text>
            </View>
    </View>
    )   
  }

  const resetHandle = () => {
    setVisible(false)
    AppManager.showLoader()
    setIsRole(-1)
    setStatus(-1)
    dispatch(UsersActions.requestGetSubuser(loginData.id, onSuccess, onError))
    // setTimeout(() => {
    //   filterApiCall()
    // }, 3000);
   
  }

  const filterHandle = () => {
    setVisible(false)
    AppManager.showLoader()
    filterApiCall()
  }

  const filterApiCall = () => {
    const requestBody =  {
      // "pageNumber" : 0,
       "pageSize" : 16,
      // "useMaxSearchAsLimit" : false,
      "searchColumnsList" : [ 
        {
          "columnName" : "searchParam",
          "searchStr" : searchKeyword
        }, 
        {
          "columnName" : "role",
          "searchStrList" : IsRole == 0 ?  ["ROLE_OWNER"] : IsRole == 1 ? ["ROLE_REGULAR"] : ["ROLE_REGULAR", "ROLE_OWNER"]
        }, 
        {
          "columnName" : "isDeactivated",
          "searchStrList" : status == 0 ? ["Active"] : status == 1 ? ["InActive"] : [ "Active", "InActive" ]
        } 
      ],
      "sortHeader" : "id",
      "sortDirection" : "DESC"
    }
  dispatch(UsersActions.requestSubuserByFilter(requestBody, loginData.id, onFilterSuccess, onError))
  }

  const searchHandle = (keyword) => {
    setSearchKeyword(keyword)
    // AppManager.showLoader()
    const requestBody =  {
        // "pageNumber" : 0,
        // "pageSize" : 5,
        // "useMaxSearchAsLimit" : false,
        "searchColumnsList" : [ 
          {
            "columnName" : "searchParam",
            "searchStr" : keyword
          },
          // {
          //   "columnName" : "role",
          //   "searchStrList" : [ "ROLE_REGULAR", "ROLE_OWNER" ]
          // }, 
          {
            "columnName" : "isDeactivated",
            "searchStrList" : filterKeyword
          } 
        ],
        "sortHeader" : "id",
        "sortDirection" : "DESC"
      }
    dispatch(UsersActions.requestSubuserByFilter(requestBody, loginData.id, onFilterSuccess, onError))
  }

  const filterDialog = () => {
    return(
          <Dialog 
          visible={visible}
          dialogStyle={{backgroundColor:ColorConstant.WHITE,borderRadius:20}}  
          onTouchOutside={() => setVisible(false)}
          > 
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={styles.filterText}>Filter</Text>
            <TouchableOpacity onPress={()=>setVisible(false)} >
              <CloseIcon width={14.984} height={14.984}/>
            </TouchableOpacity>
          </View>

          <View style={styles.filterContainer}>
            <View style={{marginTop:hp(2)}}>
                <Text style={styles.titleText}>Status</Text>
                {Status.map((item,key) =>
                <TouchableOpacity key={key} onPress={() => key == status ? setStatus(-1) : setStatus(key)} style={styles.filterBox}>                  
                  {key == status ? <RadioButtonIconClicked style={{alignSelf:'center'}}/> : <RadioButtonIcon  style={{alignSelf:'center'}} /> }
                  <Text style={styles.textFilter}>{item}</Text>
                </TouchableOpacity> )}                      
            </View>

            <View style={{marginTop:hp(2)}}>
                <Text style={styles.titleText}>Roles</Text>    
                {Role.map((role,key) =>
                <TouchableOpacity onPress={() => key == IsRole ? setIsRole(-1) : setIsRole(key) } style={styles.filterBox}>
                  {key == IsRole ? <RadioButtonIconClicked style={{alignSelf:'center'}}/> : <RadioButtonIcon  style={{alignSelf:'center'}} /> }
                  <Text style={styles.textFilter}>{role}</Text>
                </TouchableOpacity> )} 
            </View>
          </View>

          <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => resetHandle()} style={styles.cancelButton}>
                    <Text style={{textAlign:'center',color:ColorConstant.BLUE}}>{translate("Reset")}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => filterHandle()} style={styles.nextButton}>
                    <Text style={{textAlign:'center',color:ColorConstant.WHITE}}>Okay</Text>
                </TouchableOpacity>
          </View> 
        </Dialog>
  )
}

  const searchBar = () => {  
        return (
          <View style={styles.searchSubContainer}>
            <View style={styles.search}>
                <TextInput 
                    placeholder={translate("Search_here")}
                    style={styles.searchText}
                    onChangeText={text => searchHandle(text) }                    
                    value={searchKeyword}
                    
                />
                <TouchableOpacity  onPress={()=> setVisible(!visible)} >
                  {visible? <FilterIconClicked/> : <FilterIcon/> }
                </TouchableOpacity>
            </View>
            <TouchableOpacity activeOpacity={1} onPress={()=>navigation.navigate(SCREEN_CONSTANTS.ADD_USER)} style={styles.addButton}>
              <UserAddIcon/>
            </TouchableOpacity>
          
          </View>
        )
    }

    const onRefresh = () => {
      setIsRefreshing(true)
      dispatch(UsersActions.requestGetSubuser(loginData.id, onSuccess, onError))  
    }


const AdminData = () => {
  
  return(
    <View style={[styles.cardContainer]}>

    {/* Blue top head */}
    <View style={styles.blueBox}>
        <Text style={styles.blueBoxTitle}>{loginData.firstName} {loginData.lastName}</Text>
        <TouchableOpacity style={{marginLeft:hp(2)}}>
          <UsersEditIcon onPress={()=>NavigationService.push(SCREEN_CONSTANTS.PROFILE)} />
        </TouchableOpacity>       
    </View>

    {/* White Body container */}
    <View style={styles.whiteContainer}>
      <View style={styles.whiteSubView} >
        <Text style={styles.whiteContainerText}>{translate("Role")}</Text>
        {loginData.role.map((role,key) =>
          <Text key={key} style={styles.whiteContainerSubText}>{role.name == "ROLE_REGULAR" ? "Regular" : "Owner"}</Text> )}       
      </View>
      <View style={{flexDirection:'column',flex:1}} >
        <Text style={styles.whiteContainerText}>{translate("Rights")}</Text>
        {loginData.role.map((role,key) =>
        <Text key={key} style={styles.whiteContainerSubText}>{role.name == "ROLE_REGULAR" ? "Regular User" : "Admin"}</Text> )}      
      </View>
      <View style={{flexDirection:'column'}}>
        <Text style={styles.whiteContainerText}>{translate("Group")}</Text>
        <View style={{justifyContent:'flex-start',flexDirection:'row'}}>              
            <Text style={styles.whiteContainerSubText}>{loginData && loginData.group && loginData.group[0]?loginData.group[0].groupName :"No Group Assigned"} </Text>  
            <Tooltip
              popover={
                <View>
                  {loginData.group && loginData.group.map((element, index) => {
                    if(index>0)
                      return(
                        <Text key={index} style={{ fontSize:10,fontFamily:'Nunito-Regular'}}>
                          {element.groupName}
                        </Text>
                      )
                    })}
                </View>
              } 
              backgroundColor={ColorConstant.WHITE}
              overlayColor={ColorConstant.TRANSPARENT}
              pointerStyle={{elevation:0.1,borderRightWidth:4,borderLeftWidth:4}}
              containerStyle={{borderColor:ColorConstant.ORANGE, borderWidth:1, borderRadius:6}}
            >           
              {loginData.group && loginData.group.length>1?
                <Text style={{fontSize:10,fontFamily:'Nunito-SemiBold',backgroundColor:ColorConstant.LIGHTGREY,marginLeft:2,padding:2,borderColor:ColorConstant.GREY,borderRadius:4,borderWidth:1}}>
                  +{loginData.group.length-1}
                </Text>
                :null
              }
            </Tooltip>               
        </View>              
        
      </View> 

    </View>

    {/* Email and Phone */}
    <View style={styles.horizontalLine} />
      <View style={styles.emailPhone}>
        <EmailIcon />
          <Text style={styles.emailText}>    {loginData.email}</Text>
        <PhoneIcon/>
          <Text style={styles.phoneText}>  {loginData.phone}</Text>
      </View>
</View>

  )
}   


return ( 
  <View style={styles.container}>
    
      <View style={styles.searchContainer}>
      {searchBar()} 
      </View>
  
     <ScrollView>

        {AdminData()}

        <FlatList
          data={searchData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          refreshControl={
            <RefreshControl 
              refreshing={isRefreshing}
              onRefresh={onRefresh}     
            />
          }
        /> 

    </ScrollView>

      {filterDialog()} 

  </View>
      )
    }


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
    //elevation:3,
    borderWidth: 0.3,
    borderColor: ColorConstant.GREY,
    shadowColor:ColorConstant.GREY,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
},
searchContainer : {
    width:'90%',
    // alignItems:'center',
    alignSelf:'center'
    //marginVertical:hp(0.1)
},
blueBox : {
  backgroundColor:ColorConstant.BLUE,
  alignItems:'center',
  height:hp(5),
  flexDirection:'row',
  width:"100%",
  borderTopLeftRadius:12,
  borderTopRightRadius:12,
  paddingHorizontal:hp(3)
},
blueBoxTitle :{
  color:ColorConstant.WHITE,
  fontSize:12,
  //fontSize:FontSize.FontSize.small,
  flex:1,
  fontFamily:'Nunito-Bold'
},
activeText : {
  //fontSize:FontSize.FontSize.small,
  color:ColorConstant.WHITE,
  paddingHorizontal:hp(1),
  flex:0.3,
  fontSize:12,
  fontFamily:'Nunito-Regular'
},
whiteContainer : {
  flexDirection:'row',
  marginTop:hp(1.5),
  paddingHorizontal:hp(2.5),
  paddingBottom:hp(1.5)
},
whiteSubView : {
  flexDirection:'column',flex:1
},
whiteContainerText: {
  color:ColorConstant.GREY,
  //fontSize:FontSize.FontSize.small,
  fontSize:10,
  fontFamily:'Nunito-Regular'
},
whiteContainerSubText : {
  color:ColorConstant.BLACK,
  //fontSize:FontSize.FontSize.small,
  fontSize:12,
  fontFamily:'Nunito-Regular'

},
horizontalLine:{
  borderBottomWidth:0.5,
  width:'90%',
  alignSelf:'center',
  borderBottomColor:ColorConstant.GREY
},
emailPhone : {
  flexDirection:'row',
  marginTop:hp(1.5),
  paddingHorizontal:hp(2.5),
  paddingBottom:hp(1.5),
  alignItems:'center'
},
emailImage : {
  height:hp(2),
  alignSelf:'flex-end',
  resizeMode:'contain',
},
phoneImage : {
  height:hp(2),
  width:wp(4),
  resizeMode:'contain'
},
emailText : {
  color:ColorConstant.BLACK,
  //fontSize:FontSize.FontSize.extraSmall,
  flex:1,
  fontSize:10,
  fontFamily:'Nunito-Regular'
},
phoneText : {
  color:ColorConstant.BLACK,
  //fontSize:FontSize.FontSize.extraSmall,
  fontSize:10,
  fontFamily:'Nunito-Regular'
},
search: {
  paddingHorizontal:hp(2),
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'space-between',
  width:'84%',
  height:hp(6),
  borderRadius:12,
  marginTop:hp(4),
  marginBottom:hp(2),
  elevation:4,
  shadowColor: ColorConstant.GREY,
  shadowOffset: {
    width: 0,
    height: 0
  },
  shadowRadius: 3,
  shadowOpacity: 1,
  backgroundColor:ColorConstant.WHITE
},
filterText: {
  color:ColorConstant.ORANGE,
  marginLeft:hp(15),
  fontFamily:"Nunito-Bold",
  fontSize:hp(2)
},
addButton : {
    //paddingHorizontal:hp(2),
    //marginHorizontal:hp(2),
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    width:'14%',
    height:hp(6),
    borderRadius:12,
    marginTop:hp(4),
    //marginBottom:hp(2),
    elevation:4,
    shadowColor: ColorConstant.GREY,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 3,
    shadowOpacity: 1,
    backgroundColor:ColorConstant.WHITE
  
},
textFilter: {
  paddingLeft:hp(1),
  fontFamily:"Nunito-Regular",
  color:ColorConstant.BLACK
},
titleText: {
  color:ColorConstant.BLUE,
  fontFamily:"Nunito-SemiBold"
},
filterBox: {
  flexDirection:'row',
  marginTop:hp(2)
},
filterContainer: {
  flexDirection:'row',
  paddingHorizontal:hp(3),
  justifyContent:'space-between'
},
menu:{
  backgroundColor:'white',
  padding:5,
  paddingVertical:hp(1.5),
  right:wp(19),
  borderRadius:16,
  width:hp(12),
  top:hp(11),
  justifyContent:'space-between',
  position:'absolute',
  shadowColor:ColorConstant.GREY,		
  shadowOffset:{height:0,width:0},
  shadowOpacity:1,
  elevation:10,
  shadowRadius:3
},
textStyle:{
  margin:hp(0.5),
  color:ColorConstant.BLUE,
  textAlignVertical:'center',
  paddingLeft:hp(0.5),
  fontFamily:'Nunito-Regular',
  fontSize:12
  
},
searchText: {
  //fontSize:FontSize.FontSize.small,
  fontSize:14,
  color:ColorConstant.LIGHTGREY,
  fontFamily:'Nunito-LightItalic'
},
searchSubContainer: {
  flexDirection:'row',
  width:'100%',
  justifyContent:'space-between'
},
buttonContainer: {
  flexDirection:'row',
  justifyContent:'space-between',
  marginTop:hp(5),
  //paddingHorizontal:hp(1),
  alignItems:'center',
  paddingBottom:hp(2)
},
cancelButton: {
  borderRadius:6,
  borderColor:ColorConstant.BLUE,
  borderWidth:1,
  backgroundColor:ColorConstant.WHITE,
  width:'45%',
  height:hp(6),
  justifyContent:'center'
},
nextButton: {
  borderRadius:6,
  backgroundColor:ColorConstant.BLUE,
  width:'45%',
  height:hp(6),
  justifyContent:'center'
},
});


export default Users;