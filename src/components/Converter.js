import React from 'react';

const Converter = props => (
  <div id='btn_converter' className='btn-group btn-group-toggle' data-toggle='buttons'>
    <label onClick={props.toggleTemperature} className='btn btn-unit celsius active'>
      <input type='radio' name='options' autoComplete='off' /> °C
    </label>
    <label onClick={props.toggleTemperature} className='btn btn-unit fahrenheit'>
      <input type='radio' name='options' autoComplete='off' /> °F
    </label>
  </div>
);

export default Converter;