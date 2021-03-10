import React, { useState , useEffect} from 'react';
import { View, StyleSheet,TouchableOpacity, TextInput, RefreshControl, FlatList, ScrollView} from 'react-native';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { getLoginState, getSubuserState } from '../Selector'
import { useDispatch, useSelector } from 'react-redux';
import * as UsersActions from './Users.Action'
import AppManager from '../../constants/AppManager';
import { translate } from '../../../App';
import { SCREEN_CONSTANTS } from '../../constants/AppConstants';
import { UserAddIcon, FilterIcon, FilterIconClicked } from '../../component/SvgComponent';
import UsersList from './UsersList';
import UsersFilterDialog from '../../component/UsersFilterDialog';
import AdminUser from './AdminUser';

let searchData;

const Users = ({navigation}) => {

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

  searchData = subUserData
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

  function renderItem({ item }) {
    return(
      <UsersList 
        item={item}
      />
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
  
  function filterDialog() {
    return(
      <UsersFilterDialog 
        visible={visible}
        setVisible={setVisible}
        status={status}
        setStatus={setStatus}
        IsRole={IsRole}
        setIsRole={setIsRole}
        resetHandle={resetHandle}
        filterHandle={filterHandle}
      />
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

    function AdminData() {
      return(
        <AdminUser />
      )
    }

return ( 
  <View style={styles.container}>
    
      <View style={styles.searchContainer}>
      {searchBar()} 
      </View>
  
    <ScrollView 
      refreshControl={
        <RefreshControl 
          refreshing={isRefreshing}
          onRefresh={onRefresh}     
        />
      }
    >

        {AdminData()}

        <FlatList
          data={searchData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
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
searchContainer : {
    width:'90%',
    // alignItems:'center',
    alignSelf:'center'
    //marginVertical:hp(0.1)
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