import React from 'react';

const Form = props => (
  <form onSubmit={props.getWeather}>
    <input type='text' name='city' placeholder='Enter name of city here...' />
    <input type='text' name='country' placeholder='Enter two letter country code' />
    <button className='btn btn-primary'>Get Weather</button>
  </form>
);

export default Form;