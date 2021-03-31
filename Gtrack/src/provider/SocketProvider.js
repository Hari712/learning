import React, { useState, useContext, createContext, useEffect } from 'react'
import isEmpty from 'lodash/isEmpty'
import useStateRef from '../utils/useStateRef'
import useAppState from '../utils/useAppState' 
import io from 'socket.io-client'
import isNil from 'lodash/isNil'
import { getLoginState, isUserLoggedIn } from '../screen/Selector'

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

const SocketProvider = (props) => {

    const [isSocketConnected, setIsSocketConnected, isSocketConnectedRef] = useStateRef(false)

    const { isConnected, isLoggedIn, loginInfo } = useSelector(state => ({
        isConnected: state.network.isConnected,
        isLoggedIn: isUserLoggedIn(state),
        loginInfo: getLoginState(state)
    }))

    const [loginInfoDetail, setLoginInfoDetail, loginInfoDetailRef] = useStateRef(loginInfo)

    const currentAppState = useAppState()

    const isActiveState = currentAppState === 'active'

    const isBackgroundState = currentAppState === 'background'

    const dispatch = useDispatch()
}


