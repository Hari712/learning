import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { ColorConstant } from '../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { translate } from '../../App';
import { CloseIcon, RadioButtonIcon, RadioButtonIconClicked } from '../component/SvgComponent';
import { Dialog } from 'react-native-simple-dialogs'

const UsersFilterDialog = (props) => {

    const { visible, setVisible, status, setStatus, IsRole, setIsRole, resetHandle, filterHandle, userType } = props

    return (
        <Dialog
            visible={visible}
            dialogStyle={{ backgroundColor: ColorConstant.WHITE, borderRadius: 20 }}
            onTouchOutside={() => setVisible(false)}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.filterText}>Filter</Text>
                <TouchableOpacity onPress={() => setVisible(false)} >
                    <CloseIcon width={14.984} height={14.984} />
                </TouchableOpacity>
            </View>

            <View style={styles.filterContainer}>
                <View style={{ marginTop: hp(2) }}>
                    <Text style={styles.titleText}>Status</Text>
                    {Status.map((item, key) =>
                        <TouchableOpacity key={key} onPress={() => key == status ? setStatus(-1) : setStatus(key)} style={styles.filterBox}>
                            {key == status ? <RadioButtonIconClicked style={{ alignSelf: 'center' }} /> : <RadioButtonIcon style={{ alignSelf: 'center' }} />}
                            <Text style={styles.textFilter}>{item}</Text>
                        </TouchableOpacity>)}
                </View>
                {userType == 'mobile' ? null :
                    <View style={{ marginTop: hp(2) }}>
                        <Text style={styles.titleText}>Roles</Text>
                        {Role.map((role, key) =>
                            <TouchableOpacity onPress={() => key == IsRole ? setIsRole(-1) : setIsRole(key)} style={styles.filterBox} key={key}>
                                {key == IsRole ? <RadioButtonIconClicked style={{ alignSelf: 'center' }} /> : <RadioButtonIcon style={{ alignSelf: 'center' }} />}
                                <Text style={styles.textFilter}>{role}</Text>
                            </TouchableOpacity>)}
                    </View>
                }
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => resetHandle()} style={styles.cancelButton}>
                    <Text style={{ textAlign: 'center', color: ColorConstant.BLUE }}>{translate("Reset")}</Text>
                </TouchableOpacity>

                <TouchableOpacity disabled={IsRole == -1 && status == -1} onPress={() => filterHandle()}
                    style={[styles.nextButton, { backgroundColor: (IsRole == -1 && status == -1) ? '#06418E50' : ColorConstant.BLUE }]}>
                    <Text style={{ textAlign: 'center', color: ColorConstant.WHITE }}>Okay</Text>
                </TouchableOpacity>
            </View>
        </Dialog>
    )
}

const Status = ['Active', 'Inactive']

const Role = ['Admin', 'Regular']

const styles = StyleSheet.create({
    filterText: {
        color: ColorConstant.ORANGE,
        marginLeft: hp(15),
        fontFamily: "Nunito-Bold",
        fontSize: hp(2)
    },
    addButton: {
        //paddingHorizontal:hp(2),
        //marginHorizontal:hp(2),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '14%',
        height: hp(6),
        borderRadius: 12,
        marginTop: hp(4),
        //marginBottom:hp(2),
        elevation: 4,
        shadowColor: ColorConstant.GREY,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 3,
        shadowOpacity: 1,
        backgroundColor: ColorConstant.WHITE

    },
    textFilter: {
        paddingLeft: hp(1),
        fontFamily: "Nunito-Regular",
        color: ColorConstant.BLACK
    },
    titleText: {
        color: ColorConstant.BLUE,
        fontFamily: "Nunito-SemiBold"
    },
    filterBox: {
        flexDirection: 'row',
        marginTop: hp(2)
    },
    filterContainer: {
        flexDirection: 'row',
        paddingHorizontal: hp(3),
        justifyContent: 'space-between'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: hp(5),
        //paddingHorizontal:hp(1),
        alignItems: 'center',
        paddingBottom: hp(2)
    },
    cancelButton: {
        borderRadius: 6,
        borderColor: ColorConstant.BLUE,
        borderWidth: 1,
        backgroundColor: ColorConstant.WHITE,
        width: '45%',
        height: hp(6),
        justifyContent: 'center'
    },
    nextButton: {
        borderRadius: 6,
        backgroundColor: ColorConstant.BLUE,
        width: '45%',
        height: hp(6),
        justifyContent: 'center'
    },
})

export default UsersFilterDialog