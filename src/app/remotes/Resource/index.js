import httpClient from '../httpClient';
import {showNotification} from '../../../utils/AppBehaviour';
import resourceTxt from '../../../constants/txt/resourceTxt'

export const upload = async(resource) =>{
  var http = new httpClient();
  var info = {
              title : resource.title,
              ownner_id : resource.ownner_id,
              storypoint_id : resource.storypoint_id,
              base64File  : resource.base64File
            };

  http.setToken();
  return http.axios.post('/resource',info)
    .then(() => {
      showNotification('success',resourceTxt.success);
      return true
    })
    .catch((e) =>{
      showNotification('error',e.message);
      return false;
    } );
  }

