import React from 'react'
import { StackActions, NavigationActions } from '@react-navigation/native';

export const navigationRef = React.createRef();

export const routeNameRef = React.createRef()

function navigate(name, params) {
    navigationRef.current && navigationRef.current.navigate(name, params);
}

function replace(name, param){
    navigationRef.current && navigationRef.current.replace(name, param);
}

function push(name, params) {
    navigationRef.current && navigationRef.current.dispatch(StackActions.push(name, params))
}

function goBack() {
    navigationRef.current && navigationRef.current.goBack()
}

function pop() {
    navigationRef.current && navigationRef.current.dispatch(StackActions.pop())
}

function popToTop() {
    navigationRef.current && navigationRef.current.dispatch(StackActions.popToTop())
}

function getCurrentRouteName() {
    return routeNameRef && routeNameRef.current ? routeNameRef.current : '' 
}

export default {
    navigate,
    replace,
    push,
    goBack,
    pop,
    popToTop,
    getCurrentRouteName
}