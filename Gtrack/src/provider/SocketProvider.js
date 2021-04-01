import React, { useState, useContext, createContext, useEffect } from 'react'
import isEmpty from 'lodash/isEmpty'
import useStateRef from '../utils/useStateRef'
import useAppState from '../utils/useAppState' 
import io from 'socket.io-client'
import isNil from 'lodash/isNil'
import { getLoginState, isUserLoggedIn, getTraccarSessionInfo } from '../screen/Selector'
import ApiConstants from '../api/ApiConstants'

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

    const [isSocketConnected, setIsSocketConnected, isSocketConnectedRef] = useStateRef(false)

    const { isConnected, isLoggedIn, loginInfo, traccarSessionInfo } = useSelector(state => ({
        isConnected: state.network.isConnected,
        isLoggedIn: isUserLoggedIn(state),
        loginInfo: getLoginState(state),
        traccarSessionInfo: getTraccarSessionInfo(state)
    }))

    const [loginInfoDetail, setLoginInfoDetail, loginInfoDetailRef] = useStateRef(loginInfo)

    const [traccarSessionInfo, setTraccarSessionInfo, traccarSessionInfoRef] = useStateRef(traccarSessionInfo)

    const currentAppState = useAppState()

    const isActiveState = currentAppState === 'active'

    const isBackgroundState = currentAppState === 'background'

    const dispatch = useDispatch()

    useEffect(() => {
        setTraccarSessionInfo(traccarSessionInfo)
    },[traccarSessionInfo])

    useEffect(() => {
        if (isConnected && isLoggedIn && socket == null && isConnecting == false && isEmpty(traccarSessionInfoRef.current)) {
            connect()
        }
    },[isConnected, isLoggedIn, traccarSessionInfo])

    const value = {

    }

    function connect() {
        if (socket == null || !socket.connected) {
            let requestBody = { ...socketIOConnOpt }
            isConnecting = true
            socket = io(socketURL, requestBody)
            socket.on('connect', () => {
                console.log("Socket connection success-----------")
                isConnecting = false
                setIsSocketConnected(true)
                
            });

            socket.on('message', (reason) => {
                console.log("message-----------")
                console.log(reason)
            });

            socket.on('pong', function (ms) {
                console.log('Socket Pong', ms);
            });

            socket.on('disconnect', (reason) => {
                console.log("Socket disconnected-----------")
                isConnecting = false
                if (isSocketConnected == false) {
                    reConnectWithSocket()
                } else {
                    setIsSocketConnected(false)
                }

                socket = null
            });
        }
    }

    function disconnect() {
        isConnecting = false
        if (socket != null) {
            socket.close()
            setIsSocketConnected(false)
            socket = null
        }
    }

    return (
        <SocketContext.Provider value={value}>
            {props.children}
        </SocketContext.Provider>    
    )
}


