import { combineReducers } from 'redux';
import weatherReducer from './weatherReducer';

const rootReducer = combineReducers({
  myData: weatherReducer
});

export default rootReducer;