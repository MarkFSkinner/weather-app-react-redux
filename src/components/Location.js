import React from 'react';

const Location = props => (
  <div>
    <button className='btn btn-secondary btn_weather' id='local_weather_btn' onClick={()=>{props.getLocation(); props.clearForm()}} >Get Local Weather</button>
  </div>
);

export default Location;