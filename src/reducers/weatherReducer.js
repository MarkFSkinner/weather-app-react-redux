import {
  FETCH_WEATHER,
  FETCH_ERROR,
  FETCH_COUNTRIES,
  FETCH_NAMES,
  SELECT_COUNTRY,
  CLEAR_FORM,
  SET_TEMPERATURE,
  SET_UNIT
} from '../actions/types';

const initialState = {
  value: 'country',
  currentUnit: 'celsius'
}

const convertWindDirection = (degrees) => {
  if (degrees > 348.75 || degrees < 11.25) {
    return 'N';
  }
  if (degrees > 11.25 && degrees < 33.75) {
    return 'NNE';
  }
  if (degrees > 33.75 && degrees < 56.25) {
    return 'NE';
  }
  if (degrees > 56.25 && degrees < 78.75) {
    return 'ENE';
  }
  if (degrees > 78.75 && degrees < 101.25) {
    return 'E';
  }
  if (degrees > 101.25 && degrees < 123.75) {
    return 'ESE';
  }
  if (degrees > 123.75 && degrees < 146.25) {
    return 'SE';
  }
  if (degrees > 146.25 && degrees < 168.75) {
    return 'SSE';
  }
  if (degrees > 168.75 && degrees < 191.25) {
    return 'S';
  }
  if (degrees > 191.25 && degrees < 213.75) {
    return 'SSW';
  }
  if (degrees > 213.75 && degrees < 236.25) {
    return 'SW';
  }
  if (degrees > 236.25 && degrees < 258.75) {
    return 'WSW';
  }
  if (degrees > 258.75 && degrees < 281.25) {
    return 'W';
  }
  if (degrees > 281.25 && degrees < 303.75) {
    return 'WNW';
  }
  if (degrees > 303.75 && degrees < 326.25) {
    return 'NW';
  }
  if (degrees > 326.25 && degrees < 348.75) {
    return 'NNW';
  }
};

const imageMap = new Map();
imageMap.set('01d', {//sunny day
  background: 'linear-gradient(to top, rgb(242, 153, 74), rgb(242, 201, 76))',
  icon: 'wi wi-day-sunny'
});
imageMap.set('02d', {//few clouds day
  background: 'linear-gradient(to top, rgb(189, 195, 199), rgb(44, 62, 80))',
  icon: 'wi wi-day-cloudy'
});
imageMap.set('03d', {//scattered clouds day
  background: 'linear-gradient(to top, rgb(189, 195, 199), rgb(44, 62, 80))',
  icon: 'wi wi-cloud'
});
imageMap.set('04d', {//broken clouds day
  background: 'linear-gradient(to top, rgb(189, 195, 199), rgb(44, 62, 80))',
  icon: 'wi wi-cloudy'
});
imageMap.set('09d', {//shower rain day
  background: 'linear-gradient(to top, rgb(67, 198, 172), rgb(25, 22, 84))',
  icon: 'wi wi-rain'
});
imageMap.set('10d', {//rainy day
  background: 'linear-gradient(to top, rgb(67, 198, 172), rgb(25, 22, 84))',
  icon: 'wi wi-day-rain'
});
imageMap.set('11d', {//thunder day
  background: 'linear-gradient(rgb(29, 67, 80), rgb(164, 57, 49))',
  icon: 'wi wi-thunderstorm'
});
imageMap.set('13d', {//snow day
  background: 'linear-gradient(rgb(33, 147, 176), rgb(109, 213, 237))',
  icon: 'wi wi-day-snow'
});
imageMap.set('50d', {//mist day
  background: 'linear-gradient(rgb(232, 203, 192), rgb(99, 111, 164))',
  icon: 'wi wi-day-fog'
});
imageMap.set('01n', {//clear night
  background: 'linear-gradient(to top, rgb(195, 20, 50), rgb(36, 11, 54))',//clear night
  icon: 'wi wi-night-clear'
});
imageMap.set('02n', {//few clouds night
  background: 'linear-gradient(to top, rgb(240, 194, 123), rgb(75, 18, 72))',
  icon: 'wi wi-night-alt-cloudy'
});
imageMap.set('03n', {//scattered clouds night
  background: 'linear-gradient(to top, rgb(240, 194, 123), rgb(75, 18, 72))',
  icon: 'wi wi-cloud'
});
imageMap.set('04n', {//broken clouds night
  background: 'linear-gradient(to top, rgb(240, 194, 123), rgb(75, 18, 72))',
  icon: 'wi wi-cloudy'
});
imageMap.set('09n', {//shower rain night
  background: 'linear-gradient(to top, rgb(115, 200, 169), rgb(55, 59, 68))',
  icon: 'wi wi-rain'
});
imageMap.set('10n', {//rainy night
  background: 'linear-gradient(to top, rgb(115, 200, 169), rgb(55, 59, 68))',
  icon: 'wi wi-night-alt-rain'
});
imageMap.set('11n', {//thunder night
  background: 'linear-gradient(to top, rgb(120, 2, 6), rgb(6, 17, 97))',
  icon: 'wi wi-night-alt-thunderstorm'
});
imageMap.set('13n', {//snow night
  background: 'linear-gradient(rgb(170, 75, 107), rgb(107, 107, 131), rgb(59, 141, 153))',
  icon: 'wi wi-night-alt-snow'
});
imageMap.set('50n', {//mist night
  background: 'linear-gradient(to top, rgb(62, 81, 81), rgb(222, 203, 164))',
  icon: 'wi wi-night-fog'
});
imageMap.set('none', {
  background: 'hsl(0, 0%, 15%)',
  icon: ''
});

