import { combineReducers } from 'redux'
import { UPDATE_NAV_ACTIVE_PATH } from './actions'

/**
 * 
 */
function sideMenuActivePath(state = [], action) {
    console.log(sideMenuActivePath, state)
    switch (action.type) {
        case UPDATE_NAV_ACTIVE_PATH:
            return action.newActivePath
        default:
            return state
    }
}

export default combineReducers({
    sideMenuActivePath
})