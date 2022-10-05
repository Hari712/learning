import createReducer from '../../store/CreateReducer'
import * as types from '../../constants/ActionTypes'
import mapKeys from 'lodash/mapKeys'

const initialState = {
    assetType: {},
    assets: {},
    groups: {},
    devices: {},
    userDevices: {}
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
        const deviceInfo = mapKeys(action.data, 'deviceDTO.id')
        const updatedDevices = { ...deviceInfo, ...state.devices }
        return {
            ...state,
            devices: updatedDevices
        }
    },
    [types.ADD_GROUP_RESPONSE](state, action) {
        const groupInfo = mapKeys(action.data, 'id')
        const updatedGroups = { ...state.groups, ...groupInfo }
        return {
            ...state,
            groups: updatedGroups
        }
    },
    [types.ADD_ASSET_RESPONSE](state, action) {
        const assetInfo = mapKeys(action.data, 'id')
        const updatedassets = { ...state.assets, ...assetInfo }
        return {
            ...state,
            assets: updatedassets
        }
    },
    [types.GET_ALL_USER_ASSETS_RESPONSE](state, action) {
        const assetInfo = mapKeys(action.data, 'id')
        return {
            ...state,
            assets: assetInfo
        }
    },
    [types.GET_ALL_GROUP_RESPONSE](state, action) {
        const groupInfo = mapKeys(action.data, 'id')
        return {
            ...state,
            groups: groupInfo
        }
    },
    [types.GET_ALL_USER_DEVICE_RESPONSE](state, action) {
        const { data, pageNumber } = action
        const deviceInfo = mapKeys(data, 'deviceDTO.id')
        let updatedDevices = {}
        if (pageNumber == 0) {
            updatedDevices = { ...deviceInfo }
        } else {
            updatedDevices = { ...state.devices, ...deviceInfo }
        }
        return {
            ...state,
            devices: updatedDevices
        }
    },
    [types.SET_ALL_DEVICE_USER_RESPONSE](state, action) {
        const { data } = action
        const arrDeviceInfo = mapKeys(data, 'deviceDTO.id')
        return {
            ...state,
            userDevices: arrDeviceInfo
        }
    },
    [types.DELETE_ASSET_BY_ASSET_ID_RESPONSE](state, action) {
        const { assetId } = action
        const assetListObj = state.assets
        delete assetListObj[assetId]
        return {
            ...state,
            assets: assetListObj
        }
    },
    [types.DELETE_GROUP_RESPONSE](state, action) {
        const { groupId } = action
        const groupListObj = state.groups
        delete groupListObj[groupId]
        return {
            ...state,
            groups: groupListObj
        }
    },
    [types.DELETE_DEVICE_FROM_RESPONSE](state, action) {
        const { deviceId, groupId } = action
        const groupListObj = state.groups
        delete groupListObj[groupId].devices[deviceId]
        return {
            ...state,
            groups: groupListObj
        }
    },
    [types.SEARCH_ASSET_RESPONSE](state, action) {
        const assetInfo = mapKeys(action.data, 'id')
        return {
            ...state,
            assets: assetInfo
        }
    },
    [types.UPDATE_GROUP_DEVICE_RESPONSE](state, action) {
        const group = action.data.groupDTO
        const arrGroup = state.groups ? state.groups : []
        const updatedGroupArr = Object.values(arrGroup).map((item) => {
            if (item.id == group.id) {
                item.devices.push(group.devices[0])
            }
            return item
        })
        const mapUpdatedGroups = mapKeys(updatedGroupArr, 'id')
        return {
            ...state,
            groups: mapUpdatedGroups
        }
    },
})