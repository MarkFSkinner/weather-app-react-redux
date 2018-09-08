import React from 'react';

const Converter = props => (
  <div className='btn-group btn-group-toggle btn_converter' data-toggle='buttons'>
    <label onClick={props.toggleTemperature} className='btn btn-secondary celsius active'>
      <input type='radio' name='options' autoComplete='off' /> °C
    </label>
    <label onClick={props.toggleTemperature} className='btn btn-secondary fahrenheit'>
      <input type='radio' name='options' autoComplete='off' /> °F
    </label>
  </div>
);

export default Converter;