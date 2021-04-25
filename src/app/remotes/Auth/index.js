
import login from './mock';
import User from '../../domains/User'
import httpClient from '../httpClient';
import store from '../../../redux/store';
import {set_token} from '../../../redux/actions/token';
import {showNotification, hideNotification} from '../../../utils/AppBehaviour';

export const getUser = () => {
   const {first_name,last_name,email,phone_number} = login.userData;
   return new User(first_name,last_name,email,phone_number);
}

export const authUser = async(user, password) =>{
 var http = new httpClient();
 var info = {username: user, password: password};
 hideNotification();
 return http.axios.post('/login_check', info)
  .then((data) => {
    setToken(data.data);
    return true
  })
  .catch((e) =>{
    let resp = e.hasOwnProperty('response') ? e.response : null;
    let data = resp && resp.hasOwnProperty('data') ? resp.data : null;
    let message = data && data.hasOwnProperty('message') ? resp.message : 'Opps! error!.';
    showNotification('error',message);
    return false;
  }
  );
}

export const setToken = (jwtoken) =>{
  store.dispatch(set_token(jwtoken));
}



