import React from 'react';

const Location = props => (
  <div>
    <button className='btn btn-primary' onClick={()=>{props.getLocation(); props.clearForm()}} >Get Local Weather</button>
  </div>
);

export default Location;