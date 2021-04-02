import {SERVER} from '../../constants';
import {getTokens} from '../../utils/AppBehaviour';
import axios from 'axios';


export default class httpClient {
  constructor () {
    this.axios = axios.create({
      baseURL: SERVER,
      headers: {"Content-Type": "application/json",}
    });
  }

  setToken() {
    const tokens = getTokens();
    if(tokens.hasOwnProperty('token') && tokens.hasOwnProperty('refresh_token')){
      this.axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${tokens.token}`;
    }
  }
};
