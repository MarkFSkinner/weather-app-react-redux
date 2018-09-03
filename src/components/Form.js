import React from 'react';

const Form = props => (
  <form onSubmit={props.getWeather}>
    <input type='text' name='city' id='city' placeholder='Enter name of city here...' />
    <input type='text' name='country' id='country' placeholder='Enter two letter country code' />
    <button className='btn btn-primary'>Get Weather</button>
  </form>
);

export default Form;