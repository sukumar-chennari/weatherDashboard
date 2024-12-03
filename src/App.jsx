import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import WeatherDisplay from "./components/WeatherDisplay";
import Favorites from "./components/Favorites";
import Forecast from "./components/Forecast";
import "./styles/App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [bgClass, setBgClass] = useState("");

  const fetchWeather = async (city) => {
    const apiKey = "3fbfee0add6f67c23b4e7b25fd590df6";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  
    try {
      const weatherResponse = await axios.get(weatherUrl);
      const forecastResponse = await axios.get(forecastUrl);
  
      if (weatherResponse.status === 200) {
        const weatherData = weatherResponse.data;
  
        setWeather({
          temp: weatherData.main.temp,
          city: weatherData.name,
          country: weatherData.sys.country,
          description: weatherData.weather[0].description,
          time: new Date().toLocaleTimeString(),
        });
  
        // Set background class based on temperature
        if (weatherData.main.temp < 0) setBgClass("cold-bg");
        else if (weatherData.main.temp < 20) setBgClass("mild-bg");
        else setBgClass("hot-bg");
      }
  
      if (forecastResponse.status === 200) {
        const forecastData = forecastResponse.data.list;
  
        // Filter data to include only one entry per day (noon forecast)
        const filteredForecast = forecastData.filter((item) =>
          item.dt_txt.includes("12:00:00") // Using noon forecast data
        );
  
        setForecast(filteredForecast.map((item) => ({
          main: item.main,
          dt_txt: item.dt_txt,
          weather: item.weather,
        })));
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      toast.error("Failed to fetch weather data!");
    }
  };
  
  const fetchFavorites = async () => {
    try {
      const response = await axios.get("http://localhost:5000/favorites");
      if (response.status === 200) {
        setFavorites(response.data.map((item) => item.name));
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const addFavorite = async (city) => {
    if (!favorites.includes(city)) {
      setFavorites([...favorites, city]);
      toast.success(`${city} added to favorites!`);
      await axios.post("http://localhost:5000/favorites", { name: city });
    } else {
      toast.error(`${city} is already in your favorites!`);
    }
  };

  const removeFavorite = async (city) => {
    setFavorites(favorites.filter((fav) => fav !== city));
    toast.success(`${city} removed from favorites!`);
    const favorite = await axios.get(`http://localhost:5000/favorites?name=${city}`);
    if (favorite.data.length) {
      await axios.delete(`http://localhost:5000/favorites/${favorite.data[0].id}`);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className={`app-container `}>
      <Header onSearch={fetchWeather} />
      <WeatherDisplay weather={weather} onAddFavorite={addFavorite} />
      <Favorites
        favorites={favorites}
        onRemove={removeFavorite}
        onClick={fetchWeather}
      />
      <Forecast forecast={forecast} />
      <ToastContainer />
    </div>
  );
};

export default App;
