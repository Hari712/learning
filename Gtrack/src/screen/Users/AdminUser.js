import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { getLoginState } from '../Selector'
import Tooltip from 'rn-tooltip';
import { useSelector } from 'react-redux';
import { translate } from '../../../App';
import { SCREEN_CONSTANTS } from '../../constants/AppConstants';
import { UsersEditIcon, EmailIcon, PhoneIcon } from '../../component/SvgComponent';
import NavigationService from '../../navigation/NavigationService';
import { EditIcon } from '../../component';

const AdminUser = () => {

    const { loginData } = useSelector(state => ({
        loginData: getLoginState(state)
    }))

    return (

        <View style={[styles.cardContainer]}>

            {/* Blue top head */}
            <View style={styles.blueBox}>
                <Text style={styles.blueBoxTitle}>{loginData.firstName} {loginData.lastName}</Text>
                {/* <TouchableOpacity style={{marginLeft:hp(2)}}>
                    <UsersEditIcon onPress={()=>NavigationService.navigate(SCREEN_CONSTANTS.PROFILE)} />
                </TouchableOpacity>        */}
                <EditIcon
                    btnStyle={{ marginLeft: hp(2) }}
                    onPress={() => NavigationService.navigate(SCREEN_CONSTANTS.PROFILE)} />
            </View>

            {/* White Body container */}
            <View style={styles.whiteContainer}>
                <View style={styles.whiteSubView} >
                    <Text style={styles.whiteContainerText}>{translate("Role")}</Text>
                    {loginData.role.map((role, key) =>
                        <Text key={key} style={styles.whiteContainerSubText}>{role.name == "ROLE_REGULAR" ? "Regular" : "Owner"}</Text>)}
                </View>
                <View style={{ flexDirection: 'column', flex: 1 }} >
                    <Text style={styles.whiteContainerText}>{translate("Rights")}</Text>
                    {loginData.role.map((role, key) =>
                        <Text key={key} style={styles.whiteContainerSubText}>{role.name == "ROLE_REGULAR" ? "Regular User" : "Admin"}</Text>)}
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.whiteContainerText}>{translate("Group")}</Text>
                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>
                        <Text style={styles.whiteContainerSubText}>{loginData && loginData.group && loginData.group[0] ? loginData.group[0].groupName : "No Group Assigned"} </Text>
                        <Tooltip
                            popover={
                                <View>
                                    {loginData.group && loginData.group.map((element, index) => {
                                        if (index > 0)
                                            return (
                                                <Text key={index} style={{ fontSize: 10, fontFamily: 'Nunito-Regular' }}>
                                                    {element.groupName}
                                                </Text>
                                            )
                                    })}
                                </View>
                            }
                            backgroundColor={ColorConstant.WHITE}
                            overlayColor={ColorConstant.TRANSPARENT}
                            pointerStyle={{ elevation: 0.1, borderRightWidth: 4, borderLeftWidth: 4 }}
                            containerStyle={{ borderColor: ColorConstant.ORANGE, borderWidth: 1, borderRadius: 6 }}
                        >
                            {loginData.group && loginData.group.length > 1 ?
                                <Text style={{ fontSize: 10, fontFamily: 'Nunito-SemiBold', backgroundColor: ColorConstant.LIGHTGREY, marginLeft: 2, padding: 2, borderColor: ColorConstant.GREY, borderRadius: 4, borderWidth: 1 }}>
                                    +{loginData.group.length - 1}
                                </Text>
                                : null
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
                <PhoneIcon />
                <Text style={styles.phoneText}>  {loginData.phone}</Text>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '90%',
        marginVertical: hp(1.5),
        alignSelf: 'center',
        backgroundColor: ColorConstant.WHITE,
        borderRadius: 12,
        //elevation:3,
        borderWidth: 0.3,
        borderColor: ColorConstant.GREY,
        shadowColor: ColorConstant.GREY,
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 0 },
    },
    blueBox: {
        backgroundColor: ColorConstant.BLUE,
        alignItems: 'center',
        height: hp(5),
        flexDirection: 'row',
        width: "100%",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        paddingHorizontal: hp(3)
    },
    blueBoxTitle: {
        color: ColorConstant.WHITE,
        fontSize: 12,
        //fontSize:FontSize.FontSize.small,
        flex: 1,
        fontFamily: 'Nunito-Bold'
    },
    activeText: {
        //fontSize:FontSize.FontSize.small,
        color: ColorConstant.WHITE,
        paddingHorizontal: hp(1),
        flex: 0.3,
        fontSize: 12,
        fontFamily: 'Nunito-Regular'
    },
    whiteContainer: {
        flexDirection: 'row',
        marginTop: hp(1.5),
        paddingHorizontal: hp(2.5),
        paddingBottom: hp(1.5)
    },
    whiteSubView: {
        flexDirection: 'column', flex: 1
    },
    whiteContainerText: {
        color: ColorConstant.GREY,
        //fontSize:FontSize.FontSize.small,
        fontSize: 10,
        fontFamily: 'Nunito-Regular'
    },
    whiteContainerSubText: {
        color: ColorConstant.BLACK,
        //fontSize:FontSize.FontSize.small,
        fontSize: 12,
        fontFamily: 'Nunito-Regular'
    },
    horizontalLine: {
        borderBottomWidth: 0.5,
        width: '90%',
        alignSelf: 'center',
        borderBottomColor: ColorConstant.GREY
    },
    emailPhone: {
        flexDirection: 'row',
        marginTop: hp(1.5),
        paddingHorizontal: hp(2.5),
        paddingBottom: hp(1.5),
        alignItems: 'center'
    },
    emailText: {
        color: ColorConstant.BLACK,
        //fontSize:FontSize.FontSize.extraSmall,
        flex: 1,
        fontSize: 10,
        fontFamily: 'Nunito-Regular'
    },
    phoneText: {
        color: ColorConstant.BLACK,
        //fontSize:FontSize.FontSize.extraSmall,
        fontSize: 10,
        fontFamily: 'Nunito-Regular'
    }
});

export default AdminUser