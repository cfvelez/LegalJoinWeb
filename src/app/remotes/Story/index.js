import httpClient from '../httpClient';
import {showNotification} from '../../../utils/AppBehaviour';
import storyTxt from '../../../constants/txt/storyTxt'

export const create = async(story) =>{
  var http = new httpClient();
  var info = { contactId:story.contactId, title: story.title, description: story.description};
  http.setToken();
  return http.axios.post('/story',info)
    .then(() => {
      showNotification('success',storyTxt.success);
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

export const update = (story)=> {
  var http = new httpClient();
  var info = { contactId: story.contactId, title: story.title, description: story.description};
  http.setToken();
  return http.axios.post(`/story/${story.id}`,info)
    .then(() => {
      showNotification('success',storyTxt.updated);
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
  return http.axios.get(`/story/${id}`)
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
  return http.axios.delete(`/story/${id}`)
  .then(() => true)
  .catch((e) =>{
    showNotification('error',e.message);
    return false;
  } );
}
