import React, { Component } from 'react';
import Title from './components/Title';
import Form from './components/Form';
import Location from './components/Location';
import Weather from './components/Weather';
import './App.css';

//import { Provider } from 'react-redux';
//import store from './index';
import {
  fetchWeather,
  clearForm,
  getCodes,
  addWeather,
  setTemperature,
  selectCountry,
  getLocation,
  setLocation
} from './actions';

//import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import { fetchWeatherReducer } from '../actions';
//import PropTypes from 'prop-types';
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

class App extends Component {
  /*state = {
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
    message: undefined
    //countryCodes: undefined,
    //value: 'country'
  }*/

  componentWillMount = async () => {
    await this.renderCountryCodes();
    //console.log('something', this.props.myData.something);
    this.getLocationFunction();
    //setTimeout(this.setBackground(), 5000);
    //this.setBackground();
  }

  /*componentDidMount() {

  }*/

  /*addWeatherData = (data) => {
    this.props.fetchWeather(this.state.city, this.state.countryCode, API_KEY);
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
  }*/

  /*getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async(position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        const apiCall = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&appid=${API_KEY}&units=metric`);
        const data = await apiCall.json();
        this.addWeatherData(data);
        this.clearForm();
      });
    }
  }*/

  getLocationFunction = async () => {
    //await this.props.getLocation(API_KEY);
    //await this.props.setLocation(this.props.myData.latitude, this.props.myData.longitude, API_KEY);
    await this.props.setLocation(API_KEY);
    this.clearFormFunction();
    //window.setTimeout(this.setBackground, 500);
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const countryName = e.target.elements.country.value;
    const countriesData = await this.getCountryCodes();
    //console.log('countriesData', countriesData);
    const result = countriesData.filter(country => country.name.toLowerCase() === countryName);
    const countryCode = (result.length > 0) ? result[0].alpha2Code : countryName;
    //const apiCall = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${API_KEY}&units=metric`);
    //const data = await apiCall.json();

    await this.props.fetchWeather(city, countryCode, API_KEY);
    //await this.props.fetchWeather();

    //store.dispatch.fetchWeather(city, countryCode, API_KEY);
    //this.props.fetchWeather(data);
    //const code = await
    //console.log('code', this.props.myData.code);
    if (this.props.myData.code === 200) {
      this.clearFormFunction();
      //this.props.displayError();
      //this.addWeatherData(data);
      //this.clearForm();
    } /*else {
      this.clearFormFunction();*/
      /*this.setState({
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
      });*/
      //this.setBackground();
    //}
    //this.setBackground();
    //window.setTimeout(this.setBackground, 500);
  }

  toggleTemperature = (e) => {
    if(e.target.classList.contains('celsius')) {
      /*this.setState({
        temperature: this.state.temperatureC,
        unit: '°C'
      });*/
      this.props.setTemperature({temperature: this.props.myData.temperatureC, unit: '°C'});
    } else if (e.target.classList.contains('fahrenheit')) {
      /*this.setState({
        temperature: this.state.temperatureF,
        unit: '°F'
      });*/
      this.props.setTemperature({temperature: this.props.myData.temperatureF, unit: '°F'});
    }
  }

  clearFormFunction = () => {
    //document.getElementById('city').value = '';
    document.getElementById('weather__form').reset();
    /*this.setState({
      value: 'country'
    });*/
    this.props.clearForm();
    document.getElementById('country').style.color = "rgb(73,80,87,0.8)";
  }

  /*convertWindDirection = (degrees) => {
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
        //sunny day
        return 'http://www.toca-ch.com/data/walls/143/27445846.jpg';
      case '02d':
      case '03d':
      case '04d':
        //cloudy day
        return 'https://wallpaper.wiki/wp-content/uploads/2017/05/wallpaper.wiki-Download-Free-Weather-Background-PIC-WPE00194.jpg';
      case '09d':
      case '10d':
        //rainy day
        return 'https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/D8qa-2E/moddy-wet-weather-background-raining-city-scenery-sad-rain-drops_hzwjel7r__F0000.png';
      case '11d':
        //thunder
        return 'http://www.toca-ch.com/data/walls/143/27443286.jpg';
      case '13d':
        //daytime snow
        return 'https://inquirymethod.com/wp-content/uploads/2014/11/snowflake-white-1030x686.jpg';
      case '50d':
        //daytime mist
        return 'https://images.alphacoders.com/290/thumb-1920-290353.jpg';
      case '01n':
        //clear night
        return 'https://farm2.static.flickr.com/1676/26385659771_7c354aaf8c_b.jpg';
      case '02n':
      case '03n':
      case '04n':
        //cloudy night
        return 'http://www.toca-ch.com/data/walls/143/27445697.jpg';
      case '09n':
      case '10n':
        //rainy night
        return 'http://www.ehowzit.co.za/wp-content/uploads/2016/07/rainy-weather.jpg';
      case '11n':
        //night thunder
        return 'http://www.toca-ch.com/data/walls/143/27443640.jpg';
      case '13n':
        //night snow
        return 'https://wallpaperstock.net/wallpapers/thumbs1/45397hd.jpeg';
      case '50n':
        //night mist
        return 'https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/6d4D4HR/foggy-weather-at-night-street-park_ekrwty77g__F0000.png';
      default:
        return undefined;
    }
  }*/

  /*setBackground = () => {
    let newBackground = this.props.myData.background;
    console.log('SET BACKGROUND', this.props.myData.background);
    document.getElementById('background').style.backgroundImage = `url(${newBackground})`;
  }*/

  getCountryCodes = async () => {
    const apiCall = await fetch('https://restcountries.eu/rest/v2/');
    const data = await apiCall.json();
    return data;
  }

  renderCountryCodes = async () => {
    //const data = await this.getCountryCodes();
    //const codesList = data.map(item => item.alpha2Code).sort();
    //const codesList = data.map(item => item.name).sort();
    //const codes = codesList.map((item, index) => {
    //  return <option key={index} value={item.toLowerCase()}>{(item.length < 18) ? item : item.substring(0, 18) + '...'}</option>;
      //return <option key={index} value={item.toLowerCase()}>{item}</option>;
    //});
    //console.log(codes);
    this.props.getCodes();
    //console.log(this.state.something);
  }

  handleChange = (event) => {
    const result = event.target.value;
    /*this.setState({
      value: event.target.value
    });*/
    this.props.selectCountry(result);

    //console.log("HANDLE CHANGE");
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
                <Form value={this.props.myData.value} getWeather={this.getWeather} countryCodes={this.props.myData.countryCodes} handleChange={this.handleChange}/>
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

/*App.propTypes = {
  fetchWeather: PropTypes.func.isRequired
}*/

function mapStateToProps(state) {
  //console.log('state', state.myData);
  return {
    myData: state.myData
  }
}

//export default App;
export default connect(mapStateToProps, {
  fetchWeather,
  clearForm,
  getCodes,
  addWeather,
  setTemperature,
  selectCountry,
  getLocation,
  setLocation
})(App);
