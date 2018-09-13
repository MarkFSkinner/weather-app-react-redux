import React from 'react';
//import Location from './Location';

const Form = props => (
  <form id='form1' className='form-inline justify-content-center' onSubmit={props.getWeather}>
    <div className='form-group my-form'>
      <label className="sr-only" for="city">City</label>
      <input type='text' className='form-control my-input' name='city' id='city' placeholder='City' required />
    </div>
    <div className='form-group'>
      <label className="sr-only" for="country">Country</label>
      <select className="form-control" id="country" onChange={props.changeOptionColor} required>
        <option id='default-option' value='' selected disabled hidden>Country</option>
        {props.codes}
      </select>
    </div>

  </form>
);

export default Form;