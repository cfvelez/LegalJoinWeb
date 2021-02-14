import {FETCH_USER} from '../../types/user/'

export const user = (state={},action) => {
  switch(action.type){
    case FETCH_USER :
      return action.payload
    default: return state
  }
}

