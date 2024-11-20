import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import './sass/app.scss';
import TopSection from './components/top';
import BottomSection from './components/bottom';

// Use the new Weatherstack API key
const WEATHER_KEY = '4e7e9b1dabadae626a425ff9388a8ef3';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cityName: 'Biratnagar',
      numForecastDays: 4,
      isLoading: true,
    };
  }

  updateWeather() {
    const { cityName, numForecastDays } = this.state;
  
    const URL = `http://api.weatherstack.com/forecast?access_key=${WEATHER_KEY}&query=${cityName}&days=${numForecastDays}`;
  
    axios.get(URL)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        if (data.error) {
          console.error('Error:', data.error.info);
          return;
        }
  
        // Correctly extract forecast data and ensure it's an array
        const forecast = Object.values(data.forecast); // Get the forecast data for each day
  
        this.setState({
          isLoading: false,
          time: data.current.last_updated,
          temp_c: data.current.temperature,
          isDay: data.current.is_day,
          text: data.current.weather_descriptions[0],
          iconURL: data.current.weather_icons[0],
          forecastdays: forecast // Set forecastdays to an array
        });
      })
      .catch((err) => {
        console.error('Cannot fetch the Weather Data, ', err);
      });
  }
  

  componentDidMount() {
    const { eventEmitter } = this.props;

    this.updateWeather();

    eventEmitter.on('updateWeather', (data) => {
      this.setState({ cityName: data }, () => this.updateWeather());
    });
  }

  render() {
    const { isLoading, time, cityName, temp_c, isDay, text, iconURL, forecastdays } = this.state;

    return (
      <div className="app-container">
        <div className="main-container">
          {isLoading && <h3>Loading Weather...</h3>}
          {!isLoading && 
            <div className="top-section">
              <TopSection 
                  location={cityName} 
                  temp_c={temp_c} 
                  isDay={isDay} 
                  text={text} 
                  iconURL={iconURL} 
                  eventEmitter={this.props.eventEmitter}
                />
            </div>
          }

          <div className="bottom-section">
            <BottomSection forecastdays={forecastdays} time={time} />
          </div>
        </div>
      </div>
    );
  }
}
