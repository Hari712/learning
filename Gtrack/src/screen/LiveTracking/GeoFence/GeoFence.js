
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ColorConstant } from '../../../constants/ColorConstants';
import { FontSize } from '../../../component';
import { translate } from '../../../../App';
import { useDispatch, useSelector } from 'react-redux';
import { getGeofenceListInfo, getLoginState, isRoleRegular } from '../../Selector';
import { SCREEN_CONSTANTS } from '../../../constants/AppConstants';
import * as LivetrackingActions from '../Livetracking.Action'
import { BackIcon } from '../../../component/SvgComponent';
import AppManager from '../../../constants/AppManager';
import GeofenceList from './GeofenceList';
import GeofenceEditDialog from '../../../component/GeofenceEditDialog';
import GeofenceDeleteDialog from '../../../component/GeofenceDeleteDialog';

const GeoFence = ({ navigation }) => {

    const { isRegular} = useSelector(state => ({
        isRegular: isRoleRegular(state)
    }))
    
    const [dialogVisible, setDialogVisible] = useState(false)
    const [deleteDialogBox, setDeleteDialogBox] = useState(false)
    const [activeGeofence, setActiveGeofence] = useState()
    const [geofenceId, setGeofenceId] = useState()
    const [geofenceName, setGeofenceName] = useState("")
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [selectedDevice, setSelectedDevice] = useState([]);

    const dispatch = useDispatch()

    const { loginData, geofenceList } = useSelector(state => ({
        loginData: getLoginState(state),
        geofenceList: getGeofenceListInfo(state)
    }))

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={styles.headerTitle}>
                    {translate("Geo Fence")}
                </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity style={{padding:hp(2)}} onPress={() => navigation.goBack()}>
                    <BackIcon />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    useEffect(() => {  
        loadGeofenceList()
    }, [])

    function loadGeofenceList() {
        AppManager.showLoader()  
        dispatch(LivetrackingActions.requestGetGeofence(loginData.id, onSuccess, onError))
    }

    function onSuccess(data) { 
        console.log("geofence",data)   
        setIsRefreshing(false) 
        AppManager.hideLoader()
    }
    
    function onError(error) {
        AppManager.hideLoader()
        setIsRefreshing(false) 
    }

    function ondeleteGeofence() {
        setDeleteDialogBox(false)   
        AppManager.showLoader()  
        dispatch(LivetrackingActions.requestDeleteGeofence(loginData.id, geofenceId, onGeofenceDeleteSuccess, onGeofenceDeleteError))
    }

    function onGeofenceDeleteSuccess(data) { 
        AppManager.showSimpleMessage('success', { message: "Geofence deleted successfully", description: '', floating: true })
        dispatch(LivetrackingActions.requestGetGeofence(loginData.id, onSuccess, onError))
        AppManager.hideLoader()
    }
    
    function onGeofenceDeleteError(error) {
        AppManager.hideLoader()
        console.log("Error",error)  
    }

    function GeoFenceInfoItem({ item }) {
        return(
            <GeofenceList  
                item={item}
                setActiveGeofence={setActiveGeofence}
                setSelectedDevice={setSelectedDevice}
                setDialogVisible={setDialogVisible}
                dialogVisible={dialogVisible}
                setGeofenceId={setGeofenceId}
                setGeofenceName={setGeofenceName}
                setDeleteDialogBox={setDeleteDialogBox}
                deleteDialogBox={deleteDialogBox}
            />
        )
    }

    function renderViewDialog() {
        return(
            <GeofenceEditDialog 
                dialogVisible={dialogVisible}
                setDialogVisible={setDialogVisible}
                selectedDevice={selectedDevice}
                activeGeofence={activeGeofence}
            />
        )
    }

    function renderDeleteDialog() {
        return(
            <GeofenceDeleteDialog 
                deleteDialogBox={deleteDialogBox}
                geofenceName={geofenceName}
                setDeleteDialogBox={setDeleteDialogBox}
                ondeleteGeofence={ondeleteGeofence}
            />
        )
    }

    const onRefresh = () => {
        setIsRefreshing(true)
        loadGeofenceList() 
    }

    return (
        <SafeAreaView style={styles.container}>
            { !isRegular ?
            <TouchableOpacity style={styles.createNewMainView} onPress={() => navigation.navigate(SCREEN_CONSTANTS.GEOFENCE_CREATE_NEW)} >
                <Text style={styles.createNewText}>{translate("Create New")}</Text>
            </TouchableOpacity> : null }

            <FlatList
                style={{}}
                contentContainerStyle={{}}
                data={geofenceList}
                renderItem={GeoFenceInfoItem}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={
                    <RefreshControl 
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}     
                    />
                }
            />

            {renderViewDialog()} 

            {renderDeleteDialog()}   

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerTitle: {
        color: ColorConstant.GREY,
        fontSize: FontSize.FontSize.medium,
        fontWeight: '500',
        textAlign: 'center'
    },
    container: {
        flex: 1,
        paddingHorizontal:hp(1.5),
        backgroundColor: ColorConstant.WHITE,
    },
    createNewMainView: {
        width: '95%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: ColorConstant.ORANGE,
        height: hp(5),
        borderRadius: 14,
        marginTop: hp(3)
    },
    createNewText: {
        fontSize: FontSize.FontSize.small,
        fontWeight: 'bold',
        color: '#ffffff'
    }
})

export default GeoFence;
