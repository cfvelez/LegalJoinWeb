
import store from '../redux/store'
import {set_status} from '../redux/actions/system'
import {push_route} from '../redux/actions/navigation'

export const Loading = (isLoading) => {
  const {status} = store.getState();
  store.dispatch(set_status({...status,'loading':isLoading}));
}

export const changeDestination = (url) =>{
  const {navigation} = store.getState();
  return navigation !== url ? store.dispatch(push_route(url)) : false;
}
