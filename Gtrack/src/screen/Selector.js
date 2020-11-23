import { createSelector } from 'reselect'
import isNil from 'lodash/isNil'
import isEmpty from 'lodash/isEmpty'
/**
 * Get User Login Information
 */
export const getLoginInfo = (state) => state.login
export const getLoginState = createSelector(
    [getLoginInfo],
    (info) => info
    
)

export const isUserLoggedIn = createSelector(
    [getLoginInfo],
    (info) => info && !isEmpty(info.accessToken)
)

/**
 * Get SubUser Information
 */

export const getSubuserInfo = (state) => state.users
export const getSubuserState = createSelector(
    [getSubuserInfo],
    (info) => info
    
)

