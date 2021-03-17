import React from 'react'
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";

export const appManagerRef = React.createRef();

function showSimpleMessage(type = "default", props = {}) {
    const message = {
        message: "Some message title",
        description: "Lorem ipsum dolar sit amet",
        icon: { icon: "auto", position: "left" },
        duration: 5000,
        type,
        ...props,
    };

    showMessage(message);
}

function messageWithPosition(position = "top", hasDescription = true, extra = {}) {
    let message = {
        message: "Some message title",
        type: "info",
        position,
        duration: 5000,
        ...extra,
    };

    if (hasDescription) {
        message = { ...message, description: "Lorem ipsum dolar sit amet" };
    } else {
        message = { ...message, floating: true };
    }

    showMessage(message);
}

function showNoInternetConnectivityError(){
    showSimpleMessage('warning', { message: 'No Internet Connectivity', description: 'Please check your internet connection', floating: true })
}


function showLoader() {
    appManagerRef && appManagerRef.current && appManagerRef.current.showLoader()
}

function hideLoader() {
    appManagerRef && appManagerRef.current && appManagerRef.current.hideLoader()
}

export default {
    showSimpleMessage,
    messageWithPosition,
    showNoInternetConnectivityError,
    showLoader,
    hideLoader
}