import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

import * as firebase from 'firebase';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTint } from '@fortawesome/free-solid-svg-icons';

const config = {
  apiKey: 'AIzaSyADz3nwkvr5OY5LkJvfEBHCjo056KPkjzE',
  authDomain: 'weather-app-39e37.firebaseapp.com',
  databaseURL: 'https://weather-app-39e37.firebaseio.com',
  projectId: 'weather-app-39e37',
  storageBucket: 'weather-app-39e37.appspot.com',
  messagingSenderId: '692925460611'
};
firebase.initializeApp(config);

library.add(faTint);

const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk)//,
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    //Uncomment above to use redux dev tools for chrome
  )
);

export default store;

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();