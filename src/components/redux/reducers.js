import { combineReducers } from 'redux'
import { UPDATE_NAV_ACTIVE_PATH } from './actions'

/**
 * 
 */
function sideMenuActivePath(state = [], action) {
    switch (action.type) {
        case UPDATE_NAV_ACTIVE_PATH:
            return state = action.newActivePath
        default:
            return state
    }
}

export default combineReducers({
    sideMenuActivePath
})