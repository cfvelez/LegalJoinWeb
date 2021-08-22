import httpClient from '../httpClient';
import {showNotification} from '../../../utils/AppBehaviour';
import storypointTxt from '../../../constants/txt/storypointTxt'

export const create = async(storypoint) =>{
  var http = new httpClient();
  var info = { storyId: storypoint.storyId, name: storypoint.name, description: storypoint.description, appointmentAt: storypoint.appointmentAt};

  http.setToken();
  return http.axios.post('/storypoint',info)
    .then(() => {
      showNotification('success',storypointTxt.success);
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
  return http.axios.get('/story')
      .then((response) => response.data).catch((e) =>{ console.log(e); return []; });
  }

export const update = (storypoint)=> {
  var http = new httpClient();
  var info = {  id: storypoint.id, storyId:storypoint.storyId, name: storypoint.name, description: storypoint.description, appointmentAt:storypoint.appointmentAt};
  http.setToken();
  return http.axios.post(`/storypoint/${storypoint.id}`,info)
    .then(() => {
      showNotification('success',storypointTxt.updated);
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
  return http.axios.get(`/storypoint/${id}`)
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
  return http.axios.delete(`/storypoint/${id}`)
  .then(() => true)
  .catch((e) =>{
    showNotification('error',e.message);
    return false;
  } );
}
