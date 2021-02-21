import {UPDATE_USER} from '../../types/user/'

export const user = (state=null,action) => {
  switch(action.type){
    case UPDATE_USER :
      return action.payload
    default: return state
  }
}

