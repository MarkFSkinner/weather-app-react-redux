import {
  FETCH_WEATHER,
  FETCH_ERROR,
  CLEAR_FORM,
  FETCH_CODES,
  SET_TEMPERATURE,
  SELECT_COUNTRY,
  GET_LOCATION,
} from '../actions/types';

const initialState = {
  latitude: undefined,
  longitude: undefined,
  city: undefined,
  country: undefined,
  temperature: undefined,
  temperatureC: undefined,
  temperatureF: undefined,
  unit: undefined,
  humidity: undefined,
  wind: undefined,
  direction: undefined,
  description: undefined,
  icon: undefined,
  background: undefined,
  code: undefined,
  message: undefined,
  value: 'country'
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
}


const setBackground = (background) => {
  //let newBackground = this.props.myData.background;
  //console.log('SET BACKGROUND', this.props.myData.background);
  document.getElementById('background').style.backgroundImage = `url(${background})`;
}


const getBackground = (data) => {
  let background;
  switch(data) {
    case '01d':
      //sunny day
      background = 'http://www.toca-ch.com/data/walls/143/27445846.jpg';
      break;
    case '02d':
    case '03d':
    case '04d':
      //cloudy day
      background = 'https://wallpaper.wiki/wp-content/uploads/2017/05/wallpaper.wiki-Download-Free-Weather-Background-PIC-WPE00194.jpg';
      break;
    case '09d':
    case '10d':
      //rainy day
      background = 'https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/D8qa-2E/moddy-wet-weather-background-raining-city-scenery-sad-rain-drops_hzwjel7r__F0000.png';
      break;
    case '11d':
      //thunder
      background = 'http://www.toca-ch.com/data/walls/143/27443286.jpg';
      break;
    case '13d':
      //daytime snow
      background = 'https://inquirymethod.com/wp-content/uploads/2014/11/snowflake-white-1030x686.jpg';
      break;
    case '50d':
      //daytime mist
      background = 'https://images.alphacoders.com/290/thumb-1920-290353.jpg';
      break;
    case '01n':
      //clear night
      background = 'https://farm2.static.flickr.com/1676/26385659771_7c354aaf8c_b.jpg';
      break;
    case '02n':
    case '03n':
    case '04n':
      //cloudy night
      background = 'http://www.toca-ch.com/data/walls/143/27445697.jpg';
      break;
    case '09n':
    case '10n':
      //rainy night
      background = 'http://www.ehowzit.co.za/wp-content/uploads/2016/07/rainy-weather.jpg';
      break;
    case '11n':
      //night thunder
      background = 'http://www.toca-ch.com/data/walls/143/27443640.jpg';
      break;
    case '13n':
      //night snow
      background = 'https://wallpaperstock.net/wallpapers/thumbs1/45397hd.jpeg';
      break;
    case '50n':
      //night mist
      background = 'https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/6d4D4HR/foggy-weather-at-night-street-park_ekrwty77g__F0000.png';
      break;
    case 'none':
      background = 'https://i.ytimg.com/vi/p28pePKK7Pc/maxresdefault.jpg';
      break;
    default:
      return undefined;
  }
  setBackground(background);
  return background;
}

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_WEATHER:
      console.log('FETCH WEATHER REDUCER');
      return {
        ...state,
        city: action.payload.name,
        country: action.payload.sys.country,
        temperature: Math.round(action.payload.main.temp),
        temperatureC: Math.round(action.payload.main.temp),
        temperatureF: Math.round(action.payload.main.temp * 9/5 +32),
        unit: '°C',
        humidity: action.payload.main.humidity,
        wind: action.payload.wind.speed,
        direction: convertWindDirection(action.payload.wind.deg),
        description: action.payload.weather[0].description.charAt(0).toUpperCase() + action.payload.weather[0].description.substr(1),
        icon: `http://openweathermap.org/img/w/${action.payload.weather[0].icon}.png`,
        background: getBackground(action.payload.weather[0].icon),
        code: action.payload.cod,
        message: undefined
        //value: 'country'
      }
    case FETCH_ERROR:
      return {
        ...state,
        city: undefined,
        country: undefined,
        temperature: undefined,
        temperatureC: undefined,
        temperatureF: undefined,
        unit: undefined,
        humidity: undefined,
        wind: undefined,
        direction: undefined,
        description: undefined,
        icon: undefined,
        background: getBackground('none'),
        code: action.payload.cod,
        message: action.payload.message.charAt(0).toUpperCase() + action.payload.message.substr(1)
      }
    case CLEAR_FORM:
      //console.log('another action');
      return {
        ...state,
        value: 'country'
      }
    case FETCH_CODES:
      //console.log('action');
      return {
        ...state,
        countryCodes: action.payload
      }
    /*case SET_CELSIUS:
      return {
        ...state,
        temperature: action.payload,
        unit: '°C'
      }
    case SET_FAHRENHEIT:
      return {
        ...state,
        temperature: action.payload,
        unit: '°F'
      }*/
    case SET_TEMPERATURE:
      return {
        ...state,
        temperature: action.payload.temperature,
        unit: action.payload.unit
      }
    case SELECT_COUNTRY:
      return {
        ...state,
        value: action.payload
      }
    case GET_LOCATION:
      console.log('GET LOCATION REDUCER');
      return {
        ...state,
        latitude: action.payload.coords.latitude,
        longitude: action.payload.coords.longitude
      }
    default:
      return state;
  }
}