import httpClient from '../httpClient';
import {showNotification} from '../../../utils/AppBehaviour';
import contactTxt from '../../../constants/txt/contactTxt'

export const create = async(contact) =>{
  var http = new httpClient();
  var info = { name: contact.first_name,lastname: contact.last_name};
  http.setToken();
  return http.axios.post('/contact',info)
    .then(() => {
      showNotification('success',contactTxt.success);
      return true
    })
    .catch((e) =>{
      showNotification('success',e.message);
      return false;
    } );
  }
export const all = async() =>{
  var http = new httpClient();
  http.setToken();
  return http.axios.get('/contact')
      .then(() => {
        return true
    }).catch((e) =>{ console.log(e); return false; });
  }

export const update = ()=> {
  return "Update";
}

export const remove = ()=> {
  return "Delete";
}
