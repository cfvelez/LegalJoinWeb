import {combineReducers} from 'redux';
import {user} from './reducers/user'
import {navigation} from './reducers/navigation'
import {token} from './reducers/token'
import {status} from './reducers/system'
export default combineReducers({user,navigation,token,status});
