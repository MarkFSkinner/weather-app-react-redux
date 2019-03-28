import {
  FETCH_WEATHER,
  FETCH_ERROR,
  FETCH_COUNTRIES,
  FETCH_NAMES,
  SELECT_COUNTRY,
  CLEAR_FORM,
  SET_TEMPERATURE
} from '../actions/types';

const initialState = {
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
  //document.getElementById('background').style.backgroundImage = `url(${background})`;
  document.getElementById('background').style.background = background;
}

const getBackground = (data) => {
  let background;
  switch(data) {
    case '01d':
      //sunny day
      //background = 'http://www.toca-ch.com/data/walls/143/27445846.jpg';
      background = 'linear-gradient(to top, rgb(242, 153, 74), rgb(242, 201, 76))';
      break;
    case '02d':
    case '03d':
    case '04d':
      //cloudy day
      //background = 'https://wallpaper.wiki/wp-content/uploads/2017/05/wallpaper.wiki-Download-Free-Weather-Background-PIC-WPE00194.jpg';
      background = 'linear-gradient(to top, rgb(242, 153, 74), rgb(242, 201, 76))';
      break;
    case '09d':
    case '10d':
      //rainy day
      //background = 'https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/D8qa-2E/moddy-wet-weather-background-raining-city-scenery-sad-rain-drops_hzwjel7r__F0000.png';
      background = 'linear-gradient(rgb(189, 195, 199), rgb(44, 62, 80))';
      break;
    case '11d':
      //thunder
      //background = 'http://www.toca-ch.com/data/walls/143/27443286.jpg';
      background = 'linear-gradient(to top, rgb(242, 153, 74), rgb(242, 201, 76))';
      break;
    case '13d':
      //daytime snow
      //background = 'https://inquirymethod.com/wp-content/uploads/2014/11/snowflake-white-1030x686.jpg';
      background = 'linear-gradient(to top, rgb(242, 153, 74), rgb(242, 201, 76))';
      break;
    case '50d':
      //daytime mist
      //background = 'https://images.alphacoders.com/290/thumb-1920-290353.jpg';
      background = 'linear-gradient(to top, rgb(242, 153, 74), rgb(242, 201, 76))';
      break;
    case '01n':
      //clear night
      //background = 'https://farm2.static.flickr.com/1676/26385659771_7c354aaf8c_b.jpg';
      background = 'linear-gradient(to top, rgb(242, 153, 74), rgb(242, 201, 76))';
      break;
    case '02n':
    case '03n':
    case '04n':
      //cloudy night
      //background = 'http://www.toca-ch.com/data/walls/143/27445697.jpg';
      background = 'linear-gradient(to top, rgb(242, 153, 74), rgb(242, 201, 76))';
      break;
    case '09n':
    case '10n':
      //rainy night
      //background = 'http://www.ehowzit.co.za/wp-content/uploads/2016/07/rainy-weather.jpg';
      background = 'linear-gradient(to top, rgb(242, 153, 74), rgb(242, 201, 76))';
      break;
    case '11n':
      //night thunder
      //background = 'http://www.toca-ch.com/data/walls/143/27443640.jpg';
      background = 'linear-gradient(to top, rgb(242, 153, 74), rgb(242, 201, 76))';
      break;
    case '13n':
      //night snow
      //background = 'https://wallpaperstock.net/wallpapers/thumbs1/45397hd.jpeg';
      background = 'linear-gradient(to top, rgb(242, 153, 74), rgb(242, 201, 76))';
      break;
    case '50n':
      //night mist
      //background = 'https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/6d4D4HR/foggy-weather-at-night-street-park_ekrwty77g__F0000.png';
      background = 'linear-gradient(to top, rgb(242, 153, 74), rgb(242, 201, 76))';
      break;
    case 'none':
      //background = 'https://i.ytimg.com/vi/p28pePKK7Pc/maxresdefault.jpg';
      background = 'linear-gradient(to top, rgb(242, 153, 74), rgb(242, 201, 76))';
      break;
    default:
      return undefined;
  }
  background = 'linear-gradient(to top, rgb(242, 153, 74), rgb(242, 201, 76))';//sunny
  //background = 'linear-gradient(to top, rgb(189, 195, 199), rgb(44, 62, 80))';//cloudy/rainy
  //background = 'linear-gradient(rgb(15, 32, 39), rgb(32, 58, 67), rgb(44, 83, 100))';//night
  //background = 'linear-gradient(to top, rgb(41, 128, 185), rgb(109, 213, 250), rgb(255, 255, 255))';//snowy day
  //background = 'linear-gradient(to top, rgb(0, 90, 167), rgb(255, 253, 228))';//evening night
  //background = 'linear-gradient(to top, rgb(195, 20, 50), rgb(36, 11, 54))';//clear night
  //background = 'linear-gradient(to top, rgb(62, 81, 81), rgb(222, 203, 164))';//fog
  //background = 'linear-gradient(to top, rgb(240, 242, 240), rgb(0, 12, 64))';//night mist/night cloud
  //background = 'linear-gradient(rgb(29, 67, 80), rgb(164, 57, 49))';//thunder
  //background = '#FEC63D';
  setBackground(background);
  return background;
}

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_WEATHER:
      return {
        ...state,
        city: action.payload.name,
        country: action.payload.sys.country,
        temperature: Math.round(action.payload.main.temp),
        temperatureC: Math.round(action.payload.main.temp),
        temperatureF: Math.round(action.payload.main.temp * 9/5 +32),
        unit: 'hst hst-degree-celsius',
        humidity: action.payload.main.humidity,
        wind: action.payload.wind.speed,
        direction: convertWindDirection(action.payload.wind.deg),
        description: action.payload.weather[0].description.charAt(0).toUpperCase() + action.payload.weather[0].description.substr(1),
        icon: `http://openweathermap.org/img/w/${action.payload.weather[0].icon}.png`,
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
        unit: action.payload.unit
      }
    default:
      return state;
  }
}