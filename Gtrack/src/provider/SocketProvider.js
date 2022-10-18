import React, { useState, useContext, createContext, useEffect } from 'react'
import isEmpty from 'lodash/isEmpty'
import useStateRef from '../utils/useStateRef'
import useAppState from '../utils/useAppState' 
import io from 'socket.io-client'
import isNil from 'lodash/isNil'
import { getLoginState, isUserLoggedIn, getTraccarSessionInfo } from '../screen/Selector'
import * as LiveTrackingActions from '../screen/LiveTracking/Livetracking.Action'
import ApiConstants from '../api/ApiConstants'
import { useDispatch ,useSelector } from 'react-redux'
import { setNotificationEvents } from '../utils/socketHelper'
import * as LoginActions from '../screen/Login/Login.Action'


let socket = null
let isConnecting = false
let value;

const SocketContext = createContext(null)

const socketURL = ApiConstants.SOCKET_BASE_URL + 'api/socket'

const SocketProvider = (props) => {

    const dispatch = useDispatch()

    const [isSocketConnected, setIsSocketConnected, isSocketConnectedRef] = useStateRef(false)

    const { isConnected, isLoggedIn, loginInfo, traccarSessionInfo } = useSelector(state => ({
        isConnected: state.network.isConnected,
        isLoggedIn: isUserLoggedIn(state),
        loginInfo: getLoginState(state),
        traccarSessionInfo: getTraccarSessionInfo(state)
    }))
    
    const [loginInfoDetail, setLoginInfoDetail, loginInfoDetailRef] = useStateRef(loginInfo)

    const [arrDeveicePositionList, setArrDevicePositionList, arrDevicePositionListRef] = useStateRef([])

    const [traccarSessionInfoDetail, setTraccarSessionDetailInfo, traccarSessionInfoRef] = useStateRef()

    const currentAppState = useAppState()

    const isActiveState = currentAppState === 'active'

    const isBackgroundState = currentAppState === 'background'

    useEffect(() => {
        setTraccarSessionDetailInfo(traccarSessionInfo)
    },[traccarSessionInfo])

    useEffect(() => {
        if (isConnected && isLoggedIn && isConnecting == false && !isEmpty(traccarSessionInfoRef.current)) {
            connectWitWebsocket()
        }
    },[traccarSessionInfoDetail,isConnected])

    useEffect(() => {
        if (!isLoggedIn) {
            socket && socket.close()
            socket = null
        }
    },[isLoggedIn])
    console.log(traccarSessionInfoDetail, 'traccarSessionInfoDetail')

    function onTraccarSessionSuccess(data) {
		console.log('Traccar Session Success', data);
	}

	function onTraccarSessionError(error) {
		console.log('Traccar Session Error', error);
	}

    function connectWitWebsocket() {
        const url = `wss://${socketURL}`
        const headers = {};
        headers["cookie"] = `JSESSIONID=${traccarSessionInfoDetail.jsessionID}`;
        socket = new WebSocket(url, null, { headers })
        value = {
            socket: socket
        }
        console.log('socket', url, socket)
        socket.onopen = (event) => {
            console.log('socket open' ,event);
        }
        socket.onerror = (event) => {
            console.log('socket error',event);
        }
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);    
            // data = [{},{},{},{}]
            // data = {positions:[{},{}]}
            // data = {devices:[{},{}]}
            // data = {events:[{},{}]}
            //readSocketData(data)

            console.log("event",data)
            
            if(data.devices && Array.isArray(data.devices)) {
                console.log('devices info', data.devices)
                dispatch(LiveTrackingActions.setDeviceStatusData(data.devices))
            }
            
            if (data.positions && Array.isArray(data.positions)) {
                setArrDevicePositionList(data)
                dispatch(LiveTrackingActions.setLiveTrackingPositionData(data.positions))
            }

            if (data.events && Array.isArray(data.events)) {
                setArrDevicePositionList(data)
                const requestBody = {
                    "pageNumber" : 0,
                    "pageSize" : 10,
                    "useMaxSearchAsLimit" : false,
                    "searchColumnsList" : [],
                    "sortHeader" : "id",
                    "sortDirection" : "DESC"
                  }
                dispatch(LiveTrackingActions.requestGetNotificationList(loginInfo.id, requestBody, false, onSuccess, onError))
                dispatch(LiveTrackingActions.setNotificationEventsResponse(data.events))
                setNotificationEvents(data.events)
                function onSuccess(data) {    
                    console.log("Success",data) 
                }
                
                function onError(error) {
                    console.log("Error",error)  
                }
            }
        }
        socket.onclose = function (event) {
            if (!event['reason']) {
                console.log('socket onclose',event);
            }
            if(isConnected) {
                if(!isEmpty(loginInfo)) {
                    dispatch(
                        LoginActions.requestTraccarSession(loginInfo.id, onTraccarSessionSuccess, onTraccarSessionError)
                    );
                }
            }
        };
    }
    
    return (
        <SocketContext.Provider value={value}>
            {props.children}
        </SocketContext.Provider>    
    )
}


export default SocketProvider


