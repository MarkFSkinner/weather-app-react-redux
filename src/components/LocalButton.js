import React from 'react';

const LocalButton = props => (
  <div>
    <button type='button' id='local_weather_btn' className='btn btn-secondary' onClick={props.getLocationFunction} >Get Local Weather</button>
  </div>
);

export default LocalButton;