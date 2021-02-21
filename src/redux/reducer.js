import {combineReducers} from 'redux';
import {user} from './reducers/user'
import {navigation} from './reducers/navigation'
export default combineReducers({user,navigation});
