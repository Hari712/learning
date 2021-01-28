import React from 'react'
import { View, Image, StyleSheet, Text, ImageBackground, Dimensions, TouchableOpacity, TextInput, Button, Platform, ScrollView, Modal } from 'react-native'
import { ColorConstant } from '../../constants/ColorConstants'
import { OrangeCrossIcon } from '../../component/SvgComponent'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

export const TermsConditionModal = (props) => {
    const {tocVisible, setTocVisible} = props
    return(
        <Modal 
            isVisible={tocVisible}
            transparent={true}
            animationType="slide"
            onBackButtonPress={() => setTocVisible(false)}
            >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{flexDirection:'row'}}>
                    <Text style={styles.MainHeading}>
                        Terms & Conditions
                    </Text>
                    <TouchableOpacity onPress={()=> setTocVisible(false)}>
                        <OrangeCrossIcon width={15} height={15}/>
                    </TouchableOpacity>
                    </View>
                    <ScrollView style={{marginTop:hp(2)}}>
                        <Text style={styles.paragraph}>
                            Please read these Terms carefully. Access to, and use of Usabilla products (“Products”), Usabilla services (“Services”), and the Usabilla website https://app.usabilla.com/ (“Website”), including any of its content, is conditional on your agreement to these Terms. You must read, agree with, and accept all of the terms and conditions contained in these Terms. By creating an account, or by using or visiting our Website, you are bound to these Terms and you indicate your continued acceptance of these Terms.
                        </Text>
                        <Text style={styles.SubHeading}>
                        1. Your Usabilla Account
                        </Text>
                        <Text style={styles.paragraph}>
                        If you create an account on the Website, you are responsible for maintaining the security of your account, and you are fully responsible for all activities that occur under the account and any other actions taken in connection with the account. You agree to provide and maintain accurate, current and complete information, including your contact information for notices and other communications from us and your payment information. You may not use false or misleading information in connection to your account, or trade on the name or reputation of others, and Usabilla may change or remove any information that it considers inappropriate or unlawful, or otherwise likely to expose Usabilla to claims of third parties. You agree that we may take steps to verify the accuracy of information you have provided to us. You are responsible for taking reasonable steps to maintain the confidentiality of your username and password. You must immediately notify Usabilla of any unauthorized uses of your information, your account or any other security breaches. Usabilla will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions.
                        </Text>
                        <Text style={styles.SubHeading}>
                        2. Responsibility of Users of the Website, Products, and/or Services
                        </Text>
                        <Text style={styles.paragraph}>
                        Your access to, and all of your use of the Website, Products, and/or Services must be lawful and must be in compliance with these Terms, and any other agreement between you and Usabilla.
                        When accessing or using the Website, Products, and/or Services, you must behave in a civil and respectful manner at all times. We specifically prohibit any use of the Website, Products, and/or Services, and you agree not to use the Website, for any of the following:
                        </Text>
                        <Text style={styles.paragraph}>
                        • Engaging in conduct that would constitute a criminal offense, giving rise to civil liability or otherwise violate any city, state, national or international law or regulation that would fail to comply with accepted internet protocol;
                        {"\n"}• Communicating, transmitting, or posting material that is copyrighted or otherwise owned by a third party unless you are the copyright owner or have the permission of the owner to post it;
                        {"\n"}• Communicating, transmitting, or posting material that reveals trade secrets, unless you own them or have the permission of the owner;
                        {"\n"}• Communicating, transmitting, or posting material that infringes on any other intellectual property, privacy or publicity right of another;
                        {"\n"}• Attempting to interfere in any way with the Website, or our networks or network security, or attempting to use our Website to gain unauthorized access to any other computer system;
                        {"\n"}• Accessing data not intended for you, or logging on to a server or account, which you are not authorized to access;
                        {"\n"}• Attempting to probe, scan or test the vulnerability of a system or network or to breach security or authentication measures without proper authorization (or succeeding in such an attempt);
                        {"\n"}• Attempting to interfere or interfering with the operation of the Website.
                        </Text>
                    </ScrollView>
                </View>  
            </View>     
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    MainHeading: {
        flex:1,
        textAlign:'center',
        color:ColorConstant.ORANGE,
        //fontWeight:'bold',
        fontSize:hp(2.3),
        fontFamily:"Nunito-Bold"
    },
    SubHeading: {
        flex:1,
        textAlign:'left',
        color:ColorConstant.ORANGE,
        paddingVertical:hp(1),
        fontFamily:"Nunito-SemiBold"
    },
    paragraph:{
        fontFamily:"Nunito-Regular",
        fontSize:hp(1.7),
    }
})