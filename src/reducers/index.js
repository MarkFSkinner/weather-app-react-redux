import { combineReducers } from 'redux';
import fetchWeatherReducer from './fetchWeatherReducer';

const rootReducer = combineReducers({
  myData: fetchWeatherReducer
});

export default rootReducer;