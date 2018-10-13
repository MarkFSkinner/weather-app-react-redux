import React, { Component } from 'react';
import Title from './components/Title';
import Form from './components/Form';
import Location from './components/Location';
import Weather from './components/Weather';
import './App.css';

import { connect } from 'react-redux';

import {
  getLocation,
  getCountryData,
  getCountryNames,
  fetchWeather,
  selectCountry,
  clearForm,
  setTemperature
} from './actions';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

class App extends Component {
  componentWillMount = async () => {
    await this.renderCountryNames();
    this.getLocationFunction();
  }

  getLocationFunction = async () => {
    await this.props.getLocation(API_KEY);
    this.clearFormFunction();
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const countryName = e.target.elements.country.value;
    const countriesData = this.props.myData.countries;
    const result = countriesData.filter(country => country.name.toLowerCase() === countryName);
    const countryCode = (result.length > 0) ? result[0].alpha2Code : countryName;
    await this.props.fetchWeather(city, countryCode, API_KEY);
    if (this.props.myData.code === 200) {
      this.clearFormFunction();
    }
  }

  clearFormFunction = () => {
    document.getElementById('weather__form').reset();
    this.props.clearForm();
    document.getElementById('country').style.color = "rgb(73,80,87,0.8)";
  }

  toggleTemperature = (e) => {
    if(e.target.classList.contains('celsius')) {
      this.props.setTemperature({temperature: this.props.myData.temperatureC, unit: '°C'});
    } else if (e.target.classList.contains('fahrenheit')) {
      this.props.setTemperature({temperature: this.props.myData.temperatureF, unit: '°F'});
    }
  }

  renderCountryNames = async () => {
    this.props.getCountryNames();
    this.props.getCountryData();
  }

  handleChange = (event) => {
    const result = event.target.value;
    this.props.selectCountry(result);
    document.getElementById('country').style.color = "rgb(73,80,87)";
  }

  render() {
    return (
        <div id='main'>
          <div id='background'>
          </div>
          <div className='container'>
            <div className='row'>
              <div className='col-12'>
                <Title />
              </div>
              <div className='col-12'>
                <Form value={this.props.myData.value} getWeather={this.getWeather} countryNames={this.props.myData.countryNames} handleChange={this.handleChange}/>
              </div>
              <div className='col-12'>
                <Location getLocationFunction ={this.getLocationFunction} clearFormFunction={this.clearFormFunction} />
              </div>
              <div className='col-12'>
                <Weather
                  city={this.props.myData.city}
                  country={this.props.myData.country}
                  temperature={this.props.myData.temperature}
                  unit={this.props.myData.unit}
                  humidity={this.props.myData.humidity}
                  wind={this.props.myData.wind}
                  direction={this.props.myData.direction}
                  description={this.props.myData.description}
                  icon={this.props.myData.icon}
                  background={this.props.myData.background}
                  message={this.props.myData.message}
                  toggleTemperature={this.toggleTemperature}
                />
              </div>
            </div>
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    myData: state.myData
  }
}

export default connect(mapStateToProps, {
  getLocation,
  getCountryData,
  getCountryNames,
  fetchWeather,
  selectCountry,
  clearForm,
  setTemperature
})(App);
