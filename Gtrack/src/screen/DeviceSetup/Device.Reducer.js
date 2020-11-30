import createReducer from '../../store/CreateReducer'
import * as types from '../../constants/ActionTypes'
import mapKeys from 'lodash/mapKeys'

const initialState = {
    assetType: null,
    assets: null,
    groups: {},
    devices: {}
}


export const deviceReducer = createReducer(state = initialState, {
    [types.GET_ASSETS_TYPE_RESPONSE](state, action) {
        const assetsTypeInfo = mapKeys(action.data, 'id')
        return {
            ...state,
            assetType: assetsTypeInfo
        }
    },
    [types.ADD_DEVICE_RESPONSE](state, action) {
        const deviceInfo = mapKeys(action.data, 'id')
        return {
            ...state,
            devices: deviceInfo
        }
    },
    [types.ADD_GROUP_RESPONSE](state, action) {
        const groupInfo = mapKeys(action.data, 'id')
        return {
            ...state,
            groups: groupInfo
        }
    },
    [types.ADD_ASSET_RESPONSE](state, action) {
        const assetInfo = mapKeys(action.data, 'id')
        return {
            ...state,
            assets: assetInfo
        }
    }
})