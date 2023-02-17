import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions, ActivityIndicator, ScrollView, PermissionsAndroid, Linking } from 'react-native';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FontSize, PdfViewerDialog } from '../../component';
import { useDispatch, useSelector } from 'react-redux'
import * as DeviceActions from '../DeviceSetup/Device.Action'
import AppManager from '../../constants/AppManager'
import { getLoginInfo } from '../Selector'
import NavigationService from '../../navigation/NavigationService'
import isEmpty from 'lodash/isEmpty'
import { translate } from '../../../App';
import { DeviceAssetListIcon, PickupCarIcon, DeviceAssetUserIcon, UsbIcon, ExportIcon, BackIcon } from '../../component/SvgComponent';
import RNFetchBlob from 'rn-fetch-blob';
import moment from 'moment';
import { upperCase } from 'lodash';
import FileViewer from 'react-native-file-viewer';

const Details = ({ route, navigation }) => {

    const { deviceId, title, devicePrimaryId } = route.params

    const [deviceData, setDeviceData] = useState(null)

    const [isLoading, setIsLoading] = useState(true)

    const [pdfView, setPdfView] = useState(false);
    
    const [pdfBase64, setPdfBase64] = useState('');

    const [pdfFileName, setPdfFileName] = useState('');
    
    const dispatch = useDispatch()

    const isAndroid = Platform.OS === 'android'

    const { loginInfo, isConnected } = useSelector((state) => ({
        loginInfo: getLoginInfo(state),
        isConnected: state.network.isConnected
    }))

    const user_id = loginInfo.id ? loginInfo.id : null

    useEffect(() => {
        loadDeviceDetail()
    }, [])
   
    function loadDeviceDetail() {
        AppManager.showLoader()
        dispatch(DeviceActions.requestGetDeviceDetailByIdAndUserId(user_id, devicePrimaryId, onDeviceDetailLoadedSuccess, onDeviceDetailLoadedError))
    }

    function onDeviceDetailLoadedSuccess(data) {
        setDeviceData(data)
        setIsLoading(false)
        AppManager.hideLoader()
    }

    function onDeviceDetailLoadedError(error) {
        AppManager.hideLoader()
        AppManager.showSimpleMessage('danger', { message: error, description: '' })
        setIsLoading(false)
    }

    function exportDeviceDetail() {
        if (isConnected) {
            AppManager.showLoader()
            let requestBody = {
                "paginationDTO": {
                    "pageNumber": 0,
                    "pageSize": 5,
                    "useMaxSearchAsLimit": false,
                    "searchColumnsList": [{
                        "columnName": "searchParam",
                        "searchStr": `${deviceId}`
                    }],
                    "sortHeader": "id",
                    "sortDirection": "DESC"
                },
                "type": null,
                "sendMail": false
            }
            // dispatch(DeviceActions.requestExportDeviceByDeviceID(user_id, requestBody, onDeviceDetailExportedSuccessfully, onDeviceDetailExportedFailure))
            dispatch(DeviceActions.getDeviceReportBYID(user_id, devicePrimaryId, onDeviceReportSuccess, onDeviceReportFail))
        } else {
            AppManager.showNoInternetConnectivityError()
        }
    }

    function onDeviceDetailExportedSuccessfully(data) {
        AppManager.hideLoader()
        AppManager.showSimpleMessage('success', { message: 'Device detail exported successfully. Please check your mail', description: '' });
    }

    function onDeviceDetailExportedFailure(error) {
        AppManager.hideLoader()
        AppManager.showSimpleMessage('danger', { message: error, description: '' })
    }

    function onDeviceReportSuccess(data) {
        const { base64PDF, fileName } = data;
        let pdf_data = base64PDF.split('data:application/pdf;base64, ');
        pdf_data = pdf_data[1];
        setPdfBase64(pdf_data);
        setPdfFileName(fileName);
        AppManager.hideLoader();
        setPdfView(true);
    }

    function onDeviceReportFail(error) {
         AppManager.hideLoader()
         AppManager.showSimpleMessage('danger', { message: error, description: '' })
    }

    async function downloadFile() {
        setPdfView(false);
        try {
            if(isAndroid) {
                const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: "Storage Permission",
                    message: "App needs access to memory to download the file "
                }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        download();
                }
                else {
                        Alert.alert(
                        "Permission Denied!",
                        "You need to give storage permission to download the file"
                        );
                        AppManager.showSimpleMessage('danger', { message: 'Permission Denied!', description:  'You need to give storage permission to download the file' })
                }
            }
            else {
                download();
            }
        } catch (err) {
            console.warn(err);
        }
    }

    const download = () => {
        AppManager.showLoader()
        const { fs } = RNFetchBlob;
        const downloads = isAndroid ? fs.dirs.DownloadDir : fs.dirs.DocumentDir;
        const directory = downloads + "/Gtrack"
        const file_path = directory + `/${pdfFileName}_${moment.utc().valueOf()}.pdf`
        RNFetchBlob.config({
            fileCache: true,
            appendExt: 'pdf',
            addAndroidDownloads : {
                useDownloadManager : true, // <-- this is the only thing required
                // Optional, override notification setting (default to true)
                notification : true,
 
                // Title of download notification
                 title : 'Great ! Download Success ! :O ',
                 // Make the file scannable  by media scanner
                 mediaScannable : true,
                // Optional, but recommended since android DownloadManager will fail when
                // the url does not contains a file extension, by default the mime type will be text/plain
                mime : 'application/pdf',
                description : 'File downloaded by download manager.'
            },
        })
        fs.exists(directory)
        .then((exists) => {
            if (!exists) {
                return fs.mkdir(directory);
            }
        })
        .then(() => {
            console.log('directory', directory)
            fs.writeFile(file_path, pdfBase64, 'base64')
            .then(() =>  downloadSuccess(file_path))
            .catch(() => downloadFailed()) 
        }) .catch((err) => console.log('directory err' , err))
    };

    function downloadSuccess(file_path) {
        AppManager.hideLoader()
        AppManager.showSimpleMessage('success', { message: 'File Downloaded to Your Phone.', description: '' })

        setTimeout(() =>  FileViewer.open(file_path), 3000)
       
        // if (isAndroid) {
        //     RNFetchBlob.android.actionViewIntent(file_path, 'application/pdf');
        //   } else {
        //     RNFetchBlob.ios.openDocument(file_path);
        //   }
    }

    function downloadFailed() {
        AppManager.hideLoader()
        AppManager.showSimpleMessage('danger', { message: 'Something Wrong!', description: 'File cannot Download to Your Phone.' })
    }

    useLayoutEffect(() => { 
        navigation.setOptions({
            headerTitle: () => (
                <Text style={{
                    color: ColorConstant.GREY,
                    fontSize: 14,
                    fontFamily: 'Nunito-SemiBold',
                    textAlign: 'center'
                }}>
                    Details of {title}
                </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity style={{padding:hp(2)}} onPress={() => navigation.goBack()}>
                    <BackIcon />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    function renderDevicePlanDetail(devicePlan) {
        const devicePlanName = devicePlan && devicePlan.subscriptionPlanCurrency && devicePlan.subscriptionPlanCurrency.subscriptionPlan && devicePlan.subscriptionPlanCurrency.subscriptionPlan.planName ? devicePlan.subscriptionPlanCurrency.subscriptionPlan.planName : 'None'
        const activationDate = devicePlan && devicePlan.activationDate ? devicePlan.activationDate : ''
        const deActivationDate = devicePlan && devicePlan.deActivationDate ? devicePlan.deActivationDate : ''
        const planDuration = devicePlan && devicePlan.planDuration ? devicePlan.planDuration : null
        const planPrice = devicePlan && planDuration === 'MONTHLY' ? devicePlan.subscriptionPlanCurrency.monthlyFee : devicePlan.subscriptionPlanCurrency.annualFee
        const deviceUpdateFrequency =   devicePlan && devicePlan.subscriptionPlanCurrency && devicePlan.subscriptionPlanCurrency.subscriptionPlan &&  devicePlan.subscriptionPlanCurrency.subscriptionPlan.updateFrequency ? devicePlan.subscriptionPlanCurrency.subscriptionPlan.updateFrequency : null
        const deviceDataRetention =   devicePlan && devicePlan.subscriptionPlanCurrency && devicePlan.subscriptionPlanCurrency.subscriptionPlan &&  devicePlan.subscriptionPlanCurrency.subscriptionPlan.dataRetention ? devicePlan.subscriptionPlanCurrency.subscriptionPlan.dataRetention : null
        // const tax = devicePlan && devicePlan.tax ? devicePlan.tax : 0
        // const actualTax = (planPrice * tax) / 100
        // const payableAmount = planPrice + actualTax
        return (
            <>
                <View style={styles.details}>
                    <View style={[styles.detailsSubView, { flex: 1.5 }]} >
                        <Text style={styles.textStyle}>{translate("Plan")}</Text>
                        <Text style={[styles.textStyle, { color: ColorConstant.BLACK, marginTop: hp(1) }]}>{devicePlanName}</Text>
                    </View>
                    <View style={[styles.detailsSubView, { flex: 0.9 }]} >
                        <Text style={styles.textStyle}>{translate("Price")}</Text>
                        <Text style={[styles.textStyle, { color: ColorConstant.BLACK, marginTop: hp(1) }]}>₹ {planPrice}</Text>
                    </View>
                    <View style={[styles.detailsSubView, { flex: 1.2 }]}>
                        <Text style={styles.textStyle}>{translate("Start Date")}</Text>
                        <Text style={[styles.textStyle, { color: ColorConstant.BLACK, marginTop: hp(1) }]}>{activationDate}</Text>
                    </View>
                    <View style={[styles.detailsSubView, { flex: 1 }]}>
                        <Text style={styles.textStyle}>{translate("End Date")}</Text>
                        <Text style={[styles.textStyle, { color: ColorConstant.BLACK, marginTop: hp(1) }]}>{deActivationDate}</Text>
                    </View>
                </View>
                <View style={styles.features}>
                    <Text style={[styles.textStyle, { marginTop: hp(1) }]}>{translate("Features")}</Text>
                    <Text style={[styles.textStyle, { marginTop: hp(1) }]}>{'\u2B24'} <Text style={{ color: ColorConstant.BLACK }}>    {deviceUpdateFrequency ? `Update frequency - ${deviceUpdateFrequency} sec` :'-'}</Text></Text>
                    <Text style={[styles.textStyle, { marginTop: hp(1) }]}>{'\u2B24'} <Text style={{ color: ColorConstant.BLACK }}>    {deviceDataRetention ? `Data retention - ${deviceDataRetention} year` :'-'}</Text></Text>
                </View>
            </>
        )
    }

    function renderNoDetailsAvailable() {
        return (
            <View style={{ width: '100%', marginVertical: hp(2), justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: ColorConstant.BLACK, fontSize: FontSize.FontSize.extraSmall }}>No Details Available</Text>
            </View>
        )
    }

    function renderDevicePlan(devicePlan) {


        return (
            <View style={styles.cardContainer}>
                <View style={styles.headerDetail}>
                    <Text style={styles.headerText}>{translate("Plan Details")}</Text>
                    <DeviceAssetListIcon width={11.624} height={15.166}/>
                </View>
                <View style={styles.horizontalLine} />
                {devicePlan ? renderDevicePlanDetail(devicePlan) : renderNoDetailsAvailable()}

            </View>
        )
    }

    function renderAssetDetail(assetDTO) {
        const assetName = assetDTO.assetName ? assetDTO.assetName : ''
        const description = assetDTO.description ? assetDTO.description : 'none'
        const assetType = assetDTO.assetType ? assetDTO.assetType : ''
        return (
            <>
                <View style={styles.details}>
                    <View style={[styles.detailsSubView, { flex: 1 }]} >
                        <Text style={styles.textStyle}>{translate("Type")}</Text>
                        <Text style={[styles.textStyle, { color: ColorConstant.BLACK, marginTop: hp(1) }]}>{assetType}</Text>
                    </View>
                    <View style={[styles.detailsSubView, { flex: 2 }]} >
                        <Text style={styles.textStyle}>{translate("Description")}</Text>
                        <Text style={[styles.textStyle, { color: ColorConstant.BLACK, marginTop: hp(1) }]}>{description}</Text>
                    </View>
                </View>
            </>
        )
    }

    function renderAsetInfo(assetDTO) {
        return (
            <View style={styles.cardContainer}>
                <View style={styles.headerDetail}>
                    <Text style={styles.headerText}>Asset Details</Text>
                    <PickupCarIcon width={16.501} height={14.563}/>
                </View>
                <View style={styles.horizontalLine} />
                {assetDTO ? renderAssetDetail(assetDTO) : renderNoDetailsAvailable()}
            </View>
        )
    }

    function renderUserDetail(users) {
        return (
            <>
                {users.map((item, key) =>
                    <View key={key} style={styles.userDetails}>
                        <View style={[styles.detailsSubView, { flex: 1 }]} >
                            <Text style={styles.textStyle}>{translate("Name")}</Text>
                            <Text style={[styles.textStyle, { color: ColorConstant.BLACK, marginTop: hp(1) }]}>{item.firstName} {item.lastName}</Text>
                        </View>
                        <View style={[styles.detailsSubView, { flex: 2 }]} >
                            <Text style={styles.textStyle}>{translate("Role")}</Text>
                            {item.roles.map((role) =>
                            <Text style={[styles.textStyle, { color: ColorConstant.BLACK, marginTop: hp(1) }]}>{role.name == "ROLE_REGULAR" ? "Regular" : "Admin"}</Text>)}
                        </View>
                    </View>
                )}
            </>
        )
    }

    function renderUserInfo(users) {
        return (
            <View style={styles.cardContainer}>
                <View style={styles.headerDetail}>
                    <Text style={styles.headerText}>{translate("User Details")}</Text>
                    <DeviceAssetUserIcon  width={13.316} height={15.563}/>
                </View>
                <View style={styles.horizontalLine} />
                {isEmpty(users) ? renderNoDetailsAvailable() : renderUserDetail(users)}
            </View>
        )
    }

    function renderViewDialog() {
        return(
            <PdfViewerDialog 
                pdfData={pdfBase64}
                isVisible={pdfView}
                onTapClose={() => setPdfView(false)}
                onDownload={() => downloadFile()}
            />
        )
    }

    function renderDeviceDetail() {
        const assetDTO = deviceData && deviceData.assetDTO ? deviceData.assetDTO : null
        const deviceDTO = deviceData && deviceData.deviceDTO ? deviceData.deviceDTO : null
        const devicePlan = deviceData && deviceData.devicePlan ? deviceData.devicePlan : null
        const groupDTO = deviceData && deviceData.groupDTO ? deviceData.groupDTO : null
        const users = groupDTO && groupDTO.users ? groupDTO.users : []
        const groupname = groupDTO ? groupDTO.groupName : 'None'
        const isMoblieTracker =deviceDTO.isMobileTracker
        return (
            <>
                <ScrollView contentContainerStyle={{ flexGrow: 1 ,height:hp(100)}}>
                    <View style={styles.container}>
                        <View style={styles.cardContainer}>
                            <View style={styles.headerDetail}>
                                <Text style={styles.headerText}>{translate("Device Details")}</Text>
                                <UsbIcon width={13.892} height={15.213}/>
                            </View>
                            <View style={styles.horizontalLine} />

                            <View style={styles.details}>
                                <View style={styles.detailsSubView} >
                                    <Text style={styles.textStyle}>{translate("ID")}</Text>
                                    <Text style={[styles.textStyle, { color: ColorConstant.BLACK, marginTop: hp(1) }]}>{deviceId}</Text>
                                </View>
                                <View style={[styles.detailsSubView, { flex: 2.5 }]} >
                                    <Text style={styles.textStyle}>{translate("Name")}</Text>
                                    <Text style={[styles.textStyle, { color: ColorConstant.BLACK, marginTop: hp(1) }]}>{title}</Text>
                                </View>
                                <View style={[styles.detailsSubView, { flex: 1 }]}>
                                    <Text style={styles.textStyle}>{translate("Group")}</Text>
                                    <Text style={[styles.textStyle, { color: ColorConstant.BLACK, marginTop: hp(1) }]}>{groupname}</Text>
                                </View>
                            </View>
                        </View>


                        {renderDevicePlan(devicePlan)}
                        {!isMoblieTracker && renderAsetInfo(assetDTO)}
                        {!isMoblieTracker && renderUserInfo(users)}


                        <TouchableOpacity style={styles.export} onPress={() => exportDeviceDetail()}>
                            <ExportIcon/>
                            <Text style={{ color: ColorConstant.WHITE }}>{translate("Export Details")}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </>
        )
    }

    return (
        <View style={{flex:1, backgroundColor: ColorConstant.WHITE}}>
            {isLoading ? null : renderDeviceDetail()}
            {renderViewDialog()} 
        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        width: '100%',
        //height:Dimensions.get('screen').height,
        backgroundColor: ColorConstant.WHITE
    },
    cardContainer: {
        //width:'100%',
        width: Dimensions.get('screen').width - 30,
        marginTop: hp(4),
        // height:hp(18),
        elevation: 3,
        alignSelf: 'center',
        backgroundColor: ColorConstant.WHITE,
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: ColorConstant.GREY,
        shadowColor: ColorConstant.GREY,
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 0 },
    },
    headerDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: hp(2),
        alignItems: 'center',
        marginVertical: hp(1)
    },
    headerText: {
        color: ColorConstant.BLUE,
        fontSize: FontSize.FontSize.small,
        //fontWeight:'600'
        //fontSize:12,
        fontFamily: 'Nunito-Regular'
    },
    details: {
        flexDirection: 'row',
        marginTop: hp(1.5),
        marginHorizontal: hp(2),
        paddingBottom: hp(1)
    },
    detailsSubView: {
        flexDirection: 'column',
        flex: 3
    },
    horizontalLine: {
        borderBottomColor: ColorConstant.GREY,
        borderBottomWidth: 0.5,
        marginHorizontal: hp(2)
    },
    textStyle: {
        color: ColorConstant.GREY,
        //fontSize:FontSize.FontSize.small,
        fontSize: 10,
        fontFamily: 'Nunito-Regular'
    },
    features: {
        marginHorizontal: hp(2),
        paddingBottom: hp(2),
        //marginTop:hp(0.5)
    },
    userDetails: {
        flexDirection: 'row',
        //marginTop:hp(1),
        marginHorizontal: hp(2),
        marginVertical: hp(1.5)
    },
    export: {
        borderRadius: 6,
        flexDirection: 'row',
        width: '35%',
        bottom: hp(5),
        // marginTop:hp(8),
        marginVertical: hp(7),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: ColorConstant.BLUE,
        height: hp(5)
    },
    activityIndicator: {
        color: "#000",
        marginTop: '2%'
    }

});

export default Details;