const getBackground = (data) => {
  let background = imageMap.get(data).background;
  setBackground(background);
  return background;
};

const setBackground = (background) => {
  document.getElementsByTagName('BODY')[0].style.background = background;
};

const getIcon = (data) => {
  let icon = imageMap.get(data).icon;
  return icon;
};

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_WEATHER:
      return {
        ...state,
        city: action.payload.name,
        country: action.payload.sys.country,
        temperature: Math.round(state.currentUnit === 'celsius' ? action.payload.main.temp : action.payload.main.temp * 9/5 + 32),
        temperatureC: Math.round(action.payload.main.temp),
        temperatureF: Math.round(action.payload.main.temp * 9/5 + 32),
        unitIcon: state.currentUnit === 'celsius' ? 'hst hst-degree-celsius' : 'hst hst-degree-fahrenheit',
        humidity: action.payload.main.humidity,
        wind: action.payload.wind.speed,
        direction: convertWindDirection(action.payload.wind.deg),
        description: action.payload.weather[0].description.charAt(0).toUpperCase() + action.payload.weather[0].description.substr(1),
        icon: getIcon(action.payload.weather[0].icon),
        background: getBackground(action.payload.weather[0].icon),
        code: action.payload.cod,
        message: undefined
      }
    case FETCH_ERROR:
      return {
        ...state,
        city: undefined,
        country: undefined,
        temperature: undefined,
        temperatureC: undefined,
        temperatureF: undefined,
        unitIcon: undefined,
        humidity: undefined,
        wind: undefined,
        direction: undefined,
        description: undefined,
        icon: undefined,
        background: getBackground('none'),
        code: action.payload.cod,
        message: action.payload.message.charAt(0).toUpperCase() + action.payload.message.substr(1)
      }
    case FETCH_COUNTRIES:
      return {
        ...state,
        countries: action.payload
      }
    case FETCH_NAMES:
      return {
        ...state,
        countryNames: action.payload
      }
    case SELECT_COUNTRY:
      return {
        ...state,
        value: action.payload
      }
    case CLEAR_FORM:
      return {
        ...state,
        value: 'country'
      }
    case SET_TEMPERATURE:
      return {
        ...state,
        temperature: action.payload.temperature,
        unitIcon: action.payload.unitIcon
      }
    case SET_UNIT:
      return {
        ...state,
        currentUnit: action.payload
      }
    default:
      return state;
  }
}