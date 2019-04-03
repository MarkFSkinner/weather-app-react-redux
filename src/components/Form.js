import React from 'react';

const Form = props => (
  <form id='weather__form' className='form-inline justify-content-center' onSubmit={props.getWeather}>
    <div className='form-group my-form'>
      <label className='sr-only' htmlFor='city'>City</label>
      <input type='text' className='form-control my-input' name='city' id='city' placeholder='City' required />
    </div>
    <div className='form-group'>
      <label className='sr-only' htmlFor='country'>Country</label>
      <select value={props.value} id='country' className='form-control' onChange={props.handleChange}>
        <option id='default-option' value='country'>Country</option>
        {props.countryNames}
      </select>
    </div>
    <button type='submit' form='weather__form' id='search_weather_btn' className='btn btn-secondary'>Go!</button>
  </form>
);

export default Form;