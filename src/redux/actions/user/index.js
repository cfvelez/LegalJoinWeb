import {UPDATE_USER} from '../../types/user/'

export const update_user = (data) => {
 return{
      type: UPDATE_USER,
      payload:data
    }
}
