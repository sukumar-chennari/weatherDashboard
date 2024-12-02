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

      // Fetch 5-day forecast data
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
      const forecastResponse = await axios.get(forecastUrl);

      // Filter the forecast to get data only for the next 5 days
      const fiveDayForecast = forecastResponse.data.list.filter((entry, index) => {
        return index % 8 === 0; // Each 8th entry corresponds to a day's forecast at the same time each day
      });

      setForecast(fiveDayForecast); // Store the 5-day forecast

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

  // Determine the background image based on temperature
  const getBackgroundImage = () => {
    if (!weather) return {}; // Return empty object when there's no weather data

    let backgroundImage = "";

    if (weather.temp < 0) {
      backgroundImage = "url('./public/images/cold.jpg')";
    } else if (weather.temp >= 0 && weather.temp < 20) {
      backgroundImage = "url('/images/mild.jpg')";
    } else {
      backgroundImage = "url('/images/hot.jpg')";
    }

    return {
      backgroundImage,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
    };
  };

  return (
    <div className="app-container" style={getBackgroundImage()}>
      <Header onSearch={fetchWeather} />
      <WeatherDisplay weather={weather} onAddFavorite={addFavorite} />
      <Favorites favorites={favorites} onRemove={removeFavorite} />
      <Forecast forecast={forecast} />
      <ToastContainer />
    </div>
  );
};

export default App;
