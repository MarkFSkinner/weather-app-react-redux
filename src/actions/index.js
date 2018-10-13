import {
  FETCH_WEATHER,
  FETCH_ERROR,
  CLEAR_FORM,
  FETCH_CODES,
  ADD_WEATHER,
  SET_TEMPERATURE,
  SELECT_COUNTRY,
  GET_LOCATION,
} from './types';

import React, { Component } from 'react';

/*const fetchApi = async (city, countryCode, API_KEY) => {
  const apiData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${API_KEY}&units=metric`);
  return apiData;
}*/

/*export const getLocation = () => {
    (dispatch) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          return {
            type: GET_LOCATION,
            payload: position
          }
        });
      }
    }
  }*/

export const getLocation = () => {
  console.log('GET LOCATION ACTION');
  return dispatch => {
    navigator.geolocation.getCurrentPosition((position) => {
      dispatch({
          type: GET_LOCATION,
          payload: position
      });
    });
  }
}

/*export const getLocation = (API_KEY) => {
  console.log('GET LOCATION ACTION');
  return dispatch => {
    navigator.geolocation.getCurrentPosition((position) => {
      dispatch({
        position
      });
    }).then((position) => {
      async (dispatch) => {
    await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&units=metric`)
    .then((res) => res.json())
    .then((data) => {
      if (data.cod === 200) {
        dispatch({
          type: FETCH_WEATHER,
          payload: data
        })
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: data
        })
      }
    })
      }
    })
  }
}*/

/*export const getLocation = (API_KEY) => {
  console.log('GET LOCATION ACTION');
  return dispatch => {
    navigator.geolocation.getCurrentPosition((position) => {
      return {coordinates: position.coords}
    })
    .then((coordinates) => {
      console.log('inside1');
      async (dispatch) => {
        console.log('inside2');
        await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${API_KEY}&units=metric`)
        .then((res) => res.json())
        .then((data) => {
          if (data.cod === 200) {
            dispatch({
              type: FETCH_WEATHER,
              payload: data
            })
          } else {
            dispatch({
              type: FETCH_ERROR,
              payload: data
            })
          }
        }
        );
      }
    })
    }
  }*/

export const setLocation = (API_KEY) => {
  console.log('SET LOCATION ACTION');
  return async (dispatch) => {
    await navigator.geolocation.getCurrentPosition(async(position) => {
      await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&units=metric`)
      .then((res) => res.json())
      .then((data) => {
        if (data.cod === 200) {
          dispatch({
            type: FETCH_WEATHER,
            payload: data
          })
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: data
          })
        }
      }
      );
    });
    console.log('ACTION ENDED');
  }
}

export const getCodes = () => {
  return async (dispatch) => {
    await fetch('https://restcountries.eu/rest/v2/')
    .then((res) => res.json())
    .then((data) => data.map(item => item.name).sort().map((item, index) => {
        return <option key={index} value={item.toLowerCase()}>{(item.length < 18) ? item : item.substring(0, 18) + '...'}</option>;
      }))
    .then((codes) => {
      console.log('codes', codes);
      dispatch({
        type: FETCH_CODES,
        payload: codes
      })
    })
  }
}


export const fetchWeather = (city, countryCode, API_KEY) => {
  return async (dispatch) => {
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${API_KEY}&units=metric`)
    //fetchApi(city, countryCode, API_KEY)
    .then((res) => res.json())
    .then((data) => {
      if (data.cod === 200) {
        dispatch({
          type: FETCH_WEATHER,
          payload: data
        })
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: data
        })
      }
    }
    );
  }
}

/*export const fetchWeather = (data) => {
  return {
    type: FETCH_WEATHER,
    payload: data
  }
}*/


/*export const displayError = () => {
  console.log('DISPLAYING ERROR');
  return {
    type: DISPLAY_ERROR
  }
}*/

export const setTemperature = (data) => {
  return {
    type: SET_TEMPERATURE,
    payload: data
  }
}

/*export const setCelsius = (data) => {
  return {
    type: SET_CELSIUS,
    payload: data
  }
}

export const setFahrenheit = (data) => {
  return {
    type: SET_FAHRENHEIT,
    payload: data
  }
}*/

export const clearForm = () => {
  return {
    type: CLEAR_FORM
  }
}

/*export const getCountryCodes = () => dispatch => {
  fetch('https://restcountries.eu/rest/v2/')
  .then(res => res.json())
  .then(data => dispatch({
    type: FETCH_CODES,
    payload: codes
  }));
}*/

/*export const getCodes = (codes) => {
  //console.log('running');
  return {
    type: FETCH_CODES,
    payload: codes
  }
}*/

export const selectCountry = (result) => {
  //console.log('change action');
  return {
    type: SELECT_COUNTRY,
    payload: result
  }
}





export const addWeather = (data) => {
  return {
    type: ADD_WEATHER,
    payload: {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      temperatureC: Math.round(data.main.temp),
      temperatureF: Math.round(data.main.temp * 9/5 +32),
      unit: '°C',
      humidity: data.main.humidity,
      wind: data.wind.speed,
      direction: this.convertWindDirection(data.wind.deg),
      description: data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.substr(1),
      icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      background: this.getBackground(data.weather[0].icon),
      code: data.cod,
      message: undefined
    }
  }
}


