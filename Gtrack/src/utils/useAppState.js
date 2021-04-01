import React, { useEffect, useState } from 'react'
import { AppState } from 'react-native'

const useAppState = () => {

    const currentState = AppState.currentState

    const [appState, setAppState] = useState(currentState)

    useEffect(() => {
        AppState.addEventListener('change', onChange);

        return function () {
            AppState.removeEventListener('change', onChange);
        }
    },[])

    function onChange(newState) {
        setAppState(newState);
    }

    return appState;

}

export default useAppState