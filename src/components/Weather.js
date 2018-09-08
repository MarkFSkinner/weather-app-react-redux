import React from 'react';

const Weather = props => (
  <div id='weather_info'>
    {
      props.city && props.country &&
      <div className='row'>
        <div id='weather__location' className='col-12'>
          <p>{props.city}, {props.country}</p>
        </div>
      </div>
    }
    {
      props.icon && props.temperature && props.unit &&
      <div className='row'>
        <div className='col-12'>
          <img id='weather__icon' src={props.icon} alt='Weather Icon'/>
          <p id='weather__temperature'>
            {props.temperature}<span id='weather__unit'>{props.unit}</span>
          </p>
        </div>
      </div>
    }
    {
      props.description &&
      <div className='row'>
        <div id='weather__description' className='col-12'>
          <p>{props.description}</p>
        </div>
      </div>
    }
    {
      props.humidity &&
      <div className='row'>
        <div id='weather__humidity' className='col-12'>
          <p><img src='https://cdn.onlinewebfonts.com/svg/img_493336.png'/> {props.humidity}%</p>
        </div>
      </div>
    }
    {
      props.wind &&
      <div className='row'>
        <div id='weather__wind' className='col-12'>
          <p><img src='https://image.flaticon.com/icons/svg/56/56086.svg'/> {props.direction} {props.wind} m/s</p>
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