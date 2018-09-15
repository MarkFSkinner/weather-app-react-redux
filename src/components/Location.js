import React from 'react';

const Location = props => (
  <div>
    <button id='local_weather_btn' className='btn btn-secondary' onClick={()=>{props.getLocation(); props.clearForm()}} >Get Local Weather</button>
  </div>
);

export default Location;