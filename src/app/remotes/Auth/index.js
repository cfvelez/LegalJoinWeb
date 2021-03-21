
import login from './mock';
import User from '../../domains/User'
import axios from 'axios';
import store from '../../../redux/store'
import {set_token} from '../../../redux/actions/token'
import {SERVER} from '../../../constants/'

export const getUser = () => {
   const {first_name,last_name,email,phone_number} = login.userData;
   return new User(first_name,last_name,email,phone_number);
}

export const authUser = async(user, password) =>{;
 return axios.post(`${SERVER}/login_check`, {
    username: user,
    password: password
  })
  .then((data) => {
    setToken(data.data);
    return true
  })
  .catch(() => false );
}

export const setToken = (jwtoken) =>{
  store.dispatch(set_token(jwtoken));
}

export const logOut = () =>{
  return true;
}

