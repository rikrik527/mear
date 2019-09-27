import {combineReducers} from 'redux'
import alert from './alert'
import counter from './counter'
import auth from './auth'
import profile from './profile'
export default combineReducers({
    alert,
    counter,
    auth,
    profile
})