import React from 'react'
import { View, TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native'
import FontSize from './FontSize'
import { ColorConstant } from '../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import NavigationService from '../navigation/NavigationService'
import Tooltip from 'rn-tooltip'
import { translate } from '../../App'
import { SCREEN_CONSTANTS } from '../constants/AppConstants'
import { TruckIcon, TravelIcon, ShuttleVanIcon, MachineryIcon, CarIcon, KidsIcon, PersonnelItemIcon, FamilyVanIcon, BusIcon, TrailerIcon, EditIcon } from './SvgComponent'
import IconConstant from '../constants/iconConstant'

const DeviceCell = (props) => {

    const { item, onTapDetail, onTapEdit } = props
    const { deviceDTO } = item
    const groupDTO = item.groupDTO ? item.groupDTO : null
    const assetDTO = item.assetDTO ? item.assetDTO : null
    const groupName = groupDTO ? groupDTO.groupName : 'No group found'
    //const devicePlan = item.devicePlan ? item.devicePlan : null
    const devicePlan = item && item.devicePlan && item.devicePlan.subscriptionPlanCurrency && item.devicePlan.subscriptionPlanCurrency.subscriptionPlan && item.devicePlan.subscriptionPlanCurrency.subscriptionPlan.planName ? item.devicePlan.subscriptionPlanCurrency.subscriptionPlan.planName : 'None'
    //const planStatus = devicePlan ? devicePlan.planName : 'None'
    //const expiryDate = devicePlan ? devicePlan.deActivationDate : 'None'
    const expiryDate = item && item.devicePlan && item.devicePlan.deActivationDate ? item.devicePlan.deActivationDate : 'None'

    return (
        <TouchableOpacity onPress={() => { NavigationService.navigate(SCREEN_CONSTANTS.DETAILS, { deviceId: deviceDTO.deviceId, title: deviceDTO.deviceName, devicePrimaryId: deviceDTO.id }) }
        } style={styles.cardContainer}>

            {/* Blue top head */}
            <View style={styles.blueConatiner}>
                <View style={styles.blueTopHead}>
                    <Text style={styles.headerTitle}>{deviceDTO.deviceName}</Text>
                    <Text style={styles.id}>{deviceDTO.deviceId}</Text>
                </View>
                <View style={styles.toolTip}>
                    <Tooltip
                        popover={<Text style={styles.toolTipText}>{item.assetDTO && item.assetDTO.description ? item.assetDTO.description : '-'}</Text>}
                        backgroundColor={ColorConstant.WHITE}
                        overlayColor={ColorConstant.TRANSPARENT}
                        pointerStyle={styles.pointerStyle}
                        containerStyle={styles.toolTipContainer}
                    >
                    <IconConstant type={item.assetDTO && item.assetDTO.assetType} color={ColorConstant.WHITE} />
                    </Tooltip>
                </View>

                <TouchableOpacity style={styles.editButton} onPress={() => { NavigationService.navigate(SCREEN_CONSTANTS.EDIT_DEVICE_ASSET, { id: item.id, title: item.title, device: deviceDTO, groupDTO: groupDTO, assetDTO: assetDTO }) }}>
                    <EditIcon width={11.947} height={11.947}/>
                </TouchableOpacity>
            </View>

            {/* White Body container */}
            <View style={styles.whiteBodyContainer}>
                <View style={styles.column} >
                    <Text style={styles.whiteBodyText}>{translate("Group")}</Text>
                    <Text style={[styles.whiteBodyText, { color: ColorConstant.BLACK }]}>{groupName}</Text>
                </View>
                <View style={[styles.column, { width: '40%' }]} >
                    <Text style={styles.whiteBodyText}>{translate("Selected Plan")}</Text>
                    <Text style={[styles.whiteBodyText, { color: ColorConstant.BLACK }]}>{devicePlan} {devicePlan  ? <Text style={{ color: ColorConstant.GREY }}> {item && item.devicePlan ? '(' + item.devicePlan.planDuration + ')' : null} </Text> : 'null'}</Text>
                    {/* <Text style={[styles.whiteBodyText, { color: ColorConstant.BLACK }]}>{planStatus} {devicePlan && devicePlan.planDuration ? <Text style={{ color: ColorConstant.GREY }}>({item.duration})</Text> : null}</Text> */}
                </View>
                <View style={[styles.column, { width: '25%' }]}>
                    <Text style={styles.whiteBodyText}>{translate("Plan Expiry")}</Text>
                    <Text style={[styles.whiteBodyText, { color: ColorConstant.BLACK }]}>{expiryDate}</Text>
                </View>
            </View>

            {/* Active/Inactive body */}
            <View style={[styles.activeInactiveText,{backgroundColor:deviceDTO.deviceStatus == "ACTIVE" ? ColorConstant.LIGHTENGREEN : ColorConstant.LIGHTENPINK}]}>
                <Text style={{fontSize:FontSize.FontSize.small,color:deviceDTO.deviceStatus == "ACTIVE" ? ColorConstant.DARKENGREEN : ColorConstant.DARKPINK}}>
                    {deviceDTO.deviceStatus == "ACTIVE" ? "Active": "Inactive" }
                </Text>
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        //width:'100%',
        width: Dimensions.get('screen').width - 30,
        marginVertical: hp(1.5),
        // height:hp(18),
        alignSelf: 'center',
        backgroundColor: ColorConstant.WHITE,
        borderRadius: 15,
        elevation: 3,
        borderWidth: 0.3,
        borderColor: ColorConstant.GREY,
        shadowColor: ColorConstant.GREY,
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 0 },
    },
    blueConatiner: {
        backgroundColor: ColorConstant.BLUE,
        flexDirection: 'row',
        width: "100%",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingHorizontal: hp(3)
    },
    activeInactiveText: {
        flexDirection: 'row',
        width: "100%",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        justifyContent:'center'
       // paddingHorizontal: hp(3)
    },
    blueTopHead: {
        alignContent: 'space-between',
        marginVertical: hp(0.5)
    },
    editButton: {
        flexDirection: 'row',
        width: wp(10),
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        padding: hp(1.5),
        marginLeft: 'auto'
    },
    headerTitle: {
        color: ColorConstant.WHITE,
        fontSize: FontSize.FontSize.small
    },
    toolTipText: {
        alignSelf: 'center',
        fontSize: FontSize.FontSize.medium,
    },
    pointerStyle: {
        elevation: 0.1,
        top: 3,
        borderBottomWidth: 12,
    },
    toolTipContainer: {
        borderColor: ColorConstant.ORANGE,
        borderWidth: 1,
        borderRadius: 6
    },
    image: {
        height: hp(1.5),
        resizeMode: 'contain'
    },
    id: {
        color: ColorConstant.ORANGE,
        fontSize: FontSize.FontSize.extraSmall
    },
    headerRight: {
        marginRight: wp(5),
        height: hp(2.2),
        width: wp(3),
        resizeMode: 'contain'
    },
    toolTip: {
        marginTop: hp(1),
        left: 10,
        zIndex:10
    },
    textStyle: {
        margin: hp(0.5),
        color: ColorConstant.BLUE,
        textAlignVertical: 'center',
        paddingLeft: hp(0.5)
    },
    whiteBodyContainer: {
        flexDirection: 'row',
        marginTop: hp(1.5),
        paddingHorizontal: hp(2.5),
        paddingBottom: hp(1.5)
    },
    whiteBodyText: {
        color: ColorConstant.GREY,
        fontSize: FontSize.FontSize.small
    },
    column: {
        flexDirection: 'column', width: '35%'
    }
})

export default DeviceCell