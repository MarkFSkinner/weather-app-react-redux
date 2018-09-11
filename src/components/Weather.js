import React from 'react';
import Converter from './Converter';

const Weather = props => (
  <div id='weather_info'>
    {
      props.city && props.country && props.icon && props.temperature && props.unit &&
      props.description && props.humidity && props.wind &&
      <div className='row'>
        <div className='offset-md-1 col-md-5 col-sm-6 col-12' id='left_box'>
          <div id='weather__location' className='col-12'>
            <p>{props.city}, {props.country}</p>
          </div>
          <div className='col-12'>
            <img id='weather__icon' src={props.icon} alt='Weather Icon'/>
            <p id='weather__temperature'>
              {props.temperature}<span id='weather__unit'>{props.unit}</span>
            </p>
          </div>
        </div>
        <div className='col-md-5 col-sm-6 col-12' id='right_box'>
          <div id='weather__description' className='col-12'>
            <p>{props.description}</p>
          </div>
          <div id='weather__humidity' className='col-12'>
            <p><img src='https://cdn.onlinewebfonts.com/svg/img_493336.png'/> {props.humidity}%</p>
          </div>
          <div id='weather__wind' className='col-12'>
            <p><img src='https://image.flaticon.com/icons/svg/56/56086.svg'/> {props.direction} {props.wind} m/s</p>
          </div>
          <div className='col-12'>
            { props.city && <Converter toggleTemperature={props.toggleTemperature}/> }
          </div>
        </div>
      </div>
    }
    {
      props.description && props.humidity && props.wind &&
      <div className='row'>

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