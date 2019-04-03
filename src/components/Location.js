import React from 'react';

const Location = props => (
  <div id='weather_location'>
    <div id='location_container'>
      <div className='tooltip'>
        <span className='tooltiptext'>Get local weather</span>
        <i className='material-icons' onClick={props.getLocationFunction}>my_location</i>
      </div>
      {
      props.city && props.country &&
      <div id='location__name'>
        <h1>{props.city}, {props.country}</h1>
      </div>
      }
      <p>{props.description}</p>
    </div>
  </div>
);


export default Location;


