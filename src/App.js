import React, { Component } from 'react';
import './App.css';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

class App extends Component {
  state = {
    latitude: undefined,
    longitude: undefined
  }

  getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      });
    } else {
      console.log('No GeoLocation');
    }
  }
  getWeather = async (e) => {
    e.preventDefault();
  }
  render() {
    return (
      <div>
        <button onClick={this.getLocation}>Get Location</button>
        <p>Latitude: {this.state.latitude}</p>
        <p>Longitude: {this.state.longitude}</p>
      </div>
    );
  }
}

export default App;
