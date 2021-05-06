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

let socketIOConnOpt = {
    reconnection: true,
    reconnectionDelay: 10000,
    reconnectionDelayMax: 60000,
    reconnectionAttempts: 70,
    timeout: 10000,
    forceNew: true,
    transports: ['websocket']
};


let socket = null
let isConnecting = false


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

    const [traccarSessionInfoDetail, setTraccarSessionDetailInfo, traccarSessionInfoRef] = useStateRef(traccarSessionInfo)

    const currentAppState = useAppState()

    const isActiveState = currentAppState === 'active'

    const isBackgroundState = currentAppState === 'background'

    useEffect(() => {
        setTraccarSessionDetailInfo(traccarSessionInfo)
    },[traccarSessionInfo])

    useEffect(() => {
        if (isConnected && isLoggedIn && socket == null && isConnecting == false && !isEmpty(traccarSessionInfoRef.current)) {
            connectWitWebsocket()
        }
    },[traccarSessionInfo])

    useEffect(() => {
        if (!isLoggedIn) {
            socket && socket.close()
            socket = null
        }
    },[isLoggedIn])

    const value = {

    }

    function connectWitWebsocket() {
        const url = `wss://${socketURL}`
        socket = new WebSocket(url)
        socket.onopen = (event) => {
            console.log(event);
        }
        socket.onerror = (event) => {
            console.log(event);
        }
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            // data = [{},{},{},{}]
            // data = {positions:[{},{}]}
            // data = {devices:[{},{}]}
            
            if (data.positions && Array.isArray(data.positions)) {
                setArrDevicePositionList(data)
                dispatch(LiveTrackingActions.setLiveTrackingPositionData(data.positions))
            }
        }
        socket.onclose = function (event) {
            if (!event['reason']) {
              console.log(event);
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


