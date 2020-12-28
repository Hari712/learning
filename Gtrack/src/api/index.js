import ApiConstants from './ApiConstants';
import axios from 'axios'
import { UNAUTHORIZED_ERROR_MESSAGE, USER_DATA, JWT_EXPIRED } from '../constants/AppConstants'
import url from 'url'
import { getItem, storeItem } from '../utils/storage'
import store from '../store/Store'
import isEmpty from 'lodash/isEmpty'
import isString from 'lodash/isString'
import * as LoginActions from '../screen/Login/Login.Action'

export const api = axios.create({
    baseURL: url.format(ApiConstants.BASE_URL)
});

export function setToken(token) {
    api.defaults.headers.Authorization = 'Bearer ' + token;
}

export function clearToken() {
    delete api.defaults.headers["Authorization"]
}

export function getToken() {
    return api.defaults.headers["Authorization"]
}

function baseAxios(options) {
    const defaultHeaders = {
        'Content-Type': 'application/json',
    }
    if (options.headers && options.headers['Content-Type']) {
        api.defaults.headers.common["Content-Type"] = options.headers['Content-Type']
    }

    if (options.headers && options.headers['version']) {
        api.defaults.headers.common["version"] = options.headers['version']
    }


    //api.defaults.headers =  options.headers == undefined ? defaultHeaders : options.headers
    api.defaults.timeout = options.timeout || 30000

    return api
}


api.interceptors.request.use(req => {
    const urlString = req.url
    console.log(`${req.method} ${req.url}`);
    
    // Important: request interceptors **must** return the request.
    return req;
  });

api.interceptors.response.use(response => response, errorResponseHandler);

function errorResponseHandler(error) {
    // check for errorHandle config
    console.log(error);

    return refreshToken(error);
}

async function refreshToken(error) {
    // const dispatch = useDispatch()
    const {
        config,
        response,
    } = error;
    let originalRequest = config;
    if (response.status && response.data) {
        const { status, data } = response
        console.log('Status.....', status)
        console.log('Error....', data)
        const message = data && data.message ? data.message : ''
        if ((status == 401 && message === UNAUTHORIZED_ERROR_MESSAGE)) {
            clearToken()
            const userInfo = await getItem(USER_DATA)
           
            if (!isEmpty(userInfo)) {
                const refreshToken = userInfo.refreshToken
                const userId = userInfo.userDTO.id
                const requestBody = { refreshToken: refreshToken }
                const url = ApiConstants.REFRESH_TOKEN(userId)
                const response = await executeRequest('post', url, requestBody);
                const result = response.result
                setToken(result.access_token)
                await storeItem(USER_DATA, result)
                LoginActions.setLoginResponse(result)
                originalRequest.headers['Authorization'] = 'Bearer ' + result.access_token;
                return api(originalRequest);
            }
        }
        else if (status == 500 && message.includes(JWT_EXPIRED)) {
            setTimeout(() => store.dispatch(LoginActions.requestLogout()), 1000)
        }
       
    } else {
       
    }
    return Promise.reject(error);
}

function executeRequest(method, pathname, data, options = {}) {
    const body = method === 'get' || !data ? {} : { data }
    const reqObj = { method, url: pathname, params: options.query, ...body }

    const baseAxiosRequest = baseAxios(options)
    return new Promise(async (resolve, reject) => {
        try {
            const res = await baseAxiosRequest
                .request(reqObj);
            resolve(res.data);
        }
        catch (error) {
            let errordata = parseError(error)
            reject(errordata);
        }
    })
}

const parseError = error => {
    console.log('Api Error', error)
    var message = "Something went wrong. Please try later";
    if (error && error.response != undefined) {
        if (error.response.data) {
            var data = error.response.data;
            if (isString(data)) {
                message = data
            } else {
                let errorData = data.message;
                if (errorData instanceof Array) {
                    message = errorData[0];
                } else {
                    message = errorData;
                }
            }
        }
    } else {
        message = error.message ? error.message : message;
    }
    console.log(message)
    return message;
};


export default {
    get(pathname, options) {
        return executeRequest('get', pathname, null, options)
    },

    post(pathname, data, options) {
        return executeRequest('post', pathname, data, options)
    },

    put(pathname, data, options) {
        return executeRequest('put', pathname, data, options)
    },

    delete(pathname, data, options) {
        return executeRequest('delete', pathname, data, options)
    },

    all(promises) {
        return axios.all(promises)
    }
}