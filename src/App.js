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

  getLocation = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
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
      </div>
    );
  }
}

export default App;
