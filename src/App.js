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
    wind: undefined,
    direction: undefined,
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
      wind: data.wind.speed,
      direction: this.convertWindDirection(data.wind.deg),
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
        wind: undefined,
        direction: undefined,
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

  convertWindDirection = (degrees) => {
    if (degrees > 348.75 || degrees < 11.25) {
      return 'N';
    }
    if (degrees > 11.25 && degrees < 33.75) {
      return 'NNE';
    }
    if (degrees > 33.75 && degrees < 56.25) {
      return 'NE';
    }
    if (degrees > 56.25 && degrees < 78.75) {
      return 'ENE';
    }
    if (degrees > 78.75 && degrees < 101.25) {
      return 'E';
    }
    if (degrees > 101.25 && degrees < 123.75) {
      return 'ESE';
    }
    if (degrees > 123.75 && degrees < 146.25) {
      return 'SE';
    }
    if (degrees > 146.25 && degrees < 168.75) {
      return 'SSE';
    }
    if (degrees > 168.75 && degrees < 191.25) {
      return 'S';
    }
    if (degrees > 191.25 && degrees < 213.75) {
      return 'SSW';
    }
    if (degrees > 213.75 && degrees < 236.25) {
      return 'SW';
    }
    if (degrees > 236.25 && degrees < 258.75) {
      return 'WSW';
    }
    if (degrees > 258.75 && degrees < 281.25) {
      return 'W';
    }
    if (degrees > 281.25 && degrees < 303.75) {
      return 'WNW';
    }
    if (degrees > 303.75 && degrees < 326.25) {
      return 'NW';
    }
    if (degrees > 326.25 && degrees < 348.75) {
      return 'NNW';
    }
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
                    wind={this.state.wind}
                    direction={this.state.direction}
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
