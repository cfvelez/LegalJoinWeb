import {LOADING} from '../../types/system/'

export const set_status = (data) => {
 return{
      type: LOADING,
      payload:data
    }
}
