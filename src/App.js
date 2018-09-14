import React, { Component } from 'react';
import Title from './components/Title';
import Location from './components/Location';
import Form from './components/Form';
import Weather from './components/Weather';
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
    background: undefined,
    code: undefined,
    message: undefined,
    codes: undefined,
    value: 'country'
  }

  componentWillMount() {
    this.getLocation();
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
      background: this.getBackground(data.weather[0].icon),
      code: data.cod,
      message: undefined
    });
    this.setBackground();
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
        this.getCountryCodes();
      });
    }
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const apiCall = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await apiCall.json();
    console.log(data);
    if (data.cod === 200) {
      this.addWeatherData(data);
      this.clearForm();
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
        background: 'https://i.ytimg.com/vi/p28pePKK7Pc/maxresdefault.jpg',
        code: data.cod,
        message: data.message.charAt(0).toUpperCase() + data.message.substr(1)
      });
      this.setBackground();
    }
    console.log(this.state);
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
    //document.getElementById('country').value = '';
    this.setState({
      value: 'country'
    });
    document.getElementById('country').style.color = "rgb(73,80,87,0.8)";
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

  getBackground = (data) => {
    switch(data) {
      case '01d':
        return 'http://www.toca-ch.com/data/walls/143/27445846.jpg'; //sunny day
      case '02d':
      case '03d':
      case '04d':
        return 'https://wallpaper.wiki/wp-content/uploads/2017/05/wallpaper.wiki-Download-Free-Weather-Background-PIC-WPE00194.jpg'; //cloudy day
      case '09d':
      case '10d':
        return 'https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/D8qa-2E/moddy-wet-weather-background-raining-city-scenery-sad-rain-drops_hzwjel7r__F0000.png'; //rainy day
      case '11d':
        return 'http://www.toca-ch.com/data/walls/143/27443286.jpg'; //thunder
      case '13d':
        return 'https://inquirymethod.com/wp-content/uploads/2014/11/snowflake-white-1030x686.jpg'; //daytime snow
      case '50d':
        return 'https://images.alphacoders.com/290/thumb-1920-290353.jpg'; //daytime mist
      case '01n':
        return 'https://farm2.static.flickr.com/1676/26385659771_7c354aaf8c_b.jpg'; //clear night
      case '02n':
      case '03n':
      case '04n':
        return 'http://www.toca-ch.com/data/walls/143/27445697.jpg'; //cloudy night
      case '09n':
      case '10n':
        return 'http://www.ehowzit.co.za/wp-content/uploads/2016/07/rainy-weather.jpg'; //rainy night
      case '11n':
        return 'http://www.toca-ch.com/data/walls/143/27443640.jpg'; //night thunder
      case '13n':
        return 'https://wallpaperstock.net/wallpapers/thumbs1/45397hd.jpeg'; //night snow
      case '50n':
        return 'https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/6d4D4HR/foggy-weather-at-night-street-park_ekrwty77g__F0000.png'; //night mist
      default:
        return undefined;
    }
  }

  setBackground = () => {
    //document.body.background = this.state.background;
    let newBackground = this.state.background;
    document.getElementById('background').style.backgroundImage = `url(${newBackground})`;
  }

  getCountryCodes = async () => {
    const apiCall = await fetch('https://restcountries.eu/rest/v2/');
    const data = await apiCall.json();
    //console.log(data[0].alpha2Code);
    const codesList = data.map(item => item.alpha2Code).sort();
    const codes = codesList.map((item, index) => {
      return <option key={index} value={item.toLowerCase()}>{item}</option>;
    });
    //console.log(data);
    //console.log(codes[0]);
    //return codes;
    this.setState({
      codes: codes
    });
  }

  changeOptionColor = () => {
    document.getElementById('country').style.color = "rgb(73,80,87)";
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    });
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
                <Form value={this.state.value} getWeather={this.getWeather} codes={this.state.codes} handleChange={this.handleChange}/>
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
                  background={this.state.background}
                  message={this.state.message}
                  toggleTemperature={this.toggleTemperature}
                />
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
