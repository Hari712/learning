import React from 'react'

export const navigationRef = React.createRef();

function navigate(name, params) {
    navigationRef.current && navigationRef.current.navigate(name, params);
}

function replace(name, param){
    navigationRef.current && navigationRef.current.replace(name, param);
}

export default {
    navigate,
    replace
}