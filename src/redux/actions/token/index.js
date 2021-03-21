import {SET_TOKEN} from '../../types/token/'

export const set_token = (data) => {
 return{
      type: SET_TOKEN,
      payload:data
    }
}
