import {LOADING} from '../../types/system/'
const system = {"loading": false}

export const status = (state=system,action) => {
  switch(action.type){
    case LOADING :
      return action.payload
    default: return state
  }
}

