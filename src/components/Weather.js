import React from 'react';

const Weather = props => (
  <div>
    { props.city && <p>City: {props.city}</p> }
    { props.country && <p>Country: {props.country}</p> }
    { props.temperature && <p>Temperature: {props.temperature}</p> }
    { props.humidity && <p>Humidity: {props.humidity}</p> }
    { props.description && <p>Description: {props.description}</p> }
    { props.icon && <p>Icon: <img src={props.icon}/></p> }
    { props.error && <p>Error: {props.error}</p> }
  </div>
)



export default Weather;