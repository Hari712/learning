import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import images from '../constants/images';
import { ColorConstant } from '../constants/ColorConstants';
import { FontSize } from '.';
import { Dialog } from 'react-native-simple-dialogs';
import { translate } from '../../App';

const GeofenceDeleteDialog = (props) => {

    const { deleteDialogBox, geofenceName, setDeleteDialogBox, ondeleteGeofence  } = props

    return(
        <Dialog visible={deleteDialogBox} onTouchOutside={() => { setDeleteDialogBox(false) }} dialogStyle={styles.dialogStyle}>

            <View style={styles.deleteDialogMainView}>

                <View style={styles.subHeadingView}>
                    <Text style={styles.deleteText}>Are you sure ?</Text>
                    <TouchableOpacity onPress={() => { setDeleteDialogBox(false) }}>
                        <Image source={images.geoFence.CrossBlack} resizeMode="contain" style={styles.crossImageStyle} />
                    </TouchableOpacity>
                </View>
                <View style={styles.textMainView}>
                    <Text style={styles.textViewStyle}>Do you really want to delete {geofenceName} ? </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => setDeleteDialogBox(false)  } style={[styles.cancelButton]}>
                        <Text style={styles.buttonTextColor}>{translate("Cancel")}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => ondeleteGeofence()} style={styles.nextButton}>
                        <Text style={styles.nextButtonText}>{translate("Delete_string")}</Text>
                    </TouchableOpacity>
                </View>

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
        flex: 1,
        paddingHorizontal:hp(1.5),
        backgroundColor: ColorConstant.WHITE,
    },
    deleteDialogMainView: {
        height: hp(23),
        width: wp(80)
    },
    subHeadingView: {
        flexDirection: 'row',
        //marginTop: hp(2),
        justifyContent: 'space-between'
    },
    deleteText: {
        fontSize: FontSize.FontSize.medium,
        color: ColorConstant.ORANGE,
        fontWeight: 'bold',
        marginLeft: wp(25),
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
        marginRight: wp(2)
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

export default GeofenceDeleteDialog