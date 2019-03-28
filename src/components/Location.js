import React from 'react';
//combine with other id=weather_title
const Location = props => (
  <div id='weather__location'>
    {
      props.city && props.country &&
      <div>
        <h1><i id="clickyClick" className="material-icons" onClick={props.getLocationFunction}>my_location</i> {props.city}, {props.country}</h1>
        <p>{props.description}</p>
      </div>
    }
  </div>
);


export default Location;


