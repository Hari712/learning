import createReducer from '../../store/CreateReducer'
import * as types from '../../constants/ActionTypes'
import mapKeys from 'lodash/mapKeys'

const initialState = {
    assetsType: null
}


export const deviceReducer = createReducer(state = initialState, {
    [types.GET_ASSETS_TYPE_RESPONSE](state, action) {
        const assetsTypeInfo = mapKeys(action.data, 'id')
        return {
            ...state,
            assetsType: assetsTypeInfo
        }
    }
})