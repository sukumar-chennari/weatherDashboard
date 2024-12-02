import React, { useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import WeatherDisplay from "./components/WeatherDisplay";
import Favorites from "./components/Favorites";
import Forecast from "./components/Forecast";
import "../src/styles/App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const fetchWeather = async (city) => {
    const apiKey = "3fbfee0add6f67c23b4e7b25fd590df6";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
      const weatherResponse = await axios.get(weatherUrl);

      setWeather({
        temp: weatherResponse.data.main.temp,
        city: weatherResponse.data.name,
        country: weatherResponse.data.sys.country,
        description: weatherResponse.data.weather[0].description,
        time: new Date().toLocaleTimeString(),
      });

      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
      const forecastResponse = await axios.get(forecastUrl);

      const fiveDayForecast = forecastResponse.data.list.filter((entry, index) => {
        return index % 8 === 0;
      });

      setForecast(fiveDayForecast);

    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  const addFavorite = (city) => {
    if (!favorites.includes(city)) {
      setFavorites([...favorites, city]);
      toast.success(`${city} added to favorites!`);
    } else {
      toast.error(`${city} is already in your favorites!`);
    }
  };

  const removeFavorite = (city) => {
    setFavorites(favorites.filter((fav) => fav !== city));
    toast.success(`${city} removed from favorites!`);
  };

  return (
    <div className="app-container">
      <Header onSearch={fetchWeather} />
      <WeatherDisplay weather={weather} onAddFavorite={addFavorite} />
      <Favorites favorites={favorites} onRemove={removeFavorite} />
      <Forecast forecast={forecast} weather={weather} />
      <ToastContainer />
    </div>
  );
};

export default App;
