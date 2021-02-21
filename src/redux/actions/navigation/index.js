import {PUSH_URL} from '../../types/navigation/'

export const push_route = (data) => {
 return{
      type: PUSH_URL,
      payload:data
    }
}
