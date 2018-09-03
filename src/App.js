import React, { Component } from 'react';
import Title from './components/Title';
import Location from './components/Location';
import Form from './components/Form';
import Weather from './components/Weather';
import Converter from './components/Converter';
import './App.css';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

class App extends Component {
  state = {
    latitude: undefined,
    longitude: undefined,
    city: undefined,
    country: undefined,
    temperature: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    unit: undefined,
    humidity: undefined,
    description: undefined,
    icon: undefined,
    error: undefined
  }

  addWeatherData = (data) => {
    this.setState({
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      temperatureC: Math.round(data.main.temp),
      temperatureF: Math.round(data.main.temp * 9/5 +32),
      unit: '°C',
      humidity: data.main.humidity,
      description: data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.substr(1),
      icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      error: ''
    });
    console.log(this.state.unit);
  }

  getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async(position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        const apiCall = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&appid=${API_KEY}&units=metric`);
        const data = await apiCall.json();
        this.addWeatherData(data);
      });
    }
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const apiCall = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await apiCall.json();
    if (city && country) {
      this.addWeatherData(data);
    } else {
      this.setState({
        city: undefined,
        country: undefined,
        temperature: undefined,
        temperatureC: undefined,
        temperatureF: undefined,
        unit: undefined,
        humidity: undefined,
        description: undefined,
        icon: undefined,
        error: 'Please complete both required fields'
      });
    }
  }

  toggleTemperature = (e) => {
    if(e.target.classList.contains('celsius')) {
      this.setState({
        temperature: this.state.temperatureC,
        unit: '°C'
      });
    } else if (e.target.classList.contains('fahrenheit')) {
      this.setState({
        temperature: this.state.temperatureF,
        unit: '°F'
      });
    }
  }

  clearForm = () => {
    document.getElementById('city').value = '';
    document.getElementById('country').value = '';
  }

  render() {
    return (
      <div>
        <div className='wrapper'>
          <div className='main'>
            <div className='container'>
              <div className='row'>
                <div className='col-12'>
                  <Title />
                </div>
                <div className='col-12'>
                  <Form getWeather={this.getWeather} />
                </div>
                <div className='col-12'>
                  <Location getLocation={this.getLocation} clearForm={this.clearForm} />
                </div>
                <div className='col-12'>
                  <Weather
                    city={this.state.city}
                    country={this.state.country}
                    temperature={this.state.temperature}
                    unit={this.state.unit}
                    icon={this.state.icon}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
                <div className='col-12'>
                  { this.state.city && <Converter toggleTemperature={this.toggleTemperature}/> }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
