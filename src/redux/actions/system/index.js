import {LOADING,NOTIFY} from '../../types/system/'

export const set_loadingMode = (data) => {
 return{
      type: LOADING,
      payload:data
    }
}

export const send_notification = (data) => {
  return{
       type: NOTIFY,
       payload:data
     }
 }
