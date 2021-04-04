import {UPDATE_USER , LOGOUT_USER} from '../../types/user/'

export const update_user = (data) => {
 return{
      type: UPDATE_USER,
      payload:data
    }
}

export const logout_user = () => {
  return{
       type: LOGOUT_USER,
       payload: null
     }
 }
