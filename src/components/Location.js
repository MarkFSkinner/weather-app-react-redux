import React from 'react';

const Location = props => (
  <div id='weather__buttons'>
    <button type='reset' id='local_weather_btn' className='btn btn-secondary btn_weather' onClick={()=>{props.getLocation(); props.clearForm()}} >Get Local Weather</button>
  </div>
);

export default Location;