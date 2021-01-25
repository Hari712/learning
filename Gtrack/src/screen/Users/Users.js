import React, { useState ,Component, useEffect} from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, Dimensions, ScrollView, TextInput, RefreshControl, FlatList} from 'react-native';
import images from '../../constants/images';
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
import { UsersEditIcon, EmailIcon, UserAddIcon, FilterIcon, FilterIconClicked, PhoneIcon } from '../../component/SvgComponent';

let searchData;

const filterData = ['Active','Inactive']


const Users = ({navigation}) => {

  const [filterClick, setFilterClick] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState("")
  const [filterKeyword, setFilterKeyword] = useState([])

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
  }
  
  function onError(error) {
    AppManager.hideLoader()
    console.log("Error",error)  
    setIsRefreshing(false) 
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
              <Switches shape={'line'} buttonColor={ColorConstant.ORANGE} showText={false} value={item.isActive}  buttonSize={15} onChange={() => onChangeSwitch(item)}/>
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
                  <Text style={styles.whiteContainerSubText}>{item.groups[0]?item.groups[0].groupName :null} </Text>  
                  <Tooltip
                    popover={
                      <View>
                        {item.groups.map((element, index) => {
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
                    {item.groups.length>1?
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
              {/* <Image style={styles.emailImage} source={images.user.email} /> */}
              <Text style={styles.emailText}>    {item.email}</Text>
              <PhoneIcon/>
              {/* <Image style={styles.phoneImage} source={images.user.phone} /> */}
              <Text style={styles.phoneText}>  {item.phoneNo}</Text>
            </View>
    </View>
    )   
  }

  const filterHandle = (item) => {
    

    setFilterKeyword([item])
    // console.log("Filter", item, filterKeyword)
    
    AppManager.showLoader()
    
    const requestBody =  {
        // "pageNumber" : 0,
        // "pageSize" : 5,
        // "useMaxSearchAsLimit" : false,
        "searchColumnsList" : [ 
          {
            "columnName" : "searchParam",
            "searchStr" : searchKeyword
          }, 
          // {
          //   "columnName" : "role",
          //   "searchStrList" : [ "ROLE_REGULAR", "ROLE_OWNER" ]
          // }, 
          {
            "columnName" : "isDeactivated",
            "searchStrList" : [item]
          } 
        ],
        "sortHeader" : "id",
        "sortDirection" : "DESC"
      }
    dispatch(UsersActions.requestSubuserByFilter(requestBody, loginData.id, onFilterSuccess, onError))
    setFilterClick(!filterClick)
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
                <TouchableOpacity  onPress={()=> setFilterClick(!filterClick)} >
                  {filterClick? <FilterIconClicked/> : <FilterIcon/> }
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


return ( 
  <View style={styles.container}>
    
      <View style={styles.searchContainer}>
      {searchBar()} 
      </View>

      <FlatList
        data={searchData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl 
            refreshing={isRefreshing}
            onRefresh={onRefresh}     
          />
        }
      />

      {filterClick?
        <View style={styles.menu}>
          {filterData.map((item,key) =>
            <TouchableOpacity key={key} 
              onPress={() => filterHandle(item)}
              style={{
                borderBottomColor:ColorConstant.GREY,                 
                borderBottomWidth:key!=filterData.length-1 ?1:0}}>
              <Text style={styles.textStyle, {color: filterKeyword.find((element)=>{return element === item}) ? ColorConstant.ORANGE : ColorConstant.BLUE }}>{item}</Text>
            </TouchableOpacity>
          )}
        </View>:
      null} 

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
    // elevation:3,
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
}
});


export default Users;