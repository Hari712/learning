import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, FlatList } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import images from '../constants/images';
import { ColorConstant } from '../constants/ColorConstants';
import { FontSize } from '.';
import { Dialog } from 'react-native-simple-dialogs';
import { translate } from '../../App';
import { RadioButtonIcon, RadioButtonIconClicked } from './SvgComponent';
import { timeZoneEnum } from '../constants/TimeZoneObj';

export function showTimeText(input) {
    var moment = require('moment-timezone');
    const filter = timeZoneEnum.filter((item)=>item.key==input)
    const name = filter.length > 0 ? filter[0].key : input;
    const tz = moment.tz(name).format('Z');
    const str = '(GMT ' + tz + ') '+ ( String(name).split('/')[1] ? String(name).split('/')[1] : String(name).split('/')[0])
    return str
}

export function getMomentText(input) {
    const filter = timeZoneEnum.filter((item)=>item.key==input)
    const tz = filter ? filter[0].key : null;
    return tz
}

const TimeZoneDialog = (props) => {

    const { visible, closeDialogBox, setTimeZone, timeZone  } = props

    const renderItem = ({item, index}) => {
        const selected = (item.key===timeZone)
        return(
            <TouchableOpacity key={item} onPress={()=>{setTimeZone(item.key)}} style={styles.container}>
                {selected ? <RadioButtonIconClicked /> : <RadioButtonIcon />}
                <Text style={[styles.listTextStyle,selected && {color:ColorConstant.ORANGE}]}>{showTimeText(item.key)}</Text>
            </TouchableOpacity>                                  
        )
    }

        return(
        <Dialog visible={visible} onTouchOutside={() => { closeDialogBox(false) }} dialogStyle={styles.dialogStyle}>

            <View style={styles.deleteDialogMainView}>

                <View style={styles.subHeadingView}>
                    <Text style={styles.deleteText}>Select Time Zone</Text>
                    <TouchableOpacity onPress={() => { closeDialogBox(false) }}>
                        <Image source={images.geoFence.CrossBlack} resizeMode="contain" style={styles.crossImageStyle} />
                    </TouchableOpacity>
                </View>
                
                {/* <ScrollView>
                    {
                        timeZoneEnum.map((item,key)=>{
                            const selected = (item.key===timeZone)
                        return(
                            <TouchableOpacity key={key} onPress={()=>{setTimeZone(item.key)}} style={styles.container}>
                                {selected ? <RadioButtonIconClicked /> : <RadioButtonIcon />}
                                <Text style={[styles.listTextStyle,selected && {color:ColorConstant.ORANGE}]}>{item.key}</Text>
                            </TouchableOpacity>                                  
                        )
                        })
                    }
                </ScrollView> */}

                <FlatList
                    renderItem = {renderItem}
                    data = {timeZoneEnum}
                    keyExtractor = {(item, index) => index.toString()}
                />
                

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
        height: hp(70),
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