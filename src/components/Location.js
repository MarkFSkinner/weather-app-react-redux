import React from 'react';

const Location = props => (
  <div id='weather__buttons'>
    <button type='submit' form='form1' id='search_weather_btn' className='btn btn-secondary btn_weather'>Search</button>
    <button type='reset' id='local_weather_btn' className='btn btn-secondary btn_weather' onClick={props.getLocation} >Get Local Weather</button>
  </div>
);

export default Location;