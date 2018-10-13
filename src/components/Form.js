import React from 'react';

/*import { fetchWeather, clearForm, getCodes, addWeather, setTemperature, selectCountry } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';*/

const Form = props => (
  <form id='weather__form' className='form-inline justify-content-center' onSubmit={props.getWeather}>
    <div className='form-group my-form'>
      <label className="sr-only" htmlFor="city">City</label>
      <input type='text' className='form-control my-input' name='city' id='city' placeholder='City' required />
    </div>
    <div className='form-group'>
      <label className="sr-only" htmlFor="country">Country</label>
      <select value={props.value} id="country" className="form-control" onChange={props.handleChange}>
        <option id='default-option' value='country'>Country</option>
        {props.countryCodes}
      </select>
    </div>
    <button type='submit' form='weather__form' id='search_weather_btn' className='btn btn-secondary'>Go!</button>
  </form>
);

/*function mapStateToProps(state) {
  return {
    myData: state.myData
  }
}*/

export default Form;
/*export default connect(mapStateToProps, {
  fetchWeather,
  clearForm,
  getCodes,
  addWeather,
  setTemperature,
  selectCountry })(Form);*/