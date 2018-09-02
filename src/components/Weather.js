import React from 'react';

const Weather = props => (
  <div>
    { props.city && props.country && <p>{props.city}, {props.country}</p> }
    { props.temperature && props.unit && <p>{props.temperature} {props.unit}</p> }
    { props.humidity && <p>Humidity: {props.humidity}%</p> }
    { props.description && <p>{props.description}</p> }
    { props.icon && <p><img src={props.icon} alt='Weather Icon'/></p> }
    { props.error && <p>Error: {props.error}</p> }
  </div>
)



export default Weather;