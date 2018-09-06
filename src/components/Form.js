import React from 'react';

const Form = props => (
  <form className='form-inline justify-content-center' onSubmit={props.getWeather}>
    <div className='form-group my-form'>
      <label className="sr-only" for="city">City</label>
      <input type='text' className='form-control my-input' name='city' id='city' placeholder='City name...' required />
    </div>
    <div className='form-group my-form'>
      <label className="sr-only" for="country">Country</label>
      <input type='text' className='form-control my-input' name='country' id='country' placeholder='Two letter country code...' required />
    </div>
    <button className='btn btn-primary btn_weather'>Get Weather</button>
  </form>
);

export default Form;