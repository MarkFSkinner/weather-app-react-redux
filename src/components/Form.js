import React from 'react';
//import Location from './Location';

const Form = props => (
  <form id='form1' className='form-inline justify-content-center' onSubmit={props.getWeather}>
    <div className='form-group my-form'>
      <label className="sr-only" htmlFor="city">City</label>
      <input type='text' className='form-control my-input' name='city' id='city' placeholder='City' required />
    </div>
    <div className='form-group'>
      <label className="sr-only" htmlFor="country">Country</label>
      <select value={props.value} className="form-control" id="country" onChange={props.handleChange} required>
        <option id='default-option' value='country' disabled hidden>Country</option>
        {props.codes}
      </select>
    </div>
    <button type='submit' form='form1' id='search_weather_btn' className='btn btn-secondary btn_weather'>Go!</button>
  </form>
);

export default Form;