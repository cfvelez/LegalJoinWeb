import {PUSH_URL} from '../../types/navigation/'
import root from '../../../app/routing/Home'
export const navigation = (state=root.root,action) => {
  switch(action.type){
    case PUSH_URL:
      return action.payload
    default: return state
  }
}

