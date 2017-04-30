import { combineReducers } from 'redux'
const user = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_USER_INFO':
            return {
                ...state,
                username: action.username,
                language: action.language,
                loggedIn: true
            }
        default:
            return state
    }
}
export default combineReducers({
    user
})
