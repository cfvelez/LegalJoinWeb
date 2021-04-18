import {useEffect,useState} from 'react'
import moment from 'moment';
import store from '../redux/store';
import {set_loadingMode, send_notification} from '../redux/actions/system';
import {push_route} from '../redux/actions/navigation';
import {logout_user} from '../redux/actions/user';
import {set_token} from '../redux/actions/token';
import routes from '../app/routing/routes'

export const Loading = (isLoading) => {
  store.dispatch(set_loadingMode({'loading':isLoading}));
}

export const changeDestination = (url) =>{
  const {navigation} = store.getState();
  return navigation !== url ? store.dispatch(push_route(url)) : false;
}

export const getTokens = () => {
  const {token} = store.getState();
  return token;
}
/**
 *
 * @param {"error","warning","info","success"} type
 * @param {*} msg
 */
export const showNotification = (type,msg) => {
  store.dispatch(send_notification({'visible':true,'type':type,'message':msg}));
}

export const hideNotification = () => {
  store.dispatch(send_notification({'visible':false,'message':''}));
}

export const saveState = () => {
  const state = store.getState();
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.log('Error saving state...',err);
  }
};

export const customHandledRedirect = (url) =>{
  changeDestination(url);
  saveState();
  window.history.pushState("", "", url);
  window.history.go();
};

export const logOut = () =>{
  store.dispatch(logout_user());
  store.dispatch(set_token(null))
  saveState();
}

export const getAddRoute = () =>{
  const {navigation} = store.getState();
  let presentScreen = false;

  if(navigation == routes.contact.list)
    presentScreen = routes.contact.new;

  return presentScreen;
}

/* Custom Hook Sample */
export const useTimeCounter = (startTime) => {
  const [timeLabel, setTimeLabel] = useState(0);

      useEffect(() => {
        const timer = setInterval(() => {
            let endTime = moment();
            let seconds = Math.ceil(moment.duration(endTime.diff(startTime)).as('seconds'));
            setTimeLabel(seconds);
        }, 1000);

        return () => {
          clearInterval(timer);
        }

        },[]);

  return timeLabel;
};




