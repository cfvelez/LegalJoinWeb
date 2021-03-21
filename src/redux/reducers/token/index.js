import {SET_TOKEN} from '../../types/token/'

export const token = (state=null,action) => {
  switch(action.type){
    case SET_TOKEN :
      return action.payload
    default: return state
  }
}

