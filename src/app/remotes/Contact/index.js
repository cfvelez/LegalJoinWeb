import httpClient from '../httpClient';
import {showNotification} from '../../../utils/AppBehaviour';
import contactTxt from '../../../constants/txt/contactTxt'

export const create = async(contact) =>{
  var http = new httpClient();
  var info = { name: contact.name,lastname: contact.lastName};
  http.setToken();
  return http.axios.post('/contact',info)
    .then(() => {
      showNotification('success',contactTxt.success);
      return true
    })
    .catch((e) =>{
      showNotification('error',e.message);
      return false;
    } );
  }
export const all = async() =>{
  var http = new httpClient();
  http.setToken();
  return http.axios.get('/contact')
      .then((response) => response.data).catch((e) =>{ console.log(e); return []; });
  }

export const update = (contact)=> {
  var http = new httpClient();
  var info = { name: contact.name,lastname: contact.lastName};
  http.setToken();
  return http.axios.post(`/contact/${contact.id}`,info)
    .then(() => {
      showNotification('success',contactTxt.updated);
      return true
    })
    .catch((e) =>{
      showNotification('error',e.message);
      return false;
    } );
}

export const get = (id)=> {
  var http = new httpClient();
  http.setToken();
  return http.axios.get(`/contact/${id}`)
    .then((response) => {
      return response.data
    })
    .catch((e) =>{
      showNotification('error',e.message);
      return false;
    } );
}

export const remove = (id)=> {
  var http = new httpClient();
  http.setToken();
  return http.axios.delete(`/contact/${id}`)
  .then(() => true)
  .catch((e) =>{
    showNotification('error',e.message);
    return false;
  } );
}
