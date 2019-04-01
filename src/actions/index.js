import {
  FETCH_WEATHER,
  FETCH_ERROR,
  FETCH_COUNTRIES,
  FETCH_NAMES,
  SELECT_COUNTRY,
  CLEAR_FORM,
  SET_TEMPERATURE,
  SET_UNIT
} from './types';

import React from 'react';

export const getLocation = (API_KEY) => {
  console.log('WAITING');
  return async (dispatch) => {
    console.log('STILL WAITING');
    await navigator.geolocation.getCurrentPosition(async(position) => {
      console.log('AND STILL WAITING');
      await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&units=metric`)
      .then((res) => res.json())
      .then((data) => {
        console.log('HOLY CRAP, STILL WAITING');
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
      });
    });
  }
}

export const fetchWeather = (city, countryCode, API_KEY) => {
  console.log('WAITING');
  return async (dispatch) => {
    console.log('STILL WAITING');
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${API_KEY}&units=metric`)
    .then((res) => res.json())
    .then((data) => {
      console.log('AND STILL WAITING');
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
    });
  }
}

export const getCountryData = () => {
  return async (dispatch) => {
    await fetch('https://restcountries.eu/rest/v2/')
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: FETCH_COUNTRIES,
        payload: data
      })
    })
  }
}

export const getCountryNames = () => {
  return async (dispatch) => {
    await fetch('https://restcountries.eu/rest/v2/')
    .then((res) => res.json())
    .then((data) => data.map(item => item.name).sort().map((item, index) => {
      return <option key={index} value={item.toLowerCase()}>{(item.length < 18) ? item : item.substring(0, 18) + '...'}</option>;
    }))
    .then((data) => {
      dispatch({
        type: FETCH_NAMES,
        payload: data
      })
    })
  }
}

export const selectCountry = (result) => {
  return {
    type: SELECT_COUNTRY,
    payload: result
  }
}

export const clearForm = () => {
  return {
    type: CLEAR_FORM
  }
}

export const setTemperature = (data) => {
  return {
    type: SET_TEMPERATURE,
    payload: data
  }
}

export const setUnit = (data) => {
  return {
    type: SET_UNIT,
    payload: data
  }
}