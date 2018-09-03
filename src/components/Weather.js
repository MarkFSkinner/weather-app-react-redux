import React from 'react';

const Weather = props => (
  <div id='weather_info'>
    { props.city && props.country && <p id='weather__location'>{props.city}, {props.country}</p> }
    { props.temperature && props.unit && <p id='weather__temperature'>{props.temperature} {props.unit}</p> }
    { props.icon && <img id='weather__icon' src={props.icon} alt='Weather Icon'/> }
    { props.description && <p id='weather__description'>{props.description}</p> }
    { props.humidity && <p id='weather__humidity'>Humidity: {props.humidity}%</p> }
    { props.error && <p id='weather__error'> Error: {props.error}</p> }
  </div>
)



export default Weather;