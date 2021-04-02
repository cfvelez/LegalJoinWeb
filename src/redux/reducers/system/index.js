import {LOADING,NOTIFY} from '../../types/system/'
const system = {'loading': false, notification:{'visible': false, 'type':'error', 'message': ''}}

export const status = (state=system,action) => {
  switch(action.type){
    case LOADING :
      return {...state, loading: action.payload.loading }
    case NOTIFY :
        return {...state, notification: {...action.payload} }
    default: return state

  }
}

