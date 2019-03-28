import React from 'react';
//combine with other id=weather_title
const Location = props => (
  <div id='weather_location'>
    {
      props.city && props.country &&

      <div id='location_container'>
        <div className="tooltip">
          <span className="tooltiptext">Get local weather</span>
          <i className="material-icons" onClick={props.getLocationFunction}>my_location</i>
        </div>
        <div className="location__name">
          <h1>{props.city}, {props.country}</h1>
        </div>
        <p>{props.description}</p>
      </div>
    }
  </div>
);


export default Location;


