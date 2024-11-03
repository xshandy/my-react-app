import React, { useState } from 'react';
import axios from 'axios';
import Weather from './Weather';
import './App.css';


const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = "04ate034e9ce8febe66dc16ff8de2o76"; 

  const handleSearch = (event) => {
    event.preventDefault();
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl)
      .then(response => {
        const data = response.data;
        setWeatherData({
          city: data.name,
          temperature: {
            current: data.main.temp,
            humidity: data.main.humidity,
          },
          condition: {
            description: data.weather[0].description,
            icon_url: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          },
          wind: {
            speed: data.wind.speed,
          },
          time: data.dt,
        });
      })
      .catch(error => {
        console.error("Error fetching weather data: ", error);
      });
  };

  return (
    <div className="weather-app">
      <header>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Enter a city..."
            required
            className="search-form-input"
            onChange={(e) => setCity(e.target.value)}
          />
          <input type="submit" value="Search" className="search-form-button" />
        </form>
      </header>
      <main>
        {weatherData ? (
          <Weather
            city={weatherData.city}
            temperature={weatherData.temperature.current}
            description={weatherData.condition.description}
            humidity={weatherData.temperature.humidity}
            windSpeed={weatherData.wind.speed}
            time={new Date(weatherData.time * 1000).toLocaleString()}
            iconUrl={weatherData.condition.icon_url}
          />
        ) : (
          <p>Loading...</p>
        )}
      </main>
      <footer>
        This project was coded by 
        <a href="https://github.com/xshandy" target="_blank" rel="noreferrer">Shandy Shek</a> and is on 
        <a href="https://github.com/xshandy/Weatherforecast" target="_blank" rel="noreferrer">Github</a> and hosted on 
        <a href="https://weatherapp-homework.netlify.app/" target="_blank" rel="noreferrer">Netlify</a>
      </footer>
    </div>
  );
};

export default App;