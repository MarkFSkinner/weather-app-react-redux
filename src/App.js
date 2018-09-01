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
  }

  render() {
    return (
      <div>
        <Title />
        <Location getLocation={this.getLocation} />
        <p>Latitude: {this.state.latitude}</p>
        <p>Longitude: {this.state.longitude}</p>
        <p>City: {this.state.city}</p>
        <p>Country: {this.state.country}</p>
        <p>Temperature: {this.state.temperature}</p>
        <p>Humidity: {this.state.humidity}</p>
        <p>Description: {this.state.description}</p>
        <p>Icon: <img src={this.state.icon}/></p>
      </div>
    );
  }
}

export default App;
