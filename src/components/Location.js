import React from 'react';

const Location = props => (
  <div>
    <button type='button' id='local_weather_btn' className='btn btn-secondary' onClick={props.getLocation} >Get Local Weather</button>
  </div>
);

export default Location;