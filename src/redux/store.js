import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootreducer from './reducer';
import {saveState} from '../utils/AppBehaviour';

//BugFix - Redux lost
window.onbeforeunload = (e) => {
  saveState();
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return {};
    } else {
      return JSON.parse(serializedState);
    }
  } catch (err) {
    // ...error handling
    console.log('Error loading state...',err);
    return {};
  }
};

const initialstate = loadState();
const middleware = [thunk];
const store = createStore(rootreducer,initialstate,composeWithDevTools(applyMiddleware(...middleware)))
export default store;
