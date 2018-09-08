import React from 'react';

const Weather = props => (
  <div id='weather_info'>
    { props.city && props.country && <div id='weather__location'>{props.city}, {props.country}</div> }
    { props.icon && <img id='weather__icon' src={props.icon} alt='Weather Icon'/> }
    { props.temperature && props.unit && <div id='weather__temperature'>{props.temperature}<span id='weather__unit'>{props.unit}</span></div> }
    { props.description && <div id='weather__description'>{props.description}</div> }
    { props.humidity && <div id='weather__humidity'><img src='https://cdn.onlinewebfonts.com/svg/img_493336.png'/> {props.humidity}%</div> }
    { props.wind && <div id='weather__wind'><img src='https://image.flaticon.com/icons/svg/56/56086.svg'/> {props.direction} {props.wind} m/s</div> }
    { props.message && <div id='weather__message'>*Error: {props.message}*</div> }
  </div>
)



export default Weather;