import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Converter from './Converter';

const Weather = props => (
  <div id='weather_info'>
    {
      props.city && props.country &&
      <div className='row'>
        <div id='weather__container'>
          <div className='col-6' id='left_box'>
            <div className='col-12'>
              <p id='weather__temperature'>
                {props.temperature}<span id='weather__unit'><i className={props.unit}></i></span>
              </p>
            </div>
            <div className='col-12'>
              { props.city && <Converter toggleTemperature={props.toggleTemperature}/> }
            </div>
          </div>
          <div className='col-6' id='right_box'>
            <div id='weather__icon' className='col-12'>
              <i className={props.icon}></i>
            </div>
            <div id='weather__humidity' className='col-12 weather__extras'>
              <p>{props.humidity}% <FontAwesomeIcon icon='tint'/></p>
            </div>
            <div id='weather__wind' className='col-12 weather__extras'>
              <p>{props.direction} {props.wind} m/s <i className='hfi hfi-wind'></i></p>
            </div>
          </div>
        </div>
      </div>
    }
    {
      props.message &&
      <div className='row'>
        <div id='weather__message' className='col-12'>
          <p>*Error: {props.message}*</p>
        </div>
      </div>
    }
  </div>
)

export default Weather;