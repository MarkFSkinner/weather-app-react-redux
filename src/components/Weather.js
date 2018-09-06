import React from 'react';

const Weather = props => (
  <div id='weather_info'>
    { props.city && props.country && <p id='weather__location'>{props.city}, {props.country}</p> }
    { props.icon && <img id='weather__icon' src={props.icon} alt='Weather Icon'/> }
    { props.temperature && props.unit && <p id='weather__temperature'>{props.temperature} {props.unit}</p> }
    { props.description && <p id='weather__description'>{props.description}</p> }
    { props.humidity && <p id='weather__humidity'><img src='https://cdn.onlinewebfonts.com/svg/img_493336.png'/> {props.humidity}%</p> }
    { props.wind && <p id='weather__wind'><img src='https://image.flaticon.com/icons/svg/56/56086.svg'/> {props.direction} {props.wind} m/s</p> }
    { props.error && <p id='weather__error'> Error: {props.error}</p> }
  </div>
)



export default Weather;