import React, { useState ,Component} from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, Dimensions, ScrollView, TextInput} from 'react-native';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize';
import NavigationService from '../../navigation/NavigationService';
import Tooltip from 'rn-tooltip';


let DATA = [
  {
      firstName: 'Tom',
      lastName:'Smith',
      role:'Owner',
      status:'Active',
      rights: 'Admin',
      group:['Home'],
      email: 'tomsmith@gmail.com',
      phoneNo: '+1 430 8976532',
  },
  {
      firstName: 'Richard',
      lastName: 'Stokes',
      role:'Regular',
      status:'Inactive',
      rights: 'Regular User',
      group:['Fedex Ground','Gas Station','Home'],
      email: 'richard@gmail.com',
      phoneNo:'+1 430 8976532',
  },
  {
      firstName: 'Charles',
      lastName: 'Anderson',
      role:'Home',
      status:'Inactive',
      rights: 'Admin',
      group:['Fedex Ground'],
      email: 'charles@gmail.com',
      phoneNo: '+1 430 8976532',
  },

];

let searchData= DATA

const filterData = ['Active','Inactive']


const Users = ({navigation}) => {

  const [filterClick, setFilterClick] = useState(false);
 

  React.useLayoutEffect(() => {

    navigation.setOptions({
      headerLeft:()=>(null)     
    });
  });

  const searchBar = () => {
        const [search, setSearch] = useState()

        const searchFilter = (text) => {
          searchData = DATA.filter(item=>item.name.toString().toLowerCase().includes(text.toLowerCase()))
            setSearch(text)
        }

        return (
          <View style={styles.searchSubContainer}>
            <View style={styles.search}>
                <TextInput 
                    placeholder='Search Here...'
                    style={styles.searchText}
                    onChangeText={text => searchFilter(text) }                    
                    value={search}
                    
                />
                <TouchableOpacity  onPress={()=> setFilterClick(!filterClick)} >
                  <Image source={filterClick? images.user.filterClick:images.user.filter } />
                </TouchableOpacity>
            </View>
            <TouchableOpacity activeOpacity={1} onPress={()=>navigation.navigate('AddUser')} style={styles.addButton}>
              <Image source={images.user.add}/>
            </TouchableOpacity>
           
           </View>
        )
    }


return ( 
    <ScrollView  contentContainerStyle={styles.container}>
    
      <View style={styles.searchContainer}>
      {searchBar()} 
      </View>

      {searchData.map((item,key) =>
        <View style={styles.cardContainer} key={key}>
          {/* Blue top head */}
          <View style={styles.blueBox}>
              <Text style={styles.blueBoxTitle}>{item.firstName} {item.lastName}</Text>
              <Image source={item.status=='Active'?images.user.active:images.user.inactive} />
              <Text style={styles.activeText}>{item.status}</Text>
              <TouchableOpacity onPress={()=>{navigation.navigate('AddUser',{editData:item})}} style={{marginLeft:hp(2)}}>
                <Image source={images.user.edit} /> 
              </TouchableOpacity>       
          </View>

          {/* White Body container */}
          <View style={styles.whiteContainer}>
            <View style={styles.whiteSubView} >
              <Text style={styles.whiteContainerText}>Role</Text>
              <Text style={styles.whiteContainerSubText}>{item.role}</Text>              
            </View>
            <View style={{flexDirection:'column',flex:1}} >
              <Text style={styles.whiteContainerText}>Rights</Text>
              <Text style={styles.whiteContainerSubText}>{item.rights}</Text>       
            </View>
            <View style={{flexDirection:'column'}}>
              <Text style={styles.whiteContainerText}>Group</Text>
              <View style={{justifyContent:'flex-start',flexDirection:'row'}}>
                  <Text style={styles.whiteContainerSubText}>{item.group[0]} </Text>  
                  <Tooltip
                    popover={<Text style={{ fontSize:10,fontFamily:'Nunito-Regular'}}>{item.group[1]}</Text>} 
                    backgroundColor={ColorConstant.WHITE}
                    //withPointer={true}
                    overlayColor={ColorConstant.TRANSPARENT}
                    pointerStyle={{elevation:0.1,borderRightWidth:4,borderLeftWidth:4}}
                    containerStyle={{borderColor:ColorConstant.ORANGE, borderWidth:1, borderRadius:6}}
                  >           
                    {item.group.length>1?
                      <Text style={{fontSize:10,fontFamily:'Nunito-SemiBold',backgroundColor:ColorConstant.LIGHTGREY,marginLeft:2,padding:2,borderColor:ColorConstant.GREY,borderRadius:4,borderWidth:1}}>+{item.group.length-1}</Text>
                  :null
                    }
                  </Tooltip>               
              </View>              
              
            </View> 

          </View>

          {/* Email and Phone */}
          <View style={styles.horizontalLine} />
            <View style={styles.emailPhone}>
              <Image style={styles.emailImage} source={images.user.email} />
              <Text style={styles.emailText}>    {item.email}</Text>
              <Image source={images.user.phone} />
              <Text style={styles.phoneText}>  {item.phoneNo}</Text>
            </View>
          </View>
        
      )}

        {filterClick?
                <View style={styles.menu}>
                  {filterData.map((item,key) =>
                      <TouchableOpacity key={key} style={{borderBottomColor:ColorConstant.GREY, borderBottomWidth:key!=filterData.length-1 ?1:0}}>
                        <Text style={styles.textStyle}>{item}</Text>
                      </TouchableOpacity>
                    )
                  }
                </View>:
              null} 

        </ScrollView>
      
        
      )
    }


const styles = StyleSheet.create({

  container: {
    height:"100%",
    alignItems:'center'
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
    alignItems:'center',
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
  fontSize:10,
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