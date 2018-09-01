import React from 'react';

const Location = props => (
  <div>
    <button onClick={props.getLocation}>Get Local Weather</button>
  </div>
);

export default Location;