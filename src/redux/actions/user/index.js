import {FETCH_USER} from '../../types/user/'

export const fetch_user = (data) => {
 return{
      type: FETCH_USER,
      payload:data
    }
}
