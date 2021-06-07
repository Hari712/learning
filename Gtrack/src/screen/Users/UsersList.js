import React from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity } from 'react-native';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { getLoginState, isRoleOwner} from '../Selector'
import Tooltip from 'rn-tooltip';
import { useDispatch, useSelector } from 'react-redux';
import * as UsersActions from './Users.Action'
import AppManager from '../../constants/AppManager';
import Switches from 'react-native-switches'
import { translate } from '../../../App';
import { SCREEN_CONSTANTS } from '../../constants/AppConstants';
import { UsersEditIcon, EmailIcon, PhoneIcon } from '../../component/SvgComponent';
import NavigationService from '../../navigation/NavigationService';

const UsersList = (props) => {

    const { item } = props

    const { loginData, isConnected, isOwner } = useSelector(state => ({
        loginData: getLoginState(state),
        isConnected: state.network.isConnected,
        isOwner: isRoleOwner(state)
    }))

    const user_id = loginData.id ? loginData.id : null
    const dispatch = useDispatch()

    function onChangeSwitch(item) {
        if (isConnected) {
            AppManager.showLoader()
            dispatch(UsersActions.requestActivateDeactivateDevice(user_id, item.id, onChangeUserStatusSuccess, onChangeUserStatusError))
        } else {
            AppManager.showNoInternetConnectivityError()
        }
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

    const isSuperOwner = (item.id == loginData.id)

    return( 

        <View style={styles.cardContainer} >
                {/* Blue top head */}
                <View style={styles.blueBox}>
                    <Text style={styles.blueBoxTitle}>{item.firstName} {item.lastName}</Text>
                    {/* <Image source={item.isActive?images.user.active:images.user.inactive} /> */}
                    {!isSuperOwner && <Switches shape={'line'} buttonColor={item.isActive? ColorConstant.DARKENGREEN : ColorConstant.RED } showText={false} value={item.isActive}  buttonSize={15} onChange={() => onChangeSwitch(item)}/>}
                    <Text style={styles.activeText}>{isSuperOwner ? null : item.isActive?"Active":"Inactive"}</Text>
                        <TouchableOpacity onPress={()=>{isSuperOwner ? NavigationService.push(SCREEN_CONSTANTS.PROFILE) : NavigationService.navigate(SCREEN_CONSTANTS.ADD_USER,{editData:item})}} style={{marginLeft:hp(2)}}>
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
                        {isSuperOwner ? 
                            <Text style={styles.whiteContainerSubText}>All Group Assigned</Text>  
                        :            
                            <Text style={styles.whiteContainerSubText}>{item && item.groups && item.groups[0]?item.groups[0].groupName :"No Group Assigned"} </Text>  
                        }
                        <Tooltip
                        popover={
                            <View style={{flexWrap:'wrap',flex:1,width:wp(20)}}>
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

const styles = StyleSheet.create({
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
    paddingLeft:hp(0.5),
    flex:0.35,
    fontSize:12,
    fontFamily:'Nunito-Regular',
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
}
});

export default UsersList