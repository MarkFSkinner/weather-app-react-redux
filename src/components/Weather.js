import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Converter from './Converter';

const Weather = props => (
  <div id='weather_info'>
    {
      props.city && props.country &&
      <div className='row'>
        <div id='weather__container'>
          {/*<div id='weather__location' className='col-12'>
            <p>{props.city}, {props.country}</p>
          </div>*/}

          {/*<div className='offset-md-1 col-md-5 col-sm-6 col-12' id='left_box'>*/}
          {/*<div className='offset-md-3 col-md-3 offset-sm-2 col-sm-4 col-6' id='left_box'>*/}
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
          {/*<div className='col-md-5 col-sm-6 col-12' id='right_box'>*/}
          {/*<div className='col-md-3 col-sm-4 col-6' id='right_box'>*/}
          <div className='col-6' id='right_box'>
            <div id='weather__icon' className='col-12 align-top'>
              {/*<img id='weather__icon' src={props.icon} alt='Weather Icon'/>*/}
              {/*<i id='weather__icon' className="wi wi-day-sunny"></i>*/}
              {/*<i className='hfi hfi-sun'></i>*/}
              {/*<i id='weather__icon' className="fas fa-sun"></i>*/}
              {/*<i id='weather__icon' className='material-icons'>wb_sunny</i>*/}
              {/*<i id='weather__icon' className="fas fa-cloud-rain"></i>*/}
              <i id='weather__icon' className="wi wi-day-rain"></i>

            </div>

            <div id='weather__humidity' className='col-12 weather__extras'>
              {/*<p>{props.humidity}% <i className='wi wi-humidity'></i></p>*/}
              {/*<p>{props.humidity}% <i className='hst hst-raindrop'></i></p>*/}
              {/*<p>{props.humidity}% <i className='fas fa-tint'></i></p>*/}
              <p>{props.humidity}% <FontAwesomeIcon icon='tint'/></p>
            </div>
            <div id='weather__wind' className='col-12 weather__extras'>
              {/*<p>{props.direction} {props.wind} m/s <i className="wi wi-strong-wind"></i></p>*/}
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