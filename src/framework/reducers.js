import { combineReducers } from 'redux'
// TODO change strings to Symbols
const user = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_USER_INFO':
            return {
                ...state,
                username: action.username,
                language: action.language,
                loggedIn: true
            }
        case 'UPDATE_USER_LANGUAGE':
            return {
                ...state,
                language: action.language
            }
        default:
            return state
    }
}
const page = (state = {}, action) => {
    switch (action.type) {
        case 'PAGE_CLEAR':
            return {
                loaded: false
            }
        case 'PAGE_LOAD':
            return {
                data: action.data,
                loaded: true
            }
        default:
            return state
    }
}
export default combineReducers({
    user,
    page
})
