import React from 'react';

const Form = props => (
  <form className='form-inline justify-content-center' onSubmit={props.getWeather}>
    <div className='form-group'>
      <label className="sr-only" for="city">City</label>
      <input type='text' className='form-control' name='city' id='city' placeholder='Enter name of city here...' />
    </div>
    <div className='form-group'>
      <label className="sr-only" for="country">Country</label>
      <input type='text' className='form-control' name='country' id='country' placeholder='Enter two letter country code' />
    </div>
    <button className='btn btn-primary btn_weather'>Get Weather</button>
  </form>
);

export default Form;