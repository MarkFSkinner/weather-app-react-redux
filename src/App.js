import React, { Component } from 'react';
import Title from './components/Title';
import Location from './components/Location';

import './App.css';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

class App extends Component {
  state = {
    latitude: undefined,
    longitude: undefined,
    city: undefined,
    country: undefined,
    temperature: undefined,
    humidity: undefined,
    description: undefined,
    icon: undefined,
    error: undefined
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
        this.setState({
          city: data.name,
          country: data.sys.country,
          temperature: data.main.temp,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
          error: ''
        });
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
      this.setState({
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
        error: ''
      });
    } else {
      this.setState({
        city: undefined,
        country: undefined,
        temperature: undefined,
        humidity: undefined,
        description: undefined,
        icon: undefined,
        error: 'Please enter correct values'
      });
    }
  }

  render() {
    return (
      <div>
        <Title />
        <Location getLocation={this.getLocation} />
        { this.state.latitude && <p>Latitude: {this.state.latitude}</p> }
        { this.state.longitude && <p>Longitude: {this.state.longitude}</p> }
        { this.state.city && <p>City: {this.state.city}</p> }
        { this.state.country && <p>Country: {this.state.country}</p> }
        { this.state.temperature && <p>Temperature: {this.state.temperature}</p> }
        { this.state.humidity && <p>Humidity: {this.state.humidity}</p> }
        { this.state.description && <p>Description: {this.state.description}</p> }
        { this.state.icon && <p>Icon: <img src={this.state.icon}/></p> }
      </div>
    );
  }
}

export default App;
