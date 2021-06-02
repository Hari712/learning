import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import images from '../constants/images';
import { ColorConstant } from '../constants/ColorConstants';
import { FontSize } from '.';
import { Dialog } from 'react-native-simple-dialogs';
import { translate } from '../../App';
import { RadioButtonIcon, RadioButtonIconClicked } from './SvgComponent';

export const timeZoneEnum = [
    {
        name: "(GMT +05:30) Asia/Kolkata",
        value: "IST",
        momenttz: "Asia/Kolkata"
    },
    {
        name: "(GMT -04:00) America/Toronto",
        value: "America/Toronto",
        momenttz: "America/Toronto"
    },
    {
        name: "(GMT +00:00) UTC",
        value: "utc",
        momenttz: "utc"
    }
]

export function showTimeText(input) {
    const filter = timeZoneEnum.filter((item)=>item.value==input)
    const name = filter ? filter[0].name : input;
    return name
}

export function getMomentText(input) {
    const filter = timeZoneEnum.filter((item)=>item.value==input)
    const tz = filter ? filter[0].momenttz : null;
    return tz
}

const TimeZoneDialog = (props) => {

    const { visible, closeDialogBox, setTimeZone, timeZone  } = props

        return(
        <Dialog visible={visible} onTouchOutside={() => { closeDialogBox(false) }} dialogStyle={styles.dialogStyle}>

            <View style={styles.deleteDialogMainView}>

                <View style={styles.subHeadingView}>
                    <Text style={styles.deleteText}>Select Time Zone</Text>
                    <TouchableOpacity onPress={() => { closeDialogBox(false) }}>
                        <Image source={images.geoFence.CrossBlack} resizeMode="contain" style={styles.crossImageStyle} />
                    </TouchableOpacity>
                </View>
                {/* <View style={styles.textMainView}>
                    <Text style={styles.textViewStyle}>Do you really want to delete {geofenceName} ? </Text>
                </View> */}

                {/* <View style={{flexDirection:'row',marginTop:hp(1),alignItems:'center'}}> */}
                    {
                        timeZoneEnum.map((item,key)=>{
                            const selected = (item.value===timeZone)
                        return(
                            <TouchableOpacity key={key} onPress={()=>{setTimeZone(item.value)}} style={styles.container}>
                                {selected ? <RadioButtonIconClicked /> : <RadioButtonIcon />}
                                <Text style={[styles.listTextStyle,selected && {color:ColorConstant.ORANGE}]}>{item.name}</Text>
                            </TouchableOpacity>                                  
                        )
                        })
                    }
                    {/* </View> */}

                {/* <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => setDeleteDialogBox(false)  } style={[styles.cancelButton]}>
                        <Text style={styles.buttonTextColor}>{translate("Cancel")}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => ondeleteGeofence()} style={styles.nextButton}>
                        <Text style={styles.nextButtonText}>{translate("Delete_string")}</Text>
                    </TouchableOpacity>
                </View> */}

            </View>
        </Dialog>
    )
}

const styles = StyleSheet.create({
    dialogStyle: {
        borderRadius: 15,
        backgroundColor: ColorConstant.WHITE
    },
    container: {
        flexDirection:'row',
        marginVertical:hp(1.5)
    },
    listTextStyle: {
        fontSize:FontSize.FontSize.small,
        flex:1,
        fontFamily:'Nunito-Regular',
        paddingLeft:10,
        color:ColorConstant.BLACK,
        textAlignVertical:'center'
    },
    deleteDialogMainView: {
        height: hp(23),
        width: wp(80)
    },
    subHeadingView: {
        flexDirection: 'row',
        marginBottom: hp(2),
        justifyContent: 'space-between'
    },
    deleteText: {
        fontSize: FontSize.FontSize.medium,
        color: ColorConstant.ORANGE,
        fontWeight: 'bold',
        marginLeft: wp(18),
    },
    textMainView: {
        marginTop: hp(5),
        alignSelf: 'center'
    },
    textViewStyle: {
        fontSize: FontSize.FontSize.small,
        color: ColorConstant.BLACK
    },
    crossImageStyle: {
        marginTop: hp(0.5),
        marginRight: wp(4)
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp(75),
        marginTop: hp(7),
        alignSelf: 'center',
    },
    cancelButton: {
        borderRadius: 6,
        width: '40%',
        height: hp(4),
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: ColorConstant.BLUE,
    },
    buttonTextColor: {
        textAlign: 'center',
        color: ColorConstant.BLUE
    },
    nextButton: {
        borderRadius: 6,
        width: '40%',
        height: hp(4),
        justifyContent: 'center',
        backgroundColor: ColorConstant.BLUE,
    },
    nextButtonText: {
        textAlign: 'center',
        color: ColorConstant.WHITE,
        fontWeight: 'bold'
    },
})

export default TimeZoneDialog