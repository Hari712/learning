import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import Modal from 'react-native-modal'
import TextField from './TextField'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from './FontSize'
import { ColorConstant } from '../constants/ColorConstants'
import images from '../constants/images'


function AddNewGroupDialog(props) {
    const { isVisible, onSwipeComplete, onTapClose } = props

    const [groupName, setGroupName] = useState('')

    function hideDialog() {
        setTimeout(() => onCancelDialog(), 200)
    }

    function onCancelDialog() {
        onTapClose && onTapClose()
    }

    function renderBody() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Add New Group</Text>
                    <View style={styles.closeButton}>
                        <TouchableOpacity onPress={() => onCancelDialog()}>
                            <Image style={{ width: hp(1.5), height: hp(1.5) }} source={images.geoFence.CrossBlack} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TextField
                    valueSet={setGroupName}
                    label='Group Name*'
                    value={groupName}
                    onChangeText={(text) => setGroupName(text)}
                    style={styles.textNameStyle}
                    labelFontSize={hp(1.4)}
                    labelTextStyle={{ top: hp(0.3) }}
                    contentInset={{ label: hp(-0.5) }}
                    inputContainerStyle={styles.inputContainer}
                    outerStyle={{ marginBottom: hp(0.5) }}
                />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonTitle}>{`Create & Assign`}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <Modal
            testID={'modal'}
            isVisible={isVisible}
            onBackdropPress={() => hideDialog()}
            onSwipeComplete={() => onSwipeComplete()}
            swipeDirection={['down']}
            propagateSwipe={true}>
            {renderBody()}
        </Modal>
    )

}

const styles = StyleSheet.create({
    container: {
        paddingVertical: hp(1.5),
        marginTop: hp(2),
        backgroundColor: 'white',
        paddingHorizontal: hp(2),
        borderRadius: hp(1)
    },
    header: {
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '100%', 
        marginBottom: hp(2)
    },
    closeButton: {
        position: 'absolute', 
        right: 0, 
        top: 3
    },
    headerText: { color: ColorConstant.ORANGE, fontSize: FontSize.FontSize.small, fontWeight: '600' },
    textNameStyle: {
        color: ColorConstant.BLACK,
        fontSize: FontSize.FontSize.small,
        fontWeight: '500'
    },
    inputContainer: {
        height: hp(5),
        borderRadius: hp(5),
    },
    button: {
        width: '100%',
        backgroundColor: ColorConstant.BLUE,
        width: '100%',
        height: hp(5),
        borderRadius: hp(0.5),
        marginTop: hp(2),
        justifyContent: 'center',
        alignItems: "center",
        marginBottom: hp(2)
    },
    buttonTitle: { color: ColorConstant.WHITE, fontWeight: '600', fontSize: FontSize.FontSize.small }
})

export default AddNewGroupDialog